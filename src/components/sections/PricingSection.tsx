import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingTiers = [
  {
    name: 'Starter',
    price: '199',
    period: 'month',
    description: 'Perfect for beginners ready to start their fitness journey',
    features: [
      '2 Personal Training Sessions/week',
      'Basic Nutrition Plan',
      'Gym Access (Peak Hours)',
      'Progress Tracking App',
      'Email Support',
      'Group Classes (2/week)',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Elite',
    price: '399',
    period: 'month',
    description: 'Our most popular plan for serious transformations',
    features: [
      '4 Personal Training Sessions/week',
      'Custom Nutrition & Meal Plans',
      '24/7 Gym Access',
      'Advanced Progress Analytics',
      'Priority Support (24/7)',
      'Unlimited Group Classes',
      'Recovery & Mobility Sessions',
      'Supplement Consultation',
    ],
    cta: 'Start Elite Training',
    popular: true,
  },
  {
    name: 'Champion',
    price: '799',
    period: 'month',
    description: 'Ultimate transformation with VIP treatment',
    features: [
      'Unlimited Personal Training',
      'Personalized Nutrition Coaching',
      'VIP Gym Access + Private Area',
      'Real-time Performance Tracking',
      'Dedicated Success Manager',
      'All Group Classes + Private Sessions',
      'Recovery Suite Access',
      'Supplement Program Included',
      'Monthly Body Composition Analysis',
      'Exclusive Member Events',
    ],
    cta: 'Go Champion',
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 px-4 bg-deep-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-gold rounded-full blur-3xl" />
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
            Membership Plans
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Invest in</span>
            <br />
            <span className="gold-gradient-text">Your Future</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Choose the perfect plan to match your goals and commitment level.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`relative group ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary via-champagne to-primary bg-[length:200%_100%] animate-shimmer text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/50">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <div
                className={`relative h-full glass-card rounded-3xl p-8 overflow-hidden transition-all duration-500 ${
                  tier.popular
                    ? 'border-2 border-primary shadow-2xl shadow-primary/20'
                    : 'border border-primary/20 hover:border-primary/50'
                }`}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-rose-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    tier.popular ? 'opacity-50' : ''
                  }`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-text-muted text-sm">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold gold-gradient-text">
                        ${tier.price}
                      </span>
                      <span className="text-text-muted">/{tier.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-text-secondary text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-6 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                      tier.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/50'
                        : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </div>

                {/* Decorative element */}
                {tier.popular && (
                  <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-2xl" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card border border-primary/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            All Plans Include
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-sm text-text-secondary">
            <div>
              <div className="text-primary font-semibold mb-1">No Commitment</div>
              <div>Cancel anytime</div>
            </div>
            <div>
              <div className="text-primary font-semibold mb-1">Money-Back Guarantee</div>
              <div>30-day guarantee</div>
            </div>
            <div>
              <div className="text-primary font-semibold mb-1">Free Assessment</div>
              <div>Initial consultation</div>
            </div>
            <div>
              <div className="text-primary font-semibold mb-1">Flexible Scheduling</div>
              <div>Book sessions anytime</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">
            Need a custom plan? We can create something perfect for you.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-full"
          >
            Contact Us for Custom Plan
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
