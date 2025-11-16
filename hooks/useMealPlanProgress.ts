import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserData } from "./useUserData";
import { useUser } from "@clerk/clerk-expo";
import {
  getMealPlanProgress,
  calculateProgressPercentage,
  type MealPlanProgress,
} from "@/services/supabase/mealPlanProgress";

/**
 * Hook to check meal plan generation progress
 *
 * Returns:
 * - progress: MealPlanProgress object or null
 * - percentage: Progress percentage (0-100)
 * - isGenerating: true if plan is currently being generated
 * - hasProgress: true if there's any progress record
 * - isLoading: true while fetching
 * - error: Error if something went wrong
 *
 * Usage:
 * ```tsx
 * const { isGenerating, percentage, hasProgress } = useMealPlanProgress();
 * ```
 */
export function useMealPlanProgress() {
  // Get user IDs
  const { user: clerkUser } = useUser();
  const clerkUserId = clerkUser?.id;
  const { userData } = useUserData(clerkUserId);
  const supabaseUserId = userData?.user?.id;

  const {
    data: progress,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["meal-plan-progress", supabaseUserId],

    queryFn: async (): Promise<MealPlanProgress | null> => {
      if (!supabaseUserId) {
        throw new Error("Supabase user ID is required");
      }

      console.log(
        "[useMealPlanProgress] Checking progress for user:",
        supabaseUserId
      );

      const progressData = await getMealPlanProgress(supabaseUserId);

      if (progressData) {
        console.log(
          `[useMealPlanProgress] Progress: ${progressData.current_day}/${progressData.total_days} (${calculateProgressPercentage(progressData)}%)`
        );
      } else {
        console.log("[useMealPlanProgress] No progress found");
      }

      return progressData;
    },

    enabled: !!supabaseUserId,

    // Poll every 30 seconds if plan is generating
    refetchInterval: (data) => {
      // If status is in_progress, poll every 30 seconds
      return data?.status === "in_progress" ? 30000 : false;
    },

    staleTime: 10 * 1000, // 10 seconds
    gcTime: 15 * 60 * 1000, // 15 minutes

    // Don't refetch automatically on mount/focus if completed
    refetchOnMount: (query) => {
      const data = query.state.data as MealPlanProgress | null;
      return data?.status === "in_progress";
    },
    refetchOnWindowFocus: (query) => {
      const data = query.state.data as MealPlanProgress | null;
      return data?.status === "in_progress";
    },

    retry: 2,
    retryDelay: 1000,
  });

  return {
    progress,
    percentage: progress ? calculateProgressPercentage(progress) : 0,
    isGenerating: progress?.status === "in_progress",
    hasProgress: !!progress,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to invalidate meal plan progress cache
 * Useful after generating a new plan
 */
export function useInvalidateMealPlanProgress() {
  const queryClient = useQueryClient();
  const { user: clerkUser } = useUser();
  const clerkUserId = clerkUser?.id;
  const { userData } = useUserData(clerkUserId);
  const supabaseUserId = userData?.user?.id;

  return () => {
    if (!supabaseUserId) {
      console.warn("[useInvalidateMealPlanProgress] No user ID available");
      return;
    }

    console.log(
      "[useInvalidateMealPlanProgress] Invalidating progress cache for:",
      supabaseUserId
    );

    queryClient.invalidateQueries({
      queryKey: ["meal-plan-progress", supabaseUserId],
    });
  };
}
