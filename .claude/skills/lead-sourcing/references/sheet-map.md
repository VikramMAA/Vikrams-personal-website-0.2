# Lead Tracker sheet map

Spreadsheet ID: `11t3yjz_KqmaMe797K_AJLcBMxl_4VyfoOOWUFLfOxFU`

You may write to only two tabs: `Leads` (sheetId `0`) and
`Intent Signals` (sheetId `1001`). Never write to `Outreach Activity` or
`Replies`. Never change the sheet's structure: no dropdown, format or formula
edits, and no inserted or deleted columns. You only write values into the
cells listed below as "Agent 1 writes".

**Lead ID is the join key.** Leads column A computes it from the row number
(`L-` plus row minus 1, zero-padded to four digits, so row 3 is `L-0002`).
The Intent Signals tab links to a lead by that ID, and the Lead Name and
Company Name columns there are lookup formulas.

## Layout check (every run, before any write)

Read `Leads!A1:AA1` and `'Intent Signals'!A1:J1` and compare them with the
headers below, exactly and in order. **If even one header differs, stop.
Write nothing, and report the difference to Vikram.** The sheet has been
restructured since this map was written, and writing by position would put
data in the wrong columns. Don't try to repair or adapt the sheet; the skill
needs updating instead.

Also read row 3 of each tab once and confirm the pre-filled formulas are
present: Leads A, Y, Z, AA and Intent Signals I, J. If they're missing on the
row you are about to write, stop and report it in the same way.

## Label mappings (doc term → sheet dropdown value)

The ICP doc and the sheet's dropdowns use different wording. Always write the
**sheet** value, because anything else breaks the dropdown.

**Geo Match Tier (Leads M)**

| Doc | Write |
| --- | --- |
| Tier 1 - Bengaluru | `Tier 1 - Core` |
| Tier 2 - Metro (Mumbai, Delhi NCR, Hyderabad, Chennai, Pune) | `Tier 2 - Adjacent` |
| Tier 3 - Rest of India | `Tier 3 - Expansion` |
| outside India | never written; the company fails the HQ gate |

**Priority Tier (Leads O)**

| Fit Score | Doc | Write |
| --- | --- | --- |
| 70 to 100 | Tier 1 - Priority | `Tier 1 - Priority` |
| 50 to 69 | Tier 2 - Standard | `Tier 2 - Nurture` |
| 0 to 49 | Tier 3 - Watch | `Tier 3 - Monitor` |
| any exclusion hit | n/a | never written; excluded leads don't get a row |

**Signal Tier (Intent Signals C)**

| Doc tier | Write |
| --- | --- |
| A | `Tier 1 - High intent` |
| B | `Tier 2 - Medium intent` |
| C | never written; it is not sufficient on its own, and only A/B signals are recorded |

**Signal Category (Intent Signals D)**

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

**Score Weight (Intent Signals G):** the points this one signal earns under
the doc's "Intent signal strength" rubric line:

- `30` for Tier A dated within 60 days
- `22` for Tier A within 6 months
- `15` for Tier B within 90 days
- `0` for a Tier B signal that is inside its own window but older than 90 days.
  The rubric awards it no points, but it still passes the signal gate.

The lead's Fit Score uses the best single signal, plus 5 if there are two
signals, capped at 30.

## Leads tab (A to AA)

