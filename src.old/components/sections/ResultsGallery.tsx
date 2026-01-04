import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Weight Loss', 'Muscle Gain', 'Transformation', 'Athletic'];

const results = [
  {
    id: 1,
    category: 'Weight Loss',
    name: 'Sarah M.',
    duration: '12 weeks',
    result: '-30 lbs',
    before: '/placeholder-before-1.jpg',
    after: '/placeholder-after-1.jpg',
  },
  {
    id: 2,
    category: 'Muscle Gain',
    name: 'Marcus J.',
    duration: '16 weeks',
    result: '+15 lbs muscle',
    before: '/placeholder-before-2.jpg',
    after: '/placeholder-after-2.jpg',
  },
  {
    id: 3,
    category: 'Transformation',
    name: 'Emily C.',
    duration: '20 weeks',
    result: 'Complete transformation',
    before: '/placeholder-before-3.jpg',
    after: '/placeholder-after-3.jpg',
  },
  {
    id: 4,
    category: 'Athletic',
    name: 'David R.',
    duration: '14 weeks',
    result: '18% body fat reduction',
    before: '/placeholder-before-4.jpg',
    after: '/placeholder-after-4.jpg',
  },
  {
    id: 5,
    category: 'Weight Loss',
    name: 'Jessica L.',
    duration: '10 weeks',
    result: '-25 lbs',
    before: '/placeholder-before-5.jpg',
    after: '/placeholder-after-5.jpg',
  },
  {
    id: 6,
    category: 'Muscle Gain',
    name: 'Alex K.',
    duration: '18 weeks',
    result: '+20 lbs muscle',
    before: '/placeholder-before-6.jpg',
    after: '/placeholder-after-6.jpg',
  },
];

const ResultsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredResults = selectedCategory === 'All'
    ? results
    : results.filter((result) => result.category === selectedCategory);

  return (
    <section id="results" className="py-24 px-4 bg-gradient-to-b from-deep-black via-charcoal to-deep-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-rose-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-sm font-semibold mb-4"
          >
            Transformations
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Proven</span>
            <br />
            <span className="gold-gradient-text">Results</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            See the incredible transformations our clients have achieved with dedication and expert guidance.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/50'
                  : 'border-primary/30 hover:border-primary hover:bg-primary/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(result.id)}
            >
              <div className="glass-card border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                {/* Before/After Slider */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-charcoal to-slate-black overflow-hidden">
                  {/* Placeholder for before/after images */}
                  <div className="absolute inset-0 flex">
                    <div
                      className="bg-gradient-to-br from-slate-black to-charcoal flex items-center justify-center"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <span className="text-text-muted text-sm font-semibold">BEFORE</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-primary/10 to-rose-gold/10 flex items-center justify-center">
                      <span className="text-primary text-sm font-semibold">AFTER</span>
                    </div>
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize group-hover:w-2 transition-all duration-300"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-4 bg-primary-foreground" />
                        <div className="w-0.5 h-4 bg-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{result.name}</h3>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {result.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{result.duration}</span>
                    <span className="text-primary font-bold">{result.result}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card border border-primary/20 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2,500+', label: 'Pounds Lost', suffix: 'lbs' },
              { value: '1,200+', label: 'Muscle Gained', suffix: 'lbs' },
              { value: '500+', label: 'Lives Changed', suffix: 'clients' },
              { value: '98%', label: 'Success Rate', suffix: 'satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold gold-gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider">
                  {stat.suffix}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
          >
            Start Your Transformation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsGallery;
