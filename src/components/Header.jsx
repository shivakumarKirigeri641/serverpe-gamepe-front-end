import { useEffect, useState } from 'react';
import { BRAND, waLink } from '../content.js';

const LINKS = [
  ['How it works', '#how'],
  ['Prizes', '#prizes'],
  ['Pricing', '#pricing'],
  ['Questions', '#faq'],
];

export default function Header() {
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
        <a href="#top" className="font-extrabold text-xl text-brand tracking-tight">
          {BRAND.name}
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-semibold text-ink/80 hover:text-brand">
              {label}
            </a>
          ))}
          <a href={waLink('Hi')} className="btn-wa !px-5 !py-2.5 !text-sm">
            Play now
          </a>
        </nav>

        <button className="md:hidden text-2xl text-brand" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-b border-line px-5 pb-4 space-y-3">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold py-1"
            >
              {label}
            </a>
          ))}
          <a href={waLink('Hi')} className="btn-wa w-full">
            Play now
          </a>
        </div>
      )}
    </header>
  );
}
