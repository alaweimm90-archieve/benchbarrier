import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const HoverCard = ({ children, className = '', glowColor = 'gold' }: HoverCardProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${glowColor} to-rose-gold rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300`} />
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingCard = ({ children, className = '', delay = 0 }: FloatingCardProps) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export const TiltCard = ({ children, className = '' }: TiltCardProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateY: 5, rotateX: 5 }}
      transition={{ duration: 0.3 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};
