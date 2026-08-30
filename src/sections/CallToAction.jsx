import Reveal from '../components/Reveal.jsx';
import { waLink } from '../content.js';
import { useT } from '../i18n/index.jsx';

export default function CallToAction() {
  const t = useT();

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-brand to-brand-deep text-white">
      <div className="container-x text-center max-w-2xl">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {t('cta.title')}
          </h2>
          <p className="mt-4 text-white/85 text-lg">{t('cta.sub')}</p>
          <a href={waLink('Hi')} className="btn bg-white text-brand hover:bg-cream mt-7 shadow-lift">
            {t('cta.button')}
          </a>
          <p className="mt-4 text-sm text-white/60">{t('cta.reassure')}</p>
        </Reveal>
      </div>
    </section>
  );
}
