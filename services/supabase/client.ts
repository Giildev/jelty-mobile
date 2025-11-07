import { createClient } from "@supabase/supabase-js";

// Get Supabase URL and Anon Key from environment variables
// In Expo, EXPO_PUBLIC_* variables are automatically available in process.env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

/**
 * Supabase client instance
 * Configured with project URL and anonymous key
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
