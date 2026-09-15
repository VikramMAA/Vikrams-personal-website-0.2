---
title: "Can I use Google Analytics and the Meta pixel on a medical website?"
seoTitle: "HIPAA Compliant Marketing: Pixels and Analytics"
description: "The HIPAA theory everyone warned you about was struck down in 2024. That changed almost nothing about your exposure, because the risk moved somewhere else."
publishedAt: 2026-09-15
published: true
tags: ["Healthcare", "Compliance", "Analytics"]
---

A patient lands on your knee replacement page and clicks "Request an appointment".

In that moment, several things leave their browser and arrive at companies you do not control. The full URL, which contains the words knee replacement. Their IP address. Whatever advertising cookie they are carrying. On some setups, the contents of form fields.

None of that is hypothetical. It is what a standard pixel does, and it is why this became the most litigated question in healthcare marketing.

I am not a lawyer and this is not legal advice. Your compliance officer and your counsel decide this, not a blog post. What follows is the state of play, because most of the guidance circulating on this is two years out of date in a way that will mislead you in both directions.

## The federal rule you were warned about was struck down

This is the part that surprises people.

In December 2022 the Office for Civil Rights published a bulletin saying that when an online tracking technology connects an individual's IP address with a visit to an unauthenticated public webpage addressing specific health conditions or providers, that combination is protected health information. Every agency, vendor and webinar in the sector spent 2023 repeating it.

On 20 June 2024, the US District Court for the Northern District of Texas, in American Hospital Association v. Becerra, declared that specific portion unlawful and vacated it. The court held that OCR had exceeded its statutory authority.

OCR withdrew its appeal on 29 August 2024.

So the proposition that an IP address plus a visit to a public page about a condition is automatically PHI is no longer the law. If a vendor is still selling you a product on that basis, their premise has been vacated.

## Which changed less than you would hope

Because the exposure moved. It went from a regulator who might investigate you to plaintiffs' lawyers who will definitely file.

Something like 161 healthcare-specific tracking lawsuits have been filed since 2022, with documented settlements above $190 million in total. The reported figures include Kaiser Permanente at $46 million, Sutter Health at $21.5 million, Aspen Dental at $18.7 million, Mass General Brigham at $18.4 million, Adena Health System at $17.8 million and Advocate Aurora Health at $12.25 million.

Now the detail that matters most to anybody reading this. Filings have continued at a steady pace through 2026, and plaintiffs' firms have moved down market. The early targets were large health systems. The current ones include smaller providers and specialty clinics.

A six chair dental practice was not a target in 2023. It is now.

## The claims that survive the vacatur completely

The June 2024 ruling addressed one theory under one statute. The suits mostly are not brought under HIPAA anyway, because HIPAA has no private right of action. They are brought under laws that do.

**State wiretapping statutes**, particularly the California Invasion of Privacy Act. The argument is that a third party pixel is an unauthorized interception of a communication, and it has proved durable enough to drive a large share of the filings.

**The Electronic Communications Privacy Act** and state medical confidentiality laws such as California's Confidentiality of Medical Information Act.

**Washington's My Health My Data Act** and the similar state statutes passed in 2024 and 2025, which carry their own causes of action.

Two consequences worth sitting with.

None of those were affected by the Texas ruling. And several of them reach businesses HIPAA does not cover at all, which means a wellness app, a med spa, a supplement retailer or a telehealth intermediary can be exposed without ever having been a covered entity.

## What remains squarely a HIPAA problem

One thing, and it was never in dispute.

Anything behind a login. The patient portal, logged in scheduling, results, messaging. Tracking technologies there involve PHI by any reading, and using them requires either a business associate agreement or patient authorization.

Which runs into a wall, because the major advertising platforms will not sign a business associate agreement for their advertising products. That is not a negotiation you can win, and it is the fact that decides your entire architecture: if the data needs a BAA to be shared, it cannot go to the ad platform, and no configuration setting changes that.

## What to actually do

**Inventory what fires, page by page.** Open your own site, open the browser network tab, and watch what goes out when you load a page and when you submit a form. You want the list of pages where a condition, procedure or specialty appears in the URL, and the list of what is transmitted from each.

Most practices have never done this and are genuinely surprised by the answer.

**Decide per page, not per site.** Your homepage, your careers page and your blog carry very different risk from your oncology appointment form. A blanket policy either over-restricts your marketing or under-protects the pages that matter. Segment.

**Get the condition out of the URL.** A query string that reads appointment type equals fertility consultation is the most common self-inflicted wound in this entire area. Rewrite those URLs. It is a development task, not a legal one, and it removes the clearest piece of evidence against you.

**Move to server side tagging with field level control.** The point is not the buzzword. The point is that you decide what gets sent, so you can pass a conversion event without passing the page URL, the IP or the identifiers. That is the difference between telling the ad platform a booking happened and telling it who booked what.

**Make consent real.** A banner that loads the pixel before anybody clicks anything is worse than no banner, because it documents that you knew consent mattered.

**Write down the decision.** Which pages carry tracking, what is transmitted, who approved it, on what date, on what advice. If you are ever asked, the difference between a considered decision and an accident is most of your position.

## The honest summary

Do not read the court ruling as permission. Read it as a correction to one federal theory while the actual financial risk relocated to state law and the plaintiffs' bar, where it is larger and aimed at smaller practices than it was two years ago.

And do not read this as a reason to abandon measurement. A clinic that cannot tell which campaigns produce patients will waste far more money than this ever costs. The answer is a deliberate architecture, not switching everything off and guessing.

## Before lunch

Three things, about an hour.

Open your three highest traffic condition or service pages, watch the network requests, and write down what leaves and where it goes.

Check whether any URL on your site contains a condition, procedure or specialty as a parameter. Flag those for your developer today.

Then send both lists to whoever owns compliance at your practice, with a date, and ask for a decision in writing. That last step is the one that converts a technical problem into a managed one.

Healthcare marketing now sits in the same category as [SMS consent](/blog/tcpa-compliance-sms-marketing/) and [review collection](/blog/how-to-get-more-google-reviews/): areas where the ordinary practice of the industry drifted onto the wrong side of a rule, and where the operators who sorted it out early ended up with an advantage rather than a cost.

My [notes on SEO](/expertise/seo/) cover the marketing side for practices. If you'd like to think through your own setup before you take it to counsel, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
