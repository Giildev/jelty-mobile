/**
 * Meal Plan Progress Service
 * Handles queries to meal_plan_progress table
 */

import { supabase } from "./client";

export interface MealPlanProgress {
  id: string;
  user_id: string;
  status: "in_progress" | "completed";
  current_day: number;
  total_days: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Get meal plan progress for a user
 * Gets the most recent non-deleted progress record
 * @param userId - Supabase user ID
 * @returns MealPlanProgress or null if not found
 */
export async function getMealPlanProgress(
  userId: string
): Promise<MealPlanProgress | null> {
  try {
    const { data, error } = await supabase
      .from("meal_plan_progress")
      .select("*")
      .eq("user_id", userId)
      .is("deleted_at", null) // Only get records that haven't been deleted
      .order("created_at", { ascending: false }) // Get most recent first
      .limit(1)
      .single();

    if (error) {
      // If no rows found, return null instead of throwing
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }

    return data as MealPlanProgress;
  } catch (error) {
    console.error("[getMealPlanProgress] Error:", error);
    throw error;
  }
}

/**
 * Calculate progress percentage
 * @param progress - MealPlanProgress object
 * @returns Progress percentage (0-100)
 */
export function calculateProgressPercentage(
  progress: MealPlanProgress
): number {
  if (progress.total_days === 0) return 0;
  return Math.round((progress.current_day / progress.total_days) * 100);
}
