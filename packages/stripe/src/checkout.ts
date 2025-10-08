/**
 * 🇿🇼 Nyuchi Platform - Stripe Checkout
 * "I am because we are" - Checkout session utilities
 */

import Stripe from 'stripe';
import { createStripeClient } from './client';

/**
 * Checkout session parameters
 */
export interface CheckoutSessionParams {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  trialDays?: number;
  quantity?: number;
}

/**
 * Verification checkout parameters
 */
export interface VerificationCheckoutParams {
  userId: string;
  userEmail: string;
  businessName: string;
  successUrl: string;
  cancelUrl: string;
}

/**
 * Create checkout session for subscription
 */
export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<Stripe.Checkout.Session> {
  const stripe = createStripeClient();

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    line_items: [
      {
        price: params.priceId,
        quantity: params.quantity || 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: params.metadata || {},
  };

  // Add customer
  if (params.customerId) {
    sessionParams.customer = params.customerId;
  } else if (params.customerEmail) {
    sessionParams.customer_email = params.customerEmail;
  }

  // Add trial period
  if (params.trialDays) {
    sessionParams.subscription_data = {
      trial_period_days: params.trialDays,
      metadata: params.metadata,
    };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  return session;
}

/**
 * Create verification checkout session (one-time payment)
 */
export async function createVerificationCheckout(
  params: VerificationCheckoutParams
): Promise<Stripe.Checkout.Session> {
  const stripe = createStripeClient();

  // Get verification price from environment
  const verificationPriceId = process.env.STRIPE_VERIFICATION_PRICE_ID;

  if (!verificationPriceId) {
    throw new Error('Missing STRIPE_VERIFICATION_PRICE_ID environment variable');
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: verificationPriceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.userEmail,
    metadata: {
      type: 'verification',
      user_id: params.userId,
      business_name: params.businessName,
    },
  });

  return session;
}

/**
 * Retrieve checkout session
 */
export async function getCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session | null> {
  const stripe = createStripeClient();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    return null;
  }
}

/**
 * Get checkout session with line items
 */
export async function getCheckoutSessionWithLineItems(
  sessionId: string
): Promise<Stripe.Checkout.Session | null> {
  const stripe = createStripeClient();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    return session;
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    return null;
  }
}

/**
 * Create customer portal session
 */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const stripe = createStripeClient();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}
