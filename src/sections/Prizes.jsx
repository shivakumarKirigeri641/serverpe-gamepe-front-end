import Reveal from '../components/Reveal.jsx';
import { useI18n, useT } from '../i18n/index.jsx';
import { demoUrl } from '../lib/api.js';

export default function Prizes() {
  const t = useT();
  const { lang } = useI18n();
  const prizes = t('prizes.items');

  return (
    <section id="prizes" className="py-16 sm:py-20 bg-white">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t('prizes.eyebrow')}</span>
          <h2 className="h2 mt-4">{t('prizes.title')}</h2>
          <p className="lede mt-3">{t('prizes.lede')}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {prizes.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="card p-5 flex items-start gap-4 h-full">
                <div className="w-9 h-9 shrink-0 rounded-full bg-gold/20 text-brand grid place-items-center font-extrabold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-extrabold">{p.name}</h3>
                  <p className="text-muted text-sm mt-1">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-sm text-muted max-w-xl mx-auto">{t('prizes.note')}</p>

          {/* A prize is a shape on a ticket, and a sentence is a poor way to
              draw one. The demo shows the squares each prize needs. */}
          <div className="text-center mt-6">
            <a href={demoUrl(lang)} target="_blank" rel="noreferrer" className="btn-ghost">
              {t('prizes.demoCta')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
