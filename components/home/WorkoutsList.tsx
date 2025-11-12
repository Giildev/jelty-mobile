import { View, Text } from "react-native";
import { ScheduledExercise } from "@/types/workout";
import { WorkoutCard } from "./WorkoutCard";

interface WorkoutsListProps {
  exercises: ScheduledExercise[];
}

export function WorkoutsList({ exercises }: WorkoutsListProps) {
  if (exercises.length === 0) {
    return (
      <View className="px-6 py-3">
        <Text className="mb-3 text-lg font-roboto-bold text-gray-900 dark:text-white">
          Workout of the Day
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          No workouts scheduled for today
        </Text>
      </View>
    );
  }

  return (
    <View className="px-6 py-3">
      <Text className="mb-3 text-lg font-roboto-bold text-gray-900 dark:text-white">
        Workout of the Day
      </Text>
      {exercises.map((exercise) => (
        <WorkoutCard key={exercise.id} exercise={exercise} />
      ))}
    </View>
  );
}
