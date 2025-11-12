import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScheduledMeal } from "@/types/nutrition";

interface MealMiniCardProps {
  meal: ScheduledMeal;
  compact?: boolean; // Extra compact mode for month view
}

export function MealMiniCard({ meal, compact = false }: MealMiniCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/meal-detail",
      params: { id: meal.id },
    });
  };

  // Truncate name if too long
  const displayName =
    meal.name.length > (compact ? 12 : 18)
      ? `${meal.name.substring(0, compact ? 12 : 18)}...`
      : meal.name;

  if (compact) {
    // Ultra-compact version for month view
    return (
      <Pressable
        onPress={handlePress}
        className="mb-0.5 rounded bg-white p-1 active:opacity-70 dark:bg-gray-800"
      >
        <Text
          className="text-[10px] font-semibold text-gray-900 dark:text-white"
          numberOfLines={1}
        >
          {displayName}
        </Text>
        <Text className="text-[9px] text-gray-600 dark:text-gray-400">
          {meal.calories} cal
        </Text>
      </Pressable>
    );
  }

  // Map meal types to display labels
  const getMealTypeLabel = () => {
    switch (meal.type) {
      case "breakfast":
        return "Breakfast";
      case "morning_snack":
        return "Snack";
      case "lunch":
        return "Lunch";
      case "afternoon_snack":
        return "Late Snack";
      case "dinner":
        return "Dinner";
      default:
        return "Meal";
    }
  };

  // Regular mini card for week/day views
  return (
    <Pressable
      onPress={handlePress}
      className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm active:opacity-70 dark:bg-gray-800"
    >
      {/* Image Placeholder */}
      <View className="relative h-32 w-full bg-gray-300 dark:bg-gray-700">
        {/* Meal Type Tag */}
        <View className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5">
          <Text className="text-[9px] font-semibold uppercase text-white">
            {getMealTypeLabel()}
          </Text>
        </View>
      </View>

      {/* Content - 2 Column Layout */}
      <View className="flex-row gap-3 p-3">
        {/* Column 1: Name, Calories, Macros */}
        <View className="flex-1">
          {/* Name */}
          <Text
            className="mb-1.5 text-sm font-bold text-gray-900 dark:text-white"
            numberOfLines={2}
          >
            {meal.name}
          </Text>

          {/* Calories */}
          <Text className="mb-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
            {meal.calories} kcal
          </Text>

          {/* Macros */}
          <Text className="text-[10px] text-gray-600 dark:text-gray-400">
            C: {meal.macros.carbs}g • P: {meal.macros.protein}g • F:{" "}
            {meal.macros.fat}g
          </Text>
        </View>

        {/* Column 2: Description */}
        {meal.description && (
          <View className="flex-1">
            <Text
              className="text-xs text-gray-600 dark:text-gray-400"
              numberOfLines={4}
            >
              {meal.description}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
