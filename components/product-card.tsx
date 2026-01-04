'use client'

import Image from 'next/image'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="card-brutalist group">
      {/* Product Image */}
      <div className="relative aspect-square bg-stone-800 border-2 border-stone-700 mb-4 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-stone-950/80 flex items-center justify-center">
            <span className="text-blue-500 font-bold uppercase text-sm border-2 border-blue-500 px-4 py-2">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-stone-50 font-bold uppercase text-lg tracking-tight">
            {product.name}
          </h3>
          <p className="text-stone-400 text-xs uppercase mt-1">
            {product.description}
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <li key={index} className="text-stone-500 text-xs uppercase flex items-start">
              <span className="text-blue-500 mr-2">▪</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-stone-800">
          <span className="text-blue-500 font-bold text-xl uppercase">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="btn-brutalist text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
