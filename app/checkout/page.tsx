'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import {
  BrutalistContainer,
  BrutalistSection,
  BrutalistDivider,
  PixelSeparator
} from '@/components/brutalist-patterns'
import { LockIcon, CheckIcon } from '@/components/pixel-icons'

interface FormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
}

interface FormErrors {
  [key: string]: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/products')
    }
  }, [cart, router])

  const tax = cartTotal * 0.08
  const shipping = cartTotal > 10000 ? 0 : 1500
  const total = cartTotal + tax + shipping

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    // Name validation
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'

    // Address validation
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'

    // Card validation
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required'
    } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Card number is invalid'
    }

    if (!formData.cardExpiry) {
      newErrors.cardExpiry = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Format: MM/YY'
    }

    if (!formData.cardCvc) {
      newErrors.cardCvc = 'CVC is required'
    } else if (formData.cardCvc.length < 3) {
      newErrors.cardCvc = 'CVC is invalid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setFormData(prev => ({ ...prev, cardExpiry: formatted }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      router.push('/checkout/success')
    }, 2000)
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-stone-950 py-16">
      <BrutalistContainer>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="pixel-badge-primary">
              ■ SECURE CHECKOUT ■
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
            Complete
            <br />
            <span className="text-blue-500">Your Order</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-stone-400">
            <LockIcon size={16} className="text-green-500" />
            <span className="uppercase">256-bit SSL Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="card-brutalist p-6">
                <h2 className="text-xl font-bold uppercase text-stone-50 mb-6 flex items-center gap-2">
                  <span className="text-blue-500">1.</span> Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-brutalist w-full ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs uppercase mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card-brutalist p-6">
                <h2 className="text-xl font-bold uppercase text-stone-50 mb-6 flex items-center gap-2">
                  <span className="text-blue-500">2.</span> Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input-brutalist w-full ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs uppercase mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input-brutalist w-full ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs uppercase mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`input-brutalist w-full ${errors.address ? 'border-red-500' : ''}`}
                      placeholder="123 Main St"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs uppercase mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`input-brutalist w-full ${errors.city ? 'border-red-500' : ''}`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs uppercase mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`input-brutalist w-full ${errors.state ? 'border-red-500' : ''}`}
                        placeholder="CA"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs uppercase mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`input-brutalist w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                        placeholder="90210"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-xs uppercase mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="input-brutalist w-full"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="card-brutalist p-6">
                <h2 className="text-xl font-bold uppercase text-stone-50 mb-6 flex items-center gap-2">
                  <span className="text-blue-500">3.</span> Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className={`input-brutalist w-full font-mono ${errors.cardNumber ? 'border-red-500' : ''}`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs uppercase mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className={`input-brutalist w-full font-mono ${errors.cardExpiry ? 'border-red-500' : ''}`}
                        placeholder="MM/YY"
                      />
                      {errors.cardExpiry && (
                        <p className="text-red-500 text-xs uppercase mt-1">{errors.cardExpiry}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-bold uppercase text-stone-400 mb-2">
                        CVC *
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        maxLength={4}
                        className={`input-brutalist w-full font-mono ${errors.cardCvc ? 'border-red-500' : ''}`}
                        placeholder="123"
                      />
                      {errors.cardCvc && (
                        <p className="text-red-500 text-xs uppercase mt-1">{errors.cardCvc}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-brutalist p-6 sticky top-20">
                <h2 className="text-xl font-bold uppercase text-stone-50 mb-6">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-stone-900 border-2 border-stone-800 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold uppercase text-stone-50 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-stone-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-blue-500">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <BrutalistDivider thickness="thin" />

                {/* Totals */}
                <div className="space-y-2 my-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400 uppercase">Subtotal</span>
                    <span className="text-stone-50 font-bold">
                      ${(cartTotal / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400 uppercase">Tax (8%)</span>
                    <span className="text-stone-50 font-bold">
                      ${(tax / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400 uppercase">Shipping</span>
                    <span className="text-stone-50 font-bold">
                      {shipping === 0 ? (
                        <span className="text-green-500">FREE</span>
                      ) : (
                        `$${(shipping / 100).toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <BrutalistDivider thickness="thick" />

                {/* Total */}
                <div className="flex justify-between items-center my-6">
                  <span className="text-lg font-bold uppercase text-stone-50">Total</span>
                  <span className="text-3xl font-bold text-blue-500">
                    ${(total / 100).toFixed(2)}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-brutalist w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-pixel-blink">■</span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <LockIcon size={24} />
                      Complete Order
                    </span>
                  )}
                </button>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-stone-900 border-2 border-stone-800">
                  <div className="flex items-start gap-2">
                    <CheckIcon size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-xs text-stone-400 uppercase">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </BrutalistContainer>
    </div>
  )
}
