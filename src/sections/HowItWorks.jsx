import Reveal from '../components/Reveal.jsx';
import { STEPS } from '../content.js';

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 sm:py-20 bg-white">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">How it works</span>
          <h2 className="h2 mt-4">Four steps, about a minute</h2>
          <p className="lede mt-3">
            The whole thing happens in WhatsApp. Nobody has to install anything or make an account.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="card p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-brand text-white grid place-items-center font-extrabold">
                  {s.n}
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
