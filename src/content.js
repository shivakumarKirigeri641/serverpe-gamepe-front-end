/**
 * src/content.js
 * ---------------------------------------------------------------------------
 * Constants that are the same in every language.
 *
 * The prose moved to src/i18n once the site became bilingual. What is left is
 * the things that do not translate: the WhatsApp number, the brand name, and
 * the link helper. Keeping a second English copy of the copy here would mean
 * two sources for one sentence, and the one nobody remembers to edit is the one
 * that eventually ships.
 *
 * Anything factual about the company, the prices or the terms is fetched from
 * the back-end instead — see lib/api.js.
 */

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919739622631';
export const WHATSAPP_DISPLAY = '+91 97396 22631';

/** Opens WhatsApp with the first message already typed. */
export const waLink = (text = 'Hi') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const BRAND = {
  // Never translated or transliterated: it is the name on the WhatsApp account
  // people are messaging.
  name: 'MastiPe',
};

