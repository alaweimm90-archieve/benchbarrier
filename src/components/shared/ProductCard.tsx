import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductCardProps {
  title: string;
  description?: string;
  image?: string;
  price?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ProductCard = ({
  title,
  description,
  image,
  price,
  children,
  className = '',
  onClick,
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden border-primary/20 bg-white/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 group">
        {image && (
          <div className="relative overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-text-secondary">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        {children && (
          <CardContent className="text-text-secondary">
            {children}
          </CardContent>
        )}
        {price && (
          <CardFooter className="flex justify-between items-center">
            <span className="text-2xl font-bold gold-gradient-text">{price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </motion.button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

// Enhanced version with more dramatic effects
export const PremiumProductCard = ({
  title,
  description,
  image,
  price,
  children,
  className = '',
  onClick,
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        y: -12,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer relative group ${className}`}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-champagne to-rose-gold rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500" />
      
      <Card className="relative h-full overflow-hidden border-primary/20 bg-deep-black/80 backdrop-blur-sm hover:border-primary/60 transition-all duration-300">
        {image && (
          <div className="relative overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-64 object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/50 to-transparent" />
            {price && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <span className="text-lg font-bold text-primary-foreground">{price}</span>
              </motion.div>
            )}
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl text-white group-hover:gold-gradient-text transition-all duration-300">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-text-secondary text-base">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        {children && (
          <CardContent className="text-text-secondary">
            {children}
          </CardContent>
        )}
        <CardFooter>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary via-champagne to-rose-gold text-deep-black rounded-full font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            View Details
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
