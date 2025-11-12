import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getExerciseById } from "@/services/exerciseService";
import type { ExerciseDetail } from "@/types/workout";

/**
 * Hook to fetch exercise detail data with React Query
 *
 * OPTIMIZATION:
 * - Caches exercise data globally (shared across screens)
 * - Avoids redundant calls to getExerciseById()
 * - staleTime: 10 minutes (data stays fresh longer)
 * - Enables instant navigation with cached data
 *
 * Usage:
 * ```tsx
 * const { exerciseDetail, loading, error, refetch } = useExerciseDetail(exerciseId);
 * ```
 *
 * @param exerciseId - ID of the exercise to fetch
 * @returns exerciseDetail, loading, error, refetch
 */
export function useExerciseDetail(exerciseId: string | null | undefined) {
  const {
    data: exerciseDetail,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // Query key: ['exercise', exerciseId] - unique per exercise
    queryKey: ["exercise", exerciseId],

    // Query function: call getExerciseById
    queryFn: async () => {
      if (!exerciseId) {
        throw new Error("Exercise ID is required");
      }
      console.log("[useExerciseDetail] Fetching exercise data for:", exerciseId);
      const data = await getExerciseById(exerciseId);

      if (!data) {
        throw new Error("Exercise not found");
      }

      return data;
    },

    // Only execute if we have exerciseId
    enabled: !!exerciseId,

    // Cache configuration
    staleTime: 10 * 60 * 1000, // 10 minutes (exercise data doesn't change frequently)
    gcTime: 15 * 60 * 1000, // 15 minutes

    // No automatic refetch
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    exerciseDetail,
    loading: isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to invalidate exercise detail cache
 * Useful after updating an exercise
 *
 * Usage:
 * ```tsx
 * const invalidateExerciseDetail = useInvalidateExerciseDetail();
 *
 * // After updating exercise:
 * await updateExercise(data);
 * invalidateExerciseDetail(exerciseId); // Invalidate cache
 * ```
 */
export function useInvalidateExerciseDetail() {
  const queryClient = useQueryClient();

  return (exerciseId: string) => {
    console.log("[useInvalidateExerciseDetail] Invalidating cache for:", exerciseId);
    queryClient.invalidateQueries({
      queryKey: ["exercise", exerciseId],
    });
  };
}

/**
 * Hook to prefetch exercise detail data
 * Useful for preloading data when user is likely to navigate
 *
 * Usage:
 * ```tsx
 * const prefetchExercise = usePrefetchExerciseDetail();
 *
 * // On card press/hover:
 * prefetchExercise(exerciseId);
 * ```
 */
export function usePrefetchExerciseDetail() {
  const queryClient = useQueryClient();

  return (exerciseId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["exercise", exerciseId],
      queryFn: () => getExerciseById(exerciseId),
      staleTime: 10 * 60 * 1000,
    });
  };
}

/**
 * Hook to manually update exercise cache without refetch
 * Useful for optimistic updates
 *
 * Usage:
 * ```tsx
 * const updateExerciseCache = useUpdateExerciseCache();
 *
 * // Update cache optimistically:
 * updateExerciseCache(exerciseId, { name: "New Name" });
 * ```
 */
export function useUpdateExerciseCache() {
  const queryClient = useQueryClient();

  return (exerciseId: string, updates: Partial<ExerciseDetail>) => {
    console.log("[useUpdateExerciseCache] Updating cache for:", exerciseId);
    queryClient.setQueryData(
      ["exercise", exerciseId],
      (oldData: ExerciseDetail | undefined) => {
        if (!oldData) return oldData;
        return { ...oldData, ...updates };
      }
    );
  };
}
