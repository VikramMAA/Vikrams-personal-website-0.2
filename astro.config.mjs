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
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
