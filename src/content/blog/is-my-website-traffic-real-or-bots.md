---
title: "Is my website traffic real, or is it bots?"
seoTitle: "Is Your Website Traffic Real or Bots?"
description: "Probably real. The harder problem is that GA4 cannot answer the question, and Google documents three separate reasons why it cannot."
publishedAt: 2026-11-21
published: true
tags: ["Analytics", "GA4", "Measurement"]
---

Four thousand sessions last month. Eleven enquiries.

You've already done that division, the answer felt wrong, and somewhere in the next few days you started wondering whether the four thousand was real.

It almost certainly is. Not entirely, but mostly, and not in a way that explains the eleven.

The more useful thing to know is that the report you're staring at cannot settle the question, and Google's own documentation gives three separate reasons why. Once you know what those are, the check takes twenty minutes and it mostly happens somewhere else.

## Google filters bots and won't tell you what it filtered

Start with what the tool does on your behalf.

[Google's documentation on bot traffic](https://support.google.com/analytics/answer/9888366) is short and worth reading literally. Traffic from known bots and spiders is automatically excluded. Known bot and spider traffic is identified "using a combination of Google research and the International Spiders and Bots List, maintained by the Interactive Advertising Bureau." And then the sentence that matters: "At this time, you cannot disable known bot traffic exclusion or see how much known bot traffic was excluded."

Read that again. You can't turn it off, and you can't see what it took out.

So there is no audit trail. Any article telling you to go and check your bot filtering settings in GA4 is describing a screen that doesn't exist, and any agency offering to clean your bot traffic out of GA4 is offering to do something the platform does not expose.

## GA4 only sees visitors that ran JavaScript

Second reason, and this is the one that resolves most of the worry.

The Google tag is JavaScript. It fires in a browser, after the page loads, when a script engine executes it. A crawler that requests your HTML and reads it without running any JavaScript never appears in GA4 at all. That describes the large majority of crawlers.

Which means the frightening percentages you've seen quoted were measured with a different instrument. Cloudflare's own [2025 year in review](https://blog.cloudflare.com/radar-2025-year-in-review/) found search engine crawlers responsible for 40% of verified bot traffic, AI crawlers for 20%, and SEO tools for over 13%, with Googlebot alone accounting for more than 28%. Those are requests arriving at a network edge. GA4 counts sessions from browsers that executed a tag. Two different denominators, and the headline number was never about your report.

Worth noticing that Cloudflare itself excludes bot traffic when it reports human traffic trends, because even the company that can see both treats them as separate measurements rather than one number with contamination in it.

There's a third reason, and it closes the oldest version of this problem. Sending events directly into a GA4 property through the Measurement Protocol [requires an api_secret generated in the Google Analytics interface](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events). Nobody can inject fake traffic into your property without a key taken from your own account. The ghost referral spam that plagued Universal Analytics does not transfer, and if you're still carrying a list of spam referral exclusions from 2017, you can delete it.

## So what does land in your GA4

A short and fairly boring list.

**Headless browsers**, which do run JavaScript. Playwright and Puppeteer behave like a real Chrome because they are one. This is SEO crawlers, screenshot services, accessibility scanners, page speed monitors, and the uptime check somebody on your team set up two years ago and never mentioned.

**Your own people.** Your developer, your office, the agency, you on your phone at the weekend.

**A copy of your site with your tag still in it.** Scrapers sometimes republish pages verbatim, tag included, and those sessions report into your property from a domain that isn't yours.

**Click fraud on paid campaigns**, which is real and which is a different problem with a different report.

## The twenty-minute check

Not the channel report. These five, in order.

**Hostname.** Add Hostname as a dimension in an exploration. Everything should be your own domain. If a hostname you don't recognize is in there, that's either a scraped copy of your site or your own staging environment, and both need excluding.

**Landing page, sorted by sessions.** You're hunting for pages a human has no route to. An old thank-you URL getting direct entrances. Page 14 of a paginated archive. URLs carrying parameters nobody would type. Humans arrive on pages that are linked from somewhere.

**Engagement rate per landing page, not sitewide.** A page with four hundred sessions and almost no engaged sessions is either broken or it isn't people. The sitewide average hides both.

**Internal traffic filters.** Define your office and your developer's connections as internal traffic in the admin settings. On most small properties this was never done, and it's the single largest source of fake-looking sessions I find.

**And the check you cannot run in GA4 at all.** Look at where the requests originate. GA4 gives you country, region and city, and no network dimension, no hosting provider, no IP address. That one happens in your server logs or your host's dashboard. Cloudflare's data has Amazon Web Services and Google Cloud originating a quarter of global bot traffic and 40% coming from the United States, so what you're looking for is a datacenter signature rather than a surprising country. A spike from Ashburn, Virginia is a much stronger signal than a spike from Vietnam.

## Then stop managing traffic and manage one verified number

Here's the part that actually fixes your eleven enquiries, and it isn't a data cleanup.

Pick one conversion you can count outside analytics. Form submissions that land in a real inbox. Calls that ring a tracked number. Something with a paper trail that exists whether or not a tag fires.

Count it by hand for a month. Then compare your hand count against what GA4 says about the same event.

If they agree, your data is fine, your traffic is real, and what you have is a conversion problem. That's a better problem, because it's solvable on the page rather than in a report.

If GA4 claims forty and your inbox holds eleven, you have a tracking problem rather than a bot problem, and in my experience that is nearly always the real answer. Duplicate tags, a thank-you page firing on reload, a form that submits twice, conversions counted differently by two systems looking at the same event. I went through the related version of this in [why your GA4 and Google Ads numbers don't match](/blog/ga4-vs-google-ads-conversions/), and the diagnostic habit is the same.

Nobody has ever fixed a business by cleaning up a traffic number.

## Before lunch

Add Hostname to an exploration and confirm every session came from your own domain. Set up the internal traffic filters you never set up. Then open your inbox, count last month's genuine enquiries by hand, and put that number next to what GA4 claims.

Whichever way those two numbers disagree tells you which problem you actually have, and it takes less time than reading another article about bot filtering.

If you want someone to look at whether the gap is tracking or conversion before you spend anything on either, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on SEO](/expertise/seo/) cover the organic half of it. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
