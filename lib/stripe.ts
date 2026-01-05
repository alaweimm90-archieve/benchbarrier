import Stripe from 'stripe'
import { getEnv } from './env'

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (stripeInstance) {
    return stripeInstance
  }
  
  const secretKey = getEnv('STRIPE_SECRET_KEY')
  
  if (!secretKey || secretKey === '') {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
  }
  
  stripeInstance = new Stripe(secretKey, {
    apiVersion: '2025-12-15.clover',
    typescript: true,
  })
  
  return stripeInstance
}

// Export singleton for backward compatibility (but initialized lazily)
export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    return (getStripe() as any)[prop]
  }
})
