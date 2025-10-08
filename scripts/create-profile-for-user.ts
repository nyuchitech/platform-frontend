/**
 * 🇿🇼 Create Profile for Existing User
 * Run this to create a profile for user ID: 704111cb-66a5-4615-bc04-6b0776a7f611
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'http://127.0.0.1:54321';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createProfile() {
  const userId = '704111cb-66a5-4615-bc04-6b0776a7f611';
  const email = 'bryan@nyuchi.com';

  // Check if profile already exists
  const { data: existing } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (existing) {
    console.log('✅ Profile already exists:', existing);

    // Update role to admin if not already
    if (existing.role !== 'admin') {
      const { data: updated } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId)
        .select()
        .single();
      console.log('✅ Updated role to admin:', updated);
    }
    return;
  }

  // Create the profile
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      email: email,
      full_name: 'Bryan',
      role: 'admin',
      ubuntu_score: 0,
      contribution_count: 0
    })
    .select()
    .single();

  if (error) {
    console.error('❌ Error creating profile:', error);
    return;
  }

  console.log('✅ Profile created successfully:', data);
}

createProfile().catch(console.error);
