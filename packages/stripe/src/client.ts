/**
 * 🇿🇼 Nyuchi Platform - Stripe Client
 * "I am because we are" - Payment utilities
 */

import Stripe from 'stripe';

/**
 * Stripe configuration
 */
interface StripeConfig {
  secretKey: string;
  publicKey: string;
  webhookSecret: string;
  apiVersion: string;
}

/**
 * Get Stripe configuration from environment
 */
function getStripeConfig(): StripeConfig {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publicKey = process.env.STRIPE_PUBLIC_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const apiVersion = process.env.STRIPE_API_VERSION || '2024-11-20.acacia';

  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }

  if (!publicKey) {
    throw new Error('Missing STRIPE_PUBLIC_KEY environment variable');
  }

  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
  }

  return {
    secretKey,
    publicKey,
    webhookSecret,
    apiVersion,
  };
}

/**
 * Create Stripe client
 */
export function createStripeClient(): Stripe {
  const { secretKey, apiVersion } = getStripeConfig();

  return new Stripe(secretKey, {
    apiVersion: apiVersion as Stripe.LatestApiVersion,
    typescript: true,
  });
}

/**
 * Get Stripe public key
 */
export function getStripePublicKey(): string {
  const { publicKey } = getStripeConfig();
  return publicKey;
}

/**
 * Get Stripe webhook secret
 */
export function getStripeWebhookSecret(): string {
  const { webhookSecret } = getStripeConfig();
  return webhookSecret;
}
