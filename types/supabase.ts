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
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  gender: string | null;
  phone: string | null;
  country: string | null;
  country_code: string | null;
  city: string | null;
  address: string | null;
  zip_code: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  bodyfat_percentage: number | null;
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

/**
 * User Goal table (user_goal)
 * Fitness goals and targets
 */
export interface SupabaseUserGoal {
  id: string; // UUID
  user_id: string; // UUID, foreign key to user_user.id
  goal_type: string; // 'lose_fat' | 'build_muscle' | 'improve_health' | 'increase_performance' | 'maintain'
  target_weight_kg: number | null;
  target_bodyfat_pct: number | null;
  timeframe: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null
}

/**
 * User Body Goal table (user_body_goal)
 * Target body measurements
 */
export interface SupabaseUserBodyGoal {
  id: string; // UUID
  user_id: string; // UUID, foreign key to user_user.id
  chest_cm: number | null;
  waist_cm: number | null;
  hips_cm: number | null;
  biceps_cm: number | null;
  thighs_cm: number | null;
  neck_cm: number | null;
  shoulders_cm: number | null;
  forearms_cm: number | null;
  calves_cm: number | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null
}

/**
 * Fitness goal types
 */
export type FitnessGoalType =
  | "lose_fat"
  | "build_muscle"
  | "improve_health"
  | "increase_performance"
  | "maintain";

/**
 * Timeframe options for goals
 */
export type GoalTimeframe =
  | "4_weeks"
  | "8_weeks"
  | "12_weeks"
  | "16_weeks"
  | "3_months"
  | "6_months"
  | "9_months"
  | "12_months";

/**
 * Data required to create/update user goal
 */
export interface UpdateUserGoalData {
  goal_type: FitnessGoalType;
  target_weight_kg?: number;
  target_bodyfat_pct?: number;
  timeframe?: GoalTimeframe;
}

/**
 * Data required to create/update user body goal measurements
 */
export interface UpdateUserBodyGoalData {
  chest_cm?: number;
  waist_cm?: number;
  hips_cm?: number;
  biceps_cm?: number;
  thighs_cm?: number;
  neck_cm?: number;
  shoulders_cm?: number;
  forearms_cm?: number;
  calves_cm?: number;
}

/**
 * User Medical Condition table (user_medical_condition)
 * Medical conditions reported by the user
 */
export interface SupabaseUserMedicalCondition {
  id: string; // UUID
  user_id: string; // UUID, foreign key to user_user.id
  name: string;
  details: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null (soft delete)
}

/**
 * User Medication table (user_medication)
 * Medications currently taken by the user
 */
export interface SupabaseUserMedication {
  id: string; // UUID
  user_id: string; // UUID, foreign key to user_user.id
  name: string;
  dosage: string | null;
  notes: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null (soft delete)
}

/**
 * User Injury table (user_injury)
 * Previous or current injuries
 */
export interface SupabaseUserInjury {
  id: string; // UUID
  user_id: string; // UUID, foreign key to user_user.id
  name: string;
  details: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null (soft delete)
}

/**
 * User Allergy table (user_allergy)
 * Allergies reported by the user
 */
export interface SupabaseUserAllergy {
  id: string; // UUID
  user_id: string; // UUID, foreign key to user_user.id
  name: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null; // ISO timestamp or null (soft delete)
}

/**
 * Health Information Form Data (for Step 3 form)
 * Simple arrays of strings entered by the user
 */
export interface HealthInfoFormData {
  medicalConditions: string[];
  medications: string[];
  injuries: string[];
  allergies: string[];
}

/**
 * Health Information Data (loaded from database)
 * Returned as plain text
 */
export interface HealthInfoData {
  medicalConditions: string[];
  medications: string[];
  injuries: string[];
  allergies: string[];
}
