---
title: "How do I answer a vendor security questionnaire?"
seoTitle: "Vendor Security Questionnaires for Small EU Vendors"
description: "The person deciding your deal works in risk and has never seen your product. What to assemble before the spreadsheet lands, and what a certificate misses."
publishedAt: 2026-09-20
published: true
tags: ["B2B", "Estonia", "Lead Generation"]
---

The person who decides whether you win this deal has never seen your product and never will.

They work in risk, or procurement, or somewhere in the second line of defence at a Helsinki insurer. They were handed your name last Tuesday. They will form their entire opinion of your company from a spreadsheet you fill in, and they are not evaluating whether your software is good. They are evaluating whether recommending you would be defensible if something went wrong in eighteen months.

Your champion cannot help you here. They have already said yes and have now handed you to a colleague whose incentives point the other way.

So the useful reframe, and it changes what you do on a Monday morning: the questionnaire is not a test of how secure you are. It is a test of whether you have the evidence assembled. Plenty of genuinely secure five person companies fail it, and they fail on documentation rather than on security.

Build the package before you need it. That is the whole post, and the rest is what goes in it.

## Why this got heavier, specifically since 2025

Two pieces of EU regulation have pushed obligations down onto suppliers who are not themselves regulated, and if you sell into Nordic enterprise or finance you are squarely in the path of both.

DORA has applied directly across the EU since 17 January 2025. Banks and insurers have been rewriting their ICT supplier contracts to carry the clauses Article 30 requires, which means even a small vendor selling a peripheral tool is now handed contractual language about incident reporting, audit rights, subcontracting and exit.

NIS2 does something similar by a different route. Article 21(3) requires regulated entities to account for the security practices of each direct supplier, so a manufacturer or a logistics operator in Finland who falls under the directive is obliged to ask you questions whether or not you are in scope yourself. Falling below the employee and revenue thresholds does not keep the requirements away. They arrive through the contract instead.

I am not a lawyer and this is not legal advice. The practical consequence is what matters here: a question that used to appear in month six of an enterprise sale now appears in month two, and it appears in deals where it never used to appear at all.

## What to assemble

Roughly a day of work, and it is reusable forever. Keep it in one folder and keep it current.

**A one page security overview.** Where data lives, who can reach it, how you authenticate, what you encrypt, and who to call. Written so a non-technical risk officer can read it in three minutes.

**A completed questionnaire you maintain.** Fill out a standard one properly, once, and keep the answers as your source. Most of what arrives is the same forty questions in a different order, so you are copying rather than composing.

**Your subprocessor list.** Every third party that touches customer data, what they do, and where they are. This gets asked every single time and it takes an afternoon to compile honestly.

**A data residency and transfer statement.** For EU buyers this frequently decides things. If everything stays in the EU, say so plainly with the region named.

**Incident response, with the notification clock in it.** Not the procedure document. The answer to "how fast do you tell us, and who calls whom".

**Business continuity and an exit plan.** How a customer gets their data out and how long it takes. This is the one small vendors never have ready, and it is now explicitly asked for.

**A DPA you can sign, plus your penetration test summary and your access control policy.** Onboarding and offboarding included, because someone will ask what happens when an employee leaves.

## The certification question, answered honestly

Yes, ISO 27001 is the one European buyers ask for, and yes, it costs real money.

For a company of five or ten people in Tallinn, expect a serious engagement rather than a form filling exercise, and expect it to take months. Whether that is worth it comes down to one question: is a certificate currently the reason you are losing deals, or is it something you assume would help?

Go and check. Look at your last five stalled enterprise conversations and find out where each one actually died. If three of them died in a security review, the case makes itself. If none did, you are considering spending your next hire's salary on a badge.

SOC 2 is the American equivalent and it is worth knowing which one your market wants, since [US buyers read all of this differently](/blog/selling-saas-to-us-customers-from-europe/) and asking for the wrong certificate is an expensive way to be prepared.

And here is the part vendors are surprised by. A certificate does not answer everything. The DORA expectations overlap with ISO 27001 and SOC 2 on the obvious things, controls, incident handling, vendor management, and then diverge on exit strategies, subcontracting governance and the register of information the financial entity has to maintain. You will still be filling in the specific questions. The certificate makes the rest go faster and signals you have been audited by somebody.

## When you have nothing yet

Which is most readers, so let us be practical about it.

Answer honestly and never bluff. A risk officer who catches one inflated answer stops trusting all of them, and in the Nordic market that is terminal in a way it is not everywhere else. [Overclaiming is read as evidence that the claim cannot be supported](/blog/how-to-sell-to-nordic-customers-from-estonia/), which is the same instinct that makes superlatives fail there.

The answer that works when you cannot say yes has three parts. What you do not have. What you do instead. When the gap closes.

"We are not ISO 27001 certified. We run annual third party penetration testing, enforce two factor authentication and least privilege across all systems, and our subprocessors are listed below. Certification is planned for Q3 next year."

That is a perfectly acceptable answer and I have seen versions of it pass. What does not pass is a blank cell, a "yes" you cannot evidence, or a two week silence while you go and find out.

## Change the sales process, not just the paperwork

The mistake is treating this as an obstacle that appears late. Ask for it early instead.

At the first serious meeting, ask the buyer directly: what does your vendor onboarding involve, who runs it, and can you send me the questionnaire now. Three consequences follow. You find out immediately whether there is a process that will eat three months. You look like somebody who has done this before. And you convert an ambush into a scheduled task you can work on while the commercial conversation continues in parallel.

Your champion will also be grateful, because you have handed them something to show internally at the exact moment they need to prove you are a safe choice.

## Before lunch

Create the folder. Write the one page overview from memory, which will take forty minutes and will immediately show you what you do not know.

Then list your subprocessors. Every service that touches customer data, named, with its location.

Then email the champion in your slowest current enterprise deal and ask for their security questionnaire before they think to send it.

My [notes on lead generation](/expertise/lead-generation/) cover the rest of the pipeline. If you'd like to think through your own setup, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
