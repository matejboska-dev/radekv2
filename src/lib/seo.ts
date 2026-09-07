const BASE_URL = 'https://radek-vetrovsky.cz';

function setMetaByAttr(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  const prevContent = el?.getAttribute('content') ?? null;
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return () => {
    if (created) {
      el?.remove();
    } else if (prevContent !== null) {
      el?.setAttribute('content', prevContent);
    }
  };
}

export function setPageMeta(title: string, description: string, canonicalPath: string, ogImage?: string) {
  const prevTitle = document.title;
  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  const prevDesc = metaDesc?.getAttribute('content') ?? '';
  metaDesc?.setAttribute('content', description);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  const prevCanonical = canonical?.getAttribute('href') ?? '';
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const fullUrl = `${BASE_URL}${canonicalPath}`;
  canonical.setAttribute('href', fullUrl);

  // Open Graph + Twitter Card, scoped to this page
  const cleanups = [
    setMetaByAttr('property', 'og:title', title),
    setMetaByAttr('property', 'og:description', description),
    setMetaByAttr('property', 'og:url', fullUrl),
    setMetaByAttr('property', 'og:type', 'article'),
    setMetaByAttr('name', 'twitter:title', title),
    setMetaByAttr('name', 'twitter:description', description),
  ];
  if (ogImage) {
    cleanups.push(setMetaByAttr('property', 'og:image', ogImage));
    cleanups.push(setMetaByAttr('name', 'twitter:image', ogImage));
  }

  return () => {
    document.title = prevTitle;
    metaDesc?.setAttribute('content', prevDesc);
    if (canonical) canonical.setAttribute('href', prevCanonical || '');
    cleanups.forEach((fn) => fn());
  };
}

export function injectJsonLd(data: Record<string, unknown>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
  return () => {
    script.remove();
  };
}
