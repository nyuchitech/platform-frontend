/**
 * 🇿🇼 Nyuchi Platform - Stripe Customers
 * "I am because we are" - Customer management utilities
 */

import Stripe from 'stripe';
import { createStripeClient } from './client';

/**
 * Customer creation parameters
 */
export interface CreateCustomerParams {
  email: string;
  name?: string;
  userId: string;
  metadata?: Record<string, string>;
}

/**
 * Create Stripe customer
 */
export async function createCustomer(
  params: CreateCustomerParams
): Promise<Stripe.Customer> {
  const stripe = createStripeClient();

  const customer = await stripe.customers.create({
    email: params.email,
    name: params.name,
    metadata: {
      user_id: params.userId,
      ...params.metadata,
    },
  });

  return customer;
}

/**
 * Get customer by ID
 */
export async function getCustomer(
  customerId: string
): Promise<Stripe.Customer | null> {
  const stripe = createStripeClient();

  try {
    const customer = await stripe.customers.retrieve(customerId);

    if (customer.deleted) {
      return null;
    }

    return customer as Stripe.Customer;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    return null;
  }
}

/**
 * Get customer by user ID
 */
export async function getCustomerByUserId(
  userId: string
): Promise<Stripe.Customer | null> {
  const stripe = createStripeClient();

  try {
    const customers = await stripe.customers.list({
      limit: 1,
      email: undefined, // Search by metadata only
    });

    // Filter by metadata since Stripe API doesn't support metadata search directly
    const customer = customers.data.find(
      (c) => c.metadata?.user_id === userId
    );

    return customer || null;
  } catch (error) {
    console.error('Error finding customer:', error);
    return null;
  }
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(
  email: string
): Promise<Stripe.Customer | null> {
  const stripe = createStripeClient();

  try {
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    return customers.data[0] || null;
  } catch (error) {
    console.error('Error finding customer by email:', error);
    return null;
  }
}

/**
 * Update customer
 */
export async function updateCustomer(
  customerId: string,
  updates: Stripe.CustomerUpdateParams
): Promise<Stripe.Customer | null> {
  const stripe = createStripeClient();

  try {
    const customer = await stripe.customers.update(customerId, updates);
    return customer;
  } catch (error) {
    console.error('Error updating customer:', error);
    return null;
  }
}

/**
 * Delete customer
 */
export async function deleteCustomer(customerId: string): Promise<boolean> {
  const stripe = createStripeClient();

  try {
    await stripe.customers.del(customerId);
    return true;
  } catch (error) {
    console.error('Error deleting customer:', error);
    return false;
  }
}

/**
 * Get or create customer
 */
export async function getOrCreateCustomer(
  params: CreateCustomerParams
): Promise<Stripe.Customer> {
  // Try to find existing customer by email
  let customer = await getCustomerByEmail(params.email);

  if (customer) {
    // Update metadata if needed
    if (customer.metadata?.user_id !== params.userId) {
      customer = await updateCustomer(customer.id, {
        metadata: {
          user_id: params.userId,
          ...params.metadata,
        },
      });
    }

    return customer!;
  }

  // Create new customer
  return createCustomer(params);
}

/**
 * List customer subscriptions
 */
export async function getCustomerSubscriptions(
  customerId: string
): Promise<Stripe.Subscription[]> {
  const stripe = createStripeClient();

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
    });

    return subscriptions.data;
  } catch (error) {
    console.error('Error listing subscriptions:', error);
    return [];
  }
}

/**
 * Get customer active subscriptions
 */
export async function getCustomerActiveSubscriptions(
  customerId: string
): Promise<Stripe.Subscription[]> {
  const stripe = createStripeClient();

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    return subscriptions.data;
  } catch (error) {
    console.error('Error listing active subscriptions:', error);
    return [];
  }
}

/**
 * Get customer payment methods
 */
export async function getCustomerPaymentMethods(
  customerId: string
): Promise<Stripe.PaymentMethod[]> {
  const stripe = createStripeClient();

  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data;
  } catch (error) {
    console.error('Error listing payment methods:', error);
    return [];
  }
}
