import { motion } from 'framer-motion';
import { Dumbbell, Apple, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description: 'One-on-one elite coaching tailored to your goals with cutting-edge techniques and personalized workout plans.',
    features: ['Custom Programs', '24/7 Support', 'Progress Tracking', 'Nutrition Guidance'],
    color: 'from-primary to-champagne',
  },
  {
    icon: Apple,
    title: 'Nutrition Consulting',
    description: 'Science-backed nutrition plans designed by certified experts to fuel your transformation and optimize performance.',
    features: ['Meal Planning', 'Macro Tracking', 'Supplement Advice', 'Lifestyle Coaching'],
    color: 'from-rose-gold to-primary',
  },
  {
    icon: Users,
    title: 'Group Classes',
    description: 'High-energy group sessions that combine community motivation with expert instruction for maximum results.',
    features: ['HIIT Training', 'Strength Classes', 'Mobility Work', 'Recovery Sessions'],
    color: 'from-champagne to-rose-gold',
  },
];

const ServicesShowcase = () => {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-deep-black via-charcoal to-deep-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-gold rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-sm font-semibold mb-4"
          >
            Our Services
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Elite Training</span>
            <br />
            <span className="gold-gradient-text">Programs</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Choose from our premium services designed to transform your body, mind, and lifestyle.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full glass-card border border-primary/20 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-rose-gold/20 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300"
                >
                  <service.icon className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="group/btn w-full justify-between text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>

                {/* 3D effect decoration */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-6">
            Not sure which program is right for you?
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
          >
            Schedule Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
