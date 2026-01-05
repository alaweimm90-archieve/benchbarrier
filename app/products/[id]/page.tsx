import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById, products } from '@/lib/products'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { ProductCard } from '@/components/product-card'
import {
  BrutalistContainer,
  BrutalistSection,
  BrutalistDivider,
  PixelSeparator,
  BrutalistFeatureCard
} from '@/components/brutalist-patterns'
import { CheckIcon, StarIcon, ArrowLeftIcon } from '@/components/pixel-icons'

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | BenchBarrier`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Convert price to cents for consistency
  const priceInCents = Math.round(product.price * 100)

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Breadcrumb */}
      <BrutalistSection className="py-6 border-b-2 border-stone-800">
        <BrutalistContainer>
          <div className="flex items-center gap-2 text-sm uppercase">
            <Link href="/" className="text-stone-400 hover:text-blue-500 transition-colors">
              Home
            </Link>
            <span className="text-stone-600">■</span>
            <Link href="/products" className="text-stone-400 hover:text-blue-500 transition-colors">
              Products
            </Link>
            <span className="text-stone-600">■</span>
            <span className="text-stone-50 font-bold">{product.name}</span>
          </div>
        </BrutalistContainer>
      </BrutalistSection>

      {/* Product Details */}
      <BrutalistSection className="py-16">
        <BrutalistContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="relative aspect-square bg-stone-900 border-4 border-stone-800 overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-stone-950/80 flex items-center justify-center">
                    <span className="pixel-badge bg-red-500 text-stone-950 border-red-500 text-lg">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="card-brutalist p-4 text-center">
                  <CheckIcon size={24} className="text-blue-500 mx-auto mb-2" />
                  <p className="text-xs uppercase text-stone-400">Free Shipping</p>
                  <p className="text-xs text-stone-500">Over $100</p>
                </div>
                <div className="card-brutalist p-4 text-center">
                  <CheckIcon size={24} className="text-blue-500 mx-auto mb-2" />
                  <p className="text-xs uppercase text-stone-400">30-Day Return</p>
                  <p className="text-xs text-stone-500">Money Back</p>
                </div>
                <div className="card-brutalist p-4 text-center">
                  <CheckIcon size={24} className="text-blue-500 mx-auto mb-2" />
                  <p className="text-xs uppercase text-stone-400">Warranty</p>
                  <p className="text-xs text-stone-500">1 Year</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div>
                <span className="pixel-badge border-blue-500 text-blue-500 text-xs">
                  ■ {product.category.toUpperCase()} ■
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-stone-50">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={16} filled className="text-blue-500" />
                  ))}
                </div>
                <span className="text-stone-400 text-sm">(127 reviews)</span>
              </div>

              <PixelSeparator pattern="dashes" />

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-blue-500">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-stone-400 text-sm uppercase">USD</span>
              </div>

              {/* Description */}
              <p className="text-lg text-stone-300 leading-relaxed">
                {product.description}
              </p>

              <BrutalistDivider thickness="thin" />

              {/* Features */}
              <div>
                <h3 className="text-lg font-bold uppercase text-stone-50 mb-4">
                  Key Features
                </h3>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-stone-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <BrutalistDivider thickness="thin" />

              {/* Add to Cart */}
              <div className="space-y-4">
                <AddToCartButton
                  product={{
                    ...product,
                    price: priceInCents
                  }}
                  className="w-full"
                />

                {/* Stock Status */}
                <div className="flex items-center gap-2 text-sm">
                  {product.inStock ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 animate-pulse" />
                      <span className="text-green-500 uppercase font-bold">In Stock</span>
                      <span className="text-stone-500">- Ships within 24 hours</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500" />
                      <span className="text-red-500 uppercase font-bold">Out of Stock</span>
                      <span className="text-stone-500">- Notify when available</span>
                    </>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="card-brutalist p-6 bg-stone-900">
                <h4 className="font-bold uppercase text-stone-50 mb-4 text-sm">
                  Product Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-400">SKU:</span>
                    <span className="text-stone-50 font-mono">{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Category:</span>
                    <span className="text-stone-50 capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Material:</span>
                    <span className="text-stone-50">High-Density Polymer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Care:</span>
                    <span className="text-stone-50">Machine Washable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BrutalistContainer>
      </BrutalistSection>

      {/* Specifications Section */}
      <BrutalistSection className="py-16 bg-stone-900 border-t-2 border-stone-800">
        <BrutalistContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
              Technical
              <br />
              <span className="text-blue-500">Specifications</span>
            </h2>
            <BrutalistDivider thickness="thick" className="max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BrutalistFeatureCard
              icon={<CheckIcon size={32} className="text-blue-500" />}
              title="Dimensions"
              description="Standard: 48 x 18 x 2 inches | Universal fit for most equipment"
            />
            <BrutalistFeatureCard
              icon={<CheckIcon size={32} className="text-blue-500" />}
              title="Material"
              description="Medical-grade antimicrobial polymer | FDA approved | BPA-free"
            />
            <BrutalistFeatureCard
              icon={<CheckIcon size={32} className="text-blue-500" />}
              title="Durability"
              description="Rated for 10,000+ uses | 5-year warranty | Commercial grade"
            />
          </div>
        </BrutalistContainer>
      </BrutalistSection>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <BrutalistSection className="py-16">
          <BrutalistContainer>
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="pixel-badge-primary">
                  ■ RELATED ■
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-stone-50 mb-4">
                You May Also
                <br />
                <span className="text-blue-500">Like</span>
              </h2>
              <BrutalistDivider thickness="thick" className="max-w-xs mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={{
                    ...relatedProduct,
                    price: Math.round(relatedProduct.price * 100)
                  }}
                />
              ))}
            </div>
          </BrutalistContainer>
        </BrutalistSection>
      )}

      {/* Back to Products */}
      <BrutalistSection className="py-8 border-t-2 border-stone-800">
        <BrutalistContainer>
          <Link
            href="/products"
            className="btn-brutalist-outline inline-flex items-center gap-2"
          >
            <ArrowLeftIcon size={16} />
            Back to Products
          </Link>
        </BrutalistContainer>
      </BrutalistSection>
    </div>
  )
}
