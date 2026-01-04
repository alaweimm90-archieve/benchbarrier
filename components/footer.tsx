import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-950 border-t-2 border-stone-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 w-8 h-8 border-2 border-blue-500" />
              <div className="bg-stone-950 w-8 h-8 border-2 border-blue-500" />
            </div>
            <h3 className="text-blue-500 text-lg font-bold uppercase tracking-tight">
              BenchBarrier
            </h3>
            <p className="text-stone-400 text-xs uppercase">
              Clinical-grade protection for elite performance
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-stone-50 font-bold uppercase text-sm mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=protection" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Protection
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=bundles" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-stone-50 font-bold uppercase text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/student-discount" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Student Discount
                </Link>
              </li>
              <li>
                <Link href="/team-orders" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Team Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-stone-50 font-bold uppercase text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-2 border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-400 text-xs uppercase">
              © {currentYear} BenchBarrier. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-blue-500 text-xs uppercase transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
