import { motion } from 'framer-motion';
import { Truck, X } from 'lucide-react';
import { useState } from 'react';

export const FreeShippingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-gradient-to-r from-primary via-champagne to-rose-gold text-deep-black py-2 px-4 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
        <Truck size={18} className="animate-pulse" />
        <span>Free Shipping on Orders over $100</span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};
