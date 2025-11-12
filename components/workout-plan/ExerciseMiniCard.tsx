import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScheduledExercise } from "@/types/workout";

interface ExerciseMiniCardProps {
  exercise: ScheduledExercise;
  compact?: boolean; // Extra compact mode for month view
}

export function ExerciseMiniCard({
  exercise,
  compact = false,
}: ExerciseMiniCardProps) {
  const router = useRouter();

  // Navigate to exercise detail
  const handlePress = () => {
    router.push({
      pathname: "/exercise-detail",
      params: { id: exercise.id },
    });
  };

  // Truncate name if too long
  const displayName =
    exercise.name.length > (compact ? 12 : 18)
      ? `${exercise.name.substring(0, compact ? 12 : 18)}...`
      : exercise.name;

  if (compact) {
    // Ultra-compact version for month view
    return (
      <Pressable onPress={handlePress} className="active:opacity-70">
        <View className="mb-0.5 rounded bg-white p-1 dark:bg-gray-800">
          <Text
            className="text-[10px] font-semibold text-gray-900 dark:text-white"
            numberOfLines={1}
          >
            {displayName}
          </Text>
          <Text className="text-[9px] text-gray-600 dark:text-gray-400">
            {exercise.sets}x{exercise.reps}
          </Text>
        </View>
      </Pressable>
    );
  }

  // Map exercise types to display labels
  const getExerciseTypeLabel = () => {
    switch (exercise.type) {
      case "warm-up":
        return "Warm-Up";
      case "main":
        return "Main";
      case "stretch":
        return "Stretch";
      default:
        return "Exercise";
    }
  };

  // Regular mini card for week/day views
  return (
    <Pressable onPress={handlePress} className="active:opacity-70">
      <View className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
        {/* Image Placeholder */}
        <View className="relative h-32 w-full bg-gray-300 dark:bg-gray-700">
          {/* Exercise Type Tag */}
          <View className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5">
            <Text className="text-[9px] font-semibold uppercase text-white">
              {getExerciseTypeLabel()}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View className="p-3">
          {/* Name */}
          <Text
            className="mb-1.5 text-sm font-bold text-gray-900 dark:text-white"
            numberOfLines={1}
          >
            {displayName}
          </Text>

          {/* Sets x Reps */}
          <Text className="mb-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
            {exercise.sets} sets × {exercise.reps} reps
          </Text>

          {/* Exercise Details */}
          <Text className="text-[10px] text-gray-600 dark:text-gray-400">
            RIR: {exercise.rir} • Rest: {exercise.restTime}s
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
