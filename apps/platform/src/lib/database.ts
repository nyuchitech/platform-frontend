/**
 * 🇿🇼 Database utilities
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function createSupabaseClient(env?: any): SupabaseClient {
  const url = env?.SUPABASE_URL || process.env.SUPABASE_URL || '';
  const key = env?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

  return createClient(url, key);
}

export function createSupabaseAdminClient(env?: any): SupabaseClient {
  const url = env?.SUPABASE_URL || process.env.SUPABASE_URL || '';
  const key = env?.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  return createClient(url, key);
}

// Query utilities
export async function getPublishedListings(client: SupabaseClient, filters: any = {}) {
  let query = client
    .from('directory_listings')
    .select('*', { count: 'exact' })
    .eq('status', 'published');

  if (filters.category) query = query.eq('category', filters.category);
  if (filters.location) query = query.ilike('location', `%${filters.location}%`);
  if (filters.verified !== undefined) query = query.eq('verified', filters.verified);

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range((filters.page - 1) * filters.limit, filters.page * filters.limit - 1);

  return { data: data || [], count: count || 0 };
}

export async function getDirectoryListing(client: SupabaseClient, id: string) {
  const { data } = await client
    .from('directory_listings')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

export async function createDirectoryListing(client: SupabaseClient, listing: any) {
  const { data } = await client
    .from('directory_listings')
    .insert({ ...listing, status: 'pending' })
    .select()
    .single();
  return data;
}

export async function updateDirectoryListing(client: SupabaseClient, id: string, updates: any) {
  const { data } = await client
    .from('directory_listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return data;
}

export async function deleteDirectoryListing(client: SupabaseClient, id: string) {
  const { error } = await client
    .from('directory_listings')
    .delete()
    .eq('id', id);
  return !error;
}

export async function approveDirectoryListing(client: SupabaseClient, id: string, reviewerId: string) {
  return updateDirectoryListing(client, id, {
    status: 'published',
    reviewed_by: reviewerId,
  });
}

export async function rejectDirectoryListing(client: SupabaseClient, id: string, reviewerId: string, reason?: string) {
  return updateDirectoryListing(client, id, {
    status: 'rejected',
    reviewed_by: reviewerId,
    rejection_reason: reason,
  });
}

// Content queries
export async function getPublishedContent(client: SupabaseClient, filters: any = {}) {
  let query = client
    .from('content_submissions')
    .select('*', { count: 'exact' })
    .eq('status', 'published');

  if (filters.type) query = query.eq('content_type', filters.type);
  if (filters.category) query = query.eq('category', filters.category);

  const { data, count } = await query
    .order('published_at', { ascending: false })
    .range((filters.page - 1) * filters.limit, filters.page * filters.limit - 1);

  return { data: data || [], count: count || 0 };
}

export async function getContentSubmission(client: SupabaseClient, slugOrId: string) {
  const { data } = await client
    .from('content_submissions')
    .select('*')
    .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
    .single();
  return data;
}

export async function createContentSubmission(client: SupabaseClient, content: any) {
  const { data } = await client
    .from('content_submissions')
    .insert({ ...content, status: 'submitted' })
    .select()
    .single();
  return data;
}

export async function updateContentSubmission(client: SupabaseClient, id: string, updates: any) {
  const { data } = await client
    .from('content_submissions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return data;
}

export async function deleteContentSubmission(client: SupabaseClient, id: string) {
  const { error } = await client
    .from('content_submissions')
    .delete()
    .eq('id', id);
  return !error;
}

export async function publishContentSubmission(client: SupabaseClient, id: string, reviewerId: string, points: number) {
  return updateContentSubmission(client, id, {
    status: 'published',
    published_at: new Date().toISOString(),
    reviewed_by: reviewerId,
    ubuntu_points_awarded: points,
  });
}

// Ubuntu queries
export async function getUserUbuntuContributions(client: SupabaseClient, userId: string) {
  const { data } = await client
    .from('ubuntu_contributions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return data || [];
}

export async function getUbuntuLeaderboard(client: SupabaseClient, limit: number = 100) {
  const { data } = await client
    .from('profiles')
    .select('*')
    .order('ubuntu_score', { ascending: false })
    .limit(limit);
  return data || [];
}

export async function recordUbuntuContribution(
  client: SupabaseClient,
  userId: string,
  contributionType: string,
  points: number,
  details?: string,
  metadata?: any
) {
  const { data } = await client
    .from('ubuntu_contributions')
    .insert({
      user_id: userId,
      contribution_type: contributionType,
      ubuntu_points_earned: points,
      details,
      metadata,
    })
    .select()
    .single();
  return data;
}
