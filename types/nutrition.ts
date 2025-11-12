/**
 * Nutrition and Meal Types
 */

import { Ingredient } from "./grocery";

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
  ingredients?: Ingredient[]; // Optional list of ingredients
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

/**
 * Media item type (image or video)
 */
export type MediaType = "image" | "video";

/**
 * Media item for meal gallery
 */
export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnail?: string; // Optional thumbnail for videos
}

/**
 * Meal ingredient (simplified for display)
 */
export interface MealIngredient {
  id: string;
  name: string;
  quantity: number;
  unit: string; // "g", "ml", "tbsp", "cups", etc.
  icon?: string; // Emoji icon for visual representation
}

/**
 * Preparation step
 */
export interface PreparationStep {
  id: string;
  stepNumber: number;
  instruction: string;
}

/**
 * Detailed meal information for the detail view
 */
export interface MealDetail extends Meal {
  description: string;
  type: MealType; // breakfast, lunch, dinner, etc.
  gallery: MediaItem[];
  ingredients: MealIngredient[];
  preparationSteps: PreparationStep[];
  servings: number;
  prepTime: number; // minutes
  cookTime: number; // minutes
}
