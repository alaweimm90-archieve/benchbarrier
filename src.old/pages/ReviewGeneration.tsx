import { motion } from 'framer-motion';
import { Star, Mail, MessageSquare, Copy, Check, Send, TrendingUp, Award } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import SEOHead from '@/components/seo/SEOHead';

const ReviewGeneration = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'google' | 'facebook' | 'yelp'>('google');

  const reviewLinks = {
    google: 'https://g.page/r/benchbarrier/review',
    facebook: 'https://facebook.com/benchbarrier/reviews',
    yelp: 'https://yelp.com/biz/benchbarrier'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewLinks[selectedPlatform]);
    setCopiedLink(true);
    trackEvent('review_link_copied', { platform: selectedPlatform });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    trackEvent('review_request_sent', { platform: selectedPlatform });
    setTimeout(() => setEmailSent(false), 3000);
  };

  const stats = [
    { label: 'Total Reviews', value: '234', icon: Star, color: 'from-gold to-champagne' },
    { label: 'Average Rating', value: '4.9', icon: Award, color: 'from-rose-gold to-gold' },
    { label: 'This Month', value: '+42', icon: TrendingUp, color: 'from-champagne to-rose-gold' }
  ];

  const recentReviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'BenchBarrier transformed my life! The trainers are incredible and the facility is top-notch.',
      date: '2 days ago',
      platform: 'Google'
    },
    {
      name: 'Mike Rodriguez',
      rating: 5,
      text: 'Best gym in LA! Lost 30 pounds in 3 months with their personalized program.',
      date: '5 days ago',
      platform: 'Facebook'
    },
    {
      name: 'Emily Chen',
      rating: 5,
      text: 'The community here is amazing. Everyone is supportive and the results speak for themselves!',
      date: '1 week ago',
      platform: 'Google'
    }
  ];

  const emailTemplate = `Subject: We'd Love Your Feedback! ⭐

Hi [Client Name],

Thank you for being part of the BenchBarrier family! We hope you're enjoying your transformation journey with us.

Your feedback means the world to us and helps others discover the BenchBarrier experience. Would you mind taking 2 minutes to share your thoughts?

Leave a Review: ${reviewLinks[selectedPlatform]}

As a thank you, we'll add 100 bonus points to your loyalty account!

Keep crushing your goals! 💪

The BenchBarrier Team`;

  return (
    <>
      <SEOHead
        title="Review Generation System | BenchBarrier"
        description="Manage and generate customer reviews for BenchBarrier"
        path="/reviews"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-charcoal to-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-playfair font-bold mb-4 bg-gradient-to-r from-gold via-champagne to-rose-gold bg-clip-text text-transparent">
              Review Generation System
            </h1>
            <p className="text-white/70 text-lg">
              Build trust and attract more clients with authentic reviews
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-gold/50 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-black" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Review Request Tool */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Request Reviews</h2>

              {/* Platform Selection */}
              <div className="mb-6">
                <label className="text-white/70 text-sm mb-3 block">Select Platform</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['google', 'facebook', 'yelp'] as const).map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`py-3 px-4 rounded-xl font-bold capitalize transition-all ${
                        selectedPlatform === platform
                          ? 'bg-gradient-to-r from-gold to-champagne text-black'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Link */}
              <div className="mb-6">
                <label className="text-white/70 text-sm mb-3 block">Review Link</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={reviewLinks[selectedPlatform]}
                    readOnly
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  />
                  <motion.button
                    onClick={handleCopyLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-gold to-champagne text-black font-bold rounded-xl hover:shadow-luxury transition-all flex items-center gap-2"
                  >
                    {copiedLink ? <Check size={20} /> : <Copy size={20} />}
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
              </div>

              {/* Email Template */}
              <div className="mb-6">
                <label className="text-white/70 text-sm mb-3 block">Email Template</label>
                <textarea
                  value={emailTemplate}
                  readOnly
                  rows={12}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono resize-none"
                />
              </div>

              {/* Send Button */}
              <motion.button
                onClick={handleSendEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={emailSent}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  emailSent
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-gold to-champagne text-black hover:shadow-luxury'
                }`}
              >
                {emailSent ? (
                  <>
                    <Check size={20} />
                    Email Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Review Request
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Recent Reviews</h2>

              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white font-bold mb-1">{review.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="text-gold fill-gold" size={14} />
                            ))}
                          </div>
                          <span className="text-white/40 text-xs">• {review.date}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">
                        {review.platform}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">{review.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Review Widget Preview */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gold/10 to-champagne/10 rounded-xl border border-gold/20">
                <div className="text-white/70 text-sm mb-3">Widget Preview</div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="text-gold fill-gold" size={20} />
                        ))}
                      </div>
                      <span className="text-white font-bold text-xl">4.9</span>
                    </div>
                    <div className="text-white/60 text-sm">Based on 234 reviews</div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-gold to-champagne text-black font-bold rounded-lg text-sm hover:shadow-luxury transition-all">
                    Write a Review
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Automation Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gold/10 to-champagne/10 border border-gold/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-playfair font-bold text-white mb-6">Review Generation Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="text-gold font-bold mb-2">⏰ Timing is Key</div>
                <p className="text-white/70 text-sm">
                  Send review requests 3-7 days after a positive experience or milestone achievement.
                </p>
              </div>
              <div>
                <div className="text-gold font-bold mb-2">🎁 Incentivize</div>
                <p className="text-white/70 text-sm">
                  Offer loyalty points or small rewards for leaving honest reviews (within platform guidelines).
                </p>
              </div>
              <div>
                <div className="text-gold font-bold mb-2">📱 Make it Easy</div>
                <p className="text-white/70 text-sm">
                  Provide direct links and clear instructions. The easier it is, the more reviews you'll get.
                </p>
              </div>
              <div>
                <div className="text-gold font-bold mb-2">💬 Respond Always</div>
                <p className="text-white/70 text-sm">
                  Reply to every review (positive and negative) within 24 hours to show you care.
                </p>
              </div>
              <div>
                <div className="text-gold font-bold mb-2">📊 Track & Analyze</div>
                <p className="text-white/70 text-sm">
                  Monitor review trends and sentiment to identify areas for improvement.
                </p>
              </div>
              <div>
                <div className="text-gold font-bold mb-2">🔄 Automate</div>
                <p className="text-white/70 text-sm">
                  Set up automated email sequences triggered by specific events or milestones.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ReviewGeneration;
