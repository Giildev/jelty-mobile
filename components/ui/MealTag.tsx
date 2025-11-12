import React from "react";
import { View, Text } from "react-native";
import { MealType } from "@/types/nutrition";

interface MealTagProps {
  type: MealType;
}

/**
 * MealTag Component
 *
 * Displays a bright colored tag for meal types using the brand neon color palette.
 * Colors are defined in tailwind.config.js and global.css.
 * Background: Solid bright color | Text: White
 *
 * @param type - The meal type (breakfast, morning_snack, lunch, etc.)
 */
export function MealTag({ type }: MealTagProps) {
  // Map meal types to display labels
  const getMealLabel = () => {
    switch (type) {
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
      case "evening_snack":
        return "Night Snack";
      default:
        return "Meal";
    }
  };

  // Map meal types to CSS classes
  const getTagClassName = () => {
    switch (type) {
      case "breakfast":
        return "tag-breakfast";
      case "morning_snack":
        return "tag-morning-snack";
      case "lunch":
        return "tag-lunch";
      case "afternoon_snack":
        return "tag-afternoon-snack";
      case "dinner":
        return "tag-dinner";
      case "evening_snack":
        return "tag-evening-snack";
      default:
        return "tag-base bg-gray-500";
    }
  };

  return (
    <View className={getTagClassName()}>
      <Text className="text-white">{getMealLabel()}</Text>
    </View>
  );
}
