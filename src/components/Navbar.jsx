import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { LOGO, NAV_LINKS } from '../data/siteData';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection, useScrollProgress } from '../hooks/useActiveSection';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const active = useActiveSection(NAV_LINKS.map((l) => l.href));
  const progress = useScrollProgress();

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 glass-strong"
      >
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-fire-gradient origin-left"
          style={{ scaleX: progress, width: '100%' }}
        />

        <nav
          className="flex h-[60px] w-full items-center justify-start gap-2 px-4 sm:gap-4 sm:px-6"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5 no-underline"
            aria-label="Lorenzo's Lechon home"
          >
            <motion.img
              whileHover={{ rotate: -8, scale: 1.08 }}
              src={LOGO}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full border-2 border-fire-orange object-cover"
            />
            <span className="font-display text-base font-extrabold text-theme sm:text-lg">
              Lorenzo&apos;s <span className="fire-text">Lechon</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 lg:px-4 ${
                  active === link.href.slice(1)
                    ? 'bg-red-gradient text-white shadow-fire'
                    : 'text-gray-700 hover:bg-black/5 dark:text-cream/80 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="grid h-10 w-10 place-items-center rounded-full glass text-theme transition hover:border-fire-orange/40"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-xl glass text-theme md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={close}
              aria-label="Close menu overlay"
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 top-[60px] z-50 w-[min(300px,85vw)] border-r border-black/10 glass-strong p-5 text-left md:hidden dark:border-white/10"
            >
              <div className="flex flex-col items-start gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`w-full rounded-xl px-4 py-3.5 text-left text-sm font-bold uppercase tracking-wider ${
                      active === link.href.slice(1)
                        ? 'bg-red-gradient text-white'
                        : 'text-gray-700 hover:bg-black/5 dark:text-cream/80 dark:hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
