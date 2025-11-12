/**
 * Meal Service
 *
 * Service for fetching meal data. Currently uses mock data,
 * but can be extended to use real API calls in the future.
 */

import { MealDetail } from "@/types/nutrition";
import { MEAL_DETAILS_MOCK } from "@/constants/mockData";

/**
 * Simulates API delay for realistic loading states
 */
const simulateDelay = (ms: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get meal detail by ID
 * @param mealId - The ID of the meal to fetch
 * @returns Promise with meal detail data
 * @throws Error if meal is not found
 */
export const getMealById = async (mealId: string): Promise<MealDetail> => {
  // Simulate network delay
  await simulateDelay(100);

  const meal = MEAL_DETAILS_MOCK.find((m) => m.id === mealId);

  if (!meal) {
    throw new Error(`Meal with ID ${mealId} not found`);
  }

  return meal;
};

/**
 * Get multiple meals by IDs
 * @param mealIds - Array of meal IDs to fetch
 * @returns Promise with array of meal details
 */
export const getMealsByIds = async (
  mealIds: string[]
): Promise<MealDetail[]> => {
  // Simulate network delay
  await simulateDelay(150);

  const meals = MEAL_DETAILS_MOCK.filter((m) => mealIds.includes(m.id));

  return meals;
};

/**
 * Get all available meals
 * @returns Promise with array of all meal details
 */
export const getAllMeals = async (): Promise<MealDetail[]> => {
  // Simulate network delay
  await simulateDelay(200);

  return MEAL_DETAILS_MOCK;
};
