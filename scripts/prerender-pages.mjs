// Prerenders content routes (blog, /prodano, /clanky, ...) into static HTML so crawlers that do not
// run JavaScript (AI bots, Bing, social scrapers) see the real title, canonical, content and JSON-LD.
// Pages are mounted in jsdom with the real route code, so head metadata set in effects is captured.
import { build } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { JSDOM } from 'jsdom';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = process.cwd();
const output = path.join(projectRoot, 'dist');
const temporary = await mkdtemp(path.join(projectRoot, 'node_modules/.prerender-pages-'));
const BASE = 'https://radek-vetrovsky.cz';

const installDomGlobals = window => {
  const define = (key, value) => Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
  for (const key of Object.getOwnPropertyNames(window)) {
    if (key in globalThis && !['document', 'window', 'navigator', 'location', 'history', 'localStorage', 'sessionStorage'].includes(key)) continue;
    try { define(key, window[key]); } catch { /* read-only globals are fine to skip */ }
  }
  define('window', window);
  define('self', window);
  define('document', window.document);
  define('navigator', window.navigator);
  window.matchMedia ??= query => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false });
  window.scrollTo = () => {};
  class NoopObserver { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
  for (const name of ['IntersectionObserver', 'ResizeObserver', 'MutationObserver']) {
    if (!window[name]) window[name] = NoopObserver;
    define(name, window[name]);
  }
  window.IntersectionObserver = NoopObserver;
  define('IntersectionObserver', NoopObserver);
  define('requestAnimationFrame', cb => setTimeout(() => cb(Date.now()), 16));
  define('cancelAnimationFrame', id => clearTimeout(id));
  window.requestAnimationFrame = globalThis.requestAnimationFrame;
  window.cancelAnimationFrame = globalThis.cancelAnimationFrame;
};

const headSnapshot = head => ({
  title: head.querySelector('title')?.textContent ?? '',
  canonical: head.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  metas: new Map([...head.querySelectorAll('meta[name], meta[property]')].map(m => [m.getAttribute('name') || m.getAttribute('property'), m.getAttribute('content')])),
});

try {
  await build({
    configFile: false,
    logLevel: 'warn',
    plugins: [react()],
    resolve: { alias: { '@': path.join(projectRoot, 'src') } },
    define: { 'import.meta.env.SSR': 'true' },
    build: {
      ssr: path.join(projectRoot, 'src/entry-prerender.tsx'),
      outDir: temporary,
      ssrEmitAssets: true,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: 'renderer.mjs' } },
    },
    ssr: { noExternal: ['framer-motion'] },
  });

  const template = await readFile(path.join(output, 'index.html'), 'utf8');
  const cssFiles = (await readdir(path.join(temporary, 'assets'))).filter(f => f.endsWith('.css'));
  await cp(path.join(temporary, 'assets'), path.join(output, 'assets'), { recursive: true });

  const dom = new JSDOM(template, { url: `${BASE}/`, pretendToBeVisual: true, runScripts: 'outside-only' });
  installDomGlobals(dom.window);
  const { prerenderRoutes, mountRoute } = await import(pathToFileURL(path.join(temporary, 'renderer.mjs')).href);
  const doc = dom.window.document;
  const pristineHead = doc.head.innerHTML;
  const original = headSnapshot(doc.head);
  const failures = [];

  for (const { path: route, Component } of prerenderRoutes) {
    doc.head.innerHTML = pristineHead;
    const container = doc.getElementById('root');
    container.innerHTML = '';
    dom.reconfigure({ url: `${BASE}${route}` });
    let unmount;
    try {
      unmount = await mountRoute(route, Component, container);
      const html = container.innerHTML;
      if (!html.includes('<h1')) throw new Error('no <h1> rendered');

      // Mark head changes so the client restores the homepage defaults before React takes over.
      const title = doc.querySelector('title');
      if (title.textContent !== original.title) title.dataset.prerenderDefault = original.title;
      const canonical = doc.querySelector('link[rel="canonical"]');
      if (canonical.getAttribute('href') !== original.canonical) canonical.dataset.prerenderDefault = original.canonical;
      for (const meta of doc.head.querySelectorAll('meta[name], meta[property]')) {
        const key = meta.getAttribute('name') || meta.getAttribute('property');
        if (!original.metas.has(key)) meta.dataset.prerenderAdded = '';
        else if (original.metas.get(key) !== meta.getAttribute('content')) meta.dataset.prerenderDefault = original.metas.get(key);
      }
      // JSON-LD injected by the route is re-injected by the client, so drop it on restore.
      for (const script of doc.head.querySelectorAll('script[type="application/ld+json"]:not(#site-schema)')) script.dataset.prerenderAdded = '';
      for (const file of cssFiles) {
        const link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = `/assets/${file}`;
        link.dataset.prerenderAdded = '';
        doc.head.appendChild(link);
      }

      const serialized = dom.serialize();
      const routeDirectory = path.join(output, route);
      await mkdir(routeDirectory, { recursive: true });
      await writeFile(path.join(routeDirectory, 'index.html'), serialized);
      await writeFile(path.join(output, `${route}.html`), serialized);
      console.log(`Prerendered ${route}`);
    } catch (error) {
      failures.push(`${route}: ${error.message}`);
      console.warn(`Skipped ${route}: ${error.message}`);
    } finally {
      unmount?.();
      container.innerHTML = '';
    }
  }
  dom.window.close();
  if (failures.length) {
    console.warn(`\n${failures.length} route(s) fall back to client-side rendering:\n${failures.join('\n')}`);
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
// Page timers (gsap ticker, animations) would keep the process alive after rendering.
process.exit(process.exitCode ?? 0);
