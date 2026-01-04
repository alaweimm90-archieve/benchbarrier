import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-deep-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-sm font-semibold mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Start Your</span>
            <br />
            <span className="gold-gradient-text">Journey Today</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card border border-primary/20 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="First Name" className="bg-charcoal border-primary/20" />
                <Input placeholder="Last Name" className="bg-charcoal border-primary/20" />
              </div>
              <Input type="email" placeholder="Email" className="bg-charcoal border-primary/20" />
              <Input type="tel" placeholder="Phone" className="bg-charcoal border-primary/20" />
              <Textarea
                placeholder="Tell us about your fitness goals..."
                rows={5}
                className="bg-charcoal border-primary/20"
              />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 rounded-full font-semibold text-lg">
                Schedule Free Consultation
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map Placeholder */}
            <div className="glass-card border border-primary/20 rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-charcoal to-slate-black flex items-center justify-center">
              <MapPin className="w-16 h-16 text-primary/30" />
            </div>

            {/* Contact Details */}
            <div className="glass-card border border-primary/20 rounded-3xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-text-muted text-sm">123 Elite Fitness Ave<br />Los Angeles, CA 90001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <p className="text-text-muted text-sm">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-text-muted text-sm">info@benchbarrier.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Hours</h4>
                  <p className="text-text-muted text-sm">Mon-Fri: 5AM - 10PM<br />Sat-Sun: 7AM - 8PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
