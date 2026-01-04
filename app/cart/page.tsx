'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { createCheckoutSession } from '@/app/actions/stripe'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (cart.length === 0) return

    setIsLoading(true)
    try {
      const { url } = await createCheckoutSession(cart)
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to initiate checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-stone-400 uppercase text-sm mb-8">
              Add some products to get started
            </p>
            <Link href="/products" className="btn-brutalist text-lg px-8 py-4">
              Shop Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
            Shopping Cart
          </h1>
          <p className="text-stone-400 uppercase text-sm">
            {cartCount} {cartCount === 1 ? 'Item' : 'Items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="card-brutalist">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-stone-800 border-2 border-stone-700 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-stone-50 font-bold uppercase text-lg truncate">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-xs uppercase mt-1">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border-2 border-stone-800">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-stone-50 hover:bg-stone-800 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-stone-50 font-bold border-x-2 border-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-stone-50 hover:bg-stone-800 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-blue-500 uppercase text-xs font-bold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-blue-500 font-bold text-xl uppercase">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-brutalist sticky top-20">
              <h2 className="text-2xl font-bold uppercase text-stone-50 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-stone-400 uppercase text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400 uppercase text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t-2 border-stone-800 pt-4">
                  <div className="flex justify-between text-stone-50 font-bold uppercase text-lg">
                    <span>Total</span>
                    <span className="text-blue-500">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full btn-brutalist text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <Link
                href="/products"
                className="block text-center text-stone-400 hover:text-blue-500 uppercase text-xs font-bold mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
