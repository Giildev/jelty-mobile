import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, startOfWeek } from "date-fns";
import { WorkoutPlanViewMode, ScheduledExercise } from "@/types/workout";
import { ViewModeSelector } from "@/components/workout-plan/ViewModeSelector";
import { MonthNavigationHeader } from "@/components/workout-plan/MonthNavigationHeader";
import { DayView } from "@/components/workout-plan/DayView";
import { WeekView } from "@/components/workout-plan/WeekView";
import { MonthView } from "@/components/workout-plan/MonthView";
import { useWorkoutStore } from "@/store/workoutStore";
import { useUserStore } from "@/store/userStore";
import { TodayWorkoutResponse } from "@/services/api/plans";

/**
 * Workout Plan Screen
 * Displays scheduled exercises in day/week/month views
 */
export default function WorkoutScreen() {
  const [viewMode, setViewMode] = useState<WorkoutPlanViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const { user } = useUserStore();
  const userId = user?.supabaseUserId;

  const {
    getDailyWorkout,
    getWeeklyWorkouts,
    getMonthlyWorkouts,
    loading,
    error,
    dailyWorkouts,
    weeklyWorkouts,
    monthlyWorkouts,
  } = useWorkoutStore();

  // Fetch data when date, viewMode or userId changes
  useEffect(() => {
    if (!userId) return;

    if (viewMode === "day") {
      getDailyWorkout(userId, currentDate);
    } else if (viewMode === "week") {
      getWeeklyWorkouts(userId, currentDate);
    } else if (viewMode === "month") {
      getMonthlyWorkouts(userId, currentDate);
    }
  }, [userId, currentDate, viewMode]);

  // Map API data to UI format (ScheduledExercise)
  const mapToScheduledExercises = (
    responses: TodayWorkoutResponse[] | TodayWorkoutResponse,
    defaultDate: Date
  ): ScheduledExercise[] => {
    const responseArray = Array.isArray(responses) ? responses : [responses];
    const exercises: ScheduledExercise[] = [];

    responseArray.forEach((resp, index) => {
      if (resp.isRestDay) return;

      // Since the backend might not return the date in the response for weekly/monthly fetches,
      // we calculate it based on the index if it's an array, or use defaultDate.
      // Better yet, the backend should ideally return the date. 
      // For now, if it's weekly/monthly, we'll try to use the date if available or infer it.
      let workoutDate = format(defaultDate, "yyyy-MM-dd");
      if (Array.isArray(responses) && viewMode === "week") {
          const weekStart = startOfWeek(defaultDate, { weekStartsOn: 1 });
          workoutDate = format(addDays(weekStart, index), "yyyy-MM-dd");
      }
      // Note: Monthly index mapping is more complex, but usually the UI handles it by date if present.

      const processBlock = (block: any, type: "warm-up" | "main" | "stretch") => {
        if (!block?.exercises) return;
        block.exercises.forEach((ex: any) => {
          exercises.push({
            ...ex,
            id: ex.exerciseId, // Crucial for navigation to detail
            date: workoutDate,
            time: type === "warm-up" ? "08:00" : type === "main" ? "09:00" : "10:00",
            type,
          });
        });
      };

      processBlock(resp.warmUp, "warm-up");
      processBlock(resp.main, "main");
      processBlock(resp.stretch, "stretch");
    });

    return exercises;
  };

  const currentExercises = useMemo(() => {
    if (viewMode === "day") {
      const dateKey = format(currentDate, "yyyy-MM-dd");
      const workout = dailyWorkouts[dateKey];
      return workout ? mapToScheduledExercises(workout, currentDate) : [];
    } else if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekKey = format(weekStart, "yyyy-MM-dd");
      const workouts = weeklyWorkouts[weekKey];
      return workouts ? mapToScheduledExercises(workouts, currentDate) : [];
    } else {
      const monthStart = startOfMonth(currentDate);
      const monthKey = format(monthStart, "yyyy-MM");
      const workouts = monthlyWorkouts[monthKey];
      return workouts ? mapToScheduledExercises(workouts, currentDate) : [];
    }
  }, [viewMode, currentDate, dailyWorkouts, weeklyWorkouts, monthlyWorkouts]);

  // Navigation handlers based on view mode
  const handlePrevious = () => {
    setCurrentDate((prev) => {
      if (viewMode === "day") return subDays(prev, 1);
      if (viewMode === "week") return subWeeks(prev, 1);
      return subMonths(prev, 1);
    });
  };

  const handleNext = () => {
    setCurrentDate((prev) => {
      if (viewMode === "day") return addDays(prev, 1);
      if (viewMode === "week") return addWeeks(prev, 1);
      return addMonths(prev, 1);
    });
  };

  const handleDayPress = (date: Date) => {
    setCurrentDate(date);
    setViewMode("day");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header */}
      <View className="px-4 py-3">
        {/* Title */}
        <Text className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Workout Plan
        </Text>

        {/* View Mode Selector */}
        <ViewModeSelector value={viewMode} onChange={setViewMode} />
      </View>

      {/* Date Navigation */}
      <View className="px-4 py-3">
        <MonthNavigationHeader
          currentDate={currentDate}
          onPreviousMonth={handlePrevious}
          onNextMonth={handleNext}
          viewMode={viewMode}
        />
      </View>

      {/* Content - Conditional based on view mode */}
      <View className="flex-1">
        {loading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#1F024B" />
          </View>
        )}

        {!loading && error && (
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-center text-red-500">{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <>
            {viewMode === "day" && (
              <DayView exercises={currentExercises} currentDate={currentDate} />
            )}

            {viewMode === "week" && (
              <WeekView exercises={currentExercises} currentDate={currentDate} />
            )}

            {viewMode === "month" && (
              <MonthView
                exercises={currentExercises}
                currentDate={currentDate}
                onDayPress={handleDayPress}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
import { format, startOfMonth } from "date-fns";
