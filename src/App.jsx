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
import LanguageChooser from './components/LanguageChooser.jsx';
import { useI18n } from './i18n/index.jsx';
import { EntertainmentBanner } from './components/EntertainmentOnly.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import Prizes from './sections/Prizes.jsx';
import Features from './sections/Features.jsx';
import Trust from './sections/Trust.jsx';
import Pricing from './sections/Pricing.jsx';
import Testimonials from './sections/Testimonials.jsx';
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
  const { t, lang } = useI18n();
  const [business, setBusiness] = useState(null);
  const [plans, setPlans] = useState(FALLBACK_PLANS);
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [b, p, br] = await Promise.all([
        safe(api.business, null),
        safe(() => api.plans(lang), FALLBACK_PLANS),
        safe(api.brand, null),
      ]);
      if (!alive) return;
      setBusiness(b);
      setBrand(br);
      if (Array.isArray(p) && p.length) setPlans(p);
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>
          {BRAND.name} — {t('hero.title')}
        </title>
        <meta
          name="description"
          content={`${t('hero.tagline')} ${t('hero.sub')} ${t('entertainment.banner')}`}
        />
        <meta property="og:title" content={`${BRAND.name} — ${t('hero.tagline')}`} />
        <meta property="og:description" content={t('hero.title')} />
        <meta property="og:locale" content={lang === 'hi' ? 'hi_IN' : 'en_IN'} />
        <meta property="og:type" content="website" />
        {/* Images come from the back-end, so replacing the logo there updates
            the link preview without a deploy here. Rendered only once the
            manifest has arrived; a half-written og:image is worse than none,
            because crawlers cache what they see first. */}
        {brand?.primary?.openGraph && (
          <meta property="og:image" content={brand.primary.openGraph} />
        )}
        {brand?.primary?.openGraph && <meta property="og:image:width" content="1200" />}
        {brand?.primary?.openGraph && <meta property="og:image:height" content="630" />}
        {brand?.primary?.twitter && <meta name="twitter:card" content="summary_large_image" />}
        {brand?.primary?.twitter && <meta name="twitter:image" content={brand.primary.twitter} />}
        {brand?.primary?.favicon && (
          <link rel="icon" type="image/png" sizes="32x32" href={brand.primary.favicon} />
        )}
        {brand?.primary?.appleTouchIcon && (
          <link rel="apple-touch-icon" sizes="180x180" href={brand.primary.appleTouchIcon} />
        )}
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

      <LanguageChooser />
      <Header brand={brand} />

      <main>
        <Hero brand={brand} />
        <EntertainmentBanner />
        <HowItWorks />
        <Prizes />
        <Trust />
        <Features />
        <Pricing plans={plans} business={business} />
        <Testimonials />
        <Faq />
        <CallToAction />
        <EntertainmentBanner />
      </main>

      <Footer business={business} brand={brand} />

      {/* Always-reachable action on a phone, where the header button scrolls away. */}
      <a
        href={waLink('Hi')}
        className="sm:hidden fixed bottom-4 inset-x-4 z-30 btn-wa shadow-lift"
        aria-label={`${t('hero.cta')}, ${WHATSAPP_DISPLAY}`}
      >
        {t('hero.cta')}
      </a>
    </>
  );
}
