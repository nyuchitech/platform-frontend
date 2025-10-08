/**
 * 🇿🇼 Nyuchi Platform - Supabase Auth Client
 * "I am because we are" - Authentication utilities
 */

import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

/**
 * Create Supabase Auth client
 */
export function createAuthClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase credentials');
  }

  return createClient(url, key);
}

/**
 * Sign up new user
 */
export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  const client = createAuthClient();

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  if (error) {
    throw new Error(`Sign up failed: ${error.message}`);
  }

  return data;
}

/**
 * Sign in user
 */
export async function signIn(email: string, password: string) {
  const client = createAuthClient();

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`Sign in failed: ${error.message}`);
  }

  return data;
}

/**
 * Sign out user
 */
export async function signOut() {
  const client = createAuthClient();

  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(`Sign out failed: ${error.message}`);
  }
}

/**
 * Get current session
 */
export async function getSession(): Promise<Session | null> {
  const client = createAuthClient();

  const { data, error } = await client.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

  return data.session;
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  const client = createAuthClient();

  const { data, error } = await client.auth.getUser();

  if (error) {
    console.error('Error getting user:', error);
    return null;
  }

  return data.user;
}

/**
 * Refresh session
 */
export async function refreshSession(): Promise<Session | null> {
  const client = createAuthClient();

  const { data, error } = await client.auth.refreshSession();

  if (error) {
    console.error('Error refreshing session:', error);
    return null;
  }

  return data.session;
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<User | null> {
  const client = createAuthClient();

  const { data, error } = await client.auth.getUser(token);

  if (error) {
    console.error('Error verifying token:', error);
    return null;
  }

  return data.user;
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const client = createAuthClient();

  const { error } = await client.auth.resetPasswordForEmail(email);

  if (error) {
    throw new Error(`Password reset failed: ${error.message}`);
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  const client = createAuthClient();

  const { error } = await client.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(`Password update failed: ${error.message}`);
  }
}
