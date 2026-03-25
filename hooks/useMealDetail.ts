import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMealById } from "@/services/mealService";
import type { MealDetail } from "@/types/nutrition";
import { useDashboardStore } from "@/store/dashboardStore";
import { useMealPlanStore } from "@/store/mealPlanStore";
import { mapRecipeToMealDetail } from "@/services/api/plans";

/**
 * Hook to fetch meal detail data with React Query
 *
 * OPTIMIZATION:
 * - Caches meal data globally (shared across screens)
 * - Checks Dashboard & MealPlan Zustand stores first for instant zero-latency loading
 * - staleTime: 10 minutes (data stays fresh longer)
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
  const cachedDashboardPlan = useDashboardStore((s) => s.todayMealPlan);
  const { mealDetails: cachedMealDetails, setMealDetail } = useMealPlanStore();

  const {
    data: mealDetail,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // Query key: ['meal', mealId] - unique per meal
    queryKey: ["meal", mealId],

    // Query function: call getMealById
    queryFn: async () => {
      if (!mealId) {
        throw new Error("Meal ID is required");
      }

      // 1. Check MealPlan Store Cache (New)
      if (cachedMealDetails[mealId]) {
        console.log("[useMealDetail] Found meal in MealPlan cache:", mealId);
        return cachedMealDetails[mealId];
      }

      // 2. Check Dashboard Store for instant load
      if (cachedDashboardPlan?.slots) {
        const slot = cachedDashboardPlan.slots.find((s) => s.recipe?.id === mealId);
        if (slot?.recipe) {
          console.log("[useMealDetail] Found meal in Dashboard cache:", mealId);
          const mealDetail = mapRecipeToMealDetail(slot.recipe, slot.mealType);
          // Save to MealPlanStore too
          setMealDetail(mealDetail);
          return mealDetail;
        }
      }

      // 3. Fallback to API fetch
      console.log("[useMealDetail] Fetching meal data from API for:", mealId);
      const data = await getMealById(mealId);

      if (!data) {
        throw new Error("Meal not found");
      }

      // Save to MealPlanStore cache
      setMealDetail(data);

      return data;
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
      queryFn: () => getMealById(mealId),
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
