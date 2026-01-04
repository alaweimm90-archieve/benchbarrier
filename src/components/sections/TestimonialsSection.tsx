import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Marketing Executive',
    image: '/placeholder-avatar-1.jpg',
    rating: 5,
    quote: 'BenchBarrier transformed not just my body, but my entire mindset. The trainers are world-class and the results speak for themselves.',
    results: 'Lost 30lbs in 12 weeks',
    videoThumbnail: '/placeholder-video-1.jpg',
  },
  {
    name: 'Marcus Johnson',
    role: 'Entrepreneur',
    image: '/placeholder-avatar-2.jpg',
    rating: 5,
    quote: 'I\'ve tried countless gyms and programs. Nothing compares to the personalized attention and expertise at BenchBarrier.',
    results: 'Gained 15lbs muscle',
    videoThumbnail: '/placeholder-video-2.jpg',
  },
  {
    name: 'Emily Chen',
    role: 'Software Engineer',
    image: '/placeholder-avatar-3.jpg',
    rating: 5,
    quote: 'The nutrition coaching combined with training gave me energy I never knew I had. My productivity skyrocketed!',
    results: 'Improved energy 200%',
    videoThumbnail: '/placeholder-video-3.jpg',
  },
  {
    name: 'David Rodriguez',
    role: 'Finance Director',
    image: '/placeholder-avatar-4.jpg',
    rating: 5,
    quote: 'Best investment I\'ve ever made. The team at BenchBarrier genuinely cares about your success and pushes you to achieve more.',
    results: 'Body fat reduced 18%',
    videoThumbnail: '/placeholder-video-4.jpg',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 bg-deep-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-3xl" />
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
            Success Stories
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Real People,</span>
            <br />
            <span className="gold-gradient-text">Real Results</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Join hundreds of clients who have transformed their lives with BenchBarrier.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="glass-card border border-primary/20 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Video/Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-slate-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1" />
                    </div>
                    <p className="text-text-muted text-sm">Watch Video Testimonial</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-primary/30" />

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Results Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary font-semibold text-sm">
                    {testimonials[currentIndex].results}
                  </span>
                </div>

                {/* Author */}
                <div className="pt-4 border-t border-primary/20">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-text-muted">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '500+', label: 'Success Stories' },
            { value: '98%', label: 'Client Retention' },
            { value: '10+', label: 'Years Experience' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card border border-primary/20 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold gold-gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
