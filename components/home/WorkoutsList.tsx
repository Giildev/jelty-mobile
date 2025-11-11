import { View, Text } from "react-native";
import { Exercise } from "@/types/workout";
import { WorkoutCard } from "./WorkoutCard";

interface WorkoutsListProps {
  exercises: Exercise[];
}

export function WorkoutsList({ exercises }: WorkoutsListProps) {
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
