---
title: "What do I check first in a Google Ads account I just inherited?"
seoTitle: "Google Ads Account Audit Checklist for an Inherited Account"
description: "You have the logins and nothing else. The urgent hour is not the search terms report, it is the access that leaves with the last agency."
publishedAt: 2026-11-01
published: true
tags: ["Google Ads", "Paid Media", "Auditing"]
---

You have the logins and nothing else. No handover notes, no call, no reason given for why anything in there is the way it is.

The first thing you'll want to do is open the search terms report, because that's where the ridiculous stuff lives and finding it feels like progress. Do that second.

The first hour goes on something duller, and the reason is timing. An inherited account isn't a broken account, it's an undocumented one, and three of the four things worth knowing get harder or impossible to recover the longer you wait. The leak hunt will still be there on Tuesday.

So the order is access, then intent, then history, then money. Only the last of those is optimization. The first three are archaeology.

## Access first, because this is the only part with a deadline

Here is the distinction that costs people their account history, and almost nobody checks it in week one.

Having a login is not the same as having the account. Google's documentation on [manager account ownership](https://support.google.com/google-ads/answer/7456532) is worth reading once properly, and the parts that matter are these. A client account can have exactly one owner. A manager account that links to an existing account does not become the owner by default, the client account has to enable that. And ownership is transitive, so whichever manager account sits above the owning one holds it too.

Then the asymmetry. Users on the client account can't turn ownership off or transfer it. What they can do is unlink the owning manager, and once that's done the account can turn ownership on for a different one. There's a condition attached that is the whole reason to act now: turning ownership off requires the client account to have at least one user with administrative access.

Which gives you one job today. Make sure a real person at your company, on an email address your company controls, holds Admin on the Google Ads account itself, not access borrowed through somebody else's manager account. Then the same for the GA4 property, the tag container, Merchant Center if you sell anything, and the Google Business Profile.

Use a shared mailbox, not the personal address of whoever has this job this year. I've seen a business locked out of its own ad account because the only admin was an employee who had since left, and that is a tedious thing to unpick.

**What's at stake is not the login, it's the conversion history, the audience lists and two years of change records**, and that is the part you cannot rebuild later at any price.

## What was this account told to do

Now read the conversion actions, before you read a single performance number.

Open the conversion actions list and look at which are marked Primary and which Secondary, and so which are feeding the "Conversions" column every decision in here was made against. Then the counting setting, every versus one, and the conversion window.

This is not a settings check. It's a statement of what the previous person was told to maximize, and Smart Bidding has spent months faithfully doing it. If the primary conversion is a form view rather than a form submission, the algorithm has been buying form views, successfully, for a year. The account is not misbehaving. It is obedient.

Same for the bid strategy. A target CPA is a number a human typed once, usually at a moment when it was plausible, and it is now load-bearing. Write down what it is and when the change history says it was last touched.

Whether those conversions count anything real is a separate job, and I've written it up twice already: the [six places the budget leaks through settings](/blog/google-ads-not-converting/) covers the audit itself, and [why your GA4 and Google Ads numbers disagree](/blog/ga4-vs-google-ads-conversions/) covers the counting. Neither is worth repeating here.

## Two years of somebody else's decisions

Change history is the tool built for exactly your situation, and the one people skip.

Per [Google's own page on it](https://support.google.com/google-ads/answer/19888), it holds changes from the past two years and puts them on a timeline against account data, so you can see impressions, clicks, conversions and cost moving beside the change that moved them. Most types of change made in the last 30 days can be undone.

Read it for three things, none of them a list of edits.

The date the last human did anything. Where a relationship went quiet before it ended, this is frequently months before you arrived, and it reframes everything you're about to look at: you are not auditing a managed account, you are auditing an abandoned one.

Clusters. A tight group of changes immediately before performance fell off is the single most useful thing in the account, and it is sitting there in a chart.

And whether the changes were made by a person at all, which brings us to the next bit.

One caveat, and it's from Google's page rather than from me. Not all account-level settings changes appear, and changes made by Google representatives during consultations aren't always listed either. So absence of a record is not proof that nothing happened.

## Find out who turned on auto-apply

Auto-applied recommendations are the setting most likely to be running an account nobody is managing.

Two routes in. Admin, then Account settings, then the Auto-apply dropdown. Or Campaigns, then Recommendations, then Auto-apply settings, which carries a History tab.

The History tab is the one you want, because filtering it by the date auto-apply was switched on tells you when this started, and Google's documentation says you can trace the user ID that opted in through change history. So you can find out who did it and when, which on an inherited account is occasionally the most informative fact available.

Turn it off before you measure anything. Not because every recommendation is bad, some are fine, but because you cannot establish a baseline for an account that is still editing itself while you look at it.

One honest gap. Google's page doesn't say whether switching it off reverses what was already applied, and I'm not going to assume either way. The 30-day undo window in change history is the actual remedy, which is another argument for doing this in hour one rather than week three.

## What not to touch yet

The conversion history is the only thing you inherited with real value. Here is the short list of ways to destroy it, all of which look like tidying up.

Deleting a conversion action and creating a clean one. Changing the attribution model or the conversion window. Switching bid strategy. Merging campaigns into a sensible structure.

Every one of those resets learning, and a Smart Bidding campaign coming out of a reset gives you a couple of weeks of noise in which you can't separate your changes from the reset itself. You've thrown away the asset and bought yourself a blindfold.

The exception is anything losing money today that waiting will not teach you. A campaign serving a country you don't sell to. An exhausted daily budget on the one campaign that converts. Auto-apply. Fix those now and leave the architecture alone for two weeks.

On most inherited accounts I've opened, somewhere between a fifth and a third of the spend was going somewhere the owner would not have chosen. Worth finding properly, in week two, rather than badly in hour two.

## Before lunch

Three things, about forty minutes.

Get Admin access on the Google Ads account itself, under an email address your company owns, and check the same for GA4, the tag container and Merchant Center.

Export the conversion actions and bid strategies as they stand today, and screenshot the change history timeline for the last twelve months. That is your baseline, and in a month you'll want to know what the account looked like before you arrived.

Then turn off auto-apply, and only then open the search terms report.

If you've taken over an account and want a second opinion on what the last twelve months of it actually say, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on performance marketing](/expertise/performance-marketing/) cover how I'd run it afterwards. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
