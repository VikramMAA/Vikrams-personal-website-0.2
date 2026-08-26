# Publishing run playbook

This is what the scheduled agent does, twice a day, start to finish. It fires at
08:00 IST and 19:00 IST into a fresh session with this repo checked out.

Read `content-ops/VOICE.md` before writing a single word. It is not optional
background, it is the spec.

---

## 1. Set up

```bash
cd <repo root>
git fetch origin <publish_branch> && git checkout <publish_branch> && git pull origin <publish_branch>
```

`publish_branch` is in `content-ops/config.json`. Always pull first. Two runs a
day on a fresh container means the local copy is always stale.

Work out the slot from the current IST time. Before 13:00 IST is `morning`,
after is `evening`.

## 2. Get the brief

```bash
python3 content-ops/scripts/next_brief.py --slot morning
```

It prints one brief plus the last ten published titles and opening patterns.

**Check the `market` field before anything else.** It is `US`, `India` or
`Estonia`, and the script picks it by rotating to whichever market is furthest
behind its weight in `config.json`. That market decides the currency, the
spelling, the cities, the platforms and the examples for the entire post. The
per market rules are in `VOICE.md` and they are not interchangeable.

Most readers are in the US. The queue used to be almost entirely Indian, which
is exactly the mismatch the rotation exists to correct, so do not quietly write
another Indian post because the examples come easier.

`_remaining_by_market` in the output tells you how much runway each market has
left. If one is heading towards zero, refill that market specifically:

```bash
python3 content-ops/scripts/refill_queue.py --market US --count 12 --write
```

Each market reads its own keyword plan (`seo/output/` for India, `seo/us/`,
`seo/estonia/`), so stubs come from that market's real research.

### County posts

Some briefs carry a `city` that is a US or Estonian county, plus a
`_local_specifics` note. Two rules for those.

The title names the county. That is the point of the series.

The article is built around the `_local_specifics`, not around a template. Los
Angeles sprawling across 88 cities, Maricopa's summer HVAC cost per click,
Manhattan's in-house teams, Ida-Viru being Russian speaking. **If the draft
would still make sense with a different county pasted in, it has failed.**
Rewrite the middle until it would not.

Ten near-identical county posts are worth less than one good one and look
exactly like the scaled content Google demoted hardest in March 2026.

**Nobody is watching this run.** There is no human to escalate to and no
approval step anywhere in this playbook. If something is missing, you fix it in
this run and carry on. The only thing that ever justifies not publishing is a
draft that would embarrass Vikram, and the fix for that is rewriting it, not
skipping.

If it exits with `no_usable_brief`, you are refilling the queue yourself, now,
as part of this run:

```bash
python3 content-ops/scripts/refill_queue.py --count 20 --write
```

Then fill in `working_title`, `angle`, `audience` and `tags` on every new stub.
That means, for each one: read `seo/output/strategy-brief.md` for what the
cluster is and who searches it, look at the live SERP for what the top three
results already say, and write an angle around what they all miss. Commit the
queue, then start again at step 2.

Budget about twenty minutes for a refill. It is a normal part of the job, not
an interruption to it.

Refill proactively whenever `_remaining_in_slot` drops below 10, so this never
happens under time pressure with an article still to write.

## 3. Check the topic is still true

Search the web for the primary keyword plus the current year before writing.
Two reasons. Platform facts rot fast, and a post that repeats last year's
Meta ad rules is worse than no post. And if something changed this month, that
change is the article's angle, which makes the post more citable than the
twenty existing pages on the same keyword.

Pull in real specifics. Current CPM direction, a named platform change, an
actual price band, a documented rule. Never invent a statistic. If a number
comes from a source, say where it came from in the prose the way a person
would: "Meta's own reporting puts...", "the agencies publishing benchmarks this
year are seeing...".

## 4. Write the title

**Write the title as the thing somebody types into a search box.**

This changed in August 2026 and it reverses the old advice on this page. The
clever, opinionated headline reads well to another marketer and is invisible to
the business owner who is searching "how do I use whatsapp for marketing" at
eleven at night. We are optimising for the second person now.

Rules:

- **Lead with the query.** The first few words should be the phrase people type.
  Question form is good and often best: "How do I...", "How much does...",
  "What is the best way to...", "Do I need...".
