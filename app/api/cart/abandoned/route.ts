import { NextRequest, NextResponse } from 'next/server'
import {
  trackCart,
  updateCart,
  markCartAsRecovered,
  getAbandonedCartStats,
} from '@/lib/cart/abandoned-cart'

// POST /api/cart/abandoned - Track abandoned cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, items, action } = body

    if (!email || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Email and items are required' },
        { status: 400 }
      )
    }

    if (action === 'update') {
      const cart = updateCart(email, items)
      return NextResponse.json({ cart })
    }

    if (action === 'recovered') {
      markCartAsRecovered(email)
      return NextResponse.json({ success: true })
    }

    const cart = trackCart(email, name || 'Customer', items)
    return NextResponse.json({ cart })
  } catch (error: any) {
    console.error('Failed to track abandoned cart:', error)
    return NextResponse.json(
      { error: 'Failed to track cart' },
      { status: 500 }
    )
  }
}

// GET /api/cart/abandoned - Get abandoned cart statistics
export async function GET() {
  try {
    const stats = getAbandonedCartStats()
    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error('Failed to get abandoned cart stats:', error)
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    )
  }
}
