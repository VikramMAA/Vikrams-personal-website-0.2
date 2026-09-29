# GA4 verification runbook — vikramhere.com

**For a session with Chrome access.** Everything here needs a real browser against
the live site. Work through it in order; the ordering in §2 and §6 matters.

Written 29 September 2026, for the tracking deployed in commit `83cc29b`.
Architecture and rationale live in [`ANALYTICS.md`](ANALYTICS.md) — this file is
only the how-to-check.

- Site: <https://vikramhere.com>
- GA4 property `549664959`, measurement ID `G-3JV22J241M`
- Contact values the events key on: email `vikram.1996523@gmail.com`,
  phone `+917019990776`, WhatsApp `917019990776`

---

## 0. What was deployed, and what should now fire

Three custom events were added. None existed before — the property had recorded
zero conversions of any kind in twelve months.

| Event | Fires when | Parameters |
|---|---|---|
| `contact_click` | A WhatsApp, phone or email link is clicked, anywhere on the site | `contact_method` = `whatsapp` \| `phone` \| `email`, plus `page_path`, `link_text`, `link_url` |
| `generate_lead` | The contact form succeeds — after Resend accepts the message, server-side | `lead_source` = `contact_form`, `form_id` = `contact` |
| `sign_up` | A newsletter subscription succeeds | `method` = `newsletter`, `page_path` |

Two design points that the tests below depend on:

- **`contact_click` is one delegated listener on `document`, capture phase.** It
  is not attached per link, so it works on every page including ones added later.
  It does not call `preventDefault`, so the click still navigates — GA4 dispatches
  via `navigator.sendBeacon`, which survives the navigation.
- **Both form events fire on a confirmed-success redirect, not on submit.**
  `/api/contact` appends `?src=contact` to its redirect **only after Resend
  accepts the message**; `/thank-you/` fires `generate_lead` only if that marker
  is present. The spam honeypot redirects to a bare `/thank-you/` instead, which
  fires nothing. The newsletter has its own success page, `/subscribed/`.

All three are production-gated (`import.meta.env.PROD`), so they exist on
vikramhere.com but not in local dev.

---

## 1. Confirm the deploy actually landed first

Do not debug tracking that is not deployed. Check a marker from this release:

```bash
# Should print a number > 0. If it prints 0, the deploy has not gone out yet.
curl -s https://vikramhere.com/contact/ | grep -c contact_click

# Should print 0 — the availability copy was removed in the same release.
curl -s https://vikramhere.com/contact/ | grep -ci "not available for freelance"

# Should return HTTP 200 — this page is new in this release.
curl -s -o /dev/null -w "%{http_code}\n" https://vikramhere.com/subscribed/
```

Or in Chrome: view source on <https://vikramhere.com/contact/> and search for
`contact_click`. If it is missing, check the deploy at
<https://app.netlify.com/projects/vikramhere/deploys> before going further.

---

## 2. Order of operations — read this before touching GA4 settings

**Do the event tests in §3–§5 BEFORE activating the internal traffic filter in
§6.**

A GA4 data filter in **Active** state discards matching traffic during
processing. Once your own IP is filtered as internal, your test events stop
appearing in DebugView and in every report — you will be looking at an empty
screen and cannot tell a filter from a broken tag.

If the filter is already Active, set it back to **Testing** for the duration of
these tests, then return it to Active. Admin → Data collection and modification →
Data filters.

Also worth knowing before you start:

- An ad blocker or tracking-protection extension will block the GA4 request
  entirely. Use a clean Chrome profile, or disable blocking for vikramhere.com.
- Brave, Firefox strict mode and Safari ITP will also interfere. Use Chrome.

---

## 3. The definitive check: watch the request leave the browser

This needs no extension and proves the hit was actually sent with the right
payload. Do this first; DebugView (§4) then confirms GA4 *received* it.

