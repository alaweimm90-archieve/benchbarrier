/**
 * Analytics Tracking
 * Google Analytics 4 + Custom Events
 */

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

/**
 * Initialize Google Analytics
 */
export function initAnalytics(measurementId: string) {
  if (typeof window === 'undefined') return

  // Load gtag script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  })
}

/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'page_view', {
    page_path: url,
  })
}

/**
 * Track product view
 */
export function trackViewItem(product: {
  id: string
  name: string
  price: number
  category: string
}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'view_item', {
    currency: 'USD',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      },
    ],
  })
}

/**
 * Track add to cart
 */
export function trackAddToCart(product: {
  id: string
  name: string
  price: number
  category: string
  quantity: number
}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  })
}

/**
 * Track remove from cart
 */
export function trackRemoveFromCart(product: {
  id: string
  name: string
  price: number
  category: string
  quantity: number
}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'remove_from_cart', {
    currency: 'USD',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  })
}

/**
 * Track begin checkout
 */
export function trackBeginCheckout(items: Array<{
  id: string
  name: string
  price: number
  category: string
  quantity: number
}>) {
  if (typeof window === 'undefined' || !window.gtag) return

  const value = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  window.gtag('event', 'begin_checkout', {
    currency: 'USD',
    value,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

/**
 * Track purchase
 */
export function trackPurchase(
  transactionId: string,
  items: Array<{
    id: string
    name: string
    price: number
    category: string
    quantity: number
  }>,
  tax: number = 0,
  shipping: number = 0
) {
  if (typeof window === 'undefined' || !window.gtag) return

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const value = subtotal + tax + shipping

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency: 'USD',
    value,
    tax,
    shipping,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, params)
}

/**
 * Track student discount click
 */
export function trackStudentDiscountClick() {
  trackEvent('student_discount_click', {
    event_category: 'engagement',
    event_label: 'Student Discount CTA',
  })
}

/**
 * Track social link click
 */
export function trackSocialLinkClick(platform: string) {
  trackEvent('social_link_click', {
    event_category: 'engagement',
    event_label: platform,
    platform,
  })
}

/**
 * Track search
 */
export function trackSearch(searchTerm: string) {
  trackEvent('search', {
    search_term: searchTerm,
  })
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(email: string) {
  trackEvent('newsletter_signup', {
    event_category: 'conversion',
    event_label: 'Newsletter',
  })
}
