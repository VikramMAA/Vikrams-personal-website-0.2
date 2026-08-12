#!/usr/bin/env python3
"""Top the editorial queue back up from the keyword plan.

This does NOT write finished briefs. It cannot, because an angle worth reading
comes from knowing the market, not from a keyword string. What it does is pick
the next best unused clusters out of seo/output/keyword-plan.json, filter out
anything already covered, and print stub briefs for the agent to fill in the
working_title and angle fields on.

Anything left with an "angle": "TODO" must not be handed to the writer.

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

SERVICE_BY_TOPIC = [
    (("seo", "search", "schema", "backlink", "keyword", "crawl", "index", "gbp",
      "google business", "map", "local", "chatgpt", "perplexity", "ai overview"), "/services/seo/"),
    (("google ads", "meta ads", "facebook ads", "instagram ads", "pmax",
      "performance max", "ppc", "roas", "cac", "campaign", "landing page"), "/services/performance-marketing/"),
    (("instagram", "linkedin", "youtube", "social", "reels", "shorts"), "/services/social-media-marketing/"),
    (("content", "blog", "article", "copy", "brief", "eeat"), "/services/content-marketing/"),
    (("lead", "cold email", "whatsapp", "crm", "pipeline", "outreach"), "/services/lead-generation/"),
    (("sales", "training", "objection", "pricing", "positioning", "team"), "/services/marketing-sales-training/"),
]


def service_for(term):
    t = term.lower()
    for keys, url in SERVICE_BY_TOPIC:
        if any(k in t for k in keys):
            return url
    return "/services/"


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
            "working_title": "TODO",
            "angle": "TODO",
            "audience": "TODO",
            "city": c.get("geo"),
            "service_link": service_for(term),
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
        print(f"Appended {len(stubs)} stubs to queue.json. "
              f"Fill in working_title, angle, audience and tags before any of them run.")
    else:
        print(json.dumps(stubs, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
