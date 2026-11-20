#!/usr/bin/env python3
"""Check one lead's outreach drafts against the ICP doc's writing rules.

Usage:
    python3 lint_outreach.py drafts.json

drafts.json:
    {
      "email":       {"subject": "...", "body": "..."},
      "linkedin":    {"message": "..."},
      "call_script": {"text": "..."}
    }

Exit 0 means every rule passed (warnings may still print). Exit 1 means at
least one error, so the draft must be rewritten before it goes in the sheet.
The ICP doc is the source of truth; if it adds a banned phrase, add it here.
"""

import json
import re
import sys

SIGN_OFF = "Regards,\nVikram M A A\nBengaluru"

BANNED = [
    # "I hope this email finds you well" and every variant
    r"hope (this|the|my) (e-?mail|message|note) finds you",
    r"hope (you are|you're|you have been|you've been) (well|doing well|keeping well|good)",
    r"hope all is well",
    # openers that mark bulk send
    r"wanted to reach out", r"just reaching out", r"\breaching out\b", r"quick question",
    r"came across your (profile|company|website|post)", r"stumbled (up)?on",
    # jargon
    r"game[- ]?changer", r"synerg", r"\bleverag(e|es|ed|ing)\b", r"circle back",
    r"touch base", r"low[- ]hanging fruit", r"move the needle",
    # hype
    r"\b10x\b", r"skyrocket", r"explode your", r"guaranteed?\b",
    # disclosure of how the draft was produced
    r"\bas an ai\b", r"\bai[- ]generated\b", r"language model", r"\bchatgpt\b", r"\bclaude\b",
    # empty closing asks
    r"let me know if (you are|you're) interested",
    # salutations and unresolved placeholders
    r"dear sir", r"dear madam", r"sir/madam", r"\[[^\]]*\]", r"\{\{", r"<[a-z ]+>",
    # flattery and superlatives that fit any company
    r"impressive growth", r"lov(e|ed) what you", r"\bamazing\b", r"\bincredible\b",
    r"\bworld[- ]class\b", r"best[- ]in[- ]class", r"industry[- ]leading",
    r"cutting[- ]edge", r"\brevolutionary\b", r"\bawesome\b", r"\bimpressive\b",
]

URL_RE = re.compile(r"(https?://|www\.)\S+", re.I)
CALENDAR_RE = re.compile(r"calendly|cal\.com|hubspot\.com/meetings|zcal|savvycal|book a (time|slot|call)", re.I)
US_DATE_RE = re.compile(
    r"\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.? \d{1,2}(st|nd|rd|th)?\b(?!\s*(Cr|L|lakh|crore))"
)


def sentences(text):
    text = re.sub(r"\s+", " ", text.strip())
    if not text:
        return []
    return [s for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]


def words(text):
    return re.findall(r"[^\s]+", text)


def common_checks(label, text, errors, warnings):
    if "—" in text:
        errors.append(f"{label}: contains an em dash. Use commas, colons, full stops or parentheses.")
    if "–" in text:
        warnings.append(f"{label}: contains an en dash; check it is not standing in for an em dash.")
    low = text.lower()
    for pat in BANNED:
        m = re.search(pat, low)
        if m:
            errors.append(f"{label}: banned phrase or placeholder '{m.group(0)}'.")
    if "$" in text or re.search(r"\b(USD|million|billion)\b", text):
        warnings.append(f"{label}: non-Indian currency or units; use ₹ with lakh and crore where natural.")
    m = US_DATE_RE.search(text)
    if m:
        errors.append(f"{label}: US-style date '{m.group(0)}'. Use Indian format, e.g. 24 Sep 2026.")


def long_sentences(label, text, errors):
    for s in sentences(text):
        n = len(words(s))
        if n >= 25:
            errors.append(f"{label}: sentence of {n} words (limit is under 25): '{s[:80]}...'")


