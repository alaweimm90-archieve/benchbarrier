/**
 * Structured Data (JSON-LD) Generators
 * Provides schema.org structured data for SEO
 */

import { Product } from '../products';

/**
 * Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BenchBarrier',
    description: 'Premium fitness equipment and training programs for serious athletes',
    url: 'https://benchbarrier.vercel.app',
    logo: 'https://benchbarrier.vercel.app/logo.png',
    sameAs: [
      'https://twitter.com/benchbarrier',
      'https://instagram.com/benchbarrier',
      'https://facebook.com/benchbarrier',
      'https://linkedin.com/company/benchbarrier'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-BENCH-01',
      contactType: 'customer service',
      email: 'support@benchbarrier.com',
      areaServed: 'US',
      availableLanguage: ['English']
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'CA',
      addressLocality: 'San Francisco'
    }
  };
}

/**
 * Website Schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BenchBarrier',
    description: 'Premium fitness equipment and training programs',
    url: 'https://benchbarrier.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://benchbarrier.vercel.app/products?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Product Schema
 */
export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'BenchBarrier'
    },
    offers: {
      '@type': 'Offer',
      url: `https://benchbarrier.vercel.app/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'BenchBarrier'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

/**
 * Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Review Schema
 */
export function generateReviewSchema(review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  productName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: review.productName
    },
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished
  };
}

/**
 * Local Business Schema (for physical locations)
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'BenchBarrier Fitness Center',
    description: 'Premium fitness equipment showroom and training facility',
    image: 'https://benchbarrier.vercel.app/showroom.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fitness Street',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94102',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -122.4194
    },
    telephone: '+1-555-BENCH-01',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00'
      }
    ],
    priceRange: '$$'
  };
}

/**
 * Course Schema (for training programs)
 */
export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider: string;
  price: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider
    },
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      priceCurrency: 'USD',
      price: course.price
    }
  };
}

/**
 * Helper to generate structured data script tag
 */
export function generateStructuredDataScript(data: object | object[]): string {
  const schemas = Array.isArray(data) ? data : [data];
  
  return schemas
    .map(schema => 
      `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n');
}
