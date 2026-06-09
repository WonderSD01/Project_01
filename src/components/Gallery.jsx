import { motion } from 'framer-motion';
import { GALLERY } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

const GALLERY_GRID = GALLERY.slice(0, 20);

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

      <div className="grid grid-cols-4 grid-rows-5 gap-1.5 sm:gap-2 md:gap-3">
        {GALLERY_GRID.map((item, i) => (
          <MotionReveal key={item.src} delay={i * 0.03} className="h-full min-w-0">
            <motion.figure
              whileHover={{ y: -2 }}
              className="group relative aspect-square h-full w-full overflow-hidden rounded-lg border border-black/10 bg-black/5 sm:rounded-xl md:rounded-2xl dark:border-white/10 dark:bg-surface-raised"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fire-deep/70 via-fire-orange/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-1 left-1 hidden rounded-full bg-ember-gradient px-1.5 py-0.5 text-[0.5rem] font-extrabold uppercase tracking-wider text-white shadow-fire min-[400px]:block sm:bottom-2 sm:left-2 sm:px-2 sm:text-[0.55rem] md:bottom-3 md:left-3 md:px-3 md:text-[0.65rem]">
                {item.tag}
              </figcaption>
            </motion.figure>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
