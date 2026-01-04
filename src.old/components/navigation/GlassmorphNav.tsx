import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '#services' },
  { name: 'Results', path: '#results' },
  { name: 'Pricing', path: '#pricing' },
  { name: 'Team', path: '#team' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '#contact' },
];

const GlassmorphNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-card backdrop-blur-xl border-b border-primary/20 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-champagne to-rose-gold flex items-center justify-center font-bold text-deep-black text-xl">
                  BB
                </div>
                <span className="text-2xl font-serif font-bold">
                  <span className="text-white">Bench</span>
                  <span className="gold-gradient-text">Barrier</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  {link.path.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(link.path)}
                      className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu - Sheet Component */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary hover:bg-transparent"
                >
                  <Menu size={24} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[400px] bg-deep-black/95 backdrop-blur-xl border-primary/20"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="text-2xl font-serif font-bold">
                      <span className="text-white">Bench</span>
                      <span className="gold-gradient-text">Barrier</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.path.startsWith('#') ? (
                        <button
                          onClick={() => {
                            handleNavClick(link.path);
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-xl font-serif font-semibold text-white hover:text-primary transition-colors duration-300 w-full text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xl font-serif font-semibold text-white hover:text-primary transition-colors duration-300 block"
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="mt-4">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-6 text-lg rounded-full font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default GlassmorphNav;
export { GlassmorphNav };
