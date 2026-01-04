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

// Constants for pending team orders
const PENDING_PRODUCT_IDS: string[] = [] // Will be determined during quote process
const PENDING_TOTAL_AMOUNT = 0 // Will be calculated during quote process

export interface TeamOrderData {
  organizationName: string
  contactName: string
  email: string
  phone: string
  quantity: number
  message?: string
}

export async function createTeamOrder(data: TeamOrderData) {
  try {
    const supabase = getServiceSupabase()
    
    // Product IDs and total amount will be filled in by sales team when creating a quote
    const { data: teamOrder, error } = await supabase
      .from('team_orders')
      .insert({
        organization_name: data.organizationName,
        contact_name: data.contactName,
        contact_email: data.email,
        contact_phone: data.phone || null,
        quantity: data.quantity,
        product_ids: PENDING_PRODUCT_IDS,
        total_amount: PENDING_TOTAL_AMOUNT,
        status: 'pending',
        notes: data.message || null,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return {
      success: true,
      orderId: teamOrder.id,
    }
  } catch (error: any) {
    console.error('Error creating team order:', error)
    return {
      success: false,
      error: error.message || 'Failed to create team order',
    }
  }
}
