import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMealDetail } from "@/hooks/useMealDetail";
import { MealDetailHeader } from "@/components/meal-detail/MealDetailHeader";
import { MediaGallery } from "@/components/meal-detail/MediaGallery";
import { NutritionGrid } from "@/components/meal-detail/NutritionGrid";
import { IngredientsList } from "@/components/meal-detail/IngredientsList";
import { PreparationSteps } from "@/components/meal-detail/PreparationSteps";
import { MicroNutritionModal } from "@/components/meal-detail/MicroNutritionModal";
import { Ionicons } from "@expo/vector-icons";

export default function MealDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { mealDetail, loading, error } = useMealDetail(id);
  const [showMicroModal, setShowMicroModal] = useState(false);

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
        {/* Media Gallery & Title Combined for Premium Look */}
        <View className="bg-white dark:bg-gray-900 pb-8 rounded-b-[48px] shadow-sm mb-2 z-10 border-b border-gray-100 dark:border-gray-800">
          <MediaGallery gallery={mealDetail.gallery} category={mealDetail.type} />
          
          <View className="px-6 pt-8">
            <Text className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {mealDetail.name}
            </Text>
            <Text className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {mealDetail.description}
            </Text>
          </View>
        </View>

        <View className="gap-y-10 py-6">
          {/* Nutrition Overview */}
          <NutritionGrid calories={mealDetail.calories} macros={mealDetail.macros} />

          {/* Micro Overview Button */}
          <View className="px-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Micronutrients
              </Text>
            </View>
            <Pressable 
              onPress={() => setShowMicroModal(true)}
              className="flex-row items-center justify-between rounded-3xl border border-gray-100 bg-white p-5 shadow-premium-sm active:opacity-70 dark:border-gray-800 dark:bg-gray-800"
            >
              <View className="flex-row gap-8">
                <View>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Iron</Text>
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    {(mealDetail.micros?.iron_mg || 0).toFixed(1)}<Text className="text-xs font-normal">mg</Text>
                  </Text>
                </View>
                <View>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Zinc</Text>
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    {(mealDetail.micros?.zinc_mg || 0).toFixed(1)}<Text className="text-xs font-normal">mg</Text>
                  </Text>
                </View>
                <View>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Calcium</Text>
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    {(mealDetail.micros?.calcium_mg || 0).toFixed(1)}<Text className="text-xs font-normal">mg</Text>
                  </Text>
                </View>
              </View>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
              </View>
            </Pressable>
          </View>

          {/* Ingredients */}
          <IngredientsList ingredients={mealDetail.ingredients} />

          {/* Preparation Steps */}
          <PreparationSteps steps={mealDetail.preparationSteps} />
        </View>
      </ScrollView>

      {/* Action Buttons (Fixed at bottom) */}
      <View className="absolute bottom-0 left-0 right-0 rounded-t-[32px] border-t border-gray-100 bg-white px-6 py-6 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] dark:border-gray-800 dark:bg-gray-900">
        {/* Mark as Done */}
        <Pressable
          onPress={handleMarkAsDone}
          className="mb-4 rounded-2xl bg-blue-500 py-4 shadow-sm active:opacity-80 dark:bg-blue-600"
        >
          <Text className="text-center text-lg font-bold text-white">
            Mark as Done
          </Text>
        </Pressable>

        <View className="flex-row gap-4">
          {/* Ate Something Else */}
          <Pressable
            onPress={handleAteSomethingElse}
            className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 py-3.5 active:opacity-70 dark:border-gray-700 dark:bg-gray-800"
          >
            <Text className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              Ate alternative
            </Text>
          </Pressable>

          {/* Swap Meal */}
          <Pressable
            onPress={handleSwapMeal}
            className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 py-3.5 active:opacity-70 dark:border-gray-700 dark:bg-gray-800"
          >
            <Text className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              Swap Meal
            </Text>
          </Pressable>
        </View>
      </View>

      <MicroNutritionModal 
        visible={showMicroModal}
        onClose={() => setShowMicroModal(false)}
        micros={mealDetail.micros}
      />
    </View>
  );
}