1. Open <https://vikramhere.com/contact/> in Chrome.
2. Open DevTools → **Network** tab. In the filter box type `collect`.
3. Tick **Preserve log** — the WhatsApp and phone links navigate away, and
   without this the request disappears before you can read it.
4. Click the **"Message on WhatsApp"** link.
5. A request to `https://www.google-analytics.com/g/collect?...` appears. Click
   it and read the **query string** (Headers → Query String Parameters, or just
   read the URL).

What you are looking for in that query string:

| Parameter | Expected value | Meaning |
|---|---|---|
| `en` | `contact_click` | the event name |
| `ep.contact_method` | `whatsapp` | the method dimension |
| `ep.page_path` | `/contact/` | where it happened |
| `ep.link_url` | `https://wa.me/917019990776` | the link clicked |
| `tid` | `G-3JV22J241M` | the right property |

GA4 encodes event parameters as `ep.<name>` for strings and `epn.<name>` for
numbers. A `collect` request with `en=page_view` and no `en=contact_click` means
the listener did not fire — see §7.

Now repeat for the other two methods, going back to `/contact/` each time:

| Click this on `/contact/` | Expect `en=contact_click` with |
|---|---|
| "Message on WhatsApp" | `ep.contact_method=whatsapp` |
| the phone number `+91 70199 90776` | `ep.contact_method=phone` |
| the email address `vikram.1996523@gmail.com` | `ep.contact_method=email` |

**Also test one blog post**, to confirm the listener is genuinely site-wide and
not just on the contact page. Any post works; the footer CTA on every page has
Email and WhatsApp buttons:

- <https://vikramhere.com/blog/how-much-does-a-digital-marketing-agency-cost/>
- Click the **WhatsApp** button in the dark CTA block near the foot of the page.
- Expect `en=contact_click`, `ep.contact_method=whatsapp`, and
  `ep.page_path=/blog/how-much-does-a-digital-marketing-agency-cost/`.

The `page_path` parameter is the whole point of the exercise — it is what will
eventually answer "which content drives contact". Confirm it is not empty and not
always `/contact/`.

---

## 4. Confirm GA4 received them: DebugView

The Network tab proves the request left. DebugView proves GA4 ingested it and
shows how it will be reported.

**Turn on debug mode** — pick one:

