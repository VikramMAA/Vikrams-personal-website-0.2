---
title: "How do I build an internal linking strategy?"
seoTitle: "Internal Linking Strategy: Where to Start"
description: "Most sites cast every internal vote at the contact page. Three exports find the misallocation, and fixing it costs nothing but an afternoon."
publishedAt: 2026-09-08
published: true
tags: ["SEO", "Internal Linking", "Technical SEO"]
---

Which page on your website has the most internal links pointing at it?

For almost every site I look at, the answer is Contact, followed by About, because both sit in the navigation and therefore collect a link from every single page you have ever published.

Neither of those pages needs help. Nobody is competing for your contact page.

Meanwhile the page that actually sells the thing you make money from has three links pointing at it, two of which say "learn more".

That misallocation is the whole subject, and unlike most SEO work it costs nothing to fix beyond an afternoon of attention.

## What an internal link is actually doing

Two jobs at once, and people usually think about only the first.

It passes some measure of importance from one page to another. A page that everything links to looks central. A page nothing links to looks like something you forgot about, and Google will treat it that way, sometimes by not indexing it at all.

And the anchor text describes the destination. That is the part being wasted at scale. The words you put in the link are one of the clearer signals about what the target page is for, and "click here" spends the signal on nothing.

So every internal link is a vote plus a caption. Most sites cast thousands of votes with the caption left blank.

## Forty minutes to find the problems

Three exports. Do them in this order.

**One. Find your orphans.** Crawl the site with any free crawler and sort by the number of internal links pointing at each URL. Anything on zero is an orphan, meaning it exists in your sitemap and nowhere else. Orphans are common after a redesign, after a blog category gets removed, and on any site where somebody published directly from a CMS without linking it from anywhere.

**Two. Find your almost-theres.** In Search Console, take the last three months of queries and filter for average position between 8 and 25. Those are pages Google already understands and has decided are nearly good enough. They are the highest return targets on your site, because moving from position 14 to position 7 changes traffic materially and moving from 60 to 40 changes nothing.

**Three. Read the indexing report.** Still in Search Console, open Page indexing and look for "Discovered, currently not indexed". On a small site that status is very often an internal linking problem: Google found the URL, decided nothing on your site treats it as important, and did not spend the crawl on it.

That is your list. Orphans to rescue, page-two pages to push, and unindexed pages to signal.

## Where the links should come from

Not from anywhere. From your strongest pages.

Find them the same way: highest impressions in Search Console, or the pages with the most external links if you have a tool that shows you. Those pages have accumulated something, and an internal link is how you move a share of it somewhere else.

The mechanical version of this is one afternoon:

Take your top ten pages by impressions. Open each one. Find a place in the body copy where it would be genuinely useful to send the reader to one of the pages from your list. Add the link there, in the prose, with a descriptive anchor.

In the body copy matters. A link inside a paragraph, where a human might actually click it, is treated differently from one in a footer block that appears on every page. If you would not click it, it is decoration.

## Anchor text, which is where the free win is

Three rules and some examples.

**Describe the destination, not the action.** "Click here", "read more", "this article" and "learn more" all tell the crawler nothing about the page you are pointing at.

Bad: "We wrote about pricing recently, click here to read it," with the link on "click here".

Better: "We went through what a commercial HVAC maintenance contract costs recently," with the link on that whole phrase.

**Vary it.** The same anchor text on all forty links to a page looks like a scheme, because historically it was one. Write the phrase that fits the sentence you are in, and let the variants accumulate naturally.

**Keep it short and specific.** Three to seven words. A whole sentence wrapped in a link dilutes the signal into nothing.

If you are briefing writers, put the required links directly in the brief with the URLs and the suggested anchors. Left to the writer this becomes zero links or a link to the homepage, which is why I put it in [the content brief template](/blog/content-brief-template/) as a required field.

## Hub and spoke, concretely

The structure that works is one substantial page per topic, with the detailed pages linking up to it and the hub linking back down to all of them.

For a commercial plumbing company that might be one page on commercial plumbing maintenance, with pages under it on backflow testing, grease trap servicing, pipe relining and emergency callouts. Each detail page links up to the hub. The hub links down to every one of them. The detail pages link sideways to each other where it genuinely helps the reader.

Two reasons this works. It concentrates the topic in one place so Google has an obvious page to rank for the broad query, and it means no page in the cluster is ever an orphan.

The failure mode is having eight pages that all half-cover the topic and none of which is clearly the main one. Then Google picks, and it usually picks a page you would not have chosen.

## The click depth rule for AI search

One newer consideration worth building in.

The working standard for 2026 is that anything you want ranked or cited should sit no more than two clicks from your homepage. Deeper than that and both crawlers and assistants treat it as peripheral, whatever the page says.

Check it in your crawler, which will show depth as a column. If a page you care about sits at depth four, the fix is a link from somewhere shallow rather than a rewrite of the page.

## What not to do

**Do not add a hundred links to a page.** Each one dilutes the others. Somewhere between five and fifteen contextual links in a long article is plenty.

**Do not install a plugin that automatically links every occurrence of a keyword.** It produces links that no human would click, in sentences where they make no sense, and it is visible from a distance.

**Do not build a footer block of forty links.** Site-wide footer links are heavily discounted and they look exactly like what they are.

**Do not use the same exact-match anchor every single time.** Natural variation is the point.

## Before lunch

Run the crawl. Sort by inbound internal links, ascending. The pages at the top of that list are invisible to Google, and you now know which they are.

Then open your five highest impression pages and add one link each, in the body copy, with a real anchor, pointing at something from your list.

That is nine or ten links. It is genuinely one of the highest return hours available in SEO, and it needs no budget approval, no developer and no new content.

If you want the wider version of this check, [the SEO audit you can do yourself](/blog/how-to-do-an-seo-audit-yourself/) covers where internal linking sits among the other things worth looking at, and my [notes on SEO](/expertise/seo/) cover the rest.

If you'd like a second read on your own site structure, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
