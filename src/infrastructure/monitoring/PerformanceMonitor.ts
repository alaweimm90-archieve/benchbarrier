/**
 * Performance Monitoring System
 * Tracks Core Web Vitals, technical debt, and system health
 */

export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
}

export interface TechDebtMetrics {
  totalIssues: number;
  criticalIssues: number;
  codeSmells: number;
  duplications: number;
  coverage: number;
  maintainabilityIndex: number; // 0-100
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  errorRate: number;
  responseTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private techDebt: TechDebtMetrics | null = null;

  /**
   * Capture Core Web Vitals
   */
  captureWebVitals(): PerformanceMetrics {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;

    const metrics: PerformanceMetrics = {
      lcp: this.getLCP(),
      fid: this.getFID(),
      cls: this.getCLS(),
      ttfb: navigation?.responseStart - navigation?.requestStart || 0,
      fcp
    };

    this.metrics.push(metrics);
    return metrics;
  }

  /**
   * Get performance score (0-100)
   */
  getPerformanceScore(): number {
    if (this.metrics.length === 0) return 0;

    const latest = this.metrics[this.metrics.length - 1];

    // Scoring based on Core Web Vitals thresholds
    let score = 100;

    // LCP: Good < 2.5s, Needs Improvement < 4s, Poor >= 4s
    if (latest.lcp > 4000) score -= 30;
    else if (latest.lcp > 2500) score -= 15;

    // FID: Good < 100ms, Needs Improvement < 300ms, Poor >= 300ms
    if (latest.fid > 300) score -= 25;
    else if (latest.fid > 100) score -= 10;

    // CLS: Good < 0.1, Needs Improvement < 0.25, Poor >= 0.25
    if (latest.cls > 0.25) score -= 25;
    else if (latest.cls > 0.1) score -= 10;

    // TTFB: Good < 800ms, Needs Improvement < 1800ms, Poor >= 1800ms
    if (latest.ttfb > 1800) score -= 15;
    else if (latest.ttfb > 800) score -= 5;

    // FCP: Good < 1.8s, Needs Improvement < 3s, Poor >= 3s
    if (latest.fcp > 3000) score -= 5;
    else if (latest.fcp > 1800) score -= 2;

    return Math.max(0, score);
  }

  /**
   * Calculate Technical Debt Index (0-100, lower is better)
   */
  calculateTechDebtIndex(metrics: TechDebtMetrics): number {
    this.techDebt = metrics;

    let index = 0;

    // Critical issues have highest weight
    index += metrics.criticalIssues * 10;

    // Code smells
    index += metrics.codeSmells * 2;

    // Duplications
    index += metrics.duplications * 3;

    // Low coverage increases debt
    if (metrics.coverage < 80) {
      index += (80 - metrics.coverage) * 2;
    }

    // Low maintainability increases debt
    if (metrics.maintainabilityIndex < 70) {
      index += (70 - metrics.maintainabilityIndex);
    }

    return Math.min(100, index);
  }

  /**
   * Get Knowledge Cohesion Score
   * Measures how well documentation is interconnected
   */
  calculateKnowledgeCohesion(
    totalKernels: number,
    connectedKernels: number,
    orphanedKernels: number
  ): number {
    if (totalKernels === 0) return 0;

    const connectionRatio = connectedKernels / totalKernels;
    const orphanPenalty = (orphanedKernels / totalKernels) * 0.3;

    return Math.max(0, Math.min(100, (connectionRatio - orphanPenalty) * 100));
  }

  /**
   * Monitor system health
   */
  async checkSystemHealth(): Promise<SystemHealth> {
    const errorRate = this.calculateErrorRate();
    const responseTime = this.getAverageResponseTime();

    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';

    if (errorRate > 5 || responseTime > 3000) {
      status = 'critical';
    } else if (errorRate > 1 || responseTime > 1000) {
      status = 'degraded';
    }

    return {
      status,
      uptime: performance.now() / 1000, // seconds
      errorRate,
      responseTime,
      memoryUsage: this.getMemoryUsage(),
      cpuUsage: 0 // Not available in browser
    };
  }

  /**
   * Generate performance report
   */
  generateReport(): PerformanceReport {
    const performanceScore = this.getPerformanceScore();
    const techDebtIndex = this.techDebt 
      ? this.calculateTechDebtIndex(this.techDebt)
      : 0;

    return {
      timestamp: new Date(),
      performanceScore,
      techDebtIndex,
      webVitals: this.metrics[this.metrics.length - 1] || null,
      recommendations: this.generateRecommendations(performanceScore, techDebtIndex)
    };
  }

  private getLCP(): number {
    // Simplified LCP calculation
    const entries = performance.getEntriesByType('largest-contentful-paint');
    return entries.length > 0 ? entries[entries.length - 1].startTime : 0;
  }

  private getFID(): number {
    // Simplified FID calculation
    const entries = performance.getEntriesByType('first-input');
    return entries.length > 0 
      ? (entries[0] as any).processingStart - entries[0].startTime 
      : 0;
  }

  private getCLS(): number {
    // Simplified CLS calculation
    let cls = 0;
    const entries = performance.getEntriesByType('layout-shift');
    
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        cls += entry.value;
      }
    });

    return cls;
  }

  private calculateErrorRate(): number {
    // Mock implementation
    return Math.random() * 2; // 0-2% error rate
  }

  private getAverageResponseTime(): number {
    if (this.metrics.length === 0) return 0;

    const sum = this.metrics.reduce((acc, m) => acc + m.ttfb, 0);
    return sum / this.metrics.length;
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    }
    return 0;
  }

  private generateRecommendations(
    performanceScore: number,
    techDebtIndex: number
  ): string[] {
    const recommendations: string[] = [];

    if (performanceScore < 70) {
      recommendations.push('Optimize images and implement lazy loading');
      recommendations.push('Reduce JavaScript bundle size');
      recommendations.push('Implement code splitting for routes');
    }

    if (techDebtIndex > 50) {
      recommendations.push('Refactor high-complexity components');
      recommendations.push('Increase test coverage to 80%+');
      recommendations.push('Address critical code smells');
    }

    if (this.metrics.length > 0) {
      const latest = this.metrics[this.metrics.length - 1];
      
      if (latest.lcp > 2500) {
        recommendations.push('Optimize Largest Contentful Paint (LCP)');
      }
      
      if (latest.cls > 0.1) {
        recommendations.push('Fix layout shifts by reserving space for dynamic content');
      }
    }

    return recommendations;
  }
}

export interface PerformanceReport {
  timestamp: Date;
  performanceScore: number;
  techDebtIndex: number;
  webVitals: PerformanceMetrics | null;
  recommendations: string[];
}
