import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fetchTodayMealPlan, fetchTodayWorkout } from "@/services/api/plans";

/**
 * Fetches today's meal plan.
 * Only enabled when `enabled` is true (i.e., pipeline is done).
 */
export function useTodayMealPlan(userId: string | null, enabled: boolean) {
  const today = format(new Date(), "yyyy-MM-dd");
  return useQuery({
    queryKey: ["meal-plan", "today", userId, today],
    queryFn: () => fetchTodayMealPlan(userId!, today),
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
  const today = format(new Date(), "yyyy-MM-dd");
  return useQuery({
    queryKey: ["workout", "today", userId, today],
    queryFn: () => fetchTodayWorkout(userId!, today),
    enabled: !!userId && enabled,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
