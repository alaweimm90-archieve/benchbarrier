/**
 * Meta Tags Generator Tests
 */

import { generateMetaTags, generateProductMetaTags } from '@/lib/seo/meta-tags';

describe('Meta Tags Generator', () => {
  describe('generateMetaTags', () => {
    it('should generate basic meta tags', () => {
      const meta = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
      });
      
      expect(meta.title).toContain('Test Page');
      expect(meta.description).toBe('Test description');
      expect(meta.openGraph.title).toContain('Test Page');
      expect(meta.twitter.description).toBe('Test description');
    });
    
    it('should append BenchBarrier to title if not present', () => {
      const meta = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
      });
      
      expect(meta.title).toContain('BenchBarrier');
    });
    
    it('should not duplicate BenchBarrier in title', () => {
      const meta = generateMetaTags({
        title: 'BenchBarrier - Test Page',
        description: 'Test description',
      });
      
      const titleParts = meta.title.split('BenchBarrier');
      expect(titleParts.length).toBe(2); // Only one occurrence
    });
    
    it('should handle keywords array', () => {
      const meta = generateMetaTags({
        title: 'Test',
        description: 'Test',
        keywords: ['fitness', 'equipment', 'training'],
      });
      
      expect(meta.keywords).toBe('fitness, equipment, training');
    });
    
    it('should set noindex and nofollow when specified', () => {
      const meta = generateMetaTags({
        title: 'Test',
        description: 'Test',
        noindex: true,
        nofollow: true,
      });
      
      expect(meta.robots.index).toBe(false);
      expect(meta.robots.follow).toBe(false);
    });
    
    it('should use custom OG image', () => {
      const customImage = 'https://example.com/custom.jpg';
      const meta = generateMetaTags({
        title: 'Test',
        description: 'Test',
        ogImage: customImage,
      });
      
      expect(meta.openGraph.images[0].url).toBe(customImage);
      expect(meta.twitter.images[0]).toBe(customImage);
    });
  });
  
  describe('generateProductMetaTags', () => {
    it('should generate product-specific meta tags', () => {
      const product = {
        id: 'test-product',
        name: 'Test Product',
        description: 'A test product',
        price: 99.99,
        image: 'https://example.com/product.jpg',
      };
      
      const meta = generateProductMetaTags(product);
      
      expect(meta.title).toContain('Test Product');
      expect(meta.description).toBe('A test product');
      expect(meta.openGraph.type).toBe('product');
      expect(meta.alternates.canonical).toContain('/products/test-product');
    });
    
    it('should include product name in keywords', () => {
      const product = {
        id: 'power-rack',
        name: 'Power Rack Pro',
        description: 'Professional power rack',
        price: 599.99,
        image: 'https://example.com/rack.jpg',
      };
      
      const meta = generateProductMetaTags(product);
      
      expect(meta.keywords).toContain('power rack pro');
      expect(meta.keywords).toContain('fitness equipment');
    });
  });
});
