import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { useT } from '../i18n/index.jsx';

export default function Faq() {
  const t = useT();
  const items = t('faq.items');

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="container-x max-w-3xl">
        <Reveal className="text-center">
          <span className="eyebrow">{t('faq.eyebrow')}</span>
          <h2 className="h2 mt-4">{t('faq.title')}</h2>
        </Reveal>

        <div className="mt-8 space-y-3">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <div className="card overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-bold">{item.q}</span>
                  <span className="text-brand text-xl shrink-0">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <p className="px-5 pb-5 text-muted text-sm leading-relaxed">{item.a}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
