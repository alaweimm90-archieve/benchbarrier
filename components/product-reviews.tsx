'use client'

import { useState, useEffect } from 'react'
import { StarIcon } from './pixel-icons'

interface Review {
  id: string
  customer_name: string
  rating: number
  title: string
  comment: string
  verified_purchase: boolean
  helpful_count: number
  created_at: string
}

interface ReviewStats {
  average_rating: number
  total_reviews: number
  rating_distribution: {
    '5': number
    '4': number
    '3': number
    '2': number
    '1': number
  }
}

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    rating: 5,
    title: '',
    comment: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [productId])

  async function fetchReviews() {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`)
      const data = await response.json()
      setReviews(data.reviews)
      setStats(data.stats)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          ...formData,
        }),
      })

      if (response.ok) {
        setShowForm(false)
        setFormData({
          customerName: '',
          customerEmail: '',
          rating: 5,
          title: '',
          comment: '',
        })
        fetchReviews()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to submit review')
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
      alert('Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="border-4 border-stone-950 bg-stone-100 p-8">
        <div className="text-center text-stone-950">Loading reviews...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      {stats && stats.total_reviews > 0 && (
        <div className="border-4 border-stone-950 bg-stone-100 p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Average Rating */}
            <div className="text-center">
              <div className="mb-4 text-6xl font-black text-stone-950">
                {stats.average_rating.toFixed(1)}
              </div>
              <div className="mb-2 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    size={24}
                    filled={star <= Math.round(stats.average_rating)}
                  />
                ))}
              </div>
              <div className="text-sm font-bold text-stone-600">
                Based on {stats.total_reviews} review{stats.total_reviews !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.rating_distribution[rating.toString() as keyof typeof stats.rating_distribution]
                const percentage = stats.total_reviews > 0 ? (count / stats.total_reviews) * 100 : 0
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex w-12 items-center gap-1">
                      <span className="text-sm font-bold">{rating}</span>
                      <StarIcon size={16} filled />
                    </div>
                    <div className="h-4 flex-1 border-2 border-stone-950 bg-white">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-bold">
                      {count}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-8 w-full border-4 border-stone-950 bg-blue-500 px-6 py-3 font-black uppercase text-stone-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="border-4 border-stone-950 bg-stone-100 p-8">
          <h3 className="mb-6 text-2xl font-black uppercase">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold uppercase">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="w-full border-4 border-stone-950 bg-white px-4 py-3 font-mono text-stone-950 focus:outline-none focus:ring-4 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                  className="w-full border-4 border-stone-950 bg-white px-4 py-3 font-mono text-stone-950 focus:outline-none focus:ring-4 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <StarIcon size={32} filled={star <= formData.rating} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase">
                Title * (5-100 characters)
              </label>
              <input
                type="text"
                required
                minLength={5}
                maxLength={100}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border-4 border-stone-950 bg-white px-4 py-3 font-mono text-stone-950 focus:outline-none focus:ring-4 focus:ring-blue-500"
                placeholder="Sum up your experience"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase">
                Review * (20-1000 characters)
              </label>
              <textarea
                required
                minLength={20}
                maxLength={1000}
                rows={6}
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="w-full border-4 border-stone-950 bg-white px-4 py-3 font-mono text-stone-950 focus:outline-none focus:ring-4 focus:ring-blue-500"
                placeholder="Tell us what you think..."
              />
              <div className="mt-2 text-sm text-stone-600">
                {formData.comment.length}/1000 characters
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full border-4 border-stone-950 bg-blue-500 px-6 py-4 font-black uppercase text-stone-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="border-4 border-stone-950 bg-stone-100 p-8 text-center">
          <p className="mb-4 text-xl font-bold text-stone-950">
            No reviews yet
          </p>
          <p className="mb-6 text-stone-600">Be the first to review this product!</p>
          <button
            onClick={() => setShowForm(true)}
            className="border-4 border-stone-950 bg-blue-500 px-6 py-3 font-black uppercase text-stone-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            Write a Review
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-4 border-stone-950 bg-stone-100 p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          size={16}
                          filled={star <= review.rating}
                        />
                      ))}
                    </div>
                    {review.verified_purchase && (
                      <span className="border-2 border-green-600 bg-green-100 px-2 py-1 text-xs font-bold uppercase text-green-600">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-black">{review.title}</h4>
                </div>
              </div>

              <p className="mb-4 text-stone-700">{review.comment}</p>

              <div className="flex items-center justify-between text-sm text-stone-600">
                <div>
                  <span className="font-bold">{review.customer_name}</span>
                  {' • '}
                  {new Date(review.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                {review.helpful_count > 0 && (
                  <div className="font-bold">
                    {review.helpful_count} found this helpful
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
