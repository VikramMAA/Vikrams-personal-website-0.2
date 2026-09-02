/**
 * Tells IndexNow the site changed, after every production build.
 *
 * IndexNow is a push protocol: verifying the key file does nothing on its own,
 * something has to POST the changed URLs. One POST to api.indexnow.org reaches
 * every participating engine — Bing, Yandex, Seznam, Naver — so this is the
 * whole integration. Google does not participate.
 *
 * Bing matters here beyond Bing itself: ChatGPT's search retrieval runs on the
 * Bing index, so how fast a new article lands there decides how fast an
 * assistant can cite it.
 *
 * WHAT IT SUBMITS: every URL in the built sitemap, not just the changed ones.
 * The site is under a hundred pages and the daily-article workflow rewrites the
 * home page and the blog index on every run anyway, so working out the exact
 * changed set costs more than it saves. The per-request ceiling is 10,000 URLs.
 *
 * WHEN IT RUNS: production deploys only. Deploy previews and branch builds are
 * skipped — pinging from those would submit URLs that do not exist on the live
 * host, which IndexNow rejects with a 422. Set INDEXNOW_FORCE=1 to run it
 * anyway when testing.
 *
 * IT NEVER FAILS THE BUILD. A search engine ping is not worth a red deploy, so
 * every error is logged and swallowed.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** The key file Bing hands you is a bare hex string named after itself. */
const KEY_FILE = /^[0-9a-f]{8,128}\.txt$/;

/** Pulls the <loc> values out of a sitemap or sitemap index. */
const locations = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

/** Maps an absolute site URL back to the file that serves it in dist/. */
const distPath = (url) => join(DIST, new URL(url).pathname);

/**
 * Every page URL on the site. `@astrojs/sitemap` writes an index pointing at
 * one or more child sitemaps, so read the index and follow it on disk rather
 * than fetching over the network — the files are right here.
 */
async function collectUrls() {
  const index = await readFile(join(DIST, 'sitemap-index.xml'), 'utf8');

  const urls = [];
  for (const child of locations(index)) {
    urls.push(...locations(await readFile(distPath(child), 'utf8')));
  }
  return urls;
}

/** The key is whatever hex-named .txt file got built to the site root. */
async function findKey() {
  const entries = await readdir(DIST, { withFileTypes: true });
  const file = entries.find((e) => e.isFile() && KEY_FILE.test(e.name));

  if (!file) {
    throw new Error(
      `no IndexNow key file at the root of ${DIST}/ — expected a hex-named .txt`,
    );
  }
  return { name: file.name, key: (await readFile(join(DIST, file.name), 'utf8')).trim() };
}

async function main() {
  if (process.env.CONTEXT !== 'production' && !process.env.INDEXNOW_FORCE) {
    console.log('[indexnow] not a production deploy — skipping.');
    return;
  }

  const urls = await collectUrls();
  if (urls.length === 0) throw new Error('sitemap contained no URLs');

  const { name, key } = await findKey();
  const { origin, host } = new URL(urls[0]);

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${origin}/${name}`,
      urlList: urls,
    }),
    // A hanging ping must not hold the build open.
    signal: AbortSignal.timeout(15_000),
  });

  // 200 accepted, 202 accepted but the key is still being verified — both fine.
  if (response.ok) {
    console.log(`[indexnow] submitted ${urls.length} URLs (HTTP ${response.status}).`);
    return;
  }

  // 403 means the key file is missing or does not match; 422 means the URLs do
  // not belong to the host being claimed. Both are worth reading in the log.
  throw new Error(`HTTP ${response.status} — ${(await response.text()).trim() || 'no body'}`);
}

try {
  await main();
} catch (error) {
  console.warn(`[indexnow] ping failed, continuing anyway: ${error.message}`);
}
