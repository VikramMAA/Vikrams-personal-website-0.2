---
title: "Why is a review site outranking my own website?"
seoTitle: "When a Directory Outranks Your Website"
description: "For your own company name this is mechanical and fixable this week. For your category plus your city it is structural, and most fixes are wasted."
publishedAt: 2026-11-23
published: true
tags: ["SEO", "Local SEO", "Reviews"]
---

The directory page sitting above you has one job, and for a lot of searches it is doing that job better than your website does.

For a lot of searches. Not all of them, and the difference decides whether this is worth an afternoon or worth letting go.

So before anything else, run two searches. Your own company name. Then your category plus your city.

If a directory is above you on your own name, that's mechanical and you can usually fix it this week. If a directory is above you on "best plumber in Charlotte", that's structural, and almost everything you'd spend money on there is wasted. Different problems, opposite advice, and most of the articles on this question blur them into one.

## Your own name, where you should win and probably can

Start with what Google says about how it decides what to call your site in the results, because it's documented and most people have never read it.

[Google's documentation on site names](https://developers.google.com/search/docs/appearance/site-names) says the generation is "completely automated and takes into account content from a site's home page and references to it that appear on the web." To state a preference you add `WebSite` structured data to your home page, and Google says that markup "is most important" while the system also considers `og:site_name`, your `<title>`, heading elements and other text on the home page.

Then there's the line that quietly indicts half the local businesses I look at:

> "Avoid using a generic name. A generic name like 'Best Dentists In Iowa' is unlikely to be selected by our system as a site name, unless that's an extremely well-recognized brand name."

If your homepage title reads "Affordable Roofing Contractors Tampa FL | Free Estimates", you have told Google that your site is called something it will not use. The directory, which is very clear about being called Yelp, wins the naming contest by default.

The technical rules are specific and worth checking rather than assuming:

- One site name per site, where a site means the domain or subdomain. Subdirectories are not supported.
- The `WebSite` markup has to be on the home page itself, meaning the root URL of the domain or subdomain.
- The home page has to be crawlable. If it's blocked, Google says it may not be able to generate a site name at all.
- If you have duplicate home pages, http and https or www and non-www, the same structured data needs to be on all of them, not only the canonical one.
- And if `WebSite` markup already exists on your site, nest the name properties inside that same node rather than adding a second `WebSite` block. Plugins cause this one constantly.

There's also `alternateName`, which exists for when your first choice isn't available or your business is better known by an acronym.

Three more things to check while you're in there, none of which take long. Whether your about page actually says who you are in plain sentences, because a thin or missing one removes the page Google would otherwise use to understand the entity. Whether your entity markup corroborates you properly, which I went through in [what schema markup a local business actually needs](/blog/schema-markup-for-local-business/) and won't repeat. And whether the directory simply holds more inbound links pointing at it than you do, which is often the real answer and the slowest to fix.

## Your category, where you are fighting the wrong fight

Here's the part I'd most like you to accept, because it saves money.

"Best plumber in Charlotte" is a comparison query. The person typing it wants options, ratings and a shortlist. A directory page gives them twelve businesses with stars next to each one. Your page gives them one business and says it's good.

Google isn't making an aesthetic judgment about whose site is nicer. It's matching a page shape to an intent, and a single-vendor page structurally cannot satisfy a comparison intent no matter how well it's written.

Which means the SEO project to outrank Yelp for your category term is usually a project to turn your page into something it can't be. I've watched that money get spent and I've never seen it work on the head term.

There's one honest exception. A genuinely comparative page on your own site can rank for some of the longer versions of these queries, because it is comparative: an honest piece on how to choose between the three approaches in your trade, including when you're the wrong choice. That's a content bet with a long payback and it's a different project from fixing a title tag. It will not beat the aggregator on the two-word head term, and anybody who tells you it will is selling you the project.

## The twenty-minute audit that changes what you do

Open the directory's page about your business in one tab and your own site in another.

List what theirs has that yours doesn't. In practice it's usually the same set: opening hours, service area, some indication of price, photographs of actual completed work rather than stock images, named people, a review count with recent dates on it, and a stated response time.

Then do it in reverse. What does the directory page get wrong about you? Old hours, a phone number that forwards nowhere, a category you stopped serving in 2023, a description a scraper assembled from an older version of your website.

That second list is the one worth acting on today, and here's why. Whichever page is above you is the page your customer is reading. You can spend six months trying to replace it, or you can spend twenty minutes making it accurate and making your entry the best-looking one on it. Only one of those changes anything this quarter.

## Treat it as a channel, not a rival

The free listing you never asked for still sends you calls, and almost nobody measures it.

Put a tagged link on your website field in the listing where the platform allows it. Add "where did you find us" to your intake script, asked as a real question rather than a dropdown nobody completes. Then you'll know within a month whether the thing above you is a competitor or a supplier.

If it's a paid listing rather than a free one, the renewal arithmetic is a separate exercise and I set it out in [Yelp or Google Business Profile, which should you fix first](/blog/yelp-vs-google-business-profile/).

## Before lunch

Search your own company name, signed out, and look at what Google is calling your website in the results. If it isn't your business name, open your homepage source and see what you told it.

Then open the directory's page about you and fix whatever is wrong on it.

Then stop looking at your category term. For most local businesses the directory ranking above you there isn't an insult, it's a distribution channel you're refusing to optimize because it offends you.

If you want a second opinion on which of the two problems you've actually got, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on SEO](/expertise/seo/) cover the rest. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
