# Analytics and measurement

What the site sends to GA4, where it comes from, and the steps that still have
to be done by hand in the Google Analytics UI.

Measurement ID `G-3JV22J241M`, GA4 property `549664959`.

## The events

| Event | Fires when | Parameters | Source |
|---|---|---|---|
| `contact_click` | A visitor clicks a WhatsApp, phone or email link, anywhere on the site | `contact_method` (`whatsapp` / `phone` / `email`), `page_path`, `link_text`, `link_url` | `src/components/AnalyticsEvents.astro` |
| `generate_lead` | The contact form submission has been **accepted by Resend**, server-side | `lead_source` (`contact_form`), `form_id` | `src/pages/thank-you.astro` |
| `sign_up` | A newsletter subscription succeeds | `method` (`newsletter`), `page_path` | `src/pages/subscribed.astro` |

All three are production-only (`import.meta.env.PROD`), so local development
does not pollute the property.

### Why these three and not others

`contact_click` is one event with a `contact_method` dimension rather than three
separate event names. GA4 caps custom event names, and one event with a
dimension is easier to report on than three you have to union back together.

`generate_lead` and `sign_up` stay separate on purpose. A subscriber is not a
lead. Merging them would make the conversion rate look good while telling you
nothing about which actually happened.

## How the two form conversions are wired

Both forms use a confirmed-success redirect rather than a submit listener, so
the event counts successes rather than attempts.

**Contact form** → `netlify/functions/contact.mjs` → `/thank-you/?src=contact`

The `?src=contact` marker is appended **only** after Resend accepts the message.
The spam honeypot deliberately redirects to a bare `/thank-you/` instead, and the
page fires nothing without the marker. So a bot caught by the honeypot, and
anyone who simply navigates to `/thank-you/`, produce no event.

**Newsletter** → Netlify Forms → `/subscribed/`

A separate page rather than a query-string variant of `/thank-you/`, for two
reasons: a subscriber needs different copy from someone who sent a message, and
a bare path cannot lose its meaning the way a `?src=` marker can if a redirect
strips the query string. Netlify rejects honeypot hits before the redirect, so
they never reach the page.

Neither page is indexed — both carry `noindex` and are excluded from the sitemap
by the filter in `astro.config.mjs`. Note that they are deliberately **not**
disallowed in `robots.txt`: a crawler has to fetch a page to see its `noindex`,
so blocking the path would defeat the thing it looks like it is enforcing.

## Still to do by hand in GA4

The code above is inert until these are done.

### 1. Mark the key events

Admin → Data display → Key events. An event only appears in the list once it has
been received at least once, so fire each one first (DebugView is the quickest
way).

- Mark `contact_click`, `generate_lead` and `sign_up` as key events.
- Unmark `close_convert_lead`, `purchase` and `qualify_lead`. Nothing on the site
  is wired to any of them and all three report "no stream data detected".
  Leaving them marked puts three permanently empty rows on every conversion
  report you open.

### 2. Register the custom dimensions

Admin → Data display → Custom definitions → Create custom dimension. Without
these the parameters are collected but appear in no report or exploration.

| Dimension name | Scope | Event parameter |
|---|---|---|
| Contact method | Event | `contact_method` |
| Lead source | Event | `lead_source` |
| Form ID | Event | `form_id` |

### 3. Filter internal traffic

237 sessions across twelve months, 94.9% Direct, 8 seconds average engagement,
100% new users. A meaningful share of that is Vikram. At this volume his own
visits distort every percentage on every report.

1. Get the public IP from `https://ifconfig.me` on each network you work from.
2. Admin → Data collection and modification → Data streams → the site's stream →
   Configure tag settings → Show more → Define internal traffic. Rule:
   `traffic_type` equals `internal`, match type "IP address equals".
3. Admin → Data collection and modification → Data filters. The "Internal
   Traffic" filter exists by default in **Testing**. Switch it to **Active**.

Not retroactive. Historical data stays polluted, so treat the activation date as
the start of the clean baseline and write it down.

### 4. Confirm the Search Console link

1. Admin → Product links → Search Console links. Confirm it points at
   `sc-domain:vikramhere.com` and not a URL-prefix property.
2. Reports → Library → the "Search Console" collection. Publish it if it is
   unpublished.

## Verification checklist

Nothing here can be checked from the repo — all of it needs the deployed site.

- [ ] DebugView shows `contact_click` with the right `contact_method` for each of
      the WhatsApp, phone and email links on `/contact/`
- [ ] DebugView shows `generate_lead` on a real test submission
- [ ] The test submission actually arrived in the inbox
- [ ] Submitting with the honeypot filled produces **no** `generate_lead`
- [ ] DebugView shows `sign_up` on a real newsletter subscription, and **no**
      `generate_lead` alongside it
- [ ] Netlify has detected the `newsletter` form (Netlify → Forms). Netlify only
      registers forms it finds in the deployed HTML, so confirm this after the
      first production deploy
- [ ] `/subscribed/` is reached after subscribing, rather than Netlify's own
      default success page
- [ ] All three events appear as key events, and the three custom dimensions are
      registered
- [ ] Internal traffic filter is Active and Realtime shows no session from your
      own network
- [ ] `/thank-you/` and `/subscribed/` both return `noindex` and neither appears
      in `sitemap-0.xml`

## Baseline to measure against

Recorded before any of this shipped, so the effect can be isolated. Review at
roughly 90 days.

| Metric | Value | Source | Window |
|---|---|---|---|
| Organic clicks | 0 | GSC | 31 Aug – 26 Sep 2026 |
| Organic impressions | 170 | GSC | 31 Aug – 26 Sep 2026 |
| Average position | 37.6 | GSC | 31 Aug – 26 Sep 2026 |
| Sessions | 237 | GA4 | Sep 2025 – Sep 2026 |
| Engaged sessions | 38 (16.03%) | GA4 | Sep 2025 – Sep 2026 |
| Avg engagement time | 9s | GA4 | Sep 2025 – Sep 2026 |
| Pages per session | 1.24 | GA4 | Sep 2025 – Sep 2026 |
| Key events | 0 | GA4 | Sep 2025 – Sep 2026 |
| `form_submit` | 0 (never fired) | GA4 | Sep 2025 – Sep 2026 |

At review, the metric that matters is average position on the two canonical
pages, not total impressions. If `contact_click` and `generate_lead` are still
zero after 90 days of clean tracking, the problem is the offer or the traffic
quality rather than the measurement, and the diagnosis changes.
