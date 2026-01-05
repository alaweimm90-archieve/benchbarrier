/**
 * Health Check Endpoint
 * Used by uptime monitors to verify service availability
 */

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check critical dependencies
    const checks = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      checks: {
        database: await checkDatabase(),
        stripe: await checkStripe(),
        environment: checkEnvironment(),
      },
    }

    // Determine overall health
    const allHealthy = Object.values(checks.checks).every((check) => check.status === 'ok')
    
    return NextResponse.json(
      {
        ...checks,
        status: allHealthy ? 'healthy' : 'degraded',
      },
      { status: allHealthy ? 200 : 503 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Check database connectivity
 */
async function checkDatabase() {
  try {
    const { createClient } = await import('@supabase/supabase-js')
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return {
        status: 'error',
        message: 'Supabase environment variables not configured',
      }
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    // Simple query to check connectivity
    const { error } = await supabase.from('orders').select('count', { count: 'exact', head: true })

    if (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }

    return {
      status: 'ok',
      message: 'Database connection successful',
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Database check failed',
    }
  }
}

/**
 * Check Stripe connectivity
 */
async function checkStripe() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        status: 'error',
        message: 'Stripe secret key not configured',
      }
    }

    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    })

    // Simple API call to check connectivity
    await stripe.products.list({ limit: 1 })

    return {
      status: 'ok',
      message: 'Stripe connection successful',
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Stripe check failed',
    }
  }
}

/**
 * Check environment configuration
 */
function checkEnvironment() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ]

  const missing = requiredEnvVars.filter((key) => !process.env[key])

  if (missing.length > 0) {
    return {
      status: 'error',
      message: `Missing environment variables: ${missing.join(', ')}`,
    }
  }

  return {
    status: 'ok',
    message: 'All required environment variables configured',
  }
}
