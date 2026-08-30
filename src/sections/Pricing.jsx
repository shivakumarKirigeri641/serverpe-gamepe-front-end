/**
 * Pricing.
 *
 * The plans come from the back-end, so a price edited in the admin panel is
 * live here immediately — and the site can never advertise a plan the product
 * would refuse to sell. Plans not yet available are shown as "coming soon"
 * rather than hidden, because saying what is coming is part of the pitch.
 */

import Reveal from '../components/Reveal.jsx';
import { waLink } from '../content.js';
import { policiesUrl } from '../lib/api.js';
import EntertainmentOnly from '../components/EntertainmentOnly.jsx';

export default function Pricing({ plans }) {
  const available = plans.filter((p) => p.available);
  const soon = plans.filter((p) => !p.available);

  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="eyebrow">Pricing</span>
            <EntertainmentOnly size="sm" />
          </div>
          <h2 className="h2 mt-4">Free while we are finding our feet</h2>
          <p className="lede mt-3">
            Play as much as you like during the trial. We will tell you clearly before anything
            changes.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {available.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.07}>
              <div className="card p-7 h-full border-2 border-brand relative">
                <span className="absolute -top-3 left-6 eyebrow bg-brand text-white">Available now</span>
                <h3 className="font-extrabold text-2xl text-brand mt-2">{p.name}</h3>
                <div className="text-4xl font-extrabold mt-3">{p.price}</div>
                <p className="text-muted text-sm mt-3 leading-relaxed">{p.tagline}</p>
                <p className="text-sm mt-4">
                  <strong>Up to {p.maxPlayers} players</strong> per game
                </p>
                <a href={waLink('Hi')} className="btn-wa w-full mt-6">
                  Start playing
                </a>
              </div>
            </Reveal>
          ))}

          {soon.map((p, i) => (
            <Reveal key={p.key} delay={(available.length + i) * 0.07}>
              <div className="card p-7 h-full opacity-75">
                <span className="eyebrow bg-line text-muted">Coming soon</span>
                <h3 className="font-extrabold text-2xl mt-3">{p.name}</h3>
                <div className="text-4xl font-extrabold mt-3 text-muted">{p.price}</div>
                <p className="text-muted text-sm mt-3 leading-relaxed">{p.tagline}</p>
                <p className="text-sm mt-4 text-muted">
                  <strong>Up to {p.maxPlayers} players</strong> per game
                </p>
                <button className="btn-ghost w-full mt-6 cursor-default" disabled>
                  Not available yet
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="card p-6 max-w-3xl mx-auto bg-gold/5 border-gold/40">
            <h3 className="font-extrabold text-lg">How paying will work</h3>
            <p className="text-muted text-sm mt-2 leading-relaxed">
              When paid plans begin, MastiPe will run on <strong>credits</strong>. Credits are only
              spent when a game <em>actually starts calling numbers</em> — creating a room is free,
              and pressing Start is free. If nobody joins your game, nothing is deducted and your
              credits stay in your wallet for next time.
            </p>
            <a
              href={policiesUrl}
              target="_blank"
              rel="noopener"
              className="text-sm font-bold text-brand hover:underline mt-3 inline-block"
            >
              Read the full payments &amp; refunds policy →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
