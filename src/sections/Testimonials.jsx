/**
 * What players said.
 *
 * Every word here was written by a real player after a real game and approved
 * one at a time in the admin panel — nothing is invented, and nothing reaches
 * this page automatically. That constraint is the reason the section renders
 * nothing at all when there is nothing approved: an empty testimonials strip,
 * or worse a placeholder quote, would undermine the only thing testimonials are
 * for.
 *
 * Names are first names, captured when the operator approved the comment. No
 * phone numbers, no surnames, no photographs of people who never agreed to be
 * on a marketing page.
 */

import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { api, safe } from '../lib/api.js';
import { useT } from '../i18n/index.jsx';

const stars = (n) => '★'.repeat(Math.max(0, Math.min(5, n || 0)));

export default function Testimonials() {
  const t = useT();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const rows = await safe(api.testimonials, []);
      if (alive && Array.isArray(rows)) setItems(rows);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Nothing approved yet, or the API is unreachable: show nothing rather than
  // a gap with a heading over it.
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t('testimonials.eyebrow')}</span>
          <h2 className="h2 mt-4">{t('testimonials.title')}</h2>
          <p className="lede mt-3">{t('testimonials.lede')}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <figure className="card p-6 h-full flex flex-col">
                {item.rating > 0 && (
                  <div className="text-gold text-lg leading-none" aria-label={`${item.rating} out of 5`}>
                    {stars(item.rating)}
                  </div>
                )}
                <blockquote className="mt-3 text-ink/90 leading-relaxed grow">
                  “{item.comment}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-extrabold text-brand">
                  {item.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
