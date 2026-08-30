/**
 * Pricing.
 *
 * The plans come from the back-end, so a price edited in the admin panel is
 * live here immediately — and the site can never advertise a plan the product
 * would refuse to sell. Plans not yet available are shown as "coming soon"
 * rather than hidden, because saying what is coming is part of the pitch.
 */

import Reveal from '../components/Reveal.jsx';
import { waLink } from '../content.js';
import { policiesUrl } from '../lib/api.js';
import EntertainmentOnly from '../components/EntertainmentOnly.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function Pricing({ plans }) {
  const { t, lang } = useI18n();
  const available = plans.filter((p) => p.available);
  const soon = plans.filter((p) => !p.available);

  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="eyebrow">{t('pricing.eyebrow')}</span>
            <EntertainmentOnly size="sm" />
          </div>
          <h2 className="h2 mt-4">{t('pricing.title')}</h2>
          <p className="lede mt-3">{t('pricing.sub')}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {available.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.07}>
              <div className="card p-7 h-full border-2 border-brand relative">
                <span className="absolute -top-3 left-6 eyebrow bg-brand text-white">{t('pricing.availableNow')}</span>
                <h3 className="font-extrabold text-2xl text-brand mt-2">{p.name}</h3>
                <div className="text-4xl font-extrabold mt-3">{p.price}</div>
                <p className="text-muted text-sm mt-3 leading-relaxed">{p.tagline}</p>
                <p className="text-sm mt-4">
                  <strong>{t('pricing.upTo', { n: p.maxPlayers })}</strong> {t('pricing.perGame')}
                </p>
                <a href={waLink('Hi')} className="btn-wa w-full mt-6">
                  {t('pricing.start')}
                </a>
              </div>
            </Reveal>
          ))}

          {soon.map((p, i) => (
            <Reveal key={p.key} delay={(available.length + i) * 0.07}>
              <div className="card p-7 h-full opacity-75">
                <span className="eyebrow bg-line text-muted">{t('pricing.comingSoon')}</span>
                <h3 className="font-extrabold text-2xl mt-3">{p.name}</h3>
                <div className="text-4xl font-extrabold mt-3 text-muted">{p.price}</div>
                <p className="text-muted text-sm mt-3 leading-relaxed">{p.tagline}</p>
                <p className="text-sm mt-4 text-muted">
                  <strong>{t('pricing.upTo', { n: p.maxPlayers })}</strong> {t('pricing.perGame')}
                </p>
                <button className="btn-ghost w-full mt-6 cursor-default" disabled>
                  {t('pricing.notYet')}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="card p-6 max-w-3xl mx-auto bg-gold/5 border-gold/40">
            <h3 className="font-extrabold text-lg">{t('pricing.creditsTitle')}</h3>
            <p className="text-muted text-sm mt-2 leading-relaxed">{t('pricing.creditsBody')}</p>
            <a
              href={`${policiesUrl}?lang=${lang}`}
              target="_blank"
              rel="noopener"
              className="text-sm font-bold text-brand hover:underline mt-3 inline-block"
            >
              {t('pricing.readPolicy')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