| Col | Header | Agent 1 writes |
| --- | --- | --- |
| A | Lead ID | **Never write.** Pre-filled formula. Read it back after writing B. |
| B | Company Name | Trading or legal name as on their own site |
| C | Founder / C-Suite Contact Name | One person |
| D | Role / Title | Exact title |
| E | Email | Only if published. Never guessed. Otherwise `""`. |
| F | LinkedIn URL | Personal profile URL (`https://www.linkedin.com/in/...`), never the company page. If you can't find it, leave it `""` and note `LinkedIn profile: not found` in Notes. |
| G | Phone Number | Only if public. Write it via `update_formulas` as `'+91 80 1234 5678` (leading apostrophe), so a `+` is never parsed as a formula. |
| H | Employee Count | Integer (number, not text). If you only have a band, leave it empty and note `Headcount: <band>, exact count Unverified`. |
| I | Revenue Band | One of: `Below ₹8 Cr` / `₹8-15 Cr` / `₹15-25 Cr` / `₹25-40 Cr` / `Above ₹40 Cr`. If it comes from a headcount proxy, say so in Notes. |
| J | Country | `India` |
| K | State | Full state name, e.g. `Karnataka` |
| L | City | City of the primary operating office, e.g. `Bengaluru` |
| M | Geo Match Tier (vs ICP) | Mapped label, see above |
| N | Fit Score | Integer 0 to 100 (number) |
| O | Priority Tier (ICP Scoring) | Mapped label, see above |
| P | Source | Where the lead was found, e.g. `Inc42 Funding Galore 04 Oct 2026` |
| Q | Date Sourced | Today, written as a formula `=DATE(yyyy,m,d)` via `update_formulas` |
| R | HITL Status | **Leave empty.** Vikram sets it. |
| S | Date Approved | **Leave empty.** |
| T | Suppression Flag | **Leave empty.** |
| U | Notes | Each signal with its URL, every Unverified gate, and the score arithmetic. Facts only, separated with ` / `. |
| V | Operating Model | e.g. `B2B SaaS - direct sales`, `B2B services - founder-led sales`, `B2B marketplace - inside sales` |
| W | Company Website | Root domain with `https://` |
| X | YouTube URL | Channel URL if it exists, else `""` |
| Y | Intent Signals | **Never write.** Pre-filled formula that counts this Lead ID in the Intent Signals tab. |
| Z | Outreach Activity | **Never write.** Pre-filled formula. |
| AA | Replies | **Never write.** Pre-filled formula. |

### Write sequence for a batch of new rows `s..e`

1. `update_values` → `Leads!B{s}:F{e}`
2. `update_values` → `Leads!H{s}:P{e}` (H and N as numbers)
3. `update_formulas` → `Leads!Q{s}:Q{e}` with `=DATE(...)` per row
4. `update_values` → `Leads!U{s}:X{e}`
5. `update_formulas` → `Leads!G{r}` for each row with a public phone
6. Read back `Leads!A{s}:B{e}` to get each row's Lead ID.
7. Then write the Intent Signals rows (next section).

Never send a range that covers A, R, S, T, Y, Z or AA. No text cell may start
with `=`, `+`, `-` or `@`; rephrase it if needed.

## Intent Signals tab (A to J)

| Col | Header | Agent 1 writes |
| --- | --- | --- |
| A | Lead ID | The lead's ID exactly as read back from Leads A, e.g. `L-0002` |
| B | Signal Detail | The dated, checkable fact with the doc's tier prefix, e.g. `A: Hiring a Performance Marketing Manager, posted 24 Sep 2026, still live on careers page (checked 08 Oct 2026)` |
| C | Signal Tier | Mapped label |
| D | Signal Category | Mapped label |
| E | Signal Date | Date of the event (posting, announcement, hire). For "current" signals, use the date you observed it. Write it with `update_formulas` as `=DATE(yyyy,m,d)`. |
| F | Signal Source | Source name and URL, e.g. `Company careers page - https://example.in/careers/pmm` |
| G | Score Weight | Number, see mapping |
| H | HITL Status | **Leave empty.** |
| I | Lead Name | **Never write.** Pre-filled lookup formula from the Lead ID. |
| J | Company Name | **Never write.** Pre-filled lookup formula from the Lead ID. |

The next free row is the first row after the last non-empty column B (Signal
Detail). Column A of an empty row is blank, and I and J show `""`.

Write sequence for signal rows `s..e`: `update_values` for `A{s}:D{e}`, then
`update_formulas` for `E`, then `update_values` for `F{s}:G{e}`.

After writing, I and J must show the lead's contact and company name. If
either shows `not in Leads`, the Lead ID in A is wrong. Fix it.
