import { CalendarDays, ListOrdered, PartyPopper } from 'lucide-react';
import { STEPS } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

const ICONS = {
  list: ListOrdered,
  calendar: CalendarDays,
  party: PartyPopper,
};

export default function HowToOrder() {
  return (
    <section id="how" className="section-wrap">
      <MotionReveal className="mb-10 text-center">
        <SectionHeading eyebrow="Easy as 1-2-3" title="How to" highlight="Order" center />
      </MotionReveal>

      <div className="flex flex-col gap-4">
        {STEPS.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <MotionReveal key={step.n} delay={i * 0.1}>
              <div className="group flex gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:border-fire-orange/30 hover:shadow-fire">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fire-gradient text-lg font-black text-white shadow-fire">
                  {step.n}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-fire-orange" aria-hidden />
                    <h3 className="font-display text-lg font-extrabold text-cream">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}
