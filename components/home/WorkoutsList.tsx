import { View, Text } from "react-native";
import { TodayWorkout } from "@/services/api/plans";
import { WorkoutCard } from "./WorkoutCard";

interface WorkoutsListProps {
  workout: TodayWorkout;
}

export function WorkoutsList({ workout }: WorkoutsListProps) {
  const exercises = [
    ...(workout.warmUp?.exercises || []),
    ...(workout.main?.exercises || []),
    ...(workout.stretch?.exercises || []),
  ];

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
      {exercises.map((exercise, index) => (
        <WorkoutCard key={`${exercise.name}-${index}`} exercise={exercise} />
      ))}
    </View>
  );
}
