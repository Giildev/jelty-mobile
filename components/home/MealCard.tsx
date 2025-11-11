import { View, Text } from "react-native";
import { Meal } from "@/types/nutrition";

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <View className="mb-2 flex-row items-center rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm">
      {/* Placeholder Image */}
      <View className="h-12 w-12 rounded-lg bg-gray-300 dark:bg-gray-700" />

      {/* Meal Info */}
      <View className="ml-3 flex-1">
        <Text className="text-sm font-roboto-bold text-gray-900 dark:text-white">
          {meal.name}
        </Text>
        <Text className="mt-0.5 text-xs font-roboto-regular text-gray-600 dark:text-gray-400">
          C: {meal.macros.carbs}g | P: {meal.macros.protein}g | F:{" "}
          {meal.macros.fat}g
        </Text>
      </View>

      {/* Calories */}
      <View className="items-end">
        <Text className="text-sm font-roboto-bold text-gray-900 dark:text-white">
          {meal.calories} cal
        </Text>
      </View>
    </View>
  );
}
