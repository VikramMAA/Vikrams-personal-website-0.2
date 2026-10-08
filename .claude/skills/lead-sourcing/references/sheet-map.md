# Lead Tracker sheet map

Spreadsheet ID: `11t3yjz_KqmaMe797K_AJLcBMxl_4VyfoOOWUFLfOxFU`

You may write to only two tabs: `Leads` (sheetId `0`) and
`Intent Signals` (sheetId `1001`). Never write to `Outreach Activity` or
`Replies`.

## Label mappings (doc term → sheet dropdown value)

The ICP doc and the sheet's dropdowns use different wording. Always write the
**sheet** value, because anything else breaks the dropdown.

**Geo Match Tier (Leads L)**

| Doc | Write |
| --- | --- |
| Tier 1 - Bengaluru | `Tier 1 - Core` |
| Tier 2 - Metro (Mumbai, Delhi NCR, Hyderabad, Chennai, Pune) | `Tier 2 - Adjacent` |
| Tier 3 - Rest of India | `Tier 3 - Expansion` |
| outside India | never written; the company fails the HQ gate |

**Priority Tier (Leads N)**

| Fit Score | Doc | Write |
| --- | --- | --- |
| 70 to 100 | Tier 1 - Priority | `Tier 1 - Priority` |
| 50 to 69 | Tier 2 - Standard | `Tier 2 - Nurture` |
| 0 to 49 | Tier 3 - Watch | `Tier 3 - Monitor` |
| any exclusion hit | n/a | never written; excluded leads don't get a row |

**Signal Tier (Intent Signals B)**

| Doc tier | Write |
| --- | --- |
| A | `Tier 1 - High intent` |
| B | `Tier 2 - Medium intent` |
| C | never written; it is not sufficient on its own, and only A/B signals are recorded |

**Signal Category (Intent Signals C)**

| Doc signal | Write |
| --- | --- |
| Competitor bidding on their brand name | `Other` |
| Open marketing role posted and still live | `Hiring` |
| Funding round announced | `Funding` |
| First VP Sales or Head of Growth hired | `Leadership change` |
| Marketing or growth person departed, not replaced | `Leadership change` |
| New product line, pricing page or market launched | `Product launch` |
| Entered a new geography or opened an office | `Expansion` |
| Ads running but landing page is the generic homepage | `Other` |
| Exhibiting at a named trade show or conference | `Event or conference` |
| Agency contract visibly ended, site credits removed | `Other` |

**Score Weight (Intent Signals F):** the points this one signal earns under
the doc's "Intent signal strength" rubric line:

- `30` for Tier A dated within 60 days
- `22` for Tier A within 6 months
- `15` for Tier B within 90 days
- `0` for a Tier B signal that is inside its own window but older than 90 days.
  The rubric awards it no points, but it still passes the signal gate.

The lead's Fit Score uses the best single signal, plus 5 if there are two
signals, capped at 30.

## Leads tab (A to Z)

| Col | Header | Agent 1 writes |
| --- | --- | --- |
| A | Company Name | Trading or legal name as on their own site. This is the join key, so spell it identically everywhere. |
| B | Founder / C-Suite Contact Name | One person |
| C | Role / Title | Exact title |
| D | Email | Only if published. Never guessed. Otherwise `""`. |
| E | LinkedIn URL | Personal profile URL (`https://www.linkedin.com/in/...`), never the company page |
| F | Phone Number | Only if public. Write it via `update_formulas` as `'+91 80 1234 5678` (leading apostrophe), so a `+` is never parsed as a formula. |
| G | Employee Count | Integer (number, not text). If you only have a LinkedIn band, leave it empty and note `Headcount: LinkedIn band 51-200, exact count Unverified`. |
| H | Revenue Band | One of: `Below ₹8 Cr` / `₹8-15 Cr` / `₹15-25 Cr` / `₹25-40 Cr` / `Above ₹40 Cr`. If it comes from a headcount proxy, say so in Notes. |
| I | Country | `India` |
| J | State | Full state name, e.g. `Karnataka` |
| K | City | City of the primary operating office, e.g. `Bengaluru` |
| L | Geo Match Tier (vs ICP) | Mapped label, see above |
| M | Fit Score | Integer 0 to 100 (number) |
| N | Priority Tier (ICP Scoring) | Mapped label, see above |
| O | Source | Where the lead was found, e.g. `Inc42 Funding Galore 04 Oct 2026` |
| P | Date Sourced | Today, written as a formula `=DATE(yyyy,m,d)` via `update_formulas` |
| Q | HITL Status | **Leave empty.** Vikram sets it. |
| R | Date Approved | **Leave empty.** |
| S | Suppression Flag | **Leave empty.** |
| T | Notes | Each signal with its URL, every Unverified gate, and the score arithmetic. Facts only, separated with ` / `. |
| U | Operating Model | e.g. `B2B SaaS - direct sales`, `B2B services - founder-led sales`, `B2B marketplace - inside sales` |
| V | Company Website | Root domain with `https://` |
| W | YouTube URL | Channel URL if it exists, else `""` |
| X | Intent Signals | **Formula**, see below. Never plain text. |
| Y | Outreach Activity | **Leave empty.** Populated later. |
| Z | Replies | **Leave empty.** Populated later. |

