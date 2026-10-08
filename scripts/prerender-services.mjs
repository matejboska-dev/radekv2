import { build } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { JSDOM } from 'jsdom';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = process.cwd();
const output = path.join(projectRoot, 'dist');
// Keep the temporary renderer inside the project so Node can resolve dependencies.
const temporary = await mkdtemp(path.join(projectRoot, 'node_modules/.prerender-services-'));
try {
  await build({
    configFile: false,
    plugins: [react()],
    resolve: { alias: { '@': path.join(projectRoot, 'src') } },
    build: {
      ssr: path.join(projectRoot, 'src/entry-services.tsx'),
      outDir: temporary,
      ssrEmitAssets: true,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: 'renderer.mjs' } },
    },
  });
  const { renderServices } = await import(pathToFileURL(path.join(temporary, 'renderer.mjs')).href);
  const template = await readFile(path.join(output, 'index.html'), 'utf8');
  await cp(path.join(temporary, 'assets'), path.join(output, 'assets'), { recursive: true });

  for (const { service, html } of renderServices()) {
    const dom = new JSDOM(template);
    const doc = dom.window.document;
    for (const file of await readdir(path.join(temporary, 'assets'))) {
      if (!file.endsWith('.css')) continue;
      const stylesheet = doc.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = `/assets/${file}`;
      doc.head.appendChild(stylesheet);
    }
    const title = doc.querySelector('title');
    title.dataset.prerenderDefault = title.textContent;
    title.textContent = service.title;
    const canonical = doc.querySelector('link[rel="canonical"]');
    canonical.dataset.prerenderDefault = canonical.getAttribute('href');
    canonical.setAttribute('href', `https://radek-vetrovsky.cz${service.path}`);
    const image = new URL(service.image, 'https://radek-vetrovsky.cz').href;
    const metadata = [
      ['name', 'description', service.description],
      ['property', 'og:title', service.title],
      ['property', 'og:description', service.description],
      ['property', 'og:url', `https://radek-vetrovsky.cz${service.path}`],
      ['property', 'og:type', 'website'],
      ['property', 'og:image', image],
      ['name', 'twitter:title', service.title],
      ['name', 'twitter:description', service.description],
      ['name', 'twitter:image', image],
    ];
    for (const [attribute, key, value] of metadata) {
      let meta = doc.querySelector(`meta[${attribute}="${key}"]`);
      if (!meta) {
        meta = doc.createElement('meta');
        meta.setAttribute(attribute, key);
        meta.dataset.prerenderAdded = '';
        doc.head.appendChild(meta);
      } else meta.dataset.prerenderDefault = meta.getAttribute('content') || '';
      meta.setAttribute('content', value);
    }
    // The service graph replaces homepage reviews and business markup on this route.
    doc.getElementById('site-schema').setAttribute('type', 'application/json');
    doc.getElementById('root').innerHTML = html;
    const routeDirectory = path.join(output, service.path);
    await mkdir(routeDirectory, { recursive: true });
    const pageHtml = dom.serialize();
    await writeFile(path.join(routeDirectory, 'index.html'), pageHtml);
    // Hosts that resolve clean URLs through a sibling .html file can serve the
    // same prerendered document even when they do not process _redirects.
    await writeFile(path.join(output, `${service.path}.html`), pageHtml);
    console.log(`Prerendered ${service.path}`);
    dom.window.close();
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
