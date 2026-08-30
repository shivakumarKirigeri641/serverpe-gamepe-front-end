/**
 * src/components/LanguageChooser.jsx
 * ---------------------------------------------------------------------------
 * Asked once, on the landing page, before anything else.
 *
 * Two things it deliberately does not do:
 *
 *  - It does not guess from the browser locale. A phone set to English is not
 *    evidence that its owner would rather read English; in India it is very
 *    often just the phone's default. Asking once is more honest than a guess
 *    that is silently wrong for half the people it applies to.
 *
 *  - It does not block the page. The site renders in English underneath, so a
 *    visitor who dismisses it or whose storage is blocked still lands on a
 *    working page rather than a modal with nothing behind it.
 *
 * Both options are shown in their own script, so a Hindi reader recognises the
 * one they want without having to read English first.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/index.jsx';

export default function LanguageChooser() {
  const { chosen, choose, t } = useI18n();

  return (
    <AnimatePresence>
      {!chosen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language / अपनी भाषा चुनें"
        >
          <motion.div
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="bg-cream rounded-3xl shadow-lift w-full max-w-sm p-7 text-center"
          >
            <div className="text-3xl font-extrabold text-brand tracking-tight">MastiPe</div>

            {/* Both scripts in the heading: whichever one you read, you are
                being spoken to. */}
            <h2 className="mt-4 font-extrabold text-lg leading-snug">
              Choose your language
              <span className="block text-brand">अपनी भाषा चुनें</span>
            </h2>
            <p className="text-sm text-muted mt-2">{t('chooser.sub')} / You can change this later.</p>

            <div className="grid gap-3 mt-6">
              <button
                onClick={() => choose('en')}
                className="btn-wa w-full !text-base"
                lang="en"
              >
                English
              </button>
              <button
                onClick={() => choose('hi')}
                className="w-full rounded-xl border-2 border-brand text-brand font-extrabold
                           py-3.5 text-lg hover:bg-brand hover:text-cream transition"
                lang="hi"
              >
                हिंदी
              </button>
            </div>

            <p className="text-[11px] text-muted mt-5 leading-relaxed">
              The English text of our policies remains the legally binding version.
              <span className="block mt-1" lang="hi">
                हमारी नीतियों का अंग्रेज़ी पाठ ही कानूनी रूप से मान्य रहता है।
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The compact switch that lives in the header afterwards. */
export function LanguageSwitch({ className = '' }) {
  const { lang, choose, t } = useI18n();

  return (
    <button
      onClick={() => choose(lang === 'hi' ? 'en' : 'hi')}
      className={`rounded-full border border-line px-3 py-1.5 text-xs font-bold
                  text-brand hover:bg-brand hover:text-cream transition ${className}`}
      aria-label={t('lang.label')}
      lang={lang === 'hi' ? 'en' : 'hi'}
    >
      {t('lang.switchTo')}
    </button>
  );
}
