/**
 * API Response types
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Recipe/Meal API Response Types
 */

import { MealType } from "./nutrition";

/**
 * Recipe from API (list endpoint)
 */
export interface ApiRecipe {
  id: string;
  name: string;
  description: string;
  mealType: MealType;
  image: string;
  imageAlt: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  // Total macros for all servings
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  // Per serving macros
  caloriesPerServing: number;
  proteinPerServing: number;
  carbsPerServing: number;
  fatsPerServing: number;
  // Day scheduling info
  dayDate: string; // ISO date
  slotIndex: number;
  slotLabel: string;
}

/**
 * Recipes API Response (POST /api/v1/agents/chef/recipes)
 */
export interface RecipesApiResponse {
  success: boolean;
  data: {
    mealPlanId: string;
    recipes: ApiRecipe[];
    total: number;
  };
}

/**
 * Recipe Ingredient from API
 */
export interface ApiRecipeIngredient {
  id: string;
  name: string;
  icon: string | null;
  quantity: number;
  unit: string;
  grams: number;
  nutritionPerGram: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
}

/**
 * Recipe Step from API
 */
export interface ApiRecipeStep {
  number: number;
  instruction: string;
}

/**
 * Recipe Media from API
 */
export interface ApiRecipeMedia {
  id?: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

/**
 * Recipe Day Info from API
 */
export interface ApiRecipeDayInfo {
  date: string; // ISO date
  mealPlanId: string;
  mealPlanName: string;
  slotIndex: number;
  slotLabel: string;
}

/**
 * Recipe Macros from API
 */
export interface ApiRecipeMacros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  sodium?: number;
}

/**
 * Recipe Micros from API
 */
export interface ApiRecipeMicros {
  potassium?: number;
  calcium?: number;
  iron?: number;
  vitaminD?: number;
  vitaminB12?: number;
  omega3?: number;
}

/**
 * Detailed Recipe from API (GET /api/v1/agents/chef/recipe/:id)
 */
export interface ApiRecipeDetail {
  id: string;
  name: string;
  description: string;
  mealType: MealType;
  cuisineType: string | null;
  image: string;
  imageAlt: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  macros: ApiRecipeMacros;
  macrosPerServing: ApiRecipeMacros;
  micros: ApiRecipeMicros;
  microsPerServing: ApiRecipeMicros;
  ingredients: ApiRecipeIngredient[];
  steps: ApiRecipeStep[];
  dayInfo: ApiRecipeDayInfo;
  media: ApiRecipeMedia[];
  createdAt: string;
}

/**
 * Recipe Detail API Response (GET /api/v1/agents/chef/recipe/:id)
 */
export interface RecipeDetailApiResponse {
  success: boolean;
  data: ApiRecipeDetail;
}
