/**
 * 🇿🇼 Auth utilities
 */

import { createClient } from '@supabase/supabase-js';
import { Context, Next } from 'hono';

export type UserRole = 'user' | 'contributor' | 'moderator' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  ubuntuScore?: number;
}

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser;
  }
}

function createAuthClient(env?: any) {
  const url = env?.SUPABASE_URL || process.env.SUPABASE_URL || '';
  const key = env?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
  return createClient(url, key);
}

export async function signUp(email: string, password: string, metadata?: any, env?: any) {
  const client = createAuthClient(env);
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });
  if (error) throw new Error(`Sign up failed: ${error.message}`);
  return data;
}

export async function signIn(email: string, password: string, env?: any) {
  const client = createAuthClient(env);
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`Sign in failed: ${error.message}`);
  return data;
}

export async function signOut(env?: any) {
  const client = createAuthClient(env);
  const { error } = await client.auth.signOut();
  if (error) throw new Error(`Sign out failed: ${error.message}`);
}

export async function resetPassword(email: string, env?: any) {
  const client = createAuthClient(env);
  const { error } = await client.auth.resetPasswordForEmail(email);
  if (error) throw new Error(`Reset password failed: ${error.message}`);
}

export async function updatePassword(newPassword: string, env?: any) {
  const client = createAuthClient(env);
  const { data, error } = await client.auth.updateUser({ password: newPassword });
  if (error) throw new Error(`Update password failed: ${error.message}`);
  return data;
}

export async function verifyToken(token: string, env?: any) {
  const client = createAuthClient(env);
  const { data, error } = await client.auth.getUser(token);
  return error ? null : data.user;
}

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Missing authorization header' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');
  const user = await verifyToken(token, c.env);

  if (!user) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  c.set('user', {
    id: user.id,
    email: user.email || '',
    role: (user.user_metadata?.role as UserRole) || 'user',
    ubuntuScore: user.user_metadata?.ubuntu_score,
  });

  await next();
}

export function requireRole(...allowedRoles: UserRole[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user');
    if (!user) {
      return c.json({ error: 'Authentication required' }, 401);
    }
    if (!allowedRoles.includes(user.role)) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }
    await next();
  };
}

export async function requireAdmin(c: Context, next: Next) {
  const user = c.get('user');
  if (!user || user.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }
  await next();
}

export async function requireModerator(c: Context, next: Next) {
  const user = c.get('user');
  if (!user || (user.role !== 'moderator' && user.role !== 'admin')) {
    return c.json({ error: 'Moderator access required' }, 403);
  }
  await next();
}
