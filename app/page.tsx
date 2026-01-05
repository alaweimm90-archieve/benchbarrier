import Link from 'next/link'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-stone-950/40" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-stone-50 mb-6">
            Clinical-Grade
            <br />
            <span className="text-blue-500">Protection</span>
          </h1>
          <p className="text-xl md:text-2xl uppercase text-stone-300 mb-8 tracking-tight">
            Precision-engineered equipment covers for elite performance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-brutalist text-lg px-8 py-4">
              Shop Now
            </Link>
            <Link href="/about" className="btn-brutalist-outline text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-brutalist text-center">
              <div className="w-16 h-16 bg-blue-500 border-2 border-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold uppercase text-stone-50 mb-2">
                High-Density Material
              </h3>
              <p className="text-stone-400 text-sm uppercase">
                Industrial-grade protection engineered for maximum durability
              </p>
            </div>
            <div className="card-brutalist text-center">
              <div className="w-16 h-16 bg-blue-500 border-2 border-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold uppercase text-stone-50 mb-2">
                Precision-Cut
              </h3>
              <p className="text-stone-400 text-sm uppercase">
                Exact dimensions for perfect fit on all standard equipment
              </p>
            </div>
            <div className="card-brutalist text-center">
              <div className="w-16 h-16 bg-blue-500 border-2 border-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold uppercase text-stone-50 mb-2">
                Anti-Microbial
              </h3>
              <p className="text-stone-400 text-sm uppercase">
                Advanced coating prevents bacterial growth and odor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-stone-950 to-stone-900" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-stone-950/50" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-6">
            Trusted by
            <br />
            <span className="text-blue-500">Elite Athletes</span>
          </h2>
          <p className="text-lg md:text-xl uppercase text-stone-300 mb-8">
            Professional-grade protection for serious training
          </p>
          <Link href="/products" className="btn-brutalist text-lg px-8 py-4">
            View Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
              Featured Products
            </h2>
            <p className="text-stone-400 uppercase text-sm">
              Premium protection systems for peak performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-brutalist-outline text-lg px-8 py-4">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-900 border-t-2 border-b-2 border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-stone-50 mb-6">
            Student Discount Available
          </h2>
          <p className="text-lg uppercase text-stone-300 mb-8">
            20% off for verified students with .edu email
          </p>
          <Link href="/student-discount" className="btn-brutalist text-lg px-8 py-4">
            Get Student Discount
          </Link>
        </div>
      </section>
    </div>
  )
}
