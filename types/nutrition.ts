/**
 * Nutrition and Meal Types
 */

export interface Macros {
  carbs: number; // grams
  protein: number; // grams
  fat: number; // grams
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  macros: Macros;
  imageUrl?: string; // Optional for future use
  time?: string; // Optional meal time
}

export type MealType =
  | "breakfast"
  | "morning_snack"
  | "lunch"
  | "afternoon_snack"
  | "dinner"
  | "evening_snack";

export interface DailyMealPlan {
  date: string; // ISO date string
  meals: Meal[];
}

/**
 * Scheduled Meal - Extends Meal with scheduling information
 */
export interface ScheduledMeal extends Meal {
  date: string; // ISO date string "2025-11-10"
  time: string; // Time in HH:mm format "08:00", "13:00"
  type: MealType; // Type of meal (breakfast, lunch, etc.)
}

/**
 * Weekly Meal Plan
 */
export interface WeeklyMealPlan {
  weekStart: string; // ISO date string for Monday of the week
  meals: ScheduledMeal[];
}

/**
 * View mode for meal plan calendar
 */
export type MealPlanViewMode = "day" | "week" | "month";
