import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartProvider } from '@/lib/cart-context'
import { AnalyticsProvider } from '@/components/analytics-provider'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'BenchBarrier - Premium Gym Equipment Protection',
  description: 'Clinical-grade protection for elite performance. BenchBarrier delivers precision-engineered gym equipment covers.',
  keywords: 'gym equipment, bench protection, fitness gear, premium gym accessories',
  openGraph: {
    title: 'BenchBarrier - Premium Gym Equipment Protection',
    description: 'Clinical-grade protection for elite performance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BenchBarrier - Premium Gym Equipment Protection',
    description: 'Clinical-grade protection for elite performance.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono bg-stone-950 text-stone-50 antialiased">
        <AnalyticsProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
