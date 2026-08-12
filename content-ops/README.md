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

## Run it by hand

```bash
python3 content-ops/scripts/next_brief.py --slot morning
# write the article per PLAYBOOK.md, then:
python3 content-ops/scripts/lint_article.py src/content/blog/<slug>.md
npm run build
```

## Change what gets written

Edit `queue.json`. Reorder it, rewrite an angle, delete a brief you don't want.
The queue is plain JSON and the order is the editorial priority.

To change the voice, edit `VOICE.md`. To ban another phrase, add it to
`BANNED_PHRASES` in `scripts/lint_article.py`.

## Where the topics came from

`seo/` holds the keyword research this is built on. Start with
`seo/output/strategy-brief.md`.
