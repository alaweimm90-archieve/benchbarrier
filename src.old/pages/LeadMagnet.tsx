import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, Mail, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SEOHead } from '@/components/seo/SEOHead';
import { GlassmorphNav } from '@/components/navigation/GlassmorphNav';

export default function LeadMagnet() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const benefits = [
    'Day-by-day workout plan designed by elite trainers',
    'Nutrition guide with meal prep strategies',
    'Progress tracking templates',
    'Motivation tips from fitness experts',
    'Access to exclusive video tutorials',
    'Community support group invitation',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black">
      <SEOHead
        title="Free 7-Day Transformation Guide | BenchBarrier"
        description="Download your free 7-day transformation guide with workout plans, nutrition tips, and expert advice from BenchBarrier's elite trainers."
        keywords="free workout guide, transformation guide, fitness plan, 7-day challenge, free fitness ebook"
        canonicalUrl="/lead-magnet"
      />
      <GlassmorphNav />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
                <span className="text-gold text-sm font-semibold">FREE DOWNLOAD</span>
              </div>

              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your <span className="luxury-gradient">7-Day</span> Transformation Starts Here
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get instant access to our comprehensive transformation guide, designed by elite trainers who've helped thousands achieve their fitness goals.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-rose-gold border-2 border-charcoal"
                    />
                  ))}
                </div>
                <p>
                  <span className="text-gold font-semibold">12,847+</span> people downloaded this guide
                </p>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-rose-gold/20 rounded-3xl blur-3xl" />
                
                <div className="relative bg-charcoal/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 lg:p-12">
                  {!submitted ? (
                    <>
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                          <Download className="w-8 h-8 text-gold" />
                        </div>
                        <h2 className="font-playfair text-3xl font-bold text-white mb-2">
                          Get Your Free Guide
                        </h2>
                        <p className="text-gray-400">
                          Enter your details to download instantly
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <Label htmlFor="name" className="text-white mb-2 block">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="pl-12 bg-black/50 border-gold/30 text-white placeholder:text-gray-500 h-14 rounded-xl"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-white mb-2 block">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="pl-12 bg-black/50 border-gold/30 text-white placeholder:text-gray-500 h-14 rounded-xl"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-14 bg-gradient-to-r from-gold to-rose-gold text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 group"
                        >
                          Download Free Guide
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <p className="text-xs text-gray-500 text-center">
                          By downloading, you agree to receive emails from BenchBarrier. Unsubscribe anytime.
                        </p>
                      </form>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full mb-6">
                        <CheckCircle className="w-10 h-10 text-gold" />
                      </div>
                      <h3 className="font-playfair text-3xl font-bold text-white mb-4">
                        Check Your Email!
                      </h3>
                      <p className="text-gray-300 mb-6">
                        We've sent your 7-Day Transformation Guide to <span className="text-gold font-semibold">{formData.email}</span>
                      </p>
                      <p className="text-sm text-gray-400 mb-8">
                        Don't see it? Check your spam folder or contact us at info@benchbarrier.com
                      </p>
                      <Button
                        onClick={() => window.location.href = '/'}
                        className="bg-charcoal border border-gold/30 text-white hover:bg-gold/10"
                      >
                        Return to Homepage
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { value: '12,847+', label: 'Downloads' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '87%', label: 'Success Rate' },
              { value: '100%', label: 'Free Forever' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold luxury-gradient mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
