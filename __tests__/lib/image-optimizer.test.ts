/**
 * Image Optimizer Tests
 */

import {
  generateImageSizes,
  calculateAspectRatio,
  validateImageDimensions,
  getLoadingStrategy,
  generateBlurDataURL,
} from '@/lib/image-optimizer';

describe('Image Optimizer', () => {
  describe('generateImageSizes', () => {
    it('should generate responsive image sizes string', () => {
      const sizes = generateImageSizes({
        mobile: '100vw',
        tablet: '50vw',
        desktop: '33vw',
      });
      
      expect(sizes).toContain('(max-width: 640px) 100vw');
      expect(sizes).toContain('(max-width: 1024px) 50vw');
      expect(sizes).toContain('33vw');
    });
    
    it('should handle partial breakpoints', () => {
      const sizes = generateImageSizes({
        mobile: '100vw',
        desktop: '50vw',
      });
      
      expect(sizes).toContain('(max-width: 640px) 100vw');
      expect(sizes).toContain('50vw');
      expect(sizes).not.toContain('tablet');
    });
  });
  
  describe('calculateAspectRatio', () => {
    it('should calculate correct aspect ratio', () => {
      expect(calculateAspectRatio(1920, 1080)).toBe('16/9');
      expect(calculateAspectRatio(1600, 900)).toBe('16/9');
      expect(calculateAspectRatio(800, 600)).toBe('4/3');
      expect(calculateAspectRatio(1000, 1000)).toBe('1/1');
    });
  });
  
  describe('validateImageDimensions', () => {
    it('should validate correct dimensions', () => {
      const result = validateImageDimensions(800, 600);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
    
    it('should reject negative dimensions', () => {
      const result = validateImageDimensions(-100, 600);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('positive');
    });
    
    it('should reject dimensions exceeding maximum', () => {
      const result = validateImageDimensions(5000, 5000, 4096, 4096);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('exceed maximum');
    });
  });
  
  describe('getLoadingStrategy', () => {
    it('should return eager for above-fold content', () => {
      expect(getLoadingStrategy('above-fold')).toBe('eager');
    });
    
    it('should return lazy for below-fold content', () => {
      expect(getLoadingStrategy('below-fold')).toBe('lazy');
    });
  });
  
  describe('generateBlurDataURL', () => {
    it('should generate valid data URL', () => {
      const dataURL = generateBlurDataURL('#0F172A');
      expect(dataURL).toMatch(/^data:image\/svg\+xml;base64,/);
    });
    
    it('should use default color if not provided', () => {
      const dataURL = generateBlurDataURL();
      expect(dataURL).toBeTruthy();
      expect(dataURL).toMatch(/^data:image\/svg\+xml;base64,/);
    });
  });
});
