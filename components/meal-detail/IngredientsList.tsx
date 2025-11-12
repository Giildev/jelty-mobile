import { View, Text } from "react-native";
import { MealIngredient } from "@/types/nutrition";

interface IngredientsListProps {
  ingredients: MealIngredient[];
}

interface IngredientItemProps {
  ingredient: MealIngredient;
}

function IngredientItem({ ingredient }: IngredientItemProps) {
  return (
    <View className="flex-row items-center border-b border-gray-100 py-3 dark:border-gray-800">
      {/* Icon */}
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Text className="text-xl">{ingredient.icon || "🍽️"}</Text>
      </View>

      {/* Name */}
      <Text className="flex-1 text-base font-medium text-gray-900 dark:text-white">
        {ingredient.name}
      </Text>

      {/* Quantity */}
      <Text className="text-base font-semibold text-gray-700 dark:text-gray-300">
        {ingredient.quantity}
        {ingredient.unit}
      </Text>
    </View>
  );
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  return (
    <View className="px-4">
      <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Ingredients
      </Text>

      <View className="rounded-2xl border border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
        {ingredients.map((ingredient, index) => (
          <IngredientItem key={ingredient.id || index} ingredient={ingredient} />
        ))}
      </View>
    </View>
  );
}
