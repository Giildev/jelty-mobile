import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import { MealPlanViewMode } from "@/types/nutrition";
import { useUserRecipes } from "@/hooks/useUserRecipes";
import { ViewModeSelector } from "@/components/meal-plan/ViewModeSelector";
import { MonthNavigationHeader } from "@/components/meal-plan/MonthNavigationHeader";
import { DayView } from "@/components/meal-plan/DayView";
import { WeekView } from "@/components/meal-plan/WeekView";
import { MonthView } from "@/components/meal-plan/MonthView";

/**
 * Meal Plan Screen
 * Displays scheduled meals in day/week/month views
 */
export default function MealPlanScreen() {
  const [viewMode, setViewMode] = useState<MealPlanViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch user recipes/meals with React Query cache
  const { recipes, isLoading, error } = useUserRecipes();

  // Handle errors
  if (error) {
    console.error("[MealPlanScreen] Error fetching recipes:", error);
  }

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

  // Show loading state
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1F024B" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header */}
      <View className="px-4 py-3">
        {/* Title */}
        <Text className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Meal Plan
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
        {viewMode === "day" && (
          <DayView meals={recipes} currentDate={currentDate} />
        )}

        {viewMode === "week" && (
          <WeekView meals={recipes} currentDate={currentDate} />
        )}

        {viewMode === "month" && (
          <MonthView
            meals={recipes}
            currentDate={currentDate}
            onDayPress={handleDayPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
