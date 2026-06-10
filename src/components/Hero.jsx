import { useEffect, useState } from 'react';
import { Flame, ChevronRight, MapPin } from 'lucide-react';
import { HERO_CAROUSEL, MAPS_URL } from '../data/siteData';

const CAROUSEL_INTERVAL = 5000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    HERO_CAROUSEL.slice(1).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (HERO_CAROUSEL.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_CAROUSEL.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[60px]"
    >
      <div className="absolute inset-0">
        {HERO_CAROUSEL.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === activeIndex ? 1 : 0,
            }}
            aria-hidden={i !== activeIndex}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/20 dark:from-surface dark:via-surface/70 dark:to-surface/20" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-fire-gradient bg-[length:200%_auto] animate-gradient-x" />

      <div className="relative z-10 flex w-full flex-col items-start px-4 pb-28 pt-16 text-left sm:px-6 sm:pb-32 lg:pl-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-ember-gradient px-4 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-white shadow-fire">
          <Flame size={14} className="animate-pulse" aria-hidden />
          Now Accepting Orders
        </div>

        <h1 className="max-w-2xl text-left font-display text-[clamp(2.4rem,9vw,4rem)] font-black leading-[1.05] text-cream">
          Affordable &amp; Delicious.
          <em className="mt-1 block text-left font-display text-[clamp(2.2rem,8.5vw,3.8rem)] not-italic fire-text">
            Lechon for Everyone!
          </em>
        </h1>

        <p className="mt-4 max-w-md text-left text-base font-medium leading-relaxed text-cream/85 sm:text-lg">
          Crispy skin, juicy meat — authentic Filipino lechon baboy for birthdays,
          fiestas, or just because. Pick up or delivery available.
        </p>

        <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
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
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm font-semibold text-cream transition hover:border-fire-orange/40 hover:text-white"
        >
          <MapPin size={16} className="text-fire-orange" aria-hidden />
          Lorenzo&apos;s Lechon House — Lipa City
        </a>
      </div>
    </section>
  );
}
