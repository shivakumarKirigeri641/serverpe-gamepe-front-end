import Reveal from '../components/Reveal.jsx';
import { useI18n, useT } from '../i18n/index.jsx';
import { demoUrl } from '../lib/api.js';

export default function HowItWorks() {
  const t = useT();
  const { lang } = useI18n();
  const steps = t('how.steps');

  return (
    <section id="how" className="py-16 sm:py-20 bg-white">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t('how.eyebrow')}</span>
          <h2 className="h2 mt-4">{t('how.title')}</h2>
          <p className="lede mt-3">{t('how.lede')}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-brand text-white grid place-items-center font-extrabold">
                  {i + 1}
                </div>
                <h3 className="font-extrabold text-lg mt-4">{s.title}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The four cards say what happens; people still ask what it looks
            like. The demo answers that without asking anyone to install
            anything, so it sits directly under the steps rather than in the
            footer where nobody scrolls. */}
        <Reveal delay={0.32}>
          <div className="card mt-8 p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <h3 className="font-extrabold text-lg">{t('how.demoTitle')}</h3>
            <p className="text-muted text-sm mt-2 leading-relaxed">{t('how.demoBody')}</p>
            <a
              href={demoUrl(lang)}
              target="_blank"
              rel="noreferrer"
              className="btn-brand mt-5"
            >
              {t('how.demoCta')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
