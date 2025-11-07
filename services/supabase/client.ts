import { createClient } from "@supabase/supabase-js";

// Get Supabase URL and Keys from environment variables
// In Expo, EXPO_PUBLIC_* variables are automatically available in process.env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

/**
 * Supabase client instance (Public)
 * Configured with project URL and anonymous key
 * Use this for read operations that respect RLS policies
 *
 * @example
 * import { supabase } from '@/services/supabase/client';
 *
 * const { data, error } = await supabase
 *   .from('users')
 *   .select('*');
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Disable auto refresh since we're using Clerk for auth
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

/**
 * Supabase Admin client instance
 * Configured with service role key to bypass RLS
 * Use this ONLY for server-side operations like user creation
 *
 * ⚠️ WARNING: This bypasses Row Level Security policies.
 * Only use for trusted operations like creating users after authentication.
 *
 * @example
 * import { supabaseAdmin } from '@/services/supabase/client';
 *
 * const { data, error } = await supabaseAdmin
 *   .from('user_user')
 *   .insert({ ... });
 */
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    })
  : supabase; // Fallback to regular client if service role key not available
