import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';

for (const slug of ['prodej', 'pronajem', 'koupe']) {
  const route = `/sluzby/${slug}-nemovitosti-pribram`;
  const html = await readFile(path.join('dist', route, 'index.html'), 'utf8');
  assert.equal(await readFile(path.join('dist', `${route}.html`), 'utf8'), html, `${slug}: clean URL fallback matches prerendered page`);
  const { window } = new JSDOM(html);
  const doc = window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1, `${slug}: one H1`);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, `https://radek-vetrovsky.cz${route}`);
  assert.equal(doc.querySelector('meta[property="og:type"]').content, 'website');
  assert.equal(doc.querySelectorAll('script[type="application/ld+json"]').length, 1, 'Only the relevant service graph is active');
  const graph = JSON.parse(doc.querySelector('[data-service-schema]').textContent)['@graph'];
  assert.equal(graph.find(item => item['@type'] === 'Service').url, `https://radek-vetrovsky.cz${route}`);
  const faqs = graph.find(item => item['@type'] === 'FAQPage').mainEntity;
  assert.equal(faqs.length, doc.querySelectorAll('details').length);
  for (const faq of faqs) assert.ok(doc.querySelector('main').textContent.includes(faq.acceptedAnswer.text));
  const headings = [...doc.querySelectorAll('main h1, main h2, main h3')].map(h => Number(h.tagName[1]));
  headings.forEach((level, i) => { if (i) assert.ok(level <= headings[i - 1] + 1, 'No skipped heading levels'); });
  for (const image of doc.querySelectorAll('img[src^="/assets/"]')) {
    await access(path.join('dist', image.getAttribute('src')));
    assert.ok(image.hasAttribute('alt'));
    assert.ok(image.hasAttribute('width') && image.hasAttribute('height'));
  }
  for (const link of doc.querySelectorAll('a[href^="#"]')) assert.ok(doc.getElementById(link.hash.slice(1)), `Missing anchor ${link.hash}`);
  for (const css of doc.querySelectorAll('link[rel="stylesheet"][href^="/assets/"]')) await access(path.join('dist', css.getAttribute('href')));
  const words = doc.querySelector('main').textContent.trim().split(/\s+/).length;
  assert.ok(words >= 800, `${slug}: substantive service content`);
  assert.ok(doc.querySelector('aside[aria-label="Zkušenost klienta"] blockquote'), `${slug}: proof is visible`);
  assert.ok(doc.querySelector('#konzultace')?.textContent.includes('Co bude po odeslání'), `${slug}: next step is visible`);
  assert.ok(!doc.querySelector('main [style*="opacity:0"]'), 'Content is visible before JavaScript');
  console.log(`${route}: ${words} words, ${faqs.length} FAQs, metadata, HTML, schema, assets and anchors OK`);
  window.close();
}
