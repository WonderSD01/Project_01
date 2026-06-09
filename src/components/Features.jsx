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
              className="card group overflow-hidden transition-shadow duration-300 hover:shadow-fire-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={f.image}
                  alt={f.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-600 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent dark:from-surface/90" />
              </div>
              <div className="border-t border-black/10 p-5 dark:border-white/10">
                <h3 className="font-display text-lg font-extrabold text-theme">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-muted">{f.text}</p>
              </div>
            </motion.article>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
