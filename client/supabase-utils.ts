// src/client/supabase-utils.ts
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Centrally manages global session clear operations across all application entry vectors.
 */
export async function executeGlobalSignOut(supabase: SupabaseClient): Promise<void> {
  const { error } = await supabase.auth.signOut({ scope: 'global' });
  if (error) {
    throw new Error(error.message);
  }
}
