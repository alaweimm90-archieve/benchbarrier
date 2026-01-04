import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Instagram, Facebook, Twitter } from 'lucide-react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { SEOHead } from '../components/seo/SEOHead';

export default function ShareableContent() {
  const [selectedQuote, setSelectedQuote] = useState(0);
  const [customText, setCustomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const quotes = [
    'Push harder than yesterday if you want a different tomorrow',
    'Your only limit is you',
    'Sweat is fat crying',
    'Train insane or remain the same',
    'The body achieves what the mind believes',
    'No pain, no gain',
  ];

  const templates = [
    { name: 'Gold Gradient', bg: 'from-gold via-rose-gold to-champagne' },
    { name: 'Dark Elite', bg: 'from-black via-charcoal to-black' },
    { name: 'Luxury Rose', bg: 'from-rose-gold via-champagne to-gold' },
    { name: 'Midnight', bg: 'from-charcoal via-black to-charcoal' },
  ];

  const shareUrl = 'https://benchbarrier.com';
  const shareText = customText || quotes[selectedQuote];

  return (
    <>
      <SEOHead
        title="Create & Share Content | BenchBarrier"
        description="Create beautiful, shareable fitness content with BenchBarrier branding. Download and share on social media."
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4">
              <span className="gradient-text">Create & Share</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Design beautiful fitness quotes and share them with your followers
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h2 className="text-2xl font-playfair font-bold text-white mb-6">Preview</h2>

                {/* Content Preview */}
                <div
                  className={`aspect-square bg-gradient-to-br ${templates[selectedTemplate].bg} rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-8">
                      <h3 className="text-4xl font-playfair font-bold text-white mb-2">
                        BENCHBARRIER
                      </h3>
                      <div className="w-24 h-1 bg-white mx-auto" />
                    </div>

                    <p className="text-2xl font-bold text-white mb-8 leading-relaxed">
                      {customText || quotes[selectedQuote]}
                    </p>

                    <div className="text-white/80 text-sm">
                      <p>Elite Fitness Training</p>
                      <p className="mt-1">@benchbarrier</p>
                    </div>
                  </div>
                </div>

                {/* Download & Share Buttons */}
                <div className="mt-6 space-y-3">
                  <button className="w-full bg-gradient-to-r from-gold to-rose-gold text-black font-bold py-4 rounded-lg hover:shadow-luxury transition-all flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Image
                  </button>

                  <div className="grid grid-cols-3 gap-3">
                    <FacebookShareButton url={shareUrl} quote={shareText} className="w-full">
                      <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                        <Facebook className="w-5 h-5" />
                        Share
                      </button>
                    </FacebookShareButton>

                    <TwitterShareButton url={shareUrl} title={shareText} className="w-full">
                      <button className="w-full bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition-all flex items-center justify-center gap-2">
                        <Twitter className="w-5 h-5" />
                        Tweet
                      </button>
                    </TwitterShareButton>

                    <WhatsappShareButton url={shareUrl} title={shareText} className="w-full">
                      <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share
                      </button>
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Custom Text */}
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h3 className="text-xl font-playfair font-bold text-white mb-4">Custom Text</h3>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter your own motivational quote..."
                  rows={4}
                  className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                />
              </div>

              {/* Pre-made Quotes */}
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h3 className="text-xl font-playfair font-bold text-white mb-4">Or Choose a Quote</h3>
                <div className="space-y-2">
                  {quotes.map((quote, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedQuote(index);
                        setCustomText('');
                      }}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedQuote === index && !customText
                          ? 'bg-gold/20 border-gold text-white'
                          : 'bg-black/30 border-gold/10 text-gray-400 hover:border-gold/30'
                      }`}
                    >
                      {quote}
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Selection */}
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h3 className="text-xl font-playfair font-bold text-white mb-4">Choose Template</h3>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTemplate(index)}
                      className={`relative h-24 rounded-lg bg-gradient-to-br ${template.bg} border-2 transition-all ${
                        selectedTemplate === index ? 'border-white scale-105' : 'border-transparent'
                      }`}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm bg-black/30">
                        {template.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-gold/10 to-rose-gold/10 border border-gold/30 rounded-2xl p-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-gold" />
                  Sharing Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Tag @benchbarrier for a repost</li>
                  <li>• Use #BenchBarrier #FitnessMotivation</li>
                  <li>• Post during peak hours (6-9 AM, 5-8 PM)</li>
                  <li>• Add your personal story in the caption</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
