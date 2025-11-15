import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { ScheduledMeal } from "@/types/nutrition";

interface MealCardProps {
  meal: ScheduledMeal;
}

export function MealCard({ meal }: MealCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/meal-detail",
      params: { id: meal.id },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      className="mb-2 flex-row items-center rounded-lg bg-white p-3 shadow-sm active:opacity-70 dark:bg-gray-800"
    >
      {/* Meal Image */}
      {meal.imageUrl ? (
        <Image
          source={{ uri: meal.imageUrl }}
          className="h-12 w-12 rounded-lg"
          resizeMode="cover"
        />
      ) : (
        <View className="h-12 w-12 rounded-lg bg-gray-300 dark:bg-gray-700" />
      )}

      {/* Meal Info */}
      <View className="ml-3 flex-1">
        <Text className="font-roboto-bold text-sm text-gray-900 dark:text-white">
          {meal.name}
        </Text>
        <Text className="font-roboto-regular mt-0.5 text-xs text-gray-600 dark:text-gray-400">
          C: {meal.macros.carbs}g | P: {meal.macros.protein}g | F:{" "}
          {meal.macros.fat}g
        </Text>
      </View>

      {/* Calories */}
      <View className="items-end">
        <Text className="font-roboto-bold text-sm text-gray-900 dark:text-white">
          {meal.calories} cal
        </Text>
      </View>
    </Pressable>
  );
}
