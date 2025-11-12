# Jelty App: Mock Data vs Database Schema - Comprehensive Comparison Report

**Date**: 2025-11-12  
**Analysis Scope**: Meals, Workouts, and Grocery Lists

---

## Executive Summary

**CRITICAL FINDING**: The database schema for meals, workouts, and grocery lists **DOES NOT EXIST YET**. The application is currently using TypeScript interfaces and mock data, but there are no corresponding Supabase tables.

### Current State
- ✅ TypeScript types defined in `/types/` directory
- ✅ Mock data defined in `/constants/mockData.ts`
- ❌ **NO database tables for meals (`meal_recipe`, `meal_ingredient`, `meal_preparation_step`)**
- ❌ **NO database tables for workouts beyond media (`workout_exercise`, `workout_set`, `workout_instruction_step`)**
- ❌ **NO database tables for grocery lists (`meal_grocery_list_item`)**
- ✅ Only `workout_exercise_media` table exists (created 2025-01-12)

### Existing Database Tables
Based on migrations found:
1. `user_user` - User accounts
2. `user_profile` - User profiles
3. `user_goal` - User goals
4. `user_body_goal` - Body composition goals
5. `user_notification_settings` - Notification preferences
6. `user_cooking_preference` - Cooking preferences
7. `user_training_preference` - Training preferences (referenced)
8. `workout_exercise_media` - Exercise media (images/videos) ✅

---

## Part 1: MEALS ANALYSIS

### 1.1 Mock Data Structure (`MEAL_DETAILS_MOCK`)

Based on `/types/nutrition.ts` and mock data, the `MealDetail` interface contains:

```typescript
interface MealDetail extends Meal {
  // From base Meal
  id: string
  name: string
  calories: number
  macros: Macros { carbs, protein, fat }
  imageUrl?: string
  time?: string
  ingredients?: Ingredient[]
  
  // MealDetail specific
  description: string
  type: MealType  // breakfast, morning_snack, lunch, etc.
  servings: number
  prepTime: number  // minutes
  cookTime: number  // minutes
  gallery: MediaItem[]  // Array of {id, type, url, thumbnail?}
  ingredients: MealIngredient[]  // {id, name, quantity, unit, icon?}
  preparationSteps: PreparationStep[]  // {id, stepNumber, instruction}
}
```

**Sample Mock Data Fields:**
- `id`: "m1-3"
- `name`: "Grilled Chicken Salad"
- `calories`: 450
- `macros`: { carbs: 15, protein: 35, fat: 28 }
- `description`: "Fresh mixed greens with..."
- `type`: "lunch"
- `servings`: 1
- `prepTime`: 15
- `cookTime`: 15
- `gallery`: [{ id, type: "image"/"video", url, thumbnail? }]
- `ingredients`: [{ id, name, quantity, unit, icon? }]
- `preparationSteps`: [{ id, stepNumber, instruction }]

### 1.2 Required Database Tables (NOT YET CREATED)

#### Table 1: `meal_recipe`
```sql
CREATE TABLE meal_recipe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name TEXT NOT NULL,
  description TEXT,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'evening_snack')),
  
  -- Nutritional Info
  calories INTEGER,
  carbs_g NUMERIC,
  protein_g NUMERIC,
  fat_g NUMERIC,
  
  -- Recipe Details
  servings INTEGER DEFAULT 1,
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  
  -- Media
  primary_image_url TEXT,  -- Legacy field for compatibility
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);
```

#### Table 2: `meal_recipe_media`
```sql
CREATE TABLE meal_recipe_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_recipe_id UUID NOT NULL REFERENCES meal_recipe(id) ON DELETE CASCADE,
  
  -- Media Info
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,  -- For videos
  sort_index INTEGER DEFAULT 1,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_meal_recipe_media_recipe_id ON meal_recipe_media(meal_recipe_id) WHERE deleted_at IS NULL;
```

#### Table 3: `meal_ingredient`
```sql
CREATE TABLE meal_ingredient (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_recipe_id UUID NOT NULL REFERENCES meal_recipe(id) ON DELETE CASCADE,
  
  -- Ingredient Info
  name TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  unit TEXT NOT NULL,  -- g, kg, ml, l, cups, tbsp, tsp, pieces, units, oz, lb
  icon TEXT,  -- Emoji icon (optional)
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_meal_ingredient_recipe_id ON meal_ingredient(meal_recipe_id) WHERE deleted_at IS NULL;
```

