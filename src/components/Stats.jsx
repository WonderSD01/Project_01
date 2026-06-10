import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../data/siteData';
import MotionReveal from './MotionReveal';

function AnimatedStat({ value, suffix, label, decimals = 0, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display text-2xl font-black text-white sm:text-3xl">
        {formatted}
        <span className="text-lg">{suffix}</span>
      </div>
      <div className="mt-1.5 text-[0.65rem] font-bold uppercase leading-snug tracking-widest text-white/80 sm:text-[0.7rem]">
        {label}
      </div>
    </motion.div>
  );
}

function TextStat({ text, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display text-xl font-black leading-tight text-white sm:text-2xl">
        {text}
      </div>
      <div className="mt-1.5 text-[0.65rem] font-bold uppercase leading-snug tracking-widest text-white/80 sm:text-[0.7rem]">
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="section-wrap">
      <MotionReveal>
        <div className="overflow-hidden rounded-2xl bg-red-gradient bg-[length:200%_auto] p-6 shadow-fire-lg animate-gradient-x sm:p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            {STATS.map((s, i) =>
              s.text ? (
                <TextStat key={s.label} text={s.text} label={s.label} delay={i * 0.08} />
              ) : (
                <AnimatedStat key={s.label} {...s} delay={i * 0.08} />
              )
            )}
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
