# Handoff — Vikram M A A personal website

**Session date:** 12 August 2026
**Built by:** Claude Code (local session, Windows)
**Continuing in:** Claude Code on the browser (claude.ai/code), working against GitHub

---

## TL;DR — read this first

A complete Astro-based consulting website was built, verified and committed **locally only**.

**Nothing has been pushed to GitHub.** The code lives at
`C:\Users\Vikram\Documents\vikram-personal-website` on branch `main`, one commit,
with `origin` already pointing at `https://github.com/VikramMAA/Vikrams-personal-website-0.2.git`.

**You cannot continue in the browser until you push.** See
[Step 1 — get the code onto GitHub](#step-1--get-the-code-onto-github).

The repo you nominated is **not empty** — it holds a working Hugo site plus 14 of
your blog posts. Nothing there was touched. The plan is to push to a *new branch*,
port the posts, then switch the default branch. Details in
[The repo situation](#the-repo-situation).

---

## What was built

A static marketing/consulting site designed so that search engines and AI
assistants can both read and cite it.

**Stack:** Astro 7 · plain CSS (no Tailwind) · zero client-side JavaScript
(the mobile menu is CSS-only) · deploys to Netlify with no configuration.

**Why Astro:** it outputs pure static HTML. An SPA renders an empty shell to
crawlers, which is a real handicap for SEO — and a worse one for AI crawlers,
which are less patient than Googlebot about executing JavaScript.

### Pages (16 built routes)

| Route | Purpose |
| --- | --- |
| `/` | Hero, credibility stats, problem framing, services, process, case studies, industries, FAQ, CTA |
| `/services/` | Hub listing all six services |
| `/services/seo/` | SEO |
| `/services/performance-marketing/` | Google + Meta ads |
| `/services/social-media-marketing/` | Organic social |
| `/services/content-marketing/` | Content strategy + production |
| `/services/lead-generation/` | Pipeline build |
| `/services/marketing-sales-training/` | Team training — the differentiator you called out |
| `/results/` | Three case studies: Mapletree, Ayanam Aerospace, MUKA |
| `/about/` | Background, method, industries, timeline |
| `/blog/` | Insights index |
| `/blog/seo-for-ai-search/` | Seed post on AISEO |
| `/blog/how-to-choose-a-digital-marketing-consultant/` | Seed post targeting hiring-intent search |
| `/contact/` | Netlify-backed enquiry form + direct contact |
| `/thank-you/` | Post-submission page (noindex, excluded from sitemap) |
| `/404` | Custom not-found with full link list |

### Content architecture

**Everything is driven from one file: `src/data/site.ts`.** Name, contact
details, stats, all six services (copy, deliverables, outcomes, FAQs, SEO titles),
case studies, home FAQ, process steps and industry tags. Edit there and the pages,
navigation, footer, sitemap and structured data all update together.

Adding a service = add one object to the `services` array. The page, nav entry,
footer link, sitemap entry and `OfferCatalog` schema all appear automatically.

### SEO implementation

Structural rather than plugin-based:

- Unique `<title>` per page. The `| Vikram M A A` suffix is **dropped
  automatically** when it would push the title past ~62 characters, so nothing
  gets truncated in the SERP.
- Unique meta description per page, all under 158 characters.
- Canonical URL on every page.
- Open Graph + Twitter cards, using a generated `/og-default.png` (1200×630).
- `Person` + `ProfessionalService` + `WebSite` structured data in a single
  `@graph` on every page, cross-referenced by `@id`.
- Per page type: `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`,
  `ContactPage`, `ItemList`.
- `sitemap-index.xml` generated at build, with noindex pages filtered out.
- Semantic heading hierarchy — exactly one `<h1>` per page, verified.

### AISEO implementation

This is the part built specifically for the goal you named:

- **Static HTML output** — content is in the source, not assembled at runtime.
- **FAQ answers stay in the DOM when collapsed.** The accordion uses
  `<details>`/`<summary>`, so the answer text is in the HTML even when visually
  hidden. JavaScript-injected answers would be invisible to most AI crawlers.
- **`public/llms.txt`** — a plain-text brief telling assistants who you are, what
  you offer, your contact details, how engagements work, and which pages matter.
- **`public/robots.txt`** explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User,
  ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot and others.
- **Answers are front-loaded.** Service summaries and FAQ answers state the
  conclusion in the first sentence — the shape an assistant can lift and cite.
- **Entity facts stated plainly** in copy and mirrored in structured data:
  name, role, years, city, services, area served.

### Verification actually performed

Not assumed — checked:

- Production build: **16 pages, 0 errors, 0 npm vulnerabilities.**
- All 16 built pages audited: exactly one `<h1>` each, titles ≤60 chars decoded,
  descriptions ≤158, canonical present, structured data parses as valid JSON.
- **0 broken internal links** across the whole built site.
- No horizontal overflow at 375px on any page; none at 1280px either.
- Mobile hamburger menu opens/closes correctly; FAQ accordion opens and the
  answer text is confirmed present in the DOM.

Two real bugs were found and fixed during verification: a missing space in the
home `<h1>` ("accountable to**revenue**"), and a YAML parse failure from an
unquoted colon in blog frontmatter.

---

## The repo situation

`VikramMAA/Vikrams-personal-website-0.2` currently contains, on branch **`master`**:

- A Hugo site — a fork of the `hugo-profile` theme, titled "Vikram M A A - Profile"
- Its own `netlify.toml`
- `baseURL` still set to `hugo-profile.netlify.app`, suggesting it never moved to
  a custom domain
- **14 blog posts you wrote**, in `exampleSite/content/blogs/`
- 22 images in `exampleSite/static/images/`

**Nothing in that repo was modified, deleted or pushed over.** The new site is on
a separate local branch (`main`) that has never left your machine.

The safe sequence is: push to a new branch → port the posts → preview on Netlify →
switch the default branch when you're satisfied.

---

## Step 1 — get the code onto GitHub

Run these locally. They push your work to a **new branch**; `master` is untouched.

```bash
cd "C:\Users\Vikram\Documents\vikram-personal-website"
```

```bash
git branch -m main astro-rebuild
```

```bash
git push -u origin astro-rebuild
```

Once that lands, open claude.ai/code, connect the repo, and work on the
`astro-rebuild` branch.

> If GitHub asks for credentials, use a Personal Access Token as the password
> (Settings → Developer settings → Personal access tokens), not your account
> password.

---

## Step 2 — port the 14 blog posts

You chose to port all of them, keeping their SEO value.

### The posts

| Date | Slug | Title |
| --- | --- | --- |
| 2022-01-02 | `First-Day-As-A-Freelancer` | First Day As A Freelancer |
| 2022-01-14 | `SecondWeekAsAFreelancer` | Second Week As A Freelancer |
| 2022-02-14 | `First-month-as-a-freelancer` | First Month As A Freelancer |
| 2022-03-01 | `Second-month-as-a-freelancer` | Second Month As A Freelancer |
| 2023-04-09 | `How-Exercise-Helps-Me-As-A-Freelancer` | From Flab to Fab: How Freelancers Can Pump Up Their Productivity… |
| 2023-04-19 | `5-easy-tips` | Vikram's 5 Tips to Rule the Digital World Like a Boss! |
| 2023-05-01 | `Local-SEO` | Local SEO: The Ultimate Recipe to Boost Your Business's Visibility! |
| 2023-05-05 | `10-strategies-for-SEO` | 10 Proven Strategies to Boost Your Website's SEO! |
| 2023-05-26 | `How-to-Use-Social-Media-to-Grow-Your-Small-Business-in-the-UK` | How to Use Social Media to Grow Your Small Business in the UK |
| 2023-06-07 | `digital-transformation-uk` | Deeper Digital Transformation: The Need for Businesses in the UK |
| 2023-06-22 | `small-business-USA` | How Small Businesses in the USA Can Win Hearts (and Sales)… |
| 2023-07-11 | `How-Coaches-in-the-UK-Can-Use-Social-Media-to-Find-Clients` | How Coaches in the UK Can Use Social Media to Find Clients |
| 2026-05-21 | `How-AI-Agents-are-Helping-Indian-Business-Earn-in-USD` | How AI Agents are Helping Indian Business Earn in USD |
| 2026-05-22 | `cold-email-deliverability-2026` | Your Cold Emails Are Landing in Spam: The 80-Word AI Fix… |

Source: `exampleSite/content/blogs/` on `master`.
Images: `exampleSite/static/images/` → move to `public/images/`.

### Frontmatter mapping

Hugo and Astro use different schemas. The conversion:

| Hugo | Astro | Note |
| --- | --- | --- |
| `title` | `title` | **Must be quoted** — several contain colons, which break YAML unquoted |
| `date` | `publishedAt` | Drop the timezone suffix; `2022-01-02T00:00:00+05:30` → `2022-01-02` |
| `description` | `description` | Several exceed 158 chars — trim for the SERP |
| `tags` | `tags` | Hugo uses a YAML list; Astro schema takes `['A', 'B']` |
| `draft: false` | `published: true` | Inverted meaning — don't copy the value across |
| `image` | *(not in schema yet)* | Needs a `heroImage` field added — see below |
| `author` | — | Drop; the site has one author, already in the schema |
| `toc` | — | Drop; the post layout auto-generates a TOC at 3+ `##` headings |
| `github_link` | — | Drop; it's theme boilerplate pointing at the original theme repo |

### Things that need adding to support the port

1. **A `heroImage` field** in `src/content.config.ts` — the current schema has no
   image field, so `image:` has nowhere to go. Add it optional, then render it in
   `src/pages/blog/[...slug].astro` and optionally on the blog index cards.
2. **Image files** copied from `exampleSite/static/images/` to `public/images/`,
   keeping the `/images/...` paths so the frontmatter references still resolve.
3. **One broken reference to fix:** `cold-email-deliverability-2026.md` points at
   `/images/cold-email-deliverability-2026.jpg`, but the actual file is named
   `cold-email-deliverability-2026.jpg.png` (double extension). Rename the file or
   fix the reference. The other 13 all resolve correctly.

### Preserve the URLs

The Hugo site served posts at `/blogs/<slug>/`. The Astro site serves `/blog/<slug>/`
— note **blog** vs **blogs**. If the Hugo site was ever live and indexed, add
redirects to `netlify.toml` so existing links and rankings carry over:

```toml
[[redirects]]
  from = "/blogs/*"
  to = "/blog/:splat"
  status = 301
```

If the Hugo site was never publicly live on a real domain, skip this — there's
nothing to preserve.

### Prompt to use in the browser session

> The `master` branch of this repo has a Hugo site with 14 blog posts in
> `exampleSite/content/blogs/`. Port all 14 into the Astro site on this branch:
>
> 1. Add an optional `heroImage` string field to the blog collection schema in
>    `src/content.config.ts`, and render it in `src/pages/blog/[...slug].astro`
>    and on the blog index cards.
> 2. Copy the images from `exampleSite/static/images/` to `public/images/`,
>    keeping filenames so the `/images/...` references resolve. Fix the
>    double-extension file `cold-email-deliverability-2026.jpg.png`.
> 3. Convert each post's frontmatter: `date` → `publishedAt` (date only, no
>    timezone), `draft: false` → `published: true`, `image` → `heroImage`. Drop
>    `author`, `toc` and `github_link`. Quote every string value — several titles
>    contain colons and will break the YAML parser unquoted.
> 4. Trim any `description` over 158 characters.
> 5. Keep the existing filename slugs exactly as they are.
> 6. Run `npm run build` and confirm all posts build with no errors.

---

## Step 3 — before going live

Search the codebase for `TODO` — every placeholder is marked. The important ones:

1. **Set your real domain.** Two places, and they must match:
   - `site` in `astro.config.mjs`
   - `site.url` in `src/data/site.ts`

   Then update the `Sitemap:` line in `public/robots.txt` and every URL in
   `public/llms.txt`.

2. **Confirm the four hero stats** in `src/data/site.ts`. Currently:
   `10+ years`, `19% bounce rate`, `3X organic engagement in 2 months`,
   `2 continents`. These came from the old portfolio PDF and are unverified.

3. **Confirm the case study numbers** on `/results/`. Same source, same caveat.
   The page already carries an honest "a note on the numbers" disclaimer, which
   is worth keeping.

4. **Get client permission** to name Mapletree, Ayanam Aerospace and MUKA
   publicly. Add real testimonials to the `quote` field on each case study once
   you have them — the field exists and renders, it's just empty.

5. **Check the LinkedIn URL** in `contact.socials` — it's a guess and will 404
   if wrong. It feeds the `sameAs` property in your Person schema, which is what
   search engines use to connect your site to your professional identity, so a
   wrong URL actively hurts.

6. **Review the About page timeline.** It uses vague labels ("Now", "Recent",
   "Earlier") rather than real dates. Real dates are better for credibility.

7. **Decide on the 10-year figure.** The old PDF said 5 years; you asked for 10.
   Make sure it's consistent with your LinkedIn, or it looks careless.

### Contact details currently on the site

Per your instruction, your personal email is used everywhere:

- Email: `vikram.1996523@gmail.com`
- Phone / WhatsApp: `+91 70199 90776` (from the old portfolio — confirm it's current)
- Location: Bengaluru, Karnataka, India (street address deliberately omitted)

---

## Step 4 — deploy to Netlify

`netlify.toml` is already in the repo, so there's nothing to configure manually.
It sets the build command, publish directory, Node 22, security headers and
cache rules.

1. Netlify → **Add new site → Import an existing project → GitHub** → select the repo.
2. **Set the branch to `astro-rebuild`** for a preview deploy, so the Hugo site
   isn't disturbed.
3. Netlify reads `netlify.toml` and fills everything in. Confirm and deploy.
4. Once you're happy, change the GitHub default branch to `astro-rebuild` (or
   merge it into `master`) and point Netlify at that.

> **Watch out:** the Hugo site on `master` has its own `netlify.toml` with Hugo
> build settings. If both branches are ever deployed by the same Netlify site,
> the configs will conflict. Use separate Netlify sites, or fully switch over.

### The contact form

Posts to a **Netlify Function** at `/api/contact` which emails the brief through
**Resend**. It will not send until you verify a domain in Resend and set
`RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in **Site configuration → Environment
variables**, then redeploy. Full steps are in the README under
*Deploying to Netlify → The contact form*.

A honeypot field handles most spam. If spam gets through, add Turnstile or
reCAPTCHA and verify the token inside the function.

---

## Step 5 — after launch

1. [Google Search Console](https://search.google.com/search-console) — add the
   property, submit `https://yourdomain.com/sitemap-index.xml`.
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) — add it. Bing's index
   also feeds ChatGPT search, so this matters more than it used to.
