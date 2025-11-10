import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

import { OnboardingStepLayout } from "@/components/onboarding/OnboardingStepLayout";
import { RadioButtonGroup } from "@/components/onboarding/RadioButtonGroup";
import {
  cookingPreferencesSchema,
  type CookingPreferencesFormData,
} from "@/utils/validation/onboardingSchemas";
import {
  saveOnboardingStep7,
  loadOnboardingStep7,
} from "@/services/supabase/onboarding";

// Label mappings
const cookingSkillLevelLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const cookTimeRangeLabels: Record<string, string> = {
  under_15: "<15 min",
  "15_30": "15-30 min",
  "30_45": "30-45 min",
  "45_60": "45-60 min",
  over_60: "60+ min",
};

const shoppingFrequencyLabels: Record<string, string> = {
  weekly: "Weekly",
  bi_weekly: "Bi-weekly",
  monthly: "Monthly",
};

const COOK_TIME_OPTIONS = [
  "under_15",
  "15_30",
  "30_45",
  "45_60",
  "over_60",
] as const;

const SHOPPING_FREQUENCY_OPTIONS = [
  "weekly",
  "bi_weekly",
  "monthly",
] as const;

export default function OnboardingStep7Screen() {
  const router = useRouter();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showShoppingModal, setShowShoppingModal] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CookingPreferencesFormData>({
    resolver: zodResolver(cookingPreferencesSchema),
    defaultValues: {
      cookingSkillLevel: "beginner",
      cookTimeRange: "15_30",
      cookingForPeople: 1,
      shoppingFrequency: "weekly",
    },
  });

  const selectedShoppingFrequency = watch("shoppingFrequency");

  // Load existing data on mount
  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const existingData = await loadOnboardingStep7(userId);

        if (existingData) {
          if (existingData.cookingSkillLevel) {
            setValue("cookingSkillLevel", existingData.cookingSkillLevel as any);
          }
          if (existingData.cookTimeRange) {
            setValue("cookTimeRange", existingData.cookTimeRange as any);
          }
          if (existingData.cookingForPeople) {
            setValue("cookingForPeople", existingData.cookingForPeople);
          }
          if (existingData.shoppingFrequency) {
            setValue("shoppingFrequency", existingData.shoppingFrequency as any);
          }
        }
      } catch (error) {
        console.error("Error loading step 7 data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, setValue]);

  const onSubmit = async (data: CookingPreferencesFormData) => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    setSaving(true);
    try {
      const success = await saveOnboardingStep7(userId, {
        cookingSkillLevel: data.cookingSkillLevel,
        cookTimeRange: data.cookTimeRange,
        cookingForPeople: data.cookingForPeople,
        shoppingFrequency: data.shoppingFrequency,
      });

      if (success) {
        router.push("/(onboarding)/step-8");
      } else {
        Alert.alert("Error", "Failed to save cooking preferences");
      }
    } catch (error) {
      console.error("Error saving step 7:", error);
      Alert.alert("Error", "An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingStepLayout
      currentStep={7}
      totalSteps={9}
      stepLabel="Cooking Preferences"
      title="Cooking Preferences"
      description="Help us create meal plans that fit your lifestyle"
      onBack={() => router.back()}
      onNext={handleSubmit(onSubmit)}
      loading={loading}
      saving={saving}
    >
      {/* Form Content */}
      <View className="px-6">
        {/* Cooking Skill Level */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Cooking Skill Level
          </Text>
          <Controller
            control={control}
            name="cookingSkillLevel"
            render={({ field: { value, onChange } }) => (
              <RadioButtonGroup
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "advanced", label: "Advanced" },
                  { value: "expert", label: "Expert" },
                ]}
                selectedValue={value}
                onValueChange={onChange}
              />
            )}
          />
          {errors.cookingSkillLevel && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.cookingSkillLevel.message}
            </Text>
          )}
        </View>

        {/* Time Available to Cook */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Time Available to Cook
          </Text>
          <Text className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Per meal
          </Text>
          <Controller
            control={control}
            name="cookTimeRange"
            render={({ field: { value, onChange } }) => (
              <View className="gap-2">
                {/* First row - 3 buttons */}
                <View className="flex-row gap-2">
                  {COOK_TIME_OPTIONS.slice(0, 3).map((option) => {
                    const isSelected = value === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => onChange(option)}
                        style={{ width: 110, height: 48 }}
                        className={`items-center justify-center rounded-xl border-2 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                        }`}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`text-sm font-medium ${
                            isSelected
                              ? "text-white"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {cookTimeRangeLabels[option]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {/* Second row - 2 buttons */}
                <View className="flex-row gap-2">
                  {COOK_TIME_OPTIONS.slice(3).map((option) => {
                    const isSelected = value === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => onChange(option)}
                        style={{ width: 110, height: 48 }}
                        className={`items-center justify-center rounded-xl border-2 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                        }`}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`text-sm font-medium ${
                            isSelected
                              ? "text-white"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {cookTimeRangeLabels[option]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          />
          {errors.cookTimeRange && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.cookTimeRange.message}
            </Text>
          )}
        </View>

        {/* Cooking for Others */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Cooking for Others?
          </Text>
          <Text className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Including yourself (1-5 people)
          </Text>
          <Controller
            control={control}
            name="cookingForPeople"
            render={({ field: { value, onChange } }) => (
              <View className="flex-row items-center justify-center gap-4">
                <TouchableOpacity
                  onPress={() => onChange(Math.max(1, value - 1))}
                  disabled={value <= 1}
                  className={`h-12 w-12 items-center justify-center rounded-full border-2 ${
                    value <= 1
                      ? "border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
                      : "border-primary bg-white dark:bg-gray-800"
                  }`}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="remove"
                    size={24}
                    color={value <= 1 ? "#9CA3AF" : "#3B82F6"}
                  />
                </TouchableOpacity>

                <View className="min-w-[80px] items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3 dark:border-gray-600 dark:bg-gray-800">
                  <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    {value}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    {value === 1 ? "person" : "people"}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => onChange(Math.min(5, value + 1))}
                  disabled={value >= 5}
                  className={`h-12 w-12 items-center justify-center rounded-full border-2 ${
                    value >= 5
                      ? "border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
                      : "border-primary bg-white dark:bg-gray-800"
                  }`}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="add"
                    size={24}
                    color={value >= 5 ? "#9CA3AF" : "#3B82F6"}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.cookingForPeople && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.cookingForPeople.message}
            </Text>
          )}
        </View>

        {/* Shopping Frequency */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Shopping Frequency
          </Text>
          <Controller
            control={control}
            name="shoppingFrequency"
            render={({ field: { value, onChange } }) => (
              <>
                <TouchableOpacity
                  onPress={() => setShowShoppingModal(true)}
                  className="flex-row items-center justify-between rounded-xl border-2 border-gray-300 bg-white px-4 py-4 dark:border-gray-600 dark:bg-gray-800"
                  activeOpacity={0.7}
                >
                  <Text className="text-base text-gray-900 dark:text-white">
                    {shoppingFrequencyLabels[value]}
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>

                {/* Shopping Frequency Modal */}
                <Modal
                  visible={showShoppingModal}
                  transparent
                  animationType="slide"
                  onRequestClose={() => setShowShoppingModal(false)}
                >
                  <TouchableOpacity
                    className="flex-1 justify-end bg-black/50"
                    activeOpacity={1}
                    onPress={() => setShowShoppingModal(false)}
                  >
                    <View className="rounded-t-3xl bg-white pb-8 dark:bg-gray-900">
                      {/* Modal Header */}
                      <View className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <TouchableOpacity
                          onPress={() => setShowShoppingModal(false)}
                        >
                          <Text className="text-base text-primary">
                            Done
                          </Text>
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                          Shopping Frequency
                        </Text>
                        <View style={{ width: 50 }} />
                      </View>

                      {/* Options */}
                      <View className="px-6 pt-4">
                        {SHOPPING_FREQUENCY_OPTIONS.map((option) => {
                          const isSelected = value === option;
                          return (
                            <TouchableOpacity
                              key={option}
                              onPress={() => {
                                onChange(option);
                                setShowShoppingModal(false);
                              }}
                              className={`mb-3 flex-row items-center justify-between rounded-xl border-2 px-4 py-4 ${
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                              }`}
                              activeOpacity={0.7}
                            >
                              <Text
                                className={`text-base ${
                                  isSelected
                                    ? "font-semibold text-primary"
                                    : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {shoppingFrequencyLabels[option]}
                              </Text>
                              {isSelected && (
                                <Ionicons
                                  name="checkmark-circle"
                                  size={24}
                                  color="#3B82F6"
                                />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </>
            )}
          />
          {errors.shoppingFrequency && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.shoppingFrequency.message}
            </Text>
          )}
        </View>
      </View>
    </OnboardingStepLayout>
  );
}
