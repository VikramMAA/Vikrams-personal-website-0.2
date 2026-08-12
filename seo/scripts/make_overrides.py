#!/usr/bin/env python3
"""Encode the judgment calls the scorer cannot make on its own.

Two things the generic model gets wrong for this site:

1. The geo matrix is combinatorial. Vikram is one person in Bengaluru with no
   office in Mumbai or Chennai. Every non-Bengaluru city cell scores as if it
   were winnable; almost none are, because the map pack needs proximity and the
   organic SERPs in those cities are owned by local agencies. Those cells get
   parked, with one hub page per city kept alive.

2. Value is scored for a business selling off a service page. This site's growth
   engine is editorial — informational and BOFU posts that earn AI citations and
   feed the service pages. Informational intent is therefore worth much more
   here than the default model assumes.

Usage: python3 make_overrides.py --scored work/scored.json --out work/overrides.json
"""
import argparse
import json

HOME = {"bengaluru", "bangalore"}

# One hub page per secondary city is defensible. Anything past that is a
# doorway page with the city name swapped, which is what the matrix would
# generate if left alone.
SECONDARY_HUB_SERVICE = "digital marketing consultant"

# Topics where Vikram has direct, demonstrable experience. Fit 10 means the
# page can make first-person claims instead of summarising what others wrote.
STRONG_FIT = (
    "seo", "google ads", "meta ads", "performance marketing", "social media",
    "content marketing", "lead generation", "local seo", "google business profile",
    "ai search", "chatgpt", "perplexity", "ai overview", "freelanc", "consultant",
    "agency", "cold email", "linkedin", "whatsapp", "cac", "roas", "conversion",
    "landing page", "keyword", "schema", "structured data", "backlink", "gsc",
    "search console", "analytics", "ga4",
)

# Topics adjacent to the offer but not the offer itself. Worth writing about for
# reach, not worth promising delivery on.
WEAK_FIT = ("crm", "erp", "hiring", "recruit", "logistics", "accounting", "legal")


def fit_for(term):
    t = term.lower()
    if any(w in t for w in WEAK_FIT):
        return 5
    if any(w in t for w in STRONG_FIT):
        return 10
    return 8


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scored", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    with open(args.scored, encoding="utf-8") as f:
        data = json.load(f)

    overrides = {}
    stats = {"home_geo": 0, "secondary_hub": 0, "secondary_parked": 0, "editorial": 0}

    for c in data["clusters"]:
        cid = c["id"]
        term = c["primary_keyword"]
        geo = (c.get("geo") or "").lower()

        if geo in HOME:
            overrides[cid] = {
                "fit": fit_for(term),
                "winnability": 8,
                "reason": "Home market. Real address, real proximity signal, SERP is other solo consultants.",
            }
            stats["home_geo"] += 1

        elif geo:
            if SECONDARY_HUB_SERVICE in term.lower():
                overrides[cid] = {
                    "value": 7,
                    "fit": 9,
                    "winnability": 4,
                    "effort": 5,
                    "reason": "One hub page per secondary city. Organic only, no map pack play without a local address.",
                }
                stats["secondary_hub"] += 1
            else:
                overrides[cid] = {
                    "value": 2,
                    "fit": 4,
                    "winnability": 2,
                    "effort": 7,
                    "reason": "Doorway risk. Cannot write 400 words of genuinely city-specific content for this cell. Covered by the city hub page and the service page instead.",
                }
                stats["secondary_parked"] += 1

        else:
            intent = c.get("intent", "")
            fit = fit_for(term)
            # The editorial engine is the point of this plan, so informational
            # demand is scored on citation value rather than on how close the
            # searcher is to a purchase.
            if intent in ("informational", "informational_bofu"):
                value = 8 if intent == "informational_bofu" else 7
                overrides[cid] = {
                    "value": value,
                    "fit": fit,
                    "reason": "Editorial engine. Answers a question the buyer asks before they shortlist, which is what gets quoted by AI assistants.",
                }
                stats["editorial"] += 1
            else:
                overrides[cid] = {"fit": fit, "reason": "Fit adjusted to what one consultant can credibly deliver."}

    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(overrides, f, indent=2)

    print(f"{len(overrides)} overrides -> {args.out}")
    for k, v in stats.items():
        print(f"  {k:18} {v}")


if __name__ == "__main__":
    main()
