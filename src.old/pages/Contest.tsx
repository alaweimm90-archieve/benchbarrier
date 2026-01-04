import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Instagram, Heart, MessageCircle, Share2, Calendar, Award } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export default function Contest() {
  const [entries, setEntries] = useState([
    { id: 1, name: 'Sarah M.', image: '', likes: 342, comments: 28, shares: 15 },
    { id: 2, name: 'James K.', image: '', likes: 298, comments: 22, shares: 12 },
    { id: 3, name: 'Emily R.', image: '', likes: 276, comments: 19, shares: 10 },
    { id: 4, name: 'Michael T.', image: '', likes: 254, comments: 17, shares: 9 },
    { id: 5, name: 'Lisa P.', image: '', likes: 231, comments: 15, shares: 8 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagram: '',
    postUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Entry submitted! Good luck!');
  };

  return (
    <>
      <SEOHead
        title="Transformation Contest | BenchBarrier"
        description="Enter our monthly transformation contest and win amazing prizes. Share your journey and inspire others!"
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
              <Trophy className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold">January 2026 Contest</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4">
              <span className="gradient-text">Transformation Contest</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Share your transformation journey and win incredible prizes!
            </p>
          </motion.div>

          {/* Contest Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {[
              { icon: Trophy, title: '1st Prize', value: '$1,000 + 1 Year Free' },
              { icon: Award, title: '2nd Prize', value: '$500 + 6 Months Free' },
              { icon: Calendar, title: 'Deadline', value: 'January 31, 2026' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-6 text-center"
              >
                <item.icon className="w-12 h-12 text-gold mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Entry Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Enter the Contest</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name *</label>
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
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Instagram Post URL *</label>
                  <input
                    type="url"
                    value={formData.postUrl}
                    onChange={(e) => setFormData({ ...formData, postUrl: e.target.value })}
                    placeholder="https://instagram.com/p/..."
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">How to Enter:</h4>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li>1. Post your transformation on Instagram</li>
                    <li>2. Tag @benchbarrier and use #BenchBarrierTransformation</li>
                    <li>3. Make your post public</li>
                    <li>4. Submit the post URL here</li>
                  </ol>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-rose-gold text-black font-bold py-4 rounded-lg hover:shadow-luxury transition-all"
                >
                  Submit Entry
                </button>
              </form>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Current Leaderboard</h2>

              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      index === 0
                        ? 'bg-gradient-to-r from-gold/20 to-rose-gold/20 border-gold/50'
                        : 'bg-black/30 border-gold/10'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                          index === 0
                            ? 'bg-gradient-to-br from-gold to-rose-gold text-black'
                            : 'bg-charcoal text-gray-400'
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{entry.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {entry.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {entry.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {entry.shares}
                        </span>
                      </div>
                    </div>

                    {index === 0 && <Trophy className="w-6 h-6 text-gold" />}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                <p className="text-sm text-gray-300 text-center">
                  <Instagram className="w-4 h-4 inline mr-1" />
                  Rankings based on engagement (likes + comments + shares)
                </p>
              </div>
            </motion.div>
          </div>

          {/* Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-playfair font-bold text-white mb-6">Contest Rules</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Must be a current BenchBarrier member</li>
              <li>• Transformation must show progress over at least 30 days</li>
              <li>• Post must include before and after photos</li>
              <li>• Must tag @benchbarrier and use #BenchBarrierTransformation</li>
              <li>• Post must remain public until contest ends</li>
              <li>• Winner announced on February 1, 2026</li>
              <li>• Judging based on engagement and transformation quality</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
}
