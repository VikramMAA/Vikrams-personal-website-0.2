#!/usr/bin/env python3
"""Pick the brief to write for this run.

Rules, in order:

1. Only briefs whose slot matches this run are eligible. Morning runs get the
   practical tactical pieces, evening runs get opinion, story and analysis.
   A reader who lands on the site twice in a day should not get two of the
   same shape of article.
2. Anything already in published.json is out.
3. Rotate the market. Each run goes to whichever of US, India or Estonia is
   furthest behind its weight in config.json, and no market runs more than
   twice in a row. Most readers are in the US and the queue used to be almost
   entirely Indian, which is the whole reason this rule exists.
4. Do not repeat a city inside three runs, or a tag inside two runs. Publishing
   four Bengaluru local SEO posts back to back is how a blog starts looking
   automated.
5. Among what survives, take the earliest one in the queue. The queue order is
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
DEFAULT_CONFIG = os.path.join(HERE, "..", "config.json")

CITY_SPACING = 3
TAG_SPACING = 2

# How many recent posts to weigh when working out which market is owed a turn,
# and how many times in a row one market may run before it is forced to yield.
MARKET_WINDOW = 6
MARKET_RUN_LIMIT = 2


def choose_market(published, markets, available):
    """Return the market whose share of recent output is furthest behind target.

    `markets` is the config block, `available` is the set of markets that
    actually have an eligible brief waiting. Weights are relative, so a market
    on weight 3 should end up with three times the posts of one on weight 1.

    Two guards. A market with no brief left to write is never chosen, and a
    market that has just run MARKET_RUN_LIMIT times in a row yields to anyone
    else, so a heavy weight cannot monopolise a week of output.
    """
    if not available:
        return None, []

    recent = [p.get("market") for p in published[-MARKET_WINDOW:] if p.get("market")]

    blocked = set()
    tail = [m for m in recent[-MARKET_RUN_LIMIT:]]
    if len(tail) == MARKET_RUN_LIMIT and len(set(tail)) == 1:
        if available - {tail[0]}:
            blocked.add(tail[0])

    pool = available - blocked
    total_weight = sum(max(0, markets[m].get("weight", 0)) for m in pool) or 1

    def deficit(m):
        target = max(0, markets[m].get("weight", 0)) / total_weight
        actual = recent.count(m)
        # What this market's count should be once we add one more post.
        return target * (len(recent) + 1) - actual

    ranked = sorted(pool, key=lambda m: (-deficit(m), -markets[m].get("weight", 0), m))
    return ranked[0], recent


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
    ap.add_argument("--config", default=DEFAULT_CONFIG)
    ap.add_argument("--market", help="Force a market instead of rotating to the one that is owed a turn.")
    args = ap.parse_args()

    queue = load(args.queue, {"briefs": []})["briefs"]
    published = load(args.published, {"posts": []})["posts"]
    markets = {k: v for k, v in load(args.config, {}).get("markets", {}).items()
               if not k.startswith("_")}

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

    # Market rotation. Pick the market that is furthest behind its weight, then
    # write from that market's briefs. If the chosen market has nothing left in
    # this slot the rotation simply moves on rather than stalling the run.
    market = None
    recent_markets = []
    market_fallback = False
    if markets:
        available = {b.get("market") for b in eligible if b.get("market") in markets}
        if args.market:
            market = args.market
            recent_markets = [p.get("market") for p in published[-MARKET_WINDOW:] if p.get("market")]
            market_fallback = market not in available
        else:
            market, recent_markets = choose_market(published, markets, available)

    in_market = [b for b in eligible if b.get("market") == market] if market else []
    if market and not in_market:
        market_fallback = True
    pool = in_market or eligible

    spaced = [b for b in pool
              if b.get("city") not in recent_cities
              and not (set(b.get("tags") or []) & recent_tags)]

    pick = (spaced or pool)[0]
    pick = dict(pick)
    pick["_spacing_relaxed"] = not spaced
    pick["_market_chosen"] = market
    pick["_market_fallback"] = market_fallback
    pick["_recent_markets"] = recent_markets
    pick["_remaining_by_market"] = {
        m: sum(1 for b in eligible if b.get("market") == m) for m in sorted(markets)
    } if markets else {}
    pick["_remaining_in_slot"] = len(eligible) - 1
    pick["_recent_titles"] = [p.get("title") for p in published[-10:]]
    pick["_recent_openings"] = [p.get("opening_pattern") for p in published[-10:]
                                if p.get("opening_pattern")]
    print(json.dumps(pick, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
