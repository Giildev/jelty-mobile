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
