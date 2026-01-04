import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin, Calendar, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import SEOHead from '@/components/seo/SEOHead';

const LinkInBio = () => {
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});

  const handleLinkClick = (linkName: string, url: string) => {
    trackEvent('link_click', { link_name: linkName, url });
    setClickCounts(prev => ({ ...prev, [linkName]: (prev[linkName] || 0) + 1 }));
  };

  const links = [
    {
      id: 'booking',
      title: 'Book Free Consultation',
      description: 'Start your transformation journey',
      icon: Calendar,
      url: '/booking',
      color: 'from-gold to-champagne',
      featured: true
    },
    {
      id: 'quiz',
      title: 'Take Fitness Quiz',
      description: 'Discover your fitness personality',
      icon: ExternalLink,
      url: '/quiz',
      color: 'from-rose-gold to-gold'
    },
    {
      id: 'pricing',
      title: 'View Membership Plans',
      description: 'Find the perfect plan for you',
      icon: ExternalLink,
      url: '/pricing',
      color: 'from-champagne to-white'
    },
    {
      id: 'results',
      title: 'Success Stories',
      description: 'See real transformations',
      icon: ExternalLink,
      url: '/results',
      color: 'from-gold to-rose-gold'
    },
    {
      id: 'guide',
      title: 'Free 7-Day Guide',
      description: 'Download your transformation guide',
      icon: Download,
      url: '/lead-magnet',
      color: 'from-rose-gold to-champagne'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Get in touch with our team',
      icon: Mail,
      url: '/contact',
      color: 'from-champagne to-gold'
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/benchbarrier', color: '#E4405F' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/benchbarrier', color: '#1877F2' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@benchbarrier', color: '#FF0000' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/benchbarrier', color: '#1DA1F2' }
  ];

  return (
    <>
      <SEOHead
        title="Links | BenchBarrier"
        description="All BenchBarrier links in one place - Book consultations, view plans, and connect with us"
        path="/links"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-charcoal to-black py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold via-champagne to-rose-gold p-1"
            >
              <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center">
                <span className="text-5xl font-playfair font-bold bg-gradient-to-r from-gold to-champagne bg-clip-text text-transparent">
                  BB
                </span>
              </div>
            </motion.div>

            <h1 className="text-4xl font-playfair font-bold mb-3 bg-gradient-to-r from-gold via-champagne to-rose-gold bg-clip-text text-transparent">
              BenchBarrier
            </h1>
            <p className="text-white/70 text-lg mb-4">
              Elite Fitness & Transformation
            </p>
            
            <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Los Angeles, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
            </div>
          </motion.div>

          {/* Main Links */}
          <div className="space-y-4 mb-12">
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  onClick={() => handleLinkClick(link.title, link.url)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block relative overflow-hidden rounded-2xl p-6 ${
                    link.featured ? 'bg-gradient-to-r ' + link.color : 'bg-white/5 backdrop-blur-sm'
                  } border border-white/10 hover:border-gold/50 transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${
                      link.featured ? 'bg-black/20' : 'bg-gradient-to-br ' + link.color
                    } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={link.featured ? 'text-black' : 'text-white'} size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${
                        link.featured ? 'text-black' : 'text-white'
                      }`}>
                        {link.title}
                      </h3>
                      <p className={link.featured ? 'text-black/70' : 'text-white/60'}>
                        {link.description}
                      </p>
                    </div>

                    {clickCounts[link.title] && (
                      <div className="text-xs text-white/40 font-mono">
                        {clickCounts[link.title]} clicks
                      </div>
                    )}
                  </div>

                  {link.featured && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-white/60 mb-4 text-sm">Follow us on social media</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(social.name, social.url)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold/50 flex items-center justify-center transition-all group"
                    style={{ '--hover-color': social.color } as any}
                  >
                    <Icon className="text-white/70 group-hover:text-gold transition-colors" size={24} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center text-white/40 text-sm"
          >
            <p>© 2026 BenchBarrier. All rights reserved.</p>
            <p className="mt-2">Transform Your Body. Transform Your Life.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LinkInBio;
