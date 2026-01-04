import { motion } from 'framer-motion';
import { Check, X, Crown, Dumbbell, Users, Calendar, Heart, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { GlassmorphNav } from '@/components/navigation/GlassmorphNav';

const comparisonData = [
  {
    category: 'Training',
    icon: Dumbbell,
    features: [
      { name: 'Personalized Training Plans', benchbarrier: true, traditional: false },
      { name: 'Elite Certified Trainers', benchbarrier: true, traditional: false },
      { name: 'Progress Tracking & Analytics', benchbarrier: true, traditional: false },
      { name: 'Form Correction & Technique', benchbarrier: true, traditional: false },
      { name: 'Equipment Access', benchbarrier: true, traditional: true },
    ],
  },
  {
    category: 'Nutrition',
    icon: Heart,
    features: [
      { name: 'Custom Meal Plans', benchbarrier: true, traditional: false },
      { name: 'Nutrition Consulting', benchbarrier: true, traditional: false },
      { name: 'Supplement Guidance', benchbarrier: true, traditional: false },
      { name: 'Recipe Library', benchbarrier: true, traditional: false },
    ],
  },
  {
    category: 'Community',
    icon: Users,
    features: [
      { name: 'Small Group Classes', benchbarrier: true, traditional: true },
      { name: 'Private Member Events', benchbarrier: true, traditional: false },
      { name: 'Success Community', benchbarrier: true, traditional: false },
      { name: 'Accountability Partners', benchbarrier: true, traditional: false },
    ],
  },
  {
    category: 'Flexibility',
    icon: Calendar,
    features: [
      { name: 'Flexible Scheduling', benchbarrier: true, traditional: true },
      { name: '24/7 Access', benchbarrier: true, traditional: false },
      { name: 'Online Training Options', benchbarrier: true, traditional: false },
      { name: 'No Long-term Contracts', benchbarrier: true, traditional: false },
    ],
  },
  {
    category: 'Results',
    icon: Trophy,
    features: [
      { name: 'Guaranteed Results Program', benchbarrier: true, traditional: false },
      { name: 'Before/After Documentation', benchbarrier: true, traditional: false },
      { name: 'Monthly Progress Reviews', benchbarrier: true, traditional: false },
      { name: 'Success Rate: 87%', benchbarrier: true, traditional: false },
    ],
  },
];

export default function Comparison() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black">
      <SEOHead
        title="BenchBarrier vs Traditional Gyms | Why We're Different"
        description="See how BenchBarrier's elite fitness training compares to traditional gyms. Personalized plans, expert trainers, and guaranteed results."
        keywords="gym comparison, personal training vs gym, elite fitness, best gym alternative"
        canonicalUrl="/comparison"
      />
      <GlassmorphNav />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold">THE BENCHBARRIER DIFFERENCE</span>
          </div>

          <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-white mb-6">
            Why Choose <span className="luxury-gradient">BenchBarrier</span>?
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another gym. We're a complete transformation system designed to deliver real, lasting results.
          </p>
        </motion.div>

        {/* Comparison Table Header */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-gold to-rose-gold p-6 rounded-2xl">
                <Crown className="w-8 h-8 text-black mx-auto mb-2" />
                <h3 className="font-bold text-black text-xl">BenchBarrier</h3>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-charcoal/50 border border-gray-700 p-6 rounded-2xl">
                <Dumbbell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-bold text-gray-400 text-xl">Traditional Gyms</h3>
              </div>
            </motion.div>
          </div>

          {/* Comparison Categories */}
          <div className="space-y-8">
            {comparisonData.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 + 0.4 }}
                className="bg-charcoal/30 backdrop-blur-xl border border-gold/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                </div>

                <div className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-800 last:border-0"
                    >
                      <div className="text-gray-300">{feature.name}</div>
                      <div className="flex justify-center">
                        {feature.benchbarrier ? (
                          <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-gold" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center">
                        {feature.traditional ? (
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-gray-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="font-playfair text-4xl font-bold text-white text-center mb-12">
            Investment Comparison
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gold/20 to-rose-gold/20 backdrop-blur-xl border border-gold/30 rounded-3xl p-8">
              <div className="text-center mb-6">
                <Crown className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">BenchBarrier Elite</h3>
                <div className="text-4xl font-bold luxury-gradient mb-2">$299</div>
                <div className="text-gray-300">per month</div>
              </div>
              <ul className="space-y-3">
                {[
                  'Personal Training (8 sessions)',
                  'Custom Nutrition Plan',
                  'Progress Tracking',
                  '24/7 Gym Access',
                  'Group Classes Included',
                  'Success Guarantee',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-charcoal/50 border border-gray-700 rounded-3xl p-8">
              <div className="text-center mb-6">
                <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">Traditional Gym</h3>
                <div className="text-4xl font-bold text-gray-400 mb-2">$50+</div>
                <div className="text-gray-500">per month (base only)</div>
              </div>
              <ul className="space-y-3">
                {[
                  'Basic Gym Access',
                  'Personal Training: $60-100/session',
                  'Nutrition Plan: $150-300/month',
                  'No Progress Tracking',
                  'Group Classes: Extra $20-40',
                  'No Guarantees',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-500">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <div className="text-gray-400 text-sm mb-2">Actual Monthly Cost:</div>
                <div className="text-2xl font-bold text-gray-300">$500-800+</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <h2 className="font-playfair text-3xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands who've transformed their lives with BenchBarrier's elite training system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/lead-magnet'}
              className="bg-gradient-to-r from-gold to-rose-gold text-black font-bold text-lg px-8 py-6 hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300"
            >
              Start Free Trial
            </Button>
            <Button
              onClick={() => window.location.href = '/pricing'}
              variant="outline"
              className="border-gold/30 text-white hover:bg-gold/10 px-8 py-6"
            >
              View Pricing
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
