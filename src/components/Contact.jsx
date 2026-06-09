import { Facebook, MessageSquare, Phone, MapPin } from 'lucide-react';
import { MAPS_URL } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

const CONTACTS = [
  {
    href: MAPS_URL,
    label: 'Visit Us on Google Maps',
    icon: MapPin,
    className: 'bg-gradient-to-br from-fire-orange to-fire-red text-white',
    external: true,
  },
  {
    href: 'https://www.facebook.com/lorenzoslechonlipa',
    label: "Lorenzo's Lechon House",
    icon: Facebook,
    className: 'bg-gradient-to-br from-[#2D88FF] to-[#1877F2] text-white',
    external: true,
  },
  {
    href: 'sms:+639970665673',
    label: 'Text Us – 0997-066-5673',
    icon: MessageSquare,
    className: 'glass text-theme hover:border-fire-orange/40',
  },
  {
    href: 'tel:+639970665673',
    label: 'Call – 0997-066-5673',
    icon: Phone,
    className: 'btn-fire w-full',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-wrap">
      <MotionReveal className="mb-8 text-left">
        <SectionHeading eyebrow="Ready to Order?" title="Mag-" highlight="Order Na!" />
      </MotionReveal>

      <MotionReveal delay={0.05}>
        <p className="mb-8 max-w-md text-left text-base leading-relaxed text-theme-muted">
          Makipag-ugnayan sa amin para mag-reserve ng inyong lechon. Paunang pag-book para
          matiyak ang availability. Open for pick up and delivery.
        </p>
      </MotionReveal>

      <div className="flex flex-col gap-3">
        {CONTACTS.map((c, i) => {
          const Icon = c.icon;
          return (
            <MotionReveal key={c.href} delay={0.1 + i * 0.08}>
              <a
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className={`flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${c.className}`}
              >
                <Icon size={20} aria-hidden />
                {c.label}
              </a>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}
