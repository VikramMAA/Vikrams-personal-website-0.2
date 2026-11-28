---
title: "Two of my pages are competing for the same keyword. What do I do?"
seoTitle: "Two Pages Competing for One Keyword"
description: "Two pages showing for one search is not a problem. It becomes one under exactly one condition, and merging them is the last resort rather than the first."
publishedAt: 2026-11-28
published: true
tags: ["SEO", "Technical SEO", "Content Marketing"]
---

Two of your pages show up for the same search. That is not a problem.

It becomes a problem under exactly one condition: the wrong page is getting the clicks. If the page you wanted is winning and a second one is hanging around below it, you have an untidy results page and nothing else.

So before you merge anything, find out which page Google actually chose. That takes about six minutes, and in roughly half the cases I look at the answer is that nothing needs doing.

Merging is the last option on the list, not the first. It is also the only irreversible one.

## Six minutes in Search Console

Performance report. Filter to the exact query, not a phrase containing it. Then add Pages as a dimension so you can see which URLs are picking up impressions for it.

Three things you might see, and they need different responses.

**One page takes nearly all the clicks.** Good. Stop here, close the tab, go and do something that matters. A second URL appearing occasionally for a query is normal and is not costing you.

**Impressions are split and neither page holds a good position.** This is the real version of the problem. Two mediocre pages, each with a fraction of the relevance signals, neither strong enough to win.

**The position flips between the two pages week to week.** This is the clearest signal that Google cannot decide, and it is worth fixing because instability costs you clicks on the weeks the weaker page is showing.

One caveat on reading that report, and it catches people. The position figure is an average. A page sitting at average position seven might be holding steady at seven, or it might be alternating between three and eleven. Those are different situations and the range view hides the difference, so compare week against week rather than reading the twelve-month figure.

While you are in there, run the two URLs through URL Inspection. It will tell you which URL Google is treating as canonical, and whether that matches the one you declared. If those disagree, that is your answer and it is more useful than any tool's cannibalization score.

## The decision tree, with merging at the bottom

Four situations, in the order you should check them.

**The page you wanted is winning.** Do nothing. Genuinely nothing.

**Both pages deserve to exist, but the wrong one is winning.** This is the common case and it does not need a merge. The two pages are serving different intents and your internal links are pointing at the wrong one. Fix the links and the titles, leave both pages up.

**One page is genuinely redundant.** It covers the same ground, less well, and nobody would miss it. Redirect it into the other one. This is the only case where merging is correct, and the test is whether you could delete it without losing anything a reader would want.

**The two pages are near-duplicates of each other.** Different URLs, substantially the same content, usually created by a CMS or by somebody publishing twice. This is what canonical tags are for, and only this.

## What Google actually says about canonicals

This is where people break things, so it is worth reading [Google's own documentation on specifying a canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) rather than the summary of it.

Google lists the methods "in order of how strongly they can influence canonicalization". Redirects are "a strong signal that the target of the redirect should become canonical". A `rel="canonical"` annotation is "a strong signal that the specified URL should become canonical". Sitemap inclusion is "a weak signal".

Notice the word doing the work there. Signal. Not instruction.

The documentation goes further: "none of them are required; your site will likely do just fine without specifying a canonical preference", because if you do not specify one, "Google will identify which version of the URL is objectively the best version to show to users in Search."

And notice the scope. Every one of those methods is described as a way to specify a canonical "for duplicate or very similar pages". That is the documented purpose. Using a canonical tag to express a ranking preference between two pages that are genuinely about different things is using the tool outside what it is for, and the most likely outcome is that Google disagrees with you and you have changed nothing except your own confidence that it is handled.

Two more things from the same page worth knowing before you reach for a quick fix.

Google says: "We don't recommend using `noindex` to prevent selection of a canonical page within a single site, because it will completely block the page." Noindexing one of two competing pages is the second most popular fix on the internet and it is specifically advised against.

And do not send conflicting signals. The documentation says not to specify one URL in a sitemap and a different one with `rel="canonical"` for the same page, and to include a self-referential canonical on the page you do want.

## The fixes, in cost order

**Internal links first, every time.** Point them consistently at the page you want to win, using the anchor text you want it to win for. This is the cheapest intervention, the only fully reversible one, and in my experience the most effective. The mechanics are in [how to build an internal linking strategy](/blog/internal-linking-strategy/), which I will not repeat.

**Then titles and headings.** If both pages have the same phrase in the title tag and the H1, you built the ambiguity yourself. Change the one you do not want to win so it describes what that page is actually best at, which is usually narrower and more specific than what it currently claims.

**Then, and only if the earlier steps did not resolve it, redirect or canonical.** By the time you get here you should be able to say in one sentence why the page is redundant. If you cannot, it is not redundant and you are tidying.

Give the first two a month before you decide they did not work. Internal link changes are not instant.

## Before lunch

Pick the one query you actually care about. Filter Search Console to it, add Pages, and look at whether the right URL is winning.

If it is, you are done, and you have saved yourself a project.

If it is not, change the internal links and the losing page's title this morning, write the date down, and look again in four weeks before touching anything structural.

Here is the opinion I would defend. Most cannibalization work I see is a tidying instinct wearing SEO clothing. Two URLs appearing for one query feels untidy, and consolidating things feels like progress, so people merge pages that were both earning, lose the one that happened to hold a link nobody tracked, and report it as cleanup. The trigger rule from [refreshing old posts](/blog/content-decay-refresh-old-posts/) applies here too: no trigger, no visit. The trigger is the wrong page taking the clicks, and if that is not happening, there is no project.

If you want somebody to look at whether you have a real cannibalization problem or a tidy-up masquerading as one, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on SEO](/expertise/seo/) cover the rest. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
