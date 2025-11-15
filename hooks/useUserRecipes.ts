import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";
import { fetchUserRecipes } from "@/services/api/recipesService";
import { mapApiRecipesToScheduledMeals } from "@/utils/recipeMappers";
import type { ScheduledMeal } from "@/types/nutrition";
import { useUserData } from "./useUserData";

/**
 * Hook to fetch and cache user recipes/meals from the API
 *
 * FEATURES:
 * - Fetches recipes from the chef API
 * - Caches data globally with React Query (10 min staleTime)
 * - Maps API responses to ScheduledMeal type
 * - Automatically gets user ID from Clerk and Supabase
 *
 * Usage:
 * ```tsx
 * const { recipes, isLoading, error, refetch } = useUserRecipes();
 * ```
 *
 * @returns recipes, isLoading, error, refetch
 */
export function useUserRecipes() {
  // Get Clerk user ID
  const { user: clerkUser } = useUser();
  const clerkUserId = clerkUser?.id;

  // Get Supabase user ID from cached user data
  const { userData } = useUserData(clerkUserId);
  const supabaseUserId = userData?.user?.id;

  const {
    data: recipes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // Query key: ['recipes', supabaseUserId]
    queryKey: ["recipes", supabaseUserId],

    // Query function: fetch recipes and map them
    queryFn: async (): Promise<ScheduledMeal[]> => {
      if (!supabaseUserId) {
        throw new Error("Supabase user ID is required");
      }

      console.log(
        "[useUserRecipes] Fetching recipes for user:",
        supabaseUserId
      );

      // Fetch from API
      const response = await fetchUserRecipes(supabaseUserId);

      if (!response.success || !response.data) {
        throw new Error("Failed to fetch recipes");
      }

      console.log(
        `[useUserRecipes] Fetched ${response.data.recipes.length} recipes`
      );

      // Map API response to ScheduledMeal[]
      const mappedRecipes = mapApiRecipesToScheduledMeals(
        response.data.recipes
      );

      return mappedRecipes;
    },

    // Only run if we have the Supabase user ID
    enabled: !!supabaseUserId,

    // Cache configuration
    staleTime: 10 * 60 * 1000, // 10 minutes - data considered fresh
    gcTime: 15 * 60 * 1000, // 15 minutes - keep in cache

    // Don't refetch automatically
    refetchOnMount: false,
    refetchOnWindowFocus: false,

    // Retry configuration
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1s between retries
  });

  return {
    recipes: recipes || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to invalidate the recipes cache
 * Useful when adding/updating/deleting recipes
 *
 * Usage:
 * ```tsx
 * const invalidateRecipes = useInvalidateRecipes();
 *
 * // After updating a recipe:
 * await updateRecipe(data);
 * invalidateRecipes(); // Invalidates cache and triggers refetch
 * ```
 */
export function useInvalidateRecipes() {
  const queryClient = useQueryClient();
  const { user: clerkUser } = useUser();
  const clerkUserId = clerkUser?.id;
  const { userData } = useUserData(clerkUserId);
  const supabaseUserId = userData?.user?.id;

  return () => {
    if (!supabaseUserId) {
      console.warn("[useInvalidateRecipes] No user ID available");
      return;
    }

    console.log(
      "[useInvalidateRecipes] Invalidating recipes cache for:",
      supabaseUserId
    );

    queryClient.invalidateQueries({
      queryKey: ["recipes", supabaseUserId],
    });
  };
}
