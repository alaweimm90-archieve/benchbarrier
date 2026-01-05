import Link from 'next/link'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { 
  PixelGrid, 
  Scanlines, 
  BrutalistContainer, 
  BrutalistSection,
  PixelBox,
  BrutalistDivider,
  PixelSeparator,
  BrutalistFeatureCard,
  PixelStat
} from '@/components/brutalist-patterns'
import { CheckIcon, StarIcon, LockIcon } from '@/components/pixel-icons'

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section with Pixel Grid */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Grid */}
        <PixelGrid className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
        </PixelGrid>
        
        {/* Scanline Effect */}
        <Scanlines className="absolute inset-0" />

        {/* Decorative Pixel Boxes */}
        <div className="absolute top-20 left-10 animate-pulse-border">
          <PixelBox size="md" color="blue" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse-border" style={{ animationDelay: '1s' }}>
          <PixelBox size="lg" color="cyan" />
        </div>
        <div className="absolute top-1/3 right-20 animate-pulse-border" style={{ animationDelay: '0.5s' }}>
          <PixelBox size="sm" color="magenta" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Pixel Badge */}
          <div className="inline-block mb-6">
            <span className="pixel-badge-primary animate-pixel-blink">
              ■ CLINICAL GRADE ■
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-stone-50 mb-6 animate-fade-in">
            BENCH
            <span className="text-blue-500 inline-block animate-glitch" data-text="BARRIER">
              BARRIER
            </span>
          </h1>

          <PixelSeparator pattern="squares" className="my-8" />

          <p className="text-xl md:text-3xl uppercase text-stone-300 mb-8 tracking-tight font-bold animate-slide-in-up">
            Precision-engineered equipment covers
            <br />
            <span className="text-blue-500">for elite performance</span>
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <PixelStat label="Products" value="8" color="blue" />
            <PixelStat label="Protection" value="100" unit="%" color="green" />
            <PixelStat label="Quality" value="A+" color="yellow" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/products" className="btn-brutalist text-lg px-8 py-4 inline-flex items-center gap-2">
              <span>■</span> Shop Now <span>■</span>
            </Link>
            <Link href="/about" className="btn-brutalist-outline text-lg px-8 py-4 inline-flex items-center gap-2">
              <span>□</span> Learn More <span>□</span>
            </Link>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-500" />
      </section>

      {/* Features Section with Brutalist Cards */}
      <BrutalistSection className="bg-stone-950">
        <BrutalistContainer>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="pixel-badge bg-stone-900 border-blue-500 text-blue-500">
                ■ FEATURES ■
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
              Engineering
              <br />
              <span className="text-blue-500">Excellence</span>
            </h2>
            <BrutalistDivider thickness="thick" className="max-w-xs mx-auto" />
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BrutalistFeatureCard
              icon={<PixelBox size="lg" color="blue" />}
              title="High-Density Material"
              description="Industrial-grade protection engineered for maximum durability and longevity"
              className="hover:shadow-brutalist-blue-lg transition-all duration-200"
            />
            <BrutalistFeatureCard
              icon={<CheckIcon size={32} className="text-blue-500" />}
              title="Precision-Cut"
              description="Exact dimensions for perfect fit on all standard equipment types"
              className="hover:shadow-brutalist-blue-lg transition-all duration-200"
            />
            <BrutalistFeatureCard
              icon={<LockIcon size={32} className="text-blue-500" />}
              title="Anti-Microbial"
              description="Advanced coating prevents bacterial growth and eliminates odor"
              className="hover:shadow-brutalist-blue-lg transition-all duration-200"
            />
          </div>

          {/* Additional Features Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card-brutalist text-center p-4">
              <div className="text-3xl font-bold text-blue-500 mb-2">■</div>
              <div className="text-xs uppercase text-stone-400">Waterproof</div>
            </div>
            <div className="card-brutalist text-center p-4">
              <div className="text-3xl font-bold text-blue-500 mb-2">■</div>
              <div className="text-xs uppercase text-stone-400">Easy Clean</div>
            </div>
            <div className="card-brutalist text-center p-4">
              <div className="text-3xl font-bold text-blue-500 mb-2">■</div>
              <div className="text-xs uppercase text-stone-400">Non-Slip</div>
            </div>
            <div className="card-brutalist text-center p-4">
              <div className="text-3xl font-bold text-blue-500 mb-2">■</div>
              <div className="text-xs uppercase text-stone-400">Eco-Friendly</div>
            </div>
          </div>
        </BrutalistContainer>
      </BrutalistSection>

      {/* Demo Section with Pixel Effects */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-t-2 border-stone-800">
        {/* Background with Dither Pattern */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-stone-950 to-stone-900" />
        <div className="absolute inset-0 dither-pattern opacity-20" />
        
        {/* Scanlines */}
        <Scanlines className="absolute inset-0" />

        {/* Decorative Elements */}
        <div className="absolute top-10 left-1/4 w-32 h-32 border-4 border-blue-500 opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-24 h-24 border-4 border-pixel-cyan opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <span className="pixel-badge bg-blue-500 text-stone-950 border-blue-500">
              ■ TRUSTED BY PROFESSIONALS ■
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-stone-50 mb-6">
            Elite
            <br />
            <span className="text-blue-500">Athletes</span>
          </h2>

          <PixelSeparator pattern="dashes" />

          <p className="text-lg md:text-2xl uppercase text-stone-300 mb-8 max-w-2xl mx-auto">
            Professional-grade protection for serious training environments
          </p>

          {/* Trust Indicators */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <StarIcon size={24} filled className="text-blue-500" />
              <StarIcon size={24} filled className="text-blue-500" />
              <StarIcon size={24} filled className="text-blue-500" />
              <StarIcon size={24} filled className="text-blue-500" />
              <StarIcon size={24} filled className="text-blue-500" />
            </div>
          </div>

          <Link href="/products" className="btn-brutalist text-lg px-8 py-4 inline-flex items-center gap-2">
            View Products <span className="text-2xl">→</span>
          </Link>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </section>

      {/* Featured Products Section */}
      <BrutalistSection className="bg-stone-950">
        <BrutalistContainer>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="pixel-badge-primary">
                ■ CATALOG ■
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
              Featured
              <br />
              <span className="text-blue-500">Products</span>
            </h2>
            <p className="text-stone-400 uppercase text-sm max-w-2xl mx-auto mt-4">
              Premium protection systems engineered for peak performance and maximum durability
            </p>
            <BrutalistDivider thickness="thick" className="max-w-xs mx-auto mt-6" />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <PixelSeparator pattern="dots" />
            <Link href="/products" className="btn-brutalist-outline text-lg px-8 py-4 inline-flex items-center gap-3">
              <span>□</span>
              View All Products
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </BrutalistContainer>
      </BrutalistSection>

      {/* CTA Section - Student Discount */}
      <section className="relative py-24 bg-stone-900 border-t-4 border-b-4 border-blue-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 checkerboard opacity-10" />
        <PixelGrid className="absolute inset-0 opacity-20" />

        <BrutalistContainer>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500" />

            <div className="py-12">
              <div className="inline-block mb-6">
                <span className="pixel-badge bg-blue-500 text-stone-950 border-blue-500 text-lg px-6 py-2">
                  ■ SPECIAL OFFER ■
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-6">
                Student
                <br />
                <span className="text-blue-500">Discount</span>
              </h2>

              <PixelSeparator pattern="squares" />

              <p className="text-lg md:text-2xl uppercase text-stone-300 mb-4 font-bold">
                20% off for verified students
              </p>
              <p className="text-sm uppercase text-stone-400 mb-8">
                Valid .edu email required
              </p>

              <Link href="/student-discount" className="btn-brutalist text-lg px-8 py-4 inline-flex items-center gap-2">
                <span>■</span> Get Student Discount <span>■</span>
              </Link>
            </div>
          </div>
        </BrutalistContainer>
      </section>

      {/* Final CTA - Team Orders */}
      <BrutalistSection className="bg-stone-950">
        <BrutalistContainer>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="pixel-badge border-blue-500 text-blue-500">
                ■ BULK ORDERS ■
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-stone-50 mb-6">
              Team Orders
              <br />
              <span className="text-blue-500">Available</span>
            </h2>

            <p className="text-base md:text-lg uppercase text-stone-400 mb-8">
              Custom pricing for gyms, schools, and training facilities
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/team-orders" className="btn-brutalist-outline px-6 py-3">
                Learn More
              </Link>
              <Link href="/contact" className="btn-brutalist px-6 py-3">
                Contact Sales
              </Link>
            </div>
          </div>
        </BrutalistContainer>
      </BrutalistSection>
    </div>
  )
}
