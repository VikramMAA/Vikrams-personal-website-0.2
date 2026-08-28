#!/usr/bin/env python3
"""Fill assets/copy-desk.html with today's drafts and write a publishable page.

The Copy Desk is the editing surface for the drafts. Building it by hand every
run means re-deriving the same string surgery daily and getting the JS escaping
wrong eventually, so it lives here instead: the template carries the linter and
the layout, this fills in the article and the tabs.

The drafts go in as JSON rather than JS template literals, so a post containing
a backtick, a backslash or a dollar sign cannot break the page. `</` is escaped
on top of that, because the HTML parser looks for `</script` before the JS
parser ever sees the string, so a draft quoting a closing tag would otherwise
end the script element early and blank the page.

Usage:
  python3 seed_desk.py \
      --slug how-to-sell-online-in-india \
      --title "How do I start selling online in India?" \
      --date 2026-08-28 --market India \
      --draft "Margin gate:post:drafts/a.txt" \
      --draft "COD mechanism:post:drafts/b.txt" \
      --draft "GST correction:post:drafts/c.txt" \
      --draft "First comment:comment:drafts/fc.txt" \
      --out /tmp/copy-desk.html
"""
import argparse
import html
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, "..", "assets", "copy-desk.html")
SITE = "https://vikramhere.com"


def parse_draft(spec):
    """`name:kind:path`. The name may not contain a colon, the path may."""
    parts = spec.split(":", 2)
    if len(parts) != 3:
        raise argparse.ArgumentTypeError(
            f"--draft wants name:kind:path, got {spec!r}")
    name, kind, path = parts
    if kind not in ("post", "comment"):
        raise argparse.ArgumentTypeError(
            f"kind must be post or comment, got {kind!r}")
    return name.strip(), kind, path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--date", required=True, help="publishedAt, YYYY-MM-DD")
    ap.add_argument("--market", default="")
    ap.add_argument("--draft", action="append", required=True, type=parse_draft,
                    help="name:kind:path, repeatable, in tab order")
    ap.add_argument("--template", default=TEMPLATE)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    seed = []
    for name, kind, path in args.draft:
        try:
            text = open(path, encoding="utf-8").read().rstrip("\n")
        except OSError as e:
            sys.exit(f"cannot read draft {path}: {e}")
        seed.append({"name": name, "kind": kind, "text": text})

    # A blank slot at the end, for the day the drafts are a starting point
    # rather than the answer.
    seed.append({"name": "Blank", "kind": "post", "text": ""})

    page = open(args.template, encoding="utf-8").read()
    meta = " · ".join(x for x in (args.market, args.date) if x)
    for token, value in (
        ("__SEED__", json.dumps(seed, ensure_ascii=False, indent=2)
                     .replace("</", "<\\/")),
        ("__SEED_ID__", json.dumps(f"{args.slug}-{args.date}")[1:-1]),
        ("__ARTICLE_URL__", html.escape(f"{SITE}/blog/{args.slug}/", quote=True)),
        ("__ARTICLE_TITLE__", html.escape(args.title)),
        ("__ARTICLE_META__", html.escape(meta)),
    ):
        if token not in page:
            sys.exit(f"template is missing {token}. Did assets/copy-desk.html change?")
        page = page.replace(token, value)

    with open(args.out, "w", encoding="utf-8") as f:
        f.write(page)
    print(f"wrote {args.out} ({len(page)} bytes, {len(seed)} tabs)")


if __name__ == "__main__":
    main()
