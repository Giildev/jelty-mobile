import { View, Text } from "react-native";
import { ScheduledMeal } from "@/types/nutrition";
import { MealCard } from "./MealCard";

interface MealsListProps {
  meals: ScheduledMeal[];
}

export function MealsList({ meals }: MealsListProps) {
  if (meals.length === 0) {
    return (
      <View className="px-6 py-3">
        <Text className="mb-3 text-lg font-roboto-bold text-gray-900 dark:text-white">
          Today's Meals
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          No meals scheduled for today
        </Text>
      </View>
    );
  }

  return (
    <View className="px-6 py-3">
      <Text className="mb-3 text-lg font-roboto-bold text-gray-900 dark:text-white">
        Today's Meals
      </Text>
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </View>
  );
}
