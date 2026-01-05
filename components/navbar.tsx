'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { CartIcon, MenuIcon, CloseIcon, PixelLogo } from '@/components/pixel-icons'
import { CartDrawer } from '@/components/cart-drawer'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav 
      className={`bg-stone-950 border-b-2 border-stone-800 sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'shadow-brutalist-lg border-b-blue-500' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Pixel Icon */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative">
              <PixelLogo size={32} className="text-blue-500 group-hover:text-stone-50 transition-colors" />
              <div className="absolute -inset-1 border-2 border-transparent group-hover:border-blue-500 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-blue-500 text-xl font-bold uppercase tracking-tight leading-none group-hover:text-stone-50 transition-colors">
                Bench
              </span>
              <span className="text-stone-50 text-xl font-bold uppercase tracking-tight leading-none group-hover:text-blue-500 transition-colors">
                Barrier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/products"
              className="relative px-4 py-2 text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors group"
            >
              <span className="relative z-10">Products</span>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 transition-colors" />
            </Link>
            <Link
              href="/student-discount"
              className="relative px-4 py-2 text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors group"
            >
              <span className="relative z-10">Student</span>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 transition-colors" />
            </Link>
            <Link
              href="/team-orders"
              className="relative px-4 py-2 text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors group"
            >
              <span className="relative z-10">Teams</span>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 transition-colors" />
            </Link>
            <Link
              href="/about"
              className="relative px-4 py-2 text-stone-50 hover:text-blue-500 uppercase text-sm font-bold transition-colors group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 transition-colors" />
            </Link>
            
            {/* Cart Button with Pixel Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative ml-4 px-4 py-2 bg-blue-500 text-stone-950 hover:bg-stone-950 hover:text-blue-500 border-2 border-blue-500 uppercase text-sm font-bold transition-all duration-200 group"
            >
              <span className="flex items-center gap-2">
                <CartIcon size={16} />
                <span>Cart</span>
              </span>
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pixel-red text-stone-950 text-xs font-bold px-2 py-1 border-2 border-pixel-red min-w-[24px] text-center animate-pixel-blink">
                  {cartCount}
                </span>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-brutalist-blue pointer-events-none" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative p-2 text-stone-50 hover:text-blue-500 focus:outline-none border-2 border-transparent hover:border-blue-500 transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <CloseIcon size={24} />
            ) : (
              <MenuIcon size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-stone-900 border-t-2 border-stone-800 animate-slide-in-down">
          <div className="px-4 py-6 space-y-1">
            <Link
              href="/products"
              onClick={closeMenu}
              className="block px-4 py-3 text-stone-50 hover:text-blue-500 hover:bg-stone-950 uppercase text-sm font-bold transition-all border-2 border-transparent hover:border-blue-500"
            >
              <span className="flex items-center gap-2">
                <span className="text-blue-500">■</span> Products
              </span>
            </Link>
            <Link
              href="/student-discount"
              onClick={closeMenu}
              className="block px-4 py-3 text-stone-50 hover:text-blue-500 hover:bg-stone-950 uppercase text-sm font-bold transition-all border-2 border-transparent hover:border-blue-500"
            >
              <span className="flex items-center gap-2">
                <span className="text-blue-500">■</span> Student Discount
              </span>
            </Link>
            <Link
              href="/team-orders"
              onClick={closeMenu}
              className="block px-4 py-3 text-stone-50 hover:text-blue-500 hover:bg-stone-950 uppercase text-sm font-bold transition-all border-2 border-transparent hover:border-blue-500"
            >
              <span className="flex items-center gap-2">
                <span className="text-blue-500">■</span> Team Orders
              </span>
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="block px-4 py-3 text-stone-50 hover:text-blue-500 hover:bg-stone-950 uppercase text-sm font-bold transition-all border-2 border-transparent hover:border-blue-500"
            >
              <span className="flex items-center gap-2">
                <span className="text-blue-500">■</span> About
              </span>
            </Link>
            
            {/* Mobile Cart */}
            <div className="pt-4 border-t-2 border-stone-800 mt-4">
              <button
                onClick={() => {
                  closeMenu()
                  setIsCartOpen(true)
                }}
                className="block w-full px-4 py-3 bg-blue-500 text-stone-950 hover:bg-stone-950 hover:text-blue-500 border-2 border-blue-500 uppercase text-sm font-bold transition-all text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <CartIcon size={16} />
                  <span>Cart</span>
                  {isMounted && cartCount > 0 && (
                    <span className="bg-stone-950 text-blue-500 px-2 py-1 border-2 border-stone-950 text-xs">
                      ({cartCount})
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Accent Line */}
      <div className={`h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-opacity duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
}
