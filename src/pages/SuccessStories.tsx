import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { GlassmorphNav } from '@/components/navigation/GlassmorphNav';

const stories = [
  {
    name: 'Sarah Mitchell',
    age: 32,
    transformation: 'Lost 45 lbs in 6 months',
    image: '/placeholder.svg',
    quote: 'BenchBarrier didn\'t just transform my body, it transformed my entire life. The personalized approach made all the difference.',
    stats: {
      weight: '-45 lbs',
      bodyFat: '-12%',
      strength: '+85%',
    },
    program: 'Elite Personal Training',
  },
  {
    name: 'Marcus Johnson',
    age: 28,
    transformation: 'Gained 25 lbs of muscle',
    image: '/placeholder.svg',
    quote: 'I\'ve tried countless gyms, but BenchBarrier\'s science-based approach and expert trainers helped me achieve what I thought was impossible.',
    stats: {
      weight: '+25 lbs',
      bodyFat: '-8%',
      strength: '+120%',
    },
    program: 'Powerhouse Program',
  },
  {
    name: 'Emily Rodriguez',
    age: 41,
    transformation: 'Completed first marathon',
    image: '/placeholder.svg',
    quote: 'At 41, I ran my first marathon thanks to BenchBarrier. They believed in me when I didn\'t believe in myself.',
    stats: {
      weight: '-18 lbs',
      endurance: '+200%',
      energy: '+150%',
    },
    program: 'Endurance Elite',
  },
  {
    name: 'David Chen',
    age: 35,
    transformation: 'Reversed pre-diabetes',
    image: '/placeholder.svg',
    quote: 'BenchBarrier saved my life. Through their nutrition and training program, I reversed my pre-diabetes and feel 20 years younger.',
    stats: {
      weight: '-52 lbs',
      bloodSugar: '-35%',
      energy: '+180%',
    },
    program: 'Wellness Transformation',
  },
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black">
      <SEOHead
        title="Success Stories & Transformations | BenchBarrier"
        description="Real transformations from real people. See how BenchBarrier's elite training programs have changed lives."
        keywords="fitness transformations, success stories, weight loss results, muscle gain, fitness testimonials"
        canonicalUrl="/success-stories"
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
            <Award className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold">REAL RESULTS</span>
          </div>

          <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-white mb-6">
            Transformation <span className="luxury-gradient">Success Stories</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            These aren't just transformations—they're life-changing journeys. Meet the people who trusted BenchBarrier and achieved the impossible.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '2,847', label: 'Transformations' },
              { value: '87%', label: 'Success Rate' },
              { value: '4.9/5', label: 'Avg Rating' },
              { value: '156K', label: 'lbs Lost Combined' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-charcoal/50 border border-gold/20 rounded-xl p-4"
              >
                <div className="text-3xl font-bold luxury-gradient mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <div className="space-y-20 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-charcoal/50 backdrop-blur-xl border border-gold/20 rounded-3xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
                {/* Left: Image & Stats */}
                <div>
                  <div className="aspect-square bg-gradient-to-br from-gold/20 to-rose-gold/20 rounded-2xl mb-6 flex items-center justify-center">
                    <div className="text-6xl">🏆</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(story.stats).map(([key, value], i) => (
                      <div key={i} className="bg-black/30 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-gold mb-1">{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Story */}
                <div className="flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-semibold mb-4 w-fit">
                    {story.program}
                  </div>

                  <h2 className="font-playfair text-4xl font-bold text-white mb-2">
                    {story.name}
                  </h2>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-400">Age {story.age}</span>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-gold" />
                      <span className="text-gold font-semibold">{story.transformation}</span>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>

                  <blockquote className="text-lg text-gray-300 italic mb-6 border-l-4 border-gold pl-4">
                    "{story.quote}"
                  </blockquote>

                  <Button
                    variant="outline"
                    className="border-gold/30 text-white hover:bg-gold/10 w-fit"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Case Study
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 bg-gradient-to-br from-gold/10 to-rose-gold/10 backdrop-blur-xl border border-gold/20 rounded-3xl p-12"
        >
          <h2 className="font-playfair text-4xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands who've transformed their lives with BenchBarrier's proven system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/lead-magnet'}
              className="bg-gradient-to-r from-gold to-rose-gold text-black font-bold text-lg px-8 py-6 hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300"
            >
              Start Your Transformation
            </Button>
            <Button
              onClick={() => window.location.href = '/quiz'}
              variant="outline"
              className="border-gold/30 text-white hover:bg-gold/10 px-8 py-6"
            >
              Take Fitness Quiz
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
