/**
 * Stripe Payment Gateway Adapter
 * Implements PaymentGateway interface for Stripe integration
 */

import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Payment, PaymentStatus } from '../../core/domain/types';
import { PaymentGateway, PaymentResult } from '../../core/usecases/PaymentWorkflow';

export class StripeAdapter implements PaymentGateway {
  private stripe: Stripe | null = null;
  private publishableKey: string;

  constructor(publishableKey: string) {
    this.publishableKey = publishableKey;
  }

  async initialize(): Promise<void> {
    this.stripe = await loadStripe(this.publishableKey);
  }

  async processPayment(payment: Payment): Promise<PaymentResult> {
    if (!this.stripe) {
      return {
        success: false,
        error: 'Stripe not initialized'
      };
    }

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: payment.amount,
          currency: payment.currency,
          userId: payment.userId,
          metadata: payment.metadata
        })
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        return {
          success: false,
          error
        };
      }

      // Confirm payment
      const result = await this.stripe.confirmCardPayment(clientSecret);

      if (result.error) {
        return {
          success: false,
          error: result.error.message
        };
      }

      return {
        success: true,
        transactionId: result.paymentIntent?.id
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async refundPayment(paymentId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/refund-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentId })
      });

      const { success } = await response.json();
      return success;
    } catch (error) {
      console.error('Refund error:', error);
      return false;
    }
  }

  async verifyPayment(paymentId: string): Promise<PaymentStatus> {
    try {
      const response = await fetch(`/api/verify-payment/${paymentId}`);
      const { status } = await response.json();
      
      return status as PaymentStatus;
    } catch (error) {
      console.error('Verification error:', error);
      return PaymentStatus.FAILED;
    }
  }

  async createCheckoutSession(
    items: CheckoutItem[],
    successUrl: string,
    cancelUrl: string
  ): Promise<string | null> {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items,
          successUrl,
          cancelUrl
        })
      });

      const { sessionId } = await response.json();
      return sessionId;
    } catch (error) {
      console.error('Checkout session error:', error);
      return null;
    }
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    const { error } = await this.stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw new Error(error.message);
    }
  }
}

export interface CheckoutItem {
  priceId: string;
  quantity: number;
}
