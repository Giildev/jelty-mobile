import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { WorkoutPlanViewMode } from "@/types/workout";

interface MonthNavigationHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  viewMode?: WorkoutPlanViewMode;
}

export function MonthNavigationHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  viewMode = "month",
}: MonthNavigationHeaderProps) {
  // Format display text based on view mode
  const getDisplayText = () => {
    if (viewMode === "day") {
      return format(currentDate, "MMMM d, yyyy");
    }
    if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

      // If week spans two months
      if (weekStart.getMonth() !== weekEnd.getMonth()) {
        return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
      }
      // Same month
      return `${format(weekStart, "MMM d")} - ${format(weekEnd, "d, yyyy")}`;
    }
    // month view
    return format(currentDate, "MMMM yyyy");
  };

  return (
    <View className="flex-row items-center justify-between">
      {/* Previous Button */}
      <Pressable
        onPress={onPreviousMonth}
        className="h-10 w-10 items-center justify-center"
      >
        <Ionicons
          name="chevron-back"
          size={24}
          className="text-gray-700 dark:text-gray-300"
        />
      </Pressable>

      {/* Current Period */}
      <Text className="text-lg font-semibold text-gray-900 dark:text-white">
        {getDisplayText()}
      </Text>

      {/* Next Button */}
      <Pressable
        onPress={onNextMonth}
        className="h-10 w-10 items-center justify-center"
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          className="text-gray-700 dark:text-gray-300"
        />
      </Pressable>
    </View>
  );
}
