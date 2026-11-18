---
title: "Is B2B cold email legal in the EU?"
seoTitle: "B2B Cold Email and GDPR in the EU"
description: "There is no answer to that question, because the EU is not the unit the rule operates on. There are twenty-seven answers and yours depends on the address."
publishedAt: 2026-11-18
published: true
tags: ["Outbound", "Compliance", "Estonia"]
---

The question everybody asks is whether cold email is legal in Europe, and the honest answer is that the question has no answer, because the EU is not the unit the rule operates on.

There are twenty-seven answers. They differ in ways that matter, and the folklore that GDPR killed outbound is wrong in a specific and expensive way: it stops people using a channel they are entitled to use in some countries while giving them false confidence in others.

I have written the verdict for two markets already. [Finland and Sweden apply the legitimate interest framework to B2B email](/blog/how-to-sell-to-nordic-customers-from-estonia/) without stricter national rules on top, Germany is consent-based, and copying a German playbook into Finland costs you a channel.

This post is the architecture underneath that, which nobody explains, and Estonia's own position, which I had not read properly until this week.

None of it is legal advice and the next paragraph tells you exactly how far my sourcing goes.

## The rule you want is national, not European

Two different instruments are doing two different jobs, and conflating them is the source of most of the confusion.

The GDPR governs whether you may process somebody's personal data at all, and legitimate interest is a lawful basis for doing so. That part is genuinely EU-wide.

The rule on actually sending unsolicited commercial email sits in the ePrivacy Directive, and a directive is not a regulation. Each member state transposed it into its own statute, and the national statutes visibly differ on whether business recipients get the consent protection or only an opt-out. That difference is why Germany and Finland give opposite answers to the same question.

Being straight about my sourcing here: I could not reach the directive text itself from where I work, through three different methods, so I am describing the mechanism from the national laws it produced rather than quoting the article. If the precise wording matters to your decision, that is a question for a lawyer rather than for me.

The practical consequence is the part to take away. You cannot have one EU outbound policy. You need a position per destination country, and the question to ask about each one is narrow: does this state require consent to email a business, or does it require a working opt-out?

Practitioners generally treat the recipient's country as the one that bites. I would not state that as settled, because it is fact-specific, and it is exactly the sort of thing worth thirty minutes of advice before you launch into a new market.

## What Estonia's own law actually says

Worth reading properly if you are sending from here, and the official English consolidated text is clearer than any summary of it.

Section 103¹ of the Electronic Communications Act splits the rule by who the contact details belong to.

For a subscriber or user **who is a natural person**, direct marketing to their electronic contact details is allowed "only with the person's prior consent", and that consent has to meet the conditions in section 12 of the Personal Data Protection Act.

For a subscriber or user **who is a legal person**, it is allowed provided a clear and distinct opportunity to refuse is given, free of charge and in an easy manner, exercisable over an electronic communications network. That is an opt-out regime.

There is also an existing-customer exception that covers both. If you obtained the details in connection with selling a product or service, you may market similar products to that buyer without fresh consent, provided the refusal opportunity was given at initial collection and is given every time you use the details.

And four prohibitions regardless of basis. You may not send if the person on whose behalf the information is communicated cannot be identified, if the message carries no instruction allowing the recipient to refuse, if it fails the Information Society Services Act requirements, or if the recipient has already refused.

One more clause that decides how you keep records: the burden of proving consent rests with the person on whose behalf the marketing is done.

## Which makes the address the decision, not the copy

Now the thing that falls out of that split, and it is the most useful sentence in this post.

Your legal position is determined by whose contact details you used, not by what you wrote.

`info@company.ee` is plausibly the legal person's contact detail, and the opt-out regime applies. `mari.tamm@company.ee` is a named individual's address, and the argument that it is a natural person's electronic contact detail is a serious one.

So the campaign you built by finding named decision makers, which is the campaign every outbound guide tells you to build, is the one sitting closest to the consent requirement. The lazy campaign to role addresses is on safer ground and converts worse.

I want to be honest that the line between a natural and a legal person's details on a work email address is contested and has been argued both ways by practitioners. It is not settled by the statute's text. But notice what it means for how you plan: the compliance question gets decided when you build the list, by a junior person or a tool, long before anybody reviews the copy.

## The work is disclosure and suppression, not consent

Which is good news, because disclosure and suppression are cheap and consent at scale is not.

Suppression is not a courtesy. Under the Estonian provision, once somebody has refused, further use of their details for direct marketing is prohibited. So your suppression list is a statutory obligation with a technical implementation, and "I forgot to add them" is not a category of excuse.

Identification is not optional either. The sender on whose behalf the message goes out has to be identifiable, which rules out the anonymous sending domain and the fake persona.

And the refusal mechanism has to be in every message and has to work. Not a reply-to-unsubscribe instruction that goes to a mailbox nobody reads.

Where you rely on consent rather than opt-out, the burden of proof is yours, which in practice means a record of when and how it was given. If you cannot produce that record, you do not have consent, you have a hope.

## What actually gets companies in trouble is the list

Here is the part I would put to anybody buying an outbound tool this quarter.

A badly targeted campaign to fifty people is a bad campaign. A scraped list of forty thousand is the same problem repeated forty thousand times, and it creates two exposures at once: a volume of people who never gave you anything, and a dataset you cannot vouch for the accuracy of.

The companies that get complained about are not the ones that sent a relevant email to a named role. They are the ones that bought a database.

Which is the same conclusion the deliverability side reaches from a completely different direction, since a tight list of two hundred outperforms a scraped five thousand on every metric that keeps your domain alive. I went through [the technical setup](/blog/cold-email-deliverability-setup/) separately, and it is striking that the legal and the technical advice converge on exactly the same instruction: send less, to people you chose.

## Where I come out

Stop asking whether cold email is legal in Europe. Ask which regime applies to the address you are about to use, in the country the recipient sits in, and write down the answer per market before you build a list rather than after.

Then do the three cheap things that hold in every regime I have looked at: identify yourself properly, put a working refusal in every message, and suppress the moment somebody uses it.

If your plan survives all of that and still needs forty thousand addresses you did not choose, the problem was never the regulation.

If you'd like to think through the targeting before anybody writes a sequence, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on lead generation](/expertise/lead-generation/) cover the rest. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
