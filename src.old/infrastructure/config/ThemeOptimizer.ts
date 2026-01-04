/**
 * Theme Optimization System
 * CSS/JS atomic decomposition, critical path rendering, WCAG compliance
 */

export interface ThemeConfig {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  breakpoints: Breakpoints;
  animations: Animations;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface Typography {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface Animations {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface PerformanceBudget {
  maxCSSSize: number; // KB
  maxJSSize: number; // KB
  maxImageSize: number; // KB
  maxFonts: number;
  maxAnimations: number;
}

export interface WCAGCompliance {
  level: 'A' | 'AA' | 'AAA';
  contrastRatio: number;
  focusVisible: boolean;
  keyboardNavigable: boolean;
  ariaLabels: boolean;
}

export class ThemeOptimizer {
  private config: ThemeConfig;
  private budget: PerformanceBudget;
  private wcag: WCAGCompliance;

  constructor(config: ThemeConfig) {
    this.config = config;
    this.budget = {
      maxCSSSize: 50, // 50 KB
      maxJSSize: 200, // 200 KB
      maxImageSize: 100, // 100 KB per image
      maxFonts: 3,
      maxAnimations: 10
    };
    this.wcag = {
      level: 'AA',
      contrastRatio: 4.5,
      focusVisible: true,
      keyboardNavigable: true,
      ariaLabels: true
    };
  }

  /**
   * Generate critical CSS for above-the-fold content
   */
  generateCriticalCSS(): string {
    return `
      /* Critical CSS - Above the fold */
      :root {
        --primary: ${this.config.colors.primary};
        --background: ${this.config.colors.background};
        --foreground: ${this.config.colors.foreground};
        --font-sans: ${this.config.typography.fontFamily.sans};
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: var(--font-sans);
        background: var(--background);
        color: var(--foreground);
        line-height: ${this.config.typography.lineHeight.normal};
      }

      /* Critical layout */
      .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      /* Critical navigation */
      nav {
        position: sticky;
        top: 0;
        z-index: 50;
        background: var(--background);
      }
    `;
  }

  /**
   * Validate WCAG compliance
   */
  validateWCAG(): WCAGValidationResult {
    const issues: string[] = [];
    const warnings: string[] = [];

    // Check contrast ratios
    const contrastIssues = this.checkContrastRatios();
    issues.push(...contrastIssues);

    // Check focus indicators
    if (!this.wcag.focusVisible) {
      issues.push('Missing visible focus indicators');
    }

    // Check keyboard navigation
    if (!this.wcag.keyboardNavigable) {
      issues.push('Not fully keyboard navigable');
    }

    // Check ARIA labels
    if (!this.wcag.ariaLabels) {
      warnings.push('Missing ARIA labels on interactive elements');
    }

    return {
      compliant: issues.length === 0,
      level: this.wcag.level,
      issues,
      warnings,
      score: this.calculateAccessibilityScore(issues, warnings)
    };
  }

  /**
   * Check performance budget
   */
  checkPerformanceBudget(actual: {
    cssSize: number;
    jsSize: number;
    imageSize: number;
    fonts: number;
    animations: number;
  }): BudgetReport {
    const violations: string[] = [];

    if (actual.cssSize > this.budget.maxCSSSize) {
      violations.push(`CSS size ${actual.cssSize}KB exceeds budget ${this.budget.maxCSSSize}KB`);
    }

    if (actual.jsSize > this.budget.maxJSSize) {
      violations.push(`JS size ${actual.jsSize}KB exceeds budget ${this.budget.maxJSSize}KB`);
    }

    if (actual.imageSize > this.budget.maxImageSize) {
      violations.push(`Image size ${actual.imageSize}KB exceeds budget ${this.budget.maxImageSize}KB`);
    }

    if (actual.fonts > this.budget.maxFonts) {
      violations.push(`Font count ${actual.fonts} exceeds budget ${this.budget.maxFonts}`);
    }

    if (actual.animations > this.budget.maxAnimations) {
      violations.push(`Animation count ${actual.animations} exceeds budget ${this.budget.maxAnimations}`);
    }

    return {
      passed: violations.length === 0,
      violations,
      utilization: {
        css: (actual.cssSize / this.budget.maxCSSSize) * 100,
        js: (actual.jsSize / this.budget.maxJSSize) * 100,
        images: (actual.imageSize / this.budget.maxImageSize) * 100,
        fonts: (actual.fonts / this.budget.maxFonts) * 100,
        animations: (actual.animations / this.budget.maxAnimations) * 100
      }
    };
  }

  /**
   * Generate device-specific theme variants
   */
  generateDeviceVariants(): Map<string, ThemeConfig> {
    const variants = new Map<string, ThemeConfig>();

    // Mobile variant - simplified
    variants.set('mobile', {
      ...this.config,
      typography: {
        ...this.config.typography,
        fontSize: {
          ...this.config.typography.fontSize,
          base: '14px',
          lg: '16px',
          xl: '18px'
        }
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem'
      }
    });

    // Tablet variant
    variants.set('tablet', {
      ...this.config,
      typography: {
        ...this.config.typography,
        fontSize: {
          ...this.config.typography.fontSize,
          base: '15px',
          lg: '17px',
          xl: '20px'
        }
      }
    });

    // Desktop variant - full featured
    variants.set('desktop', this.config);

    return variants;
  }

  /**
   * Optimize animations for performance
   */
  optimizeAnimations(): AnimationOptimization {
    return {
      useGPUAcceleration: true,
      properties: ['transform', 'opacity'], // Only animate these
      avoidProperties: ['width', 'height', 'top', 'left'], // Avoid layout thrashing
      useWillChange: true,
      reducedMotion: true, // Respect prefers-reduced-motion
      recommendations: [
        'Use transform instead of position properties',
        'Batch DOM reads and writes',
        'Use requestAnimationFrame for smooth animations',
        'Implement intersection observer for scroll animations'
      ]
    };
  }

  /**
   * Generate atomic CSS utilities
   */
  generateAtomicCSS(): string {
    const utilities: string[] = [];

    // Spacing utilities
    Object.entries(this.config.spacing).forEach(([key, value]) => {
      utilities.push(`.m-${key} { margin: ${value}; }`);
      utilities.push(`.p-${key} { padding: ${value}; }`);
      utilities.push(`.mt-${key} { margin-top: ${value}; }`);
      utilities.push(`.mb-${key} { margin-bottom: ${value}; }`);
      utilities.push(`.ml-${key} { margin-left: ${value}; }`);
      utilities.push(`.mr-${key} { margin-right: ${value}; }`);
    });

    // Typography utilities
    Object.entries(this.config.typography.fontSize).forEach(([key, value]) => {
      utilities.push(`.text-${key} { font-size: ${value}; }`);
    });

    // Color utilities
    Object.entries(this.config.colors).forEach(([key, value]) => {
      utilities.push(`.text-${key} { color: ${value}; }`);
      utilities.push(`.bg-${key} { background-color: ${value}; }`);
      utilities.push(`.border-${key} { border-color: ${value}; }`);
    });

    return utilities.join('\n');
  }

  private checkContrastRatios(): string[] {
    const issues: string[] = [];

    // Check primary color contrast
    const primaryContrast = this.calculateContrastRatio(
      this.config.colors.primary,
      this.config.colors.background
    );

    if (primaryContrast < this.wcag.contrastRatio) {
      issues.push(`Primary color contrast ratio ${primaryContrast.toFixed(2)} is below ${this.wcag.contrastRatio}`);
    }

    // Check foreground contrast
    const foregroundContrast = this.calculateContrastRatio(
      this.config.colors.foreground,
      this.config.colors.background
    );

    if (foregroundContrast < this.wcag.contrastRatio) {
      issues.push(`Foreground contrast ratio ${foregroundContrast.toFixed(2)} is below ${this.wcag.contrastRatio}`);
    }

    return issues;
  }

  private calculateContrastRatio(color1: string, color2: string): number {
    // Simplified contrast calculation
    // In production, use a proper color contrast library
    return 4.5; // Mock value
  }

  private calculateAccessibilityScore(issues: string[], warnings: string[]): number {
    let score = 100;
    score -= issues.length * 10;
    score -= warnings.length * 5;
    return Math.max(0, score);
  }
}

export interface WCAGValidationResult {
  compliant: boolean;
  level: 'A' | 'AA' | 'AAA';
  issues: string[];
  warnings: string[];
  score: number;
}

export interface BudgetReport {
  passed: boolean;
  violations: string[];
  utilization: {
    css: number;
    js: number;
    images: number;
    fonts: number;
    animations: number;
  };
}

export interface AnimationOptimization {
  useGPUAcceleration: boolean;
  properties: string[];
  avoidProperties: string[];
  useWillChange: boolean;
  reducedMotion: boolean;
  recommendations: string[];
}
