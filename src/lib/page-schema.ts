import { BASE_URL } from '@/lib/seo';
import type { SoldSummary } from '@/data/sold-properties';

type JsonLd = Record<string, unknown>;

export const SAME_AS = ['https://www.remax-czech.cz/reality/nemovitosti-maklere/12799/radek-vetrovsky/', 'https://www.instagram.com/radek_vetrovsky/'];

/** Stabilní @id entit, shodné s grafem na homepage, aby je vyhledávače a AI sloučily do jedné entity. */
export const IDS = {
  business: `${BASE_URL}/#business`,
  person: `${BASE_URL}/#person`,
  website: `${BASE_URL}/#website`,
};

const round1 = (n: number) => Math.round(n * 10) / 10;

export const personNode = (): JsonLd => ({
  '@type': 'Person', '@id': IDS.person, name: 'Radek Větrovský', jobTitle: 'Realitní makléř',
  url: `${BASE_URL}/radek-vetrovsky-realitni-makler-pribram`,
  worksFor: { '@type': 'Organization', name: 'RE/MAX Power 2' },
  knowsAbout: ['Prodej nemovitostí v Příbrami', 'Odhad tržní ceny nemovitosti', 'Koupě nemovitosti', 'Pronájem nemovitostí', 'Realitní trh na Příbramsku'],
  sameAs: SAME_AS,
});

export const websiteNode = (): JsonLd => ({
  '@type': 'WebSite', '@id': IDS.website, url: `${BASE_URL}/`, name: 'Radek Větrovský – Realitní makléř Příbram', inLanguage: 'cs-CZ',
  publisher: { '@id': IDS.business },
});

export const agentNode = (areaServed: string[], extra: JsonLd = {}): JsonLd => ({
  '@type': 'RealEstateAgent', '@id': IDS.business,
  name: 'Radek Větrovský', url: `${BASE_URL}/`, telephone: '+420721855854', email: 'radek.vetrovsky@re-max.cz',
  address: { '@type': 'PostalAddress', streetAddress: 'Zahradnická 550', addressLocality: 'Příbram III', postalCode: '261 01', addressCountry: 'CZ' },
  parentOrganization: { '@type': 'Organization', name: 'RE/MAX Power 2' },
  founder: { '@id': IDS.person },
  areaServed: areaServed.map((name) => ({ '@type': 'City', name })),
  sameAs: SAME_AS,
  ...extra,
});

export const breadcrumbNode = (url: string, items: { name: string; item: string }[]): JsonLd => ({
  '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.item })),
});

export const faqNode = (url: string, faqs: { q: string; a: string }[]): JsonLd => ({
  '@type': 'FAQPage', '@id': `${url}#faq`,
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

/** Strojově čitelná verze statistik z přehledu Prodané nemovitosti. Všechna čísla jsou viditelná i v textu stránky. */
export function soldDatasetNode(opts: { id: string; name: string; description: string; areaName: string; summary: SoldSummary; modified: string }): JsonLd {
  const { summary } = opts;
  const value = (name: string, v: number, unitText?: string): JsonLd => ({ '@type': 'PropertyValue', name, value: v, ...(unitText ? { unitText } : {}) });
  return {
    '@type': 'Dataset', '@id': opts.id,
    name: opts.name, description: opts.description,
    url: `${BASE_URL}/prodano`, inLanguage: 'cs-CZ', isAccessibleForFree: true, dateModified: opts.modified,
    creator: { '@id': IDS.person }, publisher: { '@id': IDS.business },
    spatialCoverage: { '@type': 'Place', name: opts.areaName },
    keywords: ['doba prodeje nemovitosti', 'prodané nemovitosti Příbram', 'realitní trh Příbram'],
    measurementTechnique: 'Doba prodeje ve dnech tak, jak je uvedena u každé nemovitosti v přehledu Prodané nemovitosti. Medián, průměr a rozdělení jsou z těchto hodnot spočítány.',
    variableMeasured: [
      value('Počet prodaných nemovitostí', summary.count),
      value('Medián doby prodeje', summary.median, 'dny'),
      value('Průměrná doba prodeje', round1(summary.average), 'dny'),
      value('Nejkratší doba prodeje', summary.fastest, 'dny'),
      value('Nejdelší doba prodeje', summary.slowest, 'dny'),
      ...summary.buckets.map((b) => value(`Počet nemovitostí prodaných ${b.label}`, b.count)),
    ],
  };
}
