---
title: "Why are my GA4 conversions not tracking?"
seoTitle: "GA4 Conversions Not Tracking: How to Fix It"
description: "Send yourself a lead from your phone and watch what happens. Six causes in the order to check them, plus the WhatsApp hole nobody measures."
publishedAt: 2026-09-11
published: true
tags: ["Analytics", "GA4", "Tracking"]
---

Stop reading and send yourself a lead.

Take your phone off the office wifi, onto mobile data, open your website in a private window, and submit your own contact form as though you were a customer. Then open GA4, go to Reports and then Realtime, and watch for thirty seconds.

Most people running a business have never done this. It takes five minutes and it tells you more than any dashboard, because it answers the only question that matters: when somebody actually enquires, does anything happen in your analytics?

Two things about how I set that test up, because both are deliberate.

Mobile data, not office wifi, because if your own IP is in the internal traffic filter your test will be dropped from reports while looking perfectly fine in DebugView. That single setting has convinced a lot of people their tracking is broken when it is working, and convinced others it is working when it is not.

Private window, because your cookie consent choice from last week is sitting in your browser and you want to see what a new visitor experiences.

If the event appeared, good, skip to the WhatsApp section, which is where most Indian businesses are actually losing their numbers. If nothing appeared, here are the six causes in the order worth checking.

## 1. The event is not marked as a key event

GA4 renamed conversions to key events, and the rename hides a trap. GA4 will happily collect an event forever without ever counting it, because an event only becomes a conversion once you explicitly mark it as one.

Admin, then Events. Find your event in the list. If the key event toggle is off, that is your answer.

The part that stings: marking it is not retroactive. It counts from the day you flip the switch and your historical data stays empty. Nothing recovers those months, so check this before you spend a week debugging code that works.

## 2. The tag is pointing at the wrong property

Very common after a redesign, a developer handover, or a staging site being copied to production.

Open your website, view the page source, and search for the measurement ID beginning with G-. Then open Admin, Data streams, and compare the two character by character. Not at a glance. Character by character, because these differ by one digit surprisingly often and your data is sitting in a property nobody opens.

## 3. Your consent banner is blocking the tag

If your cookie banner is wired to block analytics until somebody accepts, then every visitor who ignores it or declines is invisible, including the ones who convert.

Test it directly. Private window, decline everything on the banner, then complete a conversion and watch Realtime. If nothing fires, you have found a permanent gap rather than a bug.

That gap is a legitimate consequence of consent, not something to sneak around, and with India's data protection regime tightening it is worth getting your consent setup reviewed properly rather than quietly switched off. What you can do is know the size of the hole, so you stop treating the remaining number as the full picture.

## 4. The event fires on page load instead of on the action

The classic version: the conversion tag sits on the thank you page, but somebody installed it site-wide, so every page view counts as an enquiry. Your conversion count is enormous and meaningless.

The other version is a button click tag configured to fire on page view, which does the same thing more quietly.

Symptom to look for: conversions roughly equal to sessions, or a conversion rate that would make you the best performing business in your category. If your reported conversion rate is 40%, you have not discovered something. You have a tag on the wrong trigger.

## 5. GA4 is installed twice

Themes and page builders often include a field for your measurement ID. Then somebody adds Google Tag Manager and installs GA4 through that as well. Now everything counts twice.

Symptom: numbers that look too good, sessions doubling, bounce rate suspiciously low. Check your page source for more than one G- ID, and check GTM for a GA4 configuration tag alongside a hardcoded one in the theme.

## 6. The parameters are empty

If you use Tag Manager and your event shows up but with blank values, the variable name in GTM almost certainly does not match the key the site actually pushes into the dataLayer.

Open DebugView, trigger the event, and look at the parameters. If they are there but empty, it is a naming mismatch rather than a firing problem, and it is a five minute fix once you know which of the two it is.

## The WhatsApp hole, which is bigger than all six

Here is the one that matters most in India and appears in none of the standard guides.

For a large share of Indian businesses, most enquiries never touch your contact form. People tap the WhatsApp button and the conversation continues in another app entirely. GA4 sees a click leaving your site and nothing after that, so your best channel reports as your worst.

You cannot close that loop completely. You can do three things that get you most of the way.

**Track the click itself as a key event.** It is an outbound click on a wa.me link. Set it up, mark it as a key event, and at least the intent is counted.

**Put the source in the prefilled message.** A wa.me link accepts prefilled text, so use a different one per channel. The message that arrives says where the person came from, and suddenly your WhatsApp enquiries have a source attached without any tooling at all.

**Count the real number monthly.** Open WhatsApp, count genuine new enquiry conversations for the month, and write it next to whatever GA4 reported. The ratio between those two numbers is the correction factor for everything else you read.

Being roughly right about a channel that works beats being precisely right about one that does not.

## Two more that quietly corrupt everything

**Your payment gateway is a self referral.** When a customer goes out to Razorpay or PayU and comes back, GA4 can attribute the sale to the gateway rather than to the campaign that earned it. Add your gateway domains to the unwanted referrals list in your data stream settings, and your paid campaigns stop looking broken.

**Paid social arrives as direct.** If your Instagram and Facebook links have no UTM parameters, that traffic lands in direct or referral and your ad spend looks unattributed. Tag every paid link, use the same naming every time, and write the convention down somewhere your team can find it.

## Before lunch

Do the test at the top of this page. Mobile data, private window, real submission, Realtime open.

Then check the key event toggle and compare your G- ID against Admin, Data streams, character by character. Those two account for most of what I find.

Then count your actual WhatsApp enquiries for last month and put that number beside what GA4 told you.

Once the numbers are trustworthy, [the budget arithmetic](/blog/digital-marketing-budget-small-business-india/) and [the six places Google Ads leaks money](/blog/google-ads-not-converting/) both become decisions rather than guesses, which is the entire reason to fix this.

My [notes on how I work](/expertise/) cover the rest. If you'd like a second pair of eyes on your own setup, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
