---
title: "How do I track WhatsApp leads from my website and ads?"
seoTitle: "Tracking WhatsApp Leads from Your Website"
description: "GA4 says eleven conversions last month. Your phone says sixty conversations. Both numbers are right, and the gap between them is your whole channel."
publishedAt: 2026-11-10
published: true
tags: ["WhatsApp", "Analytics", "Lead Generation"]
---

GA4 says you had eleven conversions last month. Your phone says you had about sixty real conversations.

Both numbers are correct. The gap between them is your actual business, and because it does not appear anywhere countable, every budget decision you make is being made on the smaller number.

That is the specific shape of the problem in India. The form is a formality. The sale happens in a chat, and the chat is on somebody else's platform, so the two systems that matter have no idea the other exists.

There is a real fix, it is not a plugin, and most of it is free. But the first thing to be clear about is which part of it is actually evidence and which part is a guess.

## The prefilled link is a hint, not a record

If you are not already using a per-page `wa.me` link with the source written into the prefilled message, start there. I have covered the mechanics twice, in [the WhatsApp hole in GA4](/blog/ga4-conversions-not-tracking/) and in [connecting WhatsApp to the site](/blog/whatsapp-marketing-india/), so I will not run through it again.

What those posts do not say, and what matters once you start making decisions on it, is that the prefilled text is editable.

The user sees "Hi, I saw your pricing page" sitting in the compose box, and they can delete it, type over it, or send something else entirely. Plenty do, because it reads as a script somebody put in their mouth. Behaviour also differs between the app, the desktop client and the in-app browser.

So treat the prefill as a hint with a decent hit rate, not as a record. It is genuinely useful for the person answering the phone, who now knows the context before asking. It is not something to build a bidding decision on.

## The one place you get an exact answer

If the conversation started from a Meta click-to-WhatsApp ad, you can have deterministic attribution, and this is the part almost nobody in India has set up.

When somebody taps one of those ads and sends a message, the first inbound message arrives with a `referral` object attached. Per [Meta's own webhook reference](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/overview/), it carries a `source_id`, which is the Facebook ID of the ad or post, and the changelog records the addition of a `ctwa_clid` property, the click ID generated when the user taps the ad.

That is not probabilistic. That is the ad, named, attached to the conversation, by the platform.

Meta's own instruction is the important half: store the `ctwa_clid` alongside the conversation, so that when something happens later in that chat you can tie it back.

Now the holes, which Meta documents itself rather than me guessing at them. The `ctwa_clid` is omitted entirely for messages originating from an ad in WhatsApp Status. A referral object may arrive carrying only a `source_url`, for instance when somebody sends their message before the ad context has rendered in their app. And users may elect to remove their referral data.

One more practical note: the referral object differs between the Cloud API and the older On-Premises API, and the On-Premises one is being phased out, so build against the Cloud API reference rather than against a tutorial from two years ago.

So even the good route is incomplete. That is fine. Deterministic for most of the paid traffic beats a hint for all of it.

## Send the outcome back, which is the actual point

Here is the step that turns measurement into money, and it is the one people stop short of.

Right now your Meta campaigns are optimising towards conversations started, because that is the only signal they get. Which means the algorithm is dutifully finding you people who like starting conversations, and some of those people were never going to buy anything.

Meta's [Conversions API for business messaging](https://developers.facebook.com/documentation/ads-commerce/conversions-api/business-messaging) exists to close that loop. You send the event back when a conversion actually happens inside the conversation, with the stored `ctwa_clid` attached. The docs are explicit that it should not be hashed, unlike the customer data parameters.

Then the bidding learns on qualified leads rather than on openings, and your cost per real enquiry starts falling without you touching the creative.

There is a lighter version if you are not building anything: an `automatic_events` webhook can report detected lead or purchase events, each carrying a `ctwa_clid`, if you opt in. Worth asking whichever provider runs your WhatsApp integration whether they support it, because the answer tells you a lot about the provider.

## If you are not on the API yet

Most businesses reading this are on WhatsApp Business on a phone, not on the API, and the honest answer is that the above is not available to you. So here is the version that works without it, and it is better than nothing by a long way.

**One link per place, not one link everywhere.** A different `wa.me` link with a different prefilled text on each page and in each campaign. Pricing page, services page, Google ad, Instagram bio, Justdial listing.

**The outbound click as a key event in GA4.** It is an outbound click on a `wa.me` URL. Mark it as a key event and your dashboard at least counts intent instead of pretending it does not exist.

**A naming convention in the chat itself.** This is the unglamorous one that actually holds. Whoever answers adds a two-word tag to the contact name or the chat label within the first minute: the source and the month. `Pricing Nov`. `GAds Nov`. It takes five seconds, it survives the prefill being deleted, and at the end of the month you can count by label.

A half-configured tool loses to a convention somebody actually follows. I would rather have a shop with disciplined chat labels than a brand with an integration nobody checks.

## What to report, and the one ratio worth watching

Stop trying to make one system tell you everything, because it cannot.

GA4 measures intent: how many people reached the point of clicking through to a chat. WhatsApp measures what happened next. Nothing joins them automatically unless you built the API route, so join them by hand once a month, which takes twenty minutes.

Two numbers in a sheet. Clicks to WhatsApp from GA4, by source. Conversations by label, from the phone.

Then the ratio between them, which is the number almost nobody has and which is immediately useful. If a campaign produces a hundred clicks and eleven labelled conversations, something is wrong at the handoff rather than in the ad: a wrong number, a slow first reply, a business profile that looks abandoned. If another produces thirty clicks and twenty-four conversations, that is your best channel and your dashboard has been calling it the worst.

## Before lunch

Forty minutes, and the last one matters most.

Make a separate `wa.me` link with its own prefilled text for your three highest-traffic pages and your two live campaigns. Put them in place and test each one from your own phone.

Set the outbound click on those links as a key event in GA4, then send yourself one and watch it appear in realtime.

Then tell whoever answers the phone the two-word labelling rule, and write it on a card next to them. That is the piece that makes next month's numbers mean anything.

If you'd like help working out whether your WhatsApp pipeline justifies the API route or whether labels and links will do, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on performance marketing](/expertise/performance-marketing/) cover what to do once the numbers are real. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
