/**
 * Pricing.
 *
 * The plans come from the back-end, so a price edited in the admin panel is
 * live here immediately — and the site can never advertise a plan the product
 * would refuse to sell.
 *
 * There are eight room sizes and two ways to buy each, which as cards was
 * seventeen boxes of near-identical text: nobody reads that, they just feel
 * the page is complicated. It is really one small table — sizes down the side,
 * the two choices across the top — and the only thing that deserves a card is
 * the one plan you can actually take today, the free trial.
 */

import Reveal from '../components/Reveal.jsx';
import { waLink } from '../content.js';
import { policiesUrl } from '../lib/api.js';
import EntertainmentOnly from '../components/EntertainmentOnly.jsx';
import { useI18n } from '../i18n/index.jsx';

/**
 * The day passes, cheapest band first.
 *
 * Only the 24-hour passes: MastiPe does not charge per game, and listing a
 * per-game price beside a day pass invites the reader to work out whether two
 * games are cheaper separately. One price, one decision.
 *
 * Read from the API rather than written here, so a price changed in the admin
 * panel is live on the site with no deploy, and the page can never advertise
 * something the product would refuse to sell.
 */
function dayPasses(plans) {
  return plans
    .filter((p) => p.key?.startsWith('unlimited_') && p.maxPlayers)
    .sort((a, b) => a.maxPlayers - b.maxPlayers);
}

/**
 * What one seat costs at the top of the band.
 *
 * The honest denominator is the band's maximum: it is what the buyer is paying
 * for, and quoting anything lower would flatter the number.
 */
function perPlayer(plan) {
  if (!plan.pricePaise || !plan.maxPlayers) return null;
  // Divided in paise and rounded as an integer: ₹509 across 200 players is
  // 254.5 paise, and toFixed on the float form rounds it down to ₹2.54.
  const paise = Math.round(plan.pricePaise / plan.maxPlayers);
  return `₹${(paise / 100).toFixed(2)}`;
}

/** `₹1,009` — Indian grouping, which the API's plain string does not carry. */
function rupees(plan) {
  if (typeof plan.pricePaise !== 'number') return plan.listPrice;
  return `₹${(plan.pricePaise / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export default function Pricing({ plans, business }) {
  const { t, lang } = useI18n();
  const trialInfo = business?.trial ?? null;
  const trialDay = trialDate(trialInfo, lang);
  const trial = plans.find((p) => p.key === 'free_trial' && p.available);
  const rows = dayPasses(plans);

  // Band names are marketing copy, so they live in the dictionaries and
  // translate; the prices and player counts come from the API.
  const names = t('pricing.bands') || {};
  const bandName = (max) => names[max] || `${max}`;

  // Prices appear only once the free trial has ended. Until the API answers,
  // assume the trial is running: showing a price list for a moment and then
  // hiding it is worse than showing it a moment late.
  const showPrices = Boolean(trialInfo?.over);

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

          {/* The date comes from FREE_TRIAL_ENDS_AT via the API, so extending
              the trial in .env moves this line with no deploy here. */}
          {trialDay && (
            <p className="mt-4 inline-block rounded-full bg-good/10 text-good font-extrabold text-sm px-4 py-2">
              {trialInfo?.over ? t('pricing.trialOver') : t('pricing.trialUntil', { date: trialDay })}
            </p>
          )}
        </Reveal>

        {/* The only thing on offer today, so it gets the only card. */}
        {trial && (
          <Reveal className="mt-10">
            <div className="card p-7 sm:p-8 max-w-2xl mx-auto border-2 border-brand relative text-center">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 eyebrow bg-brand text-white whitespace-nowrap">
                {t('pricing.availableNow')}
              </span>
              <h3 className="font-extrabold text-2xl text-brand mt-2">{trial.name}</h3>
              <div className="text-5xl font-extrabold mt-2">{trial.price}</div>
              <p className="text-muted text-sm mt-3 leading-relaxed">{trial.tagline}</p>
              <a href={waLink('Hi')} className="btn-wa mt-6">
                {t('pricing.start')}
              </a>
            </div>
          </Reveal>
        )}

        {/* While the trial runs there is nothing to buy, so the price list is
            not shown: a table of prices beside "it's free" only invites the
            reader to work out what they will owe later, which is not the
            decision this page is asking them to make. It reappears by itself
            the day the trial ends — the date is the one in the admin panel. */}
        {showPrices && rows.length > 0 && (
          <Reveal className="mt-10">
            <div className="card max-w-3xl mx-auto overflow-hidden">
              <div className="p-6 pb-3 text-center">
                <h3 className="font-extrabold text-lg">{t('pricing.tableTitle')}</h3>
                <p className="text-muted text-sm mt-1">{t('pricing.tableSub')}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted border-b border-line">
                      <th className="font-semibold px-6 py-2">{t('pricing.colBand')}</th>
                      <th className="font-semibold px-3 py-2">{t('pricing.colPlayers')}</th>
                      <th className="font-semibold px-3 py-2 text-right">{t('pricing.colPrice')}</th>
                      <th className="font-semibold px-6 py-2 text-right">
                        {t('pricing.colPerPlayer')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((p) => {
                      // One band is marked, because a list of eight prices with
                      // nothing recommended is a decision handed back to the reader.
                      const popular = p.maxPlayers === 50;
                      return (
                        <tr
                          key={p.key}
                          className={`border-t border-line ${popular ? 'bg-gold/10' : ''}`}
                        >
                          <td className="px-6 py-2.5 font-semibold whitespace-nowrap">
                            {popular && <span className="text-gold mr-1">★</span>}
                            {bandName(p.maxPlayers)}
                            {popular && (
                              <span className="ml-2 text-[11px] font-extrabold text-gold uppercase">
                                {t('pricing.popular')}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 tabular-nums whitespace-nowrap">
                            {p.minPlayers || 1}–{p.maxPlayers}
                          </td>
                          <td className="px-3 py-2.5 text-right tabular-nums font-bold">
                            {rupees(p)}
                          </td>
                          <td className="px-6 py-2.5 text-right tabular-nums text-muted">
                            {perPlayer(p) ?? '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="px-6 py-4 text-xs text-muted leading-relaxed border-t border-line">
                {t('pricing.gstNote')}
              </p>
            </div>
          </Reveal>
        )}

        {!showPrices && (
          <Reveal className="mt-10">
            <div className="card max-w-2xl mx-auto p-8 text-center border-2 border-good/40 bg-good/5">
              <span className="eyebrow bg-good/15 text-good">{t('pricing.freeBadge')}</span>
              <h3 className="h2 mt-4 !text-2xl sm:!text-3xl">
                {trialDay ? t('pricing.freeTitle', { date: trialDay }) : t('pricing.title')}
              </h3>
              <p className="text-muted mt-3 leading-relaxed">{t('pricing.freeBody')}</p>
              <a href={waLink('Hi')} className="btn-wa mt-6">
                {t('pricing.start')}
              </a>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-8">
          <div className="card p-6 max-w-2xl mx-auto bg-gold/5 border-gold/40">
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
