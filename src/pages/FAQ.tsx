import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Play, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I get started with BenchBarrier?',
        a: 'Getting started is easy! Book a free consultation where we\'ll assess your fitness level, discuss your goals, and create a personalized plan. You can book online or call us directly.',
        video: 'https://example.com/video1.mp4'
      },
      {
        q: 'What should I bring to my first session?',
        a: 'Bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. We provide all equipment and amenities including lockers and showers.',
        video: null
      },
      {
        q: 'Do I need prior fitness experience?',
        a: 'Not at all! Our programs are designed for all fitness levels, from complete beginners to advanced athletes. Our coaches will tailor everything to your current abilities.',
        video: null
      }
    ]
  },
  {
    category: 'Membership & Pricing',
    questions: [
      {
        q: 'What membership options do you offer?',
        a: 'We offer three tiers: Foundation ($199/month), Elite ($349/month), and Champion ($599/month). Each includes different levels of personal training, nutrition coaching, and class access.',
        video: null
      },
      {
        q: 'Can I pause or cancel my membership?',
        a: 'Yes! You can pause your membership for up to 3 months per year, or cancel with 30 days notice. We want you to have flexibility that fits your life.',
        video: null
      },
      {
        q: 'Do you offer corporate or group discounts?',
        a: 'Absolutely! We have special corporate wellness packages and group training discounts. Contact us for custom pricing based on your needs.',
        video: 'https://example.com/video2.mp4'
      }
    ]
  },
  {
    category: 'Training & Programs',
    questions: [
      {
        q: 'What types of training do you offer?',
        a: 'We offer personal training, small group classes, strength training, HIIT, functional fitness, mobility work, and sport-specific training. All programs are customized to your goals.',
        video: 'https://example.com/video3.mp4'
      },
      {
        q: 'How often should I train?',
        a: 'We recommend 3-5 sessions per week for optimal results, but we\'ll create a schedule that fits your lifestyle and goals. Consistency is more important than frequency.',
        video: null
      },
      {
        q: 'Can I switch trainers if needed?',
        a: 'Yes! While we carefully match you with a coach, you\'re welcome to try different trainers to find the perfect fit for your personality and training style.',
        video: null
      }
    ]
  },
  {
    category: 'Nutrition & Wellness',
    questions: [
      {
        q: 'Do you provide nutrition coaching?',
        a: 'Yes! Our Elite and Champion memberships include personalized nutrition plans, meal prep guidance, and ongoing support from certified nutritionists.',
        video: 'https://example.com/video4.mp4'
      },
      {
        q: 'Can you accommodate dietary restrictions?',
        a: 'Absolutely! We work with all dietary preferences and restrictions including vegan, vegetarian, keto, paleo, gluten-free, and any allergies or medical requirements.',
        video: null
      },
      {
        q: 'Do you offer meal plans?',
        a: 'Yes! We provide customized meal plans with recipes, shopping lists, and macro tracking. Plans are adjusted based on your progress and feedback.',
        video: null
      }
    ]
  },
  {
    category: 'Facility & Amenities',
    questions: [
      {
        q: 'What are your facility hours?',
        a: 'We\'re open Monday-Friday 5am-10pm, Saturday-Sunday 7am-8pm. Champion members have 24/7 access with keycard entry.',
        video: null
      },
      {
        q: 'What amenities do you provide?',
        a: 'We offer state-of-the-art equipment, private training rooms, locker rooms with showers, towel service, recovery zones with massage chairs, and a nutrition bar.',
        video: 'https://example.com/video5.mp4'
      },
      {
        q: 'Is parking available?',
        a: 'Yes! We have free parking for all members in our dedicated lot, plus bike racks and easy access to public transportation.',
        video: null
      }
    ]
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqCategories
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(
        q =>
          (selectedCategory === 'all' || cat.category === selectedCategory) &&
          (searchQuery === '' ||
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }))
    .filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <SEOHead
        title="FAQ - Frequently Asked Questions | BenchBarrier"
        description="Find answers to common questions about BenchBarrier's elite fitness training, memberships, and programs"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Find answers to common questions about our programs, memberships, and services
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-charcoal border-gold/20 text-white h-14 text-lg"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-gold text-black'
                : 'bg-charcoal text-white/70 hover:bg-charcoal/80'
            }`}
          >
            All Questions
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === cat.category
                  ? 'bg-gold text-black'
                  : 'bg-charcoal text-white/70 hover:bg-charcoal/80'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredFAQs.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-playfair font-bold text-gold mb-4">
                {category.category}
              </h2>

              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const itemId = `${category.category}-${qIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <motion.div
                      key={itemId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: qIndex * 0.05 }}
                      className="bg-gradient-to-br from-charcoal via-black to-charcoal border border-gold/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-lg font-semibold text-white pr-4">
                          {item.q}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gold flex-shrink-0" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 border-t border-white/5">
                              <p className="text-white/70 leading-relaxed mt-4">
                                {item.a}
                              </p>

                              {item.video && (
                                <div className="mt-4 flex items-center gap-3">
                                  <button className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-lg text-gold hover:bg-gold/20 transition-colors">
                                    <Play className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Watch Video Answer</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/60 text-lg mb-4">
                No questions found matching your search.
              </p>
              <Button
                onClick={() => setSearchQuery('')}
                variant="outline"
                className="border-gold/20 text-gold"
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-br from-gold/10 via-transparent to-rose-gold/10 border border-gold/20 rounded-3xl p-8 md:p-12 text-center">
            <MessageCircle className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-3xl font-playfair font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Our team is here to help! Book a free consultation or reach out directly and we'll answer any questions you have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => window.location.href = '/booking'}
                className="bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold px-8 py-6 text-lg"
              >
                Book Free Consultation
              </Button>
              <Button
                onClick={() => window.location.href = '/contact'}
                variant="outline"
                className="border-gold/20 text-gold px-8 py-6 text-lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
