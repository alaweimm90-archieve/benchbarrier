/**
 * BenchBarrier Monitoring & Analytics Configuration
 * 
 * This module initializes and configures:
 * - Sentry error tracking
 * - Web Vitals performance monitoring
 * - Plausible analytics
 */

import * as Sentry from '@sentry/react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

// ============================================
// SENTRY ERROR TRACKING
// ============================================

/**
 * Initialize Sentry error tracking
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';
  const enableErrorTracking = import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true';

  if (!dsn || !enableErrorTracking) {
    console.log('[Monitoring] Sentry disabled');
    return;
  }

  Sentry.init({
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Performance Monitoring
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: environment === 'production' ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    
    // Release tracking
    release: `benchbarrier@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
    
    // Ignore common errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'Network request failed',
    ],
    
    // Filter sensitive data
    beforeSend(event, hint) {
      // Remove sensitive data from error reports
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers;
      }
      
      // Filter out development errors
      if (environment === 'development' && hint.originalException) {
        console.error('[Sentry]', hint.originalException);
      }
      
      return event;
    },
  });

  console.log('[Monitoring] Sentry initialized');
}

// ============================================
// WEB VITALS PERFORMANCE MONITORING
// ============================================

/**
 * Send Web Vitals metrics to analytics
 */
function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Send to Sentry
  if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
    Sentry.captureMessage(`Web Vital: ${metric.name}`, {
      level: 'info',
      tags: {
        webVital: metric.name,
        rating: metric.rating,
      },
      extra: {
        value: metric.value,
        delta: metric.delta,
      },
    });
  }

  // Send to custom analytics endpoint (if configured)
  const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  if (analyticsEndpoint) {
    navigator.sendBeacon(analyticsEndpoint, body);
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', metric.name, metric.value, metric.rating);
  }
}

/**
 * Initialize Web Vitals monitoring
 */
export function initWebVitals() {
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== 'true') {
    console.log('[Monitoring] Web Vitals disabled');
    return;
  }

  // Core Web Vitals
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onINP(sendToAnalytics);  // Interaction to Next Paint (replaces FID)
  onLCP(sendToAnalytics);  // Largest Contentful Paint

  // Additional metrics
  onFCP(sendToAnalytics);  // First Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte

  console.log('[Monitoring] Web Vitals initialized');
}

// ============================================
// PLAUSIBLE ANALYTICS
// ============================================

/**
 * Initialize Plausible Analytics
 */
export function initPlausible() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  const apiHost = import.meta.env.VITE_PLAUSIBLE_API_HOST || 'https://plausible.io';
  const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

  if (!domain || !enableAnalytics) {
    console.log('[Monitoring] Plausible disabled');
    return;
  }

  // Load Plausible script
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = domain;
  script.src = `${apiHost}/js/script.js`;
  document.head.appendChild(script);

  console.log('[Monitoring] Plausible initialized');
}

/**
 * Track custom event in Plausible
 */
export function trackEvent(eventName: string, props?: Record<string, string | number>) {
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== 'true') {
    return;
  }

  // @ts-ignore - Plausible is loaded via script tag
  if (window.plausible) {
    // @ts-ignore
    window.plausible(eventName, { props });
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, props);
  }
}

// ============================================
// CUSTOM PERFORMANCE TRACKING
// ============================================

/**
 * Track page load performance
 */
export function trackPageLoad() {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      trackEvent('page_load', {
        load_time: pageLoadTime,
        connect_time: connectTime,
        render_time: renderTime,
      });

      if (import.meta.env.DEV) {
        console.log('[Performance] Page Load:', {
          total: `${pageLoadTime}ms`,
          connect: `${connectTime}ms`,
          render: `${renderTime}ms`,
        });
      }
    }, 0);
  });
}

/**
 * Track user engagement
 */
export function trackEngagement() {
  let startTime = Date.now();
  let isActive = true;

  // Track time on page
  const trackTimeOnPage = () => {
    if (isActive) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', { seconds: timeSpent });
    }
  };

  // Track when user leaves
  window.addEventListener('beforeunload', trackTimeOnPage);

  // Track visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isActive = false;
      trackTimeOnPage();
    } else {
      isActive = true;
      startTime = Date.now();
    }
  });
}

// ============================================
// ERROR BOUNDARY INTEGRATION
// ============================================

/**
 * Log error to monitoring services
 */
export function logError(error: Error, errorInfo?: any) {
  // Log to Sentry
  if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
    Sentry.captureException(error, {
      contexts: {
        react: errorInfo,
      },
    });
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('[Error]', error, errorInfo);
  }

  // Track error event
  trackEvent('error', {
    message: error.message,
    stack: error.stack?.substring(0, 100) || 'unknown',
  });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all monitoring services
 */
export function initMonitoring() {
  try {
    initSentry();
    initWebVitals();
    initPlausible();
    trackPageLoad();
    trackEngagement();
    
    console.log('[Monitoring] All services initialized');
  } catch (error) {
    console.error('[Monitoring] Initialization failed:', error);
  }
}

// ============================================
// EXPORTS
// ============================================

export default {
  init: initMonitoring,
  trackEvent,
  logError,
};
