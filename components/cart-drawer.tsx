'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { CloseIcon, CartIcon, PlusIcon, MinusIcon, TrashIcon } from '@/components/pixel-icons'
import { BrutalistDivider } from '@/components/brutalist-patterns'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isMounted) return null

  const tax = cartTotal * 0.08
  const shipping = cartTotal > 10000 ? 0 : 1500 // Free shipping over $100
  const total = cartTotal + tax + shipping

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-stone-950 border-l-4 border-blue-500 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-stone-800">
            <div className="flex items-center gap-3">
              <CartIcon size={24} className="text-blue-500" />
              <h2 className="text-2xl font-bold uppercase text-stone-50">
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 text-blue-500">({cartCount})</span>
                )}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-blue-500 border-2 border-transparent hover:border-blue-500 transition-all"
              aria-label="Close cart"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-6">
                  <CartIcon size={32} className="text-stone-700" />
                </div>
                <h3 className="text-xl font-bold uppercase text-stone-400 mb-2">
                  Cart Empty
                </h3>
                <p className="text-stone-500 uppercase text-sm mb-6">
                  Add products to get started
                </p>
                <button
                  onClick={onClose}
                  className="btn-brutalist px-6 py-3"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="card-brutalist p-4 hover:shadow-brutalist-blue transition-all"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-stone-900 border-2 border-stone-800 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold uppercase text-stone-50 text-sm mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-blue-500 font-bold text-lg mb-2">
                          ${(item.price / 100).toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 bg-stone-900 hover:bg-blue-500 border-2 border-stone-800 hover:border-blue-500 text-stone-50 transition-all"
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon size={16} />
                          </button>
                          <span className="px-3 py-1 bg-stone-900 border-2 border-stone-800 text-stone-50 font-bold text-sm min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-stone-900 hover:bg-blue-500 border-2 border-stone-800 hover:border-blue-500 text-stone-50 transition-all"
                            aria-label="Increase quantity"
                          >
                            <PlusIcon size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 bg-stone-900 hover:bg-red-500 border-2 border-stone-800 hover:border-red-500 text-stone-50 transition-all"
                            aria-label="Remove item"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-stone-400 text-xs uppercase mb-1">Total</p>
                        <p className="font-bold text-stone-50">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Totals */}
          {cart.length > 0 && (
            <div className="border-t-2 border-stone-800 p-6 bg-stone-900">
              {/* Subtotal */}
              <div className="space-y-2 mb-4">
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
              <div className="flex justify-between items-center mb-6 mt-4">
                <span className="text-lg font-bold uppercase text-stone-50">Total</span>
                <span className="text-2xl font-bold text-blue-500">
                  ${(total / 100).toFixed(2)}
                </span>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="mb-4 p-3 bg-stone-950 border-2 border-stone-800">
                  <p className="text-xs uppercase text-stone-400 text-center">
                    Add ${((10000 - cartTotal) / 100).toFixed(2)} more for free shipping
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="btn-brutalist w-full text-center py-4 text-lg"
              >
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="btn-brutalist-outline w-full text-center py-3 mt-3"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Mini Cart Preview Component (for hover/quick view)
export function MiniCart() {
  const { cart, cartTotal, cartCount } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || cart.length === 0) return null

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-stone-950 border-2 border-blue-500 shadow-brutalist-blue-lg z-50 animate-slide-in-down">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold uppercase text-stone-50 text-sm">
                Cart Preview
              </h3>
              <span className="text-blue-500 font-bold">{cartCount} items</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-2 p-2 bg-stone-900 border-2 border-stone-800">
                  <div className="relative w-12 h-12 bg-stone-800 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase text-stone-50 truncate font-bold">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-400">
                      {item.quantity} × ${(item.price / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-xs text-center text-stone-400 uppercase">
                  +{cart.length - 3} more items
                </p>
              )}
            </div>

            <BrutalistDivider thickness="thin" />

            <div className="flex justify-between items-center mt-4 mb-4">
              <span className="text-sm uppercase text-stone-400">Subtotal</span>
              <span className="text-lg font-bold text-blue-500">
                ${(cartTotal / 100).toFixed(2)}
              </span>
            </div>

            <Link
              href="/cart"
              className="btn-brutalist w-full text-center py-2 text-sm"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