Column X formula for row `r` (same as the template's row 2, with the row number changed):

```
=IF($Ar="","",IF(COUNTIF('Intent Signals'!$I$2:$I,$Ar)=0,"Signals: 0","Signals: "&COUNTIF('Intent Signals'!$I$2:$I,$Ar)&" | latest "&TEXT(MAXIFS('Intent Signals'!$D$2:$D,'Intent Signals'!$I$2:$I,$Ar),"dd-mm-yyyy")))
```

The doc's full signal sentence (tier prefix, date, fact) lives in the Intent
Signals tab's Signal Detail column. The Leads X formula summarises it, so a
Leads row with no signal shows `Signals: 0` and is caught in the read-back.

### Write sequence for a batch of new rows `s..e`

1. `update_values` → `Leads!A{s}:O{e}`, but put `""` in F for now.
2. `update_formulas` → `Leads!P{s}:P{e}` with `=DATE(...)` per row.
3. `update_values` → `Leads!Q{s}:W{e}`, with Q, R and S as `""`.
4. `update_formulas` → `Leads!X{s}:X{e}` with the formula above, one per row.
5. `update_formulas` → `Leads!F{r}` for each row that has a public phone.
6. Intent Signals rows (next section).

No text cell may start with `=`, `+`, `-` or `@`. Rephrase it if needed.

## Intent Signals tab (A to I)

| Col | Header | Agent 1 writes |
| --- | --- | --- |
| A | Signal Detail | The dated, checkable fact with the doc's tier prefix, e.g. `A: Hiring a Performance Marketing Manager, posted 24 Sep 2026, still live on careers page (checked 08 Oct 2026)` |
| B | Signal Tier | Mapped label |
| C | Signal Category | Mapped label |
| D | Signal Date | Date of the event (posting, announcement, hire). For "current" signals, use the date you observed it. Write it with `update_formulas` as `=DATE(yyyy,m,d)`. |
| E | Signal Source | Source name and URL, e.g. `Company careers page - https://example.in/careers/pmm` |
| F | Score Weight | Number, see mapping |
| G | HITL Status | **Leave empty.** |
| H | Lead Name | Exactly the Leads column B value |
| I | Company Name | Exactly the Leads column A value |

Write sequence for signal rows `s..e`: `update_values` for `A{s}:C{s..e}`,
then `update_formulas` for `D`, then `update_values` for `E:I` (G as `""`).

## Template repair

Use this only when the step 2 check in SKILL.md finds rows 3+ shifted. Send it
as one `update_spreadsheet` call with this `requests` array. It clears the
misplaced dropdowns and formulas in rows 3 to 1000. It then puts the correct
dropdowns and date and number formats on the right columns. It doesn't touch
values in Leads A to W or Intent Signals A to I.

```json
[
  {"setDataValidation": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 11, "endColumnIndex": 26}}},
  {"repeatCell": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 23, "endColumnIndex": 26}, "cell": {}, "fields": "userEnteredValue"}},
  {"setDataValidation": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 11, "endColumnIndex": 12}, "rule": {"condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": "Tier 1 - Core"}, {"userEnteredValue": "Tier 2 - Adjacent"}, {"userEnteredValue": "Tier 3 - Expansion"}, {"userEnteredValue": "Out of footprint"}]}, "showCustomUi": true}}},
  {"setDataValidation": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 13, "endColumnIndex": 14}, "rule": {"condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": "Tier 1 - Priority"}, {"userEnteredValue": "Tier 2 - Nurture"}, {"userEnteredValue": "Tier 3 - Monitor"}, {"userEnteredValue": "Disqualified"}]}, "showCustomUi": true}}},
  {"setDataValidation": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 16, "endColumnIndex": 17}, "rule": {"condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": "Not reviewed"}, {"userEnteredValue": "In review"}, {"userEnteredValue": "Approved"}, {"userEnteredValue": "Rejected"}, {"userEnteredValue": "Needs more data"}]}, "showCustomUi": true}}},
  {"setDataValidation": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 18, "endColumnIndex": 19}, "rule": {"condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": "No"}, {"userEnteredValue": "Yes"}]}, "showCustomUi": true}}},
  {"repeatCell": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 15, "endColumnIndex": 16}, "cell": {"userEnteredFormat": {"numberFormat": {"type": "DATE", "pattern": "dd-mm-yyyy"}}}, "fields": "userEnteredFormat.numberFormat"}},
  {"repeatCell": {"range": {"sheetId": 0, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 17, "endColumnIndex": 18}, "cell": {"userEnteredFormat": {"numberFormat": {"type": "DATE", "pattern": "dd-mm-yyyy"}}}, "fields": "userEnteredFormat.numberFormat"}},

  {"setDataValidation": {"range": {"sheetId": 1001, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 0, "endColumnIndex": 9}}},
  {"setDataValidation": {"range": {"sheetId": 1001, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 1, "endColumnIndex": 2}, "rule": {"condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": "Tier 1 - High intent"}, {"userEnteredValue": "Tier 2 - Medium intent"}, {"userEnteredValue": "Tier 3 - Low intent"}]}, "showCustomUi": true}}},
  {"setDataValidation": {"range": {"sheetId": 1001, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 2, "endColumnIndex": 3}, "rule": {"condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": "Hiring"}, {"userEnteredValue": "Funding"}, {"userEnteredValue": "Expansion"}, {"userEnteredValue": "Leadership change"}, {"userEnteredValue": "Technology adoption"}, {"userEnteredValue": "Product launch"}, {"userEnteredValue": "M&A"}, {"userEnteredValue": "Event or conference"}, {"userEnteredValue": "Content or thought leadership"}, {"userEnteredValue": "Regulatory or compliance"}, {"userEnteredValue": "Other"}]}, "showCustomUi": true}}},
  {"setDataValidation": {"range": {"sheetId": 1001, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 6, "endColumnIndex": 7}, "rule": {"condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": "Not reviewed"}, {"userEnteredValue": "In review"}, {"userEnteredValue": "Approved"}, {"userEnteredValue": "Rejected"}, {"userEnteredValue": "Needs more data"}]}, "showCustomUi": true}}},
  {"setDataValidation": {"range": {"sheetId": 1001, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 7, "endColumnIndex": 8}, "rule": {"condition": {"type": "ONE_OF_RANGE", "values": [{"userEnteredValue": "=Leads!$B$2:$B"}]}, "showCustomUi": true}}},
  {"setDataValidation": {"range": {"sheetId": 1001, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 8, "endColumnIndex": 9}, "rule": {"condition": {"type": "ONE_OF_RANGE", "values": [{"userEnteredValue": "=Leads!$A$2:$A"}]}, "showCustomUi": true}}},
  {"repeatCell": {"range": {"sheetId": 1001, "startRowIndex": 2, "endRowIndex": 1000, "startColumnIndex": 3, "endColumnIndex": 4}, "cell": {"userEnteredFormat": {"numberFormat": {"type": "DATE", "pattern": "dd-mm-yyyy"}}}, "fields": "userEnteredFormat.numberFormat"}}
]
```

After the repair, Leads Y and Z (Outreach Activity, Replies) are empty in rows
3+. That is intended: those columns belong to the later outreach stage, and
Agent 1 doesn't fill them.
