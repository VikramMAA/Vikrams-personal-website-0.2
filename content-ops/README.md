# content-ops

The twice-daily article engine. Two scheduled runs, 08:00 and 19:00 IST, each
publish one article to vikramhere.com.

| File | What it is |
| --- | --- |
| `VOICE.md` | How Vikram writes. The spec every draft is checked against. Read it first. |
| `PLAYBOOK.md` | The exact run procedure, step 1 to step 10. This is what the scheduled agent follows. |
| `queue.json` | The editorial queue. 60 hand-written briefs, ordered by priority. |
| `published.json` | Log of everything published. Drives de-duplication and topic spacing. |
| `config.json` | Publish branch, word counts, slot definitions. |
| `scripts/next_brief.py` | Picks the brief for this run. Handles slot matching, de-dupe, city and tag spacing. |
| `scripts/lint_article.py` | Blocks em dashes, stock AI phrases and uniform paragraph rhythm. Exit 1 means do not publish. |
| `scripts/refill_queue.py` | Tops the queue up from `seo/output/keyword-plan.json` when it runs low. |
| `linkedin-log.json` | What went out on LinkedIn and in what shape. Keeps the posts from all opening the same way. |

## Run it by hand

```bash
python3 content-ops/scripts/next_brief.py --slot morning
# write the article per PLAYBOOK.md, then:
python3 content-ops/scripts/lint_article.py src/content/blog/<slug>.md
npm run build
```

## Posting it to LinkedIn

Publishing does not touch LinkedIn. That part is manual and stays manual, because
the feed is read at work and every post gets a human look first.

A third Routine, **LinkedIn snippet 09:30 IST**, fires daily between the two
publishing runs. It takes the last two published articles [yesterday evening's
and this morning's], picks the stronger, drafts three posts in different shapes,
checks them, prints them in the chat, rebuilds the Copy Desk editing page and
sends a push notification. It never posts anything. Its one hard rule is that
nothing may read as availability for work.

You can also just ask for a snippet in any session with this repo checked out.

Skill lives in `.claude/skills/linkedin-snippet/`. The career-safety and voice
checks are enforced by `scripts/lint_snippet.py` in there, which reads its banned
phrase list straight out of `scripts/lint_article.py` so the two stay in sync.
`scripts/seed_desk.py` builds the Copy Desk page from `assets/copy-desk.html`,
which carries the same rules again in JavaScript so they run as Vikram types.

## Change what gets written

Edit `queue.json`. Reorder it, rewrite an angle, delete a brief you don't want.
The queue is plain JSON and the order is the editorial priority.

To change the voice, edit `VOICE.md`. To ban another phrase, add it to
`BANNED_PHRASES` in `scripts/lint_article.py`.

## Where the topics came from

`seo/` holds the keyword research this is built on. Start with
`seo/output/strategy-brief.md`.

## What actually runs this

Two Claude Routines, firing into one long-lived session that has the repo
checked out on `main`:

| Routine | Fires | Slot |
| --- | --- | --- |
| Morning article 08:02 IST | `32 2 * * *` UTC | practical, tactical |
| Evening article 18:58 IST | `28 13 * * *` UTC | opinion, analysis, story |

Both run on the Claude subscription, so there is no API bill and no token to
rotate. The session they fire into is titled "vikramhere.com article engine".

### Why it is built this way

The first attempt used Routines that spawned a fresh session per firing. That
failed twice over and published nothing for five days. Worth knowing, because
both traps are easy to fall back into:

1. **The cron was silently dropped.** The scheduling parameter is
   `cron_expression`. Passing `cron` is accepted without an error and the
   Routine simply never gets a fire time. A Routine with
   `next_run_at: 0001-01-01T00:00:00Z` is not scheduled, whatever `enabled`
   says. Check that field after creating one.
2. **Fresh-session Routines get no repository.** There is no source parameter
   on trigger creation, so the fired session woke up with no checkout, no
   credentials and no way to get either. Binding to a persistent session that
   was created *with* `source_url` is what fixes it.

### Fallback

`.github/workflows/daily-article.yml` does the same job on GitHub's scheduler.
Its cron lines are commented out on purpose, so it currently only runs from
Actions → Daily article → Run workflow.

To switch to it: disable both Routines, add a `CLAUDE_CODE_OAUTH_TOKEN` secret
(from `claude setup-token`, subscription-backed, 12 month life), then uncomment
the two cron lines. Do not run both systems at once or you get two articles per
slot.