def check_email(email, errors, warnings):
    subject = (email.get("subject") or "").strip()
    body = (email.get("body") or "").replace("\r\n", "\n").strip()
    if not subject:
        errors.append("email: subject is empty.")
    else:
        n = len(words(subject))
        if not 6 <= n <= 9:
            errors.append(f"email: subject is {n} words; it must be 6 to 9.")
        common_checks("email subject", subject, errors, warnings)
        if re.search(r"partnership|opportunity|collaborat|proposal|services|offer", subject, re.I):
            errors.append("email: subject names the offer; it must name the observation.")
    if not body:
        errors.append("email: body is empty.")
        return
    if not body.endswith(SIGN_OFF):
        errors.append("email: body must end with the sign-off 'Regards,' / 'Vikram M A A' / 'Bengaluru' on three lines.")
        main = body
    else:
        main = body[: -len(SIGN_OFF)].strip()
    common_checks("email body", main, errors, warnings)
    long_sentences("email body", main, errors)
    paras = [p for p in re.split(r"\n\s*\n", main) if p.strip()]
    # a one-line greeting such as "Hi Priya," is not counted as a paragraph
    if paras and len(words(paras[0])) <= 3:
        paras = paras[1:]
    if len(paras) > 5:
        errors.append(f"email: {len(paras)} paragraphs; maximum is 5.")
    n = len(words(" ".join(paras)))
    if not 120 <= n <= 180:
        errors.append(f"email: body is {n} words excluding greeting and sign-off; it must be 120 to 180.")
    if re.search(r"^\s*([-*•]|\d+[.)])\s+", main, re.M):
        errors.append("email: contains bullets or a numbered list.")
    if CALENDAR_RE.search(main):
        errors.append("email: contains a calendar link or booking ask.")
    elif URL_RE.search(main):
        warnings.append("email: contains a link; the doc allows none beyond what the observation needs.")
    if re.search(r"attach", main, re.I):
        errors.append("email: mentions an attachment; the first email carries none.")
    first3 = " ".join(sentences(" ".join(paras))[:3])
    if not re.search(r"\d", first3):
        errors.append("email: no number or dated fact in the first three sentences.")


def check_linkedin(li, errors, warnings):
    msg = (li.get("message") or "").strip()
    if not msg:
        errors.append("linkedin: message is empty.")
        return
    if len(msg) >= 300:
        errors.append(f"linkedin: {len(msg)} characters; it must be under 300.")
    if URL_RE.search(msg):
        errors.append("linkedin: contains a link.")
    common_checks("linkedin", msg, errors, warnings)
    long_sentences("linkedin", msg, errors)
    body = re.sub(r"^(hi|hello|hey)\s+[A-Za-z]+,?\s*", "", msg, flags=re.I)
    if len(sentences(body)) > 2:
        errors.append(f"linkedin: {len(sentences(body))} sentences; use one on the observation and one on the ask.")


def check_call_script(cs, errors, warnings):
    text = (cs.get("text") or "").strip()
    if not text:
        errors.append("call script: text is empty.")
        return
    common_checks("call script", text, errors, warnings)
    heads = {
        "OPENER": r"^OPENER\b",
        "QUALIFYING QUESTIONS": r"^QUALIFYING QUESTIONS\b",
        "POSITIONING": r"^POSITIONING\b",
        "OBJECTION HANDLERS": r"^OBJECTION HANDLERS\b",
    }
    for name, pat in heads.items():
        if not re.search(pat, text, re.M):
            errors.append(f"call script: missing the labelled part '{name}'.")
    parts = re.split(r"^(OPENER|QUALIFYING QUESTIONS|POSITIONING|OBJECTION HANDLERS)\b.*$", text, flags=re.M)
    sec = {parts[i]: parts[i + 1] for i in range(1, len(parts) - 1, 2)}
    q = sec.get("QUALIFYING QUESTIONS", "")
    if q and q.count("?") != 2:
        errors.append(f"call script: qualifying section has {q.count('?')} questions; it needs exactly 2.")
    p = sec.get("POSITIONING", "")
    if p and len(sentences(p)) != 1:
        errors.append("call script: positioning must be one sentence.")
    o = sec.get("OBJECTION HANDLERS", "")
    if o:
        n = len(re.findall(r"^\s*Objection:", o, re.M))
        r = len(re.findall(r"^\s*Response:", o, re.M))
        if n < 3 or r < n:
            errors.append(f"call script: needs 3 'Objection:' lines each followed by a 'Response:' line (found {n} and {r}).")
        if not re.search(r"already (have|got|work with) an agency", o, re.I):
            errors.append("call script: objection handlers must include 'we already have an agency'.")
        if not re.search(r"send me an e-?mail", o, re.I):
            errors.append("call script: objection handlers must include 'send me an email'.")


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    with open(sys.argv[1], encoding="utf-8") as f:
        d = json.load(f)
    errors, warnings = [], []
    for key, fn in (("email", check_email), ("linkedin", check_linkedin), ("call_script", check_call_script)):
        if key not in d:
            errors.append(f"{key}: missing from the drafts file.")
        else:
            fn(d[key], errors, warnings)
    for w in warnings:
        print("WARN ", w)
    for e in errors:
        print("ERROR", e)
    print("PASS" if not errors else f"FAIL ({len(errors)} errors)")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
