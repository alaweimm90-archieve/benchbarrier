import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, Star, TrendingUp, Users, Zap, Crown, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';

const tiers = [
  {
    name: 'Bronze',
    icon: Award,
    color: 'from-amber-700 to-amber-500',
    points: '0-999',
    benefits: [
      '5% discount on merchandise',
      'Birthday bonus points',
      'Early access to events',
      'Member newsletter'
    ]
  },
  {
    name: 'Silver',
    icon: Star,
    color: 'from-gray-400 to-gray-200',
    points: '1,000-2,999',
    benefits: [
      '10% discount on merchandise',
      'Free guest passes (2/month)',
      'Priority class booking',
      'Quarterly wellness assessment',
      'All Bronze benefits'
    ]
  },
  {
    name: 'Gold',
    icon: Crown,
    color: 'from-gold to-champagne',
    points: '3,000-5,999',
    benefits: [
      '15% discount on merchandise',
      'Free guest passes (4/month)',
      'Complimentary nutrition consultation',
      'VIP event access',
      'All Silver benefits'
    ]
  },
  {
    name: 'Platinum',
    icon: Trophy,
    color: 'from-purple-400 to-pink-400',
    points: '6,000+',
    benefits: [
      '20% discount on merchandise',
      'Unlimited guest passes',
      'Monthly massage therapy session',
      'Personal training discount (10%)',
      'Exclusive Platinum events',
      'All Gold benefits'
    ]
  }
];

const earnPoints = [
  { action: 'Monthly membership payment', points: 100, icon: TrendingUp },
  { action: 'Attend a class', points: 10, icon: Zap },
  { action: 'Refer a friend who joins', points: 500, icon: Users },
  { action: 'Social media share', points: 25, icon: Star },
  { action: 'Complete a challenge', points: 200, icon: Trophy },
  { action: 'Write a review', points: 50, icon: Award }
];

const redeemRewards = [
  { reward: 'Free personal training session', points: 500 },
  { reward: 'BenchBarrier merchandise ($50 value)', points: 750 },
  { reward: 'Nutrition consultation', points: 400 },
  { reward: 'Massage therapy session', points: 600 },
  { reward: 'One month free membership', points: 2000 },
  { reward: 'Premium gym bag', points: 300 }
];

export default function Loyalty() {
  const [selectedTier, setSelectedTier] = useState(2);
  const [points, setPoints] = useState(1500);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <SEOHead
        title="Loyalty Program - BenchBarrier"
        description="Earn rewards and exclusive benefits with BenchBarrier's loyalty program"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
            Loyalty <span className="text-gradient">Rewards</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get rewarded for your commitment to fitness. Earn points with every workout and unlock exclusive benefits.
          </p>
        </motion.div>

        {/* Points Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-gold/10 via-transparent to-rose-gold/10 border border-gold/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-white mb-2">
                Your Points Balance
              </h2>
              <div className="text-6xl font-bold text-gradient mb-4">
                {points.toLocaleString()}
              </div>
              <p className="text-white/60">
                Current Tier: <span className="text-gold font-semibold">{tiers[selectedTier].name}</span>
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              {tiers.map((tier, index) => (
                <div key={tier.name} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      index <= selectedTier
                        ? 'bg-gradient-to-br ' + tier.color + ' border-gold'
                        : 'bg-charcoal border-white/20'
                    }`}
                  >
                    <tier.icon className={`w-6 h-6 ${index <= selectedTier ? 'text-black' : 'text-white/40'}`} />
                  </div>
                  <span className="text-xs text-white/60 mt-2">{tier.name}</span>
                </div>
              ))}
            </div>

            <div className="h-2 bg-charcoal rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(points / 6000) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-gold via-champagne to-gold"
              />
            </div>

            <p className="text-center text-sm text-white/60 mt-4">
              {6000 - points > 0
                ? `${(6000 - points).toLocaleString()} points until Platinum tier`
                : 'You\'ve reached the highest tier!'}
            </p>
          </div>
        </motion.div>

        {/* Membership Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-playfair font-bold text-white text-center mb-8">
            Membership Tiers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-charcoal via-black to-charcoal border rounded-2xl p-6 ${
                  index === selectedTier ? 'border-gold' : 'border-white/10'
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <tier.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-gold text-sm font-semibold mb-4">
                  {tier.points} points
                </p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <Star className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Earn Points */}
        <div className="mb-16">
          <h2 className="text-3xl font-playfair font-bold text-white text-center mb-8">
            How to Earn Points
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {earnPoints.map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-charcoal via-black to-charcoal border border-gold/10 rounded-xl p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">{item.action}</p>
                  <p className="text-gold text-sm font-bold">+{item.points} points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Redeem Rewards */}
        <div className="mb-16">
          <h2 className="text-3xl font-playfair font-bold text-white text-center mb-8">
            Redeem Your Points
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {redeemRewards.map((item, index) => (
              <motion.div
                key={item.reward}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-charcoal via-black to-charcoal border border-gold/10 rounded-xl p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Gift className="w-8 h-8 text-gold flex-shrink-0" />
                  <p className="text-white font-semibold">{item.reward}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold font-bold">{item.points}</p>
                  <p className="text-xs text-white/60">points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-gold/10 via-transparent to-rose-gold/10 border border-gold/20 rounded-3xl p-8 md:p-12">
            <Trophy className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="text-3xl font-playfair font-bold text-white mb-4">
              Start Earning Today
            </h3>
            <p className="text-white/70 mb-8">
              Join BenchBarrier and automatically enroll in our loyalty program. Start earning points with your first workout!
            </p>
            <Button
              onClick={() => window.location.href = '/pricing'}
              className="bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold px-8 py-6 text-lg"
            >
              View Membership Plans
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
