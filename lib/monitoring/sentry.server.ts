/**
 * Sentry Server-Side Configuration
 * Monitors errors and performance on the server
 */

import * as Sentry from '@sentry/react'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    
    // Error Filtering
    beforeSend(event, hint) {
      // Filter out known non-critical errors
      const error = hint.originalException as Error
      
      if (error?.message?.includes('ResizeObserver loop')) {
        return null // Ignore ResizeObserver errors
      }
      
      if (error?.message?.includes('Non-Error promise rejection')) {
        return null // Ignore non-error promise rejections
      }
      
      return event
    },
    
    // Integrations
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  })
}

export { Sentry }
