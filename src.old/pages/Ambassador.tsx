import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Gift, Users, TrendingUp, Instagram, CheckCircle } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export default function Ambassador() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    followers: '',
    why: '',
    experience: '',
  });

  const ambassadors = [
    { name: 'Sarah Johnson', instagram: '@sarahfitness', followers: '25K', specialty: 'Strength Training' },
    { name: 'Mike Chen', instagram: '@mikelifts', followers: '18K', specialty: 'Bodybuilding' },
    { name: 'Emma Davis', instagram: '@emmawellness', followers: '32K', specialty: 'Nutrition' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted! We\'ll review and get back to you soon.');
  };

  return (
    <>
      <SEOHead
        title="Brand Ambassador Program | BenchBarrier"
        description="Join the BenchBarrier ambassador program and represent elite fitness. Get exclusive perks, free membership, and more!"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-rose-gold/20 border border-gold/30 rounded-full px-6 py-2 mb-4">
              <Star className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold">Elite Program</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4">
              <span className="gradient-text">Brand Ambassador</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Represent BenchBarrier and inspire others while enjoying exclusive benefits
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
            {[
              { icon: Gift, title: 'Free Membership', desc: 'Lifetime elite access' },
              { icon: Star, title: 'Exclusive Merch', desc: 'Limited edition gear' },
              { icon: Users, title: 'Community', desc: 'Network with elites' },
              { icon: TrendingUp, title: 'Grow Together', desc: 'Boost your brand' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-6 text-center"
              >
                <benefit.icon className="w-12 h-12 text-gold mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Apply Now</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Instagram Handle *</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@yourusername"
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Follower Count *</label>
                  <select
                    value={formData.followers}
                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  >
                    <option value="">Select range</option>
                    <option value="1k-5k">1K - 5K</option>
                    <option value="5k-10k">5K - 10K</option>
                    <option value="10k-25k">10K - 25K</option>
                    <option value="25k-50k">25K - 50K</option>
                    <option value="50k+">50K+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Fitness Experience *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="beginner">Beginner (0-1 year)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3-5 years)</option>
                    <option value="expert">Expert (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Why do you want to be an ambassador? *</label>
                  <textarea
                    value={formData.why}
                    onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                    rows={4}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-rose-gold text-black font-bold py-4 rounded-lg hover:shadow-luxury transition-all"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>

            {/* Program Details & Current Ambassadors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* What You'll Do */}
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-white mb-4">What You'll Do</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Post 2-3 times per week featuring BenchBarrier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Share your fitness journey and transformations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Attend exclusive ambassador events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Provide feedback on new programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Inspire and engage with the community</span>
                  </li>
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-gradient-to-br from-gold/10 to-rose-gold/10 border border-gold/30 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-white mb-4">Requirements</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Instagram className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Active Instagram with 1K+ followers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Passionate about fitness and wellness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Align with BenchBarrier values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Consistent content creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Professional and positive attitude</span>
                  </li>
                </ul>
              </div>

              {/* Current Ambassadors */}
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-white mb-4">Current Ambassadors</h3>
                <div className="space-y-4">
                  {ambassadors.map((ambassador, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gold/10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-rose-gold" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{ambassador.name}</h4>
                        <p className="text-sm text-gray-400">{ambassador.instagram} • {ambassador.followers}</p>
                        <p className="text-xs text-gold mt-1">{ambassador.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
