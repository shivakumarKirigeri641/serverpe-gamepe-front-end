/**
 * MastiPe — the public site.
 *
 * A single page, because the product is a single decision: message us on
 * WhatsApp or don't. Everything below the hero exists to answer an objection to
 * that one action.
 *
 * Company details and plans are read from the back-end so the page cannot claim
 * a price or an address the product does not actually hold, and so both update
 * without a deploy. If the API is unreachable the page still renders — stale
 * copy beats a blank screen.
 */

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api, safe } from './lib/api.js';
import { BRAND, WHATSAPP_DISPLAY, waLink } from './content.js';

import Header from './components/Header.jsx';
import { EntertainmentBanner } from './components/EntertainmentOnly.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import Prizes from './sections/Prizes.jsx';
import Features from './sections/Features.jsx';
import Trust from './sections/Trust.jsx';
import Pricing from './sections/Pricing.jsx';
import Faq from './sections/FAQ.jsx';
import CallToAction from './sections/CallToAction.jsx';

// Shown until the API answers, and kept if it never does.
const FALLBACK_PLANS = [
  {
    key: 'free_trial',
    name: 'Free Trial',
    price: 'Free',
    tagline: 'Free to play. Up to 30 players.',
    maxPlayers: 30,
    available: true,
  },
];

export default function App() {
  const [business, setBusiness] = useState(null);
  const [plans, setPlans] = useState(FALLBACK_PLANS);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [b, p] = await Promise.all([
        safe(api.business, null),
        safe(api.plans, FALLBACK_PLANS),
      ]);
      if (!alive) return;
      setBusiness(b);
      if (Array.isArray(p) && p.length) setPlans(p);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {BRAND.name} — {BRAND.hero}
        </title>
        <meta
          name="description"
          content={`${BRAND.tagline} Play Tambola with your friends on WhatsApp. No app, no sign-up, free to play. Entertainment only — no betting, no money.`}
        />
        <meta property="og:title" content={`${BRAND.name} — ${BRAND.tagline}`} />
        <meta property="og:description" content={BRAND.hero} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: business?.legalName || 'ServerPe App Solutions',
            alternateName: BRAND.name,
            email: business?.supportEmail || 'support@mastipe.in',
            url: business?.website || 'https://mastipe.in',
            address: business
              ? {
                  '@type': 'PostalAddress',
                  streetAddress: business.address.line1,
                  addressLocality: business.address.city,
                  addressRegion: business.address.state,
                  postalCode: business.address.postalCode,
                  addressCountry: business.address.country,
                }
              : undefined,
          })}
        </script>
      </Helmet>

      <Header />

      <main>
        <Hero />
        <EntertainmentBanner />
        <HowItWorks />
        <Prizes />
        <Trust />
        <Features />
        <Pricing plans={plans} />
        <Faq />
        <CallToAction />
        <EntertainmentBanner />
      </main>

      <Footer business={business} />

      {/* Always-reachable action on a phone, where the header button scrolls away. */}
      <a
        href={waLink('Hi')}
        className="sm:hidden fixed bottom-4 inset-x-4 z-30 btn-wa shadow-lift"
        aria-label={`Play on WhatsApp, ${WHATSAPP_DISPLAY}`}
      >
        Play on WhatsApp
      </a>
    </>
  );
}
