---
title: "Why did my website get slow again?"
seoTitle: "Page Speed for Indian Websites: Why It Regresses"
description: "India's Core Web Vitals pass rate is reported at under 28% against roughly 48% globally on mobile. Speed is not a project here, it is a thing that decays."
publishedAt: 2026-10-02
published: true
tags: ["Performance", "Technical SEO", "Mobile"]
---

Your site was fast in March.

Somebody went through it, compressed the images, deferred the scripts, and sent a report with green numbers in it. Everybody was pleased and moved on.

It is slow again now, and the irritating part is that nobody did anything wrong. Each individual decision in between was reasonable. The result is that you have paid for the same fix twice and will pay for it a third time unless something changes about who owns this.

## The number that should bother an Indian business

Published CrUX data puts the share of origins passing all three Core Web Vitals at around 56% globally, with mobile closer to 48%.

India is reported at roughly 27.6%.

Read that two ways. The first is the obvious one: the median Indian site is slow on the devices and networks its customers actually use. The second is the useful one: in a market where nearly three quarters of sites fail, being fast is a competitive position rather than a hygiene requirement, and it is cheaper to buy than almost anything else on your marketing list.

I have written about [why this decides conversion](/blog/landing-page-optimisation/) and the [diagnostic side of Core Web Vitals](/blog/how-to-do-an-seo-audit-yourself/) separately. This post is about the part both of those assume away, which is that the fix does not hold.

## Why it decays, mechanically

Page weight is growing across the whole web, not just on your site. HTTP Archive data puts the median mobile page at around 2.5 MB and rising roughly 10% a year.

Third party scripts account for something like 34% of total page weight. And the finding that matches what I see every time: most organisations discover they are running three to five times more third party scripts than they believed.

The mechanism is not mysterious. Your tag manager made adding a script a two minute job that needs no developer, which was the point. Nobody made removing one anybody's job. So the container only grows, and it grows by small reasonable increments that never individually justify a review.

**Adding a tag takes two minutes and nobody's approval. Removing one requires somebody to care. That asymmetry is the entire problem.**

## It is marketing doing this

Worth saying plainly on a marketing blog, because the conversation usually turns into a complaint about developers.

Go and look at what is actually loading. In most Indian businesses I have looked at, the list reads something like this. A chat widget nobody has answered in four months. A heatmap tool from a trial that was never cancelled. Two pixels for a campaign that ended in February. An A/B testing script with no live test in it. A review widget pulling from a third party. Three font weights where the design uses one. A popup builder. A WhatsApp button plugin that loads its own library.

Every one of those was requested by somebody in marketing, for a defensible reason, and none of them has an owner now.

The developer did exactly what was asked. The accumulation is a management failure, not a technical one.

## Find them, which takes twenty minutes

Three places to look, in this order.

**Your tag manager container.** Open it and list every tag with the date it was added and who added it. Anything older than a year that nobody can explain is a candidate for deletion. Anything you cannot name the purpose of is not a candidate, it is a decision.

**The network tab on your own phone.** Load your homepage, sort requests by size, and read the top twenty. You will find things nobody remembers installing. The ones served from domains you do not recognise are the interesting ones.

**The coverage panel.** It shows how much of the JavaScript you shipped was actually used. A page where most of the delivered script went unused is carrying somebody else's framework for no benefit.

Write the list down with a name against each row. The naming is the part that makes the next step possible.

## Set a budget, as an actual number

A performance budget is not a sophisticated idea and almost nobody has one.

Pick two numbers and write them where people can see them. A page weight ceiling, and a count of third party scripts. For an Indian site serving mid range Android on mobile data, I would start at well under 1 MB for the page and a script count in single figures, then argue upward only with evidence.

Then one rule, and it is the rule that actually works: adding a script requires removing one, or getting sign off from whoever owns the budget.

That sounds bureaucratic for a six person company. It is one sentence in a shared document and it is the difference between a site that stays fast and a site that gets re-fixed annually.

## The question to ask of any new tag

Somebody will want to add something next week. One question settles most of it.

What decision will this inform, and who reads it?

A heatmap tool that nobody has opened since installation fails that question. So does an analytics integration whose dashboard has never been looked at. So does a chat widget where nobody is staffed to chat.

If the answer is a named person and a decision, it is probably worth its weight. If the answer is that it seemed useful, you have found something to decline.

## The monthly check, ten minutes

This is the part that prevents the regression rather than detecting it late.

Once a month, open PageSpeed Insights for your three most important URLs and read the field data at the top, not the lab score underneath. The assessment is made at the 75th percentile of real visits, which means your own fast phone on office wifi is not evidence of anything.

Compare against last month. If a number moved, the change is almost always something added since, and your tag list tells you what.

One related thing to watch while you are in there. If you have been [losing enquiries to measurement gaps](/blog/ga4-conversions-not-tracking/), resist the urge to solve it by installing three more tracking tools. That trade is how sites end up slow and still unmeasured.

## Before lunch

An hour, three things.

Open your tag manager and list every tag with its owner. Delete whatever nobody can justify, which is usually two or three things.

Then write your two budget numbers in a shared document and tell whoever requests tags what they are.

Then diary a monthly ten minute check in somebody's calendar, by name. Not a reminder to the team. A calendar entry owned by a person.

That is the whole difference between fixing your site and keeping it fixed, and in a market where most of your competitors are failing on mobile, keeping it fixed is worth more than the original fix was.

My [notes on SEO](/expertise/seo/) cover the rest of the technical picture. If you'd like a second opinion on your own site, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
