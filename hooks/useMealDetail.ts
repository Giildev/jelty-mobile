import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRecipeDetail } from "@/services/api/recipesService";
import { mapApiRecipeToMealDetail } from "@/utils/recipeMappers";
import type { MealDetail } from "@/types/nutrition";

/**
 * Hook to fetch meal detail data with React Query
 *
 * OPTIMIZATION:
 * - Caches meal data globally (shared across screens)
 * - Avoids redundant calls to getMealById()
 * - staleTime: 10 minutes (data stays fresh longer)
 * - Enables instant navigation with cached data
 *
 * Usage:
 * ```tsx
 * const { mealDetail, loading, error, refetch } = useMealDetail(mealId);
 * ```
 *
 * @param mealId - ID of the meal to fetch
 * @returns mealDetail, loading, error, refetch
 */
export function useMealDetail(mealId: string | null | undefined) {
  const {
    data: mealDetail,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // Query key: ['meal', mealId] - unique per meal
    queryKey: ["meal", mealId],

    // Query function: fetch from API and map to MealDetail
    queryFn: async (): Promise<MealDetail> => {
      if (!mealId) {
        throw new Error("Meal ID is required");
      }
      console.log("[useMealDetail] Fetching meal data for:", mealId);

      // Fetch from API
      const response = await fetchRecipeDetail(mealId);

      if (!response.success || !response.data) {
        throw new Error("Meal not found");
      }

      // Map API response to MealDetail
      const mappedMeal = mapApiRecipeToMealDetail(response.data);

      return mappedMeal;
    },

    // Only execute if we have mealId
    enabled: !!mealId,

    // Cache configuration
    staleTime: 10 * 60 * 1000, // 10 minutes (meal data doesn't change frequently)
    gcTime: 15 * 60 * 1000, // 15 minutes

    // No automatic refetch
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    mealDetail,
    loading: isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to invalidate meal detail cache
 * Useful after updating a meal
 *
 * Usage:
 * ```tsx
 * const invalidateMealDetail = useInvalidateMealDetail();
 *
 * // After updating meal:
 * await updateMeal(data);
 * invalidateMealDetail(mealId); // Invalidate cache
 * ```
 */
export function useInvalidateMealDetail() {
  const queryClient = useQueryClient();

  return (mealId: string) => {
    console.log("[useInvalidateMealDetail] Invalidating cache for:", mealId);
    queryClient.invalidateQueries({
      queryKey: ["meal", mealId],
    });
  };
}

/**
 * Hook to prefetch meal detail data
 * Useful for preloading data when user is likely to navigate
 *
 * Usage:
 * ```tsx
 * const prefetchMeal = usePrefetchMealDetail();
 *
 * // On card press/hover:
 * prefetchMeal(mealId);
 * ```
 */
export function usePrefetchMealDetail() {
  const queryClient = useQueryClient();

  return (mealId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["meal", mealId],
      queryFn: async () => {
        const response = await fetchRecipeDetail(mealId);
        if (!response.success || !response.data) {
          throw new Error("Meal not found");
        }
        return mapApiRecipeToMealDetail(response.data);
      },
      staleTime: 10 * 60 * 1000,
    });
  };
}

/**
 * Hook to manually update meal cache without refetch
 * Useful for optimistic updates
 *
 * Usage:
 * ```tsx
 * const updateMealCache = useUpdateMealCache();
 *
 * // Update cache optimistically:
 * updateMealCache(mealId, { name: "New Name" });
 * ```
 */
export function useUpdateMealCache() {
  const queryClient = useQueryClient();

  return (mealId: string, updates: Partial<MealDetail>) => {
    console.log("[useUpdateMealCache] Updating cache for:", mealId);
    queryClient.setQueryData(
      ["meal", mealId],
      (oldData: MealDetail | undefined) => {
        if (!oldData) return oldData;
        return { ...oldData, ...updates };
      }
    );
  };
}
