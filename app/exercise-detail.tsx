import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useExerciseDetail } from "@/hooks/useExerciseDetail";
import { ExerciseDetailHeader } from "@/components/exercise-detail/ExerciseDetailHeader";
import { MediaGallery } from "@/components/exercise-detail/MediaGallery";
import { ExerciseStats } from "@/components/exercise-detail/ExerciseStats";
import { MuscleEquipmentInfo } from "@/components/exercise-detail/MuscleEquipmentInfo";
import { HowToPerformSteps } from "@/components/exercise-detail/HowToPerformSteps";

export default function ExerciseDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { exerciseDetail, loading, error } = useExerciseDetail(id);

  // Handle action buttons
  const handleMarkAsDone = () => {
    Alert.alert(
      "Mark as Done",
      "Exercise marked as completed!",
      [{ text: "OK" }]
    );
  };

  const handleSkipExercise = () => {
    Alert.alert(
      "Skip Exercise",
      "Are you sure you want to skip this exercise?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Skip", style: "destructive" },
      ]
    );
  };

  const handleSwapExercise = () => {
    Alert.alert(
      "Swap Exercise",
      "Browse alternative exercises to swap with this one.",
      [{ text: "OK" }]
    );
  };

  // Loading state
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600 dark:text-gray-400">
          Loading exercise details...
        </Text>
      </View>
    );
  }

  // Error state
  if (error || !exerciseDetail) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-gray-900">
        <Text className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
          Error Loading Exercise
        </Text>
        <Text className="mb-6 text-center text-gray-600 dark:text-gray-400">
          {error?.message || "Exercise not found"}
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="rounded-lg bg-blue-500 px-6 py-3 active:opacity-80"
        >
          <Text className="font-semibold text-white">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style="auto" />

      {/* Custom Header */}
      <ExerciseDetailHeader title={exerciseDetail.name} />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Media Gallery */}
        <MediaGallery
          gallery={exerciseDetail.gallery}
          category={exerciseDetail.category}
        />

        {/* Exercise Name */}
        <View className="px-4 py-6">
          <Text className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {exerciseDetail.name}
          </Text>
        </View>

        {/* Muscle & Equipment Info */}
        <MuscleEquipmentInfo
          primaryMuscle={exerciseDetail.primaryMuscle}
          equipment={exerciseDetail.equipment}
          description={exerciseDetail.description}
        />

        {/* Exercise Stats (Sets, Reps, RIR, Rest) */}
        <View className="mt-6">
          <ExerciseStats instructions={exerciseDetail.instructions} />
        </View>

        {/* How to Perform Steps */}
        <View className="mt-6">
          <HowToPerformSteps
            steps={exerciseDetail.howToPerformSteps}
            tips={exerciseDetail.tips}
          />
        </View>
      </ScrollView>

      {/* Action Buttons (Fixed at bottom) */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
        {/* Mark as Done */}
        <Pressable
          onPress={handleMarkAsDone}
          className="mb-3 rounded-lg bg-blue-500 py-4 active:opacity-80 dark:bg-blue-600"
        >
          <Text className="text-center text-base font-semibold text-white">
            Mark as Done
          </Text>
        </Pressable>

        <View className="flex-row gap-3">
          {/* Skip Exercise */}
          <Pressable
            onPress={handleSkipExercise}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 active:opacity-70 dark:border-gray-600 dark:bg-gray-700"
          >
            <Text className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Skip Exercise
            </Text>
          </Pressable>

          {/* Swap Exercise */}
          <Pressable
            onPress={handleSwapExercise}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 active:opacity-70 dark:border-gray-600 dark:bg-gray-700"
          >
            <Text className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Swap Exercise
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
