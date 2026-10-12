---
title: "How do I set up hreflang for an Estonian and English site?"
seoTitle: "Hreflang for an Estonian and English Website"
description: "If your Estonian pages are tagged ee, you have told Google they are written in Ewe, which is spoken in Ghana and Togo. Estonian is et."
publishedAt: 2026-10-12
published: true
tags: ["Technical SEO", "Estonia", "SEO"]
---

Go and view source on your Estonian homepage. Find the hreflang line.

If it says `ee`, you have spent however long telling Google your pages are written in Ewe, which is a language spoken in Ghana and Togo by about four million people, none of whom are your customers.

Estonian is `et`. EE is the country code, and country codes are not language codes.

That is the cheap mistake, and it takes two minutes to fix. There are two more expensive ones underneath it: annotations that Google discards entirely because the links do not go both ways, and an automatic language redirect that can mean a crawler only ever sees one version of your site.

The tag block you can copy is further down. The reasons first, because this is the kind of thing people fix once and break again six months later.

## The codes, which is where it goes wrong

From Google's own documentation on localised versions: the language code is ISO 639-1, optionally followed by an ISO 3166-1 Alpha 2 region code. Codes are case insensitive, so `et` and `ET` behave the same.

So Estonian is `et` and English is `en`. That is usually all you need.

A region code is optional and most Estonian sites do not need one. `et-EE` is valid, and it tells Google nothing useful, because Estonian is not meaningfully spoken anywhere else. Adding the region narrows your targeting for no gain.

Three traps worth knowing, all of them from the documentation rather than from folklore.

A region code cannot stand on its own. `be` means Belarusian, not Belgium. If you want Belgian Dutch speakers, that is `nl-BE`.

Reserved codes do nothing. Google lists `EU`, `UN` and `UK` as having no effect. So if you sell into Britain and have written `en-UK`, that annotation is being ignored. The correct code is `en-GB`.

And unsupported codes are not recognised at all, which means they fail silently. Nothing in Search Console shouts about it.

## The block to copy

Two language versions, Estonian and English. This exact set goes in the `<head>` of both pages, identical on each, because Google requires every version to list itself alongside all the others.

```html
<link rel="alternate" hreflang="et" href="https://example.ee/" />
<link rel="alternate" hreflang="en" href="https://example.ee/en/" />
<link rel="alternate" hreflang="x-default" href="https://example.ee/en/" />
```

Three things about that block.

The self-reference is not optional. The Estonian page lists the Estonian URL. So does the English page. The set is the same on both.

`x-default` carries no language code, because it is not a language. It is the fallback for somebody whose browser settings match none of your versions, which for an Estonian company selling outward is most of the planet. Google describes it as recommended rather than required, and it works best pointing at a language selector or at whichever version serves a stranger best. For an export facing company that is the English page, not the Estonian one.

And the links have to be reciprocal. Google's wording is blunt: if two pages do not both point to each other, the tags will be ignored. Not weighted down. Ignored.

That is the single most common failure, and it is usually caused by a template that outputs the alternate set on one language's layout and not the other's.

## Why it stops working without anybody noticing

Here is the part that makes hreflang a maintenance job rather than a setup job.

An annotation pointing at a URL that is not indexable gets dropped. If the target 301s somewhere else, returns a 404, or carries a canonical tag pointing at a different URL, the annotation goes with it.

So the failure mode is decay. You implement it correctly, then somebody tidies the URL structure, or a page gets consolidated, or a trailing slash convention changes, and a portion of your set quietly stops counting. Nothing visibly breaks. Traffic does not fall off a cliff. The wrong language version just starts turning up for some people.

Practical rule: any time URLs change, the hreflang set gets re-checked. Put it on the same checklist as redirects, because it is the same event.

There are three ways to declare all this, by the way: link tags in the head, HTTP `Link` headers, or `xhtml:link` entries in your XML sitemap. Google treats them as equivalent and says there is no benefit to using more than one. Pick whichever your stack makes easiest and do not belt and braces it.

## The automatic redirect, which costs the most

Now the one I would check before anything else, and I want to be straight about the status of this advice.

Google's documentation does not lay down a rule against IP based redirects. It says only that you should consider a fallback page for auto-redirecting home pages. So what follows is reasoning from how crawling works rather than a cited policy.

Googlebot crawls predominantly from United States addresses and does not announce a language preference the way a person's browser does. If your root URL inspects the visitor's IP or Accept-Language header and redirects accordingly, then every crawl of that URL lands in whichever branch your logic sends an American visitor with no stated preference.

The other version may never be requested at all. Your Estonian pages exist, your sitemap lists them, and the crawler keeps being bounced away from them.

So: detect, do not redirect. Serve whichever version the URL asks for, and if you think the visitor wants the other one, show a dismissible banner at the top offering it, with a real link, and remember their choice. The user gets the help and the crawler gets both versions.

## Make the switcher a real link

Same caveat: Google's documentation does not address language switchers. The mechanism is what matters.

A switcher built as a `<select>` with a JavaScript change handler and no anchor tag gives a crawler nothing to follow. There is no href, so there is no URL, so the second version is discoverable only through your sitemap and the annotation set, both of which are things that break in the ways described above.

Make it an `<a href>` pointing at the real URL of the equivalent page. Style it however you like. It is one line of markup and it removes a dependency.

## Which pages actually need both languages

Briefly, because I have argued the strategy elsewhere, in [how an Estonian company should approach international SEO](/blog/international-seo-for-estonian-companies/), where I said the tagging was a separate job. This is that job.

The short version for a bilingual site. Your Estonian version will always be the smaller search market, because the country is 1.3 million people. So keep it correct, keep it current for the customers and partners who read it, and do not translate things into Estonian by reflex. Product pages, pricing and support content, yes. Forty blog posts aimed at a German buyer, no.

## Before lunch

Fifteen minutes.

View source on your Estonian homepage and your English homepage. Check the hreflang codes are `et` and `en`, that both pages carry the identical set, and that each lists itself.

Then take the URLs out of those tags, paste them into a browser, and confirm each returns a 200 rather than a redirect.

Then open your root URL in a private window with a VPN set somewhere outside Estonia, and see whether you get bounced.

If you'd like a second pair of eyes on a bilingual setup before you build more pages on top of it, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on SEO](/expertise/seo/) cover the rest. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
