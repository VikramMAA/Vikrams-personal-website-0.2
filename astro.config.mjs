// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: change `site` to your real domain before going live.
// Everything SEO-related (canonicals, sitemap, JSON-LD, OG tags) is derived from it.
export default defineConfig({
  site: 'https://vikramhere.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Keep noindex pages out of the sitemap — listing them is a mixed signal.
      // /preview/ holds private concept pages; excluding them here also keeps
      // them out of the IndexNow ping, which submits sitemap URLs only.
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.includes('/subscribed') &&
        !page.includes('/preview/') &&
        // Draft page (noindex). Remove this line when it goes public.
        !page.includes('/accomplishments/'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
