---
title: "Most traffic drops are not algorithm updates. Rewriting in week one makes it worse"
seoTitle: "Google Algorithm Update Recovery: Diagnose First"
description: "The shape of the graph narrows the cause before you open a tool. And in 2026 the most common drop is not a demotion at all, it just looks like one."
publishedAt: 2026-08-25
published: true
tags: ["SEO", "Recovery", "Analytics"]
---

Look at the shape of the line before you look at anything else. It tells you more than the first hour of panicking will.

A cliff, meaning near vertical and overnight, is almost never an algorithm. Google does not demote a site between Tuesday and Wednesday. Something broke, or something stopped counting.

A step down over three to fourteen days that then goes flat is the signature of a core update rolling out.

A slope, sagging gradually over weeks with no obvious edge, is competitive drift, content going stale, or the thing that has caused more misdiagnosis than anything else this year.

Before any of that, one comparison settles most cases. Open Search Console, put impressions and clicks on the same graph, and look at whether they moved together.

**If impressions held steady and only clicks fell, you were not demoted. Something is taking the click before it reaches you.**

## The decoupling, and why it looks exactly like a penalty

This is the 2026 pattern that has people rewriting content for no reason.

Search Console shows impressions flat or rising while clicks fall away underneath them. Your rankings are fine. Some of them are better than they were. The traffic is still gone, because the answer is being delivered above the results and a large share of people never scroll into a click.

The measurements are consistent enough to plan around. Ahrefs put the click-through reduction at around 58% on the top ranking page for queries that carry an AI Overview. Seer Interactive, looking at roughly 2.43 billion impressions across 53 brands, landed near 61%. Click-through rate on those queries went from about 1.3% at the end of last year to about 2.4% by February, which is stabilization rather than recovery.

One documented case sums it up: impressions up 27.56% year on year, clicks down 36.18%, click-through rate falling from 5.98% to 3.35%, and average position actually improving by 14%.

Rank better. Earn less. That combination used to be impossible and it is now ordinary.

The tell is specific. A page sitting at position one whose click-through rate has fallen from around 6% to under 1.5% has not been penalized. It has been summarized.

## The four causes, in the order they cost you to check

Run these in sequence. The order matters because the cheap checks are also the most common answers.

**Tracking failure.** Check this first because it costs ten minutes and it is embarrassingly often the answer. A deploy dropped the GA4 tag. Somebody changed the consent banner and the default state flipped. A filter got added. A subdomain moved. If your Search Console clicks look normal while your analytics fell off a cliff, stop looking at SEO entirely, you have a measurement bug.

**Technical breakage.** A `noindex` shipped to production, which happens more than anyone admits because it is one checkbox on a staging environment. A robots.txt change. A redirect chain from a migration. A CDN rule blocking crawlers. All of these produce cliffs, and all are visible in the Page indexing report within a few days.

**A core update.** Now check the calendar against the rollout windows. This year has had three: late March into the first week of April, late May into the first days of June, and the end of June into the second week of July. Another is expected around now, in the Q3 window.

If your drop does not line up with a rollout, it is probably not an update, whatever your agency says. Drops get blamed on updates constantly because it is the explanation that assigns nobody any responsibility.

**Seasonality.** Compare year on year, never month on month. Half the "crisis" drops I have looked at were a business whose customers go quiet in the same fortnight every year, viewed on a comparison window too short to show it.

## Why rewriting in week one is the worst available response

Here is the part I would argue with somebody about.

The instinct after a drop is to do something visible, immediately, so the team feels like it is responding. So people rewrite the affected pages that week, often heavily, sometimes across the whole site.

It hurts you twice.

First, it destroys your baseline. You have just changed the thing you were trying to measure, in the middle of the event you were trying to understand. If traffic returns in ten weeks you will have no idea whether it was the rewrite, the next update, or the seasonal cycle turning, and you will confidently attribute it to whichever one flatters you.

Second, the timing does not work the way people assume. Recovery from a core update usually requires a later core update to re-rate the site. The reported pattern is that sites making genuine improvements claw back somewhere around 60 to 70% of lost traffic within six to eight weeks, and full recovery commonly waits three to four months for the next broad update.

So a rewrite shipped in week one gets judged in month four, blended with every other change made since. You cannot learn anything from that, and you will have spent a quarter of your team's capacity on it.

There is also a quieter cost. The March update reportedly touched 40 to 60% of sites, with affiliate-style sites hit hardest at around 71%. When something moves that much of the web at once, a drop is often relative rather than absolute. Other people got re-rated upward and you stayed where you were. Rewriting a page that was never the problem is how good pages get worse.

## What the first week should actually look like

Take a snapshot before you touch anything. Export Search Console for the ninety days either side, page level and query level. That export is the only version of the truth you will still have in month three.

Write down the drop's shape, the exact date it started, and whether impressions moved with clicks.

Then work the four causes in order, and check the Generative AI report while you are in there, which now separates AI surface impressions from ordinary ones. I covered where that lives in [the two hour audit](/blog/how-to-do-an-seo-audit-yourself/).

Change nothing structural until you can say a sentence like "clicks fell 40% on 12 August while impressions held, concentrated on twelve informational pages." That sentence is worth more than a month of rewriting, and most companies never get to it.

The uncomfortable conclusion is that the correct response to a lot of 2026 traffic drops is to accept that the traffic is not coming back, and to change what you are optimizing for. If the answer is being given above the result, the game is being the source that gets quoted rather than the page that gets clicked. That is a different project from recovery, and pretending otherwise is how teams spend a year rewriting their way back to a number that no longer exists.

If you'd like to talk through a drop you are looking at, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch. My [notes on SEO](/expertise/seo/) cover more of the diagnostic side.
