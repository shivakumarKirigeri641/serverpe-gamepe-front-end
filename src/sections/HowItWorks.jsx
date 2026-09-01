import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { useI18n, useT } from '../i18n/index.jsx';
import { demoPosterUrl, demoUrl, demoVideoUrl } from '../lib/api.js';

export default function HowItWorks() {
  const t = useT();
  const { lang } = useI18n();

  // Starts in the language the page is being read in, and is then the
  // viewer's to change: plenty of people read Hindi and prefer an English
  // voiceover, or the reverse, and that is not a preference a site can guess
  // from a language toggle.
  const [filmLang, setFilmLang] = useState(lang);
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

        {/* The film, before the interactive demo. Watching costs nothing and
            asks nothing — it is the lowest-effort way to understand the
            product, so it goes first. preload="none" with a poster keeps it
            from spending a visitor's data before they have asked for it. */}
        <Reveal className="mt-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-extrabold text-lg text-center">{t('how.filmTitle')}</h3>
            <p className="text-muted text-sm mt-2 text-center leading-relaxed">
              {t('how.filmBody')}
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                {t('how.filmLang')}
              </span>
              {[
                ['en', t('how.filmEn')],
                ['hi', t('how.filmHi')],
              ].map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => setFilmLang(code)}
                  className={`text-sm font-bold rounded-full px-4 py-1.5 border-2 transition ${
                    filmLang === code
                      ? 'bg-brand text-white border-brand'
                      : 'bg-white text-ink/70 border-line hover:border-brand'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* key on the language: without it React keeps the same element and
                carries on playing the film the viewer just switched away from. */}
            <video
              key={filmLang}
              className="w-full mt-3 rounded-2xl shadow-lift bg-black aspect-video"
              controls
              playsInline
              preload="none"
              poster={demoPosterUrl(filmLang)}
              src={demoVideoUrl(filmLang)}
            />

            <p className="text-xs text-muted text-center mt-3">{t('how.filmNote')}</p>
          </div>
        </Reveal>

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
