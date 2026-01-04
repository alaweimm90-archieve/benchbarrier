import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Video, CheckCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export default function UGCSubmission() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagram: '',
    contentType: 'photo',
    caption: '',
    hashtags: '#BenchBarrier #TransformationTuesday',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <SEOHead
        title="Share Your Transformation | BenchBarrier"
        description="Share your fitness journey with the BenchBarrier community. Submit your transformation photos and videos."
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
              <span className="gradient-text">Share Your Story</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Inspire others with your transformation journey. Get featured on our website and social media!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Submission Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Submit Your Content</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Upload Photo/Video *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gold/30 rounded-lg cursor-pointer hover:border-gold/50 transition-colors bg-black/30"
                    >
                      {selectedFile ? (
                        <img src={selectedFile} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gold mb-2" />
                          <p className="text-gray-400">Click to upload</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, MP4 up to 10MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Content Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Content Type</label>
                  <div className="flex gap-4">
                    {[
                      { value: 'photo', icon: Image, label: 'Photo' },
                      { value: 'video', icon: Video, label: 'Video' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, contentType: type.value })}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                          formData.contentType === type.value
                            ? 'bg-gold text-black border-gold'
                            : 'bg-black/30 text-gray-400 border-gold/20 hover:border-gold/40'
                        }`}
                      >
                        <type.icon className="w-5 h-5" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                {/* Instagram Handle */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Instagram Handle</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@yourusername"
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Caption</label>
                  <textarea
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    rows={4}
                    placeholder="Tell us about your transformation journey..."
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                  />
                </div>

                {/* Hashtags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Hashtags</label>
                  <input
                    type="text"
                    value={formData.hashtags}
                    onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                    className="w-full bg-black/30 border border-gold/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1"
                    required
                  />
                  <label className="text-sm text-gray-400">
                    I consent to BenchBarrier using my content on their website, social media, and marketing materials. *
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full bg-gradient-to-r from-gold to-rose-gold text-black font-bold py-4 rounded-lg hover:shadow-luxury transition-all disabled:opacity-50"
                >
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Submitted Successfully!
                    </span>
                  ) : (
                    'Submit Content'
                  )}
                </button>
              </form>
            </motion.div>

            {/* Guidelines & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Guidelines */}
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-white mb-4">Submission Guidelines</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>High-quality photos or videos (min 1080p)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Show your transformation or workout journey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Include BenchBarrier branding or location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Tag us @benchbarrier on social media</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Use hashtag #BenchBarrier</span>
                  </li>
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-gold/10 to-rose-gold/10 border border-gold/30 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-white mb-4">Get Featured & Win</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Instagram className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Featured on our Instagram (50K+ followers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Facebook className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Shared on Facebook & Twitter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Twitter className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Displayed on our website gallery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Monthly winner gets 1 month free membership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>Exclusive BenchBarrier merchandise</span>
                  </li>
                </ul>
              </div>

              {/* Recent Submissions */}
              <div className="bg-gradient-to-br from-charcoal to-black border border-gold/20 rounded-2xl p-8">
                <h3 className="text-xl font-playfair font-bold text-white mb-4">Recent Submissions</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-gold/20 to-rose-gold/20 rounded-lg" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
