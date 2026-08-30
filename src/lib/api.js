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
  plans: () => get('/plans'),
  health: () => get('/health'),
};

export const policiesUrl = `${API_BASE}${PUBLIC_PATH}/policies`;

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
