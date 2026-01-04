import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const instagramPosts = [
  { id: 1, likes: 1234, comments: 89 },
  { id: 2, likes: 2341, comments: 156 },
  { id: 3, likes: 987, comments: 67 },
  { id: 4, likes: 3456, comments: 234 },
  { id: 5, likes: 1876, comments: 123 },
  { id: 6, likes: 2109, comments: 178 },
];

const InstagramWall = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-charcoal to-deep-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-sm font-semibold mb-4">
            Follow Us
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Join Our</span>
            <br />
            <span className="gold-gradient-text">Community</span>
          </h2>
          <p className="text-xl text-text-secondary mb-8">@benchbarrier</p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full font-semibold">
            <Instagram className="w-5 h-5 mr-2" />
            Follow on Instagram
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-rose-gold/20" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="w-6 h-6" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramWall;
