import React from "react";
import { View, Text } from "react-native";
import { ScheduledMeal } from "@/types/nutrition";

interface MealMiniCardProps {
  meal: ScheduledMeal;
  compact?: boolean; // Extra compact mode for month view
}

export function MealMiniCard({ meal, compact = false }: MealMiniCardProps) {
  // Truncate name if too long
  const displayName =
    meal.name.length > (compact ? 12 : 18)
      ? `${meal.name.substring(0, compact ? 12 : 18)}...`
      : meal.name;

  if (compact) {
    // Ultra-compact version for month view
    return (
      <View className="mb-0.5 rounded bg-white p-1 dark:bg-gray-800">
        <Text
          className="text-[10px] font-semibold text-gray-900 dark:text-white"
          numberOfLines={1}
        >
          {displayName}
        </Text>
        <Text className="text-[9px] text-gray-600 dark:text-gray-400">
          {meal.calories} cal
        </Text>
      </View>
    );
  }

  // Regular mini card for week/day views
  return (
    <View className="mb-2 rounded-lg bg-white p-2 shadow-sm dark:bg-gray-800">
      {/* Image Placeholder + Info */}
      <View className="flex-row items-center">
        <View className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-700" />

        <View className="ml-2 flex-1">
          <Text
            className="text-xs font-semibold text-gray-900 dark:text-white"
            numberOfLines={1}
          >
            {displayName}
          </Text>
          <Text className="mt-0.5 text-[10px] text-gray-600 dark:text-gray-400">
            {meal.calories} cal • {meal.macros.carbs}g • {meal.macros.protein}g
            • {meal.macros.fat}g
          </Text>
        </View>
      </View>
    </View>
  );
}
