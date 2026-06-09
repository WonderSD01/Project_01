import { motion } from 'framer-motion';
import { Flame, ChevronRight, MapPin } from 'lucide-react';
import { HERO_IMAGE, MAPS_URL } from '../data/siteData';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[60px]"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/20 dark:from-surface dark:via-surface/70 dark:to-surface/20" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-fire-gradient bg-[length:200%_auto] animate-gradient-x" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-28 pt-16 text-left sm:px-6 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-ember-gradient px-4 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-white shadow-fire"
        >
          <Flame size={14} className="animate-pulse" aria-hidden />
          Now Accepting Orders
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-2xl font-display text-[clamp(2.4rem,9vw,4rem)] font-black leading-[1.05] text-cream"
        >
          Affordable &amp; Delicious.
          <em className="mt-1 block font-display text-[clamp(2.2rem,8.5vw,3.8rem)] not-italic fire-text">
            Lechon for Everyone!
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-4 max-w-md text-base font-medium leading-relaxed text-cream/85 sm:text-lg"
        >
          Crispy skin, juicy meat — authentic Filipino lechon baboy for birthdays,
          fiestas, or just because. Pick up or delivery available.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <a href="#menu" className="btn-fire group flex-1">
            See Price List
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a href="#contact" className="btn-ghost flex-1">
            Contact Us
          </a>
        </motion.div>

        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm font-semibold text-cream transition hover:border-fire-orange/40 hover:text-white"
        >
          <MapPin size={16} className="text-fire-orange" aria-hidden />
          Lorenzo&apos;s Lechon House — Lipa City
        </motion.a>
      </div>
    </section>
  );
}
