---
title: "Run your own SEO audit in two hours before you pay four figures for one"
seoTitle: "How to Do an SEO Audit Yourself in Two Hours"
description: "Six checks using only free tools, including the Search Console report that did not exist three months ago. What a bad result looks like at each step."
publishedAt: 2026-08-23
published: true
tags: ["SEO", "Technical SEO", "Audit"]
---

A decent chunk of what gets sold as an SEO audit is a crawler export with a logo on the cover.

I'm not being cynical about that, it's just what the economics produce. Run the site through a tool, take the 400 issues it flags, sort by severity, write a summary. It looks thorough because it's long. Most of the 400 items don't matter, and the two or three that do are buried on page nine next to a note about a missing alt tag on a footer icon.

You can find the things that actually matter yourself, in about two hours, with free tools and no crawler at all.

Six checks. Here they are in the order I'd run them, with what a bad result looks like at each step so you're not left staring at a number wondering whether it's good. **One of these did not exist three months ago and almost nothing published before June covers it.**

## 1. Page indexing, which is where most real problems show up

Open Search Console, go to Indexing, then Pages. It's called Page indexing now, not Coverage, which trips people up following older guides.

Compare the number of indexed pages against roughly how many pages you think you have. If you have 60 pages and 22 are indexed, stop reading and start there. Nothing else on this list matters while two thirds of your site is invisible.

Then look at the reasons under Not indexed. Two are worth your attention and the rest usually aren't:

**Crawled, currently not indexed.** Google fetched the page, looked at it, and decided not to include it. In bulk this is a quality signal, not a technical bug. It generally means thin pages, near-duplicates, or a lot of content that doesn't say anything a hundred other pages don't. Fixing this with technical tweaks doesn't work, and I've watched people spend a month trying.

**Discovered, currently not indexed.** Google knows the URL exists and hasn't bothered fetching it. On a small site this points at internal linking, because pages nobody links to look unimportant.

While you're here, a correction to older advice. Plenty of guides tell you to run a `site:` search to check indexing. Google has been clear that operator isn't a diagnostic tool and the counts it returns are unreliable. Use the report, not the search box.

## 2. The Generative AI report, which is genuinely new

Search Console shipped a Generative AI performance report in June this year. Performance, then Generative AI.

This is the first time Google has separated impressions inside AI Overviews and AI Mode from ordinary blue-link results. Before this, both were mixed into one number and you couldn't tell them apart.

Be clear about its limits, because the coverage of it has been breathless. You get impressions, broken down by URL, country and device, over time. You do not get click-through rate, you do not get the prompts people typed, and you do not get position. It tells you that you appeared, not what happened next.

What a bad result looks like: pages picking up normal search impressions while showing close to nothing in the AI report. That gap is your answer-shape problem, not a crawling problem. Google's own 2026 guidance is blunt that AI Overviews and AI Mode run on the same ranking and quality systems as regular search, so there's no separate technical trick. A page is eligible when it's indexed, snippet-eligible, reachable and actually useful.

One more thing to check while you're in there. Google added a control in June letting you keep content out of AI Overviews and AI Mode without affecting normal rankings. Confirm nobody switched it on for you. If your developer turned it on during the general panic about AI scraping, you've opted out of the fastest growing surface in search and your traffic report won't tell you why.

I've written more on [what actually earns AI citations](/blog/how-to-rank-in-chatgpt/) if that gap is where your problem turns out to be.

## 3. Core Web Vitals, and INP in particular

PageSpeed Insights, your five most important URLs, and read the field data at the top rather than the lab score underneath. Lab data is a simulation on a machine that isn't your customer's phone.

The 2026 thresholds haven't moved: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1, measured at the 75th percentile of real visits.

INP is where sites fail now. It replaced FID in March 2024 and it's much stricter, because instead of timing the first interaction it watches every interaction across the page's life and reports the worst one. Around half of sites pass all three thresholds, and INP has the lowest pass rate of the three by some distance.

If you fail INP, be realistic about what that means. It's usually a JavaScript architecture problem, not a plugin you can switch off, and it's the one item on this list most likely to need a developer.

## 4. Titles and H1s on your top twenty pages

The least glamorous check and reliably the most productive.

Pull your top twenty pages by impressions from the Search Console performance report. Open each one. Read the title tag and the H1.

Three failures to look for. Duplicate or near-duplicate titles across several pages, which is you competing with yourself. Titles built from a template where the only variable is a city or product name. And an H1 that's your company name rather than what the page is about, which happens more on homepages and service pages than anyone admits.

## 5. Internal links to the pages that matter

No crawler needed for the version that finds most of the problem.

List your five commercially important pages. For each one, ask how many other pages on your site link to it in the body copy, not the nav or the footer. If the answer is zero or one, that's why it's not ranking, and it's a free afternoon's work to fix.

The reverse check matters too. Anything reachable only from the sitemap is effectively an orphan.

## 6. Read your own first sentences

Take your top ten pages and read only the opening sentence of each.

Does it answer the question the page is about, or does it clear its throat? "Choosing the right supplier is an important decision for any business" answers nothing. "Most suppliers quote in 48 hours, and anything past a week usually means you're not a priority account" is a sentence a search engine can lift and a person can use.

This is the check that costs nothing and improves both regular rankings and your odds in AI answers, because both reward passages that say something specific.

## When to stop and get help

Honestly: when you fail INP and don't have a developer, when Page indexing shows a structural problem you can't explain, or when the audit is fine and traffic still isn't converting, because then it was never an SEO problem.

Everything else on this list you can do yourself this morning. The paid version finds the same things, it just arrives as a PDF.

If you'd like to talk through what you found, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch. My [notes on SEO](/expertise/seo/) go deeper on the parts worth prioritizing.
