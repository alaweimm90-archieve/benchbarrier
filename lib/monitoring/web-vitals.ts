/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals and reports to analytics
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

/**
 * Report Web Vital to analytics
 */
function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value, metric.rating)
  }

  // Send to Sentry (if available)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    const Sentry = (window as any).Sentry
    Sentry.captureMessage(`Web Vital: ${metric.name}`, {
      level: metric.rating === 'good' ? 'info' : metric.rating === 'needs-improvement' ? 'warning' : 'error',
      tags: {
        web_vital: metric.name,
        rating: metric.rating,
      },
      extra: {
        value: metric.value,
        id: metric.id,
        navigationType: metric.navigationType,
      },
    })
  }
}

/**
 * Initialize Web Vitals tracking
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return

  onCLS(sendToAnalytics)
  onINP(sendToAnalytics) // INP replaced FID in web-vitals v3
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}

/**
 * Get Web Vitals thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  INP: {
    good: 200,
    needsImprovement: 500,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  TTFB: {
    good: 600,
    needsImprovement: 1500,
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
}

/**
 * Calculate Web Vitals score (0-100)
 */
export function calculateWebVitalsScore(metrics: {
  LCP?: number
  INP?: number
  CLS?: number
  TTFB?: number
  FCP?: number
}): number {
  let score = 0
  let count = 0

  if (metrics.LCP !== undefined) {
    score += metrics.LCP <= WEB_VITALS_THRESHOLDS.LCP.good ? 100 : 
             metrics.LCP <= WEB_VITALS_THRESHOLDS.LCP.needsImprovement ? 50 : 0
    count++
  }

  if (metrics.INP !== undefined) {
    score += metrics.INP <= WEB_VITALS_THRESHOLDS.INP.good ? 100 : 
             metrics.INP <= WEB_VITALS_THRESHOLDS.INP.needsImprovement ? 50 : 0
    count++
  }

  if (metrics.CLS !== undefined) {
    score += metrics.CLS <= WEB_VITALS_THRESHOLDS.CLS.good ? 100 : 
             metrics.CLS <= WEB_VITALS_THRESHOLDS.CLS.needsImprovement ? 50 : 0
    count++
  }

  if (metrics.TTFB !== undefined) {
    score += metrics.TTFB <= WEB_VITALS_THRESHOLDS.TTFB.good ? 100 : 
             metrics.TTFB <= WEB_VITALS_THRESHOLDS.TTFB.needsImprovement ? 50 : 0
    count++
  }

  if (metrics.FCP !== undefined) {
    score += metrics.FCP <= WEB_VITALS_THRESHOLDS.FCP.good ? 100 : 
             metrics.FCP <= WEB_VITALS_THRESHOLDS.FCP.needsImprovement ? 50 : 0
    count++
  }

  return count > 0 ? Math.round(score / count) : 0
}
