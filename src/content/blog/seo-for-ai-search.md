---
title: 'SEO for AI search — how to get cited by ChatGPT, Perplexity and AI Overviews'
seoTitle: 'SEO for AI Search — Getting Cited by ChatGPT & Perplexity'
description: 'AI assistants now answer the questions buyers used to type into Google. What determines whether your site gets cited — and what carries over from SEO.'
publishedAt: 2026-08-12
tags: ['SEO', 'AI Search', 'Content']
---

A growing share of buyer research now happens inside an AI assistant. Someone asks ChatGPT which vendor to shortlist, or Perplexity how a category works, and gets an answer with three or four sources cited. If you are not one of those sources, you were not in the consideration set — and unlike a Google result, there is no page two to be on.

The good news: most of what makes a site work for AI search is the same discipline that makes it work for Google. The differences are narrow but they matter.

## What carries over from traditional SEO

**Crawlability.** AI crawlers have to be able to read the page. A site that renders its content client-side in JavaScript is a much bigger problem here than in classic SEO, because these crawlers are generally less patient about executing scripts than Googlebot is. Static HTML wins.

**Topical depth.** Assistants synthesise from sources that cover a subject properly. One thin page on a topic does not get cited; a cluster of connected pages that answers the whole question does.

**Being referenced elsewhere.** Models weight sources that other credible sources talk about. Digital PR and genuine mentions matter here in much the same way links matter to Google.

## What is genuinely different

### Answers need to be extractable

An AI assistant is looking for a passage it can lift and attribute. That rewards a specific writing shape: state the answer in the first sentence, then explain it.

Compare these two openings for a page about SEO timelines:

> *SEO is a long-term investment and results vary depending on many factors including your industry, competition, and current site health...*

> *SEO typically shows movement in 4 to 8 weeks for technical and on-page fixes, and 4 to 6 months for content and link building to compound.*

The second one can be quoted. The first one cannot, because it does not say anything.

### Structured data does more work

Schema markup has always helped Google understand a page. For AI crawlers it is more valuable still, because it removes ambiguity about what the page is, who wrote it, and what entity it describes. `Person`, `Organization`, `Service` and `FAQPage` markup all give an assistant a machine-readable version of your claims.

### FAQ content is disproportionately effective

Question-and-answer format maps directly onto how people prompt assistants. A page that literally contains the question your buyer would ask, followed by a direct answer, is close to an ideal citation target.

Two rules: the answer must be visible in the HTML source, not loaded on click via JavaScript; and it must actually answer the question rather than pivot into a pitch.

### Entity clarity beats keyword density

Assistants reason about entities — people, companies, services, places — not keyword frequency. If your site never states plainly who you are, what you do, and where you operate, the model has to infer it, and inference is where it starts hedging or omitting you.

Say it explicitly, in the copy, and mirror it in structured data.

## A practical checklist

1. **Serve static HTML** wherever possible. If the content only exists after JavaScript runs, assume some crawlers will not see it.
2. **Front-load answers.** First sentence of each section states the conclusion.
3. **Add structured data** for Person, Organization or ProfessionalService, Service pages, FAQs and articles — and keep it consistent with the visible copy.
4. **Publish real FAQ blocks** using the exact phrasing your buyers use, with the answers in the source HTML.
5. **State your entity facts plainly** — name, role, location, services, years of experience.
6. **Allow AI crawlers in robots.txt** unless you have a considered reason not to. Blocking GPTBot keeps you out of ChatGPT's citations.
7. **Add an `llms.txt`** at your root — a plain-text summary of what the site is and which pages matter. Adoption is still early, so treat it as cheap insurance rather than a ranking factor.
8. **Keep the facts current.** Assistants surface stale claims confidently. An out-of-date figure on your site becomes an out-of-date figure in someone's answer.

## What has not changed

None of this rescues a site with nothing to say. AI search raises the value of genuinely specific content and lowers the value of content written to hit a word count — which was already the direction Google was heading.

The practical upshot for most companies is that AISEO is not a separate workstream. It is SEO done with more discipline about structure and more honesty about substance.

---

*Want your site assessed for both traditional and AI search visibility? [Get in touch](/contact/) — or read how I approach [SEO engagements](/services/seo/).*
