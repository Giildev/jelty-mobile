import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getExerciseById } from "@/services/exerciseService";
import { WorkoutExercise } from "@/services/api/plans";
import type { ExerciseDetail, ExerciseInstructions } from "@/types/workout";
import { useDashboardStore } from "@/store/dashboardStore";

/**
 * Hook to fetch exercise detail data with React Query
 *
 * OPTIMIZATION:
 * - Caches exercise data globally (shared across screens)
 * - Checks Dashboard Zustand store first for instant zero-latency loading
 *   (matches by name since WorkoutCard passes name instead of ID currently)
 * - staleTime: 10 minutes (data stays fresh longer)
 *
 * Usage:
 * ```tsx
 * const { exerciseDetail, loading, error, refetch } = useExerciseDetail(exerciseId);
 * ```
 *
 * @param exerciseId - ID (or name) of the exercise to fetch
 * @returns exerciseDetail, loading, error, refetch
 */
export function useExerciseDetail(exerciseId: string | null | undefined) {
  const cachedWorkout = useDashboardStore((s) => s.todayWorkout);

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

      // 1. Check Dashboard Store for instant load
      if (cachedWorkout && !("isRestDay" in cachedWorkout && cachedWorkout.isRestDay === true)) {
        const allExercises = [
          ...(cachedWorkout.warmUp?.exercises || []),
          ...(cachedWorkout.main?.exercises || []),
          ...(cachedWorkout.stretch?.exercises || []),
        ];

        const foundEx = allExercises.find(
          (ex: WorkoutExercise) =>
            ex.exerciseId === exerciseId || ex.name === exerciseId
        );

        if (foundEx) {
          console.log("[useExerciseDetail] Found exercise in Zustand cache:", exerciseId);

          return {
            id: foundEx.exerciseId || exerciseId,
            name: foundEx.name,
            description: foundEx.description || "",
            primaryMuscle: foundEx.primaryMuscle || "Full Body",
            equipment: foundEx.equipment || "Bodyweight",
            category: foundEx.category || "main",
            gallery: [],
            instructions: {
              sets: foundEx.numberOfSets || 0,
              repsMin: typeof foundEx.repsPerSet === 'number' ? foundEx.repsPerSet : parseInt(String(foundEx.repsPerSet)) || 0,
              repsMax: typeof foundEx.repsPerSet === 'number' ? foundEx.repsPerSet : parseInt(String(foundEx.repsPerSet)) || 0,
              rir: foundEx.rir || 0,
              restTimeSeconds: foundEx.restSeconds || 0,
            } as ExerciseInstructions,
            howToPerformSteps: (foundEx.instructions || []).map((s: any) => ({
              id: Math.random().toString(),
              orderIndex: s.stepNumber || s.orderIndex,
              instruction: s.instruction,
            })),
            tips: foundEx.tips || [],
            numberOfSets: foundEx.numberOfSets || 0,
            repsPerSet: foundEx.repsPerSet || 0,
            weightMin: foundEx.weightMin || "Bodyweight",
            weightMax: foundEx.weightMax || "Bodyweight",
            rir: foundEx.rir || 0,
            restSeconds: foundEx.restSeconds || 0,
          } as ExerciseDetail;
        }
      }

      // 2. Fallback to API API fetch if it's a UUID
      // Note: If the ID is a name (from WorkoutCard) and not in cache, the backend will fail with 400 UUID expected.
      // But we prevent that by caching the dashboard properly.
      console.log("[useExerciseDetail] Fetching exercise data from API for:", exerciseId);
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
