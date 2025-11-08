import { supabase, supabaseAdmin } from "./client";
import type {
  UpdateUserProfileData,
  UpdateUserGoalData,
  UpdateUserBodyGoalData,
} from "@/types/supabase";
import {
  encryptUserFields,
  encryptGoalFields,
  encryptBodyGoalFields,
  decryptGoalFields,
  decryptBodyGoalFields,
} from "@/services/encryption/crypto";

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
    // Get user with encryption salt
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id, encryption_salt")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.encryption_salt) {
      throw new Error("User encryption salt not found");
    }

    // Encrypt sensitive data before saving
    const encryptedData = encryptUserFields(data, user.encryption_salt, clerkUserId);

    // Update profile with ENCRYPTED step 1 data
    const { error } = await supabaseAdmin
      .from("user_profile")
      .update({
        ...encryptedData,
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

/**
 * Saves Step 2 data (Fitness Goals & Body Measurements) to database
 *
 * @param clerkUserId - The Clerk user ID
 * @param goalData - Goal data (goal_type, target_weight_kg, target_bodyfat_pct, timeframe)
 * @param bodyGoalData - Body measurements data (chest_cm, waist_cm, etc.)
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep2('user_123', {
 *   goal_type: 'lose_fat',
 *   target_weight_kg: 70,
 *   target_bodyfat_pct: 15,
 *   timeframe: '12_weeks',
 * }, {
 *   chest_cm: 95,
 *   waist_cm: 80,
 *   hips_cm: 98,
 * });
 */
export async function saveOnboardingStep2(
  clerkUserId: string,
  goalData: UpdateUserGoalData,
  bodyGoalData?: UpdateUserBodyGoalData
): Promise<boolean> {
  try {
    // Get user with encryption salt
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id, encryption_salt")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.encryption_salt) {
      throw new Error("User encryption salt not found");
    }

    // Encrypt goal data before saving
    const encryptedGoalData = encryptGoalFields(goalData, user.encryption_salt, clerkUserId);

    // Check if goal already exists
    const { data: existingGoal } = await supabaseAdmin
      .from("user_goal")
      .select("id")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    // Upsert goal
    if (existingGoal) {
      const { error: goalError } = await supabaseAdmin
        .from("user_goal")
        .update({
          ...encryptedGoalData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingGoal.id);

      if (goalError) {
        throw new Error(`Failed to update goal: ${goalError.message}`);
      }
    } else {
      const { error: goalError } = await supabaseAdmin
        .from("user_goal")
        .insert({
          user_id: user.id,
          ...encryptedGoalData,
        });

      if (goalError) {
        throw new Error(`Failed to insert goal: ${goalError.message}`);
      }
    }

    // If body goal data provided, save it
    if (bodyGoalData && Object.keys(bodyGoalData).length > 0) {
      // Encrypt body goal data before saving
      const encryptedBodyGoalData = encryptBodyGoalFields(
        bodyGoalData,
        user.encryption_salt,
        clerkUserId
      );

      // Check if body goal already exists
      const { data: existingBodyGoal } = await supabaseAdmin
        .from("user_body_goal")
        .select("id")
        .eq("user_id", user.id)
        .is("deleted_at", null)
        .single();

      // Upsert body goal
      if (existingBodyGoal) {
        const { error: bodyGoalError } = await supabaseAdmin
          .from("user_body_goal")
          .update({
            ...encryptedBodyGoalData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingBodyGoal.id);

        if (bodyGoalError) {
          throw new Error(`Failed to update body goal: ${bodyGoalError.message}`);
        }
      } else {
        const { error: bodyGoalError } = await supabaseAdmin
          .from("user_body_goal")
          .insert({
            user_id: user.id,
            ...encryptedBodyGoalData,
          });

        if (bodyGoalError) {
          throw new Error(`Failed to insert body goal: ${bodyGoalError.message}`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 2:", error);
    return false;
  }
}

/**
 * Loads Step 2 data (Fitness Goals & Body Measurements) from database
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Goal and body goal data, or null if not found
 *
 * @example
 * const step2Data = await loadOnboardingStep2('user_123');
 * if (step2Data) {
 *   console.log('Goal type:', step2Data.goal?.goal_type);
 *   console.log('Chest measurement:', step2Data.bodyGoal?.chest_cm);
 * }
 */
export async function loadOnboardingStep2(clerkUserId: string): Promise<{
  goal: UpdateUserGoalData | null;
  bodyGoal: UpdateUserBodyGoalData | null;
} | null> {
  try {
    // Get user with encryption salt
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id, encryption_salt")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      return null;
    }

    if (!user.encryption_salt) {
      throw new Error("User encryption salt not found");
    }

    // Load goal data
    const { data: goalData } = await supabaseAdmin
      .from("user_goal")
      .select("*")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    // Load body goal data
    const { data: bodyGoalData } = await supabaseAdmin
      .from("user_body_goal")
      .select("*")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    // Decrypt goal data if exists
    const decryptedGoal = goalData
      ? decryptGoalFields(goalData, user.encryption_salt, clerkUserId)
      : null;

    // Decrypt body goal data if exists
    const decryptedBodyGoal = bodyGoalData
      ? decryptBodyGoalFields(bodyGoalData, user.encryption_salt, clerkUserId)
      : null;

    return {
      goal: decryptedGoal
        ? {
            goal_type: decryptedGoal.goal_type,
            target_weight_kg: decryptedGoal.target_weight_kg,
            target_bodyfat_pct: decryptedGoal.target_bodyfat_pct,
            timeframe: decryptedGoal.timeframe,
          }
        : null,
      bodyGoal: decryptedBodyGoal
        ? {
            chest_cm: decryptedBodyGoal.chest_cm,
            waist_cm: decryptedBodyGoal.waist_cm,
            hips_cm: decryptedBodyGoal.hips_cm,
            biceps_cm: decryptedBodyGoal.biceps_cm,
            thighs_cm: decryptedBodyGoal.thighs_cm,
            neck_cm: decryptedBodyGoal.neck_cm,
            shoulders_cm: decryptedBodyGoal.shoulders_cm,
            forearms_cm: decryptedBodyGoal.forearms_cm,
            calves_cm: decryptedBodyGoal.calves_cm,
          }
        : null,
    };
  } catch (error) {
    console.error("Error loading onboarding step 2:", error);
    return null;
  }
}
