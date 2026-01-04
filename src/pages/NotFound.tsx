import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-primary/5 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-gold via-rose-gold to-champagne rounded-full blur-3xl opacity-20"
            />
            <Dumbbell className="w-32 h-32 text-gold relative z-10" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-9xl font-bold font-playfair bg-gradient-to-r from-gold via-rose-gold to-champagne bg-clip-text text-transparent mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-playfair text-white mb-4"
        >
          Lost Your Way?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 mb-8 max-w-md mx-auto"
        >
          Even champions take wrong turns. Let's get you back on track to achieving your fitness goals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <Button className="luxury-button group">
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Back to Home
            </Button>
          </Link>

          <Link to="/booking">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black transition-all">
              <Dumbbell className="w-5 h-5 mr-2" />
              Book a Session
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gold/20"
        >
          <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { to: '/pricing', label: 'Pricing' },
              { to: '/results', label: 'Results' },
              { to: '/quiz', label: 'Fitness Quiz' },
              { to: '/contact', label: 'Contact' },
            ].map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Link
                  to={link.to}
                  className="text-sm text-gray-400 hover:text-gold transition-colors px-4 py-2 rounded-full border border-gray-800 hover:border-gold"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <p className="text-xs text-gray-600">
            Error Code: 404 | Page Not Found
          </p>
        </motion.div>
      </div>
    </div>
  );
}
