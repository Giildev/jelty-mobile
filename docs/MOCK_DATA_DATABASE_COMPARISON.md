# Mock Data vs Database Schema - Comprehensive Comparison Report

**Project:** Jelty Mobile App
**Date:** November 12, 2025
**Author:** Claude Code
**Purpose:** Compare mobile app mock data with Supabase database schema and identify gaps

---

## Executive Summary

This report analyzes the alignment between the Jelty React Native app's mock data (used for UI development) and the Supabase PostgreSQL database schema. The analysis covers three main domains: **Meals**, **Workouts**, and **Grocery Lists**.

### Key Findings

✅ **Overall Structure:** Well-aligned
⚠️ **Missing Fields:** 11 fields identified
🆕 **New Table Required:** 1 junction table
📋 **Migration Status:** SQL migration file created

### Actions Required

1. **Run SQL Migration:** Execute `migrations/add_missing_fields_from_mock_data.sql` in Supabase
2. **Update TypeScript Types:** Reflect database changes in type definitions
3. **Test Data Sync:** Verify mock data can be properly inserted into database

---

## Table of Contents

1. [Meals Domain Analysis](#1-meals-domain-analysis)
2. [Workouts Domain Analysis](#2-workouts-domain-analysis)
3. [Grocery Lists Domain Analysis](#3-grocery-lists-domain-analysis)
4. [Summary of Changes](#4-summary-of-changes)
5. [Migration Instructions](#5-migration-instructions)

---

## 1. Meals Domain Analysis

### 1.1 Mock Data Structure

**File:** `constants/mockData.ts`
**Export:** `MEAL_DETAILS_MOCK: MealDetail[]`
**Count:** 15+ detailed recipes

**TypeScript Interface:**
```typescript
interface MealDetail {
  id: string;
  name: string;
  calories: number;
  macros: { carbs: number; protein: number; fat: number };
  description: string;
  type: string; // breakfast, lunch, dinner, morning_snack, afternoon_snack
  servings: number;
  prepTime: number;
  cookTime: number;
  gallery: MediaItem[];
  ingredients: MealIngredient[];
  preparationSteps: PreparationStep[];
}
```

### 1.2 Database Schema

**Tables Involved:**
- `meal_recipe` - Main recipes table
- `meal_recipe_media` - Gallery images/videos
- `meal_recipe_ingredient` - Recipe ingredients
- `meal_recipe_step` - Cooking instructions
- `meal_ingredient` - Master ingredient catalog

### 1.3 Field-by-Field Comparison

| Mock Data Field | Database Column | Status | Notes |
|----------------|----------------|--------|-------|
| `id` | `id` (uuid) | ✅ Match | UUID in DB, string in mock |
| `name` | `name` (text) | ✅ Match | Direct mapping |
| `calories` | `energy_kcal_per_serving` | ✅ Match | Different naming |
| `macros.carbs` | `carb_g_per_serving` | ✅ Match | Nested in mock, flat in DB |
| `macros.protein` | `protein_g_per_serving` | ✅ Match | Nested in mock, flat in DB |
| `macros.fat` | `fat_g_per_serving` | ✅ Match | Nested in mock, flat in DB |
| `description` | `description` | ✅ Match | Direct mapping |
| `type` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `servings` | `servings` | ✅ Match | Direct mapping |
| `prepTime` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `cookTime` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `gallery[]` | `meal_recipe_media` | ✅ Match | Separate table in DB |
| `ingredients[]` | `meal_recipe_ingredient` | ✅ Match | Separate table in DB |
| `ingredients[].icon` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `preparationSteps[]` | `meal_recipe_step` | ✅ Match | Separate table in DB |

### 1.4 Additional Database Fields (Not in Mock)

| Database Column | Purpose | Required? |
|----------------|---------|-----------|
| `user_id` | Recipe ownership | Yes (FK) |
| `image_bucket` | Primary image storage | Optional |
| `image_path` | Primary image path | Optional |
| `source_url` | Recipe source URL | Optional |
| `fiber_g_per_serving` | Nutritional info | Optional |
| `sugar_g_per_serving` | Nutritional info | Optional |
| `saturated_fat_g_per_serving` | Nutritional info | Optional |
| `sodium_mg_per_serving` | Nutritional info | Optional |
| `micros_per_serving` | Micronutrients (JSONB) | Optional |

### 1.5 Recommendations for Meals

1. **Migration Applied:** Added `meal_type`, `prep_time_minutes`, `cook_time_minutes` to `meal_recipe`
2. **Migration Applied:** Added `icon_emoji` to `meal_ingredient`
3. **Future Enhancement:** Consider adding detailed nutritional info (fiber, sugar, etc.) to mock data
4. **Data Quality:** Ensure all recipes have `user_id` when inserting into database

---

## 2. Workouts Domain Analysis

### 2.1 Mock Data Structure

**File:** `constants/mockData.ts`
**Export:** `EXERCISE_DETAILS_MOCK: ExerciseDetail[]`
**Count:** 50+ detailed exercises

**TypeScript Interface:**
```typescript
interface ExerciseDetail {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rir: number;
  restTime: number;
  description: string;
  primaryMuscle: string;
  equipment: string;
  category: string; // warm-up, main, stretch
  muscleGroup: string;
  gallery: ExerciseMediaItem[];
  instructions: {
    sets: number;
    repsMin: number;
    repsMax: number;
    rir: number;
    restTimeSeconds: number;
  };
  howToPerformSteps: HowToPerformStep[];
  tips: string[]; // Array of form tips
}
```

### 2.2 Database Schema

**Tables Involved:**
- `workout_exercise` - Main exercises catalog
- `workout_exercise_media` - Exercise images/videos
- `workout_exercise_step` - How-to-perform instructions
- `workout_set` - Sets/reps/RIR data (tied to workout blocks)

### 2.3 Field-by-Field Comparison

| Mock Data Field | Database Column | Status | Notes |
|----------------|----------------|--------|-------|
| `id` | `id` (uuid) | ✅ Match | UUID in DB, string in mock |
| `name` | `name` (text) | ✅ Match | Direct mapping |
| `description` | `description` (text) | ✅ Match | Direct mapping |
| `primaryMuscle` | `primary_muscle` (text) | ✅ Match | Direct mapping |
| `equipment` | `equipment` (text) | ✅ Match | Direct mapping |
| `category` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `muscleGroup` | `primary_muscle` | ✅ Match | Duplicate of primaryMuscle |
| `gallery[]` | `workout_exercise_media` | ✅ Match | Separate table in DB |
| `howToPerformSteps[]` | `workout_exercise_step` | ✅ Match | Separate table in DB |
| `tips[]` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `sets` (root) | `workout_set.set_index` | ⚠️ Different | Stored per workout block |
| `reps` (root) | `workout_set.reps_min/max` | ⚠️ Different | Stored per workout block |
| `rir` (root) | `workout_set.rir` | ⚠️ Different | Stored per workout block |
| `restTime` (root) | `workout_set.rest_s` | ⚠️ Different | Stored per workout block |
| `instructions` | `workout_set` table | ⚠️ Different | Instructions tied to blocks |

### 2.4 Additional Database Fields (Not in Mock)

| Database Column | Purpose | Required? |
|----------------|---------|-----------|
| `how_to_perform_summary` | Quick summary text | Optional |
| `workout_set.user_id` | Set ownership | Yes (FK) |
| `workout_set.block_exercise_id` | Links to workout block | Yes (FK) |
| `workout_set.weight` | Weight used for exercise | Optional |

### 2.5 Recommendations for Workouts

1. **Migration Applied:** Added `category` (warm-up, main, stretch) to `workout_exercise`
2. **Migration Applied:** Added `tips_json` (JSONB array) to `workout_exercise`
3. **Architecture Note:** Sets/reps/RIR data lives in `workout_set` table (tied to user's workout blocks), not in the exercise master catalog
4. **Data Quality:** Mock data shows "default" sets/reps values; actual workouts will use `workout_set` records

---

## 3. Grocery Lists Domain Analysis

### 3.1 Mock Data Structure

**File:** `constants/mockData.ts`
**Export:** `MOCK_GROCERY_ITEMS: GroceryItem[]`
**Count:** 34 items across 7 categories

**TypeScript Interface:**
```typescript
interface GroceryItem {
  id: string;
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
  category: string; // vegetables, proteins, fruits, dairy, grains, condiments, other
  purchaseFrequency: string; // weekly, monthly
  storageType: string; // fresh, frozen, pantry
  isChecked: boolean;
  isCustom: boolean;
  mealSources: string[]; // Array of meal IDs
}
```

### 3.2 Database Schema

**Tables Involved:**
- `meal_grocery_list` - User grocery lists (with date ranges)
- `meal_grocery_list_item` - Individual items in lists
- `meal_ingredient` - Master ingredient catalog
- **NEW:** `meal_grocery_list_item_source` - Junction table (meals → items)

### 3.3 Field-by-Field Comparison

| Mock Data Field | Database Column | Status | Notes |
|----------------|----------------|--------|-------|
| `id` | `id` (uuid) | ✅ Match | UUID in DB, string in mock |
| `ingredientId` | `ingredient_id` (FK) | ✅ Match | Links to meal_ingredient |
| `name` | (via `ingredient_id`) | ✅ Match | Resolved through FK |
| `quantity` | `total_quantity` | ✅ Match | Direct mapping |
| `unit` | `unit` | ✅ Match | Direct mapping |
| `category` | `category` | ✅ Match | Direct mapping |
| `isChecked` | `is_purchased` | ✅ Match | Different naming |
| `isCustom` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `purchaseFrequency` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `storageType` | ❌ **MISSING** | ⚠️ Gap | **ADDED IN MIGRATION** |
| `mealSources[]` | ❌ **MISSING** | ⚠️ Gap | **NEW TABLE CREATED** |

### 3.4 Additional Database Fields (Not in Mock)

| Database Column | Purpose | Required? |
|----------------|---------|-----------|
| `grocery_list_id` | Links to parent list | Yes (FK) |
| `grams` | Quantity in grams | Optional |
| `notes` | User notes for item | Optional |
| `purchased_quantity` | Amount bought vs needed | Optional |
| `meal_grocery_list.meal_plan_id` | Links list to meal plan | Yes (FK) |
| `meal_grocery_list.period_start/end` | Date range for list | Yes |

### 3.5 New Table Created

**Table:** `meal_grocery_list_item_source`

This junction table links grocery items to the meals that require them, enabling the "meal sources" functionality in the mock data.

**Columns:**
- `id` (PK)
- `grocery_list_item_id` (FK → meal_grocery_list_item)
- `meal_recipe_id` (FK → meal_recipe)
- `created_at`

**Example Usage:**
```sql
-- Find all meals that need "Chicken Breast"
SELECT mr.name
FROM meal_recipe mr
JOIN meal_grocery_list_item_source src ON src.meal_recipe_id = mr.id
JOIN meal_grocery_list_item gli ON gli.id = src.grocery_list_item_id
WHERE gli.ingredient_id = (SELECT id FROM meal_ingredient WHERE name = 'Chicken Breast');
```

### 3.6 Recommendations for Grocery Lists

1. **Migration Applied:** Added `is_custom`, `purchase_frequency`, `storage_type` to `meal_grocery_list_item`
2. **Migration Applied:** Created `meal_grocery_list_item_source` junction table
3. **Future Enhancement:** Consider adding barcode scanning support (add `barcode` column)
4. **Data Quality:** Grocery lists must be linked to meal plans via `meal_plan_id`

---

## 4. Summary of Changes

### 4.1 Database Changes Applied

| Table | Fields Added | Type | Purpose |
|-------|-------------|------|---------|
| `meal_recipe` | `meal_type` | TEXT | Classify meals (breakfast, lunch, etc.) |
| `meal_recipe` | `prep_time_minutes` | INTEGER | Preparation time |
| `meal_recipe` | `cook_time_minutes` | INTEGER | Cooking time |
| `meal_ingredient` | `icon_emoji` | TEXT | Visual emoji icon for UI |
| `workout_exercise` | `category` | TEXT | Exercise classification (warm-up, main, stretch) |
| `workout_exercise` | `tips_json` | JSONB | Array of form tips |
| `meal_grocery_list_item` | `is_custom` | BOOLEAN | User-added vs auto-generated |
| `meal_grocery_list_item` | `purchase_frequency` | TEXT | Shopping frequency |
| `meal_grocery_list_item` | `storage_type` | TEXT | Storage location type |

### 4.2 New Tables Created

| Table | Purpose | Relationships |
|-------|---------|---------------|
| `meal_grocery_list_item_source` | Link grocery items to source meals | N:M junction (items ↔ recipes) |

### 4.3 Indexes Created

For query performance optimization:

- `idx_meal_recipe_meal_type` - Filter meals by type
- `idx_workout_exercise_category` - Filter exercises by category
- `idx_meal_grocery_list_item_storage_type` - Filter items by storage
- `idx_meal_grocery_list_item_purchase_frequency` - Filter by frequency
- `idx_meal_grocery_list_item_is_custom` - Filter custom items
- `idx_meal_grocery_list_item_source_item` - Junction table lookups
- `idx_meal_grocery_list_item_source_recipe` - Reverse junction lookups

---

## 5. Migration Instructions

### 5.1 Running the Migration

**File:** `migrations/add_missing_fields_from_mock_data.sql`

**Steps:**

1. **Backup Database** (if production):
   ```bash
   # Via Supabase CLI
   supabase db dump -f backup_$(date +%Y%m%d).sql
   ```

2. **Review Migration File**:
   - Open `migrations/add_missing_fields_from_mock_data.sql`
   - Review all ALTER TABLE statements
   - Verify constraints and default values

3. **Execute Migration** (choose one method):

   **Option A: Supabase Dashboard**
   - Go to Supabase Dashboard → SQL Editor
   - Copy/paste migration file content
   - Click "Run"

   **Option B: Supabase CLI**
   ```bash
   supabase db execute -f migrations/add_missing_fields_from_mock_data.sql
   ```

   **Option C: Direct SQL Connection**
   ```bash
   psql -h <your-host> -U postgres -d postgres -f migrations/add_missing_fields_from_mock_data.sql
   ```

4. **Verify Migration**:
   ```sql
   -- Check new columns exist
   SELECT column_name, data_type, column_default
   FROM information_schema.columns
   WHERE table_name IN ('meal_recipe', 'meal_ingredient', 'workout_exercise', 'meal_grocery_list_item')
   ORDER BY table_name, ordinal_position;

   -- Check new table exists
   SELECT * FROM information_schema.tables
   WHERE table_name = 'meal_grocery_list_item_source';
   ```

### 5.2 Post-Migration Tasks

1. **Update TypeScript Types** (see `types/` directory):
   - Add new fields to existing interfaces
   - Create interface for new junction table
   - Update service layer to handle new fields

2. **Update Services** (`services/` directory):
   - Modify `mealService.ts` to include new meal fields
   - Modify `exerciseService.ts` to include category and tips
   - Modify grocery service to handle new metadata

3. **Test Data Population**:
   - Create seed script to insert mock data into database
   - Verify relationships (FKs) work correctly
   - Test queries with new indexes

4. **Update API Endpoints** (backend):
   - Modify API responses to include new fields
   - Update API documentation (if applicable)

### 5.3 Rollback Plan

If issues arise, rollback with:

```sql
-- Remove new columns
ALTER TABLE meal_recipe DROP COLUMN IF EXISTS meal_type;
ALTER TABLE meal_recipe DROP COLUMN IF EXISTS prep_time_minutes;
ALTER TABLE meal_recipe DROP COLUMN IF EXISTS cook_time_minutes;
ALTER TABLE meal_ingredient DROP COLUMN IF EXISTS icon_emoji;
ALTER TABLE workout_exercise DROP COLUMN IF EXISTS category;
ALTER TABLE workout_exercise DROP COLUMN IF EXISTS tips_json;
ALTER TABLE meal_grocery_list_item DROP COLUMN IF EXISTS is_custom;
ALTER TABLE meal_grocery_list_item DROP COLUMN IF EXISTS purchase_frequency;
ALTER TABLE meal_grocery_list_item DROP COLUMN IF EXISTS storage_type;

-- Remove new table
DROP TABLE IF EXISTS meal_grocery_list_item_source;
```

---

## 6. Mock Data Adjustments Required

### 6.1 Current Status

✅ **No mock data changes required** - All mock data fields are now supported by the database after migration.

### 6.2 Data Mapping Guide

When inserting mock data into the database:

| Mock Field | Database Field | Transformation |
|-----------|---------------|----------------|
| `type` | `meal_type` | Direct copy |
| `prepTime` | `prep_time_minutes` | Direct copy |
| `cookTime` | `cook_time_minutes` | Direct copy |
| `ingredients[].icon` | `meal_ingredient.icon_emoji` | Direct copy |
| `category` | `category` | Direct copy |
| `tips[]` | `tips_json` | Convert array to JSONB |
| `isCustom` | `is_custom` | Direct copy |
| `purchaseFrequency` | `purchase_frequency` | Direct copy |
| `storageType` | `storage_type` | Direct copy |
| `mealSources[]` | `meal_grocery_list_item_source` | Create junction records |

### 6.3 Sample Data Insert Script

```typescript
// Example: Insert meal from mock data
async function insertMealFromMock(mockMeal: MealDetail, userId: string) {
  // 1. Insert recipe
  const { data: recipe } = await supabase
    .from('meal_recipe')
    .insert({
      user_id: userId,
      name: mockMeal.name,
      description: mockMeal.description,
      servings: mockMeal.servings,
      meal_type: mockMeal.type,
      prep_time_minutes: mockMeal.prepTime,
      cook_time_minutes: mockMeal.cookTime,
      energy_kcal_per_serving: mockMeal.calories,
      protein_g_per_serving: mockMeal.macros.protein,
      carb_g_per_serving: mockMeal.macros.carbs,
      fat_g_per_serving: mockMeal.macros.fat,
    })
    .select()
    .single();

  // 2. Insert gallery media
  for (const media of mockMeal.gallery) {
    await supabase.from('meal_recipe_media').insert({
      recipe_id: recipe.id,
      type: media.type,
      role: media.role || 'gallery',
      source_url: media.url,
      alt_text: media.altText,
      sort_index: mockMeal.gallery.indexOf(media) + 1,
    });
  }

  // 3. Insert ingredients (ensure ingredients exist first)
  for (const ingredient of mockMeal.ingredients) {
    const { data: ing } = await supabase
      .from('meal_ingredient')
      .upsert({
        name: ingredient.name,
        default_unit: ingredient.unit,
        icon_emoji: ingredient.icon,
      })
      .select()
      .single();

    await supabase.from('meal_recipe_ingredient').insert({
      recipe_id: recipe.id,
      ingredient_id: ing.id,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      order_index: mockMeal.ingredients.indexOf(ingredient) + 1,
    });
  }

  // 4. Insert preparation steps
  for (const step of mockMeal.preparationSteps) {
    await supabase.from('meal_recipe_step').insert({
      recipe_id: recipe.id,
      order_index: step.stepNumber,
      instruction: step.instruction,
    });
  }
}
```

---

## 7. Future Enhancements

### 7.1 Potential Additional Fields

Consider adding these fields in future migrations:

**Meals:**
- `difficulty_level` (easy, medium, hard)
- `cuisine_type` (italian, mexican, asian, etc.)
- `dietary_tags` JSONB (vegetarian, vegan, gluten-free, etc.)
- `cost_estimate` (budget-friendly indicator)
- `allergen_info` JSONB (common allergens present)

**Exercises:**
- `difficulty_level` (beginner, intermediate, advanced)
- `alternatives` JSONB (alternative exercises)
- `contraindications` JSONB (injuries/conditions to avoid)
- `video_tutorial_url` (dedicated tutorial link)

**Grocery Lists:**
- `barcode` (for scanning support)
- `brand_preference` (user's preferred brand)
- `price_estimate` (estimated cost)
- `store_location` (aisle/section in store)

### 7.2 Performance Optimizations

- Add full-text search indexes for recipe/exercise names
- Implement materialized views for complex aggregations
- Consider partitioning large tables by date (if needed)

---

## 8. Contact & Support

**Developer:** Your Jelty Development Team
**Database:** Supabase PostgreSQL
**Mobile App:** React Native + Expo

For questions or issues with this migration:
1. Check migration file comments
2. Review this documentation
3. Test in development environment first
4. Contact database admin before running in production

---

**Document Version:** 1.0
**Last Updated:** November 12, 2025
**Status:** ✅ Ready for Implementation
