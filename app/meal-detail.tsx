import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMealDetail } from "@/hooks/useMealDetail";
import { MealDetailHeader } from "@/components/meal-detail/MealDetailHeader";
import { MediaGallery } from "@/components/meal-detail/MediaGallery";
import { NutritionGrid } from "@/components/meal-detail/NutritionGrid";
import { IngredientsList } from "@/components/meal-detail/IngredientsList";
import { PreparationSteps } from "@/components/meal-detail/PreparationSteps";

export default function MealDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { mealDetail, loading, error } = useMealDetail(id);

  // Handle action buttons
  const handleMarkAsDone = () => {
    Alert.alert(
      "Mark as Done",
      "Meal marked as eaten!",
      [{ text: "OK" }]
    );
  };

  const handleAteSomethingElse = () => {
    Alert.alert(
      "Ate Something Else",
      "You can swap this meal with another option.",
      [{ text: "OK" }]
    );
  };

  const handleSwapMeal = () => {
    Alert.alert(
      "Swap Meal",
      "Browse alternative meals to swap with this one.",
      [{ text: "OK" }]
    );
  };

  // Loading state
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600 dark:text-gray-400">
          Loading meal details...
        </Text>
      </View>
    );
  }

  // Error state
  if (error || !mealDetail) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-gray-900">
        <Text className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
          Error Loading Meal
        </Text>
        <Text className="mb-6 text-center text-gray-600 dark:text-gray-400">
          {error?.message || "Meal not found"}
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
      <MealDetailHeader title={mealDetail.name} />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Media Gallery */}
        <MediaGallery gallery={mealDetail.gallery} category={mealDetail.type} />

        {/* Meal Name and Description */}
        <View className="px-4 py-6">
          <Text className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {mealDetail.name}
          </Text>
          <Text className="text-base leading-6 text-gray-600 dark:text-gray-400">
            {mealDetail.description}
          </Text>
        </View>

        {/* Nutrition Overview */}
        <NutritionGrid calories={mealDetail.calories} macros={mealDetail.macros} />

        {/* Ingredients */}
        <View className="mt-6">
          <IngredientsList ingredients={mealDetail.ingredients} />
        </View>

        {/* Preparation Steps */}
        <View className="mt-6">
          <PreparationSteps steps={mealDetail.preparationSteps} />
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
          {/* Ate Something Else */}
          <Pressable
            onPress={handleAteSomethingElse}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 active:opacity-70 dark:border-gray-600 dark:bg-gray-700"
          >
            <Text className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Ate Something Else
            </Text>
          </Pressable>

          {/* Swap Meal */}
          <Pressable
            onPress={handleSwapMeal}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 active:opacity-70 dark:border-gray-600 dark:bg-gray-700"
          >
            <Text className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Swap Meal
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