#### Table 4: `meal_preparation_step`
```sql
CREATE TABLE meal_preparation_step (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_recipe_id UUID NOT NULL REFERENCES meal_recipe(id) ON DELETE CASCADE,
  
  -- Step Info
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ,
  
  CONSTRAINT check_step_number CHECK (step_number >= 1)
);

CREATE INDEX idx_meal_prep_step_recipe_id ON meal_preparation_step(meal_recipe_id, step_number) WHERE deleted_at IS NULL;
```

### 1.3 Field-by-Field Comparison

| Mock Data Field | Database Column | Status | Notes |
|----------------|-----------------|--------|-------|
| `id` | `meal_recipe.id` | ✅ Match | UUID primary key |
| `name` | `meal_recipe.name` | ✅ Match | TEXT |
| `calories` | `meal_recipe.calories` | ✅ Match | INTEGER |
| `macros.carbs` | `meal_recipe.carbs_g` | ✅ Match | NUMERIC |
| `macros.protein` | `meal_recipe.protein_g` | ✅ Match | NUMERIC |
| `macros.fat` | `meal_recipe.fat_g` | ✅ Match | NUMERIC |
| `description` | `meal_recipe.description` | ✅ Match | TEXT |
| `type` | `meal_recipe.meal_type` | ✅ Match | ENUM via CHECK constraint |
| `servings` | `meal_recipe.servings` | ✅ Match | INTEGER |
| `prepTime` | `meal_recipe.prep_time_minutes` | ✅ Match | INTEGER |
| `cookTime` | `meal_recipe.cook_time_minutes` | ✅ Match | INTEGER |
| `imageUrl` | `meal_recipe.primary_image_url` | ⚠️ Deprecated | Use `meal_recipe_media` instead |
| `time` | ❌ Missing | ❌ Not in DB | Only in `ScheduledMeal` (scheduling) |
| `gallery` | `meal_recipe_media` table | ✅ Match | Separate table |
| `gallery[].id` | `meal_recipe_media.id` | ✅ Match | UUID |
| `gallery[].type` | `meal_recipe_media.type` | ✅ Match | TEXT (image/video) |
| `gallery[].url` | `meal_recipe_media.url` | ✅ Match | TEXT |
| `gallery[].thumbnail` | `meal_recipe_media.thumbnail_url` | ✅ Match | TEXT (optional) |
| `ingredients` | `meal_ingredient` table | ✅ Match | Separate table |
| `ingredients[].id` | `meal_ingredient.id` | ✅ Match | UUID |
| `ingredients[].name` | `meal_ingredient.name` | ✅ Match | TEXT |
| `ingredients[].quantity` | `meal_ingredient.quantity` | ✅ Match | NUMERIC |
| `ingredients[].unit` | `meal_ingredient.unit` | ✅ Match | TEXT |
| `ingredients[].icon` | `meal_ingredient.icon` | ✅ Match | TEXT (optional emoji) |
| `preparationSteps` | `meal_preparation_step` table | ✅ Match | Separate table |
| `preparationSteps[].id` | `meal_preparation_step.id` | ✅ Match | UUID |
| `preparationSteps[].stepNumber` | `meal_preparation_step.step_number` | ✅ Match | INTEGER |
| `preparationSteps[].instruction` | `meal_preparation_step.instruction` | ✅ Match | TEXT |

### 1.4 Recommendations for Meals

**HIGH PRIORITY:**
1. ✅ Create `meal_recipe` table (main recipes table)
2. ✅ Create `meal_recipe_media` table (images/videos gallery)
3. ✅ Create `meal_ingredient` table (ingredient list)
4. ✅ Create `meal_preparation_step` table (cooking steps)

**MEDIUM PRIORITY:**
5. Add `meal_user_schedule` table for scheduled meals (date + time + user_id)
6. Consider adding `meal_recipe_category` table (cuisine type, diet type, etc.)
7. Add full-text search indexes on `name` and `description`

