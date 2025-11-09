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
