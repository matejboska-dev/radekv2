import { SITE_URL, type ServiceContent } from '@/data/services';

export function getServiceSchema(service: ServiceContent) {
  const url = `${SITE_URL}${service.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent', '@id': `${SITE_URL}/#business`,
        name: 'Radek Větrovský', url: `${SITE_URL}/`,
        telephone: '+420721855854', email: 'radek.vetrovsky@re-max.cz',
        address: { '@type': 'PostalAddress', streetAddress: 'Zahradnická 550', addressLocality: 'Příbram III', postalCode: '261 01', addressCountry: 'CZ' },
        parentOrganization: { '@type': 'Organization', name: 'RE/MAX Power 2' },
        sameAs: ['https://www.remax-czech.cz/reality/nemovitosti-maklere/12799/radek-vetrovsky/', 'https://www.instagram.com/radek_vetrovsky/'],
      },
      {
        '@type': 'Service', '@id': `${url}#service`, name: `${service.name} v Příbrami`,
        serviceType: service.name, description: service.intro, url,
        image: new URL(service.image, SITE_URL).href,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: ['Příbram', 'Dobříš', 'Sedlčany', 'Rožmitál pod Třemšínem', 'Březnice', 'Sedlec-Prčice'].map(name => ({ '@type': 'City', name })),
      },
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: service.title,
        description: service.description, inLanguage: 'cs-CZ',
        mainEntity: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        publisher: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Domů', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Služby', item: `${SITE_URL}/#services` },
          { '@type': 'ListItem', position: 3, name: service.name, item: url },
        ],
      },
      // Preserve existing FAQ markup and keep it aligned with the visible answers.
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: service.faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
