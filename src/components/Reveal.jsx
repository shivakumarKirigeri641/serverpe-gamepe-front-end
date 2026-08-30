/**
 * Fades content in as it scrolls into view.
 *
 * `once` so the page does not re-animate on the way back up, which reads as
 * jitter rather than polish. Motion is disabled entirely for anyone who has
 * asked for reduced motion.
 */
import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
