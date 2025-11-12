import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { ScheduledExercise } from "@/types/workout";
import { getExerciseImageUrl } from "@/utils/mockDataHelpers";

interface WorkoutCardProps {
  exercise: ScheduledExercise;
}

export function WorkoutCard({ exercise }: WorkoutCardProps) {
  const router = useRouter();
  const imageUrl = getExerciseImageUrl(exercise.id);

  const handlePress = () => {
    router.push({
      pathname: "/exercise-detail",
      params: { id: exercise.id },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      className="mb-2 flex-row items-center rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm active:opacity-70"
    >
      {/* Exercise Image */}
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="h-12 w-12 rounded-lg"
          resizeMode="cover"
        />
      ) : (
        <View className="h-12 w-12 rounded-lg bg-gray-300 dark:bg-gray-700" />
      )}

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
    </Pressable>
  );
}
