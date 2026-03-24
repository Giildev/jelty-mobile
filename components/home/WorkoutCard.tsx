import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { WorkoutExercise } from "@/services/api/plans";
import { getExerciseImageUrl } from "@/utils/mockDataHelpers";

interface WorkoutCardProps {
  exercise: WorkoutExercise;
}

export function WorkoutCard({ exercise }: WorkoutCardProps) {
  const router = useRouter();
  const { name, exerciseId, numberOfSets, repsPerSet, primaryMuscle, category } = exercise;
  const imageUrl = getExerciseImageUrl(name);

  const handlePress = () => {
    router.push({
      pathname: "/exercise-detail",
      params: { id: exerciseId || name },
    });
  };

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
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-2" style={{ maxWidth: '75%' }}>
            <Text 
              className="font-roboto-bold text-sm text-gray-900 dark:text-white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
          </View>
          {category && (
            <View
              className={`rounded-full px-2 py-0.5 ${
                category === "warm-up"
                  ? "bg-orange-100 dark:bg-orange-900/30"
                  : category === "stretch"
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : "bg-green-100 dark:bg-green-900/30"
              }`}
            >
              <Text
                className={`text-[8px] font-bold uppercase ${
                  category === "warm-up"
                    ? "text-orange-600 dark:text-orange-400"
                    : category === "stretch"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {category}
              </Text>
            </View>
          )}
        </View>
        <Text className="font-roboto-regular mt-0.5 text-xs text-gray-600 dark:text-gray-400">
          {numberOfSets} sets | {repsPerSet} reps
        </Text>
        {primaryMuscle && (
          <Text className="font-roboto-regular text-[10px] text-gray-500 dark:text-gray-500">
            {primaryMuscle}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
