# Vikram M A A — personal website

Personal consulting site built to rank in search and get cited by AI assistants.
Static HTML, no client-side framework, no runtime JavaScript beyond a CSS-only
mobile menu.

**Stack:** [Astro](https://astro.build) 7 · plain CSS · deployed on Netlify.

---

## Running it locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check the real output |

---

## Editing content

**Almost everything lives in one file: [`src/data/site.ts`](src/data/site.ts).**

Change it there and the whole site updates — pages, navigation, footer, and the
structured data that Google and AI crawlers read. You rarely need to touch the
`.astro` files.

| What you want to change | Where |
| --- | --- |
| Name, job title, years of experience, tagline | `site` object |
| Email, phone, WhatsApp, city, social links | `contact` object |
| The four numbers under the hero | `stats` array |
| Services — copy, deliverables, FAQs, SEO titles | `services` array |
| Case studies on `/results/` | `caseStudies` array |
| Home page FAQ | `faqs` array |
| The four process steps | `process` array |
| Industry tags | `industries` array |

### Adding a service

Add an object to the `services` array. A page appears automatically at
`/services/your-slug/`, gets added to the nav, footer, sitemap and the
`OfferCatalog` structured data. Nothing else to wire up.

### Adding a blog post

Create a Markdown file in `src/content/blog/`. The filename becomes the URL.

```markdown
---
title: 'Your post title'
seoTitle: 'Shorter title for the browser tab and Google (under 60 chars)'
description: 'One or two sentences, under 155 characters.'
publishedAt: 2026-08-20
tags: ['SEO', 'Strategy']
---

Your content here.
```

Notes:
- **Quote every frontmatter value.** An unquoted colon breaks the YAML parser.
- `updatedAt` is optional and shows a "Updated ..." line when present.
- `published: false` keeps a draft out of the index and the sitemap.
- Two or more `##` headings automatically generate a table of contents.

---

## Before you go live

These are the things that must change. Search the repo for `TODO` to find the rest.

1. **Set your real domain.** It appears in two places and both must match:
   - `site` in [`astro.config.mjs`](astro.config.mjs)
   - `site.url` in [`src/data/site.ts`](src/data/site.ts)

   Then update the `Sitemap:` line at the bottom of
   [`public/robots.txt`](public/robots.txt) and the URLs in
   [`public/llms.txt`](public/llms.txt).

2. **Confirm every number.** The stats under the hero and the figures in the case
   studies came from the old portfolio PDF. Verify them before they are public.

3. **Check the LinkedIn URL** in `contact.socials` — it is a guess.

4. **Confirm the case study clients are happy to be named** (Mapletree, Ayanam
   Aerospace, MUKA), and add real quotes to the `quote` field where you have
   permission.

5. **Review the years of experience** (currently 10) and the About page timeline,
   which uses placeholder period labels rather than real dates.

---

## Deploying to Netlify

The repo includes [`netlify.toml`](netlify.toml), so there is nothing to configure
by hand.

1. In Netlify: **Add new site → Import an existing project → GitHub**, and pick
   this repository.
2. Netlify reads `netlify.toml` and fills in the build command (`npm run build`)
   and publish directory (`dist`). Just confirm.
3. Deploy.

Every push to `main` redeploys automatically.

### The contact form

The form on `/contact/` uses **Netlify Forms** — it works as soon as the site is
on Netlify, with no backend and no third-party service.

Submissions appear under **Site configuration → Forms → consultation**. Set up
email notifications there so you actually hear about them; Netlify does not email
you by default.

A honeypot field catches most spam. If you start getting through-spam, enable
reCAPTCHA in the Netlify form settings.

### Custom domain

Netlify: **Domain management → Add a domain**. Point your registrar's nameservers
at Netlify, or add the `A`/`CNAME` records Netlify shows you. HTTPS is automatic.

---

## How the SEO is set up

Rather than a plugin, the SEO is structural. Worth understanding before you edit
the layouts.

**Every page emits:**
- A unique `<title>` (brand suffix is dropped automatically if it would push past
  ~62 characters) and meta description
- A canonical URL
- Open Graph and Twitter card tags, using `/og-default.png`
- `Person`, `ProfessionalService` and `WebSite` structured data in one `@graph`

**Per page type:**
- Service pages → `Service` + `FAQPage` + `BreadcrumbList`
- Blog posts → `BlogPosting` + `BreadcrumbList`
- Contact → `ContactPage`
- Home → `FAQPage`

Builders live in [`src/data/schema.ts`](src/data/schema.ts).

### The AI search (AISEO) side

- **Static HTML.** Content is in the source, not assembled by JavaScript. AI
  crawlers are less patient than Googlebot about executing scripts.
- **FAQ answers are in the DOM even when collapsed.** The `<details>` elements
  hide them visually but the text is in the HTML, so it can be quoted.
- **[`public/llms.txt`](public/llms.txt)** — a plain-text summary of who you are,
  what you offer and which pages matter. Keep it in sync with `site.ts`.
- **[`public/robots.txt`](public/robots.txt)** explicitly allows GPTBot,
  ClaudeBot, PerplexityBot, Google-Extended and others. Remove any you do not
  want reading the site — but blocking them means no citations from that
  assistant.
- **Answers are front-loaded.** Service summaries and FAQ answers state the
  conclusion in the first sentence, which is the shape an assistant can lift.

### After the first deploy

1. Add the site to [Google Search Console](https://search.google.com/search-console)
   and submit `https://yourdomain.com/sitemap-index.xml`.
2. Add it to [Bing Webmaster Tools](https://www.bing.com/webmasters) — this also
   feeds ChatGPT search.
3. Create a Google Business Profile for the Bengaluru local searches.
4. Test the structured data with the
   [Rich Results Test](https://search.google.com/test/rich-results).

---

## Project structure

```
src/
  data/
    site.ts            ← edit this one
    schema.ts          JSON-LD builders
  layouts/
    BaseLayout.astro   head, meta, structured data, header + footer
  components/
    Header.astro       sticky nav, CSS-only mobile menu
    Footer.astro
    FAQ.astro          <details> accordion, answers stay in the DOM
    CTA.astro
    Breadcrumbs.astro
  pages/
    index.astro
    about.astro
    results.astro
    contact.astro
    thank-you.astro    noindex, excluded from sitemap
    404.astro
    services/
      index.astro
      [slug].astro     one page per entry in `services`
    blog/
      index.astro
      [...slug].astro
  content/blog/        Markdown posts
  styles/global.css    design tokens + all shared styles
public/
  robots.txt  llms.txt  favicon.svg  og-default.png
```
