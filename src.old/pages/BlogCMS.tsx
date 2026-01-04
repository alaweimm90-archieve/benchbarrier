import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, User, Save, Eye, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SEOHead } from '@/components/seo/SEOHead';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  publishDate: string;
  status: 'draft' | 'scheduled' | 'published';
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
}

const BlogCMS = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: '10 Essential Exercises for Building Strength',
      slug: '10-essential-exercises-building-strength',
      excerpt: 'Master these fundamental movements to build a strong foundation.',
      content: 'Full article content here...',
      author: 'Marcus Stone',
      category: 'Training',
      tags: ['strength', 'exercises', 'beginners'],
      featuredImage: '/blog/strength-training.jpg',
      publishDate: '2026-01-15',
      status: 'published',
      seoTitle: '10 Essential Strength Building Exercises | BenchBarrier',
      seoDescription: 'Learn the 10 most effective exercises for building strength from elite trainers.',
      readingTime: 8,
    },
    {
      id: '2',
      title: 'Nutrition Guide: Fueling Your Fitness Journey',
      slug: 'nutrition-guide-fueling-fitness',
      excerpt: 'Everything you need to know about nutrition for optimal performance.',
      content: 'Full article content here...',
      author: 'Sarah Chen',
      category: 'Nutrition',
      tags: ['nutrition', 'diet', 'performance'],
      featuredImage: '/blog/nutrition.jpg',
      publishDate: '2026-01-20',
      status: 'scheduled',
      seoTitle: 'Complete Nutrition Guide for Fitness | BenchBarrier',
      seoDescription: 'Expert nutrition advice to fuel your workouts and achieve your fitness goals.',
      readingTime: 12,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Training',
    tags: [],
    status: 'draft',
  });

  const categories = ['Training', 'Nutrition', 'Mindset', 'Recovery', 'Success Stories'];

  const handleSavePost = () => {
    if (currentPost.id) {
      setPosts(posts.map(p => p.id === currentPost.id ? currentPost as BlogPost : p));
    } else {
      const newPost: BlogPost = {
        ...currentPost,
        id: Date.now().toString(),
        slug: currentPost.title?.toLowerCase().replace(/\s+/g, '-') || '',
        publishDate: new Date().toISOString().split('T')[0],
        readingTime: Math.ceil((currentPost.content?.split(' ').length || 0) / 200),
        seoTitle: currentPost.title || '',
        seoDescription: currentPost.excerpt || '',
      } as BlogPost;
      setPosts([...posts, newPost]);
    }
    setIsEditing(false);
    setCurrentPost({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Training',
      tags: [],
      status: 'draft',
    });
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  return (
    <>
      <SEOHead
        title="Blog Content Management System"
        description="Manage BenchBarrier blog posts, articles, and content"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-primary/5 to-black pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              <span className="luxury-gradient">Blog CMS</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create and manage your content
            </p>
          </motion.div>

          {/* Create/Edit Form */}
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">
                {currentPost.id ? 'Edit Post' : 'Create New Post'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={currentPost.title}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                    placeholder="Enter post title"
                    className="bg-black/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <Textarea
                    value={currentPost.excerpt}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    placeholder="Brief description of the post"
                    rows={3}
                    className="bg-black/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    placeholder="Write your article content here..."
                    rows={12}
                    className="bg-black/50 font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <Input
                      value={currentPost.author}
                      onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                      placeholder="Author name"
                      className="bg-black/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={currentPost.category}
                      onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                      className="w-full px-4 py-2 bg-black/50 border border-primary/20 rounded-lg"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      value={currentPost.tags?.join(', ')}
                      onChange={(e) => setCurrentPost({ 
                        ...currentPost, 
                        tags: e.target.value.split(',').map(t => t.trim()) 
                      })}
                      placeholder="fitness, training, nutrition"
                      className="bg-black/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={currentPost.status}
                      onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value as any })}
                      className="w-full px-4 py-2 bg-black/50 border border-primary/20 rounded-lg"
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSavePost} className="luxury-button">
                    <Save className="w-4 h-4 mr-2" />
                    Save Post
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentPost({
                        title: '',
                        excerpt: '',
                        content: '',
                        author: '',
                        category: 'Training',
                        tags: [],
                        status: 'draft',
                      });
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Button onClick={() => setIsEditing(true)} className="luxury-button">
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </motion.div>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {post.status}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.publishDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        {post.tags.join(', ')}
                      </div>
                      <div>{post.readingTime} min read</div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEditPost(post)}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeletePost(post.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCMS;
