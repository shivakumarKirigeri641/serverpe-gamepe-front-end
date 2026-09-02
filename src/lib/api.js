/**
 * src/lib/api.js
 * ---------------------------------------------------------------------------
 * Facts the site reads from the back-end: company details, plans and policies.
 *
 * The point of fetching rather than hard-coding is that the page can never
 * claim something the product does not do. A price changed in the admin panel,
 * an address corrected, a policy rewritten — all appear here without a deploy,
 * and the site cannot drift out of step with the terms players actually
 * accepted.
 */

const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
const PUBLIC_PATH = '/serverpe/platform/mastipe/v1/public';

async function get(path) {
  const res = await fetch(`${API_BASE}${PUBLIC_PATH}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const payload = await res.json();
  return payload.data ?? payload;
}

export const api = {
  business: () => get('/business'),
  // Plan names, taglines and the word "Free" all differ by language, so the
  // language travels with the request rather than being patched on afterwards.
  plans: (lang = 'en') => get(`/plans?lang=${lang === 'hi' ? 'hi' : 'en'}`),
  // Logo, icons and social images. Fetched rather than committed here so the
  // mark is replaced in one place and every surface picks it up — this site,
  // the admin panel and the game board all read the same manifest.
  brand: () => get('/brand'),
  // Player comments an operator has approved for publication. Never all
  // feedback — only what was explicitly published from the admin panel.
  testimonials: () => get('/testimonials'),
  // The legal documents as data, rendered by this site at /policies. The words
  // stay in the database and stay editable in the admin panel; only the
  // address people see is ours rather than the API's.
  legal: (lang = 'en') => get(`/legal?lang=${lang === 'hi' ? 'hi' : 'en'}`),
  health: () => get('/health'),
};

/**
 * The policies live on this site, at /policies.
 *
 * They used to be served from the API host. A privacy policy on api.mastipe.in
 * reads as somebody else's document — an unfamiliar host, not the address on
 * our own stationery — and regulators, Meta and Razorpay all ask for a link on
 * the company's own domain. The words still come from the database.
 */
export const policiesUrl = '/policies';
export const policyUrl = (docKey) => `/policies/${docKey}`;

/**
 * The interactive how-to-play page, served by the back-end.
 *
 * Kept there rather than rebuilt here so there is one explanation of the rules,
 * not two that drift: the same page is what the bot sends when somebody asks
 * "how do I play" inside WhatsApp.
 */
export const demoUrl = (lang) =>
  `${API_BASE}${PUBLIC_PATH}/demo${lang === 'hi' ? '?lang=hi' : ''}`;

/**
 * Runs a fetch and falls back to a sensible default.
 *
 * A marketing page must render even when the API is down or still waking up —
 * a blank hero because a fetch failed is worse than slightly stale copy.
 */
export async function safe(fn, fallback) {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}
