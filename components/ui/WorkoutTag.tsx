import React from "react";
import { View, Text } from "react-native";
import { ExerciseType } from "@/types/workout";

type WorkoutCategory = ExerciseType | "cardio" | "strength" | "flexibility" | "yoga";

interface WorkoutTagProps {
  type: WorkoutCategory;
}

/**
 * WorkoutTag Component
 *
 * Displays a bright colored tag for workout types using the brand neon color palette.
 * Colors are defined in tailwind.config.js and global.css.
 * Background: Solid bright color | Text: White
 *
 * @param type - The workout type (warm-up, main, stretch, cardio, strength, etc.)
 */
export function WorkoutTag({ type }: WorkoutTagProps) {
  // Map workout types to display labels
  const getWorkoutLabel = () => {
    switch (type) {
      case "warm-up":
        return "Warm-up";
      case "main":
        return "Main";
      case "stretch":
        return "Stretch";
      case "cardio":
        return "Cardio";
      case "strength":
        return "Strength";
      case "flexibility":
        return "Flexibility";
      case "yoga":
        return "Yoga";
      default:
        return "Workout";
    }
  };

  // Map workout types to CSS classes
  const getTagClassName = () => {
    switch (type) {
      case "warm-up":
        return "tag-warm-up";
      case "main":
        return "tag-main";
      case "stretch":
        return "tag-stretch";
      case "cardio":
        return "tag-cardio";
      case "strength":
        return "tag-strength";
      case "flexibility":
        return "tag-flexibility";
      case "yoga":
        return "tag-yoga";
      default:
        return "tag-base bg-gray-500";
    }
  };

  return (
    <View className={getTagClassName()}>
      <Text className="text-white">{getWorkoutLabel()}</Text>
    </View>
  );
}
