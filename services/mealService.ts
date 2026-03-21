import { MealDetail } from "@/types/nutrition";
import { fetchRecipeById } from "./api/plans";

/**
 * Get meal detail by ID
 * @param mealId - The ID of the meal (recipe) to fetch
 * @returns Promise with meal detail data
 */
export const getMealById = async (mealId: string): Promise<MealDetail> => {
  const data = await fetchRecipeById(mealId);
  
  if (!data) {
    throw new Error(`Meal with ID ${mealId} not found`);
  }

  return data;
};

/**
 * Get multiple meals by IDs
 */
export const getMealsByIds = async (
  mealIds: string[]
): Promise<MealDetail[]> => {
  const results = await Promise.all(
    mealIds.map(id => fetchRecipeById(id).catch(() => null))
  );
  return results.filter((m): m is MealDetail => m !== null);
};

/**
 * Get all available meals (Not supported by real API yet, returning empty)
 */
export const getAllMeals = async (): Promise<MealDetail[]> => {
  return [];
};
