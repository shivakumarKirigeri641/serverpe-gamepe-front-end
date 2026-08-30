import Reveal from '../components/Reveal.jsx';
import { BRAND, waLink } from '../content.js';

export default function CallToAction() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-brand to-brand-deep text-white">
      <div className="container-x text-center max-w-2xl">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Get everyone together tonight
          </h2>
          <p className="mt-4 text-white/85 text-lg">
            Say hi, start a room, forward the link. {BRAND.tagline}
          </p>
          <a href={waLink('Hi')} className="btn bg-white text-brand hover:bg-cream mt-7 shadow-lift">
            Play on WhatsApp
          </a>
          <p className="mt-4 text-sm text-white/60">Free to play · no app · no sign-up</p>
        </Reveal>
      </div>
    </section>
  );
}
