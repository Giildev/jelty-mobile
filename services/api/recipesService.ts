/**
 * Recipes Service
 * Handles all API calls related to recipes/meals
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  RecipesApiResponse,
  RecipeDetailApiResponse,
} from "@/types/api";

/**
 * Fetch all recipes for a user
 * @param userId - User's database UUID (supabase user ID)
 * @returns Promise with recipes data
 */
export async function fetchUserRecipes(
  userId: string
): Promise<RecipesApiResponse> {
  try {
    const response = await apiClient.post<RecipesApiResponse>(
      API_ENDPOINTS.chef.recipes,
      { userId }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    throw error;
  }
}

/**
 * Fetch detailed information for a specific recipe
 * @param recipeId - Recipe UUID
 * @returns Promise with recipe detail data
 */
export async function fetchRecipeDetail(
  recipeId: string
): Promise<RecipeDetailApiResponse> {
  try {
    const response = await apiClient.get<RecipeDetailApiResponse>(
      API_ENDPOINTS.chef.recipeDetail(recipeId)
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe detail for ${recipeId}:`, error);
    throw error;
  }
}
