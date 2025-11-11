/**
 * Grocery Helper Functions
 *
 * Utility functions for filtering, grouping, and managing grocery items
 */

import {
  GroceryItem,
  GroceryViewMode,
  StorageType,
  IngredientCategory,
  CategorySection,
} from "@/types/grocery";

/**
 * Category labels for display
 */
export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  vegetables: "VEGETABLES",
  fruits: "FRUITS",
  proteins: "PROTEINS",
  dairy: "DAIRY",
  grains: "GRAINS",
  spices: "SPICES",
  oils: "OILS & FATS",
  condiments: "CONDIMENTS",
  beverages: "BEVERAGES",
  other: "OTHER",
};

/**
 * Filter grocery items by purchase frequency (weekly/monthly/all)
 */
export function filterByFrequency(
  items: GroceryItem[],
  viewMode: GroceryViewMode
): GroceryItem[] {
  if (viewMode === "all") {
    return items;
  }
  return items.filter((item) => item.purchaseFrequency === viewMode);
}

/**
 * Filter grocery items by storage type (fresh/frozen/pantry/all)
 */
export function filterByStorageType(
  items: GroceryItem[],
  storageType: StorageType | "all"
): GroceryItem[] {
  if (storageType === "all") {
    return items;
  }
  return items.filter((item) => item.storageType === storageType);
}

/**
 * Group grocery items by category
 * Returns an array of category sections sorted by category name
 */
export function groupByCategory(items: GroceryItem[]): CategorySection[] {
  // Group items by category
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<IngredientCategory, GroceryItem[]>);

  // Convert to array of sections and sort
  return Object.entries(grouped)
    .map(([category, categoryItems]) => ({
      category: category as IngredientCategory,
      label: CATEGORY_LABELS[category as IngredientCategory],
      items: categoryItems,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Apply all filters and grouping to grocery items
 */
export function getFilteredAndGroupedItems(
  items: GroceryItem[],
  viewMode: GroceryViewMode,
  storageFilter: StorageType | "all"
): CategorySection[] {
  let filtered = items;

  // Apply frequency filter
  filtered = filterByFrequency(filtered, viewMode);

  // Apply storage type filter
  filtered = filterByStorageType(filtered, storageFilter);

  // Group by category
  return groupByCategory(filtered);
}

/**
 * Calculate total number of items (excluding checked items if specified)
 */
export function getTotalItemCount(
  items: GroceryItem[],
  excludeChecked: boolean = false
): number {
  if (excludeChecked) {
    return items.filter((item) => !item.isChecked).length;
  }
  return items.length;
}

/**
 * Calculate number of checked items
 */
export function getCheckedItemCount(items: GroceryItem[]): number {
  return items.filter((item) => item.isChecked).length;
}

/**
 * Calculate completion percentage
 */
export function getCompletionPercentage(items: GroceryItem[]): number {
  if (items.length === 0) return 0;
  const checked = getCheckedItemCount(items);
  return Math.round((checked / items.length) * 100);
}

/**
 * Format quantity with unit for display
 */
export function formatQuantity(quantity: number, unit: string): string {
  // Handle decimal quantities
  const formattedQty = quantity % 1 === 0 ? quantity : quantity.toFixed(1);
  return `${formattedQty}${unit}`;
}

/**
 * Get unique storage types from items
 */
export function getAvailableStorageTypes(
  items: GroceryItem[]
): StorageType[] {
  const types = new Set(items.map((item) => item.storageType));
  return Array.from(types).sort();
}

/**
 * Get unique categories from items
 */
export function getAvailableCategories(
  items: GroceryItem[]
): IngredientCategory[] {
  const categories = new Set(items.map((item) => item.category));
  return Array.from(categories).sort();
}

/**
 * Generate a unique ID for new grocery items
 */
export function generateGroceryItemId(existingItems: GroceryItem[]): string {
  const maxId = existingItems.reduce((max, item) => {
    const numericId = parseInt(item.id.replace(/\D/g, ""), 10);
    return isNaN(numericId) ? max : Math.max(max, numericId);
  }, 0);
  return `g${maxId + 1}`;
}
