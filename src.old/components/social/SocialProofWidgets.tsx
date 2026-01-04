import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, TrendingUp, Award } from 'lucide-react';

export const LiveVisitorCounter = () => {
  const [visitors, setVisitors] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 bg-black/80 backdrop-blur-md border border-gold/20 rounded-lg px-4 py-3 z-50"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Users className="w-5 h-5 text-gold" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div>
          <p className="text-xs text-gray-400">Active Now</p>
          <p className="text-sm font-semibold text-white">{visitors} visitors</p>
        </div>
      </div>
    </motion.div>
  );
};

export const RecentSignupsTicker = () => {
  const signups = [
    { name: 'Sarah M.', time: '2 min ago', plan: 'Elite' },
    { name: 'James K.', time: '5 min ago', plan: 'Premium' },
    { name: 'Emily R.', time: '8 min ago', plan: 'Elite' },
    { name: 'Michael T.', time: '12 min ago', plan: 'Starter' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % signups.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [signups.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 bg-black/80 backdrop-blur-md border border-gold/20 rounded-lg px-4 py-3 z-50 min-w-[250px]"
    >
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-rose-gold flex items-center justify-center">
          <Award className="w-5 h-5 text-black" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{signups[currentIndex].name}</p>
          <p className="text-xs text-gray-400">
            Joined {signups[currentIndex].plan} • {signups[currentIndex].time}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const GoogleReviewsWidget = () => {
  const reviews = [
    { author: 'Jennifer L.', rating: 5, text: 'Best fitness experience ever!', date: '2 days ago' },
    { author: 'David M.', rating: 5, text: 'Transformed my life completely.', date: '1 week ago' },
    { author: 'Amanda K.', rating: 5, text: 'Elite trainers and facilities.', date: '2 weeks ago' },
  ];

  return (
    <div className="bg-gradient-to-br from-black via-charcoal to-black border border-gold/20 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-playfair font-bold text-white mb-2">Google Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white font-semibold">5.0</span>
            <span className="text-gray-400">(247 reviews)</span>
          </div>
        </div>
        <TrendingUp className="w-8 h-8 text-gold" />
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-charcoal/50 rounded-lg p-4 border border-gold/10"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-white">{review.author}</p>
                <div className="flex mt-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-400">{review.date}</span>
            </div>
            <p className="text-gray-300 text-sm">{review.text}</p>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 bg-gradient-to-r from-gold to-rose-gold text-black font-semibold py-3 rounded-lg hover:shadow-luxury transition-all">
        Read All Reviews
      </button>
    </div>
  );
};

export const TrustBadges = () => {
  const badges = [
    { icon: Award, text: 'Certified Trainers' },
    { icon: Star, text: '5-Star Rated' },
    { icon: Users, text: '1000+ Members' },
    { icon: TrendingUp, text: '98% Success Rate' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-xl p-6 text-center"
        >
          <badge.icon className="w-8 h-8 text-gold mx-auto mb-3" />
          <p className="text-white font-semibold text-sm">{badge.text}</p>
        </motion.div>
      ))}
    </div>
  );
};