**LOW PRIORITY:**
8. Add `meal_user_favorite` table for user favorites
9. Add `meal_user_rating` table for user ratings/reviews

---

## Part 2: WORKOUTS ANALYSIS

### 2.1 Mock Data Structure (`EXERCISE_DETAILS_MOCK`)

Based on `/types/workout.ts` and mock data, the `ExerciseDetail` interface contains:

```typescript
interface ExerciseDetail extends Exercise {
  // From base Exercise
  id: string
  name: string
  sets: number
  reps: number
  rir: number  // Reps in Reserve
  restTime: number  // seconds
  imageUrl?: string
  muscleGroup?: string
  
  // ExerciseDetail specific
  description: string
  primaryMuscle: string
  equipment: string
  category: ExerciseType  // warm-up, main, stretch
  gallery: ExerciseMediaItem[]
  instructions: ExerciseInstructions
  howToPerformSteps: HowToPerformStep[]
  tips?: string[]  // Optional form tips
}

interface ExerciseMediaItem {
  id: string
  type: ExerciseMediaType  // image, video
  url: string
  role: ExerciseMediaRole  // primary, gallery, demonstration
  thumbnail?: string
  posterPath?: string
  altText?: string
  caption?: string
  sortIndex: number
}

interface ExerciseInstructions {
  sets: number
  repsMin: number
  repsMax: number
  rir: number
  restTimeSeconds: number
}

interface HowToPerformStep {
  id: string
  orderIndex: number
  instruction: string
}
```

**Sample Mock Data Fields:**
- `id`: "e1-1"
- `name`: "Arm Circles"
- `sets`: 2
- `reps`: 15
- `rir`: 5
- `restTime`: 30
- `description`: "A dynamic warm-up exercise..."
- `primaryMuscle`: "Shoulders"
- `equipment`: "None (Bodyweight)"
- `category`: "warm-up"
- `muscleGroup`: "Shoulders"
- `gallery`: [{ id, type, url, role, altText, sortIndex }]
- `instructions`: { sets, repsMin, repsMax, rir, restTimeSeconds }
- `howToPerformSteps`: [{ id, orderIndex, instruction }]
- `tips`: ["Keep your core engaged...", "Start with small circles..."]

### 2.2 Existing Database Tables

✅ **`workout_exercise_media`** (EXISTS - created 2025-01-12)
```sql
CREATE TABLE workout_exercise_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES workout_exercise(id) ON DELETE CASCADE,
  
  -- Media Info
  type media_type NOT NULL,  -- ENUM: image, video
  role media_role NOT NULL DEFAULT 'gallery',  -- ENUM: primary, gallery, demonstration
  storage_bucket TEXT NOT NULL DEFAULT 'public',
  storage_path TEXT NOT NULL,
  public_url TEXT,
  alt_text TEXT,
  caption TEXT,
  sort_index INTEGER NOT NULL DEFAULT 1,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  
  -- Media Metadata
  width_px INTEGER,
  height_px INTEGER,
  duration_s NUMERIC,  -- For videos
  format TEXT,  -- mp4, jpg, png
  bytes BIGINT,
  
  -- Video Support
  thumbnail_path TEXT,
  poster_path TEXT,
  
  -- Source Tracking
  source_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);
```

### 2.3 Required Database Tables (NOT YET CREATED)

#### Table 1: `workout_exercise` (REFERENCED BUT NOT CREATED)
```sql
CREATE TABLE workout_exercise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name TEXT NOT NULL,
  description TEXT,
  
  -- Muscle Info
  primary_muscle TEXT,  -- Shoulders, Chest, Back, etc.
  muscle_group TEXT,  -- Same as primary_muscle or more specific
  
  -- Equipment
  equipment TEXT,  -- None (Bodyweight), Dumbbells, Barbell, etc.
  
  -- Category
  category TEXT CHECK (category IN ('warm-up', 'main', 'stretch')),
  
  -- Legacy Media (deprecated)
  image_url TEXT,  -- Use workout_exercise_media instead
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_workout_exercise_category ON workout_exercise(category) WHERE deleted_at IS NULL;
CREATE INDEX idx_workout_exercise_muscle ON workout_exercise(primary_muscle) WHERE deleted_at IS NULL;
```

