-- ============================================================================
-- MIGRATION: Add Missing Fields from Mock Data to Database Schema
-- ============================================================================
-- Description: This migration adds fields that exist in the mobile app's
--              mock data but are missing from the current database schema.
--              These fields are essential for the UI functionality.
--
-- Created: 2025-11-12
-- Author: Claude Code
-- ============================================================================

-- ============================================================================
-- 1. MEALS (meal_recipe) - Add meal type and timing fields
-- ============================================================================

-- Add meal_type to classify meals (breakfast, lunch, dinner, snacks)
ALTER TABLE public.meal_recipe
ADD COLUMN IF NOT EXISTS meal_type TEXT
CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'morning_snack', 'afternoon_snack', 'snack'));

COMMENT ON COLUMN public.meal_recipe.meal_type IS 'Type of meal: breakfast, lunch, dinner, morning_snack, afternoon_snack, or snack';

-- Add prep_time_minutes for preparation time
ALTER TABLE public.meal_recipe
ADD COLUMN IF NOT EXISTS prep_time_minutes INTEGER
CHECK (prep_time_minutes >= 0);

COMMENT ON COLUMN public.meal_recipe.prep_time_minutes IS 'Preparation time in minutes';

-- Add cook_time_minutes for cooking time
ALTER TABLE public.meal_recipe
ADD COLUMN IF NOT EXISTS cook_time_minutes INTEGER
CHECK (cook_time_minutes >= 0);

COMMENT ON COLUMN public.meal_recipe.cook_time_minutes IS 'Cooking time in minutes';

-- ============================================================================
-- 2. INGREDIENTS (meal_ingredient) - Add emoji icon for UI
-- ============================================================================

-- Add icon_emoji for visual representation in mobile app
ALTER TABLE public.meal_ingredient
ADD COLUMN IF NOT EXISTS icon_emoji TEXT;

COMMENT ON COLUMN public.meal_ingredient.icon_emoji IS 'Emoji icon for visual representation in UI (e.g., 🍗, 🥬, 🍅)';

-- ============================================================================
-- 3. EXERCISES (workout_exercise) - Add category and tips
-- ============================================================================

-- Add category to classify exercises (warm-up, main, stretch)
ALTER TABLE public.workout_exercise
ADD COLUMN IF NOT EXISTS category TEXT
CHECK (category IN ('warm-up', 'main', 'stretch', 'cooldown'));

COMMENT ON COLUMN public.workout_exercise.category IS 'Exercise category: warm-up, main, stretch, or cooldown';

-- Add tips_json for storing exercise tips as JSON array
ALTER TABLE public.workout_exercise
ADD COLUMN IF NOT EXISTS tips_json JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.workout_exercise.tips_json IS 'Array of form tips and safety notes for the exercise (stored as JSON)';

-- ============================================================================
-- 4. GROCERY LIST ITEMS (meal_grocery_list_item) - Add shopping metadata
-- ============================================================================

-- Add is_custom flag to identify user-added items vs generated items
ALTER TABLE public.meal_grocery_list_item
ADD COLUMN IF NOT EXISTS is_custom BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.meal_grocery_list_item.is_custom IS 'True if the item was manually added by the user (not auto-generated from meal plan)';

-- Add purchase_frequency for shopping planning
ALTER TABLE public.meal_grocery_list_item
ADD COLUMN IF NOT EXISTS purchase_frequency TEXT
CHECK (purchase_frequency IN ('daily', 'weekly', 'biweekly', 'monthly'));

COMMENT ON COLUMN public.meal_grocery_list_item.purchase_frequency IS 'How often this item is typically purchased: daily, weekly, biweekly, or monthly';

-- Add storage_type for organizing shopping and storage
ALTER TABLE public.meal_grocery_list_item
ADD COLUMN IF NOT EXISTS storage_type TEXT
CHECK (storage_type IN ('fresh', 'frozen', 'pantry', 'refrigerated'));

COMMENT ON COLUMN public.meal_grocery_list_item.storage_type IS 'Storage type: fresh, frozen, pantry, or refrigerated';

