/**
 * 🇿🇼 Update User Role to Admin
 * Run this to update bryan@nyuchi.com to admin role
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'http://127.0.0.1:54321';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function updateRole() {
  const email = 'bryan@nyuchi.com';

  console.log('🔍 Fetching current profile...');

  // Get current profile
  const { data: current, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (fetchError || !current) {
    console.error('❌ Profile not found:', fetchError);
    return;
  }

  console.log('📋 Current profile:', {
    email: current.email,
    role: current.role,
    full_name: current.full_name,
  });

  // Update role to admin
  console.log('\n🔄 Updating role to admin...');

  const { data: updated, error: updateError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('email', email)
    .select()
    .single();

  if (updateError) {
    console.error('❌ Error updating role:', updateError);
    return;
  }

  console.log('\n✅ Role updated successfully!');
  console.log('📋 Updated profile:', {
    email: updated.email,
    role: updated.role,
    full_name: updated.full_name,
  });

  console.log('\n💡 Note: You may need to sign out and sign in again for changes to take effect.');
}

updateRole().catch(console.error);
