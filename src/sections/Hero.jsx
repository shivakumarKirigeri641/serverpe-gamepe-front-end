/**
 * The hero.
 *
 * One decision, one button: message us on WhatsApp. Everything else on the page
 * exists to answer an objection to that single action, so the hero does not
 * compete with itself by offering a second call to action.
 *
 * The ticket beside it is a real 3×9 housie layout with real column banding,
 * because a fake-looking ticket undermines the one thing the product must be
 * trusted to get right.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { BRAND, waLink } from '../content.js';
import EntertainmentOnly from '../components/EntertainmentOnly.jsx';
import { useT } from '../i18n/index.jsx';

// A genuine ticket: three rows of five, columns banded 1-9, 10-19 … 80-90.
const TICKET = [
  [4, null, 23, null, 45, null, 61, null, 88],
  [null, 17, 26, 34, null, 52, null, 79, null],
  [8, null, null, 38, 41, 57, 66, null, 90],
];
const CALLED = new Set([17, 26, 45, 61, 88, 8]);
const LATEST = 45;

function Ticket({ brand }) {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <div className="bg-white rounded-3xl shadow-lift overflow-hidden max-w-sm w-full">
      <div className="bg-gradient-to-br from-brand to-brand-deep text-white px-4 py-3 flex items-center justify-between">
        {brand?.primary?.markLight ? (
          <span className="flex items-center gap-2">
            <img src={brand.primary.markLight} alt="" className="h-5 w-auto" aria-hidden="true" />
            <span className="font-extrabold tracking-wide">{BRAND.name}</span>
          </span>
        ) : (
          <span className="font-extrabold tracking-wide">{BRAND.name}</span>
        )}
        <span className="text-xs opacity-90">{t('hero.ticketRoom')}</span>
      </div>

      <div className="p-3 grid grid-cols-9 gap-1.5">
        {TICKET.flat().map((n, i) => {
          const called = n !== null && CALLED.has(n);
          const latest = n === LATEST;
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.012, duration: 0.3 }}
              className={`aspect-square rounded-lg grid place-items-center text-[13px] sm:text-sm font-bold tabular-nums
                ${n === null ? 'bg-line/50' : latest ? 'bg-gold text-[#3a2a00]' : called ? 'bg-good text-white' : 'bg-white border border-line text-ink'}`}
            >
              {n ?? ''}
            </motion.div>
          );
        })}
      </div>

      <div className="px-4 pb-4 flex items-center justify-between text-[11px] text-muted">
        <span>{t('hero.ticketMarked')}</span>
        <span>{t('hero.ticketCalled')}</span>
      </div>

      <div className="border-t border-line px-4 py-3 flex items-center gap-2">
        <span className="text-2xl font-extrabold text-brand tabular-nums">45</span>
        <span className="text-sm text-muted italic">{t('hero.ticketNick')}</span>
      </div>
    </div>
  );
}

export default function Hero({ brand }) {
  const t = useT();

  return (
    <section id="top" className="pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <EntertainmentOnly />
            <span className="eyebrow">{t('hero.eyebrow')}</span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-brand leading-[1.08]">
            {t('hero.tagline')}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-ink/80 font-medium">{t('hero.title')}</p>
          <p className="mt-3 lede">{t('hero.sub')}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={waLink('Hi')} data-cta="hero" className="btn-wa">
              {t('hero.cta')}
            </a>
            <a href="#how" className="btn-ghost">
              {t('hero.secondary')}
            </a>
          </div>

          <p className="mt-5 text-sm text-muted">{t('hero.reassure')}</p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Ticket brand={brand} />
        </div>
      </div>
    </section>
  );
}
