/**
 * Payment Workflow Use Case
 * Orchestrates payment processing with fraud detection and retry logic
 */

import { Payment, PaymentStatus, PaymentMethod } from '../domain/types';

export interface PaymentGateway {
  processPayment(payment: Payment): Promise<PaymentResult>;
  refundPayment(paymentId: string): Promise<boolean>;
  verifyPayment(paymentId: string): Promise<PaymentStatus>;
}

export interface FraudDetector {
  analyzeTransaction(payment: Payment): Promise<FraudScore>;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface FraudScore {
  score: number; // 0-100
  risk: 'low' | 'medium' | 'high';
  flags: string[];
}

export class PaymentWorkflow {
  constructor(
    private gateway: PaymentGateway,
    private fraudDetector: FraudDetector
  ) {}

  async processPayment(payment: Payment): Promise<PaymentResult> {
    try {
      // Step 1: Fraud detection
      const fraudScore = await this.fraudDetector.analyzeTransaction(payment);
      
      if (fraudScore.risk === 'high') {
        return {
          success: false,
          error: 'Transaction flagged for review'
        };
      }

      // Step 2: Process payment
      const result = await this.gateway.processPayment(payment);

      // Step 3: Handle result
      if (result.success) {
        await this.sendConfirmationEmail(payment);
        await this.updateMembershipStatus(payment);
      }

      return result;
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async refundPayment(paymentId: string): Promise<boolean> {
    try {
      const refunded = await this.gateway.refundPayment(paymentId);
      
      if (refunded) {
        await this.sendRefundNotification(paymentId);
      }

      return refunded;
    } catch (error) {
      console.error('Refund error:', error);
      return false;
    }
  }

  private async sendConfirmationEmail(payment: Payment): Promise<void> {
    // Email service integration
    console.log('Sending confirmation email for payment:', payment.id);
  }

  private async updateMembershipStatus(payment: Payment): Promise<void> {
    // Update user membership based on payment
    console.log('Updating membership for user:', payment.userId);
  }

  private async sendRefundNotification(paymentId: string): Promise<void> {
    // Send refund notification
    console.log('Sending refund notification for payment:', paymentId);
  }
}
