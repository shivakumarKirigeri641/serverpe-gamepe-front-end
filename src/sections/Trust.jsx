/**
 * The section that answers "is this gambling?" before anyone has to ask.
 *
 * It sits high on the page on purpose. For a tambola product in India this is
 * the first objection in most people's minds, and burying it in a footer link
 * reads as evasion.
 */
import Reveal from '../components/Reveal.jsx';
import { policiesUrl } from '../lib/api.js';
import EntertainmentOnly from '../components/EntertainmentOnly.jsx';
import { useI18n } from '../i18n/index.jsx';


export default function Trust() {
  const { t, lang } = useI18n();
  const points = t('trust.items');

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <EntertainmentOnly />
          <h2 className="h2 mt-4">{t('trust.title')}</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 mt-10 max-w-4xl mx-auto">
          {points.map((p, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="card p-6 h-full">
                <h3 className="font-extrabold flex items-start gap-2">
                  <span className="text-good">✓</span> {p.title}
                </h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-8">
          <a href={`${policiesUrl}?lang=${lang}`} target="_blank" rel="noopener" className="btn-ghost">
            {t('trust.readPolicies')}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
