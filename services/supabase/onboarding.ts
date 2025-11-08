import { supabase, supabaseAdmin } from "./client";
import type { UpdateUserProfileData } from "@/types/supabase";

/**
 * Onboarding Service
 * Handles all onboarding-related database operations
 */

/**
 * Saves Step 1 data (Personal Information) to user profile
 *
 * @param clerkUserId - The Clerk user ID
 * @param data - Personal information data from step 1
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep1('user_123', {
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   birth_date: '1990-01-01',
 *   gender: 'male',
 *   height_cm: 175,
 *   weight_kg: 70,
 *   // ... other fields
 * });
 */
export async function saveOnboardingStep1(
  clerkUserId: string,
  data: UpdateUserProfileData
): Promise<boolean> {
  try {
    // Get user first
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      throw new Error("User not found");
    }

    // Update profile with step 1 data
    const { error } = await supabaseAdmin
      .from("user_profile")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Failed to save onboarding step 1: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 1:", error);
    return false;
  }
}

/**
 * Gets the onboarding progress for a user
 * Returns the user profile to check which fields are filled
 *
 * @param clerkUserId - The Clerk user ID
 * @returns User profile data or null
 */
export async function getOnboardingProgress(clerkUserId: string) {
  try {
    const { data: user } = await supabase
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      return null;
    }

    const { data: profile } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    return profile;
  } catch (error) {
    console.error("Error getting onboarding progress:", error);
    return null;
  }
}

/**
 * Marks the onboarding as completed for a user
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Success status
 *
 * @example
 * const success = await markOnboardingComplete('user_123');
 */
export async function markOnboardingComplete(
  clerkUserId: string
): Promise<boolean> {
  try {
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      throw new Error("User not found");
    }

    const { error } = await supabaseAdmin
      .from("user_profile")
      .update({
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Failed to mark onboarding complete: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Error marking onboarding complete:", error);
    return false;
  }
}

/**
 * Checks if a user has completed onboarding
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Boolean indicating if onboarding is complete
 */
export async function isOnboardingComplete(
  clerkUserId: string
): Promise<boolean> {
  try {
    const { data: user } = await supabase
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      return false;
    }

    const { data: profile } = await supabase
      .from("user_profile")
      .select("onboarding_completed")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    return profile?.onboarding_completed ?? false;
  } catch (error) {
    console.error("Error checking onboarding completion:", error);
    return false;
  }
}
