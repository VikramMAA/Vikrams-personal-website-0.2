---
title: "What should I check before and after launching a new website?"
seoTitle: "Website Launch Checklist: What Actually Breaks"
description: "Everything that fails at launch fails silently, because the browser is the one place where none of it shows. The site looks perfect and the forms go nowhere."
publishedAt: 2026-11-08
published: true
tags: ["Technical SEO", "Process", "Web Development"]
---

Everything that breaks at launch breaks silently.

That is the whole reason launches go wrong. You open the new site, click around, and it is beautiful. The browser is the one place where none of the real failures show, because the things that fail live in systems you cannot see from a page: an inbox, a DNS record, a tag container, a consent banner, a link on somebody else's website.

The search half of this is already written up. I went through [the redirect map, the staging noindex and what a normal post-launch dip looks like](/blog/website-redesign-seo-checklist/) separately, and all of it still applies, so go there for the migration mechanics.

This is the other half: the checks nobody assigns to anybody, in the order that catches the expensive ones first. All of it is testable in an hour by you, today, without a developer.

## Submit your own forms, from your own phone

Start here, because a form that posts successfully and emails nowhere is the most common silent launch failure there is, and it costs you leads you will never know about.

The failure has a specific shape. The form submits, the thank-you page appears, and the notification goes to an address somebody typed into a plugin eighteen months ago, or to a developer's inbox, or into a spam folder that nobody opens.

So do this properly rather than quickly.

Fill in every form on the site, on your phone, on mobile data rather than office wifi. Use a real name and your own number. Then go to the inbox that is supposed to receive it and confirm it arrived, including the spam folder. Then reply to it, to confirm the reply-to address is the customer's and not noreply.

If you have a CRM, check the record appeared there too, because form to email and form to CRM are two separate integrations and only one of them is usually tested.

And check the autoresponder, if there is one. A confirmation email that says "Thank you for contacting Acme" when you rebranded last month is the first thing your new customer reads.

## Email breaks at the DNS layer and the browser never tells you

If the launch moved hosting or DNS, your email is at risk and your site will give you no indication of it.

The mechanism is dull and expensive. Authentication records live in DNS alongside the records pointing at your website. Move the zone to a new provider and copy across only what is needed to serve the site, and your SPF and DKIM entries quietly do not come with it. Your website works perfectly. Your transactional email starts landing in spam or bouncing, and the first evidence is a customer saying they never got the confirmation.

Send yourself a message from the site, from the CRM, and from your own mail client, to an address at a different provider. If any of them land in spam, that is a DNS job and it needs doing today rather than next week, because deliverability damage accumulates. I covered [the records themselves and how to set them up](/blog/cold-email-deliverability-setup/) when writing about outbound, and the same three records are the ones at stake here.

## Your tags are new even when your site is not

The second most common silent failure, and the one that creates a fake emergency a week later.

A new build usually means a fresh tag container. The pageview tag gets installed, because that is the obvious one. The events do not, because nobody kept a list of what the old site was tracking: the form submission, the phone click, the quote request, the add to cart.

So pageviews report normally and every conversion in your dashboard goes to zero, which looks like a catastrophe and is a measurement problem.

Prove it rather than assuming it. Open GA4's realtime report, submit a test enquiry, and watch the event arrive with the right name. Do the same for a phone tap. If you run ads, check the conversion action is receiving data in the ad platform too, because that is a separate pipe and a broken one quietly ruins bidding.

While you are there, check the consent banner. A new site frequently ships a new banner that defaults to denying analytics, which means your numbers now exclude everybody who ignores it. That is a legitimate configuration and a real reporting discontinuity, and you want to know about it before you compare this month to last. For the general version of this problem, [why conversions stop being recorded](/blog/ga4-conversions-not-tracking/) covers the usual causes.

## The drop in week one is often a measurement drop

Here is the ten-minute check that tells you which kind of problem you have, and it is free.

Open Search Console and look at impressions for the last fourteen days. Then open GA4 and look at sessions over the same period.

Search Console impressions do not depend on your tags at all, because Google counts them on its own side. GA4 sessions depend entirely on your tags firing.

So if impressions are holding steady and sessions have fallen off a cliff, your tracking broke and your traffic is fine. If both have fallen together, that is a real visibility problem and belongs in the migration checklist rather than here. And if impressions have fallen while rankings look unchanged, that is a third thing entirely, which I went through in [why traffic falls when rankings do not](/blog/ai-overviews-traffic-drop/).

Most of the launch panics I have been called into were the first case, and the panic itself did the damage, because somebody started changing pages in week one.

## The links pointing at your old URLs that you do not control

Your redirects handle the pages. They do not handle everything in the world that points at a specific old address.

Walk this list, because each item sends real people to a 404 and none of it is in anybody's project plan.

The website link on your Google Business Profile, which frequently points at a specific page rather than the homepage. Your email signatures, across everybody. Invoice and quote templates. The link in your social profiles. Ad destination URLs in every live campaign, including the sitelinks, which is the one that quietly keeps spending money. Any QR code on printed material, vehicle livery or packaging, which cannot be edited and therefore needs a redirect that lives forever.

The last one is the argument for keeping redirects in place permanently rather than for a tidy six months. Somebody is going to scan a van in 2029.

## Before lunch

An hour, in this order.

Submit every form on your phone, confirm each one arrived in an inbox a human actually opens, and reply to it.

Send three test emails from three different places and check none of them landed in spam.

Open GA4 realtime, fire a test enquiry, and confirm the event arrives with the right name. Then check the consent banner's default.

Then compare Search Console impressions against GA4 sessions, so that if somebody panics next Tuesday you already know which of the two numbers moved.

Then spend ten minutes on the list you do not control, starting with your Google Business Profile link and your live ad destinations.

If you'd like a second pair of eyes before you go live, or a diagnosis of a drop that has already happened, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on SEO](/expertise/seo/) cover the search side of a move. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
