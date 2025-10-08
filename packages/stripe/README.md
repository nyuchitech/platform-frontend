# 🇿🇼 Nyuchi Platform - Stripe Package

> **Ubuntu Philosophy**: *"I am because we are"* - Payment utilities for the Nyuchi Platform

## Overview

This package provides Stripe payment integration for the Nyuchi Platform, including checkout sessions, customer management, subscriptions, webhooks, and product pricing.

## Installation

```bash
npm install @nyuchi/stripe
```

## Features

- **Checkout Sessions** - Create subscription and one-time payment checkouts
- **Customer Management** - Create, retrieve, update customers
- **Subscriptions** - Full subscription lifecycle management
- **Webhooks** - Event handling for payment events
- **Products & Pricing** - Retrieve products and prices
- **TypeScript** - Full type safety

## Usage

### Environment Variables

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_API_VERSION=2024-11-20.acacia

# Products
STRIPE_VERIFICATION_PRICE_ID=price_...
```

### Checkout Sessions

```typescript
import {
  createCheckoutSession,
  createVerificationCheckout,
  createPortalSession,
} from '@nyuchi/stripe';

// Create subscription checkout
const session = await createCheckoutSession({
  priceId: 'price_1234',
  customerEmail: 'user@example.com',
  successUrl: 'https://platform.nyuchi.com/success',
  cancelUrl: 'https://platform.nyuchi.com/cancel',
  metadata: {
    userId: 'user_123',
  },
  trialDays: 14,
});

// Redirect to checkout
window.location.href = session.url;

// Create verification checkout (one-time payment)
const verificationSession = await createVerificationCheckout({
  userId: 'user_123',
  userEmail: 'user@example.com',
  businessName: 'My Business',
  successUrl: 'https://platform.nyuchi.com/verified',
  cancelUrl: 'https://platform.nyuchi.com/verify',
});

// Create customer portal session
const portalSession = await createPortalSession(
  'cus_1234',
  'https://platform.nyuchi.com/account'
);
```

### Customer Management

```typescript
import {
  createCustomer,
  getOrCreateCustomer,
  getCustomerActiveSubscriptions,
} from '@nyuchi/stripe';

// Create customer
const customer = await createCustomer({
  email: 'user@example.com',
  name: 'John Doe',
  userId: 'user_123',
  metadata: {
    role: 'contributor',
  },
});

// Get or create customer (idempotent)
const customer = await getOrCreateCustomer({
  email: 'user@example.com',
  userId: 'user_123',
});

// Get active subscriptions
const subscriptions = await getCustomerActiveSubscriptions('cus_1234');
```

### Subscription Management

```typescript
import {
  createSubscription,
  cancelSubscription,
  changeSubscriptionPlan,
  isSubscriptionActive,
} from '@nyuchi/stripe';

// Create subscription
const subscription = await createSubscription({
  customerId: 'cus_1234',
  priceId: 'price_1234',
  trialDays: 14,
  metadata: {
    userId: 'user_123',
  },
});

// Cancel subscription (at period end)
await cancelSubscription('sub_1234', false);

// Cancel immediately
await cancelSubscription('sub_1234', true);

// Change plan
await changeSubscriptionPlan('sub_1234', 'price_5678');

// Check if active
const isActive = await isSubscriptionActive('sub_1234');
```

### Webhook Handling (Hono)

```typescript
import { Hono } from 'hono';
import {
  processWebhook,
  onWebhookEvent,
  registerDefaultWebhookHandlers,
} from '@nyuchi/stripe';

const app = new Hono();

// Register custom webhook handlers
onWebhookEvent('checkout.session.completed', async (event, session) => {
  console.log('Checkout completed:', session.id);

  // Update user in database
  // Award Ubuntu points
  // Send confirmation email
});

onWebhookEvent('customer.subscription.deleted', async (event, subscription) => {
  console.log('Subscription canceled:', subscription.id);

  // Revoke access
  // Send cancellation email
});

// Or use default handlers
registerDefaultWebhookHandlers();

// Webhook endpoint
app.post('/webhooks/stripe', async (c) => {
  const signature = c.req.header('stripe-signature');
  const payload = await c.req.text();

  if (!signature) {
    return c.json({ error: 'Missing signature' }, 400);
  }

  const result = await processWebhook(payload, signature);

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  return c.json({ received: true });
});
```

### Products & Pricing

```typescript
import {
  listProductsWithPrices,
  getProductPricingPlans,
  formatPrice,
  calculateYearlySavings,
} from '@nyuchi/stripe';

// List all products with prices
const products = await listProductsWithPrices();

products.forEach((product) => {
  console.log(product.name);
  product.prices.forEach((price) => {
    console.log(`  ${formatPrice(price)}`);
  });
});

// Get monthly and yearly pricing
const { monthly, yearly } = await getProductPricingPlans('prod_1234');

