# 🔄 Migration Guide: Mock Data → Database Alignment

**Status:** ✅ Ready to Execute
**Created:** November 12, 2025
**Project:** Jelty Mobile App

---

## 📋 What Was Done

I've analyzed all mock data in the Jelty app and compared it with your Supabase database schema. Here's what I created:

### Files Created

1. **`migrations/add_missing_fields_from_mock_data.sql`** (211 lines)
   - SQL migration file to add missing database fields
   - Adds 9 new columns across 4 tables
   - Creates 1 new junction table
   - Creates 7 performance indexes
   - Includes rollback instructions

2. **`docs/MOCK_DATA_DATABASE_COMPARISON.md`** (815 lines)
   - Comprehensive comparison report
   - Field-by-field analysis for meals, workouts, and grocery lists
   - Migration instructions
   - Data mapping guide

3. **`types/database.ts`** (420 lines)
   - Complete TypeScript types for database schema
   - Includes all new fields from migration
   - Insert/Update helper types
   - Conversion helper functions

4. **`types/grocery.ts`** (updated)
   - Added `ingredientId` field to GroceryItem interface

---

## 🎯 Quick Summary

### What Was Missing in Database

**Meals:**
- ❌ `meal_type` (breakfast, lunch, dinner, snacks)
- ❌ `prep_time_minutes`
- ❌ `cook_time_minutes`
- ❌ `icon_emoji` for ingredients

**Workouts:**
- ❌ `category` (warm-up, main, stretch)
- ❌ `tips_json` (form tips array)

**Grocery Lists:**
- ❌ `is_custom` (user-added flag)
- ❌ `purchase_frequency` (weekly, monthly)
- ❌ `storage_type` (fresh, frozen, pantry)
- ❌ Junction table linking items to source meals

### What Was Added

✅ All 9 missing fields
✅ 1 new junction table (`meal_grocery_list_item_source`)
✅ 7 performance indexes
✅ Data validation constraints
✅ Default values for existing records

---

## 🚀 How to Execute Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project
2. Click **SQL Editor** in the left sidebar
3. Open `migrations/add_missing_fields_from_mock_data.sql`
4. Copy the entire file content
5. Paste into SQL Editor
6. Click **Run** button
7. Verify success (should see "Success" message)

### Option 2: Supabase CLI

```bash
# Make sure you're in the project directory
cd /Users/giildev/Documents/jelty

# Run the migration
supabase db execute -f migrations/add_missing_fields_from_mock_data.sql
```

### Option 3: Direct PostgreSQL Connection

```bash
psql -h <your-supabase-host> \
     -U postgres \
     -d postgres \
     -f migrations/add_missing_fields_from_mock_data.sql
```

---

## ✅ Verification Steps

After running the migration, verify it worked:

```sql
-- Check new columns exist in meal_recipe
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'meal_recipe'
  AND column_name IN ('meal_type', 'prep_time_minutes', 'cook_time_minutes');

-- Check new columns exist in meal_ingredient
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'meal_ingredient'
  AND column_name = 'icon_emoji';

-- Check new columns exist in workout_exercise
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'workout_exercise'
  AND column_name IN ('category', 'tips_json');

-- Check new columns exist in meal_grocery_list_item
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'meal_grocery_list_item'
  AND column_name IN ('is_custom', 'purchase_frequency', 'storage_type');

-- Check new table exists
SELECT table_name
FROM information_schema.tables
WHERE table_name = 'meal_grocery_list_item_source';

-- Should return 5 rows total
```

---

## 📊 Impact Analysis

### Tables Modified

| Table | Fields Added | Indexes Added | Breaking Changes |
|-------|-------------|---------------|-----------------|
| `meal_recipe` | 3 | 1 | ❌ None |
| `meal_ingredient` | 1 | 0 | ❌ None |
| `workout_exercise` | 2 | 1 | ❌ None |
| `meal_grocery_list_item` | 3 | 3 | ❌ None |

### New Table Created

| Table | Purpose | Relationships |
|-------|---------|---------------|
| `meal_grocery_list_item_source` | Link grocery items to source meals | N:M (items ↔ recipes) |

### Performance Impact

✅ **Positive:** 7 new indexes improve query performance
✅ **Minimal:** All new columns are nullable (no data required)
✅ **Safe:** Default values set for existing records

---

## 🔄 Next Steps After Migration

### 1. Update Mobile App (Already Done! ✅)

- ✅ TypeScript types updated
- ✅ `types/database.ts` created with full schema
- ✅ `types/grocery.ts` updated with ingredientId

