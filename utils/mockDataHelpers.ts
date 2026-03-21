/**
 * Helper functions to work with images
 */

/**
 * Get the primary image URL for a meal by its ID
 */
export function getMealImageUrl(mealId: string): string {
  // Fallback for premium look if real image not found
  return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&h=200&auto=format&fit=crop`;
}

/**
 * Get the primary image URL for an exercise by its ID
 */
export function getExerciseImageUrl(exerciseId: string): string {
  // Fallback for exercises
  return `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&h=200&auto=format&fit=crop`;
}
