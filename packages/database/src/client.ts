/**
 * 🇿🇼 Nyuchi Platform - Supabase Client
 * "I am because we are" - Database connection management
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Environment configuration
 */
interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
}

/**
 * Get Supabase configuration from environment
 */
function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.'
    );
  }

  return { url, anonKey, serviceRoleKey };
}

/**
 * Create Supabase client for public access (with RLS)
 */
export function createSupabaseClient(): SupabaseClient<Database> {
  const { url, anonKey } = getSupabaseConfig();

  return createClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

/**
 * Create Supabase client for server-side operations (bypasses RLS)
 * Use with caution - only for admin operations
 */
export function createSupabaseAdminClient(): SupabaseClient<Database> {
  const { url, serviceRoleKey } = getSupabaseConfig();

  if (!serviceRoleKey) {
    throw new Error(
      'Missing service role key. Set SUPABASE_SERVICE_ROLE_KEY for admin operations.'
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Create Supabase client with custom auth token (for API routes)
 */
export function createSupabaseClientWithAuth(
  authToken: string
): SupabaseClient<Database> {
  const { url, anonKey } = getSupabaseConfig();

  return createClient<Database>(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = createSupabaseClient();
    const { error } = await client.from('profiles').select('count').limit(1);
    return !error;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}
