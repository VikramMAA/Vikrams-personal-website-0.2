---
title: "Does my small business website need to be ADA compliant?"
seoTitle: "ADA Website Compliance for Small Business: What to Fix"
description: "The April 2026 deadline you heard about never applied to you, and it moved anyway. What applies instead has no deadline and no warning, which is worse."
publishedAt: 2026-10-08
published: true
tags: ["Accessibility", "Compliance", "Web"]
---

The accessibility deadline you heard about doesn't apply to your business. It also moved.

In April this year the Department of Justice issued an interim final rule pushing its Title II web accessibility deadlines back by a year. Large public entities now have until 26 April 2027, smaller ones and special districts until 26 April 2028. Plenty of articles out there still say April 2026.

But Title II covers state and local government. If you run a dental practice, a shop or a B2B software company, it was never your rule.

Yours is Title III, and Title III has no web regulation at all. The DOJ put out an advance notice in 2010 and never finished it. No standard, no deadline, no grace period.

Which sounds like good news for about ten seconds, until you work out what fills that vacuum. Enforcement happens through private lawsuits, and a lawsuit does not send you a reminder email eighteen months out.

So here's the practical answer. Treat WCAG 2.1 Level AA as the standard, because it is the one courts, demand letters and settlements actually reference. Four categories of failure account for most of what gets cited. And an accessibility widget is not a fix, which 91 businesses discovered in September alone.

## What the litigation actually looks like

UsableNet's tracker recorded 360 new ADA web accessibility lawsuits filed against US businesses in September 2026.

Two numbers inside that are more useful than the total. 78 of those defendants had already been through a digital accessibility lawsuit before. And 91 were sued while running a third-party accessibility widget on the site.

Through the first half of this year, 79% of filings targeted ecommerce. Filings have been shifting into state courts in California, New York and Florida, with Illinois becoming a notable venue federally. UsableNet's midyear work projected somewhere around 6,176 cases for the full year, and that is a projection rather than a count, so hold it loosely.

The pattern worth absorbing is the repeat rate. Getting sued once and settling does not inoculate you, because settling a case does not remediate a website.

## The four places small sites actually fail

You can check all four in about half an hour, on your own site, without buying anything.

**Images with no alt text.** Every image that carries meaning needs a text equivalent. The reverse failure is just as common: decorative images that should be marked as decorative instead get alt text, so a screen reader reads out "IMG underscore 4471 dot jpg" in the middle of a sentence. Open your product or service pages and check both directions.

**Form fields with no labels.** This is the one that costs you money as well as exposure. Placeholder text is not a label. It disappears the moment somebody starts typing, it fails contrast requirements on most themes, and it is not reliably announced. Every input needs a real label element tied to it. Check your contact form, your newsletter signup and your checkout.

**Color contrast.** WCAG 2.1 AA asks for a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. The two habitual culprits are light gray body copy on white, which a designer chose because it looked calm, and white text on a brand-color button, which nobody checked because it's the brand color. Your browser's dev tools will compute the ratio for you.

**Keyboard navigation.** Put your mouse down and press Tab repeatedly from the top of the page. Can you reach the menu, open it, close the cookie banner, complete the form, and see at every point where you are?

That last part catches the single most common self-inflicted failure I see, which is a stylesheet that removes the focus outline because somebody thought it looked untidy. The outline is how a keyboard user knows where they are. Removing it breaks the page for them and takes one line of CSS to put back.

## About the overlay widgets

Here is where I'd be direct, because this is the part being actively sold to small businesses as a solved problem.

In January 2025 the FTC brought an action against accessiBe over its accessWidget product, and the order became final that April. The company paid $1 million. The FTC's allegations were that claims the tool could make websites WCAG compliant were false, misleading or unsubstantiated, and that it had presented third-party articles and reviews as independent opinion without disclosing material connections. The order bars it from claiming an automated product can make or keep a site WCAG compliant without evidence.

I'm not interested in piling on a company. I am interested in the mechanism, because the mechanism is what matters for your decision.

A script loaded at runtime cannot create the relationship between a form field and its label in any robust way. It cannot know which of your images are decorative. It cannot restructure a heading hierarchy it doesn't understand. What it can do is add a layer that screen reader users frequently report having to work around, which is why a widget on the page is not evidence of a usable site.

And note what the DOJ itself said when it delayed its own Title II deadlines. Among the reasons given were resource constraints and the limits of current technology for remediation, generative AI included. The federal government postponed its own compliance dates partly because automated remediation doesn't do what it's advertised to do.

**Buying a widget does not transfer your exposure to the vendor. Those 91 defendants in September had one.**

Some of these tools have genuinely useful user-facing features, and a contrast toggle or a text resizer helps real people. Use them as conveniences if you like. Just don't buy one as a compliance position.

## The half that shows up in revenue

The same four failures cost you customers, which is the argument I'd actually lead with internally because it survives a budget conversation better than litigation risk does.

Low contrast body copy is unreadable on a phone in sunlight, which describes a great deal of mobile browsing, and it gets harder with every year of a buyer's age. Unlabeled form fields raise abandonment because people cannot tell what they already filled in. A keyboard trap in a checkout loses the sale outright.

None of that needs a legal motivation. It's just a site that works for more of the people arriving at it.

## Where this needs a lawyer, not me

I can tell you what WCAG asks for and where sites fail. I cannot tell you your legal exposure, and anybody who offers you certainty there is selling something.

Filings are moving into state courts with their own standards and their own procedural rules, so the jurisdiction you're in matters, and so does the specific nature of your business. Take the question of exposure to counsel, with your actual site and an actual audit in hand.

## Before lunch

Thirty minutes, free, in this order.

Tab through your homepage and your contact form from top to bottom with no mouse. Write down every place you get stuck or lose track of where you are.

Then run one page through a free automated checker, understanding that automated tools catch perhaps a third of real issues. Fix what it finds anyway, because it will find alt text and contrast problems immediately.

Then check your contact form for real labels, since that page converts and is the cheapest fix on the list.

If you'd like a second opinion on what your site turns up before you take it to counsel, [drop me a line](/contact/) on email, WhatsApp, phone or LinkedIn and we can have a quick chat, and my [notes on SEO](/expertise/seo/) cover the overlap, because much of this is the same work. I'm taking on a small number of contracts at the moment, so I'll tell you straight whether it's something I could help with.
