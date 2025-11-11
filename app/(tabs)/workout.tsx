import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import { WorkoutPlanViewMode } from "@/types/workout";
import { MOCK_SCHEDULED_EXERCISES } from "@/constants/mockData";
import { ViewModeSelector } from "@/components/workout-plan/ViewModeSelector";
import { MonthNavigationHeader } from "@/components/workout-plan/MonthNavigationHeader";
import { DayView } from "@/components/workout-plan/DayView";
import { WeekView } from "@/components/workout-plan/WeekView";
import { MonthView } from "@/components/workout-plan/MonthView";

/**
 * Workout Plan Screen
 * Displays scheduled exercises in day/week/month views
 */
export default function WorkoutScreen() {
  const [viewMode, setViewMode] = useState<WorkoutPlanViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());

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
        {viewMode === "day" && (
          <DayView exercises={MOCK_SCHEDULED_EXERCISES} currentDate={currentDate} />
        )}

        {viewMode === "week" && (
          <WeekView exercises={MOCK_SCHEDULED_EXERCISES} currentDate={currentDate} />
        )}

        {viewMode === "month" && (
          <MonthView
            exercises={MOCK_SCHEDULED_EXERCISES}
            currentDate={currentDate}
            onDayPress={handleDayPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
