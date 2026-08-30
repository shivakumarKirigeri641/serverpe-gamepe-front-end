/**
 * The footer.
 *
 * Company name, address and GSTIN come from the back-end rather than being
 * typed here — they are the details most likely to change and most costly to
 * get wrong, and they are legally required to be accurate.
 */

import { BRAND, waLink } from '../content.js';
import { policiesUrl } from '../lib/api.js';

export default function Footer({ business }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70 py-12">
      <div className="container-x">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="text-white font-extrabold text-xl">{BRAND.name}</div>
            <p className="text-sm mt-2 leading-relaxed">{BRAND.tagline}</p>
            <a href={waLink('Hi')} className="btn-wa mt-4 !px-5 !py-2.5 !text-sm">
              Play on WhatsApp
            </a>
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-3">Company</div>
            {business ? (
              <address className="not-italic text-sm leading-relaxed">
                <div className="text-white/90">{business.legalName}</div>
                <div>{business.address.line1}</div>
                {business.address.line2 && <div>{business.address.line2}</div>}
                <div>
                  {business.address.city} {business.address.postalCode}
                </div>
                <div>
                  {business.address.state}, {business.address.country}
                </div>
                {business.gstin && <div className="mt-2">GSTIN: {business.gstin}</div>}
              </address>
            ) : (
              <p className="text-sm">ServerPe App Solutions</p>
            )}
          </div>

          <div>
            <div className="text-white font-bold text-sm mb-3">Get in touch</div>
            <ul className="text-sm space-y-2">
              <li>
                <a href={`mailto:${business?.supportEmail || 'support@mastipe.in'}`} className="hover:text-white">
                  {business?.supportEmail || 'support@mastipe.in'}
                </a>
              </li>
              <li>
                <a href={waLink('Hi')} className="hover:text-white">
                  Message us on WhatsApp
                </a>
              </li>
              <li>
                <a href={policiesUrl} target="_blank" rel="noopener" className="hover:text-white">
                  Policies &amp; terms
                </a>
              </li>
              <li>
                <a href="https://quizpe.in" target="_blank" rel="noopener" className="hover:text-white">
                  QuizPe — daily maths revision
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-9 pt-6 text-xs leading-relaxed">
          <p className="text-white/50">
            © {year} {business?.legalName || 'ServerPe App Solutions'}. All rights reserved.
            {' '}MastiPe™ is a trademark of {business?.legalName || 'ServerPe App Solutions'};
            registration is pending.
          </p>
          <p className="mt-3 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
              text-[11px] font-extrabold uppercase tracking-[0.12em]
              bg-red-500/15 text-red-300 border border-red-400/30">
              For Entertainment Only
            </span>
          </p>
          <p className="mt-2 text-white/40 max-w-3xl">
            You must be 18 or older to play. {BRAND.name} is played for entertainment only. There is no betting, no wagering and no
            money to be won. Points and leaderboard positions have no monetary value.
            {business?.legalName || 'ServerPe App Solutions'} is not responsible for any arrangement
            made between players outside this service.
          </p>
          <p className="mt-2 text-white/40">
            WhatsApp is a trademark of Meta Platforms, Inc. {BRAND.name} is not affiliated with Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
