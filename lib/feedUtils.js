// Small, dependency-free RSS/XML reading helpers shared by any page that
// pulls live content from an external feed (News on the homepage, Job
// Listings). No eval()/new Function() anywhere — just regex-based tag
// extraction, since Node has no built-in XML parser and adding one as an
// npm dependency would mean editing package.json on every deploy.
//
// Deliberately tolerant of two different real-world feed quirks seen in
// production feeds this site uses:
//  - content wrapped in CDATA (one layer of real HTML, not entity-escaped)
//  - content that is NOT in CDATA but has its HTML entity-escaped, and in
//    at least one live feed, escaped TWICE (e.g. "&amp;amp;rsquo;" meaning
//    a literal apostrophe). decodeEntitiesFully() loops until stable so it
//    self-corrects for either case without needing a per-feed flag.

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’',
  mdash: '—', ndash: '–', hellip: '…'
};

export function decodeEntities(str) {
  return String(str)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => (NAMED_ENTITIES[name] !== undefined ? NAMED_ENTITIES[name] : m));
}

// Repeatedly decodes until the string stops changing (or a safety cap is
// hit), so single-encoded feeds resolve in one pass and double-encoded
// feeds still come out clean.
export function decodeEntitiesFully(str, maxPasses = 5) {
  let prev = String(str);
  for (let i = 0; i < maxPasses; i++) {
    const next = decodeEntities(prev);
    if (next === prev) break;
    prev = next;
  }
  return prev;
}

export function stripHtml(str) {
  return String(str).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Returns the (CDATA-unwrapped, trimmed) text of the FIRST matching tag.
export function extractTag(block, tag) {
  const re = new RegExp('<' + tag + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + tag + '>', 'i');
  const m = block.match(re);
  if (!m) return '';
  let inner = m[1];
  const cdataMatch = inner.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  if (cdataMatch) inner = cdataMatch[1];
  return inner.trim();
}

// Returns the text of EVERY matching tag in the block, in order (used for
// repeated tags like multiple <category> entries on one job).
export function extractTagAll(block, tag) {
  const out = [];
  const re = new RegExp('<' + tag + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + tag + '>', 'gi');
  let m;
  while ((m = re.exec(block))) {
    let inner = m[1];
    const cdataMatch = inner.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
    if (cdataMatch) inner = cdataMatch[1];
    out.push(inner.trim());
  }
  return out;
}

// Pulls out every <item>...</item> block regardless of what (if anything)
// wraps them — some feeds use a standard <rss><channel>, others just a
// bare <items> root with no channel metadata at all.
export function extractItems(xml) {
  const items = [];
  const re = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = re.exec(xml))) items.push(m[1]);
  return items;
}

// Fetches a feed URL with a timeout, returning the raw text or null on any
// failure (bad status, timeout, network error) — callers should always
// treat null as "this source is unavailable right now" and carry on with
// whatever other sources/fallback they have, never let one feed break a
// whole page build.
export async function fetchFeedXml(url, { timeoutMs = 8000, userAgent } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: userAgent ? { 'User-Agent': userAgent } : undefined
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.text();
  } catch (e) {
    clearTimeout(timeout);
    return null;
  }
}
