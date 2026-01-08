import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase environment variables are not defined')
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// GET /api/reviews?productId=xxx
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: 'productId is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // Get reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (reviewsError) {
      throw reviewsError
    }

    // Get rating statistics
    const { data: stats, error: statsError } = await supabase
      .rpc('get_product_rating', { p_product_id: productId })
      .single()

    if (statsError) {
      console.error('Failed to get rating stats:', statsError)
    }

    return NextResponse.json({
      reviews: reviews || [],
      stats: stats || {
        average_rating: 0,
        total_reviews: 0,
        rating_distribution: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
      },
    })
  } catch (error: any) {
    console.error('Failed to fetch reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, customerName, customerEmail, rating, title, comment } = body

    // Validation
    if (!productId || !customerName || !customerEmail || !rating || !title || !comment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    if (title.length < 5 || title.length > 100) {
      return NextResponse.json(
        { error: 'Title must be between 5 and 100 characters' },
        { status: 400 }
      )
    }

    if (comment.length < 20 || comment.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be between 20 and 1000 characters' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // Check if user has purchased this product (verified purchase)
    const { data: orders } = await supabase
      .from('orders')
      .select('id, order_items(product_id)')
      .eq('customer_email', customerEmail)
      .eq('status', 'completed')

    const hasPurchased = orders?.some((order: any) =>
      order.order_items?.some((item: any) => item.product_id === productId)
    )

    // Insert review
    const { data: review, error } = await supabase
      .from('product_reviews')
      .insert({
        product_id: productId,
        customer_name: customerName,
        customer_email: customerEmail,
        rating,
        title,
        comment,
        verified_purchase: hasPurchased || false,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ review }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
