/** Restore the shared document before React takes over a prerendered service page.
 * This keeps the original homepage metadata available to route-effect cleanups.
 */
export function restorePrerenderHead() {
  document.querySelectorAll<HTMLElement>('[data-prerender-default]').forEach(element => {
    const original = element.dataset.prerenderDefault;
    if (original === undefined) return;
    if (element.tagName === 'TITLE') element.textContent = original;
    else if (element.tagName === 'LINK') element.setAttribute('href', original);
    else element.setAttribute('content', original);
    delete element.dataset.prerenderDefault;
  });
  document.querySelectorAll('[data-prerender-added]').forEach(element => element.remove());
  document.getElementById('site-schema')?.setAttribute('type', 'application/ld+json');
}
