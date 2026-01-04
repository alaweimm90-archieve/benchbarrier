'use server'

import { createClient } from '@supabase/supabase-js'

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
  return `STUDENT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
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

    // If already exists and verified, return existing code
    if (existing) {
      return {
        success: true,
        verificationCode: existing.verification_code,
        alreadyExists: true,
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