- 6 to 14 words. A search-shaped title is usually shorter than a clever one.
- The primary keyword goes in near-verbatim, not as a "close natural variant".
  If the keyword is awkward English, use the natural phrasing a person would
  actually type rather than the keyword tool's version.
- Plain beats clever. If you have to choose between sounding smart and matching
  the search, match the search.
- Still banned: "The Ultimate Guide to", "Everything You Need to Know",
  "A Complete Guide to", "X 101". Those are filler and say nothing.
- Numbered and comparison titles are now allowed and wanted. "10 best X",
  "X vs Y", "Is X worth it" are all real search shapes.
- Colons are fine now when they separate the query from the promise.

Good, for the shape of it:

> How do I use WhatsApp for marketing in India?
> How much should a small business spend on digital marketing?
> 10 best digital marketing agencies in 2026, and when to hire a consultant instead
> Is SEO worth it for a small business?
> How do I get more customers online without paying for ads?

Bad, and these are all titles this site published before the change:

> Impressions only ever go up. That's exactly why they're still in your report
> Most traffic drops are not algorithm updates. Rewriting in week one makes it worse
> Estonia builds the better product and keeps losing to the better distributed one

Those are decent writing and nobody searches for any of them.

The opinion does not go in the title any more. It goes in the first paragraph,
where it still does its job, and the title's job is to get the person there.

The `working_title` in the brief is a starting point. Sharpen it towards the
search phrase. If the research in step 3 turned up the way people actually
phrase it, use that instead.

### Comparison and "best of" posts

These are wanted now. "10 best digital marketing agencies", "Shopify vs
WooCommerce", "is Practo worth it". They are high intent, they are what buyers
search at the moment they are deciding, and this site has nothing in that shape.

Four rules, and they are not negotiable because this format is where blogs
usually start lying.

**Say what the ranking is based on, in the post.** A list with no stated
criteria is a fabrication with numbers on it. If the basis is "these are the
firms that show up most in Indian SME shortlists", say that. Never imply you
tested or audited companies you have not.

**Never rubbish a named company.** This is already in VOICE.md and it matters
most here. Describe named firms factually and fairly, including what they are
genuinely good at. Criticise the *model*, the *pricing structure*, the
*practice*. Never the named business.

**The critique goes on the structure, and it has to be true.** The percentage
of ad spend argument is the strongest one available and it is well documented:
an agency paid a percentage of your media budget earns more when you spend more,
regardless of whether the spend produced anything. It punishes efficiency,
because getting the same result on a smaller budget cuts their fee. It also
removes any incentive to flag wasted placements or fraudulent traffic, since
they are paid on volume. Be fair while making it: plenty of good agencies moved
to flat retainers precisely to remove this conflict, and saying so makes the
argument stronger rather than weaker.

**Do not turn it into a pitch.** The no-selling rule in step 5 applies here with
extra force. A post that lists ten agencies and then suggests hiring a
consultant is an advert unless it is honest about when an agency is the right
answer. It often is: multiple channels at once, coverage so a holiday does not
stop the work, production volume, procurement that will not onboard an
individual. Say that plainly, in the post.

Set `seoTitle` separately when the catchy title does not lead with the keyword.
`seoTitle` is what shows in the tab and the SERP, so it should be keyword led
and under 60 characters. The `title` is what a human reads on the page.

## 5. Write the post

Follow `VOICE.md`. The parts that get skipped most often, so check them:

- No em dashes. Not one.
- The actual answer inside the first 150 words.
- Paragraph lengths vary. Some one line, some six.
- The brief's market, all the way through. Currency, spelling and examples all
  match it, and none of them wander into another market halfway down.
- Something concrete in the middle. A checklist, a script, a real number.
- Do not reuse an opening pattern from the last ten posts. The script prints
  them for exactly this reason.

Link to two or three existing pages on the site, naturally, in the prose. At
least one should be the `expertise_link` from the brief. Check the link target
exists first, either in `src/pages/` or `src/content/blog/`. A broken internal
link on a static site is a build-time nothing and a reader-facing embarrassment.

**Never sell anything in the close.** This site is a personal blog and
portfolio. Vikram works full time under contract and does not take outside work,
so no post may offer a service, an audit, a retainer, a package or a price, and
none may imply he is available for hire. If the post ends on a call to action,
it is the same one the rest of the site uses: if you'd like to know how your GTM
or digital marketing issue could be solved, get in touch by email, WhatsApp,
phone or LinkedIn and we can have a quick chat about it. Link to `/contact/` for
that, and to a `/expertise/` page for the longer explanation.

