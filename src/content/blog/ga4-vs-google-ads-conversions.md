---
title: "Why don't my GA4 and Google Ads numbers match?"
seoTitle: "GA4 vs Google Ads: Why the Numbers Differ"
description: "They answer different questions, so they never agree. The four real causes, the April 2026 window change to check today, and one source per decision."
publishedAt: 2026-09-22
published: true
tags: ["Analytics", "GA4", "Measurement"]
---

Google Ads is answering one question: did this click eventually lead to a conversion?

GA4 is answering a different one: which channel deserves credit for this conversion?

Those are not the same question, they have different correct answers, and no amount of configuration will make them produce the same number. The afternoon you were about to spend forcing them to agree is the most reliably wasted afternoon in marketing, and I've watched capable people spend it more than once.

So here's the position I'd take. A permanent gap is normal. Published estimates commonly put 10% to 30% in the ordinary range. What matters is not closing it, it's picking one source per decision and noticing when the gap moves.

And there's one setting worth checking this morning, because it changed in April and it's still catching people out.

## Check this first: the April 2026 window change

In April 2026 the default attribution lookback window in GA4 for acquisition conversion events was shortened from 90 days to 30. Other conversion events kept 90.

Read what that does to a business with a long cycle. A buyer who first touched your campaign 45 days before converting used to be attributed to it. Under a 30 day default, that same buyer no longer appears in the attribution data at all. Your campaign did the same work and now shows less of it.

Worse, if you're importing GA4 key events into Google Ads, the shortened window changes what Smart Bidding is optimizing toward. That's not a reporting inconvenience, that's a bidding input.

Go to Admin, then attribution settings, and look at what your acquisition window says. If your sales cycle is longer than a month, put it back to 90 and note the date you changed it, because your historical comparisons will have a seam in them.

## Cause one: the models disagree on purpose

Google Ads gives its own click 100% of the credit for a conversion it can see. That is the design. It's a platform reporting on the performance of the thing it sells you, and within its own walls that's the right behavior.

GA4 distributes credit, either to the last non-direct channel or across touchpoints under data-driven attribution. Which means the same single sale can be a full conversion in Google Ads and a fraction of one in GA4, or credited to organic search entirely.

Neither is lying. They're applying different rules to the same event.

## Cause two: the clock starts and stops differently

Two separate mechanisms here and they compound.

Google Ads reports conversions against the date of the click, not the date of the conversion. GA4 reports against the date the thing happened. So a click on the 28th producing a sale on the 3rd lands in different months in the two tools, which is why month-end reconciliation is particularly maddening.

Then the windows themselves differ, and you now have a 30 day default on one side sitting against whatever Google Ads is set to.

## Cause three: modelled conversions, which only one side has

Consent Mode V2 became a hard requirement in April for GA4 data to flow properly into Google Ads conversion tracking in the EEA and the UK, alongside tighter behavioral modeling thresholds globally.

The practical consequence is that a share of what Google Ads reports is modelled rather than observed. Conversions it infers from users who declined consent or who converted on a different device, filled in statistically.

GA4 models too, but differently and to a different extent. So part of your gap is one tool estimating something the other simply does not count.

This is also why a gap can appear overnight without anybody touching a tag. Change the consent banner, change the share of users who accept, change the modelling.

## Cause four: what counts as one conversion

Google Ads can count multiple conversions per click depending on your settings, includes cross-device journeys it can stitch through signed-in users, and in some campaign types counts engaged views rather than clicks.

GA4 counts events. If your key event fires twice on a confirmation page reload, that's two.

Before you accept any gap as structural, rule out the boring version: the tag firing twice, the event firing on page load, the wrong property. Those produce gaps that look like attribution philosophy and are actually [an installation problem](/blog/ga4-conversions-not-tracking/), and they're worth eliminating before you theorize.

## The rule that actually solves this

Stop reconciling. Assign one source per decision and hold the line.

**Google Ads data decides things inside Google Ads.** Which keyword to pause, which ad group to fund, where to move budget between campaigns. The platform's own numbers are the right input for optimizing the platform, because that's the signal its bidding uses anyway.

**GA4, on data-driven attribution, decides the split between channels.** Search against social against email against organic. It's the closest thing you have to a neutral referee, because it's the only tool that sees all of them.

**Your CRM or your own records decide whether any of it works.** Actual closed revenue, matched to source at the point of enquiry. This is the only number that is not an estimate, and it's [the one that should be on the report](/blog/vanity-metrics-vs-revenue-metrics/) your leadership reads.

Three reports, three jobs, no arguments about which is right. The moment somebody uses GA4 to decide a keyword bid or uses Google Ads to decide the email budget, you're back in the reconciliation meeting.

## When the gap is genuinely a signal

A stable gap is weather. These four things are not.

**A widening gap** over several months, especially without a settings change, usually means tracking is degrading somewhere.

**A step change on a specific date.** Find what shipped that day: a tag deployment, a consent banner update, a site migration, or an attribution setting somebody adjusted.

**One campaign diverging** while the rest hold steady. That's a campaign-level tracking issue, frequently a URL losing its parameters to a redirect.

**The direction flipping.** If Google Ads was reporting higher than GA4 and now reports lower, something material changed in what's being collected.

## Before lunch

Half an hour, three things.

Open GA4 admin and check the acquisition lookback window. Set it to match your actual sales cycle and write down the date.

Then pull the same fortnight from both tools, put the two numbers side by side, and calculate the gap as a percentage. That number is your baseline. Save it somewhere you'll find it again, because a baseline is what makes a future change legible.

Then write one line at the top of your reporting doc naming which source decides what. It sounds bureaucratic and it will save you the same argument every month.

My [notes on performance marketing](/expertise/performance-marketing/) cover what to do once you trust the numbers. If you'd like to think through your own measurement setup, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
