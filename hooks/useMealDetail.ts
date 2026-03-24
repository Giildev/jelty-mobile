import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMealById } from "@/services/mealService";
import type { MealDetail } from "@/types/nutrition";
import { useDashboardStore } from "@/store/dashboardStore";

/**
 * Hook to fetch meal detail data with React Query
 *
 * OPTIMIZATION:
 * - Caches meal data globally (shared across screens)
 * - Checks Dashboard Zustand store first for instant zero-latency loading
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
  const cachedPlan = useDashboardStore((s) => s.todayMealPlan);

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

      // 1. Check Dashboard Store for instant load
      if (cachedPlan?.slots) {
        const slot = cachedPlan.slots.find((s) => s.recipe?.id === mealId);
        if (slot?.recipe) {
          console.log("[useMealDetail] Found meal in Zustand cache:", mealId);
          const recipe = slot.recipe;
          
          // Map to MealDetail interface
          return {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description || "",
            calories: parseFloat((recipe as any).energyKcalPerServing) || 0,
            macros: {
              carbs: parseFloat((recipe as any).carbGPerServing) || 0,
              protein: parseFloat((recipe as any).proteinGPerServing) || 0,
              fat: parseFloat((recipe as any).fatGPerServing) || 0,
            },
            imageUrl: undefined, // Handled by fallback
            type: (slot.mealType?.toLowerCase() || "lunch") as any,
            gallery: [],
            micros: (recipe as any).microsPerServing,
            ingredients: (recipe.ingredients || []).map((ing: any) => {
              const baseIng = ing.ingredient || {};
              return {
                id: ing.id || Math.random().toString(),
                name: baseIng.name || ing.ingredientName || "Ingredient",
                quantity: parseFloat(ing.quantity || ing.gramsEquivalent) || 0,
                unit: ing.unit || baseIng.defaultUnit || "g",
                icon: baseIng.iconEmoji || ing.iconEmoji || "🍽️",
                grams: parseFloat(ing.grams) || 0,
                microsPerGram: baseIng.microsPerGram || {
                  iron_mg: parseFloat(baseIng.ironMgPerGram) || 0,
                  zinc_mg: parseFloat(baseIng.zincMgPerGram) || 0,
                  calcium_mg: parseFloat(baseIng.calciumMgPerGram) || 0,
                  vitaminC_mg: parseFloat(baseIng.vitaminCMgPerGram) || 0,
                  potassium_mg: parseFloat(baseIng.potassiumMgPerGram) || 0,
                  selenium_mcg: parseFloat(baseIng.seleniumMcgPerGram) || 0,
                  vitaminA_mcg: parseFloat(baseIng.vitaminAMcgPerGram) || 0,
                  vitaminD_mcg: parseFloat(baseIng.vitaminDMcgPerGram) || 0,
                },
                macrosPerGram: {
                  energyKcal: parseFloat(baseIng.energyKcalPerGram) || 0,
                  proteinG: parseFloat(baseIng.proteinGPerGram) || 0,
                  carbG: parseFloat(baseIng.carbGPerGram) || 0,
                  fatG: parseFloat(baseIng.fatGPerGram) || 0,
                }
              };
            }),
            preparationSteps: (recipe.steps || []).map((step: any) => ({
              id: Math.random().toString(),
              stepNumber: step.orderIndex,
              instruction: step.instruction,
            })),
            servings: 1,
            prepTime: recipe.prepTimeMinutes || 0,
            cookTime: recipe.cookTimeMinutes || 0,
          } as MealDetail;
        }
      }

      // 2. Fallback to API fetch
      console.log("[useMealDetail] Fetching meal data from API for:", mealId);
      const data = await getMealById(mealId);

      if (!data) {
        throw new Error("Meal not found");
      }

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
