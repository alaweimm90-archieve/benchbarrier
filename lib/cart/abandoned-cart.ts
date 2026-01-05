/**
 * Abandoned Cart Recovery System
 * Tracks and recovers abandoned carts via email
 */

import { sendAbandonedCartEmail } from '../email/service'

export interface AbandonedCart {
  id: string
  customerEmail: string
  customerName: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }>
  total: number
  createdAt: Date
  lastUpdated: Date
  recovered: boolean
}

const ABANDONED_CART_THRESHOLD = 30 * 60 * 1000 // 30 minutes
const RECOVERY_EMAIL_DELAY = 60 * 60 * 1000 // 1 hour after abandonment

// In-memory storage (in production, use database)
const abandonedCarts = new Map<string, AbandonedCart>()

export function trackCart(
  email: string,
  name: string,
  items: AbandonedCart['items']
) {
  const cartId = `cart_${email}_${Date.now()}`
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const cart: AbandonedCart = {
    id: cartId,
    customerEmail: email,
    customerName: name,
    items,
    total,
    createdAt: new Date(),
    lastUpdated: new Date(),
    recovered: false,
  }

  abandonedCarts.set(email, cart)
  
  // Schedule recovery email
  scheduleRecoveryEmail(cart)
  
  return cart
}

export function updateCart(email: string, items: AbandonedCart['items']) {
  const cart = abandonedCarts.get(email)
  if (!cart) return null

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  cart.items = items
  cart.total = total
  cart.lastUpdated = new Date()

  abandonedCarts.set(email, cart)
  return cart
}

export function markCartAsRecovered(email: string) {
  const cart = abandonedCarts.get(email)
  if (cart) {
    cart.recovered = true
    abandonedCarts.set(email, cart)
  }
}

export function removeCart(email: string) {
  abandonedCarts.delete(email)
}

function scheduleRecoveryEmail(cart: AbandonedCart) {
  setTimeout(async () => {
    // Check if cart still exists and hasn't been recovered
    const currentCart = abandonedCarts.get(cart.customerEmail)
    if (!currentCart || currentCart.recovered) {
      return
    }

    // Check if cart has been inactive for threshold period
    const timeSinceUpdate = Date.now() - currentCart.lastUpdated.getTime()
    if (timeSinceUpdate < ABANDONED_CART_THRESHOLD) {
      return
    }

    // Send recovery email
    try {
      const cartUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://benchbarrier.vercel.app'}/cart?recovery=${cart.id}`
      
      await sendAbandonedCartEmail(cart.customerEmail, {
        customerName: cart.customerName,
        cartItems: cart.items.map((item) => ({
          name: item.name,
          price: item.price,
          image: item.image,
        })),
        cartTotal: cart.total,
        cartUrl,
      })

      console.log('Abandoned cart recovery email sent:', cart.id)
    } catch (error) {
      console.error('Failed to send abandoned cart email:', error)
    }
  }, RECOVERY_EMAIL_DELAY)
}

// Get all abandoned carts (for admin dashboard)
export function getAbandonedCarts(): AbandonedCart[] {
  return Array.from(abandonedCarts.values()).filter((cart) => !cart.recovered)
}

// Get abandoned cart statistics
export function getAbandonedCartStats() {
  const carts = Array.from(abandonedCarts.values())
  const abandoned = carts.filter((c) => !c.recovered)
  const recovered = carts.filter((c) => c.recovered)

  const totalAbandoned = abandoned.reduce((sum, cart) => sum + cart.total, 0)
  const totalRecovered = recovered.reduce((sum, cart) => sum + cart.total, 0)

  return {
    totalCarts: carts.length,
    abandonedCount: abandoned.length,
    recoveredCount: recovered.length,
    recoveryRate: carts.length > 0 ? (recovered.length / carts.length) * 100 : 0,
    totalAbandonedValue: totalAbandoned,
    totalRecoveredValue: totalRecovered,
    averageCartValue: carts.length > 0 ? (totalAbandoned + totalRecovered) / carts.length : 0,
  }
}

// Clean up old carts (run periodically)
export function cleanupOldCarts(daysOld = 30) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysOld)

  let cleaned = 0
  for (const [email, cart] of abandonedCarts.entries()) {
    if (cart.createdAt < cutoffDate) {
      abandonedCarts.delete(email)
      cleaned++
    }
  }

  console.log(`Cleaned up ${cleaned} old abandoned carts`)
  return cleaned
}
