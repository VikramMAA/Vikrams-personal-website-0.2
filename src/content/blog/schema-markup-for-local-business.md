---
title: "What schema markup does a local business actually need?"
seoTitle: "Schema Markup for Local Business: What Still Works in 2026"
description: "FAQ rich results died in May. Schema stopped being about snippets and became about getting cited by AI. Here is what to keep, with the code."
publishedAt: 2026-09-01
published: true
tags: ["Technical SEO", "Schema", "AI Search"]
---

Schema markup does not improve your rankings. It never has, Google has said so repeatedly, and any agency telling you otherwise is selling something.

What it does is tell a machine what you are, without making it guess from your prose.

That distinction used to be worth very little to a small business. It is worth considerably more now, and the reason changed four months ago.

**Google deprecated FAQ rich results on 7 May 2026.** The question and answer dropdowns that expanded your search listing are gone. HowTo rich results went earlier and no longer appear on any device.

So if somebody is currently quoting you for FAQ schema to win those dropdowns, they are selling a feature that has been dead since spring.

Both types remain valid schema.org. Leaving the markup on your pages causes no harm. It simply produces nothing in the search results any more.

Which raises the obvious question of why you would bother with any of it.

## What schema is actually for now

The purpose moved rather than disappeared.

Google's Search team has confirmed structured data gives an advantage in results, and Microsoft's Bing product lead has said schema helps their language models understand content for Copilot. Both companies are telling you the same thing: their AI systems use structured data to work out what a page is about, verify it, and decide whether to cite it.

The figures circulating from the schema tooling vendors put content with proper markup at around two and a half times more likely to appear in AI-generated answers, with complete implementations seeing meaningfully more AI Overview appearances. Treat vendor numbers with appropriate suspicion, but the direction is consistent and both platform owners have confirmed the mechanism.

The mechanism is what matters. When a model reads your page it has to infer that you are a plumbing company in Austin that does emergency callouts. When it reads your schema, it does not have to infer anything. You told it, in a format designed for exactly that.

That is a small advantage per page and a large one across a site.

## The four types worth implementing

For a local or service business, this is the whole list.

**LocalBusiness**, or more precisely one of its subtypes. Use `ProfessionalService` for consultancies and agencies, `Dentist` or `Plumber` where a specific subtype exists. This is your anchor entity.

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://example.com/#business",
  "name": "Example Marketing",
  "url": "https://example.com",
  "telephone": "+1-512-555-0100",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "410 Congress Ave, Suite 200",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701",
    "addressCountry": "US"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "17:00"
  }],
  "sameAs": [
    "https://www.linkedin.com/company/example",
    "https://g.page/example"
  ]
}
```

Two things in there earn their place. `sameAs` connects your site to the profiles that corroborate you elsewhere, which is precisely the verification signal these systems are looking for. And `@id` gives the business a stable identifier you can reference from other pages.

**Service**, one per thing you sell, on the page that sells it.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Emergency plumbing repair",
  "provider": { "@id": "https://example.com/#business" },
  "areaServed": { "@type": "City", "name": "Austin" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "150",
    "description": "Call-out fee, applied against the repair"
  }
}
```

Notice `provider` pointing back at the `@id` from the first block. That is the part most implementations miss. You are not publishing disconnected fragments, you are describing one entity and the things it does, and the links between them are what make it legible.

**Person**, if a named individual is part of what people are buying. A consultant, a surgeon, a lawyer. Include qualifications, `jobTitle`, and `sameAs` pointing at their professional profiles. This is where the experience part of E-E-A-T becomes machine readable.

**BreadcrumbList**, which is dull, still produces a real rich result, and takes ten minutes.

That is it. Everything else on schema.org is either irrelevant to you or has been deprecated.

## The rule that decides whether any of this works

Everything above fails if you break one rule.

**The schema must describe what a visitor can actually see on the page. If the page does not say it, do not mark it up.**

Marking up review ratings you do not display. Prices that appear nowhere in the copy. Opening hours that contradict your Google Business Profile. Services you do not have a page for. Every one of those is a reason for the markup to be ignored, and in the aggregate it is a reason for your site to be treated as an unreliable source, which is the exact opposite of what you were trying to achieve.

Structured data is a claim about your own content. Make claims you can support.

## Validating it, which takes five minutes

Three checks, in order.

Google's Rich Results Test tells you whether you qualify for anything Google still renders. Run your key pages through it.

The Schema Markup Validator at validator.schema.org checks whether your markup is technically correct as schema.org, regardless of whether Google shows a rich result for it. Since most of the value is now AI comprehension rather than SERP display, this is the more relevant test of the two.

Then Search Console's enhancement reports, which surface errors across the whole site rather than page by page. Check it a fortnight after deploying, because that is when the problems you did not anticipate show up.

## Before lunch

Add the LocalBusiness block to your homepage and one Service block to your most important service page, with the `provider` reference connecting them. That is genuinely a thirty minute job and it covers most of the available benefit.

Then, if you are paying for FAQ schema as a rich results play, stop.

I went through [running your own technical audit](/blog/how-to-do-an-seo-audit-yourself/) separately, and validating structured data belongs in that same session.

If you'd like a second look at your markup, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch. My [notes on SEO](/expertise/seo/) cover the rest.
