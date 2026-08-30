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

const POINTS = [
  {
    title: 'You must be 18 or older',
    body: 'MastiPe is for adults. By playing you confirm you are at least 18, or the age of majority where you live.',
  },
  {
    title: 'No betting. No money.',
    body: 'There is nothing to wager and nothing to win in cash. Points and leaderboard positions have no monetary value and cannot be exchanged for anything.',
  },
  {
    title: 'Not a lottery or a prize competition',
    body: 'MastiPe is a game played for fun among people who know each other. It is not a game of chance played for stakes.',
  },
  {
    title: 'We do not facilitate side bets',
    body: 'Any arrangement players make between themselves is not part of this service, is not endorsed by us, and is entirely at their own risk.',
  },
  {
    title: 'Your data stays small',
    body: 'We hold your WhatsApp number, your profile name and your game activity. Message contents are archived after 30 days. We never sell your data.',
  },
];

export default function Trust() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <EntertainmentOnly />
          <h2 className="h2 mt-4">Let us be clear about what this is</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 mt-10 max-w-4xl mx-auto">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
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
          <a href={policiesUrl} target="_blank" rel="noopener" className="btn-ghost">
            Read our policies &amp; terms
          </a>
        </Reveal>
      </div>
    </section>
  );
}
