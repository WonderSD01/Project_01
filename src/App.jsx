import { lazy, Suspense } from 'react';
import { useTheme } from './hooks/useTheme';
import { BG_TEXTURE } from './data/siteData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Features = lazy(() => import('./components/Features'));
const Gallery = lazy(() => import('./components/Gallery'));
const Stats = lazy(() => import('./components/Stats'));
const PriceList = lazy(() => import('./components/PriceList'));
const HowToOrder = lazy(() => import('./components/HowToOrder'));
const About = lazy(() => import('./components/About'));
const Reviews = lazy(() => import('./components/Reviews'));
const CTA = lazy(() => import('./components/CTA'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${BG_TEXTURE}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        />
        <div
          className={
            isDark
              ? 'absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/65 via-[#0B0B0C]/45 to-[#0B0B0C]/70'
              : 'absolute inset-0 bg-gradient-to-b from-[#FAF7F4]/60 via-[#FAF7F4]/40 to-[#FAF7F4]/65'
          }
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,122,24,0.12),transparent_70%)]'
              : 'bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,122,24,0.08),transparent_70%)]'
          }`}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pb-8">
          <Hero />
          <Suspense fallback={null}>
            <Features />
            <Gallery />
            <Stats />
            <PriceList />
            <HowToOrder />
            <About />
            <Reviews />
            <CTA />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
