/**
 * Supabase Database Types
 *
 * Type definitions for Supabase tables used in the application
 */

/**
 * User table (user_user)
 * Main user record linked to Clerk authentication
 */
export interface SupabaseUser {
  id: string; // UUID
  clerk_user_id: string; // Unique identifier from Clerk
  email: string;
  status: string; // 'active' | 'inactive' | 'suspended'
  terms_accepted_at: string | null; // ISO timestamp when user accepted terms
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null
}

/**
 * User Profile table (user_profile)
 * Extended user information and preferences
 */
export interface SupabaseUserProfile {
  user_id: string; // UUID, foreign key to user_user.id
  first_name: string | null; // ENCRYPTED - NULL until onboarding completed
  last_name: string | null; // ENCRYPTED - NULL until onboarding completed
  birth_date: string | null; // ENCRYPTED - ISO date string
  gender: string | null;
  phone: string | null; // ENCRYPTED
  country: string | null; // ENCRYPTED
  country_code: string | null; // ENCRYPTED - Country dialing code (e.g., +1, +52, +34)
  city: string | null; // ENCRYPTED
  address: string | null; // ENCRYPTED
  zip_code: string | null; // ENCRYPTED
  height_cm: number | null; // ENCRYPTED as TEXT, parsed to number after decryption
  weight_kg: number | null; // ENCRYPTED as TEXT, parsed to number after decryption
  bodyfat_percentage: number | null; // ENCRYPTED as TEXT, parsed to number after decryption
  age_years: number | null;
  measurement_system: string | null; // 'metric' | 'imperial'
  activity_level: string | null; // 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active'
  onboarding_completed: boolean; // Whether user completed onboarding wizard
  notes: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null
}

/**
 * Data required to create a new user in Supabase
 * Matches sign-up form data
 */
export interface CreateUserData {
  clerk_user_id: string;
  email: string;
  phone: string;
  country: string;
  country_code: string;
  first_name?: string;
  last_name?: string;
  termsAccepted: boolean;
}

/**
 * Data required to update user profile
 */
export interface UpdateUserProfileData {
  phone?: string;
  country?: string;
  country_code?: string;
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  gender?: string;
  city?: string;
  address?: string;
  zip_code?: string;
  height_cm?: number;
  weight_kg?: number;
  bodyfat_percentage?: number;
  measurement_system?: string;
  activity_level?: string;
  onboarding_completed?: boolean;
}
