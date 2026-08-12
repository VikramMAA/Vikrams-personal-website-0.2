/**
 * JSON-LD builders. Pages pass the output into BaseLayout's `schema` prop.
 *
 * Keep these honest: only describe things that are actually on the page.
 * Structured data that does not match visible content is a manual-action risk.
 */
import { site, contact } from './site';

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: new URL(item.href, site.url).href,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${site.url}/services/${opts.slug}/`,
    serviceType: opts.name,
    provider: { '@id': `${site.url}/#person` },
    areaServed: [
      { '@type': 'City', name: contact.city },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Worldwide (remote)' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${site.url}/contact/`,
      servicePhone: contact.phoneRaw,
    },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  updatedAt?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: `${site.url}/blog/${opts.slug}/`,
    mainEntityOfPage: `${site.url}/blog/${opts.slug}/`,
    datePublished: opts.publishedAt.toISOString(),
    dateModified: (opts.updatedAt ?? opts.publishedAt).toISOString(),
    author: { '@id': `${site.url}/#person` },
    publisher: { '@id': `${site.url}/#person` },
    inLanguage: 'en',
  };
}
