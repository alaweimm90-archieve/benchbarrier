import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getServiceSupabase } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Get line items from the session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
        })

        // Save order to Supabase
        const supabase = getServiceSupabase()

        // Insert order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            stripe_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent as string,
            customer_email: session.customer_details?.email || '',
            customer_name: session.customer_details?.name || '',
            total_amount: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'completed',
            shipping_address: (session as any).shipping_details
              ? {
                  name: (session as any).shipping_details.name,
                  address: (session as any).shipping_details.address,
                }
              : null,
            metadata: {
              payment_status: session.payment_status,
              customer_details: session.customer_details,
            },
          })
          .select()
          .single()

        if (orderError) {
          console.error('Failed to save order:', orderError)
          throw orderError
        }

        // Insert order items
        if (order && lineItems.data.length > 0) {
          const orderItems = lineItems.data.map((item) => {
            const product = item.price?.product as Stripe.Product
            return {
              order_id: order.id,
              product_id: product?.metadata?.product_id || product?.id || '',
              product_name: item.description || product?.name || '',
              stripe_product_id: product?.id || '',
              quantity: item.quantity || 1,
              unit_price: item.price?.unit_amount || 0,
              total_price: (item.price?.unit_amount || 0) * (item.quantity || 1),
            }
          })

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

          if (itemsError) {
            console.error('Failed to save order items:', itemsError)
          }
        }

        console.log('Order saved successfully:', order.id)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('PaymentIntent failed:', paymentIntent.id)

        // Update order status to failed
        const supabase = getServiceSupabase()
        await supabase
          .from('orders')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: `Webhook handler failed: ${error.message}` },
      { status: 500 }
    )
  }
}
