import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { WorkoutExercise } from "@/services/api/plans";
import { getExerciseImageUrl } from "@/utils/mockDataHelpers";

interface WorkoutCardProps {
  exercise: WorkoutExercise;
}

export function WorkoutCard({ exercise }: WorkoutCardProps) {
  const router = useRouter();
  const { exercise: exerciseData, sets } = exercise;
  const imageUrl = getExerciseImageUrl(exerciseData.name); // Using name as fallback for id if not available

  const handlePress = () => {
    // Note: Detail screen might need update to handle the new ID structure
    router.push({
      pathname: "/exercise-detail",
      params: { id: exerciseData.name }, 
    });
  };

  // Get summary of sets/reps
  const firstSet = sets[0];
  const setsCount = sets.length;
  
  let repsLabel = "0";
  if (firstSet?.duration) {
    repsLabel = firstSet.duration;
  } else if (firstSet?.repsMin) {
    repsLabel = firstSet.repsMax && firstSet.repsMax !== firstSet.repsMin
      ? `${firstSet.repsMin}-${firstSet.repsMax}`
      : `${firstSet.repsMin}`;
  }

  return (
    <Pressable
      onPress={handlePress}
      className="mb-2 flex-row items-center rounded-lg bg-white p-3 shadow-sm active:opacity-70 dark:bg-gray-800"
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
        <Text className="font-roboto-bold text-sm text-gray-900 dark:text-white">
          {exerciseData.name}
        </Text>
        <Text className="font-roboto-regular mt-0.5 text-xs text-gray-600 dark:text-gray-400">
          {setsCount} sets | {repsLabel} {firstSet?.duration ? "" : "reps"}
        </Text>
        {exerciseData.primaryMuscle && (
          <Text className="font-roboto-regular text-[10px] text-gray-500 dark:text-gray-500">
            {exerciseData.primaryMuscle}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
