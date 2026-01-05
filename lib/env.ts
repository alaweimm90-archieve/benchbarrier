/**
 * Environment variable validation and fallback utilities
 * Provides graceful degradation for missing variables during builds
 */

type EnvConfig = {
  key: string
  required: boolean
  description: string
  fallback?: string
}

const ENV_CONFIG: EnvConfig[] = [
  // Supabase
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    required: false, // Optional for build
    description: 'Supabase project URL',
    fallback: 'https://placeholder.supabase.co',
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    required: false, // Optional for build
    description: 'Supabase anonymous key',
    fallback: 'placeholder_anon_key',
  },
  // Stripe
  {
    key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    required: false, // Optional for build
    description: 'Stripe publishable key',
    fallback: 'pk_test_placeholder',
  },
  // Server-side only (checked at runtime, not build time)
  {
    key: 'STRIPE_SECRET_KEY',
    required: false, // Only needed at runtime
    description: 'Stripe secret key',
  },
  {
    key: 'STRIPE_WEBHOOK_SECRET',
    required: false, // Only needed at runtime
    description: 'Stripe webhook secret',
  },
]

/**
 * Get environment variable with fallback
 */
export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key]
  
  if (!value) {
    if (fallback) {
      console.warn(`[ENV] Using fallback for missing ${key}`)
      return fallback
    }
    console.warn(`[ENV] ${key} is not defined`)
    return ''
  }
  
  return value
}

/**
 * Validate runtime environment variables
 * Call this at runtime (not build time) for server-side routes
 */
export function validateRuntimeEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []
  const runtimeRequired = ['STRIPE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
  
  for (const key of runtimeRequired) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }
  
  if (missing.length > 0) {
    console.error('[ENV] Missing runtime environment variables:', missing)
  }
  
  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Check if running in build mode
 */
export function isBuildTime(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build'
}

/**
 * Log environment status (safe for build time)
 */
export function logEnvStatus(): void {
  if (isBuildTime()) {
    console.log('[ENV] Build mode - using fallback values where needed')
    return
  }
  
  const validation = validateRuntimeEnv()
  if (!validation.valid) {
    console.warn('[ENV] Runtime validation failed. Missing:', validation.missing)
  } else {
    console.log('[ENV] Runtime validation passed')
  }
}
