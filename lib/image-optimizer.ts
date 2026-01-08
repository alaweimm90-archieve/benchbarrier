/**
 * Image Optimization Utilities
 * Provides helpers for optimizing images with Next.js Image component
 */

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

/**
 * Generate responsive image sizes string
 */
export function generateImageSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const sizes: string[] = [];
  
  if (breakpoints.mobile) {
    sizes.push(`(max-width: 640px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    sizes.push(`(max-width: 1024px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    sizes.push(breakpoints.desktop);
  }
  
  return sizes.join(', ');
}

/**
 * Product image configurations
 */
export const productImageConfig = {
  card: {
    width: 400,
    height: 400,
    quality: 85,
    sizes: generateImageSizes({
      mobile: '100vw',
      tablet: '50vw',
      desktop: '33vw'
    })
  },
  detail: {
    width: 800,
    height: 800,
    quality: 90,
    sizes: generateImageSizes({
      mobile: '100vw',
      tablet: '60vw',
      desktop: '50vw'
    })
  },
  thumbnail: {
    width: 100,
    height: 100,
    quality: 75,
    sizes: '100px'
  }
};

/**
 * Hero image configurations
 */
export const heroImageConfig = {
  width: 1920,
  height: 1080,
  quality: 90,
  priority: true,
  sizes: '100vw'
};

/**
 * Logo image configurations
 */
export const logoImageConfig = {
  width: 200,
  height: 60,
  quality: 100,
  priority: true,
  sizes: '200px'
};

/**
 * Optimize image URL for different formats
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  } = {}
): string {
  // If using external CDN, add query parameters
  if (src.startsWith('http')) {
    const url = new URL(src);
    if (options.width) url.searchParams.set('w', options.width.toString());
    if (options.quality) url.searchParams.set('q', options.quality.toString());
    if (options.format) url.searchParams.set('fm', options.format);
    return url.toString();
  }
  
  // For local images, Next.js Image component handles optimization
  return src;
}

/**
 * Generate blur data URL for placeholder
 */
export function generateBlurDataURL(color: string = '#0F172A'): string {
  // Create a simple 1x1 pixel base64 encoded image
  const svg = `
    <svg width="1" height="1" xmlns="http://www.w3.org/2000/svg">
      <rect width="1" height="1" fill="${color}"/>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Calculate aspect ratio
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Validate image dimensions
 */
export function validateImageDimensions(
  width: number,
  height: number,
  maxWidth: number = 4096,
  maxHeight: number = 4096
): { valid: boolean; error?: string } {
  if (width <= 0 || height <= 0) {
    return { valid: false, error: 'Dimensions must be positive' };
  }
  
  if (width > maxWidth || height > maxHeight) {
    return { 
      valid: false, 
      error: `Dimensions exceed maximum (${maxWidth}x${maxHeight})` 
    };
  }
  
  return { valid: true };
}

/**
 * Get image loading strategy
 */
export function getLoadingStrategy(
  position: 'above-fold' | 'below-fold'
): 'eager' | 'lazy' {
  return position === 'above-fold' ? 'eager' : 'lazy';
}

/**
 * Image optimization presets
 */
export const imagePresets = {
  hero: {
    ...heroImageConfig,
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL('#0F172A')
  },
  productCard: {
    ...productImageConfig.card,
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL('#1E293B')
  },
  productDetail: {
    ...productImageConfig.detail,
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL('#1E293B')
  },
  thumbnail: {
    ...productImageConfig.thumbnail,
    placeholder: 'empty' as const
  },
  logo: {
    ...logoImageConfig,
    placeholder: 'empty' as const
  }
};
