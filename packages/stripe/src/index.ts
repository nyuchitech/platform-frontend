/**
 * 🇿🇼 Nyuchi Platform - Stripe Package
 * "I am because we are" - Payment utilities
 */

// Client exports
export {
  createStripeClient,
  getStripePublicKey,
  getStripeWebhookSecret,
} from './client';

// Checkout exports
export {
  createCheckoutSession,
  createVerificationCheckout,
  getCheckoutSession,
  getCheckoutSessionWithLineItems,
  createPortalSession,
} from './checkout';

export type {
  CheckoutSessionParams,
  VerificationCheckoutParams,
} from './checkout';

// Customer exports
export {
  createCustomer,
  getCustomer,
  getCustomerByUserId,
  getCustomerByEmail,
  updateCustomer,
  deleteCustomer,
  getOrCreateCustomer,
  getCustomerSubscriptions,
  getCustomerActiveSubscriptions,
  getCustomerPaymentMethods,
} from './customers';

export type { CreateCustomerParams } from './customers';

// Subscription exports
export {
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  resumeSubscription,
  changeSubscriptionPlan,
  getSubscriptionStatus,
  isSubscriptionActive,
  getSubscriptionPeriodEnd,
  isSubscriptionInTrial,
  getTrialEndDate,
  listCustomerSubscriptions,
  getCustomerActiveSubscriptionForProduct,
  pauseSubscription,
  resumePausedSubscription,
} from './subscriptions';

export type {
  CreateSubscriptionParams,
  SubscriptionStatus,
} from './subscriptions';

// Webhook exports
export {
  onWebhookEvent,
  constructWebhookEvent,
  handleWebhookEvent,
  processWebhook,
  handleCheckoutCompleted,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleTrialWillEnd,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  handlePaymentSucceeded,
  handlePaymentFailed,
  registerDefaultWebhookHandlers,
} from './webhooks';

export type { WebhookEventType, WebhookEventHandler } from './webhooks';

// Product exports
export {
  listProductsWithPrices,
  getProduct,
  getProductWithPrices,
  getPrice,
  listProductPrices,
  getVerificationPrice,
  formatPrice,
  formatAmount,
  getProductPricingPlans,
  calculateYearlySavings,
} from './products';

export type { ProductWithPrices, Price } from './products';
