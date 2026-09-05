/**
 * The two games.
 *
 * This section exists because the site now has to answer a question it never
 * had before: which one? Until Tap Bakra there was one game and the hero could
 * simply describe it. Two games with one shared "Play on WhatsApp" button
 * would leave a visitor guessing what they were about to get.
 *
 * So the cards are deliberately unalike. Tambola is the long, social one you
 * plan an evening around; Tap Bakra is sixty seconds on your own. Making them
 * look the same would be the design equivalent of averaging them.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { waLink } from '../content.js';
import { useT } from '../i18n/index.jsx';

/** A tiny 3×9 fragment — enough to read as a housie ticket at a glance. */
function TicketMotif() {
  const cells = [
    [7, null, 24, null, 46, null, 63, null, 81],
    [null, 15, null, 38, 41, null, 68, 72, null],
  ];
  const marked = new Set([24, 46, 15, 68]);
  return (
    <div className="grid grid-cols-9 gap-1" aria-hidden="true">
      {cells.flat().map((n, i) => (
        <span
          key={i}
          className={`aspect-square rounded-[4px] grid place-items-center text-[10px] font-bold ${
            n === null
              ? 'bg-white/10'
              : marked.has(n)
                ? 'bg-gold text-brand-deep'
                : 'bg-white/85 text-ink'
          }`}
        >
          {n ?? ''}
        </span>
      ))}
    </div>
  );
}

/** Three option buttons mid-question, one of them the trap. */
function TapMotif({ labels }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      <p className="text-center text-[11px] font-extrabold tracking-wide text-white/70">
        {labels.instruction}
      </p>
      {labels.options.map((o, i) => (
        <div
          key={o}
          className={`rounded-lg py-2 text-center text-xs font-extrabold ${
            i === 1
              ? 'bg-gold text-brand-deep'
              : 'bg-white/10 text-white/85 border border-white/15'
          }`}
        >
          {o}
        </div>
      ))}
    </div>
  );
}

export default function Games() {
  const t = useT();
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.5, delay },
        };

  const cards = [
    {
      key: 'tambola',
      motif: <TicketMotif />,
      bg: 'from-brand to-brand-deep',
      badge: t('games.tambola.badge'),
      title: t('games.tambola.title'),
      lede: t('games.tambola.lede'),
      points: t('games.tambola.points'),
      cta: t('games.tambola.cta'),
      href: waLink('Hi'),
      dataCta: 'game-tambola',
    },
    {
      key: 'bakra',
      motif: (
        <TapMotif
          labels={{
            instruction: t('games.bakra.motifInstruction'),
            options: t('games.bakra.motifOptions'),
          }}
        />
      ),
      bg: 'from-ink to-[#0e141c]',
      badge: t('games.bakra.badge'),
      title: t('games.bakra.title'),
      lede: t('games.bakra.lede'),
      points: t('games.bakra.points'),
      cta: t('games.bakra.cta'),
      href: waLink('Hi'),
      dataCta: 'game-bakra',
    },
  ];

  return (
    <section id="games" className="py-20 bg-white">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t('games.eyebrow')}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            {t('games.title')}
          </h2>
          <p className="mt-3 text-muted">{t('games.lede')}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <motion.article
              key={c.key}
              {...rise(i * 0.08)}
              className="card overflow-hidden flex flex-col"
            >
              <div className={`bg-gradient-to-br ${c.bg} p-6`}>
                <span className="inline-block text-[10px] font-extrabold tracking-[0.14em] uppercase text-gold-light">
                  {c.badge}
                </span>
                <div className="mt-4">{c.motif}</div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-extrabold text-ink tracking-tight">{c.title}</h3>
                <p className="mt-2 text-muted">{c.lede}</p>

                <ul className="mt-5 space-y-2 text-sm">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-ink/80">
                      <span className="text-good font-bold" aria-hidden="true">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={c.href}
                  data-cta={c.dataCta}
                  className="btn-wa mt-6 w-full"
                >
                  {c.cta}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/*
          Said once, plainly, under both cards rather than inside each: it
          applies to the whole product, and repeating it twice on one screen
          starts to read as protesting too much.
        */}
        <p className="mt-8 text-center text-sm text-muted">{t('games.footnote')}</p>
      </div>
    </section>
  );
}
