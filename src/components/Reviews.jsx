import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { REVIEW_IMAGES } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = REVIEW_IMAGES.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (total === 0) return null;

  return (
    <section id="reviews" className="section-wrap">
      <MotionReveal className="mb-10 text-left">
        <SectionHeading eyebrow="What Customers Say" title="Mga" highlight="Patunay" />
      </MotionReveal>

      <MotionReveal>
        <div
          className="relative"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-glass">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.button
                  key={current}
                  type="button"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setLightbox(true)}
                  className="group relative block w-full cursor-zoom-in"
                  aria-label={`View review ${current + 1} full size`}
                >
                  <img
                    src={REVIEW_IMAGES[current]}
                    alt={`Customer review screenshot ${current + 1}`}
                    className="mx-auto max-h-[min(55vh,480px)] w-full object-contain bg-black/40"
                  />
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full glass px-3 py-1.5 text-xs font-bold text-cream opacity-0 transition group-hover:opacity-100">
                    <ZoomIn size={14} /> Tap to enlarge
                  </span>
                </motion.button>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full glass transition hover:border-fire-orange/40"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex flex-1 flex-wrap justify-center gap-1.5" role="tablist">
              {REVIEW_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 bg-fire-orange'
                      : 'w-2 bg-white/25 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full glass transition hover:border-fire-orange/40"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="mt-3 text-center text-sm text-muted" aria-live="polite">
            Review <span className="font-bold text-cream">{current + 1}</span> of{' '}
            <span className="font-bold text-cream">{total}</span>
          </p>
        </div>
      </MotionReveal>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged review"
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full glass"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={REVIEW_IMAGES[current]}
              alt="Customer review enlarged"
              className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