3. [Rich Results Test](https://search.google.com/test/rich-results) — validate the
   structured data on the home page and one service page.
4. **Google Business Profile** — create one for Bengaluru. It's the main lever for
   "digital marketing consultant near me" type searches, and the site's
   `ProfessionalService` schema is already set up to reinforce it.
5. **Keep `llms.txt` current.** It's the file AI assistants read for a summary of
   who you are. Update it whenever `site.ts` changes materially.

---

## Ideas worth doing next (not built)

Roughly in order of likely return:

1. **Location landing pages** — `/digital-marketing-consultant-bengaluru/` and
   similar. Local intent converts far better than generic terms, and the site
   structure already supports adding them cleanly.
2. **A real photo of you.** There is currently no portrait anywhere. For a
   personal consulting brand that's a conversion problem, not a design one.
3. **Testimonials.** The case studies have an empty `quote` field ready. Social
   proof is the single biggest gap on the site right now.
4. **A lead magnet** — the marketing audit checklist you'd use yourself, gated
   behind an email. Feeds the lead-generation service story and proves capability.
5. **More blog posts** targeting the questions buyers actually ask. The two seed
   posts show the intended shape: direct answers, front-loaded, no filler.
6. **Analytics.** Nothing is installed. Consider Plausible or Fathom over GA4 —
   lighter, no cookie banner needed, and the site currently loads zero
   third-party JavaScript, which is worth protecting.
7. **Per-page OG images.** Everything currently shares `/og-default.png`.
   Astro can generate per-page images at build time.

---

## Reference

### Local commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run preview` serves the built output so you can check the real thing.

### Where things live

```
src/
  data/
    site.ts            ← nearly all content lives here
    schema.ts          JSON-LD builders
  layouts/
    BaseLayout.astro   head, meta, structured data, header + footer
  components/
    Header.astro       sticky nav, CSS-only mobile menu
    Footer.astro
    FAQ.astro          <details> accordion — answers stay in the DOM
    CTA.astro
    Breadcrumbs.astro
  pages/
    index.astro  about.astro  results.astro  contact.astro
    thank-you.astro    noindex, excluded from sitemap
    404.astro
    services/index.astro  services/[slug].astro
    blog/index.astro      blog/[...slug].astro
  content/blog/        Markdown posts
  content.config.ts    blog collection schema
  styles/global.css    design tokens + all shared styles
public/
  robots.txt  llms.txt  favicon.svg  og-default.png
netlify.toml           build config, headers, caching
README.md              day-to-day editing guide
```

### Design tokens

Defined at the top of `src/styles/global.css`. Accent colour is `#ff5a1f`
(warm orange) against near-black `#0d1117`. Type is Inter, loaded from Google
Fonts. Change `--accent` in one place to re-skin the whole site.

### One caveat on the local setup

`.claude/launch.json` in the *ProductNova* project folder was given a second
entry (`vikram-site`) so this site's dev server could be previewed during the
session. It points at an absolute local path and is irrelevant to the browser
workflow — harmless, but you can delete that entry if you like.
