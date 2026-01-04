export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
            About BenchBarrier
          </h1>
          <p className="text-stone-400 uppercase text-sm">
            Clinical-grade protection engineered for elite performance
          </p>
        </div>

        {/* Mission */}
        <div className="card-brutalist mb-8">
          <h2 className="text-2xl font-bold uppercase text-blue-500 mb-4">
            Our Mission
          </h2>
          <p className="text-stone-400 uppercase text-sm leading-relaxed">
            To deliver precision-engineered equipment protection that meets the demands
            of serious athletes and fitness professionals. We believe in technical
            excellence, uncompromising quality, and performance-driven design.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card-brutalist">
            <h3 className="text-xl font-bold uppercase text-stone-50 mb-3">
              Precision Engineering
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              Every product is designed with exact specifications and manufactured
              to exacting standards. No compromises.
            </p>
          </div>

          <div className="card-brutalist">
            <h3 className="text-xl font-bold uppercase text-stone-50 mb-3">
              Clinical Standards
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              We apply medical-grade material science to fitness equipment protection.
              Tested, verified, certified.
            </p>
          </div>

          <div className="card-brutalist">
            <h3 className="text-xl font-bold uppercase text-stone-50 mb-3">
              Performance Focus
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              Built for athletes who demand the best. Our products enhance your
              training environment and protect your investment.
            </p>
          </div>

          <div className="card-brutalist">
            <h3 className="text-xl font-bold uppercase text-stone-50 mb-3">
              Sustainable Quality
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              Durable materials, long-lasting construction, and responsible
              manufacturing. Quality that endures.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="card-brutalist mb-8">
          <h2 className="text-2xl font-bold uppercase text-blue-500 mb-4">
            The Story
          </h2>
          <div className="space-y-4 text-stone-400 uppercase text-sm leading-relaxed">
            <p>
              BenchBarrier was founded by competitive athletes frustrated with
              inadequate gym equipment protection. Existing solutions were either
              too flimsy, poorly designed, or simply didn't work.
            </p>
            <p>
              We set out to create something better. Using advanced materials science
              and precision manufacturing, we developed a protection system that
              actually performs under real-world conditions.
            </p>
            <p>
              Today, BenchBarrier is trusted by elite athletes, professional gyms,
              and fitness enthusiasts who refuse to settle for mediocrity.
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="card-brutalist mb-8">
          <h2 className="text-2xl font-bold uppercase text-blue-500 mb-4">
            Technical Specifications
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b-2 border-stone-800 pb-3">
              <span className="text-stone-400 uppercase text-sm">Material Density</span>
              <span className="text-stone-50 font-bold uppercase text-sm">High-Grade Polymer</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-stone-800 pb-3">
              <span className="text-stone-400 uppercase text-sm">Thickness</span>
              <span className="text-stone-50 font-bold uppercase text-sm">3.5mm Precision-Cut</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-stone-800 pb-3">
              <span className="text-stone-400 uppercase text-sm">Anti-Slip Rating</span>
              <span className="text-stone-50 font-bold uppercase text-sm">Class A Certified</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-stone-800 pb-3">
              <span className="text-stone-400 uppercase text-sm">Temperature Range</span>
              <span className="text-stone-50 font-bold uppercase text-sm">-20°C to 80°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-400 uppercase text-sm">Warranty</span>
              <span className="text-stone-50 font-bold uppercase text-sm">Lifetime Guarantee</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="/products" className="btn-brutalist text-lg px-8 py-4">
            Shop Products
          </a>
        </div>
      </div>
    </div>
  )
}
