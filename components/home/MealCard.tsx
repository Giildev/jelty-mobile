import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { MealSlot } from "@/services/api/plans";
import { getMealImageUrl } from "@/utils/mockDataHelpers";

interface MealCardProps {
  slot: MealSlot;
}

export function MealCard({ slot }: MealCardProps) {
  const router = useRouter();
  const { recipe } = slot;
  const imageUrl = getMealImageUrl(recipe.id);

  const handlePress = () => {
    router.push({
      pathname: "/meal-detail",
      params: { id: recipe.id },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      className="mb-2 flex-row items-center rounded-lg bg-white p-3 shadow-sm active:opacity-70 dark:bg-gray-800"
    >
      {/* Meal Image */}
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="h-12 w-12 rounded-lg"
          resizeMode="cover"
        />
      ) : (
        <View className="h-12 w-12 rounded-lg bg-gray-300 dark:bg-gray-700" />
      )}

      {/* Meal Info */}
      <View className="ml-3 flex-1">
        <Text className="font-roboto-bold text-sm text-gray-900 dark:text-white">
          {recipe.name}
        </Text>
        <Text className="font-roboto-regular mt-0.5 text-xs text-gray-600 dark:text-gray-400">
          C: {recipe.nutritionPerServing.carbG}g | P:{" "}
          {recipe.nutritionPerServing.proteinG}g | F:{" "}
          {recipe.nutritionPerServing.fatG}g
        </Text>
        <Text className="font-roboto-regular text-[10px] text-primary">
          {slot.slotLabel}
        </Text>
      </View>

      {/* Calories */}
      <View className="items-end">
        <Text className="font-roboto-bold text-sm text-gray-900 dark:text-white">
          {recipe.nutritionPerServing.energyKcal} cal
        </Text>
      </View>
    </Pressable>
  );
}
