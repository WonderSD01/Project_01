import { MapPin } from 'lucide-react';
import { LOGO, MAPS_URL } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060607]/90 px-4 py-10 text-center dark:bg-[#060607]/90">
      <div className="inline-flex items-center gap-2 font-display text-xl font-black text-cream">
        <img
          src={LOGO}
          alt=""
          className="h-8 w-8 animate-float rounded-full border-2 border-fire-orange object-cover"
        />
        Lorenzo&apos;s Lechon
      </div>
      <p className="mt-2 text-sm text-muted">
        Open Daily · Pre-order required · Pick up &amp; delivery available
      </p>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-fire-orange transition hover:text-fire-amber"
      >
        <MapPin size={16} aria-hidden />
        Antipolo del Norte, Lipa City — Get Directions
      </a>
    </footer>
  );
}
