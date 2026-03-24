import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MealIngredient } from "@/types/nutrition";
import { IngredientNutritionModal } from "./IngredientNutritionModal";

interface IngredientsListProps {
  ingredients: MealIngredient[];
}

interface IngredientItemProps {
  ingredient: MealIngredient;
  onPress: (ingredient: MealIngredient) => void;
}

function IngredientItem({ ingredient, onPress }: IngredientItemProps) {
  return (
    <Pressable 
      onPress={() => onPress(ingredient)}
      className="flex-row items-center border-b border-gray-100 py-4 dark:border-gray-800 active:opacity-70"
    >
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
        {ingredient.quantity % 1 === 0
          ? ingredient.quantity
          : ingredient.quantity.toFixed(1)}
        {ingredient.unit}
      </Text>
    </Pressable>
  );
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<MealIngredient | null>(null);

  return (
    <View className="px-4">
      <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Ingredients
      </Text>

      <View className="rounded-3xl border border-gray-100 bg-white px-5 shadow-premium-sm dark:border-gray-800 dark:bg-gray-800/80">
        {ingredients.map((ingredient, index) => (
          <IngredientItem 
            key={ingredient.id || index} 
            ingredient={ingredient} 
            onPress={setSelectedIngredient}
          />
        ))}
      </View>

      <IngredientNutritionModal 
        visible={!!selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
        ingredient={selectedIngredient}
      />
    </View>
  );
}
