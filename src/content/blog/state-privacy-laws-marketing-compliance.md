---
title: "Which state privacy laws apply to my business?"
seoTitle: "State Privacy Laws for Marketers: Who's Covered"
description: "Two states have no revenue or consumer threshold at all, so the exemption you think you have may not exist. How to check, and the signal your site ignores."
publishedAt: 2026-09-26
published: true
tags: ["Compliance", "Privacy", "Analytics"]
---

Most marketers I talk to have the same reassuring sentence ready. We're under the threshold.

That sentence is doing a lot of work and it does not apply everywhere. Texas and Nebraska wrote their privacy laws without a consumer count or a revenue trigger. Coverage there turns on whether you qualify as a small business under the federal Small Business Administration size standard for your industry, which is a table of NAICS codes rather than a number you can carry in your head.

Which produces the uncomfortable possibility that a company comfortably below California's triggers is still covered in Texas, and does not know it because it read one guide about CCPA in 2023 and stopped.

I am not a lawyer and this is not legal advice. Your counsel decides this. What follows is how to find out where you stand before you take it to them, and it is about an hour of work.

## The map, roughly

Depending on the day you count and whose tracker you read, something like twenty states have comprehensive consumer privacy laws in effect, with around twenty three on the books including ones not yet live. Indiana, Kentucky and Rhode Island came into effect this year.

Do not try to learn twenty laws. The useful move is to establish which ones reach you, then build to the strictest of those, because the obligations overlap heavily and the differences are mostly at the edges.

## Three ways a law decides it covers you

Applicability comes in three shapes and you need to check yours against all three.

**Consumer count thresholds.** Processing the data of some number of that state's residents in a year, commonly 100,000, or a lower figure like 25,000 when you are selling data. Most of the state laws work this way.

**Revenue plus behavior.** California's structure, where annual revenue above a set level brings you in, or deriving a large share of revenue from selling or sharing personal information does.

**The small business test, with no numbers.** Texas and Nebraska. The law applies to entities conducting business in the state or targeting its residents, unless you are a small business under the SBA definition. That definition varies by industry and is published by NAICS code, based on receipts or employee count.

So the practical first step is not reading statutes. It is looking up your NAICS code in the SBA table of size standards and finding out whether you are a small business federally, because in two states that single fact decides the question.

One detail worth knowing even if you are small: in Nebraska, a small business still cannot sell sensitive data without consent. Size gets you relief from some obligations, not all of them.

## The signal your website is probably ignoring

This is the part with the most exposure relative to how little anybody thinks about it.

Global Privacy Control is a browser-level signal. A visitor turns it on once, and every site they visit receives it as a request to opt out of the sale or sharing of their data. There is no banner interaction, no click on your page, and no way to tell from your analytics that it happened.

As of the first of January this year, twelve states require businesses to recognize it: California, Colorado, Connecticut, Delaware, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon and Texas.

Most sites do not. The consent platform is installed, the banner appears, and the GPC header arrives and does nothing, because honoring it is a configuration somebody had to switch on and nobody did.

You can test this in five minutes. Turn on the signal in a browser, load your own site, open the network tab, and watch whether your advertising pixels fire anyway. If they do, you have your answer, and it is not a legal question yet. It is a settings question.

## What enforcement now looks like

On 11 February this year, California's Attorney General announced a $2.75 million settlement with Disney over opt-out failures across its streaming services. It is the largest CCPA action to date.

The detail that matters for everybody else is what failed. Not one thing. The investigation found problems with the opt-out toggle, with the webform submission, and with the Global Privacy Control signals. Three routes, all partially broken.

Read that as the standard being applied. Having a mechanism is not the test. The test is whether the mechanism works end to end, and a link that submits a request nothing downstream acts on is worse than no link, because it documents that you understood the obligation.

The required remedies are also a free specification of what good looks like: a frictionless opt-out that applies across every service and device once a logged-in user asks, a clear do not sell or share link inside every app, and confirmation back to the user that the request was processed.

## The definition that catches ordinary advertising

Here is the thing marketers keep tripping over, and it has nothing to do with selling data in the way you would use the phrase.

Under these laws, sale or share is defined broadly enough that passing identifiers to an advertising platform for targeting purposes can count, even though no money changed hands for the data and you would never describe it as selling anything. Which means a standard retargeting pixel is frequently the exact activity a consumer is opting out of.

That is why the opt-out cannot be a preference stored in your CRM. It has to reach the tags on the page.

This is a different problem from [the healthcare pixel question](/blog/hipaa-compliant-marketing/), which turns on health data specifically. This one applies to an ordinary ecommerce store or a B2B site with no sensitive data at all.

## What a working setup actually has

Five things, and you can check all of them today.

A link or control that a visitor can find without hunting, on every page, using the wording the applicable law expects.

Honoring GPC at the tag layer, so the signal suppresses the pixels rather than just being recorded.

A request that propagates. Your consent tool, your tag manager, your analytics, your ad platforms and your email tool all need to receive it, and the ad platforms have specific settings for this that somebody has to enable.

Confirmation to the user, and a log with dates. If you are ever asked what you did and when, the log is most of your position.

Someone named who owns it, because this is a standing obligation rather than a project, and the laws keep arriving.

## Before lunch

An hour, three things, in this order.

Look up your NAICS code in the SBA size standards table and write down whether you are a small business federally. That single line decides Texas and Nebraska for you.

Then turn on Global Privacy Control in your browser, load your own site, and watch the network tab to see whether your pixels still fire.

Then click your own do not sell or share link and follow it all the way through. Submit the request as a customer would, then check whether anything downstream actually changed.

Whatever you find, write it down with today's date and send it to whoever owns compliance, the same way [the SMS consent question](/blog/tcpa-compliance-sms-marketing/) belongs in writing rather than in somebody's memory. A documented decision is a defensible one, and an undocumented accident is not.

My [notes on performance marketing](/expertise/performance-marketing/) cover the measurement side once the plumbing is right. If you'd like to think through your own setup before it goes to counsel, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
