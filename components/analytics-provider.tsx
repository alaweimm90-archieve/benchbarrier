/**
 * Analytics Provider
 * Initializes analytics and web vitals tracking
 */

'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initAnalytics, trackPageView } from '@/lib/monitoring/analytics'
import { initWebVitals } from '@/lib/monitoring/web-vitals'

function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize analytics on mount
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (measurementId) {
      initAnalytics(measurementId)
      initWebVitals()
    }
  }, [])

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return null
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  )
}
