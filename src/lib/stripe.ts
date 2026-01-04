import { loadStripe, Stripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    interval: 'month',
    features: [
      '4 Personal Training Sessions/Month',
      'Basic Nutrition Plan',
      'Gym Access (Peak Hours)',
      'Mobile App Access',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 199,
    interval: 'month',
    features: [
      '8 Personal Training Sessions/Month',
      'Custom Nutrition Plan',
      '24/7 Gym Access',
      'Group Classes Included',
      'Body Composition Analysis',
      'Mobile App Premium',
    ],
  },
  {
    id: 'champion',
    name: 'Champion',
    price: 299,
    interval: 'month',
    features: [
      'Unlimited Personal Training',
      'Premium Nutrition Coaching',
      '24/7 VIP Gym Access',
      'All Group Classes',
      'Weekly Body Analysis',
      'Recovery & Massage Therapy',
      'Supplement Guidance',
      'Priority Booking',
    ],
  },
];

export const createPaymentIntent = async (amount: number, currency: string = 'usd'): Promise<PaymentIntent> => {
  // In production, this would call your backend API
  // For demo purposes, we'll simulate the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `pi_${Math.random().toString(36).substr(2, 9)}`,
        amount,
        currency,
        status: 'requires_payment_method',
      });
    }, 1000);
  });
};

export const processPayment = async (planId: string, paymentMethodId: string): Promise<{ success: boolean; message: string }> => {
  // In production, this would call your backend API to process the payment
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Payment processed successfully!',
      });
    }, 2000);
  });
};
