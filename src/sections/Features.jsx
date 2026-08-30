import Reveal from '../components/Reveal.jsx';
import { useT } from '../i18n/index.jsx';

export default function Features() {
  const t = useT();
  // Icons stay in the component: they are the same picture in both languages.
  const icons = ['🎫', '📣', '⚖️', '👥', '🏆', '📄'];
  const features = t('features.items').map((f, i) => ({ ...f, icon: icons[i] }));

  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t('features.eyebrow')}</span>
          <h2 className="h2 mt-4">{t('features.title')}</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="card p-6 h-full">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="font-extrabold text-lg mt-3">{f.title}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
