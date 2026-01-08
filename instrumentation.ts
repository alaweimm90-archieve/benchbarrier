/**
 * Instrumentation for Next.js
 * Initializes monitoring and observability tools
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation
    await import('./lib/monitoring/sentry.server')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    await import('./lib/monitoring/sentry.edge')
  }
}
