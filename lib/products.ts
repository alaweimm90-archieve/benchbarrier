export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'protection' | 'accessories' | 'bundles'
  features: string[]
  inStock: boolean
  stripeProductId: string
}

export const products: Product[] = [
  {
    id: 'bb_bench_cover_pro',
    name: 'Bench Cover Pro',
    description: 'Premium waterproof bench cover with antimicrobial protection',
    price: 49.99,
    image: '/media/bench-barrier-product-shot.svg',
    category: 'protection',
    features: [
      'Waterproof construction',
      'Antimicrobial protection',
      'Premium materials',
      'Easy to clean',
    ],
    inStock: true,
    stripeProductId: 'prod_TjQzKdRKzHKZHE',
  },
  {
    id: 'bb_bench_cover_standard',
    name: 'Standard Bench Cover',
    description: 'Reliable everyday bench protection for gym equipment',
    price: 34.99,
    image: '/media/benchbarrier-standard.svg',
    category: 'protection',
    features: [
      'Durable construction',
      'Anti-slip backing',
      'Machine washable',
      'Perfect for daily use',
    ],
    inStock: true,
    stripeProductId: 'prod_TjQzVakXR16wzn',
  },
  {
    id: 'bb_mat_protector_elite',
    name: 'Elite Mat Protector',
    description: 'Industrial-grade heavy-duty mat protection',
    price: 79.99,
    image: '/media/mat-protector-elite.svg',
    category: 'protection',
    features: [
      'Heavy-duty construction',
      'Industrial-grade materials',
      'Non-slip surface',
      'Extended durability',
    ],
    inStock: true,
    stripeProductId: 'prod_TjR0zg0mMVhkjK',
  },
  {
    id: 'bb_mat_protector_quick_clean',
    name: 'Quick-Clean Mat Shield',
    description: 'Fast-dry surface for high-traffic areas',
    price: 59.99,
    image: '/media/mat-shield-quick-clean.svg',
    category: 'protection',
    features: [
      'Quick-dry technology',
      'Easy to clean',
      'High-traffic rated',
      'Stain resistant',
    ],
    inStock: true,
    stripeProductId: 'prod_TjR03Oqbrt0uVm',
  },
  {
    id: 'bb_towel_set_portable',
    name: 'Portable Gym Towel Set',
    description: 'Ultra-absorbent microfiber towel 3-pack',
    price: 39.99,
    image: '/media/gym-towel-set.svg',
    category: 'accessories',
    features: [
      'Set of 3 microfiber towels',
      'Ultra-absorbent',
      'Compact and portable',
      'Quick-dry technology',
    ],
    inStock: true,
    stripeProductId: 'prod_TjR1Y1WfDbEOEW',
  },
  {
    id: 'bb_gym_bag_premium',
    name: 'Premium Gym Bag Bundle',
    description: 'Complete protection kit with storage',
    price: 89.99,
    image: '/media/gym-bag-bundle.svg',
    category: 'bundles',
    features: [
      'Premium gym bag',
      'Multiple compartments',
      'Water-resistant',
      'Complete protection kit',
    ],
    inStock: true,
    stripeProductId: 'prod_TjR2fmozAGj7mw',
  },
  {
    id: 'bb_bundle_team_5pack',
    name: 'Team Bundle - 5 Covers',
    description: 'Bulk 5-pack for teams and facilities',
    price: 199.99,
    image: '/media/team-bundle-5pack.svg',
    category: 'bundles',
    features: [
      '5x bench covers',
      'Bulk discount applied',
      'Perfect for teams',
      'Storage bag included',
    ],
    inStock: true,
    stripeProductId: 'prod_TjR27zz2qyZCIt',
  },
  {
    id: 'bb_bundle_protection_premium',
    name: 'Premium Protection Package',
    description: '3 bench covers + 2 mat protectors bundle',
    price: 299.99,
    image: '/media/elite-bundle.svg',
    category: 'bundles',
    features: [
      '3x bench covers',
      '2x mat protectors',
      'Complete protection system',
      'Maximum value',
    ],
    inStock: true,
    stripeProductId: 'prod_TjR3qFxTiFQg7r',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}
