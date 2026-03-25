import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { GroceryItem } from "@/types/grocery";

/**
 * Fetches the latest grocery list for a user.
 */
export async function fetchLatestGroceryList(userId: string): Promise<GroceryItem[]> {
  const response = await apiClient.get(API_ENDPOINTS.grocery.latest, {
    params: { userId },
  });

  const backendData = response.data;
  const list = backendData.data;

  if (!list || !list.items) {
    return [];
  }

  return list.items.map((item: any) => ({
    id: item.id,
    ingredientId: item.ingredientId,
    name: item.ingredient?.name || "Ingredient",
    quantity: parseFloat(item.totalQuantity) || 0,
    unit: item.unit || "g",
    category: mapCategory(item.category),
    storageType: mapStorageType(item.storageType),
    purchaseFrequency: "weekly", // Default to weekly for now
    isChecked: item.isPurchased || false,
    isCustom: item.isCustom || false,
    icon: item.ingredient?.iconEmoji,
  }));
}

/**
 * Toggles the purchase status of a grocery item in the backend.
 */
export async function toggleGroceryItem(itemId: string, userId: string): Promise<void> {
  await apiClient.patch(API_ENDPOINTS.grocery.toggle(itemId), { userId });
}

/**
 * Manual regeneration of grocery list.
 */
export async function regenerateGroceryList(mealPlanId: string, userId: string): Promise<void> {
  await apiClient.post(API_ENDPOINTS.grocery.regenerate, { mealPlanId, userId });
}

/**
 * Helper to map backend category to frontend IngredientCategory
 */
function mapCategory(backendCategory: string): any {
  if (!backendCategory) return "other";
  const cat = backendCategory.toLowerCase();
  if (cat.includes("protein")) return "proteins";
  if (cat.includes("carb")) return "grains";
  if (cat.includes("fat")) return "oils";
  if (cat.includes("vegetable")) return "vegetables";
  if (cat.includes("fruit")) return "fruits";
  if (cat.includes("dairy")) return "dairy";
  if (cat.includes("pantry")) return "other";
  return "other";
}

/**
 * Helper to map backend storage type to frontend StorageType
 */
function mapStorageType(backendStorage: string): any {
  if (!backendStorage) return "pantry";
  const storage = backendStorage.toLowerCase();
  if (storage.includes("fresh") || storage.includes("refrigerated")) return "fresh";
  if (storage.includes("frozen")) return "frozen";
  if (storage.includes("pantry")) return "pantry";
  return "pantry";
}
