# Vikram M A A — personal website

Personal blog and portfolio, built to rank in search and get cited by AI
assistants. Static HTML, no client-side framework, no runtime JavaScript beyond a
CSS-only mobile menu.

**Positioning:** this site does not offer, sell or price services. Vikram works
full time under contract and is not available for outside work. Every closing
call to action is an invitation to a conversation by email or LinkedIn, and that
wording lives in one place — the `chatInvite` object in `src/data/site.ts`. Keep
it that way when editing. Email, phone, WhatsApp and LinkedIn are all offered as
ways to start that conversation.

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
| Email, phone, WhatsApp, LinkedIn, city, social links | `contact` object |
| The "reach out for a chat" wording used site-wide | `chatInvite` object |
| The four numbers under the hero | `stats` array |
| Expertise notes — copy, checklists, FAQs, SEO titles | `expertise` array |
| Portfolio entries on `/portfolio/` | `caseStudies` array |
| Home page FAQ | `faqs` array |
| The four steps in "how I think about it" | `approach` array |
| Industry tags | `industries` array |

### Adding an area of expertise

Add an object to the `expertise` array. A page appears automatically at
`/expertise/your-slug/`, gets added to the footer and the sitemap, and pulls in
matching blog posts via its `match` keywords. Nothing else to wire up.

Expertise pages are notes and opinions, never offers. Keep `whatMatters` framed
as "what I look at", not "what you get", and keep pricing and engagement language
out of the FAQs.

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

4. **Confirm the case study clients are happy to be named** (Mapletree Farms, Ayanam
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

The form on `/contact/` posts to a Netlify Function at `/api/contact`
([`netlify/functions/contact.mjs`](netlify/functions/contact.mjs)), which emails
the brief to you through [Resend](https://resend.com). No client-side JavaScript
— the browser is redirected to `/thank-you/` on success, or back to
`/contact/#form-error` on failure, where a CSS `:target` rule reveals an error
banner.

**It will not send until you set three things up.**

1. **Create a Resend account** and add your domain under
   [Resend → Domains](https://resend.com/domains). Add the DNS records it gives
   you (SPF, DKIM and the return-path record) at your registrar, then wait for
   the domain to show as *Verified*. Sending from an unverified domain is
   rejected.

2. **Create an API key** at [Resend → API keys](https://resend.com/api-keys).
   *Sending access* is enough — it does not need full access.

3. **Add the environment variables** in Netlify under
   **Site configuration → Environment variables**:

   | Variable | Required | What it is |
   | --- | --- | --- |
   | `RESEND_API_KEY` | Yes | The key from step 2 |
   | `CONTACT_FROM_EMAIL` | Yes | Sender, on the verified domain — e.g. `Vikram M A A Website <website@vikramhere.com>` |
   | `CONTACT_TO_EMAIL` | No | Where enquiries land. Defaults to the address in the function |

   Redeploy after adding them; functions only pick up new variables on a fresh
   deploy. See [`.env.example`](.env.example) for the same list.

The sender is never the visitor's address — that would fail SPF/DKIM and land in
spam. Their address goes in `Reply-To` instead, so hitting reply in your inbox
replies to them.

A honeypot field (`bot-field`) silently discards bot submissions, and every field
is length-capped. If spam still gets through, add Cloudflare Turnstile or
reCAPTCHA and verify the token in the function before the send.

**Testing locally** needs the Netlify CLI, because `astro dev` does not run
functions:

```bash
npx netlify dev
```

Copy `.env.example` to `.env` and fill it in first. Emails sent with a real key
are real emails, so send them to yourself.

### Article view counts

Each post shows a "Views: N" counter — on the blog index next to the date, and
in the byline on the article itself. It is a Netlify Function at `/api/views`
([`netlify/functions/views.mjs`](netlify/functions/views.mjs)) storing one
number per post slug in [Netlify Blobs](https://docs.netlify.com/blobs/overview/).

**Nothing to set up.** No account, no API key, no environment variables —
Netlify wires the Blobs credentials into the function at runtime. It starts
counting from zero on the first deploy.

How it behaves:

- The index reads every count in **one** request; the article page reports its
  own view and reads the new total back.
- A view counts **once per browser session** per post, so refreshing or hitting
  back does not inflate it (`sessionStorage`, not a cookie — nothing to consent
  to).
- The counting happens in JavaScript after the page loads, so crawlers and most
  bots never trigger it. The numbers stay closer to real readers than a
  server-side hit counter, but they are not analytics — GA4 is still the source
  of truth.
- If the function is unreachable, the counter **stays hidden** rather than
  showing a wrong number. Same with JavaScript off.

To reset or seed a count, use the Blobs UI under **Netlify → your site → Blobs →
`views`**; the key is the post slug and the value is a plain integer.

Two people loading the same post in the same instant can collapse into one
count — the function reads then writes, with no atomic increment. At this site's
traffic that is a rounding error, and the fix would be running a real database
for a counter.

`npx netlify dev` runs this locally too, against a local blob sandbox that is
separate from production.

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
- `Person`, `Blog` and `WebSite` structured data in one `@graph` (deliberately
  no `ProfessionalService` or `OfferCatalog` — nothing is on offer)

**Per page type:**
- Expertise pages → `Article` + `FAQPage` + `BreadcrumbList`
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
  what you write about and which pages matter. It also tells assistants plainly
  that you are not available for hire, so they stop recommending you as one.
  Keep it in sync with `site.ts`.
- **[`public/robots.txt`](public/robots.txt)** explicitly allows GPTBot,
  ClaudeBot, PerplexityBot, Google-Extended and others. Remove any you do not
  want reading the site — but blocking them means no citations from that
  assistant.
- **Answers are front-loaded.** Expertise summaries and FAQ answers state the
  conclusion in the first sentence, which is the shape an assistant can lift.
- **IndexNow pings on every production deploy.**
  [`scripts/indexnow.mjs`](scripts/indexnow.mjs) runs as an npm `postbuild` hook
  and POSTs every sitemap URL to `api.indexnow.org`, which fans out to Bing,
  Yandex, Seznam and Naver. That gets a new article into the Bing index in
  minutes instead of weeks, and ChatGPT's search retrieval reads that index.
  Ownership is proved by the hex-named `.txt` file in `public/` — the script
  finds it automatically, so rotating the key means swapping that one file.
  Google does not participate in IndexNow; it still discovers pages by crawling.

  The ping only fires when `CONTEXT=production`, so deploy previews and local
  builds skip it. Set `INDEXNOW_FORCE=1` to run it by hand. It can never fail a
  deploy — errors are logged and swallowed.

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
    ViewCount.astro    "Views: N", filled in from /api/views after load
  pages/
    index.astro
    about.astro
    portfolio.astro
    contact.astro
    thank-you.astro    noindex, excluded from sitemap
    404.astro
    expertise/
      index.astro
      [slug].astro     one page per entry in `expertise`
    blog/
      index.astro
      [...slug].astro
  content/blog/        Markdown posts
  styles/global.css    design tokens + all shared styles
public/
  robots.txt  llms.txt  favicon.svg  og-default.png
```
