import { useEffect, useState } from 'react';
import { BRAND, waLink } from '../content.js';
import { useT } from '../i18n/index.jsx';
import { LanguageSwitch } from './LanguageChooser.jsx';

// Keys, not labels: the anchors are fixed, the words are not.
const LINKS = [
  ['nav.how', '#how'],
  ['nav.prizes', '#prizes'],
  ['nav.pricing', '#pricing'],
  ['nav.faq', '#faq'],
];

export default function Header({ brand }) {
  const t = useT();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Transparent over the hero, solid once you scroll — so the logo stays
  // readable against the page rather than the hero artwork.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        solid ? 'bg-cream/95 backdrop-blur border-b border-line' : ''
      }`}
    >
      <div className="container-x flex items-center justify-between h-16">
        {/* The wordmark when the manifest has arrived, the name until then —
            so the header never collapses while an image loads. */}
        <a href="#top" className="flex items-center" aria-label={BRAND.name}>
          {brand?.primary?.wordmark ? (
            <img
              src={brand.primary.wordmark}
              alt={BRAND.name}
              className="h-9 w-auto"
              width="1000"
              height="300"
            />
          ) : (
            <span className="font-extrabold text-xl text-brand tracking-tight">{BRAND.name}</span>
          )}
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(([key, href]) => (
            <a key={href} href={href} className="text-sm font-semibold text-ink/80 hover:text-brand">
              {t(key)}
            </a>
          ))}
          <LanguageSwitch />
          <a href={waLink('Hi')} className="btn-wa !px-5 !py-2.5 !text-sm">
            {t('nav.play')}
          </a>
        </nav>

        <button className="md:hidden text-2xl text-brand" onClick={() => setOpen(!open)} aria-label={t('nav.menu')}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-b border-line px-5 pb-4 space-y-3">
          {LINKS.map(([key, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold py-1"
            >
              {t(key)}
            </a>
          ))}
          <LanguageSwitch className="w-full !py-2.5 block" />
          <a href={waLink('Hi')} className="btn-wa w-full">
            {t('nav.play')}
          </a>
        </div>
      )}
    </header>
  );
}
