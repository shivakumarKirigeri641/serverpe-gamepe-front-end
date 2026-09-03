import Reveal from '../components/Reveal.jsx';
import { useI18n, useT } from '../i18n/index.jsx';
import { demoUrl, demoVideoUrl, demoPosterUrl } from '../lib/api.js';

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
            like. The video answers that in a minute without asking anyone to
            install anything, so it sits directly under the steps rather than in
            the footer where nobody scrolls.

            preload="none" on purpose: this is a 5MB file on a marketing page
            most visitors will scroll past, and downloading it for everyone who
            lands on the homepage would be the single heaviest thing the site
            does. The poster carries the frame until somebody presses play. */}
        <Reveal delay={0.32}>
          <div className="card mt-8 p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="font-extrabold text-lg text-center">{t('how.demoTitle')}</h3>
            <p className="text-muted text-sm mt-2 leading-relaxed text-center">
              {t('how.demoBody')}
            </p>

            <video
              className="w-full mt-5 rounded-xl bg-black block"
              style={{ aspectRatio: '16 / 9' }}
              controls
              preload="none"
              playsInline
              poster={demoPosterUrl(lang)}
            >
              <source src={demoVideoUrl(lang)} type="video/mp4" />
            </video>

            <div className="text-center">
              <a
                href={demoUrl(lang)} data-cta="demo-how-it-works"
                target="_blank"
                rel="noreferrer"
                className="btn-brand mt-5"
              >
                {t('how.demoCta')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
