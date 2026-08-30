/**
 * src/i18n/index.jsx
 * ---------------------------------------------------------------------------
 * Two languages for the marketing site.
 *
 * Deliberately not a library. The site is one page with a fixed set of strings,
 * so a dictionary and a context give everything i18next would — with none of
 * the bundle, the async loading, or the flash of untranslated content that
 * would show on the one screen a visitor actually judges us on.
 *
 * What is NOT translated, in either direction: the brand name, the company
 * name, the support address, the GSTIN, and the WhatsApp product name. Those
 * are identifiers a person has to recognise or type exactly; transliterating
 * them would make them wrong, not friendlier.
 *
 * The choice is remembered in localStorage, so a returning visitor is not asked
 * twice. A first-time visitor is asked once, on the landing page.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en } from './en.js';
import { hi } from './hi.js';

const DICTS = { en, hi };
const KEY = 'mastipe.lang';

const I18nContext = createContext(null);

/** Reads a dotted path out of a dictionary. */
function lookup(dict, path) {
  return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), dict);
}

export function I18nProvider({ children }) {
  // `null` means "not chosen yet", which is what the popup keys off. Distinct
  // from 'en', so someone who deliberately picked English is not asked again.
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      return saved === 'en' || saved === 'hi' ? saved : null;
    } catch {
      // Private windows and blocked site data throw here. Falling through to
      // null just means the chooser shows; nothing breaks.
      return null;
    }
  });

  const choose = useCallback((next) => {
    setLang(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Not being able to remember the choice is survivable; ignoring it is
      // better than an error dialog over the landing page.
    }
  }, []);

  // Until a choice is made the page renders in English underneath the chooser.
  const active = lang ?? 'en';

  useEffect(() => {
    document.documentElement.lang = active;
  }, [active]);

  const value = useMemo(() => {
    const dict = DICTS[active];

    /**
     * Falls back to English per key rather than per language, so a string added
     * to en.js before it is translated shows in English instead of showing the
     * key itself to a visitor.
     */
    const t = (path, vars) => {
      const raw = lookup(dict, path) ?? lookup(en, path);
      if (raw === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] missing string: ${path}`);
        return path;
      }
      if (typeof raw === 'function') return raw(vars);
      if (vars && typeof raw === 'string') {
        return raw.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
      }
      return raw;
    };

    return { lang: active, chosen: lang !== null, choose, t, isHindi: active === 'hi' };
  }, [active, lang, choose]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}

/** Shorthand for the common case. */
export function useT() {
  return useI18n().t;
}
