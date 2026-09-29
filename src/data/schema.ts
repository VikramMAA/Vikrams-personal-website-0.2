/**
 * JSON-LD builders. Pages pass the output into BaseLayout's `schema` prop.
 *
 * Keep these honest: only describe things that are actually on the page.
 * Structured data that does not match visible content is a manual-action risk.
 *
 * Note: there is deliberately no Service or Offer markup anywhere on this site.
 * It is a personal blog and portfolio, and the structured data says so.
 */
import { site, contact, expertise } from './site';

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

/**
 * ProfilePage for /about/, naming the Person as the page's main entity.
 *
 * The site-wide identity graph in BaseLayout already declares the Person with
 * jobTitle, knowsAbout and sameAs. This adds the piece that was missing: an
 * explicit statement that /about/ is that person's profile page, so Google and
 * retrieval-based systems have one canonical place to attribute the writing to a
 * named practitioner rather than inferring it per post.
 *
 * The Person node is restated rather than referenced alone because a ProfilePage
 * whose mainEntity is a bare @id is weaker as an entity signal. Both nodes carry
 * the same @id, so consumers merge them into one entity rather than two.
 *
 * `knowsAbout` is derived from the expertise areas the page actually lists —
 * structured data that does not match visible content is a manual-action risk.
 */
export function profilePageSchema(opts: { description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${site.url}/about/#profilepage`,
    url: `${site.url}/about/`,
    name: `About ${site.name}`,
    description: opts.description,
    isPartOf: { '@id': `${site.url}/#website` },
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      jobTitle: site.jobTitle,
      url: `${site.url}/about/`,
      email: `mailto:${contact.email}`,
      telephone: contact.phoneRaw,
      address: {
        '@type': 'PostalAddress',
        addressLocality: contact.city,
        addressRegion: contact.region,
        addressCountry: contact.countryCode,
      },
      knowsAbout: expertise.map((a) => a.title),
      sameAs: contact.socials
        .filter((s) => !s.url.startsWith('mailto:'))
        .map((s) => s.url),
    },
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

export function expertisePageSchema(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${opts.name} — notes from ${site.name}`,
    description: opts.description,
    url: `${site.url}/expertise/${opts.slug}/`,
    mainEntityOfPage: `${site.url}/expertise/${opts.slug}/`,
    about: opts.name,
    author: { '@id': `${site.url}/#person` },
    publisher: { '@id': `${site.url}/#person` },
    inLanguage: 'en',
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
