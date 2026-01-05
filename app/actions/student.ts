'use server'

import { createClient } from '@supabase/supabase-js'
import { randomBytes } from 'crypto'

function getServiceSupabase() {
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

function generateVerificationCode(): string {
  // Use cryptographically secure random bytes
  const bytes = randomBytes(4)
  const code = bytes.toString('hex').toUpperCase()
  return `STUDENT-${code}`
}

export async function createStudentVerification(email: string) {
  try {
    const supabase = getServiceSupabase()
    
    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('student_verifications')
      .select('*')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    // If already exists, check if still valid
    if (existing) {
      const now = new Date()
      const expiresAt = existing.verification_expires_at ? new Date(existing.verification_expires_at) : null
      
      // If expired, update with new code and expiration
      if (expiresAt && expiresAt < now) {
        const verificationCode = generateVerificationCode()
        const newExpiresAt = new Date()
        newExpiresAt.setDate(newExpiresAt.getDate() + 30)
        
        const { error: updateError } = await supabase
          .from('student_verifications')
          .update({
            verification_code: verificationCode,
            verification_expires_at: newExpiresAt.toISOString(),
          })
          .eq('email', email)
        
        if (updateError) throw updateError
        
        return {
          success: true,
          verificationCode,
          alreadyExists: true,
          wasExpired: true,
        }
      }
      
      // Still valid, return existing code
      return {
        success: true,
        verificationCode: existing.verification_code,
        alreadyExists: true,
        wasExpired: false,
      }
    }

    // Generate verification code
    const verificationCode = generateVerificationCode()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days expiration

    // Insert new verification
    const { data, error } = await supabase
      .from('student_verifications')
      .insert({
        email,
        verification_code: verificationCode,
        verification_expires_at: expiresAt.toISOString(),
        verified: false,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return {
      success: true,
      verificationCode,
      alreadyExists: false,
    }
  } catch (error: any) {
    console.error('Error creating student verification:', error)
    return {
      success: false,
      error: error.message || 'Failed to create student verification',
    }
  }
}
