'use client'

import { useState } from 'react'
import { products, Product } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all')

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-stone-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
            Products
          </h1>
          <p className="text-stone-400 uppercase text-sm">
            Clinical-grade protection systems for elite performance
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 border-2 uppercase font-bold text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-stone-950 border-blue-500'
                : 'bg-transparent text-stone-50 border-stone-800 hover:border-blue-500 hover:text-blue-500'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setSelectedCategory('protection')}
            className={`px-6 py-3 border-2 uppercase font-bold text-sm transition-colors ${
              selectedCategory === 'protection'
                ? 'bg-blue-500 text-stone-950 border-blue-500'
                : 'bg-transparent text-stone-50 border-stone-800 hover:border-blue-500 hover:text-blue-500'
            }`}
          >
            Protection
          </button>
          <button
            onClick={() => setSelectedCategory('accessories')}
            className={`px-6 py-3 border-2 uppercase font-bold text-sm transition-colors ${
              selectedCategory === 'accessories'
                ? 'bg-blue-500 text-stone-950 border-blue-500'
                : 'bg-transparent text-stone-50 border-stone-800 hover:border-blue-500 hover:text-blue-500'
            }`}
          >
            Accessories
          </button>
          <button
            onClick={() => setSelectedCategory('bundles')}
            className={`px-6 py-3 border-2 uppercase font-bold text-sm transition-colors ${
              selectedCategory === 'bundles'
                ? 'bg-blue-500 text-stone-950 border-blue-500'
                : 'bg-transparent text-stone-50 border-stone-800 hover:border-blue-500 hover:text-blue-500'
            }`}
          >
            Bundles
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-400 uppercase text-sm">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
