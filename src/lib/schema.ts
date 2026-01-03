// Schema.org structured data generators for SEO

export interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export interface LocalBusiness extends Organization {
  priceRange?: string;
  openingHours?: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
}

export const generateOrganizationSchema = (org: Organization) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: org.name,
  url: org.url,
  logo: org.logo,
  description: org.description,
  ...(org.telephone && { telephone: org.telephone }),
  ...(org.email && { email: org.email }),
  ...(org.address && { address: {
    '@type': 'PostalAddress',
    ...org.address,
  }}),
  ...(org.sameAs && { sameAs: org.sameAs }),
});

export const generateLocalBusinessSchema = (business: LocalBusiness) => ({
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: business.name,
  url: business.url,
  logo: business.logo,
  description: business.description,
  ...(business.telephone && { telephone: business.telephone }),
  ...(business.email && { email: business.email }),
  ...(business.priceRange && { priceRange: business.priceRange }),
  ...(business.openingHours && { openingHoursSpecification: business.openingHours.map(hours => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: hours.split(' ')[0],
    opens: hours.split(' ')[1],
    closes: hours.split(' ')[2],
  })) }),
  ...(business.address && { address: {
    '@type': 'PostalAddress',
    ...business.address,
  }}),
  ...(business.geo && { geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  }}),
  ...(business.sameAs && { sameAs: business.sameAs }),
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: Organization;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.headline,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Person',
    name: article.author,
  },
  publisher: {
    '@type': 'Organization',
    name: article.publisher.name,
    logo: {
      '@type': 'ImageObject',
      url: article.publisher.logo,
    },
  },
});

export const generateReviewSchema = (review: {
  itemReviewed: string;
  author: string;
  reviewRating: number;
  reviewBody: string;
  datePublished: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'LocalBusiness',
    name: review.itemReviewed,
  },
  author: {
    '@type': 'Person',
    name: review.author,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.reviewRating,
    bestRating: 5,
  },
  reviewBody: review.reviewBody,
  datePublished: review.datePublished,
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: service.provider,
  },
  ...(service.areaServed && { areaServed: service.areaServed }),
  ...(service.offers && { offers: {
    '@type': 'Offer',
    price: service.offers.price,
    priceCurrency: service.offers.priceCurrency,
  }}),
});

export const generateEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  organizer: string;
  offers?: {
    price: string;
    priceCurrency: string;
    url: string;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  ...(event.endDate && { endDate: event.endDate }),
  location: {
    '@type': 'Place',
    name: event.location,
  },
  organizer: {
    '@type': 'Organization',
    name: event.organizer,
  },
  ...(event.offers && { offers: {
    '@type': 'Offer',
    price: event.offers.price,
    priceCurrency: event.offers.priceCurrency,
    url: event.offers.url,
  }}),
});

// BenchBarrier specific schemas
export const benchBarrierOrganization: Organization = {
  name: 'BenchBarrier',
  url: 'https://benchbarrier.com',
  logo: 'https://benchbarrier.com/logo.png',
  description: 'Elite fitness training and transformation programs for those who demand excellence',
  telephone: '+1-555-BENCH-01',
  email: 'info@benchbarrier.com',
  address: {
    streetAddress: '123 Elite Fitness Boulevard',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90001',
    addressCountry: 'US',
  },
  sameAs: [
    'https://facebook.com/benchbarrier',
    'https://instagram.com/benchbarrier',
    'https://twitter.com/benchbarrier',
    'https://youtube.com/benchbarrier',
    'https://tiktok.com/@benchbarrier',
  ],
};

export const benchBarrierLocalBusiness: LocalBusiness = {
  ...benchBarrierOrganization,
  priceRange: '$$$',
  openingHours: [
    'Monday 05:00-22:00',
    'Tuesday 05:00-22:00',
    'Wednesday 05:00-22:00',
    'Thursday 05:00-22:00',
    'Friday 05:00-22:00',
    'Saturday 07:00-20:00',
    'Sunday 07:00-20:00',
  ],
  geo: {
    latitude: 34.0522,
    longitude: -118.2437,
  },
};
