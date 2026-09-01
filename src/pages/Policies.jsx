/**
 * The policies, at mastipe.in/policies and mastipe.in/policies/<doc>.
 *
 * On our own domain, deliberately. A privacy policy served from an API
 * subdomain reads as somebody else's document — the host is unfamiliar, it is
 * not the address on our own stationery, and a link to an api. subdomain is
 * exactly the shape of thing people are taught not to click. The words are
 * still owned by the admin panel and still come from the database; only the
 * address changed.
 *
 * Each document is also its own URL, because that is what gets linked to: Meta,
 * Razorpay and the app stores all ask for a direct link to the privacy policy,
 * and "scroll down on this page" is not a link.
 */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api, safe } from '../lib/api.js';
import { BRAND, waLink } from '../content.js';
import { useI18n } from '../i18n/index.jsx';

/**
 * The stored text is plain paragraphs with the occasional bullet — not
 * markdown, and not HTML. Rendering it as text is therefore both correct and
 * the safe choice: nothing an operator types in the admin panel can become
 * markup on a public page.
 */
function Body({ text }) {
  const blocks = String(text || '')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim());
        const bullets = lines.every((l) => /^[•\-*]\s/.test(l));

        if (bullets) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5">
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^[•\-*]\s*/, '')}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export default function Policies() {
  const { doc } = useParams();
  const { t, lang } = useI18n();
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const rows = await safe(() => api.legal(lang), []);
      if (alive) setDocs(Array.isArray(rows) ? rows : []);
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  const current = doc ? docs?.find((d) => d.key === doc) : null;
  const missing = Boolean(doc) && docs !== null && !current;

  return (
    <div className="pt-24 pb-20">
      <Helmet>
        <title>
          {current ? current.title : t('policies.title')} — {BRAND.name}
        </title>
        <meta name="description" content={current?.summary || t('policies.lede')} />
        {/* One canonical address per document, so a link shared anywhere lands
            on the same URL rather than on a fragment of the index. */}
        <link
          rel="canonical"
          href={`https://mastipe.in/policies${doc ? `/${doc}` : ''}`}
        />
      </Helmet>

      <div className="container-x max-w-3xl">
        <nav className="text-sm mb-6">
          <Link to="/" className="text-brand font-bold hover:underline">
            ← {BRAND.name}
          </Link>
          {doc && (
            <>
              <span className="text-muted mx-2">/</span>
              <Link to="/policies" className="text-brand font-bold hover:underline">
                {t('policies.title')}
              </Link>
            </>
          )}
        </nav>

        {docs === null && <p className="text-muted">{t('policies.loading')}</p>}

        {missing && (
          <div className="card p-6">
            <h1 className="h2">{t('policies.missingTitle')}</h1>
            <p className="text-muted mt-3">{t('policies.missingBody')}</p>
            <Link to="/policies" className="btn-brand mt-6">
              {t('policies.all')}
            </Link>
          </div>
        )}

        {/* One document */}
        {current && (
          <article>
            <h1 className="h2">{current.title}</h1>
            {current.summary && <p className="lede mt-3">{current.summary}</p>}

            {current.translated === false && (
              <p className="text-xs text-muted mt-4 border-l-2 border-line pl-3">
                {t('policies.notTranslated')}
              </p>
            )}

            <div className="mt-8 text-ink/90">
              <Body text={current.body} />
            </div>

            <p className="text-xs text-muted mt-10 pt-6 border-t border-line">
              {t('policies.version', { n: current.version })}
            </p>
          </article>
        )}

        {/* The index */}
        {!doc && docs !== null && (
          <>
            <h1 className="h2">{t('policies.title')}</h1>
            <p className="lede mt-3">{t('policies.lede')}</p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {docs.map((d) => (
                <Link
                  key={d.key}
                  to={`/policies/${d.key}`}
                  className="card p-5 hover:border-brand/50 transition"
                >
                  <h2 className="font-extrabold">{d.title}</h2>
                  {d.summary && <p className="text-muted text-sm mt-1">{d.summary}</p>}
                </Link>
              ))}
            </div>

            <p className="text-sm text-muted mt-10">
              {t('policies.contact')}{' '}
              <a href={waLink('Hi')} className="text-brand font-bold hover:underline">
                WhatsApp
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
}
