import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { BG_TEXTURE } from './data/siteData';
import Navbar from './components/Navbar';
import StickyBar from './components/StickyBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import PriceList from './components/PriceList';
import HowToOrder from './components/HowToOrder';
import About from './components/About';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function App() {
  const { isDark } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Scrollable page background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url("${BG_TEXTURE}")` }}
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

        <AnimatePresence mode="wait">
          {loaded && (
            <motion.main
              key="main"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pb-24"
            >
              <Hero />
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
            </motion.main>
          )}
        </AnimatePresence>

        <StickyBar />
      </div>
    </div>
  );
}
