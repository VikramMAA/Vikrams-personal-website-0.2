---
title: "Can I claim GST input credit on Google and Meta ads?"
seoTitle: "GST Input Credit on Google and Meta Ads"
description: "There is a field in your Google payments settings that decides whose credit the 18% becomes. If an agency runs your account, it is probably not yours."
publishedAt: 2026-11-22
published: true
tags: ["Budgeting", "Compliance", "Google Ads"]
---

There's a field in your Google payments settings that decides whether a year of ad spend cost you 18 percent more than you think it did.

Most people filled it in once, in a hurry, when they opened the account. A lot of people never filled it in at all. And if an agency set the account up for you, there's a reasonable chance the number sitting in it belongs to the agency rather than to you.

Short answer to the question in the title: yes, ad spend GST is ordinary business input tax and a registered business claims it like any other. The useful part isn't the yes. It's that the claim depends on three settings fields being right at the time the invoice was raised, and you cannot fix a wrong one retrospectively.

So this is a twenty-minute check, and the thing I'd most like you to do today is go and look.

## What Google actually charges you, in Google's words

Worth reading from the source rather than from a blog, because the detail matters.

[Google's own documentation on GST](https://support.google.com/paymentscenter/answer/7398224?hl=en-IN) sets out the rates plainly: integrated GST at 18 percent, central GST at 9 percent, state GST at 9 percent. You're charged CGST and SGST together when your "Bill to" address state matches the state Google bills from, and IGST at 18 percent for every other state. Special Economic Zone customers are charged 0 percent.

Then three rules that decide whether the invoice is any use to you.

**"A GSTIN is mandatory for business accounts, but optional for individual accounts."** If you signed up as an individual years ago and never added one, Google has been charging you tax on an invoice that is not in your business's name. That isn't a filing problem you can tidy up later.

**"The GSTIN must be from the state shown in the 'Bill to' address."** If you hold registrations in more than one state, only the one matching the Bill-to state appears on the invoice. Put the wrong one in and your invoice carries a GSTIN that won't reconcile against the entity trying to claim it.

**And the expensive one.** "For business accounts being handled by an agency, the GSTIN and 'Bill to' address must be where the services are being received."

Read that twice if your agency runs your ad account.

## The agency trap, which is the whole reason I wrote this

Here's the situation I keep finding, and nobody involved is being dishonest.

An agency opens a Google Ads account for a new client. It's faster to use their own billing details, so they do. The card is theirs, they invoice you monthly for spend plus their fee, and everything works. Reports arrive, campaigns run, nobody looks at the tax fields again.

What's happened underneath is that Google raised its tax invoice to the agency. The agency is the registered recipient of the advertising service, so the input credit on your ad spend is sitting in the agency's returns, not yours. What you hold is the agency's invoice to you, which is a different supply at a different value.

Sometimes that's fine, deliberate, and priced in. Often nobody has thought about it, and the client is carrying 18 percent on a number they believe to be their net media spend.

Google's documentation is unusually clear that this isn't how it should be set up. The GSTIN and the Bill-to address are supposed to be where the services are received, which is you.

Three questions for your next agency call, and they're not confrontational, they're administrative.

Whose GSTIN is on the Google Ads account? Whose name is on the tax invoice Google raises each month? And when you invoice me, is the ad spend a reimbursement or is it part of your supply?

If nobody can answer the first one from memory, that's your answer.

## What this does to every budget number you've been given

Somebody tells you to put a lakh a month into ads.

If the credit lands with you, your media cost is Rs 1,00,000 and the Rs 18,000 is a cash flow item that comes back. If it doesn't, because you're unregistered or the GSTIN is wrong or it's gone to your agency, your media cost is Rs 1,18,000 and the campaign has to work 18 percent harder to break even.

Same advice, same spend, two different decisions.

Which means benchmarks that get passed around in rupees between founders are not comparable unless you also know each other's registration status and billing setup, and nobody ever asks. I made the general version of this point about agency fees in [what digital marketing actually costs in India](/blog/digital-marketing-consultant-cost-india/), including why an unregistered supplier's cheaper quote is quietly less cheap, so I won't run it again. The platform invoice is a separate supply with its own settings, and it's the one nobody audits.

## Meta, honestly

I wanted to give you Meta's rules the same way and I can't. Meta's business help pages returned errors every time I tried them from here, and what I found instead were third-party mirrors that contradicted each other about whether GST appears on the invoice at all.

What's consistently reported is that Indian advertisers are billed by Meta's Indian entity, in rupees, with 18 percent GST, and that the GSTIN field sits in Payment Settings in Ads Manager and is optional. The structure looks like Google's.

I'm not going to assert it from mirrors. Open Ads Manager, go to Payment Settings, and look at what's in the tax fields and whose address is in the billing section. That takes two minutes and it's better evidence than anything I could tell you.

## What I am not telling you

Two limits, stated plainly, because this is tax and the confident version of this article is the dangerous one.

I could not reach the statutory text. CBIC's tax information portal, the India Code repository and the GST portal were all unreachable from where I'm working, and the only consolidated Act PDF I could pull from CBIC predates the amendments that matter. So I'm not quoting the law at you, and I'd rather say that than paraphrase a section I haven't read.

There's also a claim window, and it's the reason this is a today job rather than a someday job. The time limit for taking credit on an invoice is widely reported as 30 November following the end of that financial year, or the filing of the annual return, whichever comes first. If that's right, the window on last financial year closes within days. I couldn't verify the wording at source, so don't take the date from me. Take it to your CA this week, because if it is right, waiting until January costs you the whole year.

## Before lunch

Open your Google payments centre settings and read the India tax info field. Check the GSTIN is yours, and that it's the registration for the state in your Bill-to address.

Then open Ads Manager and do the same thing for Meta.

Then pull last month's invoice from each and look at whose name is on it. If it isn't your company's, that's the conversation to have this week rather than next quarter.

If you want somebody to look at the account structure alongside the campaigns, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on performance marketing](/expertise/performance-marketing/) cover the spend side of it. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
