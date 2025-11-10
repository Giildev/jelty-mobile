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
  encryptHealthConditions,
  decryptHealthConditions,
  encryptMedications,
  decryptMedications,
  encryptInjuries,
  decryptInjuries,
  encryptAllergies,
  decryptAllergies,
  encryptIngredients,
  decryptIngredients,
} from "@/services/encryption/crypto";
import type { HealthInfoData } from "@/types/supabase";

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
    console.log("[markOnboardingComplete] Starting for Clerk user:", clerkUserId);

    const { data: user, error: userError } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (userError) {
      console.error("[markOnboardingComplete] Error fetching user:", userError);
      throw new Error(`User fetch error: ${userError.message}`);
    }

    if (!user) {
      console.error("[markOnboardingComplete] User not found");
      throw new Error("User not found");
    }

    console.log("[markOnboardingComplete] Found user with Supabase ID:", user.id);

    const { error } = await supabaseAdmin
      .from("user_profile")
      .update({
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("[markOnboardingComplete] Error updating profile:", error);
      throw new Error(`Failed to mark onboarding complete: ${error.message}`);
    }

    console.log("[markOnboardingComplete] Successfully marked onboarding as complete");
    return true;
  } catch (error) {
    console.error("[markOnboardingComplete] Error:", error);
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
    console.log("[isOnboardingComplete] Checking for Clerk user:", clerkUserId);

    // Use supabaseAdmin to bypass RLS and access user tables
    // Join user_user with user_profile directly to get onboarding_completed
    const { data, error } = await supabaseAdmin
      .from("user_user")
      .select(`
        id,
        clerk_user_id,
        user_profile!inner(onboarding_completed)
      `)
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .is("user_profile.deleted_at", null)
      .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully

    // If error or no data, user doesn't exist yet or hasn't completed onboarding
    if (error) {
      // PGRST116 means 0 rows - this is expected for new users, so don't log as error
      if (error.code === "PGRST116") {
        console.log("[isOnboardingComplete] User not found in database (new user)");
        return false;
      }
      console.error("[isOnboardingComplete] Unexpected error:", error);
      return false;
    }

    if (!data) {
      console.log("[isOnboardingComplete] User not found (new user)");
      return false;
    }

    console.log("[isOnboardingComplete] Found user:", {
      id: data.id,
      clerk_user_id: data.clerk_user_id,
      profile: data.user_profile
    });

    // @ts-ignore - Supabase typing for nested relations
    const completed = data.user_profile?.onboarding_completed ?? false;
    console.log("[isOnboardingComplete] Onboarding status:", completed);
    console.log("[isOnboardingComplete] ========== END ==========");

    return completed;
  } catch (error) {
    console.error("[isOnboardingComplete] Unexpected error:", error);
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

/**
 * Saves Step 3 data (Health Information) to database
 *
 * @param clerkUserId - The Clerk user ID
 * @param healthData - Health information data (medical conditions, medications, injuries, allergies)
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep3('user_123', {
 *   medicalConditions: ['Diabetes', 'Hypertension'],
 *   medications: ['Aspirin', 'Vitamins'],
 *   injuries: ['Knee injury'],
 *   allergies: ['Lactose', 'Peanuts'],
 * });
 */
export async function saveOnboardingStep3(
  clerkUserId: string,
  healthData: HealthInfoData
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

    // 1. Medical Conditions
    // Soft delete existing conditions
    await supabaseAdmin
      .from("user_medical_condition")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new conditions if any
    if (healthData.medicalConditions && healthData.medicalConditions.length > 0) {
      const encryptedConditions = encryptHealthConditions(
        healthData.medicalConditions,
        user.encryption_salt,
        clerkUserId
      );

      const conditionsToInsert = encryptedConditions.map((condition) => ({
        user_id: user.id,
        name: condition.name,
        details: condition.details,
      }));

      const { error: conditionsError } = await supabaseAdmin
        .from("user_medical_condition")
        .insert(conditionsToInsert);

      if (conditionsError) {
        throw new Error(`Failed to insert medical conditions: ${conditionsError.message}`);
      }
    }

    // 2. Medications
    // Soft delete existing medications
    await supabaseAdmin
      .from("user_medication")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new medications if any
    if (healthData.medications && healthData.medications.length > 0) {
      const encryptedMedications = encryptMedications(
        healthData.medications,
        user.encryption_salt,
        clerkUserId
      );

      const medicationsToInsert = encryptedMedications.map((medication) => ({
        user_id: user.id,
        name: medication.name,
        dosage: medication.dosage,
        notes: medication.notes,
      }));

      const { error: medicationsError } = await supabaseAdmin
        .from("user_medication")
        .insert(medicationsToInsert);

      if (medicationsError) {
        throw new Error(`Failed to insert medications: ${medicationsError.message}`);
      }
    }

    // 3. Injuries
    // Soft delete existing injuries
    await supabaseAdmin
      .from("user_injury")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new injuries if any
    if (healthData.injuries && healthData.injuries.length > 0) {
      const encryptedInjuries = encryptInjuries(
        healthData.injuries,
        user.encryption_salt,
        clerkUserId
      );

      const injuriesToInsert = encryptedInjuries.map((injury) => ({
        user_id: user.id,
        name: injury.name,
        details: injury.details,
      }));

      const { error: injuriesError } = await supabaseAdmin
        .from("user_injury")
        .insert(injuriesToInsert);

      if (injuriesError) {
        throw new Error(`Failed to insert injuries: ${injuriesError.message}`);
      }
    }

    // 4. Allergies
    // Soft delete existing allergies
    await supabaseAdmin
      .from("user_allergy")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new allergies if any
    if (healthData.allergies && healthData.allergies.length > 0) {
      const encryptedAllergies = encryptAllergies(
        healthData.allergies,
        user.encryption_salt,
        clerkUserId
      );

      const allergiesToInsert = encryptedAllergies.map((allergy) => ({
        user_id: user.id,
        name: allergy.name,
      }));

      const { error: allergiesError } = await supabaseAdmin
        .from("user_allergy")
        .insert(allergiesToInsert);

      if (allergiesError) {
        throw new Error(`Failed to insert allergies: ${allergiesError.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 3:", error);
    return false;
  }
}

/**
 * Loads Step 3 data (Health Information) from database
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Health information data, or null if not found
 *
 * @example
 * const step3Data = await loadOnboardingStep3('user_123');
 * if (step3Data) {
 *   console.log('Medical conditions:', step3Data.medicalConditions);
 *   console.log('Medications:', step3Data.medications);
 * }
 */
export async function loadOnboardingStep3(clerkUserId: string): Promise<HealthInfoData | null> {
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

    // Load medical conditions
    const { data: conditions } = await supabaseAdmin
      .from("user_medical_condition")
      .select("name, details")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load medications
    const { data: medications } = await supabaseAdmin
      .from("user_medication")
      .select("name, dosage, notes")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load injuries
    const { data: injuries } = await supabaseAdmin
      .from("user_injury")
      .select("name, details")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load allergies
    const { data: allergies } = await supabaseAdmin
      .from("user_allergy")
      .select("name")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Decrypt and return data
    return {
      medicalConditions: conditions
        ? decryptHealthConditions(conditions, user.encryption_salt, clerkUserId)
        : [],
      medications: medications
        ? decryptMedications(medications, user.encryption_salt, clerkUserId)
        : [],
      injuries: injuries
        ? decryptInjuries(injuries, user.encryption_salt, clerkUserId)
        : [],
      allergies: allergies
        ? decryptAllergies(allergies, user.encryption_salt, clerkUserId)
        : [],
    };
  } catch (error) {
    console.error("Error loading onboarding step 3:", error);
    return null;
  }
}

/**
 * Dietary Preferences Data Interface
 */
export interface DietaryPreferencesData {
  dietaryPatterns?: string[];
  cuisines?: string[];
  ingredientsToAvoid?: string[];
  ingredientsToInclude?: string[];
  mealsPerDay?: number | null;
  waterIntake?: number | null;
}

/**
 * Saves Step 4 data (Dietary Preferences) to database
 *
 * @param clerkUserId - The Clerk user ID
 * @param dietaryData - Dietary preferences data
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep4('user_123', {
 *   dietaryPatterns: ['Vegetariana', 'Mediterránea'],
 *   cuisines: ['Italiana', 'Japonesa'],
 *   ingredientsToAvoid: ['Nuts', 'Dairy'],
 *   ingredientsToInclude: ['Quinoa', 'Avocado'],
 *   mealsPerDay: 4,
 *   waterIntake: 2.5,
 * });
 */
export async function saveOnboardingStep4(
  clerkUserId: string,
  dietaryData: DietaryPreferencesData
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

    // 1. Dietary Patterns (user_restriction)
    // Soft delete existing restrictions
    await supabaseAdmin
      .from("user_restriction")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new dietary patterns if any
    if (dietaryData.dietaryPatterns && dietaryData.dietaryPatterns.length > 0) {
      const restrictionsToInsert = dietaryData.dietaryPatterns.map((pattern) => ({
        user_id: user.id,
        name: pattern, // NOT encrypted (predefined options)
      }));

      const { error: restrictionsError } = await supabaseAdmin
        .from("user_restriction")
        .insert(restrictionsToInsert);

      if (restrictionsError) {
        throw new Error(`Failed to insert dietary patterns: ${restrictionsError.message}`);
      }
    }

    // 2. Preferred Cuisines (user_cuisine)
    // Soft delete existing cuisines
    await supabaseAdmin
      .from("user_cuisine")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new cuisines if any
    if (dietaryData.cuisines && dietaryData.cuisines.length > 0) {
      const cuisinesToInsert = dietaryData.cuisines.map((cuisine) => ({
        user_id: user.id,
        name: cuisine, // NOT encrypted (predefined options)
      }));

      const { error: cuisinesError } = await supabaseAdmin
        .from("user_cuisine")
        .insert(cuisinesToInsert);

      if (cuisinesError) {
        throw new Error(`Failed to insert cuisines: ${cuisinesError.message}`);
      }
    }

    // 3. Ingredients to Avoid (user_disliked_ingredient)
    // Soft delete existing disliked ingredients
    await supabaseAdmin
      .from("user_disliked_ingredient")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new ingredients to avoid if any
    if (dietaryData.ingredientsToAvoid && dietaryData.ingredientsToAvoid.length > 0) {
      const encryptedAvoid = encryptIngredients(
        dietaryData.ingredientsToAvoid,
        user.encryption_salt,
        clerkUserId
      );

      const avoidToInsert = encryptedAvoid.map((ingredient) => ({
        user_id: user.id,
        name: ingredient.name, // ENCRYPTED
      }));

      const { error: avoidError } = await supabaseAdmin
        .from("user_disliked_ingredient")
        .insert(avoidToInsert);

      if (avoidError) {
        throw new Error(`Failed to insert ingredients to avoid: ${avoidError.message}`);
      }
    }

    // 4. Ingredients to Include (user_favorite_ingredient)
    // Soft delete existing favorite ingredients
    await supabaseAdmin
      .from("user_favorite_ingredient")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new ingredients to include if any
    if (dietaryData.ingredientsToInclude && dietaryData.ingredientsToInclude.length > 0) {
      const encryptedInclude = encryptIngredients(
        dietaryData.ingredientsToInclude,
        user.encryption_salt,
        clerkUserId
      );

      const includeToInsert = encryptedInclude.map((ingredient) => ({
        user_id: user.id,
        name: ingredient.name, // ENCRYPTED
      }));

      const { error: includeError } = await supabaseAdmin
        .from("user_favorite_ingredient")
        .insert(includeToInsert);

      if (includeError) {
        throw new Error(`Failed to insert ingredients to include: ${includeError.message}`);
      }
    }

    // 5. Meals per Day & Water Intake (user_settings)
    // Check if settings already exist
    const { data: existingSettings } = await supabaseAdmin
      .from("user_settings")
      .select("user_id")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    const settingsData: any = {};
    if (dietaryData.mealsPerDay !== undefined && dietaryData.mealsPerDay !== null) {
      settingsData.meals_per_day = dietaryData.mealsPerDay;
    }
    if (dietaryData.waterIntake !== undefined && dietaryData.waterIntake !== null) {
      settingsData.water_intake = dietaryData.waterIntake;
    }

    // Only update if we have data to update
    if (Object.keys(settingsData).length > 0) {
      if (existingSettings) {
        // Update existing settings
        const { error: settingsError } = await supabaseAdmin
          .from("user_settings")
          .update({
            ...settingsData,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id);

        if (settingsError) {
          throw new Error(`Failed to update settings: ${settingsError.message}`);
        }
      } else {
        // Insert new settings
        const { error: settingsError } = await supabaseAdmin
          .from("user_settings")
          .insert({
            user_id: user.id,
            ...settingsData,
          });

        if (settingsError) {
          throw new Error(`Failed to insert settings: ${settingsError.message}`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 4:", error);
    return false;
  }
}

/**
 * Loads Step 4 data (Dietary Preferences) from database
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Dietary preferences data, or null if not found
 *
 * @example
 * const step4Data = await loadOnboardingStep4('user_123');
 * if (step4Data) {
 *   console.log('Dietary patterns:', step4Data.dietaryPatterns);
 *   console.log('Cuisines:', step4Data.cuisines);
 *   console.log('Meals per day:', step4Data.mealsPerDay);
 * }
 */
export async function loadOnboardingStep4(
  clerkUserId: string
): Promise<DietaryPreferencesData | null> {
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

    // Load dietary patterns (restrictions)
    const { data: restrictions } = await supabaseAdmin
      .from("user_restriction")
      .select("name")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load cuisines
    const { data: cuisines } = await supabaseAdmin
      .from("user_cuisine")
      .select("name")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load disliked ingredients
    const { data: dislikedIngredients } = await supabaseAdmin
      .from("user_disliked_ingredient")
      .select("name")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load favorite ingredients
    const { data: favoriteIngredients } = await supabaseAdmin
      .from("user_favorite_ingredient")
      .select("name")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load settings (meals_per_day, water_intake)
    const { data: settings } = await supabaseAdmin
      .from("user_settings")
      .select("meals_per_day, water_intake")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    // Return data
    return {
      dietaryPatterns: restrictions ? restrictions.map((r) => r.name) : [],
      cuisines: cuisines ? cuisines.map((c) => c.name) : [],
      ingredientsToAvoid: dislikedIngredients
        ? decryptIngredients(dislikedIngredients, user.encryption_salt, clerkUserId)
        : [],
      ingredientsToInclude: favoriteIngredients
        ? decryptIngredients(favoriteIngredients, user.encryption_salt, clerkUserId)
        : [],
      mealsPerDay: settings?.meals_per_day || null,
      waterIntake: settings?.water_intake || null,
    };
  } catch (error) {
    console.error("Error loading onboarding step 4:", error);
    return null;
  }
}

/**
 * Exercise Preferences Data Interface
 */
export interface ExercisePreferencesData {
  experienceLevel: string;
  preferredTrainingTypes?: string[];
  equipmentAvailability: string;
}

/**
 * Saves Step 5 data (Exercise Preferences) to database
 *
 * @param clerkUserId - The Clerk user ID
 * @param exerciseData - Exercise preferences data
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep5('user_123', {
 *   experienceLevel: 'intermediate',
 *   preferredTrainingTypes: ['Strength', 'Cardio'],
 *   equipmentAvailability: 'home_equipment',
 * });
 */
export async function saveOnboardingStep5(
  clerkUserId: string,
  exerciseData: ExercisePreferencesData
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

    // 1. Training Preference (experience_level, time_per_session, preferred_time_of_day)
    // Check if training preference already exists
    const { data: existingTrainingPref } = await supabaseAdmin
      .from("user_training_preference")
      .select("id")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    if (existingTrainingPref) {
      // Update existing training preference
      const { error: trainingPrefError } = await supabaseAdmin
        .from("user_training_preference")
        .update({
          experience_level: exerciseData.experienceLevel,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (trainingPrefError) {
        throw new Error(`Failed to update training preference: ${trainingPrefError.message}`);
      }
    } else {
      // Insert new training preference
      const { error: trainingPrefError } = await supabaseAdmin
        .from("user_training_preference")
        .insert({
          user_id: user.id,
          experience_level: exerciseData.experienceLevel,
        });

      if (trainingPrefError) {
        throw new Error(`Failed to insert training preference: ${trainingPrefError.message}`);
      }
    }

    // 2. Preferred Training Types (user_exercise_preference)
    // Soft delete existing exercise preferences
    await supabaseAdmin
      .from("user_exercise_preference")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new training types if any
    if (exerciseData.preferredTrainingTypes && exerciseData.preferredTrainingTypes.length > 0) {
      const trainingTypesToInsert = exerciseData.preferredTrainingTypes.map((type) => ({
        user_id: user.id,
        name: type, // NOT encrypted (predefined options)
      }));

      const { error: trainingTypesError } = await supabaseAdmin
        .from("user_exercise_preference")
        .insert(trainingTypesToInsert);

      if (trainingTypesError) {
        throw new Error(`Failed to insert training types: ${trainingTypesError.message}`);
      }
    }

    // 3. Equipment Availability (user_equipment_access)
    // Soft delete existing equipment access
    await supabaseAdmin
      .from("user_equipment_access")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert equipment availability
    const { error: equipmentError } = await supabaseAdmin
      .from("user_equipment_access")
      .insert({
        user_id: user.id,
        name: exerciseData.equipmentAvailability, // NOT encrypted (predefined option)
      });

    if (equipmentError) {
      throw new Error(`Failed to insert equipment availability: ${equipmentError.message}`);
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 5:", error);
    return false;
  }
}

/**
 * Loads Step 5 data (Exercise Preferences) from database
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Exercise preferences data, or null if not found
 *
 * @example
 * const step5Data = await loadOnboardingStep5('user_123');
 * if (step5Data) {
 *   console.log('Experience level:', step5Data.experienceLevel);
 *   console.log('Training types:', step5Data.preferredTrainingTypes);
 * }
 */
export async function loadOnboardingStep5(
  clerkUserId: string
): Promise<ExercisePreferencesData | null> {
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

    // Load training preference
    const { data: trainingPref } = await supabaseAdmin
      .from("user_training_preference")
      .select("experience_level")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    // Load exercise preferences (training types)
    const { data: exercisePrefs } = await supabaseAdmin
      .from("user_exercise_preference")
      .select("name")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Load equipment access
    const { data: equipmentAccess } = await supabaseAdmin
      .from("user_equipment_access")
      .select("name")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Return data
    return {
      experienceLevel: trainingPref?.experience_level || "beginner",
      preferredTrainingTypes: exercisePrefs ? exercisePrefs.map((p) => p.name) : [],
      equipmentAvailability: equipmentAccess?.[0]?.name || "none",
    };
  } catch (error) {
    console.error("Error loading onboarding step 5:", error);
    return null;
  }
}

/**
 * Availability Data Interface
 */
export interface AvailabilityData {
  daysAvailable: string[];
  timePerSession: number;
  preferredTimeOfDay: string;
  additionalNotes?: string | null;
}

/**
 * Saves Step 6 data (Availability & Schedule) to database
 *
 * @param clerkUserId - The Clerk user ID
 * @param availabilityData - Availability and schedule data
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep6('user_123', {
 *   daysAvailable: ['monday', 'wednesday', 'friday'],
 *   timePerSession: 60,
 *   preferredTimeOfDay: 'morning',
 *   additionalNotes: 'Prefer early morning sessions',
 * });
 */
export async function saveOnboardingStep6(
  clerkUserId: string,
  availabilityData: AvailabilityData
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

    // 1. Update Training Preference (time_per_session, preferred_time_of_day, additional_notes)
    // Check if training preference already exists
    const { data: existingTrainingPref } = await supabaseAdmin
      .from("user_training_preference")
      .select("id")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    // Encrypt additional notes if provided
    const additionalNotes = availabilityData.additionalNotes
      ? encryptInjuries(
          [availabilityData.additionalNotes],
          user.encryption_salt,
          clerkUserId
        )[0]?.name || null
      : null;

    if (existingTrainingPref) {
      // Update existing training preference
      const { error: trainingPrefError } = await supabaseAdmin
        .from("user_training_preference")
        .update({
          time_per_session_min: availabilityData.timePerSession,
          time_per_session_max: availabilityData.timePerSession,
          preferred_time_of_day: availabilityData.preferredTimeOfDay,
          additional_notes: additionalNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (trainingPrefError) {
        throw new Error(`Failed to update training preference: ${trainingPrefError.message}`);
      }
    } else {
      // Insert new training preference
      const { error: trainingPrefError } = await supabaseAdmin
        .from("user_training_preference")
        .insert({
          user_id: user.id,
          time_per_session_min: availabilityData.timePerSession,
          time_per_session_max: availabilityData.timePerSession,
          preferred_time_of_day: availabilityData.preferredTimeOfDay,
          additional_notes: additionalNotes,
        });

      if (trainingPrefError) {
        throw new Error(`Failed to insert training preference: ${trainingPrefError.message}`);
      }
    }

    // 2. Days Available (user_availability)
    // Soft delete existing availability
    await supabaseAdmin
      .from("user_availability")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Insert new availability days
    if (availabilityData.daysAvailable && availabilityData.daysAvailable.length > 0) {
      const daysToInsert = availabilityData.daysAvailable.map((day) => ({
        user_id: user.id,
        day_of_week: day, // NOT encrypted (predefined options)
      }));

      const { error: daysError } = await supabaseAdmin
        .from("user_availability")
        .insert(daysToInsert);

      if (daysError) {
        throw new Error(`Failed to insert availability days: ${daysError.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 6:", error);
    return false;
  }
}

/**
 * Loads Step 6 data (Availability & Schedule) from database
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Availability data, or null if not found
 *
 * @example
 * const step6Data = await loadOnboardingStep6('user_123');
 * if (step6Data) {
 *   console.log('Days available:', step6Data.daysAvailable);
 *   console.log('Session time:', step6Data.timePerSession);
 * }
 */
export async function loadOnboardingStep6(
  clerkUserId: string
): Promise<AvailabilityData | null> {
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

    // Load training preference
    const { data: trainingPref } = await supabaseAdmin
      .from("user_training_preference")
      .select("time_per_session_min, preferred_time_of_day, additional_notes")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    // Load availability days
    const { data: availability } = await supabaseAdmin
      .from("user_availability")
      .select("day_of_week")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    // Decrypt additional notes if present
    const decryptedNotes = trainingPref?.additional_notes
      ? decryptInjuries(
          [{ name: trainingPref.additional_notes, details: null }],
          user.encryption_salt,
          clerkUserId
        )[0] || null
      : null;

    // Return data
    return {
      daysAvailable: availability ? availability.map((a) => a.day_of_week) : [],
      timePerSession: trainingPref?.time_per_session_min || 45,
      preferredTimeOfDay: trainingPref?.preferred_time_of_day || "morning",
      additionalNotes: decryptedNotes || null,
    };
  } catch (error) {
    console.error("Error loading onboarding step 6:", error);
    return null;
  }
}

/**
 * Cooking Preferences Data Interface
 */
export interface CookingPreferencesData {
  cookingSkillLevel: string;
  cookTimeRange: string;
  cookingForPeople: number;
  shoppingFrequency: string;
}

/**
 * Saves Step 7 data (Cooking Preferences) to database
 *
 * @param clerkUserId - The Clerk user ID
 * @param cookingData - Cooking preferences data
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep7('user_123', {
 *   cookingSkillLevel: 'intermediate',
 *   cookTimeRange: '30_45',
 *   cookingForPeople: 2,
 *   shoppingFrequency: 'weekly',
 * });
 */
export async function saveOnboardingStep7(
  clerkUserId: string,
  cookingData: CookingPreferencesData
): Promise<boolean> {
  try {
    // Get user
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      throw new Error("User not found");
    }

    // Map cook time range to min/max values
    const cookTimeMap: Record<string, { min: number; max: number }> = {
      under_15: { min: 0, max: 15 },
      "15_30": { min: 15, max: 30 },
      "30_45": { min: 30, max: 45 },
      "45_60": { min: 45, max: 60 },
      over_60: { min: 60, max: 120 },
    };

    const cookTime = cookTimeMap[cookingData.cookTimeRange];

    // Check if cooking preference already exists
    const { data: existingPref } = await supabaseAdmin
      .from("user_cooking_preference")
      .select("id")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    if (existingPref) {
      // Update existing preference
      const { error } = await supabaseAdmin
        .from("user_cooking_preference")
        .update({
          skill_level: cookingData.cookingSkillLevel,
          cook_time_min: cookTime.min,
          cook_time_max: cookTime.max,
          cooking_for_people: cookingData.cookingForPeople,
          shopping_frequency: cookingData.shoppingFrequency,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) {
        throw new Error(`Failed to update cooking preference: ${error.message}`);
      }
    } else {
      // Insert new preference
      const { error } = await supabaseAdmin
        .from("user_cooking_preference")
        .insert({
          user_id: user.id,
          skill_level: cookingData.cookingSkillLevel,
          cook_time_min: cookTime.min,
          cook_time_max: cookTime.max,
          cooking_for_people: cookingData.cookingForPeople,
          shopping_frequency: cookingData.shoppingFrequency,
        });

      if (error) {
        throw new Error(`Failed to insert cooking preference: ${error.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 7:", error);
    return false;
  }
}

/**
 * Loads Step 7 data (Cooking Preferences) from database
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Cooking preferences data, or null if not found
 *
 * @example
 * const step7Data = await loadOnboardingStep7('user_123');
 * if (step7Data) {
 *   console.log('Cooking skill:', step7Data.cookingSkillLevel);
 * }
 */
export async function loadOnboardingStep7(
  clerkUserId: string
): Promise<CookingPreferencesData | null> {
  try {
    // Get user
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      return null;
    }

    // Load cooking preference
    const { data: cookingPref } = await supabaseAdmin
      .from("user_cooking_preference")
      .select("skill_level, cook_time_min, cook_time_max, cooking_for_people, shopping_frequency")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .single();

    if (!cookingPref) {
      return null;
    }

    // Map cook time values back to range
    let cookTimeRange = "30_45"; // default
    if (cookingPref.cook_time_max <= 15) {
      cookTimeRange = "under_15";
    } else if (cookingPref.cook_time_max <= 30) {
      cookTimeRange = "15_30";
    } else if (cookingPref.cook_time_max <= 45) {
      cookTimeRange = "30_45";
    } else if (cookingPref.cook_time_max <= 60) {
      cookTimeRange = "45_60";
    } else {
      cookTimeRange = "over_60";
    }

    return {
      cookingSkillLevel: cookingPref.skill_level || "beginner",
      cookTimeRange,
      cookingForPeople: cookingPref.cooking_for_people || 1,
      shoppingFrequency: cookingPref.shopping_frequency || "weekly",
    };
  } catch (error) {
    console.error("Error loading onboarding step 7:", error);
    return null;
  }
}

/**
 * Notification Settings Data Interface
 */
export interface NotificationSettingsData {
  mealsEnabled: boolean;
  workoutsEnabled: boolean;
  remindersEnabled: boolean;
  quietHoursStart: string | null;
  quietHoursEnd: string | null;
}

/**
 * Saves Step 8 data (Notification Settings) to database
 *
 * @param clerkUserId - The Clerk user ID
 * @param notificationData - Notification settings data
 * @returns Success status
 *
 * @example
 * const success = await saveOnboardingStep8('user_123', {
 *   mealsEnabled: true,
 *   workoutsEnabled: true,
 *   remindersEnabled: true,
 *   quietHoursStart: '22:00',
 *   quietHoursEnd: '07:00',
 * });
 */
export async function saveOnboardingStep8(
  clerkUserId: string,
  notificationData: NotificationSettingsData
): Promise<boolean> {
  try {
    // Get user
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      throw new Error("User not found");
    }

    // Upsert notification settings (user_id is primary key)
    const { error } = await supabaseAdmin
      .from("user_notification_settings")
      .upsert(
        {
          user_id: user.id,
          meals_enabled: notificationData.mealsEnabled,
          workouts_enabled: notificationData.workoutsEnabled,
          reminders_enabled: notificationData.remindersEnabled,
          quiet_hours_start: notificationData.quietHoursStart || null,
          quiet_hours_end: notificationData.quietHoursEnd || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (error) {
      throw new Error(`Failed to save notification settings: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Error saving onboarding step 8:", error);
    return false;
  }
}

/**
 * Loads Step 8 data (Notification Settings) from database
 *
 * @param clerkUserId - The Clerk user ID
 * @returns Notification settings data, or null if not found
 *
 * @example
 * const step8Data = await loadOnboardingStep8('user_123');
 * if (step8Data) {
 *   console.log('Meals enabled:', step8Data.mealsEnabled);
 * }
 */
export async function loadOnboardingStep8(
  clerkUserId: string
): Promise<NotificationSettingsData | null> {
  try {
    // Get user
    const { data: user } = await supabaseAdmin
      .from("user_user")
      .select("id")
      .eq("clerk_user_id", clerkUserId)
      .is("deleted_at", null)
      .single();

    if (!user) {
      return null;
    }

    // Load notification settings
    const { data: settings } = await supabaseAdmin
      .from("user_notification_settings")
      .select("meals_enabled, workouts_enabled, reminders_enabled, quiet_hours_start, quiet_hours_end")
      .eq("user_id", user.id)
      .single();

    if (!settings) {
      // Return defaults if no settings exist yet
      return {
        mealsEnabled: true,
        workoutsEnabled: true,
        remindersEnabled: true,
        quietHoursStart: null,
        quietHoursEnd: null,
      };
    }

    // Format time values if they exist
    const formatTime = (time: any): string | null => {
      if (!time) return null;
      // time comes from DB as "HH:MM:SS", we want "HH:MM"
      if (typeof time === "string") {
        return time.substring(0, 5);
      }
      return null;
    };

    return {
      mealsEnabled: settings.meals_enabled ?? true,
      workoutsEnabled: settings.workouts_enabled ?? true,
      remindersEnabled: settings.reminders_enabled ?? true,
      quietHoursStart: formatTime(settings.quiet_hours_start),
      quietHoursEnd: formatTime(settings.quiet_hours_end),
    };
  } catch (error) {
    console.error("Error loading onboarding step 8:", error);
    return null;
  }
}
