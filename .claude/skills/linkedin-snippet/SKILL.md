---
name: linkedin-snippet
description: Turn a published vikramhere.com article into ready-to-post LinkedIn copy that showcases expertise and pulls engagement, while never signalling that Vikram is available for work. Use this whenever the ask involves LinkedIn, a LinkedIn post, promoting or repurposing an article, "what should I post today", social copy for a blog post, or a snippet, hook, caption or teaser for something published on the site. Use it right after an article is published, and any time a blog post, newsletter or long-form piece needs to become short social copy.
---

# LinkedIn snippets from published articles

The site publishes twice a day. This turns one of those articles into a LinkedIn
post that does two jobs at once: it makes Vikram visibly good at this, and it
earns comments from people who actually work in it.

Output goes in the chat, ready to copy. Nothing is posted anywhere.

## The rule that outranks every other rule

**Nothing in the post may read as availability for work.**

Vikram is employed full time under contract. His employer sees this feed. A post
that reads like a pitch, a soft pitch, or a person quietly opening a door is a
problem at work, and it is a problem that no amount of engagement pays for.

So the post never says or implies: open to work, available, taking clients, DM
me, book a call, let's connect and discuss, happy to help if you need it, reach
out, I help [audience] do [outcome], my clients, my practice, work with me. No
job-seeking hashtags. No "currently exploring". Nothing that turns a reader into
a lead.

This is not a limitation on the post, it is the reason the post works. Credibility
on LinkedIn comes from someone who clearly has nothing to sell you. The move is to
give away the good part for free and let that be the whole point.

`scripts/lint_snippet.py` checks this mechanically. Run it. Do not skip it because
the draft "obviously" doesn't pitch.

Two related things to keep out: never say anything critical of a current or past
employer, and never put a client name, client number or account detail in a post
unless it is already in the published article.

## 1. Pick the article

If the user named one, use it. Otherwise:

```bash
python3 -c "import json;p=json.load(open('content-ops/published.json'))['posts'];[print(x['published_at'],x['market'],x['slot'],x['slug'],'|',x['title']) for x in p[-6:]]"
```

Articles live in `src/content/blog/<slug>.md` and go live at
`https://vikramhere.com/blog/<slug>/`. Read the whole article, not the
frontmatter. The post is built out of the strongest thing inside it.

**One LinkedIn post a day, maximum.** The site publishes twice, the feed does not
want twice. Take the stronger of the two and say so, and note the other one as
tomorrow's if it stands up on its own.

**Not every article earns a post.** If it has no number, no mechanism and no
claim anybody could disagree with, say that plainly and offer the one angle that
could work rather than manufacturing three variants of nothing. A run of flat
posts costs more reach than a skipped day.

## 2. Find the load-bearing thing

Read the article looking for exactly one of these, and make the post about it:

- A number that changes how the reader sees their own spend. `$3,000 a month at a
  blended $150 an hour is twenty hours.`
- A mechanism. Why the thing happens, not that it happens. Mechanism is what makes
  someone save a post.
- A claim the reader's agency, boss or vendor would argue with, that is defensible
  and true.
- A scene that a specific person recognises as their own week.

If you find four of them, the post still only gets one. A post carrying four
points gives a reader nothing to grip and gets no comments. The other three are
next month's posts.

## 3. What actually gets traction

**Give away the answer.** The single most common way these posts die is being a
teaser. If the reader has to click to get the point, most of them don't, the post
gets no dwell time and no comments, and the article gets less traffic than it
would have from a post that told the truth up front. The article is the depth.
The post is a complete, useful thing on its own.

**The first two lines are the whole battle.** Roughly the first 200 characters
show before LinkedIn cuts to "see more". A hook that needs the third line to make
sense has already lost. Lead with the answer, the number, or the scene. Never open
with the question the post is about, and never open with throat clearing about
what a great week it's been.

**Ask a question only a practitioner can answer.** "Thoughts?" gets nothing.
Naming the reader's exact situation gets replies: "If you're on percentage of ad
spend, what did they say when you asked for a flat fee instead?" Cheap to answer,
specific, and slightly loaded.

**Answer every comment in the first hour.** Reach follows replies more reliably
than anything in the copy. Give the user two or three reply openers so this is
easy rather than a chore.

**Length.** 900 to 1,600 characters is where a text post reads substantial without
being a wall. The hard cap is 3,000.

**Formatting.** Short paragraphs with a blank line between them. Not every line a
one-liner, which is its own tell. One list per post at most, three to five items,
plain text bullets, no emoji bullets.

**Emoji.** Zero is correct most days. Two is the ceiling.

**Hashtags.** Three to five, topical, at the end. Never one that signals job
hunting.

**The link goes in the first comment.** Practitioners disagree about whether
outbound links cost reach and LinkedIn says less than it used to, but the first
comment costs nothing and reads fine either way. A plain closing line like "Full
breakdown in the comments." is enough. Do not write "link below 👇".

**Carry the article's market.** Posts come from US, India or Estonia articles and
the currency, spelling and examples have to stay inside that one market, same as
the article. Name the market in the first two lines when the post quotes money, so
a reader outside it knows why the numbers look like that rather than bouncing.

## 4. Voice

Read `content-ops/VOICE.md` if it exists. Same voice as the site, same hard rules:
no em dashes anywhere, none of the banned phrases, never "it's not just X, it's
Y", contractions throughout, second person, bracketed asides instead of dashes,
bold on one line at most.

LinkedIn adds its own tells on top. Keep these out: "Here's the thing:", "Let that
sink in", "Read that again", "I'll wait", "Unpopular opinion:", "Hot take:",
"The result?", "Agree?", and the fake-vulnerable personal story that turns into a
business lesson in the last line.

## 5. Draft three variants

Use three different hook archetypes so the user has a real choice rather than three
paraphrases. `references/formats.md` has the archetypes with worked examples from
this site's articles, plus the anti-patterns. Read it before drafting.

Vary the archetype from what was posted recently. `content-ops/linkedin-log.json`
records what shape went out and when, and repeating the same opening three days
running is what makes a feed look automated.

## 6. Lint before showing anything

```bash
python3 .claude/skills/linkedin-snippet/scripts/lint_snippet.py /path/to/draft1.txt /path/to/draft2.txt
```

Write drafts to the scratchpad, lint, fix, lint again. `FAIL` means rewrite, and
the availability checks in particular are not negotiable. Delete the scratch files
after. The linter catches characters and phrases. It cannot catch a post that says
nothing, so read each variant once more and ask whether a person who does this work
would stop scrolling.

## 7. Output format

Print in the chat, exactly this shape:

```
## <article title>
<live url> · <market> · published <date>

<one line on what the post is built around, or why this article is thin>

### 1 · <archetype name>
[fenced block: the full post text, hashtags included]
1,180 chars · hook lands at 186 · clean

### 2 · <archetype name>
[fenced block]
...

### 3 · <archetype name>
[fenced block]
...

**Pick:** <which one and why, one sentence>

### First comment
[fenced block: link plus one line of extra context that isn't in the post]

### If it gets comments
- <reply opener>
- <reply opener>
```

Every post goes in its own fenced block so the line breaks survive the copy. The
character count and hook position go under each one, because both are decisions the
user may want to overrule.

## 8. Log it when the user says which one went out

Only after they tell you. Append to `content-ops/linkedin-log.json`:

```json
{"slug": "how-much-does-a-digital-marketing-agency-cost", "posted_at": "2026-08-27", "archetype": "the arithmetic", "hook": "Between $1,500 and $10,000 a month.", "variant": 1}
```

That file is the only thing stopping the fortieth post from opening like the fourth.
