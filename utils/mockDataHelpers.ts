/**
 * Helper functions to work with mock data
 */

import { MEAL_DETAILS_MOCK, EXERCISE_DETAILS_MOCK } from "@/constants/mockData";

/**
 * Get the primary image URL for a meal by its ID
 * @param mealId - The ID of the meal
 * @returns The URL of the first image in the gallery, or undefined if not found
 */
export function getMealImageUrl(mealId: string): string | undefined {
  console.log(`[getMealImageUrl] Looking for: ${mealId}`);
  console.log(`[getMealImageUrl] Total meals in MOCK: ${MEAL_DETAILS_MOCK.length}`);

  const mealDetail = MEAL_DETAILS_MOCK.find((meal) => meal.id === mealId);

  if (!mealDetail) {
    console.log(`[getMealImageUrl] ❌ NOT FOUND: ${mealId}`);
    console.log(`[getMealImageUrl] Available IDs:`, MEAL_DETAILS_MOCK.map(m => m.id).slice(0, 10));
    return undefined;
  }

  // Get first image from gallery
  const firstImage = mealDetail.gallery.find((item) => item.type === "image");
  const url = firstImage?.url;
  console.log(`[getMealImageUrl] ✅ ${mealId} -> ${url || "NO IMAGE IN GALLERY"}`);
  return url;
}

/**
 * Get the primary image URL for an exercise by its ID
 * @param exerciseId - The ID of the exercise
 * @returns The URL of the primary image, or the first image if no primary is found
 */
export function getExerciseImageUrl(exerciseId: string): string | undefined {
  const exerciseDetail = EXERCISE_DETAILS_MOCK.find((ex) => ex.id === exerciseId);
  if (!exerciseDetail) return undefined;

  // Try to get primary image first
  const primaryImage = exerciseDetail.gallery.find(
    (item) => item.type === "image" && item.role === "primary"
  );

  if (primaryImage) return primaryImage.url;

  // Fallback to first image
  const firstImage = exerciseDetail.gallery.find((item) => item.type === "image");
  return firstImage?.url;
}
