/**
 * Article view counter.
 *
 * A Netlify Function (v2) mounted at /api/views, backed by Netlify Blobs —
 * no database to run, no third-party service, no cookies. Counts live in a
 * store called `views`, one key per post slug, holding a plain integer.
 *
 *   GET  /api/views?slugs=a,b,c   → { "a": 12, "b": 3, "c": 0 }
 *   POST /api/views  {"slug":"a"} → { "slug": "a", "views": 13 }
 *
 * The GET is read-only and is what the blog index uses for the whole list in
 * one request. The POST increments and is what an article page fires once per
 * browser session (the front-end handles the once-per-session part).
 *
 * Because the page fetches these with JavaScript, crawlers and most bots are
 * filtered out for free — the numbers stay closer to real readers than a
 * server-side hit counter would be.
 *
 * Nothing to configure: Netlify injects the Blobs credentials into the
 * function at runtime, in production and in `npx netlify dev` alike.
 */

import { getStore } from '@netlify/blobs';

/** Blob keys are post slugs. Keep them boring so nothing else can be written. */
const SLUG = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,119}$/;

/** The blog index asks for every post at once; this is well clear of that. */
const MAX_SLUGS = 200;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Counts change on every read. A cached response would show a stale
      // number right after the visitor's own view was recorded.
      'Cache-Control': 'no-store',
    },
  });

/**
 * `consistency: 'strong'` costs a little latency but means the read inside an
 * increment sees the previous write, rather than an eventually-consistent copy
 * of it. Without it a burst of traffic would quietly lose counts.
 */
const viewStore = () => getStore({ name: 'views', consistency: 'strong' });

const readCount = async (store, slug) => {
  const raw = await store.get(slug, { type: 'text' });
  const value = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
};

/**
 * Only accept increments triggered from a page on this same host. It is a
 * spoofable header, so this is a speed bump against drive-by inflation rather
 * than a security control — but it costs nothing and stops the lazy case.
 * Comparing against the request's own host keeps deploy previews working.
 */
const sameOrigin = (request) => {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Non-browser client, or a same-origin navigation.
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
};

export default async (request) => {
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const slugs = (url.searchParams.get('slugs') ?? '')
      .split(',')
      .map((slug) => slug.trim())
      .filter((slug) => SLUG.test(slug))
      .slice(0, MAX_SLUGS);

    if (slugs.length === 0) return json({});

    const store = viewStore();
    const unique = [...new Set(slugs)];

    try {
      const counts = await Promise.all(
        unique.map((slug) => readCount(store, slug)),
      );
      return json(Object.fromEntries(unique.map((slug, i) => [slug, counts[i]])));
    } catch (err) {
      console.error('Could not read view counts:', err);
      return json({ error: 'unavailable' }, 503);
    }
  }

  if (request.method === 'POST') {
    if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);

    let slug;
    try {
      ({ slug } = await request.json());
    } catch {
      return json({ error: 'bad request' }, 400);
    }

    if (typeof slug !== 'string' || !SLUG.test(slug)) {
      return json({ error: 'bad request' }, 400);
    }

    try {
      const store = viewStore();
      const views = (await readCount(store, slug)) + 1;
      // Read-modify-write: two views landing in the same instant can collapse
      // into one. At this site's traffic that is a rounding error, and the
      // alternative (a real database) is not worth running for a counter.
      await store.set(slug, String(views));
      return json({ slug, views });
    } catch (err) {
      console.error('Could not record a view:', err);
      return json({ error: 'unavailable' }, 503);
    }
  }

  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET, POST' },
  });
};

export const config = {
  path: '/api/views',
};
