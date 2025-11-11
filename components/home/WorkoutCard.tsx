import { View, Text } from "react-native";
import { Exercise } from "@/types/workout";

interface WorkoutCardProps {
  exercise: Exercise;
}

export function WorkoutCard({ exercise }: WorkoutCardProps) {
  return (
    <View className="mb-2 flex-row items-center rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm">
      {/* Placeholder Image */}
      <View className="h-12 w-12 rounded-lg bg-gray-300 dark:bg-gray-700" />

      {/* Exercise Info */}
      <View className="ml-3 flex-1">
        <Text className="text-sm font-roboto-bold text-gray-900 dark:text-white">
          {exercise.name}
        </Text>
        <Text className="mt-0.5 text-xs font-roboto-regular text-gray-600 dark:text-gray-400">
          {exercise.sets} sets | {exercise.reps} reps | RIR: {exercise.rir}
        </Text>
        {exercise.muscleGroup && (
          <Text className="text-xs font-roboto-regular text-gray-500 dark:text-gray-500">
            {exercise.muscleGroup}
          </Text>
        )}
      </View>
    </View>
  );
}
