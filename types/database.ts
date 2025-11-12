/**
 * Database Schema Types
 *
 * TypeScript types that mirror the Supabase database schema.
 * These types represent the actual database structure after migrations.
 *
 * Generated from schema with migration: add_missing_fields_from_mock_data.sql
 * Last updated: 2025-11-12
 */

/**
 * ============================================================================
 * MEALS DOMAIN - Database Types
 * ============================================================================
 */

/**
 * Meal type enum (matches database constraint)
 */
export type DbMealType =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "morning_snack"
  | "afternoon_snack"
  | "snack";

/**
 * meal_recipe table
 */
export interface DbMealRecipe {
  id: string; // uuid
  user_id: string; // uuid FK
  name: string;
  description: string | null;
  servings: number;
  meal_type: DbMealType | null; // ADDED IN MIGRATION
  prep_time_minutes: number | null; // ADDED IN MIGRATION
  cook_time_minutes: number | null; // ADDED IN MIGRATION
  image_bucket: string;
  image_path: string | null;
  image_alt: string | null;
  source_url: string | null;
  energy_kcal_per_serving: number | null;
  protein_g_per_serving: number | null;
  carb_g_per_serving: number | null;
  fat_g_per_serving: number | null;
  fiber_g_per_serving: number | null;
  sugar_g_per_serving: number | null;
  saturated_fat_g_per_serving: number | null;
  sodium_mg_per_serving: number | null;
  micros_per_serving: Record<string, any> | null; // jsonb
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * meal_ingredient table
 */
export interface DbMealIngredient {
  id: string; // uuid
  name: string; // UNIQUE
  description: string | null;
  default_unit: string;
  icon_emoji: string | null; // ADDED IN MIGRATION
  energy_kcal_per_gram: number | null;
  protein_g_per_gram: number | null;
  carb_g_per_gram: number | null;
  fat_g_per_gram: number | null;
  fiber_g_per_gram: number | null;
  sugar_g_per_gram: number | null;
  saturated_fat_g_per_gram: number | null;
  sodium_mg_per_gram: number | null;
  micros_per_gram: Record<string, any> | null; // jsonb
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * meal_recipe_ingredient table (junction)
 */
export interface DbMealRecipeIngredient {
  id: string; // uuid
  recipe_id: string; // uuid FK
  ingredient_id: string; // uuid FK
  quantity: number;
  unit: string;
  grams: number | null;
  order_index: number;
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * meal_recipe_step table
 */
export interface DbMealRecipeStep {
  id: string; // uuid
  recipe_id: string; // uuid FK
  order_index: number;
  instruction: string;
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * Media type enum (matches database type definition)
 */
export type DbMediaType = "image" | "video";

/**
 * Media role enum (matches database type definition)
 */
export type DbMediaRole = "gallery" | "hero" | "thumbnail" | "demonstration";

/**
 * meal_recipe_media table
 */
export interface DbMealRecipeMedia {
  id: string; // uuid
  recipe_id: string; // uuid FK
  recipe_step_id: string | null; // uuid FK (optional)
  type: DbMediaType;
  role: DbMediaRole;
  storage_bucket: string;
  storage_path: string;
  public_url: string | null;
  alt_text: string | null;
  caption: string | null;
  sort_index: number;
  is_primary: boolean;
  width_px: number | null;
  height_px: number | null;
  duration_s: number | null;
  format: string | null;
  bytes: number | null;
  checksum: string | null;
  thumbnail_path: string | null;
  poster_path: string | null;
  source_url: string | null;
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * ============================================================================
 * WORKOUTS DOMAIN - Database Types
 * ============================================================================
 */

/**
 * Exercise category enum (matches database constraint)
 */
export type DbExerciseCategory = "warm-up" | "main" | "stretch" | "cooldown";

/**
 * workout_exercise table
 */
export interface DbWorkoutExercise {
  id: string; // uuid
  name: string;
  description: string | null;
  primary_muscle: string | null;
  equipment: string | null;
  category: DbExerciseCategory | null; // ADDED IN MIGRATION
  tips_json: string[] | null; // ADDED IN MIGRATION (jsonb array)
  how_to_perform_summary: string | null;
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * workout_exercise_media table
 */
export interface DbWorkoutExerciseMedia {
  id: string; // uuid
  exercise_id: string; // uuid FK
  type: DbMediaType;
  role: DbMediaRole;
  storage_bucket: string;
  storage_path: string;
  public_url: string | null;
  alt_text: string | null;
  caption: string | null;
  sort_index: number;
  is_primary: boolean;
  width_px: number | null;
  height_px: number | null;
  duration_s: number | null;
  format: string | null;
  bytes: number | null;
  thumbnail_path: string | null;
  poster_path: string | null;
  source_url: string | null;
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * workout_exercise_step table
 */
export interface DbWorkoutExerciseStep {
  id: string; // uuid
  exercise_id: string; // uuid FK
  order_index: number;
  instruction: string;
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * workout_set table
 */
export interface DbWorkoutSet {
  id: string; // uuid
  user_id: string; // uuid FK
  block_exercise_id: string; // uuid FK
  set_index: number;
  reps_min: number | null;
  reps_max: number | null;
  rest_s: number | null;
  weight: number | null;
  rir: number | null;
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * ============================================================================
 * GROCERY LISTS DOMAIN - Database Types
 * ============================================================================
 */

/**
 * Purchase frequency enum (matches database constraint)
 */
export type DbPurchaseFrequency = "daily" | "weekly" | "biweekly" | "monthly";

/**
 * Storage type enum (matches database constraint)
 */
export type DbStorageType = "fresh" | "frozen" | "pantry" | "refrigerated";

/**
 * meal_grocery_list table
 */
export interface DbMealGroceryList {
  id: string; // uuid
  user_id: string; // uuid FK
  meal_plan_id: string; // uuid FK
  name: string | null;
  period_start: string; // date
  period_end: string; // date
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * meal_grocery_list_item table
 */
export interface DbMealGroceryListItem {
  id: string; // uuid
  grocery_list_id: string; // uuid FK
  ingredient_id: string; // uuid FK
  total_quantity: number;
  unit: string;
  grams: number | null;
  category: string | null;
  notes: string | null;
  purchased_quantity: number | null;
  is_purchased: boolean;
  is_custom: boolean; // ADDED IN MIGRATION
  purchase_frequency: DbPurchaseFrequency | null; // ADDED IN MIGRATION
  storage_type: DbStorageType | null; // ADDED IN MIGRATION
  created_at: string; // timestamp
  updated_at: string; // timestamp
  deleted_at: string | null; // timestamp
}

/**
 * meal_grocery_list_item_source table (NEW - junction table)
 * Links grocery list items to the meals (recipes) they originate from
 */
export interface DbMealGroceryListItemSource {
  id: string; // uuid
  grocery_list_item_id: string; // uuid FK → meal_grocery_list_item
  meal_recipe_id: string; // uuid FK → meal_recipe
  created_at: string; // timestamp
}

/**
 * ============================================================================
 * SYSTEM DOMAIN - Database Types
 * ============================================================================
 */

/**
 * system_daily_message table
 */
export interface DbSystemDailyMessage {
  id: string; // uuid
  message_text: string;
  day_of_month: number; // 1-30
  is_active: boolean;
  created_at: string; // timestamp
  updated_at: string; // timestamp
}

/**
 * ============================================================================
 * UTILITY TYPES
 * ============================================================================
 */

/**
 * Insert types (omit auto-generated fields)
 */
export type DbMealRecipeInsert = Omit<
  DbMealRecipe,
  "id" | "created_at" | "updated_at"
>;
export type DbMealIngredientInsert = Omit<
  DbMealIngredient,
  "id" | "created_at" | "updated_at"
>;
export type DbWorkoutExerciseInsert = Omit<
  DbWorkoutExercise,
  "id" | "created_at" | "updated_at"
>;
export type DbMealGroceryListItemInsert = Omit<
  DbMealGroceryListItem,
  "id" | "created_at" | "updated_at"
>;
export type DbMealGroceryListItemSourceInsert = Omit<
  DbMealGroceryListItemSource,
  "id" | "created_at"
>;

/**
 * Update types (all fields optional except ID)
 */
export type DbMealRecipeUpdate = Partial<Omit<DbMealRecipe, "id" | "created_at">> & {
  id: string;
};
export type DbMealIngredientUpdate = Partial<
  Omit<DbMealIngredient, "id" | "created_at">
> & { id: string };
export type DbWorkoutExerciseUpdate = Partial<
  Omit<DbWorkoutExercise, "id" | "created_at">
> & { id: string };
export type DbMealGroceryListItemUpdate = Partial<
  Omit<DbMealGroceryListItem, "id" | "created_at">
> & { id: string };

/**
 * ============================================================================
 * QUERY RESULT TYPES (with joins)
 * ============================================================================
 */

/**
 * Full meal with all related data
 */
export interface DbMealRecipeFull extends DbMealRecipe {
  ingredients: Array<
    DbMealRecipeIngredient & {
      ingredient: DbMealIngredient;
    }
  >;
  steps: DbMealRecipeStep[];
  media: DbMealRecipeMedia[];
}

/**
 * Full exercise with all related data
 */
export interface DbWorkoutExerciseFull extends DbWorkoutExercise {
  media: DbWorkoutExerciseMedia[];
  steps: DbWorkoutExerciseStep[];
}

/**
 * Full grocery list item with sources
 */
export interface DbMealGroceryListItemFull extends DbMealGroceryListItem {
  ingredient: DbMealIngredient;
  sources: Array<{
    meal_recipe_id: string;
    meal_recipe_name: string;
  }>;
}

/**
 * ============================================================================
 * CONVERSION HELPERS (Mock Data ↔ Database)
 * ============================================================================
 */

/**
 * Map mock data meal type to database meal type
 */
export function mockMealTypeToDb(
  mockType: string
): DbMealType {
  return mockType as DbMealType;
}

/**
 * Map mock data exercise category to database category
 */
export function mockExerciseCategoryToDb(
  mockCategory: string
): DbExerciseCategory {
  return mockCategory as DbExerciseCategory;
}

/**
 * Map mock data storage type to database storage type
 */
export function mockStorageTypeToDb(
  mockStorage: string
): DbStorageType {
  return mockStorage as DbStorageType;
}

/**
 * Map mock data purchase frequency to database frequency
 */
export function mockPurchaseFrequencyToDb(
  mockFreq: string
): DbPurchaseFrequency {
  return mockFreq as DbPurchaseFrequency;
}
