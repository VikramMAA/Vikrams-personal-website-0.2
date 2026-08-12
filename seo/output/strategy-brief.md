# Keyword strategy — Vikram M A A, vikramhere.com

_Research run 12 August 2026. Market: tier 1 India, home market Bengaluru._

---

## What we found

There are two completely different opportunities on this site and they need to
be run as two separate programmes.

**The first is small, valuable and nearly finished.** The home market terms
[`digital marketing consultant bengaluru`, `seo consultant bengaluru`,
`freelance digital marketer bangalore`] have a SERP made almost entirely of
other solo consultants' personal sites plus "top 10 freelancers in Bangalore"
listicles. No national brand owns it, no directory owns it. A well built
personal site with real case studies and proper schema can rank here, and this
is where the money actually is because these searchers are looking to hire
someone this week. There are maybe fifteen pages of work here in total.

**The second is large, slower and is what the daily publishing engine feeds.**
253 non-parked informational and BOFU clusters where Indian buyers ask the
question before they shortlist anyone: what does this cost, how long does it
take, is my agency ripping me off, why did my traffic drop, how do I show up
in ChatGPT. These SERPs are wall-to-wall agency blog posts that hedge on every
number and say nothing specific. That is the gap. A post that states a real
range and explains the reasoning wins the citation, both in Google and in the
assistants.

The single biggest opportunity on this site is **AI search visibility**, and it
is a timing thing. The `ai search optimisation`, `how to rank in chatgpt` and
`ai overviews traffic drop` SERPs are wide open, every result is an agency post
published this year with near-identical advice, and there is no established
authority yet. The site already has one strong post on this. It should have
fifteen. This is also the topic where being cited by an assistant is itself the
proof of the service being sold, which is a rare piece of luck.

The second biggest is **pricing and agency-evaluation content**. Every page
ranking for `digital marketing consultant cost india` refuses to name a number.
Naming numbers is uncomfortable and it is exactly why it will get quoted.

---

## Confidence and what is missing

**Data sources:** live SERP checks on 20 head terms and cluster primaries
(August 2026), competitor structure from five Bengaluru solo-consultant sites
ranking on the home-market terms, site inventory read directly from the Astro
repo, and pricing and category language pulled from ranking Indian agency pages.

**Confidence:** medium-high on intent and winnability, which are SERP-backed.
Low on demand size, which is not measured at all.

Limitations you should know about:

- **No Google Search Console access.** This is the big one. Nothing here is
  ground truth about what the site already ranks for, which is why the quick-win
  band has exactly one entry in it. Positions 8 to 25 are the fastest wins on
  any site and right now they are invisible. Connect GSC, export the query
  report to `seo/work/gsc.json`, and rescore. Expect the priority order to
  change materially.
- **No paid keyword tool.** Demand tiers are inferred from phrasing and SERP
  shape. There is deliberately not a single search volume number in this plan,
  because a made-up one is worse than none.
- **SERP checks ran against a US-located index.** Indian SERPs will differ,
  especially on map pack composition and which local agencies rank. Treat
  city-level winnability as directional rather than measured.
- **The 83 parked clusters are a judgment call**, not a difficulty measurement.
  They are parked because one consultant cannot credibly write 400 words of
  genuinely city-specific content about meta ads in Ahmedabad.

---

## The numbers

| | |
|---|---|
| Keywords harvested | 3,218 |
| Clusters | 359 |
| Quick win | 1 |
| Core | 63 |
| Growth | 212 |
| Parked | 83 |
| SERPs manually checked | 20 |

---

## The local decision, which is the one that matters most

Vikram is one person in Bengaluru with no office in Mumbai, Chennai or Pune.
The service × city matrix generates 2,928 keyword combinations. Building pages
for them would produce a doorway-page site that ranks for none of them and
risks the whole domain.

The rule applied here: **a service × city cell earns a URL only when there is
something genuinely city-specific to say.** A client there, a case study, a
market condition that differs.

That gives:

- **Bengaluru — dedicated pages for every service.** Real proximity signal, a
  Google Business Profile that can legitimately rank in the map pack, and real
  local work to point at. This is the only city where the map pack is in play.
- **One hub page per secondary tier 1 city** — Mumbai, Delhi NCR, Hyderabad,
  Chennai, Pune, Kolkata, Ahmedabad. Organic only. These will rank on the
  strength of the content and the domain, not on proximity, and they should be
  written honestly as "I work with companies in this city remotely" rather than
  pretending to a local address.
- **92 service × city cells held back** as service-area mentions. Their
  keywords belong in the parent service page copy and in `areaServed` schema,
  not on their own URLs.

**Do not create Google Business Profile listings for cities without a real
address.** It is the single most common way local SEO for consultants gets
torched, and a suspension takes weeks to reverse.

### One correction to make in the page plan

The scaffolded plan lists `bengaluru` and `bangalore` clusters separately, so
you will see `google ads expert bengaluru` and `google ads expert bangalore` as
two pages. **They are one page.** The same searcher is satisfied by the same
content, and both spellings should appear naturally in the copy of a single
URL. Consolidate before building. Same for `digital marketing consultant
bengaluru` / `bangalore`, and every other pair.

---

## First 30 days

1. **`/digital-marketing-consultant-bengaluru/`** — the one quick win, score 73.
   Home market, transactional intent, SERP full of beatable personal sites.
   This page should carry the case studies, the areas covered, and
   `ProfessionalService` schema.
2. **Consolidate the Bengaluru service × city pages** into six URLs, one per
   service, each covering both spellings.
3. **Connect Search Console and rescore.** Everything above is inference until
   this happens.
4. **Start the daily publishing engine** on the editorial clusters. See
   `content-ops/`.

## The core set

The 63 core clusters split into two groups.

**Money pages (build once, maintain):** the six Bengaluru service pages, the
seven secondary-city hub pages, and the pricing page. Roughly fifteen URLs.

**Editorial (published continuously):** everything else. The highest-scoring
non-geo clusters are `google business profile optimisation`, `digital marketing
agency not delivering results`, `social media marketing for small business
india`, and `whatsapp business api cost india`. These are all questions asked by
someone who is weeks away from hiring somebody.

## What we are deliberately not chasing

- **`b2b lead generation india`** and its variants. The SERP is the Semrush
  agency directory and "top 10 agencies" listicles. A consultant's site does not
  displace a directory on a term like this. Go at the long tail underneath it
  instead, where the actual buying questions live.
- **The 83 parked city × service cells.** Covered above.
- **`google business profile optimisation` as a head term** is winnable only on
  India-specific angles, because Google's own help documentation and Shopify
  hold the top of that SERP. Every post on this topic should be explicitly about
  the Indian market.
- **Generic head terms like `digital marketing`.** No intent, no chance, no
  revenue.

---

## How this plan gets consumed

`seo/output/keyword-plan.json` is the machine-readable contract. The daily
publishing engine in `content-ops/` reads it through
`content-ops/scripts/refill_queue.py` when the editorial queue runs low.

The scaffolded page titles and outlines in the plan are **placeholders**. Every
page marked `needs_review` has an auto-generated title that a builder would take
literally, and it reads like it was assembled by a script because it was.
Rewrite them before building anything.
