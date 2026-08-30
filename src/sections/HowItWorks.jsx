import Reveal from '../components/Reveal.jsx';
import { useT } from '../i18n/index.jsx';

export default function HowItWorks() {
  const t = useT();
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
      </div>
    </section>
  );
}
