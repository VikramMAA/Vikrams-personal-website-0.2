#!/usr/bin/env python3
"""Pick the brief to write for this run.

Rules, in order:

1. Only briefs whose slot matches this run are eligible. Morning runs get the
   practical tactical pieces, evening runs get opinion, story and analysis.
   A reader who lands on the site twice in a day should not get two of the
   same shape of article.
2. Anything already in published.json is out.
3. Do not repeat a city inside three runs, or a tag inside two runs. Publishing
   four Bengaluru local SEO posts back to back is how a blog starts looking
   automated.
4. Among what survives, take the earliest one in the queue. The queue order is
   the editorial priority.

If nothing survives the city and tag spacing, the spacing is relaxed rather
than skipping the run. Publishing something slightly repetitive beats
publishing nothing.

Usage:
  python3 next_brief.py --slot morning
  python3 next_brief.py --slot evening --queue ../queue.json
"""
import argparse
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_QUEUE = os.path.join(HERE, "..", "queue.json")
DEFAULT_PUBLISHED = os.path.join(HERE, "..", "published.json")

CITY_SPACING = 3
TAG_SPACING = 2


def load(path, fallback):
    if not os.path.exists(path):
        return fallback
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slot", required=True, choices=["morning", "evening"])
    ap.add_argument("--queue", default=DEFAULT_QUEUE)
    ap.add_argument("--published", default=DEFAULT_PUBLISHED)
    args = ap.parse_args()

    queue = load(args.queue, {"briefs": []})["briefs"]
    published = load(args.published, {"posts": []})["posts"]

    done = {p["brief_id"] for p in published if p.get("brief_id")}
    recent = published[-CITY_SPACING:]
    recent_cities = {p.get("city") for p in recent if p.get("city")}
    recent_tags = set()
    for p in published[-TAG_SPACING:]:
        recent_tags.update(p.get("tags") or [])

    eligible = [b for b in queue
                if b["slot"] == args.slot and b["id"] not in done]

    # A stub straight out of refill_queue.py is a keyword, not a brief. Handing
    # one to the writer produces the interchangeable agency post this system
    # exists to avoid, so refuse it and say what to do instead.
    unfilled = [b for b in eligible if "NEEDS_ANGLE" in
                (b.get("angle", ""), b.get("working_title", ""), b.get("audience", ""))]
    eligible = [b for b in eligible if b not in unfilled]

    if not eligible:
        print(json.dumps({
            "error": "no_usable_brief",
            "slot": args.slot,
            "unfilled_stubs": len(unfilled),
            "message": (
                "No ready brief for this slot. "
                + (f"{len(unfilled)} stub(s) are waiting on an angle: fill them in now, "
                   "commit the queue, and run this again."
                   if unfilled else
                   "Queue is empty. Run refill_queue.py --write, fill in the stubs, "
                   "commit, and run this again.")
            ),
            "remaining_total": len([b for b in queue if b["id"] not in done]),
        }, indent=2))
        raise SystemExit(2)

    spaced = [b for b in eligible
              if b.get("city") not in recent_cities
              and not (set(b.get("tags") or []) & recent_tags)]

    pick = (spaced or eligible)[0]
    pick = dict(pick)
    pick["_spacing_relaxed"] = not spaced
    pick["_remaining_in_slot"] = len(eligible) - 1
    pick["_recent_titles"] = [p.get("title") for p in published[-10:]]
    pick["_recent_openings"] = [p.get("opening_pattern") for p in published[-10:]
                                if p.get("opening_pattern")]
    print(json.dumps(pick, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