#### Table 2: `workout_set` (NEW - for instructions)
```sql
CREATE TABLE workout_set (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES workout_exercise(id) ON DELETE CASCADE,
  
  -- Set Instructions
  sets INTEGER NOT NULL,
  reps_min INTEGER,  -- Minimum reps (e.g., 8)
  reps_max INTEGER,  -- Maximum reps (e.g., 12)
  rir INTEGER,  -- Reps in Reserve (e.g., 2)
  rest_time_seconds INTEGER,  -- Rest between sets
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_workout_set_exercise_id ON workout_set(exercise_id) WHERE deleted_at IS NULL;
```

#### Table 3: `workout_instruction_step` (NEW - for how-to steps)
```sql
CREATE TABLE workout_instruction_step (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES workout_exercise(id) ON DELETE CASCADE,
  
  -- Step Info
  order_index INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ,
  
  CONSTRAINT check_order_index CHECK (order_index >= 1)
);

CREATE INDEX idx_workout_instruction_step_exercise ON workout_instruction_step(exercise_id, order_index) WHERE deleted_at IS NULL;
```

#### Table 4: `workout_exercise_tip` (NEW - for tips array)
```sql
CREATE TABLE workout_exercise_tip (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES workout_exercise(id) ON DELETE CASCADE,
  
  -- Tip Info
  tip_text TEXT NOT NULL,
  order_index INTEGER DEFAULT 1,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_workout_exercise_tip_exercise ON workout_exercise_tip(exercise_id) WHERE deleted_at IS NULL;
```

### 2.4 Field-by-Field Comparison

| Mock Data Field | Database Column | Status | Notes |
|----------------|-----------------|--------|-------|
| `id` | `workout_exercise.id` | ❌ Table doesn't exist | Need to create table |
| `name` | `workout_exercise.name` | ❌ Table doesn't exist | |
| `sets` | `workout_set.sets` | ❌ Table doesn't exist | Separate table for flexibility |
| `reps` | ❌ Deprecated | ⚠️ Split | Use `reps_min` and `reps_max` |
| `rir` | `workout_set.rir` | ❌ Table doesn't exist | |
| `restTime` | `workout_set.rest_time_seconds` | ❌ Table doesn't exist | |
| `description` | `workout_exercise.description` | ❌ Table doesn't exist | |
| `primaryMuscle` | `workout_exercise.primary_muscle` | ❌ Table doesn't exist | |
| `equipment` | `workout_exercise.equipment` | ❌ Table doesn't exist | |
| `category` | `workout_exercise.category` | ❌ Table doesn't exist | ENUM via CHECK constraint |
| `muscleGroup` | `workout_exercise.muscle_group` | ❌ Table doesn't exist | |
| `imageUrl` | `workout_exercise.image_url` | ⚠️ Deprecated | Use `workout_exercise_media` |
| `gallery` | `workout_exercise_media` | ✅ Table EXISTS | Already created |
| `gallery[].id` | `workout_exercise_media.id` | ✅ Match | |
| `gallery[].type` | `workout_exercise_media.type` | ✅ Match | ENUM: image/video |
| `gallery[].url` | `workout_exercise_media.public_url` | ✅ Match | |
| `gallery[].role` | `workout_exercise_media.role` | ✅ Match | ENUM: primary/gallery/demonstration |
| `gallery[].thumbnail` | `workout_exercise_media.thumbnail_path` | ✅ Match | |
| `gallery[].posterPath` | `workout_exercise_media.poster_path` | ✅ Match | |
| `gallery[].altText` | `workout_exercise_media.alt_text` | ✅ Match | |
| `gallery[].caption` | `workout_exercise_media.caption` | ✅ Match | |
| `gallery[].sortIndex` | `workout_exercise_media.sort_index` | ✅ Match | |
| `instructions` | `workout_set` table | ❌ Table doesn't exist | Separate table |
| `instructions.sets` | `workout_set.sets` | ❌ Table doesn't exist | |
| `instructions.repsMin` | `workout_set.reps_min` | ❌ Table doesn't exist | |
| `instructions.repsMax` | `workout_set.reps_max` | ❌ Table doesn't exist | |
| `instructions.rir` | `workout_set.rir` | ❌ Table doesn't exist | |
| `instructions.restTimeSeconds` | `workout_set.rest_time_seconds` | ❌ Table doesn't exist | |
| `howToPerformSteps` | `workout_instruction_step` table | ❌ Table doesn't exist | |
| `howToPerformSteps[].id` | `workout_instruction_step.id` | ❌ Table doesn't exist | |
| `howToPerformSteps[].orderIndex` | `workout_instruction_step.order_index` | ❌ Table doesn't exist | |
| `howToPerformSteps[].instruction` | `workout_instruction_step.instruction` | ❌ Table doesn't exist | |
| `tips` | `workout_exercise_tip` table | ❌ Table doesn't exist | Array stored as separate rows |

