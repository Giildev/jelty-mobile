import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/clerk-expo";

// Components
import { Button } from "@/components/ui/Button";
import { EditScreenLayout } from "@/components/profile/EditScreenLayout";
import {
  notificationSettingsSchema,
  type NotificationSettingsFormData,
} from "@/utils/validation/onboardingSchemas";
import {
  saveOnboardingStep8,
  loadOnboardingStep8,
} from "@/services/supabase/onboarding";

/**
 * Edit Step 8: Notifications & Reminders
 * Allows editing of notification settings from profile screen
 */
export default function EditStep8Screen() {
  const router = useRouter();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      mealsEnabled: true,
      workoutsEnabled: true,
      remindersEnabled: true,
      quietHoursStart: null,
      quietHoursEnd: null,
    },
  });

  // Load existing data on mount
  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const existingData = await loadOnboardingStep8(userId);

        if (existingData) {
          setValue("mealsEnabled", existingData.mealsEnabled);
          setValue("workoutsEnabled", existingData.workoutsEnabled);
          setValue("remindersEnabled", existingData.remindersEnabled);
          setValue("quietHoursStart", existingData.quietHoursStart);
          setValue("quietHoursEnd", existingData.quietHoursEnd);
        }
      } catch (error) {
        console.error("Error loading step 8 data:", error);
        Alert.alert("Error", "Failed to load notification settings");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, setValue]);

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    setSaving(true);
    try {
      const success = await saveOnboardingStep8(userId, {
        mealsEnabled: data.mealsEnabled,
        workoutsEnabled: data.workoutsEnabled,
        remindersEnabled: data.remindersEnabled,
        quietHoursStart: data.quietHoursStart,
        quietHoursEnd: data.quietHoursEnd,
      });

      if (success) {
        Alert.alert("Success", "Notification settings updated successfully", [
          { text: "OK", onPress: () => router.push("/(tabs)/profile") },
        ]);
      } else {
        Alert.alert("Error", "Failed to save notification settings");
      }
    } catch (error) {
      console.error("Error saving step 8:", error);
      Alert.alert("Error", "An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/(tabs)/profile");
  };

  return (
    <EditScreenLayout
      title="Notifications & Reminders"
      description="Update your notification preferences"
      loading={loading}
    >
      {/* Form Content */}
      <View className="px-6">
        {/* Meal Reminders */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between rounded-xl border-2 border-gray-300 bg-white px-4 py-4 dark:border-gray-600 dark:bg-gray-800">
            <View className="flex-1 pr-4">
              <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                Meal Reminders
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Get notified when it's time to eat
              </Text>
            </View>
            <Controller
              control={control}
              name="mealsEnabled"
              render={({ field: { value, onChange } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                  thumbColor={value ? "#3B82F6" : "#F3F4F6"}
                  ios_backgroundColor="#D1D5DB"
                />
              )}
            />
          </View>
          {errors.mealsEnabled && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.mealsEnabled.message}
            </Text>
          )}
        </View>

        {/* Workout Reminders */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between rounded-xl border-2 border-gray-300 bg-white px-4 py-4 dark:border-gray-600 dark:bg-gray-800">
            <View className="flex-1 pr-4">
              <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                Workout Reminders
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Stay consistent with your training
              </Text>
            </View>
            <Controller
              control={control}
              name="workoutsEnabled"
              render={({ field: { value, onChange } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                  thumbColor={value ? "#3B82F6" : "#F3F4F6"}
                  ios_backgroundColor="#D1D5DB"
                />
              )}
            />
          </View>
          {errors.workoutsEnabled && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.workoutsEnabled.message}
            </Text>
          )}
        </View>

        {/* General Reminders */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between rounded-xl border-2 border-gray-300 bg-white px-4 py-4 dark:border-gray-600 dark:bg-gray-800">
            <View className="flex-1 pr-4">
              <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                Daily Motivation
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Receive motivational messages and tips
              </Text>
            </View>
            <Controller
              control={control}
              name="remindersEnabled"
              render={({ field: { value, onChange } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                  thumbColor={value ? "#3B82F6" : "#F3F4F6"}
                  ios_backgroundColor="#D1D5DB"
                />
              )}
            />
          </View>
          {errors.remindersEnabled && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.remindersEnabled.message}
            </Text>
          )}
        </View>

        {/* Info Message */}
        <View className="mt-4 rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
          <Text className="text-sm text-blue-900 dark:text-blue-100">
            You can change these settings anytime in your profile
          </Text>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3 mb-8 mt-6">
          <View className="flex-1">
            <Button onPress={handleCancel} variant="secondary">
              Cancel
            </Button>
          </View>
          <View className="flex-1">
            <Button
              onPress={handleSubmit(onSubmit)}
              loading={saving}
              disabled={saving}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </EditScreenLayout>
  );
}
