/**
 * The footer.
 *
 * Company name, address and GSTIN come from the back-end rather than being
 * typed here — they are the details most likely to change and most costly to
 * get wrong, and they are legally required to be accurate.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND, waLink } from '../content.js';
import { useI18n } from '../i18n/index.jsx';
import { api, policiesUrl, safe } from '../lib/api.js';

export default function Footer({ business, brand }) {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  // Every policy listed by name, not one link called "policies". A reader
  // looking for the refund terms or the data deletion route should see it in
  // the footer and reach it in one tap — and Meta, Razorpay and the app stores
  // all ask for a direct link to a specific document rather than to an index.
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const rows = await safe(() => api.legal(lang), []);
      if (alive && Array.isArray(rows)) setDocs(rows);
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  const officer = business?.ownerName || 'Shivakumar K';
  const email = business?.supportEmail || 'support@mastipe.in';

  return (
    <footer className="bg-ink text-white/70 py-12">
      <div className="container-x">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="text-white font-extrabold text-xl">{BRAND.name}</div>
            {/* The brand's own line, from the back-end manifest — the same
                words that sit under the logo and in the link preview. The hero
                is free to say something more specific; this is the constant. */}
            <p className="text-sm mt-2 leading-relaxed">{brand?.tagline || t('hero.tagline')}</p>
            <a href={waLink('Hi')} data-cta="footer-button" className="btn-wa mt-4 !px-5 !py-2.5 !text-sm">
              {t('hero.cta')}
            </a>
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-3">{t('footer.company')}</div>
            {business ? (
              <address className="not-italic text-sm leading-relaxed">
                <div className="text-white/90">{business.legalName}</div>
                <div>{business.address.line1}</div>
                {business.address.line2 && <div>{business.address.line2}</div>}
                <div>
                  {business.address.city} {business.address.postalCode}
                </div>
                <div>
                  {business.address.state}, {business.address.country}
                </div>
                {business.gstin && <div className="mt-2">GSTIN: {business.gstin}</div>}
              </address>
            ) : (
              <p className="text-sm">ServerPe App Solutions</p>
            )}
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-3">{t('footer.getInTouch')}</div>
            <ul className="text-sm space-y-2">
              <li>
                <a href={`mailto:${business?.supportEmail || 'support@mastipe.in'}`} className="hover:text-white">
                  {business?.supportEmail || 'support@mastipe.in'}
                </a>
              </li>
              <li>
                <a href={waLink('Hi')} data-cta="footer-link" className="hover:text-white">
                  {t('footer.messageUs')}
                </a>
              </li>
              <li>
                <Link to={policiesUrl} className="hover:text-white">
                  {t('footer.policies')}
                </Link>
              </li>
              <li>
                <a href="https://quizpe.in" target="_blank" rel="noopener" className="hover:text-white">
                  {t('footer.quizpe')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-3">{t('footer.legal')}</div>
            <ul className="text-sm space-y-2">
              {docs.map((d) => (
                <li key={d.key}>
                  <Link to={`/policies/${d.key}`} className="hover:text-white">
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Named, contactable, and on the page rather than buried in a
            document — which is what the IT Rules 2021 actually require. */}
        <div className="border-t border-white/10 mt-9 pt-6 text-xs leading-relaxed">
          <div className="text-white font-bold text-sm mb-2">{t('footer.grievanceTitle')}</div>
          <p className="text-white/60 max-w-3xl">{t('footer.grievanceBody')}</p>
          <address className="not-italic mt-2 text-white/70">
            <div>{officer}</div>
            <div>
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </div>
            {business && (
              <div className="text-white/50">
                {business.address.city} {business.address.postalCode}, {business.address.state}
              </div>
            )}
          </address>
          <p className="mt-3 text-white/50">{t('footer.deleteData', { email })}</p>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 text-xs leading-relaxed">
          <p className="text-white/50">
            © {year} {business?.legalName || 'ServerPe App Solutions'}. {t('footer.rights')}{' '}
            {t('footer.trademark', { company: business?.legalName || 'ServerPe App Solutions' })}
          </p>
          <p className="mt-3 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
              text-[11px] font-extrabold uppercase tracking-[0.12em]
              bg-red-500/15 text-red-300 border border-red-400/30">
              {t('entertainment.pill')}
            </span>
          </p>
          <p className="mt-2 text-white/40 max-w-3xl">
            {t('footer.disclaimer', { company: business?.legalName || 'ServerPe App Solutions' })}
          </p>
          <p className="mt-2 text-white/40">{t('footer.whatsappNote')}</p>
          <p className="mt-2 text-white/40">
            {t('footer.report', { email: business?.supportEmail || 'support@mastipe.in' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
