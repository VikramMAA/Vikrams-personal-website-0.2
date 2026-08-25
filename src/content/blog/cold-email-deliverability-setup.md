---
title: "Cold email deliverability is a DNS problem before it's a copywriting problem"
seoTitle: "Cold Email Deliverability: SPF, DKIM and DMARC Setup"
description: "Five fixes in the order that matters, with the exact DNS records. Since November 2025 non-compliant mail is rejected outright rather than sent to spam."
publishedAt: 2026-08-25
published: true
tags: ["Cold Email", "Deliverability", "B2B"]
---

Week one, the campaign opens at 42%. Everyone is pleased.

Week three it's down to 12% and somebody suggests testing subject lines.

Week five it's near zero, the team has rewritten the copy twice, and a new domain gets bought so the whole thing can start again. Six weeks later that one burns too.

I've watched this loop run at three or four companies now, and the copy was never the problem. The copy is the fifth thing on this list. The first four are infrastructure, and if any of them is wrong the best email you've ever written gets rejected before a human sees the subject line.

That word is doing real work now. **Since November 2025, Google and Microsoft have issued permanent 550 rejections for non-compliant bulk mail rather than quietly filing it in spam.** You aren't losing the open. You're losing the delivery, and the bounce looks like a broken address.

Here are the five, in the order to fix them.

## 1. Stop sending cold email from your main domain

If you take one thing from this, take this one.

Buy a separate domain for outbound. Something close to your real one, so a prospect who looks it up finds a legitimate company, but not the domain your invoices, password resets and customer support run through.

Sender reputation attaches to the domain, and it is much easier to destroy than to rebuild. Burn your primary and you're not just losing outbound, you're losing the email that keeps the business running, and you cannot buy a new one of those.

Most teams get to this conclusion eventually. They get to it after burning the main domain.

## 2. Set the three records, and understand alignment

Every domain you send from needs SPF, DKIM and DMARC published before it sends a single message. All three providers now require them from anyone sending 5,000 or more a day, and they're checking well below that threshold in practice.

**SPF.** One TXT record on the root domain. For Google Workspace:

```
v=spf1 include:_spf.google.com ~all
```

One SPF record per domain, not three. Multiple SPF records is the single most common misconfiguration I see, and it fails the check entirely rather than merging.

**DKIM.** Generate the key in your provider's admin console at 2048-bit, then publish the TXT record it gives you, usually at `google._domainkey`. Generating it and forgetting to turn on signing afterward is the second most common mistake.

**DMARC.** A TXT record at `_dmarc.yourdomain.com`:

```
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100
```

Start at `p=none`. That publishes a policy and asks for reports without rejecting anything, which is what you want while you find out what's actually sending as you. Read the reports for a few weeks, then move to `p=quarantine`.

The part people miss is alignment. Passing SPF is not enough on its own. DMARC requires that SPF or DKIM both passes and aligns, meaning the domain in the visible From address matches the authenticated domain. A setup that authenticates against your sending tool's domain while showing your name in the From field passes SPF and fails DMARC, which is a confusing way to be invisible.

Roughly a third of bulk senders are still failing at least one of these. It is genuinely worth ten minutes with a free DMARC checker before you blame anything else.

## 3. Warm up, and be patient about it

A domain with no history that starts sending fifty a day looks exactly like a domain somebody bought this morning to spam from. Because it is.

Send nothing at all for the first 24 to 48 hours after setup. Let the records propagate and let the domain age slightly.

Then start at five to ten a day and ramp over two to three weeks. A brand new domain needs two to four weeks minimum before it can carry real volume, and four to eight if you're planning to push hard. An existing domain with positive history can do it in one to two.

There's no shortcut here that works. Warmup tools that generate artificial back and forth help a little with volume ramp, and they cannot manufacture the thing that actually builds reputation, which is real people replying to real mail.

## 4. The per-inbox limits, where almost everyone gets the number wrong

Gmail will tell you the limit is 2,000 messages a day. That number is for normal business email and it is dangerously misleading for cold outbound.

The safe caps are far lower, and the sources genuinely disagree on how low. Some put it at 30 to 50 a day per mailbox including warmup traffic. More conservative testing puts Google Workspace at 18 to 22, private SMTP at 10 to 15, Outlook Premium at 8 to 10, and standard Outlook as low as 3 to 5.

Take the conservative end. Nobody has ever damaged a domain by sending too few.

Which leads to the structural point: you scale by adding inboxes, not by pushing more through each one. Ten mailboxes at twenty a day is a much safer 200 than two mailboxes at a hundred, and it spreads the risk so one bad list doesn't take everything down at once.

Microsoft is meaningfully stricter than Google here. If your outbound is aimed at enterprise buyers on Outlook, plan for the lower numbers.

## 5. Now you can think about the copy

The metric that decides your fate is the spam complaint rate, and Google's guidance is explicit: keep it under 0.10%, and never let it reach 0.30%. That's one complaint in a thousand as the target. Cross it and no amount of authentication saves you.

So the copy question isn't which words trigger filters. Most of the trigger-word folklore is a decade out of date. The question is whether the person receiving this is likely to hit the spam button, and that's a targeting problem far more often than a wording problem.

Two concrete things. Include a real one-click unsubscribe header, which Google, Yahoo and Apple now require and Microsoft recommends. And send to people who plausibly want to hear from you, because a tight list of 200 will outperform a scraped 5,000 on every metric that matters, including the one that keeps your domain alive.

I wrote earlier about [why the volume approach stopped working at all](/blog/cold-email-deliverability-2026/), which is the strategy half of this. This post is the plumbing underneath it.

## Before lunch

Check whether you're sending cold mail from your primary domain. If you are, that's today's job and nothing else on this list matters yet.

Then run your sending domain through any free DMARC checker and see whether all three records pass and align. Ten minutes, and it explains most mysterious deliverability problems.

If you'd like to talk through what your setup is doing, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch. My [notes on lead generation](/expertise/lead-generation/) cover the wider picture.
