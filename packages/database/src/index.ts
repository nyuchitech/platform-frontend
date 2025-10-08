/**
 * 🇿🇼 Nyuchi Platform - Database Package
 * "I am because we are"
 *
 * Supabase client and query utilities for the Nyuchi Platform.
 */

// Client exports
export {
  createSupabaseClient,
  createSupabaseAdminClient,
  createSupabaseClientWithAuth,
  testConnection,
} from './client';

// Type exports
export type { Database, UserRole, ListingStatus, ContentStatus, VerificationStatus, SubscriptionStatus } from './types';

// Query exports
export * from './queries/users';
export * from './queries/directory';
export * from './queries/content';
export * from './queries/ubuntu';
