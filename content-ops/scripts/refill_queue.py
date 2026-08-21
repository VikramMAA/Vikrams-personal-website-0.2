#!/usr/bin/env python3
"""Top the editorial queue back up from the keyword plan.

This picks the next best unused clusters out of seo/output/keyword-plan.json,
filters out anything already written or queued, and emits stub briefs.

The stubs come out with NEEDS_ANGLE in the working_title, angle and audience
fields. Those are not a request for a human. They are the writing agent's job,
done in the same run, before the brief is used. A keyword string on its own is
not a brief, and handing one straight to the writer produces exactly the
interchangeable agency post this whole system exists to avoid.

To fill a stub: read seo/output/strategy-brief.md for what the cluster is and
who searches it, check the live SERP for what the top three results already
say, and write the angle around what they miss. Then write a working_title
following the title rules in PLAYBOOK.md step 4.

Usage:
  python3 refill_queue.py --count 20
  python3 refill_queue.py --count 20 --slot evening --write
"""
import argparse
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
QUEUE = os.path.join(HERE, "..", "queue.json")
PUBLISHED = os.path.join(HERE, "..", "published.json")
PLAN = os.path.join(HERE, "..", "..", "seo", "output", "keyword-plan.json")

# Evening slots take the pieces with a point of view in them. Morning slots take
# the ones someone can act on before lunch.
EVENING_SIGNALS = ("vs", "worth it", "why", "should i", "better", "mistake",
                   "wrong", "not working", "still work", "future", "trend",
                   "cost", "price", "choose", "instead")

EXPERTISE_BY_TERM = [
    (("chatgpt", "perplexity", "ai overview", "ai search", "aiseo", "geo",
      "llm", "gptbot"), "/expertise/aiseo/"),
    (("seo", "search", "schema", "backlink", "keyword", "crawl", "index", "gbp",
      "google business", "map", "local"), "/expertise/seo/"),
    (("google ads", "meta ads", "facebook ads", "instagram ads", "pmax",
      "performance max", "ppc", "roas", "cac", "campaign", "landing page"), "/expertise/performance-marketing/"),
    (("instagram", "linkedin", "youtube", "social", "reels", "shorts"), "/expertise/social-media-marketing/"),
    (("content", "blog", "article", "copy", "brief", "eeat"), "/expertise/content-marketing/"),
    (("lead", "cold email", "whatsapp", "crm", "pipeline", "outreach"), "/expertise/lead-generation/"),
    (("sales", "training", "objection", "pricing", "positioning", "team"), "/expertise/marketing-sales-alignment/"),
]


def expertise_for(term):
    t = term.lower()
    for keys, url in EXPERTISE_BY_TERM:
        if any(k in t for k in keys):
            return url
    return "/expertise/"


def slot_for(term):
    t = term.lower()
    return "evening" if any(s in t for s in EVENING_SIGNALS) else "morning"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=20)
    ap.add_argument("--slot", choices=["morning", "evening"])
    ap.add_argument("--write", action="store_true",
                    help="Append the stubs to queue.json instead of printing them")
    args = ap.parse_args()

    with open(PLAN, encoding="utf-8") as f:
        plan = json.load(f)
    with open(QUEUE, encoding="utf-8") as f:
        queue = json.load(f)
    published = {"posts": []}
    if os.path.exists(PUBLISHED):
        with open(PUBLISHED, encoding="utf-8") as f:
            published = json.load(f)

    used = {b["primary_keyword"].lower() for b in queue["briefs"]}
    used |= {p.get("primary_keyword", "").lower() for p in published["posts"]}

    clusters = plan.get("clusters") or plan.get("keyword_clusters") or []
    clusters = [c for c in clusters
                if c.get("band") != "parked"
                and c.get("primary_keyword", "").lower() not in used]
    clusters.sort(key=lambda c: -c.get("score", c.get("priority", 0)))

    next_n = len(queue["briefs"])
    stubs = []
    for c in clusters:
        term = c["primary_keyword"]
        slot = slot_for(term)
        if args.slot and slot != args.slot:
            continue
        next_n += 1
        stubs.append({
            "id": f"b-{next_n:03d}",
            "slot": slot,
            "primary_keyword": term,
            "secondary_keywords": [k["term"] if isinstance(k, dict) else k
                                   for k in (c.get("keywords") or [])[1:5]],
            "working_title": "NEEDS_ANGLE",
            "angle": "NEEDS_ANGLE",
            "audience": "NEEDS_ANGLE",
            "city": c.get("geo"),
            "expertise_link": expertise_for(term),
            "tags": [],
            "_cluster_id": c.get("id"),
            "_score": c.get("score"),
            "_band": c.get("band"),
        })
        if len(stubs) >= args.count:
            break

    if args.write:
        queue["briefs"].extend(stubs)
        with open(QUEUE, "w", encoding="utf-8") as f:
            json.dump(queue, f, indent=2, ensure_ascii=False)
        print(f"Appended {len(stubs)} stubs to queue.json.\n"
              f"Now fill in working_title, angle, audience and tags on every one of "
              f"them before any run uses them. See this file's docstring for how.")
    else:
        print(json.dumps(stubs, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
