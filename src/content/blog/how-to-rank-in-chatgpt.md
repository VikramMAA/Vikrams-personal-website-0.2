---
title: "How to get quoted by ChatGPT, starting with the robots.txt line you missed"
seoTitle: "How to Rank in ChatGPT and Get Cited in AI Answers"
description: "Allowing GPTBot is not what makes ChatGPT cite you. Here is the crawler that does, how to test whether you are being quoted, and what to fix this week."
publishedAt: 2026-08-20
published: true
tags: ["AI Search", "SEO", "ChatGPT"]
---

India has about 100 million people opening ChatGPT every week. Sam Altman said so in February and TechCrunch ran the number the same day, which makes India OpenAI's second biggest market after the US.

A chunk of those people are asking buying questions. Which CA can handle a startup's filings in Andheri. Which gym in HSR does personal training that isn't a scam. Which agency actually knows performance marketing for a D2C brand doing Rs 40 lakh a month.

Somebody gets named in those answers. It is probably not you, and the reason is usually smaller and stupider than you'd expect.

So here's the answer before the rest of the post. Three things decide whether a model quotes your business: whether the right crawler can read your site, whether your pages answer the question in the opening sentence, and whether anybody other than you says you exist. Most sites I look at fail the first one by accident. They allowed GPTBot in 2024, saw a tick in some audit tool, and stopped thinking about it.

GPTBot is not the crawler that cites you.

## OpenAI runs three crawlers and they do different jobs

This is the bit that trips people up, so it's worth being precise about.

**GPTBot** collects pages to train future models. **OAI-SearchBot** is the one that indexes the web for ChatGPT's search feature, and it is what makes you eligible to turn up as a cited source in an answer. **ChatGPT-User** fetches a page live, at the moment somebody's question needs it.

Three separate user agents, three separate decisions, controlled independently in robots.txt.

**If OAI-SearchBot can't reach your site, you are not in ChatGPT's search index, and it doesn't matter how well you rank on Google.**

Which means you can refuse to be training data and still be quoted. Plenty of publishers made exactly that choice, and it's a perfectly reasonable one. What isn't reasonable is blocking everything with an AI-sounding name in a fit of pique in 2023 and never revisiting it, which is roughly what half the sites I audit did.

Here is the block. Paste it into `public/robots.txt` or wherever your site serves that file from.

```
# Assistants that can cite the site in answers
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

# Training crawler. Delete this block if you don't want to be trained on.
User-agent: GPTBot
Allow: /
```

Now the part that catches people who did everything above correctly.

Your robots.txt can say Allow all day and your CDN can still be turning these crawlers away at the door. Cloudflare shipped a one click block for AI scrapers and switched it on by default for new domains in 2025. A lot of Indian businesses are on Cloudflare's free plan because their developer set it up that way three years ago and nobody has opened that dashboard since.

Go and look at the bot settings. Then go and look at your WAF rules. I've found sites politely inviting crawlers in robots.txt while a firewall rule 403s every one of them.

## Ten minutes to find out if you're invisible

Don't guess at this. Test it, this morning, before you change anything, so you have a before.

Write down eight questions your buyers actually ask. Not your brand name. Searching your own brand name proves nothing, because the model will find you and you'll feel great and learn nothing. You want the questions somebody asks when they don't know you exist yet.

"Best digital marketing consultant for a small business in Bengaluru." "Who can set up Google Ads for a D2C brand in India." That shape.

Run all eight in ChatGPT, Perplexity and Gemini. For each one write down three things: were you named, were you linked, and who was named instead. That last column is the useful one. It tells you which competitors the models already trust, and those sites are your reference set for everything that follows.

Then check your logs, if you're on a VPS:

```
grep -Ei "OAI-SearchBot|ChatGPT-User|PerplexityBot|Claude" /var/log/nginx/access.log | wc -l
```

Zero is a finding. It means the crawlers aren't reaching you and nothing else you do this quarter matters until that changes.

One warning about measurement. **Referral traffic from chatgpt.com badly undercounts your AI visibility, because being mentioned and being linked are two different events.** The citation trackers publishing data this year put brand mentions at roughly three times the rate of actual clickable citations. You get talked about far more often than you get linked, and nobody, NOBODY, sends you an email to say you were left out of an answer. Which is why the manual test above beats staring at GA4.

## The thing that decides this isn't on your website

You can do every technical fix in this post and still not get named. Here's why.

Why does a Justdial listing move a language model at all?

Because corroboration is the only tool it has. It can't verify that your company is real or good. What it can do is count how many independent places say the same thing about you, and weight you accordingly. The studies looking at tens of thousands of brands this year keep landing on the same finding: branded mentions on sites you don't own are the strongest single predictor of turning up in AI answers.

That's an uncomfortable finding for anyone who has spent two years polishing their own website.

For an Indian business the practical version looks like this:

1. Claim and finish your Justdial, IndiaMART and Sulekha listings, with the name, address and phone number character for character identical to your site. Inconsistent NAP data doesn't just confuse Google, it gives a model two competing versions of you and a reason to trust neither.
2. Earn one real trade or local press mention a quarter. Not a paid listicle. An actual quote in something a journalist wrote.
3. Get the founder posting on LinkedIn, weekly, saying something specific enough to be wrong about. LinkedIn has climbed hard as a cited source over the last year.
4. Answer questions where your buyers already ask them, under your real name, without a pitch attached. Reddit is the single most cited domain across every major assistant, by a distance.

Do not read point four as permission to astroturf. There's a cottage industry right now selling "AI visibility packages" that are just Reddit spam with an invoice attached, and it burns the account, the subreddit and eventually the brand. The practice is rubbish. Plenty of the people selling it know that.

## Write so a machine can lift the sentence

Short section, because I've written about the on-page side of this in more detail in [SEO for AI search](/blog/seo-for-ai-search/) and there's no sense repeating it here.

The one rule that carries most of the weight: state the answer in the first sentence of the section, then explain it. A model is looking for a passage it can quote and attribute. "SEO timelines vary depending on your industry and competition" cannot be quoted, because it doesn't say anything. "Technical fixes usually show movement in four to eight weeks, content and links take four to six months" can.

Read your own service pages with that test. Most of them open with a paragraph of throat clearing before the first fact appears, and the model has no reason to reach past it.

## Before lunch

Open robots.txt, confirm OAI-SearchBot is allowed, then open your CDN dashboard and confirm nothing is blocking it at the edge. That's fifteen minutes and it's the difference between eligible and invisible.

Then run the eight questions and write down who the models name instead of you. Sit with that list. It's the most honest competitive research you'll do this year, and it costs nothing.

If you want the longer version of how I'd approach it, that's what my [SEO notes](/topics/seo/) are for. And if you'd like to talk through what you're selling and whether the models have heard of you, [email me or say hello on LinkedIn](/contact/). Happy to have a quick chat.
