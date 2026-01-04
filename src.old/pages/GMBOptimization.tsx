import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Image, MessageSquare, Calendar, TrendingUp, Users, Award } from 'lucide-react';
import { useState } from 'react';
import SEOHead from '@/components/seo/SEOHead';

const GMBOptimization = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'photos' | 'reviews' | 'qa'>('posts');

  const posts = [
    {
      id: 1,
      type: 'Offer',
      title: 'New Year Special - 50% Off First Month',
      description: 'Start your transformation journey with our exclusive New Year offer. Limited time only!',
      cta: 'Sign Up Now',
      image: '/placeholder-offer.jpg',
      date: '2026-01-01'
    },
    {
      id: 2,
      type: 'Event',
      title: 'Free Fitness Workshop - January 15th',
      description: 'Join us for a comprehensive fitness workshop covering nutrition, training, and mindset.',
      cta: 'Register',
      date: '2026-01-15'
    },
    {
      id: 3,
      type: 'Update',
      title: 'New Equipment Arrival',
      description: 'We\'ve just added state-of-the-art equipment to enhance your training experience!',
      image: '/placeholder-equipment.jpg',
      date: '2026-01-03'
    }
  ];

  const photoCategories = [
    { name: 'Facility', count: 24, icon: MapPin },
    { name: 'Team', count: 12, icon: Users },
    { name: 'Equipment', count: 18, icon: Award },
    { name: 'Classes', count: 15, icon: Calendar },
    { name: 'Results', count: 32, icon: TrendingUp }
  ];

  const qaPairs = [
    {
      question: 'What are your operating hours?',
      answer: 'We\'re open Monday-Friday 5am-10pm, Saturday-Sunday 7am-8pm. 24/7 access available for premium members.',
      askedBy: 'Sarah M.',
      date: '2 days ago'
    },
    {
      question: 'Do you offer personal training?',
      answer: 'Yes! We offer 1-on-1 personal training, small group training, and online coaching. Book a free consultation to learn more.',
      askedBy: 'Mike R.',
      date: '5 days ago'
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, we have free parking for all members with 50+ spaces available.',
      askedBy: 'Jennifer L.',
      date: '1 week ago'
    }
  ];

  const stats = [
    { label: 'Profile Views', value: '12,450', change: '+23%', icon: TrendingUp },
    { label: 'Search Queries', value: '8,234', change: '+18%', icon: MapPin },
    { label: 'Website Clicks', value: '3,567', change: '+31%', icon: Users },
    { label: 'Direction Requests', value: '1,892', change: '+15%', icon: Phone }
  ];

  return (
    <>
      <SEOHead
        title="Google My Business Optimization | BenchBarrier"
        description="Manage and optimize BenchBarrier's Google My Business presence"
        path="/gmb"
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
              Google My Business Dashboard
            </h1>
            <p className="text-white/70 text-lg">
              Optimize your local presence and attract more clients
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-champagne flex items-center justify-center">
                      <Icon className="text-black" size={24} />
                    </div>
                    <span className="text-green-400 text-sm font-bold">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Business Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-playfair font-bold text-white mb-6">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-gold" size={20} />
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Address</div>
                  <div className="text-white">123 Fitness Ave, Los Angeles, CA 90001</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-gold" size={20} />
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Phone</div>
                  <div className="text-white">(555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-gold" size={20} />
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Hours</div>
                  <div className="text-white">Mon-Fri: 5am-10pm</div>
                  <div className="text-white/60 text-sm">Sat-Sun: 7am-8pm</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            {[
              { id: 'posts', label: 'Posts', icon: MessageSquare },
              { id: 'photos', label: 'Photos', icon: Image },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'qa', label: 'Q&A', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-gold to-champagne text-black'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            {activeTab === 'posts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-white">Recent Posts</h3>
                  <button className="px-6 py-3 bg-gradient-to-r from-gold to-champagne text-black font-bold rounded-xl hover:shadow-luxury transition-all">
                    Create New Post
                  </button>
                </div>
                {posts.map((post) => (
                  <div key={post.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-gold/20 text-gold text-sm font-bold rounded-full">
                        {post.type}
                      </span>
                      <span className="text-white/40 text-sm">{post.date}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{post.title}</h4>
                    <p className="text-white/70 mb-4">{post.description}</p>
                    {post.cta && (
                      <button className="text-gold font-bold hover:text-champagne transition-colors">
                        {post.cta} →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'photos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-white">Photo Categories</h3>
                  <button className="px-6 py-3 bg-gradient-to-r from-gold to-champagne text-black font-bold rounded-xl hover:shadow-luxury transition-all">
                    Upload Photos
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {photoCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.name} className="bg-white/5 rounded-xl p-6 text-center border border-white/10 hover:border-gold/50 transition-all cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold to-champagne flex items-center justify-center">
                          <Icon className="text-black" size={28} />
                        </div>
                        <div className="text-white font-bold mb-1">{category.name}</div>
                        <div className="text-white/60 text-sm">{category.count} photos</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-white mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="text-gold fill-gold" size={20} />
                        ))}
                      </div>
                      <span className="text-white font-bold">4.9</span>
                      <span className="text-white/60">(234 reviews)</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-gold to-champagne text-black font-bold rounded-xl hover:shadow-luxury transition-all">
                    Request Reviews
                  </button>
                </div>
                <div className="text-center py-12 text-white/60">
                  <Star className="w-16 h-16 mx-auto mb-4 text-gold/50" />
                  <p>Review management system ready</p>
                  <p className="text-sm mt-2">Connect to Google My Business API to display reviews</p>
                </div>
              </div>
            )}

            {activeTab === 'qa' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-white">Questions & Answers</h3>
                  <button className="px-6 py-3 bg-gradient-to-r from-gold to-champagne text-black font-bold rounded-xl hover:shadow-luxury transition-all">
                    Add Q&A
                  </button>
                </div>
                <div className="space-y-4">
                  {qaPairs.map((qa, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-start gap-4 mb-4">
                        <MessageSquare className="text-gold flex-shrink-0 mt-1" size={20} />
                        <div className="flex-1">
                          <div className="text-white font-bold mb-2">{qa.question}</div>
                          <div className="text-white/60 text-sm mb-2">Asked by {qa.askedBy} • {qa.date}</div>
                        </div>
                      </div>
                      <div className="pl-9 text-white/80 bg-white/5 rounded-lg p-4">
                        {qa.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GMBOptimization;