if (monthly && yearly) {
  const savings = calculateYearlySavings(monthly, yearly);
  console.log(`Save ${savings}% with annual billing`);
}

// Get verification price
const verificationPrice = await getVerificationPrice();
console.log(`Verification: ${formatPrice(verificationPrice)}`);
```

## Webhook Events

The package handles these webhook events:

### Checkout
- `checkout.session.completed` - Payment completed

### Subscriptions
- `customer.subscription.created` - New subscription
- `customer.subscription.updated` - Subscription changed
- `customer.subscription.deleted` - Subscription canceled
- `customer.subscription.trial_will_end` - Trial ending (3 days before)

### Invoices
- `invoice.paid` - Invoice paid successfully
- `invoice.payment_failed` - Payment failed

### Payments
- `payment_intent.succeeded` - One-time payment succeeded
- `payment_intent.payment_failed` - Payment failed

## Custom Webhook Handlers

```typescript
import { onWebhookEvent } from '@nyuchi/stripe';

// Handle custom events
onWebhookEvent('customer.subscription.created', async (event, subscription) => {
  // Your custom logic
  await updateUserInDatabase(subscription.customer, {
    subscriptionId: subscription.id,
    status: 'active',
  });

  // Award Ubuntu points for subscribing
  await awardUbuntuPoints(subscription.metadata.userId, 200);

  // Send welcome email
  await sendSubscriptionWelcomeEmail(subscription.customer);
});
```

## API Reference

### Checkout
- `createCheckoutSession(params)` - Create subscription checkout
- `createVerificationCheckout(params)` - Create verification checkout
- `getCheckoutSession(sessionId)` - Get checkout session
- `getCheckoutSessionWithLineItems(sessionId)` - Get with line items
- `createPortalSession(customerId, returnUrl)` - Customer portal

### Customers
- `createCustomer(params)` - Create customer
- `getCustomer(customerId)` - Get by ID
- `getCustomerByUserId(userId)` - Find by user ID
- `getCustomerByEmail(email)` - Find by email
- `updateCustomer(customerId, updates)` - Update customer
- `deleteCustomer(customerId)` - Delete customer
- `getOrCreateCustomer(params)` - Idempotent create
- `getCustomerSubscriptions(customerId)` - List subscriptions
- `getCustomerActiveSubscriptions(customerId)` - Active only
- `getCustomerPaymentMethods(customerId)` - List payment methods

### Subscriptions
- `createSubscription(params)` - Create subscription
- `getSubscription(subscriptionId)` - Get by ID
- `updateSubscription(subscriptionId, updates)` - Update
- `cancelSubscription(subscriptionId, immediate)` - Cancel
- `resumeSubscription(subscriptionId)` - Resume canceled
- `changeSubscriptionPlan(subscriptionId, newPriceId)` - Change plan
- `getSubscriptionStatus(subscriptionId)` - Get status
- `isSubscriptionActive(subscriptionId)` - Check active
- `getSubscriptionPeriodEnd(subscriptionId)` - Get period end
- `isSubscriptionInTrial(subscriptionId)` - Check trial
- `getTrialEndDate(subscriptionId)` - Get trial end
- `listCustomerSubscriptions(customerId, status?)` - List all
- `getCustomerActiveSubscriptionForProduct(customerId, productId)` - Find active
- `pauseSubscription(subscriptionId)` - Pause
- `resumePausedSubscription(subscriptionId)` - Resume paused

### Webhooks
- `onWebhookEvent(eventType, handler)` - Register handler
- `constructWebhookEvent(payload, signature)` - Verify & construct
- `handleWebhookEvent(event)` - Handle event
- `processWebhook(payload, signature)` - Full processing
- `registerDefaultWebhookHandlers()` - Register defaults

### Products
- `listProductsWithPrices()` - List all products
- `getProduct(productId)` - Get product
- `getProductWithPrices(productId)` - Get with prices
- `getPrice(priceId)` - Get price
- `listProductPrices(productId)` - List product prices
- `getVerificationPrice()` - Get verification price
- `formatPrice(price)` - Format for display
- `formatAmount(amount, currency)` - Format amount
- `getProductPricingPlans(productId)` - Get monthly/yearly
- `calculateYearlySavings(monthly, yearly)` - Calculate savings %

## TypeScript Types

```typescript
import type {
  CheckoutSessionParams,
  VerificationCheckoutParams,
  CreateCustomerParams,
  CreateSubscriptionParams,
  SubscriptionStatus,
  WebhookEventType,
  WebhookEventHandler,
  ProductWithPrices,
  Price,
} from '@nyuchi/stripe';
```

## Testing Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:8787/webhooks/stripe

# Test specific event
stripe trigger checkout.session.completed
```

## License

MIT - Built with Ubuntu philosophy for African entrepreneurship

---

**🇿🇼 Nyuchi Africa** | **🟠 Ubuntu Philosophy** | **⚡ Powered by Stripe**

*"I am because we are"*
