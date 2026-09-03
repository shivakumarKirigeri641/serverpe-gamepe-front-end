/**
 * The six prizes.
 *
 * A prize is a shape on a ticket, and a sentence is a poor way to draw one:
 * "the four corner numbers" is clear only to someone who already knows. So the
 * section leads with a real ticket that lights up the squares each prize needs,
 * cycling through all six on its own, and every card carries the same shape in
 * miniature beside its explanation.
 *
 * The ticket is the layout the game board and the WhatsApp demo both use, so
 * somebody who saw it there recognises it here.
 */

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { demoUrl } from '../lib/api.js';

// A genuine 3x9 housie ticket: fifteen numbers, five per row, columns banded.
const TICKET = [
  [4, null, 23, null, 45, null, 61, null, 88],
  [null, 17, 26, 34, null, 52, null, 79, null],
  [8, null, null, 38, 41, 57, 66, null, 90],
];

const ALL = TICKET.flatMap((row, r) =>
  row.map((v, c) => (v === null ? null : [r, c])).filter(Boolean),
);

/**
 * The squares each prize needs, in the order the prize list is written.
 *
 * Positional rather than keyed, because the copy lives in the dictionaries and
 * the shapes do not translate — the sixth prize is Full House in every
 * language. Keep the two lists in the same order.
 */
const SHAPES = [
  { cells: [[0, 0], [0, 2], [1, 1], [1, 2], [2, 0]], anyFive: true },
  { cells: [[0, 0], [0, 2], [0, 4], [0, 6], [0, 8]] },
  { cells: [[1, 1], [1, 2], [1, 3], [1, 5], [1, 7]] },
  { cells: [[2, 0], [2, 3], [2, 4], [2, 5], [2, 6]] },
  { cells: [[0, 0], [0, 8], [2, 0], [2, 8]] },
  { cells: ALL },
];

const key = (r, c) => `${r}:${c}`;

/** The small diagram on each card: dots, with this prize's squares in gold. */
function MiniTicket({ cells }) {
  const on = new Set(cells.map(([r, c]) => key(r, c)));
  return (
    <div className="grid grid-cols-9 gap-[2px] shrink-0" aria-hidden="true">
      {TICKET.map((row, r) =>
        row.map((v, c) => (
          <span
            key={key(r, c)}
            className={`w-[7px] h-[7px] rounded-[2px] ${
              v === null ? 'bg-line/40' : on.has(key(r, c)) ? 'bg-gold' : 'bg-line'
            }`}
          />
        )),
      )}
    </div>
  );
}

/** The full-size ticket, lighting up whichever prize is selected. */
function PrizeTicket({ shape }) {
  const reduce = useReducedMotion();
  const on = new Set(shape.cells.map(([r, c]) => key(r, c)));

  return (
    <div className="bg-white rounded-2xl border border-line shadow-soft p-3 grid grid-cols-9 gap-1.5 max-w-sm w-full">
      {TICKET.map((row, r) =>
        row.map((v, c) => {
          const lit = v !== null && on.has(key(r, c));
          return (
            <motion.div
              key={key(r, c)}
              // Squares light in sequence rather than all together, so the eye
              // follows the shape being drawn instead of seeing a block flash.
              animate={reduce ? {} : { scale: lit ? [1, 1.14, 1] : 1 }}
              transition={{ duration: 0.4, delay: lit ? (r * 9 + c) * 0.025 : 0 }}
              className={`aspect-square rounded-lg grid place-items-center text-[13px] sm:text-sm font-bold tabular-nums transition-colors duration-300
                ${
                  v === null
                    ? 'bg-line/50'
                    : lit
                      ? 'bg-gold text-[#3a2a00]'
                      : 'bg-white border border-line text-ink/40'
                }`}
            >
              {v ?? ''}
            </motion.div>
          );
        }),
      )}
    </div>
  );
}

export default function Prizes() {
  const { t, lang } = useI18n();
  const prizes = t('prizes.items');
  const [active, setActive] = useState(0);
  // Stops the carousel once somebody picks a prize themselves: continuing to
  // rotate under their finger would be the page arguing with them.
  const [held, setHeld] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (held || reduce) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % prizes.length), 2600);
    return () => clearInterval(id);
  }, [held, reduce, prizes.length]);

  const shape = SHAPES[active] ?? SHAPES[0];
  const current = prizes[active] ?? prizes[0];

  const select = (i) => {
    setActive(i);
    setHeld(true);
  };

  return (
    <section id="prizes" className="py-16 sm:py-20 bg-white">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t('prizes.eyebrow')}</span>
          <h2 className="h2 mt-4">{t('prizes.title')}</h2>
          <p className="lede mt-3">{t('prizes.lede')}</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <div className="flex justify-center lg:justify-end">
              <PrizeTicket shape={shape} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">
                {t('prizes.showing')}
              </p>
              <h3 className="font-extrabold text-2xl text-brand mt-1">{current.name}</h3>
              <p className="text-muted mt-2 leading-relaxed">
                {shape.anyFive ? t('prizes.anyFive') : current.body}
              </p>

              <div className="flex flex-wrap gap-2 mt-5" role="tablist">
                {prizes.map((p, i) => (
                  <button
                    key={p.name}
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => select(i)}
                    className={`text-sm font-bold rounded-full px-4 py-2 border-2 transition ${
                      i === active
                        ? 'bg-brand text-white border-brand'
                        : 'bg-white text-ink/70 border-line hover:border-brand'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted mt-3">{t('prizes.tapPrize')}</p>
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {prizes.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <button
                onClick={() => select(i)}
                className={`card p-5 flex items-start gap-4 h-full w-full text-left transition ${
                  i === active ? 'border-brand ring-2 ring-brand/20' : 'hover:border-brand/50'
                }`}
              >
                <div className="shrink-0 pt-1">
                  <MiniTicket cells={SHAPES[i]?.cells ?? []} />
                </div>
                <div>
                  <h3 className="font-extrabold">{p.name}</h3>
                  <p className="text-muted text-sm mt-1">{p.body}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-sm text-muted max-w-xl mx-auto">{t('prizes.note')}</p>

          <div className="text-center mt-6">
            <a href={demoUrl(lang)} data-cta="demo-prizes" target="_blank" rel="noreferrer" className="btn-ghost">
              {t('prizes.demoCta')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