### 2. Update Services Layer (To Do)

Update these files to use new database fields:

**`services/mealService.ts`:**
```typescript
import { DbMealRecipe, DbMealRecipeFull } from '@/types/database';

// Update functions to include new fields
async function getMealById(id: string): Promise<DbMealRecipeFull> {
  const { data, error } = await supabase
    .from('meal_recipe')
    .select(`
      *,
      ingredients:meal_recipe_ingredient(
        *,
        ingredient:meal_ingredient(*)
      ),
      steps:meal_recipe_step(*),
      media:meal_recipe_media(*)
    `)
    .eq('id', id)
    .single();

  return data;
}
```

**`services/exerciseService.ts`:**
```typescript
import { DbWorkoutExercise, DbWorkoutExerciseFull } from '@/types/database';

// Update to include category and tips
async function getExerciseById(id: string): Promise<DbWorkoutExerciseFull> {
  const { data, error } = await supabase
    .from('workout_exercise')
    .select(`
      *,
      media:workout_exercise_media(*),
      steps:workout_exercise_step(*)
    `)
    .eq('id', id)
    .single();

  return data;
}
```

**`services/groceryService.ts`** (create if doesn't exist):
```typescript
import { DbMealGroceryListItemFull } from '@/types/database';

// Fetch grocery items with source meals
async function getGroceryListItems(listId: string) {
  const { data, error } = await supabase
    .from('meal_grocery_list_item')
    .select(`
      *,
      ingredient:meal_ingredient(*),
      sources:meal_grocery_list_item_source(
        meal_recipe_id,
        meal_recipe:meal_recipe(name)
      )
    `)
    .eq('grocery_list_id', listId);

  return data;
}
```

### 3. Seed Database with Mock Data

Create a seed script to populate database with your mock data:

```typescript
// scripts/seedDatabase.ts
import { MEAL_DETAILS_MOCK, EXERCISE_DETAILS_MOCK, MOCK_GROCERY_ITEMS } from '@/constants/mockData';
import { supabase } from '@/services/supabase';

async function seedMeals(userId: string) {
  for (const mockMeal of MEAL_DETAILS_MOCK) {
    // Insert recipe
    const { data: recipe } = await supabase
      .from('meal_recipe')
      .insert({
        user_id: userId,
        name: mockMeal.name,
        description: mockMeal.description,
        meal_type: mockMeal.type,
        prep_time_minutes: mockMeal.prepTime,
        cook_time_minutes: mockMeal.cookTime,
        servings: mockMeal.servings,
        energy_kcal_per_serving: mockMeal.calories,
        protein_g_per_serving: mockMeal.macros.protein,
        carb_g_per_serving: mockMeal.macros.carbs,
        fat_g_per_serving: mockMeal.macros.fat,
      })
      .select()
      .single();

    // Insert ingredients, steps, media...
  }
}
```

### 4. Test Everything

- [ ] Run migration in **development** environment first
- [ ] Verify all new columns have correct data types
- [ ] Test inserting mock data into database
- [ ] Verify foreign key relationships work
- [ ] Test UI with real database data
- [ ] Run in **production** after successful dev testing

---

## 🔙 Rollback (If Needed)

If something goes wrong, you can rollback the migration:

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

-- Remove indexes
DROP INDEX IF EXISTS idx_meal_recipe_meal_type;
DROP INDEX IF EXISTS idx_workout_exercise_category;
DROP INDEX IF EXISTS idx_meal_grocery_list_item_storage_type;
DROP INDEX IF EXISTS idx_meal_grocery_list_item_purchase_frequency;
DROP INDEX IF EXISTS idx_meal_grocery_list_item_is_custom;
DROP INDEX IF EXISTS idx_meal_grocery_list_item_source_item;
DROP INDEX IF EXISTS idx_meal_grocery_list_item_source_recipe;
```

---

## 📚 Documentation

For detailed information, see:

- **Migration SQL:** `migrations/add_missing_fields_from_mock_data.sql`
- **Full Report:** `docs/MOCK_DATA_DATABASE_COMPARISON.md`
- **Database Types:** `types/database.ts`

---

## ❓ Questions?

If you encounter any issues:

1. Check the comprehensive report: `docs/MOCK_DATA_DATABASE_COMPARISON.md`
2. Review migration file comments: `migrations/add_missing_fields_from_mock_data.sql`
3. Verify TypeScript types: `types/database.ts`

---

**Ready to proceed?** Run the migration and start syncing your mock data with the database! 🚀
