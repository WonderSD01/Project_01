import { MapPin, ExternalLink } from 'lucide-react';
import { ABOUT_IMAGE, MAPS_URL } from '../data/siteData';
import MotionReveal, { SectionHeading } from './MotionReveal';

export default function About() {
  return (
    <section id="about" className="section-wrap">
      <MotionReveal className="mb-10 text-left">
        <SectionHeading eyebrow="Our Story" title="Made with" highlight="Love & Fire" />
      </MotionReveal>

      <MotionReveal>
        <div className="card group overflow-hidden transition hover:shadow-fire-lg">
          <div className="overflow-hidden">
            <img
              src={ABOUT_IMAGE}
              alt="Lorenzo's Lechon freshly roasted over coals"
              loading="lazy"
              className="h-56 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-64"
            />
          </div>
          <div className="p-6 text-left">
            <p className="text-base leading-relaxed text-theme-muted">
              Affordable and delicious lechon for every occasion. Whether it&apos;s a birthday,
              fiesta, or grand celebration — Lorenzo&apos;s Lechon is here to make your event truly
              special with crispy, juicy, and authentic Filipino lechon.
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="callout mt-5 flex items-center gap-3 transition hover:border-fire-orange/50 hover:bg-fire-orange/15"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ember-gradient shadow-fire">
                <MapPin size={18} className="text-white" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="font-bold text-theme">Antipolo del Norte, Lipa City</p>
                <p className="text-sm text-theme-muted">Batangas, Philippines</p>
              </div>
              <ExternalLink size={18} className="shrink-0 text-fire-orange" aria-hidden />
              <span className="sr-only">Open in Google Maps</span>
            </a>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