## 6. Save it

Filename: the slug, lowercase, hyphens, no date prefix. It becomes the URL at
`/blog/<slug>/`, so make it short and keyword led rather than a copy of the
full title.

Frontmatter, matching `src/content.config.ts` exactly:

```markdown
---
title: "The catchy human title"
seoTitle: "Keyword Led Title Under 60 Chars"
description: "One sentence, under 158 characters, that answers the query and would read well as a search result."
publishedAt: 2026-08-12
published: true
tags: ["Tag One", "Tag Two", "Tag Three"]
---
```

Use the real current date for `publishedAt`. Quote every string, several titles
will contain colons or apostrophes and unquoted YAML will break the build.
`heroImage` is optional, leave it out rather than pointing at an image that does
not exist in `public/images/`.

## 7. Check it

```bash
python3 content-ops/scripts/lint_article.py src/content/blog/<slug>.md
npm run build
```

The linter exiting non-zero means do not publish. Fix and run it again. The
build must pass with no errors. A broken build means Netlify serves the last
good deploy and the article silently never appears, which is worse than a bad
article because nobody notices.

Read the draft once more before committing. The linter catches stock phrases,
it cannot catch boring. If the post says nothing a reader could not have
guessed, rewrite the middle section with something specific from step 3.

## 8. Publish

```bash
git add src/content/blog/<slug>.md content-ops/published.json
git commit -m "Add article: <title>"
git push -u origin <publish_branch>
```

Retry a failed push up to four times with 2s, 4s, 8s, 16s backoff before giving
up. Netlify builds from `publish_branch` and the post is live in a few minutes.

## 9. Log it

Append to `content-ops/published.json` in the same commit:

```json
{
  "brief_id": "b-001",
  "slug": "google-business-profile-settings-bengaluru",
  "title": "The Google Business Profile settings most Bengaluru businesses never touch",
  "primary_keyword": "google business profile optimisation india",
  "market": "India",
  "city": "Bengaluru",
  "tags": ["Local SEO", "Google Business Profile", "Bengaluru"],
  "slot": "morning",
  "published_at": "2026-08-12",
  "opening_pattern": "scenario — owner checking their own listing on a phone",
  "word_count": 1180
}
```

`opening_pattern` matters more than it looks. It is the only thing stopping the
fortieth post from opening exactly like the fourth.

`market` is not optional either. The rotation in `next_brief.py` reads it back
out of this file to work out who is owed the next post, so a missing one makes
the next run think that market never ran.

## 10. Report

One short message: the title, the live URL, the primary keyword, and how many
briefs are left in that slot. If the queue is running low, say so.

---

## When something goes wrong

**Build fails.** Fix it. Almost always unquoted YAML or a bad date. Do not
push a broken build.

**Linter keeps failing on the same phrase.** The phrase is in `BANNED_PHRASES`
for a reason. Rewrite the sentence, do not edit the linter.

**Refill produces nothing useful, because the keyword plan is exhausted.**
Regenerate the plan in this run rather than skipping. Add new seed terms to
`seo/corpus/seeds.txt` and new harvested terms to `seo/corpus/harvest.txt`
[pull them from autocomplete, People Also Ask and related searches on the
existing head terms], then re-run the pipeline:

```bash
cd seo
S=/root/.claude/skills/synced/keyword-research/scripts
python3 $S/cluster_keywords.py --input corpus/harvest.txt corpus/geo.txt \
    --seeds corpus/seeds.txt --locations corpus/locations.txt --out work/clusters.json
python3 scripts/make_overrides.py --scored work/scored.json --out work/overrides.json
python3 $S/score_keywords.py --clusters work/clusters.json --serp work/serp.json \
    --overrides work/overrides.json --out work/scored.json
python3 $S/export_kwr.py --scored work/scored.json --site work/site.json \
    --site-inventory work/site_inventory.json --local work/local.json \
    --meta work/meta.json --outdir output/
```

Then refill and carry on. Commit the regenerated plan with the article.

**Merge conflict on published.json.** Two runs overlapped. Take both entries,
keep them in date order, and carry on.

**Nothing newsworthy found in step 3.** That is fine, not every post needs a
news hook. Fall back on the angle in the brief and make it concrete with
experience rather than with a headline.
