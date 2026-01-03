import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Calendar, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/seo/SEOHead';
import { subscribeToNewsletter } from '@/lib/emailService';

interface NewsletterArchive {
  id: string;
  title: string;
  date: string;
  preview: string;
  topics: string[];
  downloadUrl: string;
}

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const topics = [
    'Training Tips',
    'Nutrition Advice',
    'Success Stories',
    'New Classes',
    'Exclusive Offers',
    'Mindset & Motivation',
  ];

  const archives: NewsletterArchive[] = [
    {
      id: '1',
      title: 'January 2026 - New Year, New You',
      date: '2026-01-01',
      preview: 'Start the year strong with our complete guide to setting and achieving fitness goals...',
      topics: ['Goal Setting', 'Training Plans', 'Nutrition Reset'],
      downloadUrl: '/newsletters/jan-2026.pdf',
    },
    {
      id: '2',
      title: 'December 2025 - Holiday Fitness Guide',
      date: '2025-12-01',
      preview: 'Stay on track during the holidays with our expert tips and strategies...',
      topics: ['Holiday Workouts', 'Healthy Recipes', 'Stress Management'],
      downloadUrl: '/newsletters/dec-2025.pdf',
    },
    {
      id: '3',
      title: 'November 2025 - Strength Building Special',
      date: '2025-11-01',
      preview: 'Master the fundamentals of strength training with our comprehensive guide...',
      topics: ['Strength Training', 'Progressive Overload', 'Recovery'],
      downloadUrl: '/newsletters/nov-2025.pdf',
    },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter({
        email,
        name,
        preferences: selectedTopics,
      });

      if (result.success) {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <>
      <SEOHead
        title="Newsletter - Stay Updated with BenchBarrier"
        description="Subscribe to BenchBarrier newsletter for exclusive fitness tips, success stories, and special offers"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-primary/5 to-black pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              <span className="luxury-gradient">BenchBarrier Newsletter</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get exclusive fitness tips, success stories, and special offers delivered to your inbox
            </p>
          </motion.div>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">Subscribe Now</h2>
              
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="bg-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-black/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">
                    What topics interest you? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedTopics.includes(topic)
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="luxury-button w-full"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By subscribing, you agree to receive marketing emails from BenchBarrier.
                  You can unsubscribe at any time.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 mb-16 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Welcome to the BenchBarrier Community!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Check your email to confirm your subscription
              </p>
              <p className="text-muted-foreground">
                You'll receive your first newsletter soon with exclusive content and offers.
              </p>
            </motion.div>
          )}

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What You'll Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Expert Tips',
                  description: 'Weekly training and nutrition advice from certified professionals',
                },
                {
                  title: 'Success Stories',
                  description: 'Real transformations and inspiring journeys from our community',
                },
                {
                  title: 'Exclusive Offers',
                  description: 'Subscriber-only discounts and early access to new programs',
                },
              ].map((benefit, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Archive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Newsletter Archive</h2>
            <div className="space-y-6">
              {archives.map((newsletter, index) => (
                <motion.div
                  key={newsletter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card p-6 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(newsletter.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{newsletter.title}</h3>
                      <p className="text-muted-foreground mb-4">{newsletter.preview}</p>
                      <div className="flex flex-wrap gap-2">
                        {newsletter.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