### 2.5 Recommendations for Workouts

**HIGH PRIORITY:**
1. ✅ Create `workout_exercise` table (main exercises table) - CRITICAL
2. ✅ Create `workout_set` table (sets/reps instructions)
3. ✅ Create `workout_instruction_step` table (how-to perform steps)

**MEDIUM PRIORITY:**
4. Create `workout_exercise_tip` table (form tips array)
5. Add `workout_user_schedule` table for scheduled workouts
6. Add indexes for muscle group and category searches

**LOW PRIORITY:**
7. Add `workout_user_favorite` table for user favorites
8. Add `workout_user_progress` table for tracking weight/reps over time

**NOTES:**
- `workout_exercise_media` table already exists and is well-designed ✅
- Mock data uses `reps` as single value, but DB should use `reps_min` and `reps_max` for flexibility
- Consider adding `workout_program` table for grouping exercises into programs

---

## Part 3: GROCERY LIST ANALYSIS

### 3.1 Mock Data Structure (`MOCK_GROCERY_ITEMS`)

Based on `/types/grocery.ts` and mock data, the `GroceryItem` interface contains:

```typescript
interface GroceryItem extends Ingredient {
  // From base Ingredient
  id: string
  name: string
  quantity: number
  unit: MeasurementUnit
  category: IngredientCategory
  purchaseFrequency: PurchaseFrequency
  storageType: StorageType
  
  // GroceryItem specific (UI state)
  isChecked: boolean
  isCustom: boolean
  mealSources?: string[]  // IDs of meals using this ingredient
  customQuantity?: number  // User-edited quantity
  ingredientId: string  // NEW field linking to meal_ingredient
}
```

**Sample Mock Data Fields:**
- `id`: "g1"
- `ingredientId`: "ing1"  // Links to meal_ingredient
- `name`: "Spinach"
- `quantity`: 200
- `unit`: "g"
- `category`: "vegetables"
- `purchaseFrequency`: "weekly"
- `storageType`: "fresh"
- `isChecked`: false
- `isCustom`: false
- `mealSources`: ["m1-3", "m2-3"]  // Array of meal IDs

### 3.2 Required Database Tables (NOT YET CREATED)

#### Table 1: `meal_grocery_list_item` (NEW)
```sql
CREATE TABLE meal_grocery_list_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_user(id) ON DELETE CASCADE,
  
  -- Ingredient Info
  ingredient_id UUID REFERENCES meal_ingredient(id) ON DELETE SET NULL,  -- NULL if custom
  name TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  custom_quantity NUMERIC,  -- User override
  unit TEXT NOT NULL,
  
  -- Category & Organization
  category TEXT CHECK (category IN ('vegetables', 'fruits', 'proteins', 'dairy', 'grains', 'spices', 'oils', 'condiments', 'beverages', 'other')),
  purchase_frequency TEXT CHECK (purchase_frequency IN ('weekly', 'monthly')),
  storage_type TEXT CHECK (storage_type IN ('fresh', 'frozen', 'pantry')),
  
  -- UI State
  is_checked BOOLEAN DEFAULT false,
  is_custom BOOLEAN DEFAULT false,  -- User-added vs. from meal plan
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_grocery_list_user_id ON meal_grocery_list_item(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_grocery_list_ingredient_id ON meal_grocery_list_item(ingredient_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_grocery_list_category ON meal_grocery_list_item(category) WHERE deleted_at IS NULL;
```

