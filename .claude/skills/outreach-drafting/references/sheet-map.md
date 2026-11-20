# Lead Tracker: what Agent 2 reads and writes

Spreadsheet ID: `11t3yjz_KqmaMe797K_AJLcBMxl_4VyfoOOWUFLfOxFU`

Agent 2 **reads** Leads and Intent Signals. It **writes** new rows to
Outreach Activity, and appends one line to Leads Notes (column U). It changes
nothing else: no HITL Status, no other Leads or Intent Signals cell, no
Replies tab, and no structure (dropdowns, formats, formulas, columns).

Lead ID (`L-0001` and so on) joins every tab.

## Layout check (every run, and again right before writing)

Read the header rows and compare them exactly. **If anything differs, stop,
write nothing, and report the difference.** Don't adapt or repair the sheet.

- `Leads!A1:AA1`: Lead ID, Company Name, Founder / C-Suite Contact Name,
  Role / Title, Email, LinkedIn URL, Phone Number, Employee Count,
  Revenue Band, Country, State, City, Geo Match Tier (vs ICP), Fit Score,
  Priority Tier (ICP Scoring), Source, Date Sourced, HITL Status,
  Date Approved, Suppression Flag, Notes, Operating Model, Company Website,
  YouTube URL, Intent Signals, Outreach Activity, Replies
- `'Intent Signals'!A1:J1`: Lead ID, Signal Detail, Signal Tier,
  Signal Category, Signal Date, Signal Source, Score Weight, HITL Status,
  Lead Name, Company Name
- `'Outreach Activity'!A1:O1`: Lead ID, Subject Line, Channel,
  Template Used, Sequence Step, Draft Content, Draft Date, HITL Status,
  Send Date, Opened, Reply Received, Detected State, Agent Run ID,
  Lead Name, Lead Company Name

## What to read

**Leads:** B Company Name, C Contact, D Role / Title, E Email, F LinkedIn URL,
R HITL Status, T Suppression Flag, U Notes, V Operating Model,
W Company Website.

**Intent Signals:** A Lead ID, B Signal Detail, C Signal Tier, E Signal Date,
F Signal Source (the URL is in here), H HITL Status.

**Outreach Activity:** A Lead ID, C Channel, E Sequence Step, H HITL Status,
to tell which leads already have drafts.

Rows whose Notes, Signal Detail or Draft Content start with `EXAMPLE ROW`
are template samples. Ignore them.

## Which leads to work

A lead is **eligible** when all of these are true:

1. Leads R (HITL Status) is exactly `Approved`.
2. Leads T (Suppression Flag) is not `Yes`.
3. At least one Intent Signals row for that Lead ID has H (HITL Status)
   exactly `Approved`. Only those signals may be used in drafts.
4. It needs drafting on at least one channel: Outreach Activity has no
   `Step 1` row for that Lead ID and channel, or that channel's most recent
   row has HITL Status `Rejected`.
5. Its Notes don't already contain an `Agent 2` line saying `Failed` or
   `Skipped`, unless Vikram has deleted that line to ask for a retry.

When rule 1 holds but rule 3 fails (lead approved, no signal approved),
append this line to Notes once and don't draft anything:
`Agent 2 (DD Mon YYYY): Skipped - no signal marked Approved in Intent Signals`

## Outreach Activity: one row per channel

Per eligible lead, write up to three rows: `Email`, `LinkedIn`,
`Call script`. Only write the channels that need drafting (rule 4).

| Col | Header | Write |
| --- | --- | --- |
| A | Lead ID | The lead's ID, e.g. `L-0002` |
| B | Subject Line | Email row: the subject. LinkedIn and Call script rows: `""` |
| C | Channel | `Email`, `LinkedIn` or `Call script` |
| D | Template Used | The opener code for the signal the drafts are built on (table below) |
| E | Sequence Step | `Step 1` |
| F | Draft Content | Email: full body including greeting and sign-off. LinkedIn: the message. Call script: the four labelled parts. |
| G | Draft Date | Today, via `update_formulas` as `=DATE(yyyy,m,d)` |
| H | HITL Status | `Draft` |
| I | Send Date | **Leave empty.** |
| J | Opened | **Leave empty.** |
| K | Reply Received | **Leave empty.** |
| L | Detected State | **Leave empty.** |
| M | Agent Run ID | `run-YYYYMMDD-HHMM`, run start time in IST, the same for every row in the run |
| N | Lead Name | **Never write.** Pre-filled lookup formula. |
| O | Lead Company Name | **Never write.** Pre-filled lookup formula. |

**Template Used codes:**

| Signal the drafts open on | Code |
| --- | --- |
| Competitor bidding on their brand name | `SIG-BRANDBID` |
| Open marketing role | `SIG-HIRE` |
| Funding round | `SIG-FUNDING` |
| First VP Sales or Head of Growth hired | `SIG-LEADER` |
| Marketing or growth person departed | `SIG-DEPARTURE` |
| New product line, pricing page or market | `SIG-LAUNCH` |
| New geography or office | `SIG-EXPANSION` |
| Ads landing on the generic homepage | `SIG-ADS-LP` |
| Exhibiting at a trade show or conference | `SIG-EVENT` |
| Agency contract ended | `SIG-AGENCY` |

**Next free row:** the first row after the last non-empty column C
(Channel). Don't use `append_values`; pre-filled formulas run down to row
1000, so append lands at the bottom of the sheet.

**Write sequence for rows `s..e`:**

1. `update_values` → `'Outreach Activity'!A{s}:F{e}`
2. `update_formulas` → `'Outreach Activity'!G{s}:G{e}` with `=DATE(...)`
3. `update_values` → `'Outreach Activity'!H{s}:H{e}` with `Draft`
4. `update_values` → `'Outreach Activity'!M{s}:M{e}` with the run ID

Never send a range that covers I to L, N or O. Draft text can start with
`Hi`, but never with `=`, `+`, `-` or `@`.

## Leads Notes (column U): the research log

Read the current value of U, then write it back with one line appended,
separated by ` / `. Never rewrite or delete what is already there.

- **Verified:**
  `Agent 2 (DD Mon YYYY): Verified | Signal: <signal as re-confirmed>, checked DD Mon YYYY | URL: <url re-opened> | Summary: <up to 80 words, facts only>`
- **Failed:**
  `Agent 2 (DD Mon YYYY): Failed - <which of the 5 checks failed and what you saw> | URL: <url checked>`
