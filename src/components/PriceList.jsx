import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Info, Star } from 'lucide-react';
import { PRICES, formatPrice } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

export default function PriceList() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="menu" className="section-wrap">
      <MotionReveal className="mb-8 text-left">
        <SectionHeading eyebrow="Our Offerings" title="Price" highlight="List" />
      </MotionReveal>

      {/* Live weight callout */}
      <MotionReveal delay={0.05}>
        <div className="mb-6 flex gap-3 rounded-2xl border border-fire-orange/30 bg-fire-orange/10 p-4">
          <Scale className="mt-0.5 shrink-0 text-fire-orange" size={22} aria-hidden />
          <div>
            <p className="text-sm font-bold text-cream">All weights are live weight (buhay na timbang)</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              The kilogram (kg) ranges below refer to the pig&apos;s weight before roasting — not the
              cooked or served weight. Final price is based on actual live weight at delivery.
            </p>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-glass">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="bg-red-gradient bg-[length:200%_auto] animate-gradient-x">
                  <th scope="col" className="px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white">
                    Size
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white">
                    Live Weight
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center text-xs font-extrabold uppercase tracking-wider text-white">
                    Good For
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right text-xs font-extrabold uppercase tracking-wider text-white">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((row, i) => (
                  <motion.tr
                    key={row.size}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelected(selected === row.size ? null : row.size)}
                    className={`cursor-pointer border-b border-white/[0.06] transition-colors ${
                      row.featured
                        ? 'bg-fire-orange/15 hover:bg-fire-orange/20'
                        : i % 2 === 0
                          ? 'bg-surface-raised hover:bg-white/[0.06]'
                          : 'bg-surface-overlay hover:bg-white/[0.06]'
                    } ${selected === row.size ? 'ring-1 ring-inset ring-fire-orange/50' : ''}`}
                  >
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5 font-bold text-cream">
                        {row.size}
                        {row.featured && (
                          <Star size={14} className="fill-fire-amber text-fire-amber" aria-label="Popular" />
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-sm font-semibold text-cream/90">
                        {row.liveWeight} kg
                        <span className="text-[0.65rem] font-bold uppercase text-fire-orange">live</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center text-sm font-semibold text-cream/80">
                      {row.pax} pax
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-base font-extrabold text-fire-orange">
                        {formatPrice(row.price)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MotionReveal>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            {(() => {
              const row = PRICES.find((r) => r.size === selected);
              if (!row) return null;
              return (
                <div className="rounded-2xl glass p-4">
                  <p className="font-bold text-cream">{row.size}</p>
                  <p className="mt-1 text-sm text-muted">
                    Live weight: <strong className="text-cream">{row.liveWeight} kg</strong> · Good
                    for {row.pax} guests ·{' '}
                    <strong className="text-fire-orange">{formatPrice(row.price)}</strong>
                  </p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <MotionReveal delay={0.15}>
        <p className="mt-5 flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted">
          <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
          Prices based on live weight · Pre-order required to secure your date · Tap a row for
          quick details
        </p>
      </MotionReveal>
    </section>
  );
}
