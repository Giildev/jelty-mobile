import { View, Text } from "react-native";
import { Meal } from "@/types/nutrition";
import { MealCard } from "./MealCard";

interface MealsListProps {
  meals: Meal[];
}

export function MealsList({ meals }: MealsListProps) {
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