#### Table 2: `meal_grocery_list_item_source` (NEW - for mealSources array)
```sql
CREATE TABLE meal_grocery_list_item_source (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grocery_item_id UUID NOT NULL REFERENCES meal_grocery_list_item(id) ON DELETE CASCADE,
  meal_recipe_id UUID NOT NULL REFERENCES meal_recipe(id) ON DELETE CASCADE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(grocery_item_id, meal_recipe_id)
);

CREATE INDEX idx_grocery_item_source_grocery ON meal_grocery_list_item_source(grocery_item_id);
CREATE INDEX idx_grocery_item_source_meal ON meal_grocery_list_item_source(meal_recipe_id);
```

### 3.3 Field-by-Field Comparison

| Mock Data Field | Database Column | Status | Notes |
|----------------|-----------------|--------|-------|
| `id` | `meal_grocery_list_item.id` | ❌ Table doesn't exist | UUID primary key |
| `ingredientId` | `meal_grocery_list_item.ingredient_id` | ❌ Table doesn't exist | FK to meal_ingredient |
| `name` | `meal_grocery_list_item.name` | ❌ Table doesn't exist | TEXT |
| `quantity` | `meal_grocery_list_item.quantity` | ❌ Table doesn't exist | NUMERIC |
| `customQuantity` | `meal_grocery_list_item.custom_quantity` | ❌ Table doesn't exist | NUMERIC (optional) |
| `unit` | `meal_grocery_list_item.unit` | ❌ Table doesn't exist | TEXT |
| `category` | `meal_grocery_list_item.category` | ❌ Table doesn't exist | ENUM via CHECK constraint |
| `purchaseFrequency` | `meal_grocery_list_item.purchase_frequency` | ❌ Table doesn't exist | ENUM: weekly/monthly |
| `storageType` | `meal_grocery_list_item.storage_type` | ❌ Table doesn't exist | ENUM: fresh/frozen/pantry |
| `isChecked` | `meal_grocery_list_item.is_checked` | ❌ Table doesn't exist | BOOLEAN |
| `isCustom` | `meal_grocery_list_item.is_custom` | ❌ Table doesn't exist | BOOLEAN |
| `mealSources` | `meal_grocery_list_item_source` table | ❌ Table doesn't exist | Separate junction table |

### 3.4 Recommendations for Grocery List

**HIGH PRIORITY:**
1. ✅ Create `meal_grocery_list_item` table (main grocery list)
2. ✅ Create `meal_grocery_list_item_source` table (junction table for meal sources)
3. ✅ Add user_id foreign key to associate lists with users

**MEDIUM PRIORITY:**
4. Add functionality to auto-aggregate quantities from multiple meals
5. Add `meal_grocery_list` table for versioning/history (optional)
6. Add indexes for filtering by category, storage type, and purchase frequency

**LOW PRIORITY:**
7. Add `meal_grocery_store` table for store locations/preferences
8. Add `meal_grocery_price_history` table for price tracking

**NOTES:**
- `mealSources` is an array in mock data but should be a separate junction table in DB
- `customQuantity` allows users to override calculated quantities
- Consider adding a "last purchased date" field for tracking

---

## Part 4: PRIORITY ACTION PLAN

### Phase 1: Core Tables (CRITICAL - Do First)

#### Milestone 1.1: Meal Tables
- [ ] Create `meal_recipe` table
- [ ] Create `meal_recipe_media` table
- [ ] Create `meal_ingredient` table
- [ ] Create `meal_preparation_step` table
- [ ] Add RLS policies for public read, authenticated write
- [ ] Add updated_at trigger functions

#### Milestone 1.2: Workout Tables
- [ ] Create `workout_exercise` table (CRITICAL - referenced by existing `workout_exercise_media`)
- [ ] Create `workout_set` table
- [ ] Create `workout_instruction_step` table
- [ ] Create `workout_exercise_tip` table
- [ ] Add RLS policies
- [ ] Add updated_at trigger functions

