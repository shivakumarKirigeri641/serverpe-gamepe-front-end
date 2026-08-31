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
 * Turns the flat plan list into one row per room size.
 *
 * Keyed off maxPlayers rather than the plan key, so a band added or renamed in
 * the admin panel appears here without a deploy. A size with only one of the
 * two products still gets a row, with the missing cell left blank.
 */
function toRows(plans) {
  const rows = new Map();
  for (const p of plans) {
    const kind = p.key?.startsWith('single_') ? 'single' : p.key?.startsWith('unlimited_') ? 'pass' : null;
    if (!kind || !p.maxPlayers) continue;
    const row = rows.get(p.maxPlayers) ?? { players: p.maxPlayers };
    // listPrice is the real price; `price` reads "Free" while the trial runs.
    row[kind] = p.listPrice || p.price;
    row[`${kind}Paise`] = p.pricePaise;
    rows.set(p.maxPlayers, row);
  }
  return [...rows.values()].sort((a, b) => a.players - b.players);
}

/** How much cheaper a day of games is than buying two single games. */
function saving(row) {
  if (!row.singlePaise || !row.passPaise) return null;
  const two = row.singlePaise * 2;
  const pct = Math.round(((two - row.passPaise) / two) * 100);
  return pct >= 5 ? pct : null;
}

/**
 * The trial's end date, in the reader's language.
 *
 * The back-end sends both the raw instant and an English label; formatting the
 * instant here is what lets the Hindi page say the date in Hindi. The label is
 * the fallback for a browser with no ICU data for hi-IN.
 */
function trialDate(trial, lang) {
  if (!trial?.endsAt) return trial?.label ?? null;
  try {
    return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-GB', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'long',
    }).format(new Date(trial.endsAt));
  } catch {
    return trial.label ?? null;
  }
}

export default function Pricing({ plans, business }) {
  const { t, lang } = useI18n();
  const trialInfo = business?.trial ?? null;
  const trialDay = trialDate(trialInfo, lang);
  const trial = plans.find((p) => p.key === 'free_trial' && p.available);
  const rows = toRows(plans);

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

        {rows.length > 0 && (
          <Reveal className="mt-10">
            <div className="card max-w-2xl mx-auto overflow-hidden">
              <div className="p-6 pb-3 text-center">
                <h3 className="font-extrabold text-lg">{t('pricing.tableTitle')}</h3>
                <p className="text-muted text-sm mt-1">{t('pricing.tableSub')}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted">
                      <th className="font-semibold px-6 py-2">{t('pricing.colPlayers')}</th>
                      <th className="font-semibold px-3 py-2 text-right">{t('pricing.colSingle')}</th>
                      <th className="font-semibold px-6 py-2 text-right">{t('pricing.colPass')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => {
                      const pct = saving(r);
                      return (
                        <tr key={r.players} className="border-t border-line">
                          <td className="px-6 py-2.5 font-semibold">{t('pricing.upTo', { n: r.players })}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums">{r.single ?? '—'}</td>
                          <td className="px-6 py-2.5 text-right tabular-nums">
                            <span className="font-bold">{r.pass ?? '—'}</span>
                            {pct && (
                              <span className="block text-[11px] font-bold text-good">
                                {t('pricing.save', { n: pct })}
                              </span>
                            )}
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
