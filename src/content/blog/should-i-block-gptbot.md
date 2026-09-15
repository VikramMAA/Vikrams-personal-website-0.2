---
title: "Should I block AI crawlers like GPTBot?"
seoTitle: "Should I Block GPTBot? What to Allow in 2026"
description: "Block or allow is the wrong question, because AI crawler means three different jobs. What the crawl to referral ratios justify, and why llms.txt does nothing."
publishedAt: 2026-09-15
published: true
tags: ["AI Search", "SEO", "Strategy"]
---

Start with the exchange rate, because that is what this argument is really about.

Published crawl to referral ratios put OpenAI's GPTBot somewhere between roughly 217 and 1,091 pages taken for every visitor sent. Anthropic's ClaudeBot has been measured at 2,237 to 1 in one dataset and around 38,000 to 1 in Cloudflare's July 2026 figures. Mistral's crawler sits near 3,389 to 1.

Those ranges are wide because the measurement windows differ and the crawlers changed behavior during the period. Treat them as orders of magnitude rather than precise prices. The direction is not in dispute.

So this is not a moral question about whether machines should read your writing. It is a pricing question, and the honest answer is that at those ratios you are not being paid in traffic.

Which makes blocking look obvious. It is not, and the reason is that the question is malformed.

## An AI crawler is three different jobs

Lumping them together is what produces bad decisions in both directions.

**Training crawlers** take your content to build a model. Nothing comes back today. Whatever value exists is a bet on being represented inside a future model's weights, which you cannot verify, measure or price.

**Search and answering crawlers** fetch your page because somebody asked a question right now, and they can cite you in the answer. This is the one that produces the citation, the brand mention and occasionally the click.

**Agents** fetch on behalf of a specific user who asked for something. An agent pulling your pricing page because somebody said "find me a supplier who does this" is not a scraper. It is a prospect with an intermediary.

Those three deserve different answers, and until recently robots.txt made that awkward because the same company often ran all three under different user agents. I went through [which OpenAI crawler does what](/blog/how-to-rank-in-chatgpt/) separately, and the distinction is the whole game.

## The market has already converged

This stopped being a matter of opinion in the last year.

Cloudflare made AI crawler blocking the default for new domains from July 2025, and reported blocking 416 billion scraping requests in the five months to early December. This month it went further, splitting its defaults across the three categories: training and agent traffic blocked by default for new domains on ad displaying pages, while search stays allowed.

Analyses of robots.txt across large networks show the same pattern emerging from publishers independently: block the training bots, allow the answering bots.

That is the answer, and it is the one I would give almost every business reading this.

**Block what takes without returning. Allow what can cite you. Watch the agents, because that category is new and is where the next few years of traffic actually lives.**

## A reality check on how many people are doing this

Worth knowing before you assume you are behind.

GPTBot is the most blocked AI crawler on the open web, and it appears in about 5.5% of disallow rules. CCBot is near 5.1% and ClaudeBot near 4.9%.

Five percent. The impression that everybody is pulling up the drawbridge comes from publisher trade press, because publishers have a genuine and different problem. The overwhelming majority of ordinary business websites have made no decision at all, which is itself a decision.

## Who should actually block everything

Be fair to the other side, because for some businesses the blanket block is correct.

If your content is the product, blocking is not principle, it is commercial sense. News, research, data, paid archives, anything where somebody would otherwise buy access. Giving that away to be summarized is your business model failing quietly.

If you are a small service business, a clinic, a manufacturer or a local firm, your content is not the product. It is advertising for the product. Blocking the crawler that could recommend you to somebody asking "who does this near me" is paying a price to protect an asset you were giving away on purpose.

That is the whole argument, and the answer genuinely depends on which of those you are.

## While we are here, llms.txt does nothing

This comes up in every conversation on this topic, so let me give you the evidence rather than an opinion.

Adoption is real: roughly 8.7% of the top thousand websites publish one, with wider studies around 10%.

Usage is not. Analysis across hundreds of thousands of domains found about 97% of llms.txt files were never fetched at all, with no measurable citation effect. Monitoring of more than 500 million AI bot events found only a few hundred requests to /llms.txt, while GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and Google-Extended overwhelmingly crawled ordinary HTML instead.

Google updated its documentation in June 2026 to say the file has no effect, positive or negative, on Search or AI Overviews, and John Mueller compared it to the keywords meta tag.

It costs an hour and produces nothing. Spend the hour on the HTML those crawlers actually read, which mostly means putting the answer near the top of the page and keeping the important pages [shallow in your link structure](/blog/internal-linking-strategy/).

I would rather tell you that than let you tick a box that feels like progress.

## How to find out what the assistants currently say about you

The part everybody skips, and it takes twenty minutes.

Ask them. Open ChatGPT, Claude, Perplexity and Google's AI mode in clean sessions, logged out where you can, and ask the three questions your buyers ask. Who are the best providers of X in Y. What should I look for when choosing X. Is [your company] any good.

Do it a few times, because the answers vary between runs and a single result tells you nothing. Note whether you appear, what they say, what they get wrong, and crucially whose site they cite instead of yours.

Then check your server logs for OAI-SearchBot, PerplexityBot and the other answering agents. If they are not fetching you at all, you have a crawl problem rather than a content problem, and those have different fixes.

What changes the answer is not your website alone. It is what exists about you elsewhere: directories, comparison pages, forums, other people's roundups. Assistants assemble from the consensus they can find, which is why a company with a beautiful website and no third party footprint gets left out of answers it should win.

## Where I come out

Block the training crawlers if you want. It costs you nothing you can measure, and the ratio above says you are not being paid.

Do not block the answering crawlers unless you sell access to your content. That block buys you nothing and removes you from the surface that is steadily replacing the one you already lost clicks on.

Leave the agents alone and watch them, because a machine arriving to read your pricing on somebody's behalf is the closest thing to inbound demand in this entire discussion.

And do the twenty minute check this week, because the odds are you have never actually looked at what these systems tell people about your business, and somebody is reading it today.

My [notes on AI search](/expertise/aiseo/) cover what earns a citation once you have decided to be readable. If you'd like to think through your own position, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
