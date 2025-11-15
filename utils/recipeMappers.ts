/**
 * Recipe Mappers
 * Functions to map API response types to app domain types
 */

import type { ApiRecipe, ApiRecipeDetail } from "@/types/api";

/**
 * Fix malformed Supabase URLs from backend
 * Converts: https://meal-media.supabase.co/storage/v1/object/public/xxx/yyy.png
 * To: https://zsrjmwciovzfssluorqi.supabase.co/storage/v1/object/public/meal-media/xxx/yyy.png
 */
function fixSupabaseImageUrl(url: string): string {
  if (!url) return url;

  // Check if URL is malformed (missing project ID)
  if (url.includes("meal-media.supabase.co")) {
    // Replace with correct Supabase project URL
    return url.replace(
      "https://meal-media.supabase.co/storage/v1/object/public/",
      "https://zsrjmwciovzfssluorqi.supabase.co/storage/v1/object/public/meal-media/"
    );
  }

  return url;
}

import type {
  ScheduledMeal,
  MealDetail,
  MediaItem,
  MealIngredient,
  PreparationStep,
  Micros,
} from "@/types/nutrition";
import { getTimeFromSlotIndex } from "./mealTimeHelpers";

/**
 * Maps an API recipe to a ScheduledMeal for use in the app
 * @param apiRecipe - Recipe from API
 * @returns ScheduledMeal object
 */
export function mapApiRecipeToScheduledMeal(
  apiRecipe: ApiRecipe
): ScheduledMeal {
  return {
    id: apiRecipe.id,
    name: apiRecipe.name,
    description: apiRecipe.description,
    calories: apiRecipe.caloriesPerServing, // Use per serving for display
    macros: {
      carbs: apiRecipe.carbsPerServing,
      protein: apiRecipe.proteinPerServing,
      fat: apiRecipe.fatsPerServing,
    },
    date: apiRecipe.dayDate.split("T")[0], // Extract just the date part
    time: getTimeFromSlotIndex(apiRecipe.slotIndex),
    type: apiRecipe.mealType,
    imageUrl: fixSupabaseImageUrl(apiRecipe.image),
  };
}

/**
 * Maps multiple API recipes to ScheduledMeal array
 * @param apiRecipes - Array of recipes from API
 * @returns Array of ScheduledMeal objects
 */
export function mapApiRecipesToScheduledMeals(
  apiRecipes: ApiRecipe[]
): ScheduledMeal[] {
  return apiRecipes.map(mapApiRecipeToScheduledMeal);
}

/**
 * Maps API recipe detail to MealDetail for use in detail views
 * @param apiDetail - Detailed recipe from API
 * @returns MealDetail object
 */
export function mapApiRecipeToMealDetail(
  apiDetail: ApiRecipeDetail
): MealDetail {
  // Map ingredients
  const ingredients: MealIngredient[] = apiDetail.ingredients.map((ing) => ({
    id: ing.id,
    name: ing.name,
    quantity: ing.quantity,
    unit: ing.unit,
    icon: ing.icon || undefined,
  }));

  // Map preparation steps
  const preparationSteps: PreparationStep[] = apiDetail.steps.map((step) => ({
    id: step.number.toString(),
    stepNumber: step.number,
    instruction: step.instruction,
  }));

  // Map media/gallery
  // If media array is empty but image exists, use image as first gallery item
  const gallery: MediaItem[] =
    apiDetail.media.length > 0
      ? apiDetail.media.map((media, index) => ({
          id: media.id || `media-${index}`,
          type: media.type,
          url: fixSupabaseImageUrl(media.url),
          thumbnail: media.thumbnail ? fixSupabaseImageUrl(media.thumbnail) : undefined,
        }))
      : apiDetail.image
        ? [
            {
              id: `${apiDetail.id}-main-image`,
              type: "image" as const,
              url: fixSupabaseImageUrl(apiDetail.image),
              thumbnail: fixSupabaseImageUrl(apiDetail.image),
            },
          ]
        : [];

  // Map micros
  const micros: Micros = {
    potassium: apiDetail.microsPerServing.potassium,
    calcium: apiDetail.microsPerServing.calcium,
    iron: apiDetail.microsPerServing.iron,
    vitaminD: apiDetail.microsPerServing.vitaminD,
    vitaminB12: apiDetail.microsPerServing.vitaminB12,
    omega3: apiDetail.microsPerServing.omega3,
  };

  return {
    id: apiDetail.id,
    name: apiDetail.name,
    description: apiDetail.description,
    calories: apiDetail.macrosPerServing.calories,
    macros: {
      carbs: apiDetail.macrosPerServing.carbs,
      protein: apiDetail.macrosPerServing.protein,
      fat: apiDetail.macrosPerServing.fats,
    },
    type: apiDetail.mealType,
    imageUrl: fixSupabaseImageUrl(apiDetail.image),
    gallery,
    ingredients,
    preparationSteps,
    servings: apiDetail.servings,
    prepTime: apiDetail.prepTimeMinutes,
    cookTime: apiDetail.cookTimeMinutes,
    totalTime: apiDetail.totalTimeMinutes,
    micros,
  };
}
