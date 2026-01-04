import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Share2, Users, Trophy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/seo/SEOHead';
import { GlassmorphNav } from '@/components/navigation/GlassmorphNav';

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://benchbarrier.com/ref/YOUR-CODE';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rewards = [
    { referrals: 1, reward: '$50 Credit', icon: '🎁' },
    { referrals: 3, reward: 'Free Month', icon: '🏆' },
    { referrals: 5, reward: 'Premium Upgrade', icon: '👑' },
    { referrals: 10, reward: 'Lifetime Discount', icon: '💎' },
  ];

  const leaderboard = [
    { name: 'Sarah M.', referrals: 23, reward: 'Lifetime Member' },
    { name: 'Mike T.', referrals: 18, reward: '6 Free Months' },
    { name: 'Jessica L.', referrals: 15, reward: '4 Free Months' },
    { name: 'David K.', referrals: 12, reward: '3 Free Months' },
    { name: 'Emma R.', referrals: 10, reward: 'Lifetime Discount' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black">
      <SEOHead
        title="Referral Program | Earn Rewards at BenchBarrier"
        description="Refer friends to BenchBarrier and earn amazing rewards. Get free months, credits, and exclusive perks for every successful referral."
        keywords="referral program, fitness referral, gym rewards, refer a friend"
        canonicalUrl="/referral"
      />
      <GlassmorphNav />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
            <Gift className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold">REFERRAL REWARDS</span>
          </div>

          <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-white mb-6">
            Share the <span className="luxury-gradient">Transformation</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help your friends achieve their fitness goals and earn incredible rewards. It's a win-win!
          </p>
        </motion.div>

        {/* Referral Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="bg-charcoal/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8">
            <h2 className="font-playfair text-3xl font-bold text-white mb-6 text-center">
              Your Unique Referral Link
            </h2>

            <div className="flex gap-3 mb-6">
              <Input
                value={referralLink}
                readOnly
                className="bg-black/50 border-gold/30 text-white h-14 text-lg"
              />
              <Button
                onClick={handleCopy}
                className="bg-gradient-to-r from-gold to-rose-gold text-black font-bold px-8 hover:shadow-xl hover:shadow-gold/50 transition-all duration-300"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['Facebook', 'Twitter', 'WhatsApp'].map((platform) => (
                <Button
                  key={platform}
                  variant="outline"
                  className="border-gold/30 text-white hover:bg-gold/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {platform}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Rewards Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="font-playfair text-4xl font-bold text-white text-center mb-12">
            Unlock Amazing Rewards
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {rewards.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-charcoal/50 border border-gold/20 rounded-2xl p-6 text-center hover:border-gold/50 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{tier.icon}</div>
                <div className="text-3xl font-bold text-gold mb-2">{tier.referrals}</div>
                <div className="text-gray-400 text-sm mb-3">Referrals</div>
                <div className="text-xl font-bold text-white">{tier.reward}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="font-playfair text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Share Your Link',
                description: 'Send your unique referral link to friends via email, social media, or text.',
              },
              {
                step: '2',
                title: 'They Join',
                description: 'Your friend signs up using your link and completes their first month.',
              },
              {
                step: '3',
                title: 'You Both Win',
                description: 'You get rewards, they get a special discount. Everyone wins!',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-rose-gold rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-gold" />
            <h2 className="font-playfair text-4xl font-bold text-white text-center">
              Top Referrers
            </h2>
          </div>

          <div className="bg-charcoal/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8">
            <div className="space-y-4">
              {leaderboard.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-gold/10"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-gradient-to-br from-gold to-rose-gold text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-amber-700 text-white' :
                      'bg-charcoal text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.reward}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold" />
                    <span className="text-gold font-bold">{member.referrals}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
