'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { createStudentCheckoutSession } from '@/app/actions/stripe'
import { createStudentVerification } from '@/app/actions/student'

export default function StudentDiscountPage() {
  const { cart, cartTotal } = useCart()
  const [email, setEmail] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const validateEduEmail = (email: string): boolean => {
    return email.toLowerCase().endsWith('.edu')
  }

  const handleVerify = async () => {
    setError('')
    
    if (!validateEduEmail(email)) {
      setError('Please enter a valid .edu email address')
      return
    }

    setIsValidating(true)
    try {
      const result = await createStudentVerification(email)
      
      if (result.success) {
        setVerificationCode(result.verificationCode || '')
        setIsVerified(true)
      } else {
        setError(result.error || 'Failed to verify student email')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setError('Failed to verify student email. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isVerified) {
      await handleVerify()
      return
    }

    if (cart.length === 0) {
      setError('Your cart is empty. Add products before checking out.')
      return
    }

    setIsLoading(true)
    try {
      const { url } = await createStudentCheckoutSession(cart, email)
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setError('Failed to initiate checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const discountedTotal = cartTotal * 0.8
  const savings = cartTotal * 0.2

  return (
    <div className="min-h-screen bg-stone-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
            Student Discount
          </h1>
          <p className="text-stone-400 uppercase text-sm">
            20% off for verified students
          </p>
        </div>

        {/* Info Card */}
        <div className="card-brutalist mb-8">
          <h2 className="text-2xl font-bold uppercase text-stone-50 mb-4">
            Eligibility Requirements
          </h2>
          <ul className="space-y-2">
            <li className="text-stone-400 text-sm uppercase flex items-start">
              <span className="text-blue-500 mr-2">▪</span>
              Valid .edu email address required
            </li>
            <li className="text-stone-400 text-sm uppercase flex items-start">
              <span className="text-blue-500 mr-2">▪</span>
              Currently enrolled student status
            </li>
            <li className="text-stone-400 text-sm uppercase flex items-start">
              <span className="text-blue-500 mr-2">▪</span>
              Discount applies to all products
            </li>
            <li className="text-stone-400 text-sm uppercase flex items-start">
              <span className="text-blue-500 mr-2">▪</span>
              Cannot be combined with other offers
            </li>
          </ul>
        </div>

        {/* Verification Form */}
        <div className="card-brutalist">
          <h2 className="text-2xl font-bold uppercase text-stone-50 mb-6">
            Verify Student Status
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-stone-400 uppercase text-xs font-bold mb-2">
                Student Email (.edu)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@university.edu"
                className="input-brutalist w-full"
                required
                disabled={isVerified}
              />
            </div>

            {isVerified && verificationCode && (
              <div className="bg-stone-900 border-2 border-blue-500 p-6">
                <h3 className="text-blue-500 font-bold uppercase text-sm mb-2">
                  ✓ Email Verified
                </h3>
                <p className="text-stone-400 text-xs uppercase mb-3">
                  Your student discount code:
                </p>
                <div className="bg-stone-950 border-2 border-blue-500 p-4 mb-3">
                  <code className="text-blue-500 font-mono text-lg">{verificationCode}</code>
                </div>
                <p className="text-stone-400 text-xs">
                  Save this code for future purchases. The 20% discount has been applied to your cart.
                </p>
              </div>
            )}

            {error && (
              <div className="bg-stone-900 border-2 border-blue-500 p-4">
                <p className="text-blue-500 text-sm uppercase">{error}</p>
              </div>
            )}

            {cart.length > 0 && isVerified && (
              <div className="bg-stone-900 border-2 border-stone-800 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-stone-400 uppercase text-sm">
                    <span>Original Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-blue-500 uppercase text-sm font-bold">
                    <span>Student Discount (20%)</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-stone-800 pt-3">
                    <div className="flex justify-between text-stone-50 font-bold uppercase text-lg">
                      <span>Your Total</span>
                      <span className="text-blue-500">${discountedTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isVerified ? (
              <button
                type="button"
                onClick={handleVerify}
                disabled={isValidating}
                className="w-full btn-brutalist text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? 'Verifying...' : 'Verify Student Email'}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading || cart.length === 0}
                className="w-full btn-brutalist text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Checkout with Discount'}
              </button>
            )}
          </form>

          {cart.length === 0 && (
            <div className="mt-6 text-center">
              <p className="text-stone-400 uppercase text-sm mb-4">
                Your cart is empty
              </p>
              <a href="/products" className="btn-brutalist-outline">
                Shop Products
              </a>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-stone-500 uppercase text-xs">
            By proceeding, you confirm that you are a currently enrolled student
            <br />
            and that the information provided is accurate.
          </p>
        </div>
      </div>
    </div>
  )
}
