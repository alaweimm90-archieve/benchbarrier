'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { Product } from '@/lib/products'
import { CartIcon, CheckIcon } from '@/components/pixel-icons'

interface AddToCartButtonProps {
  product: Product & { price: number } // price in cents
  className?: string
}

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={!product.inStock}
      className={`btn-brutalist py-4 text-lg relative overflow-hidden group ${className} ${
        !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <span className="flex items-center justify-center gap-3 relative z-10">
        {isAdded ? (
          <>
            <CheckIcon size={24} className="animate-pixel-blink" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <CartIcon size={24} />
            <span>Add to Cart</span>
            <span className="text-2xl">■</span>
          </>
        )}
      </span>
      
      {/* Success animation overlay */}
      {isAdded && (
        <div className="absolute inset-0 bg-green-500 animate-slide-in-up" />
      )}
    </button>
  )
}
