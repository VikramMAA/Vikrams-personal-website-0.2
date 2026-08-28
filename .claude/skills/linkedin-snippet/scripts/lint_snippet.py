#!/usr/bin/env python3
"""Check a drafted LinkedIn post before it goes in front of the user.

Two jobs. The first is career safety: Vikram is employed full time and his feed
is visible at work, so anything that reads as touting for work is a blocking
failure, not a style note. The second is the ordinary voice check, which reuses
the banned phrase list from content-ops/scripts/lint_article.py so there is one
source of truth for it.

Exit 1 means rewrite. Warnings are worth reading but are a judgement call.

Usage:
  python3 lint_snippet.py draft.txt [draft2.txt ...]
  python3 lint_snippet.py --kind comment first-comment.txt
  cat draft.txt | python3 lint_snippet.py -
"""
import argparse
import ast
import os
import re
import sys

# LinkedIn's hard cap, and where the feed cuts to "see more" on mobile. The
# truncation point moves around, so treat 200 as the last safe character rather
# than an exact boundary.
LIMITS = {"post": 3000, "comment": 1250}
SEE_MORE = 200
SWEET_SPOT = (900, 1600)

FATAL_CHARS = {"—": "em dash", "–": "en dash"}

# The whole reason this script exists. Anything that turns a reader into a lead,
# or hints the author is looking, is blocking.
AVAILABILITY_PATTERNS = [
    (r"\bopen to work\b", "availability signal"),
    (r"\bopen for work\b", "availability signal"),
    (r"\bavailable for (hire|work|projects|freelance|consulting)\b", "availability signal"),
    (r"\b(currently|actively) (looking|exploring|seeking|open)\b", "job-seeking signal"),
    (r"\bnew opportunities\b", "job-seeking signal"),
    (r"\b(taking on|onboarding|accepting) (new )?(clients|projects|work)\b", "touting for work"),
    (r"\b(dm|pm) me\b", "lead capture"),
    (r"\bmy (dms|inbox) (are|is) open\b", "lead capture"),
    (r"\b(drop|send) me a (dm|message|line)\b", "lead capture"),
    (r"\bbook a (call|slot|demo|consult)", "lead capture"),
    (r"\blet'?s (connect|chat|talk|work together|jump on a call)\b", "lead capture"),
    (r"\bget in touch\b", "lead capture"),
    (r"\breach out\b", "lead capture"),
    (r"\bhappy to help\b", "soft pitch"),
    (r"\bi can help you\b", "soft pitch"),
    (r"\bi help (small |b2b |busy |ambitious )?(businesses|founders|brands|companies|teams|clients)\b", "bio-style pitch"),
    (r"\bwork with me\b", "soft pitch"),
    (r"\bhire (me|a consultant)\b", "touting for work"),
    (r"\bmy (clients|consultancy|consulting practice|agency|services|packages)\b", "implies outside work"),
    (r"\bfree (audit|consult|consultation|strategy call|teardown)\b", "offer of services"),
    (r"\bfor hire\b", "availability signal"),
]

BANNED_HASHTAGS = [
    "opentowork", "openforwork", "hireme", "availableforwork", "forhire",
    "jobsearch", "freelancer", "freelance", "consultantforhire",
    "letsconnect", "dmforenquiries", "dmme",
]

# LinkedIn's own tells, on top of the site-wide list.
LINKEDIN_TELLS = [
    "here's the thing:", "heres the thing:", "let that sink in", "read that again",
    "i'll wait", "ill wait", "unpopular opinion:", "hot take:", "the result?",
    "agree?", "thoughts?", "am i wrong?", "who else", "comment yes",
    "repost if", "save this post", "follow me for", "link below",
]

FALLBACK_BANNED = [
    "in today's digital age", "ever-evolving", "delve into", "game changer",
    "game-changer", "seamless experience", "it's important to note", "moreover,",
    "furthermore,", "in conclusion", "at the end of the day", "supercharge",
    "harness the power", "when it comes to", "look no further", "buckle up",
    "let's dive in", "dive deep", "that being said", "a myriad of", "plethora",
    "cutting edge", "cutting-edge", "state of the art", "holistic approach",
    "synergy", "paradigm shift", "elevate your brand", "testament to", "tapestry",
]

EMOJI = re.compile(
    "["
    "\U0001F300-\U0001FAFF"   # pictographs, emoticons, symbols
    "\U00002600-\U000027BF"   # misc symbols and dingbats
    "\U0001F1E6-\U0001F1FF"   # flags
    "\U00002B00-\U00002BFF"   # arrows and stars
    "]"
)


def site_banned_phrases():
    """Reuse content-ops' list when we're inside the repo, so it stays in sync.

    Parsed with ast rather than imported, because lint_article.py is a script
    with argparse at module scope and we only want the one constant out of it.
    """
    here = os.path.abspath(__file__)
    for _ in range(8):
        here = os.path.dirname(here)
        candidate = os.path.join(here, "content-ops", "scripts", "lint_article.py")
        if not os.path.exists(candidate):
            continue
        try:
            tree = ast.parse(open(candidate, encoding="utf-8").read())
            for node in tree.body:
                if isinstance(node, ast.Assign) and any(
                    getattr(t, "id", None) == "BANNED_PHRASES" for t in node.targets
                ):
                    return ast.literal_eval(node.value), candidate
        except Exception:
            pass
        break
    return FALLBACK_BANNED, None


