#!/usr/bin/env python3
"""Check a drafted article against the rules in content-ops/VOICE.md.

This is a machine check for the things a machine can catch. It cannot tell you
whether the post is any good, and passing it is not permission to publish
something boring. It exists because em dashes and stock phrases slip through
every single time otherwise.

Exit code 1 means do not publish. Fix and re-run.

Usage: python3 lint_article.py path/to/post.md
"""
import argparse
import re
import sys

FATAL_CHARS = {
    "—": "em dash",
    "–": "en dash",
}

BANNED_PHRASES = [
    "in today's digital age", "in todays digital age", "ever-evolving",
    "ever evolving", "delve into", "delving", "navigate the complexities",
    "unlock the power", "game changer", "game-changer", "robust solution",
    "seamless experience", "it's important to note", "it is important to note",
    "moreover,", "furthermore,", "in conclusion", "at the end of the day",
    "tapestry", "testament to", "elevate your brand", "supercharge",
    "harness the power", "when it comes to", "look no further", "buckle up",
    "let's dive in", "lets dive in", "dive deep", "that being said",
    "rest assured", "a myriad of", "plethora", "cutting edge", "cutting-edge",
    "state of the art", "state-of-the-art", "holistic approach", "synergy",
    "paradigm shift", "in the world of", "the world of digital",
]

# The two constructions that give away a machine faster than anything else.
BANNED_PATTERNS = [
    (r"\bit'?s not just [^.!?]{1,60}[,.] it'?s\b", "\"it's not just X, it's Y\" construction"),
    (r"\bthis is'?n?o?t? about [^.!?]{1,60}\. it'?s about\b", "\"this isn't about X. It's about Y\" construction"),
    (r"^#{1,3}\s*(introduction|conclusion)\s*:?\s*$", "Introduction/Conclusion heading"),
    (r"\bleverage\s+(your|our|the|their|its)\b", "\"leverage\" used as a verb"),
]

WARN_PHRASES = ["utilise", "utilize", "in order to", "a wide range of",
                "various", "numerous", "ensure that", "additionally,"]


def read_body(text):
    """Strip YAML frontmatter so title fields are linted separately."""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            return parts[1], parts[2]
    return "", text


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("path")
    ap.add_argument("--max-words", type=int, default=1500)
    ap.add_argument("--min-words", type=int, default=800)
    args = ap.parse_args()

    with open(args.path, encoding="utf-8") as f:
        raw = f.read()

    frontmatter, body = read_body(raw)
    lower = raw.lower()
    errors, warnings = [], []

    for ch, name in FATAL_CHARS.items():
        if ch in raw:
            lines = [i + 1 for i, l in enumerate(raw.splitlines()) if ch in l]
            errors.append(f"{name} found on line(s) {lines}. Replace with a comma, "
                          f"a full stop, or brackets.")

    for phrase in BANNED_PHRASES:
        if phrase in lower:
            errors.append(f'banned phrase: "{phrase}"')

    for pattern, label in BANNED_PATTERNS:
        if re.search(pattern, lower, re.M):
            errors.append(f"banned construction: {label}")

    for phrase in WARN_PHRASES:
        if phrase in lower:
            warnings.append(f'weak word, consider rewriting: "{phrase}"')

    words = len(body.split())
    if words < args.min_words:
        errors.append(f"{words} words, below the {args.min_words} minimum.")
    elif words > args.max_words:
        warnings.append(f"{words} words, above the {args.max_words} target. Trim the padding.")

    # Rhythm check. If nearly every paragraph is the same length the post reads
    # like it was generated, because it was.
    paras = [p for p in body.split("\n\n") if p.strip() and not p.strip().startswith(("#", ">", "-", "*", "|", "1."))]
    if len(paras) >= 6:
        lengths = sorted(len(p.split()) for p in paras)
        median = lengths[len(lengths) // 2]
        spread = lengths[-1] - lengths[0]
        if median and spread < median:
            warnings.append(f"paragraph lengths are too uniform (median {median} words, "
                            f"spread {spread}). Break the rhythm with a one line paragraph "
                            f"and a longer one.")

    # Frontmatter sanity.
    if frontmatter:
        for field in ("title:", "description:", "publishedAt:"):
            if field not in frontmatter:
                errors.append(f"frontmatter missing {field}")
        m = re.search(r"^description:\s*[\"']?(.+?)[\"']?\s*$", frontmatter, re.M)
        if m and len(m.group(1)) > 158:
            errors.append(f"description is {len(m.group(1))} chars, trim to 158 for the SERP.")

    for w in warnings:
        print(f"WARN  {w}")
    for e in errors:
        print(f"FAIL  {e}")

    if errors:
        print(f"\n{len(errors)} blocking issue(s). Do not publish.")
        sys.exit(1)
    print(f"\nPassed. {words} words, {len(warnings)} warning(s).")


if __name__ == "__main__":
    main()
