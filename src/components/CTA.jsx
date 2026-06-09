import { ArrowRight } from 'lucide-react';
import { GALLERY } from '../data/siteData';
import MotionReveal from './MotionReveal';

export default function CTA() {
  return (
    <section id="cta" className="section-wrap">
      <MotionReveal>
        <div className="relative overflow-hidden rounded-2xl border border-fire-orange/30 p-10 text-center sm:p-12">
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${GALLERY[0].src})` }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-fire-deep/90 via-fire-orange/70 to-fire-red/80" />

          <h2 className="font-display text-3xl font-black text-white sm:text-4xl text-balance">
            Make Your Fiesta Unforgettable
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
            Book your crispy, juicy lechon today and give your guests something to remember.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-extrabold text-fire-deep shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
          >
            Reserve Your Lechon
            <ArrowRight size={18} />
          </a>
        </div>
      </MotionReveal>
    </section>
  );
}
