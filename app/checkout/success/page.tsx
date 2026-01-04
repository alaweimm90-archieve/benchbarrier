'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Clear cart after successful checkout
    if (sessionId) {
      localStorage.removeItem('benchbarrier-cart')
      setIsLoading(false)
    }
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-blue-500 text-4xl mb-4">⏳</div>
          <p className="text-stone-400 uppercase text-sm">Processing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-brutalist text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-block p-6 border-4 border-blue-500 bg-stone-900">
              <svg
                className="w-16 h-16 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
            Order Confirmed
          </h1>
          
          <p className="text-stone-400 uppercase text-sm mb-2">
            Thank you for your purchase
          </p>
          
          {sessionId && (
            <p className="text-stone-500 text-xs uppercase mb-8 font-mono">
              Order ID: {sessionId.slice(-12)}
            </p>
          )}

          {/* Order Details */}
          <div className="border-2 border-stone-800 bg-stone-900 p-6 mb-8 text-left">
            <h2 className="text-xl font-bold uppercase text-stone-50 mb-4">
              What's Next?
            </h2>
            <ul className="space-y-3 text-stone-400 text-sm uppercase">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">1.</span>
                <span>Check your email for order confirmation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">2.</span>
                <span>Your order will be processed within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">3.</span>
                <span>Shipping confirmation will be sent separately</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">4.</span>
                <span>Delivery typically takes 5-7 business days</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-brutalist text-lg px-8 py-4">
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="border-2 border-stone-800 bg-stone-900 text-stone-50 uppercase font-bold px-8 py-4 hover:bg-stone-800 hover:border-blue-500 transition-all"
            >
              Back to Home
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-8 border-t-2 border-stone-800">
            <p className="text-stone-500 text-xs uppercase mb-2">
              Need Help?
            </p>
            <p className="text-stone-400 text-sm">
              Contact us at{' '}
              <a
                href="mailto:support@benchbarrier.com"
                className="text-blue-500 hover:underline"
              >
                support@benchbarrier.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-blue-500 text-4xl mb-4">⏳</div>
          <p className="text-stone-400 uppercase text-sm">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
