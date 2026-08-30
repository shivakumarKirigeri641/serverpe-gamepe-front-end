/**
 * The footer.
 *
 * Company name, address and GSTIN come from the back-end rather than being
 * typed here — they are the details most likely to change and most costly to
 * get wrong, and they are legally required to be accurate.
 */

import { BRAND, waLink } from '../content.js';
import { useI18n } from '../i18n/index.jsx';
import { policiesUrl } from '../lib/api.js';

export default function Footer({ business, brand }) {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70 py-12">
      <div className="container-x">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="text-white font-extrabold text-xl">{BRAND.name}</div>
            <p className="text-sm mt-2 leading-relaxed">{t('hero.tagline')}</p>
            <a href={waLink('Hi')} className="btn-wa mt-4 !px-5 !py-2.5 !text-sm">
              Play on WhatsApp
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
                <a href={waLink('Hi')} className="hover:text-white">
                  {t('footer.messageUs')}
                </a>
              </li>
              <li>
                <a href={`${policiesUrl}?lang=${lang}`} target="_blank" rel="noopener" className="hover:text-white">
                  {t('footer.policies')}
                </a>
              </li>
              <li>
                <a href="https://quizpe.in" target="_blank" rel="noopener" className="hover:text-white">
                  {t('footer.quizpe')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-9 pt-6 text-xs leading-relaxed">
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
