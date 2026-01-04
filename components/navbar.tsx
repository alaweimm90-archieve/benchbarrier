'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-stone-950 border-b-2 border-stone-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-blue-500 text-xl font-bold uppercase tracking-tight">
              BenchBarrier
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Products
            </Link>
            <Link
              href="/student-discount"
              className="text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Student Discount
            </Link>
            <Link
              href="/team-orders"
              className="text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Team Orders
            </Link>
            <Link
              href="/about"
              className="text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              About
            </Link>
            <Link
              href="/cart"
              className="relative text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Cart
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-stone-950 text-xs font-bold px-2 py-1 border-2 border-blue-500">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-stone-50 hover:text-blue-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-current transition-transform ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-opacity ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-stone-900 border-t-2 border-stone-800">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/products"
              onClick={closeMenu}
              className="block text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Products
            </Link>
            <Link
              href="/student-discount"
              onClick={closeMenu}
              className="block text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Student Discount
            </Link>
            <Link
              href="/team-orders"
              onClick={closeMenu}
              className="block text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Team Orders
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              About
            </Link>
            <Link
              href="/cart"
              onClick={closeMenu}
              className="block text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors"
            >
              Cart {isMounted && cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