#### Milestone 1.3: Grocery Tables
- [ ] Create `meal_grocery_list_item` table
- [ ] Create `meal_grocery_list_item_source` table (junction table)
- [ ] Add RLS policies (user can only access own list)
- [ ] Add updated_at trigger functions

### Phase 2: Scheduling & User Association (MEDIUM PRIORITY)

- [ ] Create `meal_user_schedule` table (link users to meals with dates)
- [ ] Create `workout_user_schedule` table (link users to exercises with dates)
- [ ] Add user-specific meal/workout plans

### Phase 3: Enhanced Features (LOW PRIORITY)

- [ ] Favorites tables (`meal_user_favorite`, `workout_user_favorite`)
- [ ] Rating/review tables
- [ ] Progress tracking tables
- [ ] Recipe categories and tags

---

## Part 5: MIGRATION SQL FILES NEEDED

### File 1: `20250112_create_meal_tables.sql`
```sql
-- Create meal_recipe table
-- Create meal_recipe_media table
-- Create meal_ingredient table
-- Create meal_preparation_step table
-- Add indexes, constraints, RLS policies
```

### File 2: `20250112_create_workout_tables.sql`
```sql
-- Create workout_exercise table (CRITICAL!)
-- Create workout_set table
-- Create workout_instruction_step table
-- Create workout_exercise_tip table
-- Add indexes, constraints, RLS policies
```

### File 3: `20250112_create_grocery_tables.sql`
```sql
-- Create meal_grocery_list_item table
-- Create meal_grocery_list_item_source table
-- Add indexes, constraints, RLS policies
```

---

## Part 6: TYPE MISMATCHES & ADJUSTMENTS

### TypeScript Type Adjustments Needed

#### 1. `MealIngredient` vs `GroceryItem`
**Issue**: `MealIngredient` and `Ingredient` have overlapping but different structures.

**Solution**: 
- Keep `MealIngredient` for display in meal details (simple: id, name, quantity, unit, icon)
- Use `Ingredient` as base for `GroceryItem` (adds category, frequency, storage)
- In DB, `meal_ingredient` has basic fields, `meal_grocery_list_item` has extended fields

#### 2. `reps` field in Exercise
**Issue**: Mock data has single `reps` value, but best practice is min/max range.

**Solution**:
- Update TypeScript types to use `repsMin` and `repsMax`
- Update mock data to use ranges (e.g., `repsMin: 8, repsMax: 12`)
- Update UI components to display ranges

#### 3. `gallery` vs `storage_path`
**Issue**: Mock data uses full URLs, DB uses storage paths + buckets.

**Solution**:
- Add helper functions to convert storage paths to public URLs
- Use Supabase Storage API to generate signed URLs
- Cache URLs in app for performance

---

## Part 7: MOCK DATA CLEANUP RECOMMENDATIONS

### Fields to Remove from Mock Data

**None** - All mock data fields are valid and should be preserved.

### Fields to Add to Mock Data

1. **User ID fields**: Add `user_id` to scheduled meals/workouts for testing
2. **Timestamps**: Add `created_at`, `updated_at` for testing sorting
3. **Soft delete**: Add `deleted_at: null` for testing filters

---

## Part 8: CONCLUSION

### Summary of Findings

1. **Database schema is incomplete**: Only user-related and `workout_exercise_media` tables exist
2. **Mock data structure is well-designed**: TypeScript interfaces are comprehensive and logical
3. **No mismatches found**: Mock data aligns perfectly with planned DB schema
4. **Immediate action required**: Create meal, workout, and grocery tables

### Next Steps

1. **Create migration files** for all three feature areas (meals, workouts, grocery)
2. **Run migrations** in Supabase Dashboard or via CLI
3. **Implement service layer** to fetch from DB instead of mock data
4. **Add data seeding script** to populate DB with mock data
5. **Update components** to use real data from Supabase

### Estimated Effort

- **Phase 1 (Core Tables)**: 4-6 hours
- **Phase 2 (Scheduling)**: 2-3 hours
- **Phase 3 (Enhanced Features)**: 4-6 hours (optional)

**Total**: 10-15 hours for complete implementation

---

**Report Generated**: 2025-11-12  
**Analyzed by**: Claude Code Agent  
**Status**: Ready for implementation