-- ============================================================================
-- 5. CREATE NEW TABLE: meal_grocery_list_item_source
-- ============================================================================
-- This junction table links grocery list items to the meals they come from

CREATE TABLE IF NOT EXISTS public.meal_grocery_list_item_source (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grocery_list_item_id UUID NOT NULL,
  meal_recipe_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Foreign Keys
  CONSTRAINT meal_grocery_list_item_source_item_fkey
    FOREIGN KEY (grocery_list_item_id)
    REFERENCES public.meal_grocery_list_item(id)
    ON DELETE CASCADE,

  CONSTRAINT meal_grocery_list_item_source_recipe_fkey
    FOREIGN KEY (meal_recipe_id)
    REFERENCES public.meal_recipe(id)
    ON DELETE CASCADE,

  -- Ensure unique combination (no duplicate sources for same item)
  CONSTRAINT meal_grocery_list_item_source_unique
    UNIQUE (grocery_list_item_id, meal_recipe_id)
);

COMMENT ON TABLE public.meal_grocery_list_item_source IS 'Junction table linking grocery list items to the meals (recipes) they originate from';
COMMENT ON COLUMN public.meal_grocery_list_item_source.grocery_list_item_id IS 'Reference to the grocery list item';
COMMENT ON COLUMN public.meal_grocery_list_item_source.meal_recipe_id IS 'Reference to the meal recipe that requires this ingredient';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_meal_grocery_list_item_source_item
  ON public.meal_grocery_list_item_source(grocery_list_item_id);

CREATE INDEX IF NOT EXISTS idx_meal_grocery_list_item_source_recipe
  ON public.meal_grocery_list_item_source(meal_recipe_id);

-- ============================================================================
-- 6. CREATE INDEXES for new columns (for query performance)
-- ============================================================================

-- Index for filtering meals by type
CREATE INDEX IF NOT EXISTS idx_meal_recipe_meal_type
  ON public.meal_recipe(meal_type)
  WHERE deleted_at IS NULL;

-- Index for filtering exercises by category
CREATE INDEX IF NOT EXISTS idx_workout_exercise_category
  ON public.workout_exercise(category)
  WHERE deleted_at IS NULL;

-- Index for filtering grocery items by storage type
CREATE INDEX IF NOT EXISTS idx_meal_grocery_list_item_storage_type
  ON public.meal_grocery_list_item(storage_type)
  WHERE deleted_at IS NULL;

-- Index for filtering grocery items by purchase frequency
CREATE INDEX IF NOT EXISTS idx_meal_grocery_list_item_purchase_frequency
  ON public.meal_grocery_list_item(purchase_frequency)
  WHERE deleted_at IS NULL;

-- Index for filtering custom vs generated grocery items
CREATE INDEX IF NOT EXISTS idx_meal_grocery_list_item_is_custom
  ON public.meal_grocery_list_item(is_custom)
  WHERE deleted_at IS NULL;

-- ============================================================================
-- 7. UPDATE EXISTING RECORDS (Set reasonable defaults)
-- ============================================================================

-- Update existing meal recipes to have a default meal_type if NULL
UPDATE public.meal_recipe
SET meal_type = 'lunch'
WHERE meal_type IS NULL AND deleted_at IS NULL;

-- Update existing exercises to have a default category if NULL
UPDATE public.workout_exercise
SET category = 'main'
WHERE category IS NULL AND deleted_at IS NULL;

-- Update existing grocery list items with default values
UPDATE public.meal_grocery_list_item
SET
  is_custom = false,
  purchase_frequency = 'weekly',
  storage_type = 'fresh'
WHERE deleted_at IS NULL
  AND (is_custom IS NULL OR purchase_frequency IS NULL OR storage_type IS NULL);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- To verify the changes, run:
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name IN ('meal_recipe', 'meal_ingredient', 'workout_exercise', 'meal_grocery_list_item')
-- ORDER BY table_name, ordinal_position;