def check(text, name, banned, kind="post"):
    errors, warnings, notes = [], [], []
    lower = text.lower()
    stripped = text.strip()
    chars = len(stripped)

    for ch, label in FATAL_CHARS.items():
        if ch in text:
            errors.append(f"{label} found. Use a comma, a full stop or brackets.")

    for pattern, label in AVAILABILITY_PATTERNS:
        m = re.search(pattern, lower)
        if m:
            errors.append(f'{label}: "{m.group(0)}". This post is read at work. Cut it.')

    tags = re.findall(r"#(\w+)", text)
    for tag in tags:
        if tag.lower() in BANNED_HASHTAGS:
            errors.append(f"#{tag} signals job hunting. Replace with a topical tag.")

    cap = LIMITS[kind]
    if chars > cap:
        errors.append(f"{chars} characters, over LinkedIn's {cap} limit for a {kind}.")

    for phrase in banned:
        if phrase in lower:
            errors.append(f'banned phrase: "{phrase}"')

    for tell in LINKEDIN_TELLS:
        if tell in lower:
            errors.append(f'LinkedIn tell: "{tell}"')

    if re.search(r"\bit'?s not just [^.!?]{1,60}[,.] it'?s\b", lower):
        errors.append('"it\'s not just X, it\'s Y" construction')
    if re.search(r"\bthis is ?n[o']?t about [^.!?]{1,60}\. it'?s about\b", lower):
        errors.append('"this isn\'t about X. It\'s about Y" construction')
    if re.search(r"\bleverage\s+(your|our|the|their|its)\b", lower):
        errors.append('"leverage" used as a verb')

    # The hook, the length band, the hashtags and the closing question are all
    # about surviving the feed. A first comment does none of that work, so those
    # checks would only ever cry wolf on one.
    first_para = stripped.split("\n\n")[0].strip()

    if kind == "post":
        # Everything past the truncation point is invisible until someone taps,
        # so the first paragraph has to stand alone.
        if len(first_para) > SEE_MORE:
            warnings.append(
                f"first paragraph is {len(first_para)} chars, past the ~{SEE_MORE} char "
                f"cut. Split it so the hook completes before 'see more'."
            )
        if first_para.endswith("?") and len(first_para) < 120:
            warnings.append(
                "opens on a question. Opening with the answer usually holds better, "
                "the question belongs at the end."
            )

        if chars < SWEET_SPOT[0]:
            warnings.append(f"{chars} characters, under {SWEET_SPOT[0]}. Reads thin for a text post.")
        elif chars > SWEET_SPOT[1]:
            warnings.append(f"{chars} characters, over {SWEET_SPOT[1]}. Trim before it becomes a wall.")

        if not 3 <= len(tags) <= 5:
            warnings.append(f"{len(tags)} hashtags. Three to five, at the end.")

        if "?" not in stripped[-400:]:
            warnings.append("no question in the closing stretch. Comments need something to answer.")
    elif tags:
        warnings.append(f"{len(tags)} hashtags in a comment. They belong in the post.")

    emoji = EMOJI.findall(text)
    if len(emoji) > 2:
        warnings.append(f"{len(emoji)} emoji. Two is the ceiling, zero is usually right.")

    paras = [p.strip() for p in stripped.split("\n\n") if p.strip() and not p.strip().startswith("#")]
    if len(paras) >= 5:
        singles = sum(1 for p in paras if len(p.split()) <= 14)
        if singles / len(paras) > 0.85:
            warnings.append(
                "almost every paragraph is one short line. That is broetry. Let two "
                "or three of them run longer."
            )

    notes.append(f"{kind} · {chars} chars · hook {len(first_para)} chars · "
                 f"{len(tags)} hashtags · {len(emoji)} emoji")
    return errors, warnings, notes


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="+", help="draft file(s), or - for stdin")
    ap.add_argument("--kind", choices=sorted(LIMITS), default="post",
                    help="post (default) or comment. A first comment skips the "
                         "hook, length, hashtag and closing-question checks.")
    args = ap.parse_args()

    banned, source = site_banned_phrases()
    if source:
        print(f"[banned phrase list from {os.path.relpath(source)}]\n")

    failed = 0
    for path in args.paths:
        text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
        label = "stdin" if path == "-" else os.path.basename(path)
        errors, warnings, notes = check(text, label, banned, args.kind)

        print(f"--- {label}")
        for n in notes:
            print(f"      {n}")
        for w in warnings:
            print(f"WARN  {w}")
        for e in errors:
            print(f"FAIL  {e}")
        print("      clean\n" if not errors and not warnings else "")
        if errors:
            failed += 1

    if failed:
        print(f"{failed} draft(s) with blocking issues. Rewrite, do not soften.")
        sys.exit(1)
    print("No blocking issues.")


if __name__ == "__main__":
    main()
