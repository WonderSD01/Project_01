import { motion } from 'framer-motion';
import { GALLERY } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

export default function Gallery() {
  return (
    <section id="gallery" className="section-wrap-wide">
      <MotionReveal className="mb-10 text-center">
        <SectionHeading
          eyebrow="Fresh from the Fire"
          title="Our"
          highlight="Lechon"
          center
        />
      </MotionReveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {GALLERY.map((item, i) => (
          <MotionReveal
            key={item.src}
            delay={i * 0.06}
            className={item.wide ? 'col-span-2 sm:col-span-2' : ''}
          >
            <motion.figure
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-raised ${
                item.wide ? 'aspect-[16/9]' : 'aspect-square'
              }`}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fire-deep/70 via-fire-orange/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ember-gradient px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-white shadow-fire">
                {item.tag}
              </figcaption>
            </motion.figure>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
