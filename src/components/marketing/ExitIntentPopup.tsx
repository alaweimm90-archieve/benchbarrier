import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ExitIntentPopupProps {
  variant?: 'discount' | 'guide' | 'consultation';
}

export default function ExitIntentPopup({ variant = 'discount' }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupShown')) {
        setIsVisible(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Exit popup email captured:', email);
    setSubmitted(true);
    setTimeout(() => setIsVisible(false), 2000);
  };

  const content = {
    discount: {
      icon: <Gift className="w-12 h-12 text-gold" />,
      title: "Wait! Don't Miss Out",
      subtitle: "Get 20% OFF Your First Month",
      description: "Join BenchBarrier today and transform your fitness journey with elite coaching.",
      cta: "Claim Your Discount"
    },
    guide: {
      icon: <Zap className="w-12 h-12 text-gold" />,
      title: "Before You Go...",
      subtitle: "Free 7-Day Transformation Guide",
      description: "Download our exclusive guide with proven strategies from elite trainers.",
      cta: "Get Free Guide"
    },
    consultation: {
      icon: <Zap className="w-12 h-12 text-gold" />,
      title: "Ready to Transform?",
      subtitle: "Free 30-Minute Consultation",
      description: "Book a complimentary session with our expert coaches. Limited slots available.",
      cta: "Book Free Session"
    }
  };

  const currentContent = content[variant];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setIsVisible(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-gradient-to-br from-black via-charcoal to-black border border-gold/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-rose-gold/5 pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {!submitted ? (
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="flex justify-center mb-4"
                  >
                    {currentContent.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                    {currentContent.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xl text-gold mb-3">
                    {currentContent.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-white/70 mb-6">
                    {currentContent.description}
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/5 border-gold/20 text-white placeholder:text-white/40"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold hover:shadow-lg hover:shadow-gold/50 transition-all"
                    >
                      {currentContent.cta}
                    </Button>
                  </form>

                  {/* Trust badge */}
                  <p className="text-xs text-white/40 mt-4">
                    🔒 Your information is secure. No spam, ever.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-white mb-2">
                    Success!
                  </h3>
                  <p className="text-white/70">
                    Check your email for your exclusive offer.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
