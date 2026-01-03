import { motion } from 'framer-motion';

export const SkipToContent = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-luxury-gold focus:text-black focus:rounded-lg focus:font-semibold focus:shadow-luxury"
      initial={{ opacity: 0 }}
      whileFocus={{ opacity: 1 }}
    >
      Skip to main content
    </motion.a>
  );
};
