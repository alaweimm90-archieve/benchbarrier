/**
 * Email Service
 * Handles sending transactional emails via Resend
 */

import { Resend } from 'resend'
import {
  orderConfirmationEmail,
  abandonedCartEmail,
  welcomeEmail,
  type EmailTemplate,
} from './templates'

// Lazy initialize Resend to avoid build-time errors
let resend: Resend | null = null

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

const FROM_EMAIL = 'BenchBarrier <orders@benchbarrier.com>'
const REPLY_TO = 'support@benchbarrier.com'

export interface SendEmailOptions {
  to: string
  template: EmailTemplate
  replyTo?: string
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    const resendClient = getResend()
    
    if (!resendClient) {
      console.warn('Resend API key not configured, skipping email send')
      return { success: false, error: 'Email service not configured' }
    }

    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      replyTo: options.replyTo || REPLY_TO,
      subject: options.template.subject,
      html: options.template.html,
      text: options.template.text,
    })

    if (error) {
      console.error('Failed to send email:', error)
      throw new Error(`Email send failed: ${error.message}`)
    }

    console.log('Email sent successfully:', data?.id)
    return { success: true, id: data?.id }
  } catch (error: any) {
    console.error('Email service error:', error)
    return { success: false, error: error.message }
  }
}

// Convenience functions for specific email types

export async function sendOrderConfirmation(
  to: string,
  data: Parameters<typeof orderConfirmationEmail>[0]
) {
  const template = orderConfirmationEmail(data)
  return sendEmail({ to, template })
}

export async function sendAbandonedCartEmail(
  to: string,
  data: Parameters<typeof abandonedCartEmail>[0]
) {
  const template = abandonedCartEmail(data)
  return sendEmail({ to, template })
}

export async function sendWelcomeEmail(to: string, customerName: string) {
  const template = welcomeEmail(customerName)
  return sendEmail({ to, template })
}

// Batch email sending for campaigns
export async function sendBatchEmails(
  emails: Array<{ to: string; template: EmailTemplate }>
) {
  const results = await Promise.allSettled(
    emails.map((email) => sendEmail(email))
  )

  const successful = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  console.log(`Batch email results: ${successful} sent, ${failed} failed`)

  return {
    total: emails.length,
    successful,
    failed,
    results,
  }
}
