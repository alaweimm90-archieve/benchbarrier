import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Video, BookOpen, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/seo/SEOHead';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'pdf' | 'video' | 'guide';
  downloadUrl: string;
  thumbnail: string;
  isGated: boolean;
  downloads: number;
}

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [unlockedResources, setUnlockedResources] = useState<string[]>([]);

  const categories = ['All', 'Workout Guides', 'Nutrition Plans', 'Training Videos', 'E-Books'];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Beginner Workout Guide',
      description: '8-week progressive training program for beginners with detailed exercise instructions',
      category: 'Workout Guides',
      type: 'pdf',
      downloadUrl: '/resources/beginner-workout.pdf',
      thumbnail: '/resources/beginner-thumb.jpg',
      isGated: false,
      downloads: 1247,
    },
    {
      id: '2',
      title: 'Meal Prep Mastery',
      description: '50+ healthy recipes with macro breakdowns and weekly meal plans',
      category: 'Nutrition Plans',
      type: 'pdf',
      downloadUrl: '/resources/meal-prep.pdf',
      thumbnail: '/resources/meal-prep-thumb.jpg',
      isGated: true,
      downloads: 892,
    },
    {
      id: '3',
      title: 'Proper Form Tutorial Series',
      description: 'Video demonstrations of 20 essential exercises with form cues',
      category: 'Training Videos',
      type: 'video',
      downloadUrl: '/resources/form-tutorials.mp4',
      thumbnail: '/resources/form-thumb.jpg',
      isGated: false,
      downloads: 2156,
    },
    {
      id: '4',
      title: 'Strength Training Encyclopedia',
      description: 'Comprehensive guide to building strength with science-backed methods',
      category: 'E-Books',
      type: 'guide',
      downloadUrl: '/resources/strength-encyclopedia.pdf',
      thumbnail: '/resources/strength-thumb.jpg',
      isGated: true,
      downloads: 634,
    },
    {
      id: '5',
      title: 'HIIT Workout Collection',
      description: '15 high-intensity interval training workouts for all fitness levels',
      category: 'Workout Guides',
      type: 'pdf',
      downloadUrl: '/resources/hiit-collection.pdf',
      thumbnail: '/resources/hiit-thumb.jpg',
      isGated: false,
      downloads: 1523,
    },
    {
      id: '6',
      title: 'Nutrition Fundamentals',
      description: 'Everything you need to know about macros, calories, and meal timing',
      category: 'Nutrition Plans',
      type: 'guide',
      downloadUrl: '/resources/nutrition-fundamentals.pdf',
      thumbnail: '/resources/nutrition-thumb.jpg',
      isGated: true,
      downloads: 978,
    },
  ];

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  const handleUnlock = (resourceId: string) => {
    if (email) {
      setUnlockedResources([...unlockedResources, resourceId]);
      // In production, this would send the email and resource link
      console.log(`Sending ${resourceId} to ${email}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'guide':
        return <BookOpen className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <>
      <SEOHead
        title="Free Fitness Resources & Downloads"
        description="Download free workout guides, nutrition plans, and training videos from BenchBarrier"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-primary/5 to-black pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              <span className="luxury-gradient">Free Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download expert guides, workout plans, and training materials
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-black'
                    : 'glass-card hover:border-primary/40'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-primary/40 group-hover:text-primary/60 transition-colors">
                    {getIcon(resource.type)}
                  </div>
                  {resource.isGated && !unlockedResources.includes(resource.id) && (
                    <div className="absolute top-4 right-4 bg-black/80 p-2 rounded-lg">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 rounded-full text-sm">
                    {resource.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                    <span className="uppercase">{resource.type}</span>
                  </div>

                  {/* Download/Unlock Button */}
                  {resource.isGated && !unlockedResources.includes(resource.id) ? (
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/50"
                      />
                      <Button
                        onClick={() => handleUnlock(resource.id)}
                        className="luxury-button w-full"
                        disabled={!email}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Unlock Resource
                      </Button>
                    </div>
                  ) : (
                    <Button className="luxury-button w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Now
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-12 text-center mt-16"
          >
            <h2 className="text-3xl font-bold mb-4">Want More Exclusive Content?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join BenchBarrier and get access to our complete library of premium training programs,
              nutrition plans, and personalized coaching
            </p>
            <Button className="luxury-button text-lg px-8 py-6">
              Explore Membership Options
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resources;
