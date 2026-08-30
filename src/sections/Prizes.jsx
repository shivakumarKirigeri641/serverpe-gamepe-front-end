import Reveal from '../components/Reveal.jsx';
import { useT } from '../i18n/index.jsx';

export default function Prizes() {
  const t = useT();
  const prizes = t('prizes.items');

  return (
    <section id="prizes" className="py-16 sm:py-20 bg-white">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t('prizes.eyebrow')}</span>
          <h2 className="h2 mt-4">{t('prizes.title')}</h2>
          <p className="lede mt-3">
            The same six every housie evening has always had. Full House ends the game.
          </p>
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
          <p className="text-center text-sm text-muted max-w-xl mx-auto">
            Every claim is checked by our servers against the numbers actually called. The first
            valid claim wins, and a claim that is not yet complete is simply refused.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
