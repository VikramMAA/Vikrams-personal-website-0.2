---
title: "How do I redesign my website without losing my Google traffic?"
seoTitle: "Website Redesign SEO Checklist: Don't Lose Your Traffic"
description: "Expect a 10 to 25% dip in the first month. Whether it recovers depends on one decision made long before launch week, and most companies make it wrong."
publishedAt: 2026-08-27
published: true
tags: ["SEO", "Migration", "Technical SEO"]
---

Somebody books a redesign with a design studio. There is a kickoff, a moodboard, a sitemap sketched on a whiteboard, and eleven weeks later a much better looking website.

Nobody in that room's job was the four thousand URLs that already rank.

That is the whole problem, and it is a filing error rather than a technical one. A redesign gets commissioned as a design project. It is actually a migration with a design component attached, and those are different projects with different risks and different people who need to be in the kickoff.

Here is what to expect either way. A redesign typically costs 10% to 25% of organic traffic in the first thirty days, with recovery taking anywhere from two to eight months depending on how complicated the move was. Some dip is normal. Whether it comes back is decided almost entirely by one thing.

**Was the redirect map an input to the information architecture, or a ticket in launch week?**

Because by launch week the URL structure is already frozen, and the redirect map becomes an exercise in damage limitation rather than design.

## The four ways this actually goes wrong

Almost all redesign traffic loss comes from the same short list.

**A staging noindex shipped to production.** One line, catastrophic, and more common than anyone admits because staging sites are correctly set to noindex and somebody forgets to remove it. Check this on launch day before anything else.

**URLs changed without one-to-one redirects.** The default failure. New site, new structure, old addresses now returning 404s or all pointing somewhere generic.

**Pages that ranked got rewritten shorter.** This is the one nobody sees coming and I will come back to it.

**Internal links left pointing through redirect chains.** The old links still work, technically, but every one now passes through a redirect, and the navigation is quietly doing that on every page.

## The two redirect mistakes that do the real damage

Redirecting a large batch of old URLs to the homepage feels tidy. It is the single most expensive thing you can do.

Google reads a many-to-one redirect to the homepage as a soft 404. The interpretation is that the content was removed, not moved, so the ranking signals that page had accumulated do not transfer. They evaporate. A hundred pages redirected to the homepage is a hundred pages of history thrown away while everyone congratulates themselves on having no broken links.

The second is chains. Old URL goes to an interim URL which goes to the final one. A to B to C. Each hop adds latency and dilutes what passes through, and chains accumulate silently across successive redesigns until nobody remembers why a page loads slowly.

The rule is boring and absolute. One old URL, one 301, straight to the closest equivalent page. If there is genuinely no equivalent, that is a decision to make deliberately rather than a gap to paper over with the homepage.

## The order that prevents all of it

This is the actual fix and it costs nothing except doing it in the right sequence.

Before anyone designs anything, export every URL on the current site. Then pull two lists from it: your top pages by organic traffic, and the pages that have inbound links from other websites.

That combined list is not a report. It is a constraint on the new information architecture.

If a page in that list has no obvious home in the proposed structure, the structure is wrong and needs changing while it is still a diagram. That conversation is free in week two and expensive in week eleven.

Most redesigns never have that conversation because the person who could produce the list was not invited until the build was underway.

## The invisible one: "let's tighten the copy"

Now the failure mode I would argue about, because it is the one that looks like an improvement.

Design briefs almost always include reducing copy. Cleaner pages, more whitespace, less scrolling. It makes the site look better and it usually does improve the experience.

But the page that ranks is often long precisely because it answers the entire question. It covers the objection, the edge case, the pricing detail, the comparison. That thoroughness is why it outranks the tidier competitor.

Cut it to fit the new template and you have not tightened the copy. You have deleted the reason the page ranked, and you will not connect the two events, because the traffic drop arrives six weeks later and gets blamed on an algorithm update.

If a page is in your top twenty, the copy does not get trimmed to fit the design. The design accommodates the copy. That is an uncomfortable thing to say to a designer and it is the right call.

I wrote separately about [how to work out what actually caused a traffic drop](/blog/google-algorithm-update-recovery/), and a redesign three months earlier is one of the first things I would check.

## Launch week and the fortnight after

Four things, quickly.

Submit a fresh XML sitemap to Search Console the day you launch. Do not wait for it to be discovered.

Check the noindex tag is gone. Then check it again from a different device.

Crawl the new site and look specifically for internal links still pointing at old URLs. Fix those to point directly at the new ones rather than relying on the redirects.

Then watch Search Console daily for two weeks. Not weekly. The Page indexing report is where a botched migration shows up first, and the difference between catching it on day three and day twenty is most of your recovery time.

## What I would actually change

Commission the next redesign as a migration that includes a redesign, and put whoever owns the URL list in the kickoff with the authority to say no to a structure.

That single change in how the project is framed prevents almost everything above, because it makes the traffic somebody's explicit responsibility from week one instead of a problem discovered in week twelve.

A prettier site that ranks for less is not an improvement. It is a rebrand you paid for twice, once in fees and once in the traffic you had already earned.

If you'd like to talk through a redesign you are planning, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch. My [notes on SEO](/expertise/seo/) cover more of the technical side.
