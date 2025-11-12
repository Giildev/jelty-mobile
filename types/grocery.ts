/**
 * Grocery List Types
 *
 * Type definitions for the grocery list feature, including ingredients,
 * grocery items, categories, and filters.
 */

/**
 * Category of an ingredient (for grouping in the list)
 */
export type IngredientCategory =
  | "vegetables"
  | "fruits"
  | "proteins"
  | "dairy"
  | "grains"
  | "spices"
  | "oils"
  | "condiments"
  | "beverages"
  | "other";

/**
 * Purchase frequency (weekly vs monthly)
 */
export type PurchaseFrequency = "weekly" | "monthly";

/**
 * Storage type (fresh, frozen, or pantry items)
 */
export type StorageType = "fresh" | "frozen" | "pantry";

/**
 * View mode for grocery list (filter by frequency)
 */
export type GroceryViewMode = "weekly" | "monthly" | "all";

/**
 * Unit of measurement for ingredients
 */
export type MeasurementUnit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "cups"
  | "tbsp"
  | "tsp"
  | "pieces"
  | "units"
  | "oz"
  | "lb";

/**
 * Base ingredient interface
 */
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: MeasurementUnit;
  category: IngredientCategory;
  purchaseFrequency: PurchaseFrequency;
  storageType: StorageType;
}

/**
 * Grocery item (ingredient + UI state)
 */
export interface GroceryItem extends Ingredient {
  ingredientId?: string; // Reference to meal_ingredient.id in database
  isChecked: boolean;
  isCustom: boolean; // User-added vs. from meal plan
  mealSources?: string[]; // IDs of meals that use this ingredient
  customQuantity?: number; // User-edited quantity (if different from calculated)
}

/**
 * Grocery store state
 */
export interface GroceryState {
  items: GroceryItem[];
  viewMode: GroceryViewMode;
  storageFilter: StorageType | "all";
  categoryFilter: IngredientCategory | "all";
}

/**
 * Category section data for rendering
 */
export interface CategorySection {
  category: IngredientCategory;
  label: string;
  items: GroceryItem[];
}

/**
 * Form data for adding custom items
 */
export interface AddCustomItemFormData {
  name: string;
  quantity: number;
  unit: MeasurementUnit;
  category: IngredientCategory;
  purchaseFrequency: PurchaseFrequency;
  storageType: StorageType;
}
