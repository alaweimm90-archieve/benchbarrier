import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Bell, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/seo/SEOHead';

const popularClasses = [
  { id: 'hiit', name: 'HIIT Bootcamp', time: 'Mon/Wed/Fri 6:00 AM', waitlist: 12, estimated: '2-3 weeks' },
  { id: 'strength', name: 'Strength & Power', time: 'Tue/Thu 7:00 PM', waitlist: 8, estimated: '1-2 weeks' },
  { id: 'yoga', name: 'Power Yoga Flow', time: 'Sat 9:00 AM', waitlist: 15, estimated: '3-4 weeks' },
  { id: 'boxing', name: 'Boxing Fundamentals', time: 'Mon/Wed 5:30 PM', waitlist: 10, estimated: '2 weeks' }
];

export default function Waitlist() {
  const [selectedClass, setSelectedClass] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Waitlist submission:', { selectedClass, formData });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <SEOHead title="Waitlist Confirmed - BenchBarrier" description="You're on the waitlist" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-charcoal via-black to-charcoal border border-gold/20 rounded-3xl p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-gold" />
              </motion.div>
              <h1 className="text-4xl font-playfair font-bold text-white mb-4">
                You're on the List!
              </h1>
              <p className="text-xl text-white/70 mb-8">
                We'll notify you as soon as a spot opens up in your selected class.
              </p>
              <div className="bg-black/40 border border-gold/10 rounded-xl p-6 mb-8">
                <p className="text-gold font-semibold mb-2">Priority Position</p>
                <p className="text-3xl font-bold text-white">#{Math.floor(Math.random() * 5) + 1}</p>
              </div>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold px-8 py-6"
              >
                Return to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <SEOHead
        title="Join Waitlist - BenchBarrier"
        description="Join the waitlist for BenchBarrier's most popular classes and training programs"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
            Join the <span className="text-gradient">Waitlist</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Our most popular classes fill up fast. Join the waitlist and we'll notify you when spots become available.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {popularClasses.map((cls, index) => (
            <motion.button
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedClass(cls.id)}
              className={`text-left p-6 rounded-2xl border-2 transition-all ${
                selectedClass === cls.id
                  ? 'border-gold bg-gold/10'
                  : 'border-white/10 bg-gradient-to-br from-charcoal via-black to-charcoal hover:border-gold/50'
              }`}
            >
              <h3 className="text-xl font-playfair font-bold text-white mb-2">
                {cls.name}
              </h3>
              <div className="flex items-center gap-2 text-white/60 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{cls.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" />
                  <span className="text-sm text-white/70">{cls.waitlist} on waitlist</span>
                </div>
                <span className="text-xs text-gold font-semibold">
                  Est. {cls.estimated}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {selectedClass && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-charcoal via-black to-charcoal border border-gold/20 rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-gold" />
                <h2 className="text-2xl font-playfair font-bold text-white">
                  Get Notified
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-white/70 mb-2 block">Full Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-white/70 mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-white/70 mb-2 block">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold py-6 text-lg"
                >
                  Join Waitlist
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <p>
                    You'll receive priority access when spots open up. We'll send you an email and text notification with 24 hours to claim your spot.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
