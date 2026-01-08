import Link from 'next/link'
import { PixelLogo, ExternalLinkIcon } from '@/components/pixel-icons'
import { PixelBox, BrutalistDivider, PixelSeparator } from '@/components/brutalist-patterns'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-950 border-t-4 border-blue-500 mt-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid-overlay" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3 group">
              <PixelLogo size={32} className="text-blue-500" />
              <div className="flex flex-col">
                <span className="text-blue-500 text-2xl font-bold uppercase tracking-tight leading-none">
                  Bench
                </span>
                <span className="text-stone-50 text-2xl font-bold uppercase tracking-tight leading-none">
                  Barrier
                </span>
              </div>
            </div>

            {/* Pixel Boxes */}
            <div className="flex items-center gap-2">
              <PixelBox size="sm" color="blue" />
              <PixelBox size="sm" color="cyan" className="bg-transparent" />
              <PixelBox size="sm" color="magenta" className="bg-transparent" />
            </div>

            {/* Tagline */}
            <p className="text-stone-400 text-xs uppercase leading-relaxed max-w-xs">
              Clinical-grade protection systems engineered for elite performance and maximum durability
            </p>

            {/* Badge */}
            <div className="inline-block">
              <span className="pixel-badge border-blue-500 text-blue-500 text-xs">
                ■ EST. 2024 ■
              </span>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-stone-50 font-bold uppercase text-sm mb-6 flex items-center gap-2">
              <span className="text-blue-500">■</span> Products
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/products" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=protection" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Protection</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=accessories" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Accessories</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=bundles" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Bundles</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-stone-50 font-bold uppercase text-sm mb-6 flex items-center gap-2">
              <span className="text-blue-500">■</span> Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/student-discount" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Student Discount</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/team-orders" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Team Orders</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-stone-50 font-bold uppercase text-sm mb-6 flex items-center gap-2">
              <span className="text-blue-500">■</span> Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Shipping Policy</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Returns</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <BrutalistDivider thickness="thick" className="my-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-4">
            <p className="text-stone-400 text-xs uppercase">
              © {currentYear} BenchBarrier
            </p>
            <PixelSeparator pattern="dots" className="my-0" />
            <p className="text-stone-600 text-xs uppercase">
              All rights reserved
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-stone-600 text-xs uppercase">Follow:</span>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-10 h-10 border-2 border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:border-blue-500 hover:text-blue-500 transition-all">
                  <span className="text-xs font-bold">IG</span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-brutalist-blue pointer-events-none" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-10 h-10 border-2 border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:border-blue-500 hover:text-blue-500 transition-all">
                  <span className="text-xs font-bold">X</span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-brutalist-blue pointer-events-none" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-10 h-10 border-2 border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:border-blue-500 hover:text-blue-500 transition-all">
                  <span className="text-xs font-bold">FB</span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-brutalist-blue pointer-events-none" />
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t-2 border-stone-800">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="card-brutalist px-4 py-2 text-center">
              <div className="text-blue-500 text-xs font-bold uppercase">■ Secure Checkout</div>
            </div>
            <div className="card-brutalist px-4 py-2 text-center">
              <div className="text-blue-500 text-xs font-bold uppercase">■ Free Shipping</div>
            </div>
            <div className="card-brutalist px-4 py-2 text-center">
              <div className="text-blue-500 text-xs font-bold uppercase">■ 30-Day Returns</div>
            </div>
            <div className="card-brutalist px-4 py-2 text-center">
              <div className="text-blue-500 text-xs font-bold uppercase">■ Lifetime Warranty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-pixel-cyan to-blue-500" />
    </footer>
  )
}
