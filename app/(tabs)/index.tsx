import React, { useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { useUserData } from "@/hooks/useUserData";
import { useDailyMessage } from "@/hooks/useDailyMessage";
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress";
import { useTodayMealPlan, useTodayWorkout } from "@/hooks/useTodayPlans";
import { triggerOnboardingPipeline } from "@/services/api/onboarding";
import { useUserStore, type User } from "@/store/userStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { useEffect } from "react";

// Components
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { MotivationalBanner } from "@/components/home/MotivationalBanner";
import { MealsList } from "@/components/home/MealsList";
import { WorkoutsList } from "@/components/home/WorkoutsList";
import { PipelineProgress } from "@/components/dashboard/PipelineProgress";

/**
 * Personalize dashboard with daily meals, workouts, and progress.
 * Handles the onboarding pipeline lifecycle.
 */
export default function HomeScreen() {
  const { userId: clerkUserId } = useAuth();
  const queryClient = useQueryClient();

  // --- User State Synchronization ---
  const setUser = useUserStore((s) => s.setUser);
  const storeUser = useUserStore((s) => s.user);
  const storeOnboardingCompleted = useUserStore((s) => s.onboardingCompleted);

  // Fetch basic user data (for the welcome header)
  const { userData, loading: userLoading } = useUserData(clerkUserId);
  const userName = userData?.profile?.first_name || "User";

  // Get internal DB userId from Zustand or follow the one from userData
  const dbUserId = useMemo(() => {
    return storeUser?.supabaseUserId || userData?.user?.id || null;
  }, [storeUser?.supabaseUserId, userData?.user?.id]);

  const router = useRouter();

  // Redirect to onboarding if not completed
  useEffect(() => {
    // Prevent redirect loop if store knows we just completed it
    if (storeOnboardingCompleted || storeUser?.onboardingCompleted) {
      return;
    }

    if (!userLoading && userData) {
      const isComplete = userData.profile?.onboarding_completed;
      console.log("[HomeScreen] Checking onboarding status:", isComplete);
      if (isComplete === false) {
        console.log("[HomeScreen] Onboarding not complete, redirecting to step-1");
        router.replace("/(onboarding)/step-1");
      }
    }
  }, [userData, userLoading, router, storeUser?.onboardingCompleted, storeOnboardingCompleted]);

  // Sync store with userData if missing
  useEffect(() => {
    if (userData && clerkUserId && !storeUser?.supabaseUserId) {
      console.log("[HomeScreen] Syncing user store with fetched userData:", userData.user.id);
      setUser({
        id: clerkUserId,
        supabaseUserId: userData.user.id,
        email: userData.user.email,
        name: `${userData.profile.first_name || ""} ${userData.profile.last_name || ""}`.trim(),
        firstName: userData.profile.first_name || undefined,
        lastName: userData.profile.last_name || undefined,
        onboardingCompleted: Boolean(userData.profile?.onboarding_completed),
      });
    } else {
      console.log("[HomeScreen] Skip store sync. userData:", !!userData, "clerkUserId:", !!clerkUserId, "storeSupabaseId:", storeUser?.supabaseUserId);
    }
  }, [userData, storeUser?.supabaseUserId, setUser, clerkUserId]);

  // Fetch daily motivational message
  const { message, loading: messageLoading } = useDailyMessage();

  // --- Pipeline State Management ---
  const isWaitingForPipeline = useUserStore((s) => s.isWaitingForPipeline);
  const setIsWaitingForPipeline = useUserStore((s) => s.setIsWaitingForPipeline);

  const isOnboardingComplete = Boolean(
    storeOnboardingCompleted || 
    storeUser?.onboardingCompleted || 
    userData?.profile?.onboarding_completed
  );

  // Track pipeline failure state
  const [pipelineFailed, setPipelineFailed] = useState<boolean>(false);
  const [pipelineError, setPipelineError] = useState<string>("");

  // Poll if the user has completed onboarding and we are explicitly waiting for the pipeline
  const shouldPoll = Boolean(isOnboardingComplete && isWaitingForPipeline && !pipelineFailed);
  const pipelineComplete = !isWaitingForPipeline;

  console.log(`[HomeScreen] dbUserId: ${dbUserId}, pipelineComplete: ${pipelineComplete}, shouldPoll: ${shouldPoll}, isOnboardingComplete: ${isOnboardingComplete}`);

  const handlePipelineComplete = useCallback(() => {
    setIsWaitingForPipeline(false);
    // Invalidate queries so they refetch with fresh data
    queryClient.invalidateQueries({ queryKey: ["meal-plan", "today", dbUserId] });
    queryClient.invalidateQueries({ queryKey: ["workout", "today", dbUserId] });
  }, [queryClient, dbUserId, setIsWaitingForPipeline]);

  const handlePipelineFailed = useCallback((data: any) => {
    setPipelineFailed(true);
    setPipelineError(data.errorMessage || "An unknown error occurred");
  }, []);

  // Poll progress every 10 seconds as requested
  const { progress, isPolling } = useOnboardingProgress({
    userId: dbUserId,
    enabled: shouldPoll,
    intervalMs: 10000,
    onCompleted: handlePipelineComplete,
    onFailed: handlePipelineFailed,
  });

  // --- Data Fetching (once pipeline is complete) ---

  const { data: mealPlan, isLoading: isMealPlanLoading } = useTodayMealPlan(
    dbUserId,
    pipelineComplete
  );

  const { data: workout, isLoading: isWorkoutLoading } = useTodayWorkout(
    dbUserId,
    pipelineComplete
  );

  const setTodayMealPlan = useDashboardStore((s) => s.setTodayMealPlan);
  const setTodayWorkout = useDashboardStore((s) => s.setTodayWorkout);

  useEffect(() => {
    if (mealPlan) setTodayMealPlan(mealPlan);
  }, [mealPlan, setTodayMealPlan]);

  useEffect(() => {
    if (workout) setTodayWorkout(workout);
  }, [workout, setTodayWorkout]);

  // Pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["meal-plan", "today", dbUserId] }),
      queryClient.invalidateQueries({ queryKey: ["workout", "today", dbUserId] }),
      queryClient.invalidateQueries({ queryKey: ["user", clerkUserId] }),
    ]);
    setRefreshing(false);
  }, [queryClient, dbUserId, clerkUserId]);

  // --- Render Logic ---

  if (userLoading && !userData) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00E6CA" />
        </View>
      </SafeAreaView>
    );
  }

  // 1. Pipeline still running
  if (!pipelineComplete && isPolling && !pipelineFailed) {
    return (
      <SafeAreaView className="flex-1 bg-[#1F024B]">
        <WelcomeHeader userName={userName} isDark />
        <PipelineProgress progress={progress} />
      </SafeAreaView>
    );
  }

  // Pipeline Failed
  if (pipelineFailed) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <WelcomeHeader userName={userName} />
        <View className="flex-1 items-center justify-center p-6 bg-red-50 dark:bg-red-900/20 m-4 rounded-3xl border border-red-200 dark:border-red-900">
          <Text className="text-4xl mb-4">⚠️</Text>
          <Text className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">
            Plan Generation Failed
          </Text>
          <Text className="text-center text-red-600 dark:text-red-300">
            {pipelineError}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // 2. Pipeline done, data loading
  if (pipelineComplete && (isMealPlanLoading || isWorkoutLoading)) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00E6CA" />
          <Text className="mt-4 text-gray-500 dark:text-gray-400">
            Loading your plan...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // 3. Full dashboard with real data
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00E6CA" />
        }
      >
        <WelcomeHeader userName={userName} />

        <MotivationalBanner
          message={message?.message_text || ""}
          loading={messageLoading}
        />

        {/* Meals section */}
        <View className="mt-2">
          {mealPlan?.slots && mealPlan.slots.length > 0 ? (
            <MealsList slots={mealPlan.slots} />
          ) : (
            <View className="px-6 py-4">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Today's Meals
              </Text>
              <Text className="mt-2 text-gray-500 dark:text-gray-400">
                No meals scheduled for today.
              </Text>
            </View>
          )}
        </View>

        {/* Workout section */}
        <View className="mt-4 mb-10">
          {workout && !workout.isRestDay ? (
            <WorkoutsList workout={workout} />
          ) : workout?.isRestDay ? (
            <View className="px-6">
              <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Workout of the Day
              </Text>
              <View className="items-center rounded-2xl bg-gray-50 p-8 dark:bg-gray-800">
                <Text className="text-4xl mb-2">🛌</Text>
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rest Day
                </Text>
                <Text className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
                  Recovery is part of the program. Enjoy your rest!
                </Text>
              </View>
            </View>
          ) : (
            <View className="px-6">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Workout of the Day
              </Text>
              <Text className="mt-2 text-gray-500 dark:text-gray-400">
                No workout scheduled for today.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
