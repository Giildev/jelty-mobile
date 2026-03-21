import { View, Text } from "react-native";
import { MealSlot } from "@/services/api/plans";
import { MealCard } from "./MealCard";

interface MealsListProps {
  slots: MealSlot[];
}

export function MealsList({ slots }: MealsListProps) {
  if (!slots || slots.length === 0) {
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
      {slots.map((slot) => (
        <MealCard key={slot.id} slot={slot} />
      ))}
    </View>
  );
}
