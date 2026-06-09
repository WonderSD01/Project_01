import { motion } from 'framer-motion';
import { Phone, Receipt } from 'lucide-react';

export default function StickyBar() {
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-x-0 bottom-0 z-50 glass-strong border-t border-white/10 px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-lg gap-2.5">
        <a
          href="#menu"
          className="btn-fire flex-1 py-3 text-sm"
        >
          <Receipt size={16} aria-hidden />
          See Prices
        </a>
        <a
          href="tel:+639970665673"
          className="btn-ghost flex-1 py-3 text-sm"
        >
          <Phone size={16} aria-hidden />
          Call Now
        </a>
      </div>
    </motion.div>
  );
}