- **Easiest:** install the official
  [Google Analytics Debugger](https://chromewebstore.google.com/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
  Chrome extension and toggle it ON for the tab. It sets `debug_mode` on every hit.
- **No extension:** open DevTools → **Console** on the site and run
  `gtag('set', { debug_mode: true })` before clicking. This lasts for that page
  only, so re-run it after each navigation.

**Then:** GA4 → Admin (bottom left) → **DebugView**. Your device appears in the
debug device picker at the top left within a few seconds of the first hit.

Repeat the §3 clicks and watch events land in the timeline. Click an event to
expand it and check the **Parameters** tab shows `contact_method` with the right
value.

> DebugView shows the last 30 minutes only, and there is a lag of a few seconds.
> If your device does not appear, debug mode is not on — that is the usual cause,
> not a broken tag.

---

## 5. The two form conversions

### 5a. `generate_lead` — the contact form

This sends a real email to `vikram.1996523@gmail.com`, so expect it in the inbox.

1. Go to <https://vikramhere.com/contact/>.
2. Fill the form. Put something identifiable in the message, e.g.
   `GA4 verification test, 29 Sep, please ignore`.
3. Keep DevTools → Network open with `collect` filtered and **Preserve log** on.
4. Submit.
5. You should be redirected to **`/thank-you/?src=contact`** — check the address
   bar for the `?src=contact` part specifically. Without it the event will not
   fire, and that is by design.
6. In the Network tab, expect a `collect` request with:
   - `en=generate_lead`
   - `ep.lead_source=contact_form`
   - `ep.form_id=contact`
7. **Confirm the email actually arrived.** A redirect to `/thank-you/?src=contact`
   means Resend accepted the message, but check the inbox anyway — that is the
   thing the event is claiming happened.

### 5b. The honeypot negative test — do not skip this

This proves the event counts real submissions rather than bot traffic. If this
test fires `generate_lead`, the conversion number will be inflated by spam and is
not trustworthy.

1. On <https://vikramhere.com/contact/>, open DevTools → **Console** and run:

   ```js
   document.querySelector('input[name="bot-field"]').value = 'iamabot';
   ```

2. Fill in the visible fields normally and submit.
3. **Expected:** you land on a bare **`/thank-you/`** with **no** `?src=contact`,
   and **no** `generate_lead` in the Network tab. No email arrives either.
4. If you see `generate_lead` here, that is a bug — report it.

### 5c. `sign_up` — the newsletter

> **Likely blocker: Netlify Forms appears to be switched off for this site.**
> As of 29 Sep the `vikramhere` project reported forms "not enabled" and had no
> forms registered. The newsletter form is a Netlify Form, so it will not work
> until that is turned on.
>
> Check <https://app.netlify.com/projects/vikramhere/forms>. Netlify only
> registers a form it finds in deployed HTML, so it may also need one deploy
> *after* this release before the form named `newsletter` shows up. If the form is
> not listed there, submitting it will not redirect to `/subscribed/` and this
> test cannot pass — enable Forms, redeploy, then come back.

Once Forms is on:

1. Go to any post, e.g.
   <https://vikramhere.com/blog/how-to-choose-a-digital-marketing-consultant/>,
   or <https://vikramhere.com/blog/>.
2. Scroll to the **"Get new posts by email"** block.
3. Enter a real address you can check and submit, with Network open.
4. **Expected:** redirect to **`/subscribed/`**, and a `collect` request with:
   - `en=sign_up`
   - `ep.method=newsletter`
5. **Confirm `generate_lead` did NOT also fire.** A subscriber is not a lead, and
   the two are deliberately separate events on separate pages. If both fire, that
   is a bug.
6. Check the submission appears under Netlify → Forms → `newsletter`.

---

## 6. GA4 configuration — the code is inert without this

The events are being collected, but until these are done they will not appear as
conversions and the parameters will not appear in any report or exploration.

### 6a. Mark the key events

Admin → Data display → **Key events**.

An event only appears in the list once GA4 has received it at least once, which
is why this comes after §3–§5.

- Mark **`contact_click`**, **`generate_lead`** and **`sign_up`** as key events.
- **Unmark `close_convert_lead`, `purchase` and `qualify_lead`.** These are GA4
  stock suggestions. Nothing on the site is wired to any of them and all three
  report "no stream data detected". Leaving them marked puts three permanently
  empty rows on every conversion report.

### 6b. Register the custom dimensions

Admin → Data display → **Custom definitions** → Create custom dimension.

| Dimension name | Scope | Event parameter |
|---|---|---|
| Contact method | Event | `contact_method` |
| Lead source | Event | `lead_source` |
| Form ID | Event | `form_id` |

Without these three, `contact_method` is collected but unreportable — you will
see that `contact_click` happened but not whether it was WhatsApp or email, which
is most of the value.

### 6c. Filter internal traffic — do this LAST

The property recorded 237 sessions in twelve months, 94.9% Direct, 8 seconds
average engagement, 100% new users. A meaningful share is Vikram's own visits,
and at that volume they distort every percentage on every report.

1. Get your public IP from <https://ifconfig.me> on each network you work from.
   If your ISP assigns a dynamic address, use an IP range.
2. Admin → Data collection and modification → **Data streams** → the site's
   stream → Configure tag settings → Show more → **Define internal traffic**.
   Rule: `traffic_type` equals `internal`, match type "IP address equals".
3. Admin → Data collection and modification → **Data filters**. The "Internal
   Traffic" filter exists by default in **Testing**. Switch it to **Active**.

**Not retroactive.** Historical data stays polluted. Write down the activation
date and treat it as the start of the clean baseline.

Then confirm it works: load the site from your own network and check
Reports → Realtime shows no new session.

### 6d. Confirm the Search Console link

1. Admin → **Product links** → Search Console links. Confirm it points at
   `sc-domain:vikramhere.com` and **not** a URL-prefix property.
2. Reports → **Library** → find the "Search Console" collection and publish it if
   it shows as unpublished.

This collection is the report that maps queries → landing pages → on-site
behaviour, which was not possible to produce before this work.

---

## 7. If an event does not fire

Work down this list:

1. **Ad blocker / tracking protection.** By far the most common cause. Test in a
   clean Chrome profile with no extensions.
2. **Internal traffic filter already Active** and matching your IP — the data is
   silently dropped. See §2.
3. **The deploy is not live.** Re-run §1.
4. **`gtag` not defined.** In DevTools → Console run `typeof window.gtag`. It must
   return `"function"`. If it returns `"undefined"`, the GA4 snippet in the page
   head is not loading — check the Network tab for a blocked request to
   `googletagmanager.com/gtag/js`.
5. **Listener not attached.** In Console, run
   `getEventListeners(document).click` (Chrome only). You should see a capture
   listener. If not, check for a JavaScript error earlier in the page:
   Console → filter to Errors.
6. **`generate_lead` missing but the form worked.** Check the address bar for
   `?src=contact`. No marker means the handler took the honeypot path or an error
   path — check the function log at
   <https://app.netlify.com/projects/vikramhere/logs/functions>.
7. **DebugView empty but Network shows the hit.** Debug mode is not on. The hit is
   still being recorded, it just is not in DebugView. See §4.

---

## 8. Checklist

Event tests, before touching the internal traffic filter:

- [ ] Deploy confirmed live (§1)
- [ ] `contact_click` + `ep.contact_method=whatsapp` on `/contact/`
- [ ] `contact_click` + `ep.contact_method=phone` on `/contact/`
- [ ] `contact_click` + `ep.contact_method=email` on `/contact/`
- [ ] `contact_click` from a **blog post**, with the post's own `ep.page_path`
- [ ] `generate_lead` on a real submission, redirected to `/thank-you/?src=contact`
- [ ] The test email actually arrived in the inbox
- [ ] Honeypot submission fires **no** `generate_lead` and sends no email
- [ ] Netlify Forms enabled and the `newsletter` form registered
- [ ] `sign_up` on a real subscription, redirected to `/subscribed/`
- [ ] `sign_up` did **not** also fire `generate_lead`

GA4 configuration:

- [ ] `contact_click`, `generate_lead`, `sign_up` marked as key events
- [ ] `close_convert_lead`, `purchase`, `qualify_lead` unmarked
- [ ] Contact method, Lead source, Form ID registered as custom dimensions
- [ ] Internal traffic rule defined and the filter switched to Active
- [ ] Activation date written down as the clean-baseline start
- [ ] Realtime shows no session from your own network
- [ ] Search Console link points at the `sc-domain:` property
- [ ] Search Console report collection published

Indexing hygiene, quick to confirm while you are here:

- [ ] `/thank-you/` and `/subscribed/` both return
      `<meta name="robots" content="noindex, nofollow">`
- [ ] Neither appears in <https://vikramhere.com/sitemap-0.xml>

---

## 9. Baseline, for the 90-day review

Recorded before any of this shipped, so the effect can be isolated. Review around
**29 December 2026**.

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

At review, the number that matters is **average position on the two canonical
pages** (`/blog/how-much-does-a-digital-marketing-agency-cost/` and
`/blog/how-to-choose-a-digital-marketing-consultant/`), not total impressions.

If `contact_click` and `generate_lead` are still zero after 90 days of clean
tracking, the problem is the offer or the traffic quality rather than the
measurement, and the diagnosis changes.
