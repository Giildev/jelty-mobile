import { useQuery } from "@tanstack/react-query";
import { fetchTodayMealPlan, fetchTodayWorkout } from "@/services/api/plans";

/**
 * Fetches today's meal plan.
 * Only enabled when `enabled` is true (i.e., pipeline is done).
 */
export function useTodayMealPlan(userId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ["meal-plan", "today", userId],
    queryFn: () => fetchTodayMealPlan(userId!),
    enabled: !!userId && enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes — plan doesn't change mid-day
    retry: 2,
  });
}

/**
 * Fetches today's workout.
 * Only enabled when `enabled` is true (i.e., pipeline is done).
 */
export function useTodayWorkout(userId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ["workout", "today", userId],
    queryFn: () => fetchTodayWorkout(userId!),
    enabled: !!userId && enabled,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
