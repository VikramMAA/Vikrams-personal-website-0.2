# US keyword strategy — vikramhere.com

Built 21 August 2026. 45 clusters: 20 county-level across 10 counties, 25 national.

## Why this plan exists

The article engine was writing entirely for India. This plan gives the US
rotation real research behind it instead of relabelled Indian keywords.

**This plan is not derived from analytics.** The GA4 city report for the site
shows Ashburn, Boardman and Council Bluffs, which are AWS and Google data
centre locations, plus Glenview. That is crawler and datacentre traffic, not
buyers. The US push here is a business decision about who Vikram wants as
clients. Nothing in this file should be read as evidence that Americans are
currently reading the site.

## The core strategic call: skip the head terms

`digital marketing agency los angeles` and its siblings are unwinnable. The top
five is national directories (Clutch, Semrush, Yelp) and funded local agencies
with local links and a local address. A solo consultant in Bengaluru with no US
presence does not beat them, and pretending otherwise wastes a year.

So every county cluster targets a **winnable long tail query that still names
the county**:

- `how much does a digital marketing agency cost in {county}` — pricing intent,
  converts well, and the SERP is agency pages rather than directories.
- `remote marketing consultant vs local agency {metro}` — meets the actual
  objection a US buyer has about hiring outside the US, and is a question no
  local agency wants to answer honestly. This is the strongest angle Vikram has,
  because he is the remote option and can argue it from the inside.

Head terms are recorded in `parked` with the reason, so nobody relitigates this
in three months.

## The ten counties, and why these ten

Ranked on Census County Business Patterns establishment counts and marketing
employment concentration, not on guesswork.

| County | Metro | Why it is in tier 1 |
|---|---|---|
| Los Angeles, CA | Los Angeles | Largest US county by establishments (~245k) |
| Cook, IL | Chicago | 2nd by establishments, #2 metro for marketing employment |
| Harris, TX | Houston | 4th by establishments, deep trades and energy base |
| Maricopa, AZ | Phoenix | Fastest growing large county, dense home services |
| Orange, CA | Orange County | County name genuinely is the search term |
| New York, NY | Manhattan | Largest marketing employment base (~130k) |
| Miami-Dade, FL | Miami | County name searched directly, #2 fastest growing tech hub |
| Dallas, TX | Dallas | Top five marketing metro, strong B2B services |
| King, WA | Seattle | High value B2B and SaaS buyers |
| Santa Clara, CA | San Jose | Highest value B2B SaaS buyers in the country |

Tier 2 is documented in `county_tiers.tier_2_next` (Fulton, Travis, Clark,
Broward, Middlesex, San Diego, Tarrant, Wayne, Philadelphia, Hennepin).

**Expansion policy: do not build tier 2 until at least three tier 1 counties
show impressions in Search Console.** Publishing county pages at volume without
evidence they rank is the exact pattern Google's scaled content abuse policy
targets, and the March 2026 core update made it the primary enforcement
priority. Ten pages is a test. Two hundred is a liability.

## The anti-template rule

Every county cluster carries a `local_specifics` field with genuine local
material: LA's 88-city sprawl and Spanish-language market, Maricopa's summer
HVAC cost-per-click spike, Manhattan's in-house teams and price anchoring,
Santa Clara's structural scepticism about agencies.

Ten posts that differ only by place name are worse than one good post. The
`local_specifics` is what the writer builds the middle of the article around.
If a draft would still make sense with a different county pasted in, it fails
and gets rewritten.

Title shapes are also rotated per county rather than filled from one template,
for the same reason.

## The national layer

25 clusters covering the US-only material a non-US writer usually misses:
Local Services Ads, HIPAA and tracking pixels, TCPA before anyone sends an SMS,
the FTC fake review rule, Yelp versus Google Business Profile, Angi and
Thumbtack shared leads, franchise structure. These are the strongest
differentiators because most international marketing content skips US
regulation entirely.

Plus the transferable technical depth: Performance Max brand exclusions, GA4
attribution and modelled conversions, AI search citation, and the agency
accountability material that is already Vikram's positioning cornerstone.

## Confidence and gaps

**Medium.** Honest about what is missing:

- No Search Console data for this market, so no query-level ground truth. Every
  priority here is inference from SERP observation and business density data.
- No paid volume source. Demand tiers are judgement, not measurement. There are
  no invented volume numbers anywhere in the plan.
- Winnability scores on county head terms are deliberately harsh. If Vikram
  later gets US clients, testimonials and links, they should be revisited.

**First thing to fix:** get Search Console verified and filter datacentre
traffic out of GA4. Until that happens, every geographic decision on this site
is inference.
