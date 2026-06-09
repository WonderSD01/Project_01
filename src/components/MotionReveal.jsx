import { motion } from 'framer-motion';

export default function MotionReveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, highlight, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] fire-text"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-cream text-balance leading-tight"
      >
        {title}{' '}
        {highlight && <span className="fire-text">{highlight}</span>}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`mt-4 h-1 w-14 rounded-full bg-fire-gradient bg-[length:200%_auto] animate-gradient-x origin-left ${
          center ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}
