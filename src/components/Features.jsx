import { motion } from 'framer-motion';
import { FEATURES } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

export default function Features() {
  return (
    <section id="why" className="section-wrap-wide">
      <MotionReveal className="mb-12 text-center">
        <SectionHeading
          eyebrow="Why Lorenzo's"
          title="The"
          highlight="Crispy Choice"
          center
        />
      </MotionReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {FEATURES.map((f, i) => (
          <MotionReveal key={f.title} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group overflow-hidden rounded-2xl glass transition-shadow duration-300 hover:shadow-fire-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={f.image}
                  alt={f.alt}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
              </div>
              <div className="border-t border-white/10 p-5">
                <h3 className="font-display text-lg font-extrabold text-gray-900 dark:text-cream">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </motion.article>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
