import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const LuxuryFooter = () => {
  return (
    <footer className="bg-deep-black border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border border-primary/20 rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-serif font-bold text-white mb-2">
                Stay <span className="gold-gradient-text">Updated</span>
              </h3>
              <p className="text-text-secondary">
                Get exclusive fitness tips, nutrition advice, and special offers delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-charcoal border-primary/20 flex-1"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-champagne to-rose-gold flex items-center justify-center font-bold text-deep-black text-xl">
                BB
              </div>
              <span className="text-2xl font-serif font-bold">
                <span className="text-white">Bench</span>
                <span className="gold-gradient-text">Barrier</span>
              </span>
            </div>
            <p className="text-text-muted text-sm mb-6">
              Elite fitness training for those who refuse to settle for average.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass-card border border-primary/20 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Services', 'Pricing', 'Team', 'Blog'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="text-text-muted hover:text-primary transition-colors text-sm opacity-50 hover:opacity-100"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {['Personal Training', 'Nutrition Consulting', 'Group Classes', 'Online Coaching', 'Corporate Wellness'].map((service) => (
                <li key={service}>
                  <Link
                    to="#"
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-text-muted text-sm">
              <li>123 Elite Fitness Ave</li>
              <li>Los Angeles, CA 90001</li>
              <li className="pt-2">(555) 123-4567</li>
              <li>info@benchbarrier.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-sm">
          <p>© 2026 BenchBarrier. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
