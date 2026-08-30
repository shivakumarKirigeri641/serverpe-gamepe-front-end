/**
 * The "For Entertainment Only" mark.
 *
 * Repeated deliberately rather than stated once: for a tambola product in
 * India this is the claim that matters most, and a visitor who lands halfway
 * down the page should meet it without scrolling back up.
 *
 * Red on purpose. It is a warning label, not decoration.
 */
export default function EntertainmentOnly({ className = '', size = 'md' }) {
  const pad = size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-extrabold uppercase
        tracking-[0.12em] bg-red-50 text-red-700 border border-red-200 ${pad} ${className}`}
    >
      <span aria-hidden="true">●</span> For Entertainment Only
    </span>
  );
}

/** The fuller statement, for the top and bottom of the page. */
export function EntertainmentBanner() {
  return (
    <div className="bg-red-50 border-y border-red-200">
      <div className="container-x py-2.5 text-center">
        <p className="text-[13px] font-bold text-red-700">
          For Entertainment Only &middot; No betting &middot; No money
        </p>
      </div>
    </div>
  );
}
