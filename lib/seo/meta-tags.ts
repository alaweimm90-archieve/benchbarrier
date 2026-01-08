/**
 * SEO Meta Tags Generator
 * Provides comprehensive meta tags for pages
 */

export interface MetaTagsConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Generate comprehensive meta tags
 */
export function generateMetaTags(config: MetaTagsConfig) {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = 'https://benchbarrier.vercel.app/og-image.jpg',
    ogType = 'website',
    twitterCard = 'summary_large_image',
    noindex = false,
    nofollow = false
  } = config;

  const fullTitle = title.includes('BenchBarrier') ? title : `${title} | BenchBarrier`;
  const url = canonical || 'https://benchbarrier.vercel.app';

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'BenchBarrier',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@benchbarrier',
      site: '@benchbarrier',
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Homepage meta tags
 */
export const homeMetaTags = generateMetaTags({
  title: 'BenchBarrier - Premium Fitness Equipment & Training',
  description: 'Transform your fitness journey with BenchBarrier\'s premium equipment and expert training programs. Built for serious athletes who demand excellence.',
  keywords: [
    'fitness equipment',
    'premium gym equipment',
    'training programs',
    'strength training',
    'home gym',
    'professional fitness',
    'workout equipment',
    'athletic training'
  ],
  canonical: 'https://benchbarrier.vercel.app',
});

/**
 * Products page meta tags
 */
export const productsMetaTags = generateMetaTags({
  title: 'Premium Fitness Equipment',
  description: 'Explore our collection of premium fitness equipment designed for serious athletes. From power racks to resistance bands, we have everything you need.',
  keywords: [
    'fitness equipment',
    'gym equipment',
    'workout gear',
    'strength equipment',
    'cardio equipment',
    'home gym equipment'
  ],
  canonical: 'https://benchbarrier.vercel.app/products',
});

/**
 * About page meta tags
 */
export const aboutMetaTags = generateMetaTags({
  title: 'About BenchBarrier',
  description: 'Learn about BenchBarrier\'s mission to provide premium fitness equipment and training programs for serious athletes worldwide.',
  keywords: [
    'about benchbarrier',
    'fitness company',
    'athletic training',
    'fitness mission'
  ],
  canonical: 'https://benchbarrier.vercel.app/about',
});

/**
 * Student discount meta tags
 */
export const studentDiscountMetaTags = generateMetaTags({
  title: 'Student Discount Program',
  description: 'Get 15% off premium fitness equipment with our student discount program. Verify your student status and start saving today.',
  keywords: [
    'student discount',
    'fitness student discount',
    'student fitness equipment',
    'college fitness discount'
  ],
  canonical: 'https://benchbarrier.vercel.app/student-discount',
});

/**
 * Team orders meta tags
 */
export const teamOrdersMetaTags = generateMetaTags({
  title: 'Team & Bulk Orders',
  description: 'Equip your entire team with premium fitness equipment. Get special pricing on bulk orders and dedicated support for teams and organizations.',
  keywords: [
    'team orders',
    'bulk fitness equipment',
    'team fitness',
    'corporate fitness',
    'gym equipment bulk'
  ],
  canonical: 'https://benchbarrier.vercel.app/team-orders',
});

/**
 * Generate product-specific meta tags
 */
export function generateProductMetaTags(product: {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
}) {
  return generateMetaTags({
    title: product.name,
    description: product.description,
    keywords: [
      product.name.toLowerCase(),
      'fitness equipment',
      'premium equipment',
      'workout gear',
      'training equipment'
    ],
    canonical: `https://benchbarrier.vercel.app/products/${product.id}`,
    ogImage: product.image,
    ogType: 'product',
  });
}

/**
 * Generate blog post meta tags
 */
export function generateBlogMetaTags(post: {
  title: string;
  excerpt: string;
  slug: string;
  image?: string;
  keywords?: string[];
}) {
  return generateMetaTags({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords || [],
    canonical: `https://benchbarrier.vercel.app/blog/${post.slug}`,
    ogImage: post.image,
    ogType: 'article',
  });
}

/**
 * Checkout meta tags (noindex)
 */
export const checkoutMetaTags = generateMetaTags({
  title: 'Checkout',
  description: 'Complete your purchase securely with BenchBarrier.',
  noindex: true,
  nofollow: true,
});

/**
 * Cart meta tags (noindex)
 */
export const cartMetaTags = generateMetaTags({
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout.',
  noindex: true,
  nofollow: true,
});
