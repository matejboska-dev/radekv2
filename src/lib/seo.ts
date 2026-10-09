export const BASE_URL = 'https://radek-vetrovsky.cz';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

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

export function setPageMeta(
  title: string,
  description: string,
  canonicalPath: string,
  ogImage?: string,
  ogType: 'article' | 'website' = 'article',
  ogImageAlt: string = 'Radek Větrovský – Realitní makléř Příbram RE/MAX'
) {
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

  const finalImage = ogImage || DEFAULT_OG_IMAGE;

  // Open Graph + Twitter Card, scoped to this page
  const cleanups = [
    setMetaByAttr('property', 'og:title', title),
    setMetaByAttr('property', 'og:description', description),
    setMetaByAttr('property', 'og:url', fullUrl),
    setMetaByAttr('property', 'og:type', ogType),
    setMetaByAttr('property', 'og:site_name', 'Radek Větrovský – Realitní makléř Příbram'),
    setMetaByAttr('property', 'og:locale', 'cs_CZ'),
    setMetaByAttr('property', 'og:image', finalImage),
    setMetaByAttr('property', 'og:image:secure_url', finalImage),
    setMetaByAttr('property', 'og:image:alt', ogImageAlt),
    setMetaByAttr('property', 'og:image:width', '1200'),
    setMetaByAttr('property', 'og:image:height', '630'),
    setMetaByAttr('name', 'twitter:card', 'summary_large_image'),
    setMetaByAttr('name', 'twitter:title', title),
    setMetaByAttr('name', 'twitter:description', description),
    setMetaByAttr('name', 'twitter:image', finalImage),
    setMetaByAttr('name', 'twitter:image:alt', ogImageAlt),
  ];

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
