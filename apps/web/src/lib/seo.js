export const SITE_URL = 'https://getwordcraft.com';
export const SITE_NAME = 'WordCraft Tool';

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/og-image.png`,
  description: 'A free, fast toolkit of word finders, unscramblers, and puzzle helpers.',
  email: 'hello@getwordcraft.com',
  telephone: '+1-800-555-0199',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '100 Pine Street, Suite 1250',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94111',
    addressCountry: 'US',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'hello@getwordcraft.com',
      url: `${SITE_URL}/contact`,
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://github.com/getwordcraft',
    'https://x.com/getwordcraft',
    'https://www.linkedin.com/company/getwordcraft',
  ],
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export function webPageLd({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
  };
}

export function webApplicationLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleLd({ title, description, path, image = `${SITE_URL}/og-image.png` }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
  };
}
