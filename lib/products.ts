export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'protection' | 'accessories' | 'bundles'
  features: string[]
  inStock: boolean
  stripePriceId?: string
}

export const products: Product[] = [
  {
    id: 'bb-standard',
    name: 'BenchBarrier Standard',
    description: 'Clinical-grade bench protection. Precision-cut, high-density material.',
    price: 29.99,
    image: '/media/benchbarrier-standard.jpg',
    category: 'protection',
    features: [
      'High-density protective material',
      'Precision-cut dimensions',
      'Anti-slip backing',
      'Machine washable',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_BB_STANDARD,
  },
  {
    id: 'bb-premium',
    name: 'BenchBarrier Premium',
    description: 'Elite-tier protection with reinforced edges. Maximum durability.',
    price: 49.99,
    image: '/media/benchbarrier-premium.jpg',
    category: 'protection',
    features: [
      'Reinforced edge construction',
      'Extended coverage area',
      'Premium anti-microbial coating',
      'Lifetime warranty',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_BB_PREMIUM,
  },
  {
    id: 'gym-towel-set',
    name: 'Gym Towel Set',
    description: 'Technical microfiber towels. Rapid absorption, zero lint.',
    price: 24.99,
    image: '/media/gym-towel-set.jpg',
    category: 'accessories',
    features: [
      'Set of 3 microfiber towels',
      'Ultra-absorbent material',
      'Compact and lightweight',
      'Quick-dry technology',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_TOWEL_SET,
  },
  {
    id: 'gym-bag-bundle',
    name: 'Gym Bag Bundle',
    description: 'Complete protection kit. BenchBarrier + premium carry bag.',
    price: 69.99,
    image: '/media/gym-bag-bundle.jpg',
    category: 'bundles',
    features: [
      'BenchBarrier Standard included',
      'Durable gym bag',
      'Multiple compartments',
      'Water-resistant exterior',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_GYM_BUNDLE,
  },
  {
    id: 'bb-pro-pack',
    name: 'BenchBarrier Pro Pack',
    description: 'Professional-grade 3-pack. Bulk protection for serious athletes.',
    price: 79.99,
    image: '/media/benchbarrier-pro-pack.jpg',
    category: 'bundles',
    features: [
      '3x BenchBarrier Standard',
      'Bulk discount applied',
      'Storage bag included',
      'Perfect for teams',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_PRO_PACK,
  },
  {
    id: 'grip-enhancer',
    name: 'Grip Enhancer Spray',
    description: 'Technical grip solution. Non-slip, residue-free formula.',
    price: 14.99,
    image: '/media/grip-enhancer.jpg',
    category: 'accessories',
    features: [
      '4oz spray bottle',
      'Non-toxic formula',
      'Long-lasting grip',
      'Quick-dry application',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_GRIP_SPRAY,
  },
  {
    id: 'equipment-cleaner',
    name: 'Equipment Cleaner Kit',
    description: 'Industrial-strength cleaning system. Sanitize and protect.',
    price: 19.99,
    image: '/media/equipment-cleaner.jpg',
    category: 'accessories',
    features: [
      '16oz cleaning solution',
      'Microfiber cloth included',
      'Anti-bacterial formula',
      'Safe for all surfaces',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_CLEANER_KIT,
  },
  {
    id: 'elite-bundle',
    name: 'Elite Complete Bundle',
    description: 'Ultimate protection system. Everything you need for peak performance.',
    price: 129.99,
    image: '/media/elite-bundle.jpg',
    category: 'bundles',
    features: [
      'BenchBarrier Premium',
      'Gym Towel Set',
      'Equipment Cleaner Kit',
      'Grip Enhancer Spray',
      'Premium gym bag',
    ],
    inStock: true,
    stripePriceId: process.env.STRIPE_PRICE_ELITE_BUNDLE,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}
