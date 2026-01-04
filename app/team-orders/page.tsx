'use client'

import { useState } from 'react'

export default function TeamOrdersPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-brutalist text-center py-16">
            <div className="w-16 h-16 bg-blue-500 border-2 border-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold uppercase text-stone-50 mb-4">
              Request Received
            </h2>
            <p className="text-stone-400 uppercase text-sm mb-8">
              Our team will contact you within 24 hours to discuss your bulk order
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-brutalist-outline"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
            Team & Bulk Orders
          </h1>
          <p className="text-stone-400 uppercase text-sm">
            Special pricing for teams, gyms, and organizations
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card-brutalist text-center">
            <h3 className="text-xl font-bold uppercase text-blue-500 mb-2">
              Volume Discounts
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              Save up to 30% on bulk orders
            </p>
          </div>
          <div className="card-brutalist text-center">
            <h3 className="text-xl font-bold uppercase text-blue-500 mb-2">
              Custom Branding
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              Add your logo or team name
            </p>
          </div>
          <div className="card-brutalist text-center">
            <h3 className="text-xl font-bold uppercase text-blue-500 mb-2">
              Dedicated Support
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              Personal account manager
            </p>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="card-brutalist mb-12">
          <h2 className="text-2xl font-bold uppercase text-stone-50 mb-6">
            Volume Pricing
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b-2 border-stone-800 pb-4">
              <span className="text-stone-400 uppercase text-sm">10-24 Units</span>
              <span className="text-blue-500 font-bold uppercase">10% Off</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-stone-800 pb-4">
              <span className="text-stone-400 uppercase text-sm">25-49 Units</span>
              <span className="text-blue-500 font-bold uppercase">15% Off</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-stone-800 pb-4">
              <span className="text-stone-400 uppercase text-sm">50-99 Units</span>
              <span className="text-blue-500 font-bold uppercase">20% Off</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-400 uppercase text-sm">100+ Units</span>
              <span className="text-blue-500 font-bold uppercase">30% Off</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card-brutalist">
          <h2 className="text-2xl font-bold uppercase text-stone-50 mb-6">
            Request a Quote
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="organizationName" className="block text-stone-400 uppercase text-xs font-bold mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="input-brutalist w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-stone-400 uppercase text-xs font-bold mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="input-brutalist w-full"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-stone-400 uppercase text-xs font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-brutalist w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-stone-400 uppercase text-xs font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-brutalist w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-stone-400 uppercase text-xs font-bold mb-2">
                Estimated Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="10"
                className="input-brutalist w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-stone-400 uppercase text-xs font-bold mb-2">
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="input-brutalist w-full resize-none"
                placeholder="Tell us about your needs, timeline, and any custom requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-brutalist text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Request Quote'}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-stone-500 uppercase text-xs">
            Questions? Email us at{' '}
            <a href="mailto:teams@benchbarrier.com" className="text-blue-500 hover:underline">
              teams@benchbarrier.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
