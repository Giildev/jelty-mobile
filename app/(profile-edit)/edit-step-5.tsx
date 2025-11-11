import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  exercisePreferencesSchema,
  ExercisePreferencesFormData,
  experienceLevelLabels,
  equipmentAvailabilityLabels,
  TRAINING_TYPES,
} from "@/utils/validation/onboardingSchemas";

// Components
import { Button } from "@/components/ui/Button";
import { EditScreenLayout } from "@/components/profile/EditScreenLayout";
import { MultiSelectChips } from "@/components/onboarding/MultiSelectChips";
import { RadioButtonGroup } from "@/components/onboarding/RadioButtonGroup";

// Services
import { saveOnboardingStep5, loadOnboardingStep5 } from "@/services/supabase/onboarding";

/**
 * Edit Step 5: Exercise Preferences
 * Allows editing of exercise preferences from profile screen
 */
export default function EditStep5Screen() {
  const router = useRouter();
  const { userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ExercisePreferencesFormData>({
    resolver: zodResolver(exercisePreferencesSchema),
    defaultValues: {
      experienceLevel: "beginner",
      preferredTrainingTypes: [],
      equipmentAvailability: "none",
    },
  });

  // Load existing exercise data on mount
  useEffect(() => {
    loadExerciseData();
  }, []);

  const loadExerciseData = async () => {
    try {
      if (!userId) {
        setLoading(false);
        return;
      }

      const exerciseData = await loadOnboardingStep5(userId);
      if (exerciseData) {
        setValue("experienceLevel", exerciseData.experienceLevel as any);
        setValue("preferredTrainingTypes", exerciseData.preferredTrainingTypes || []);
        setValue("equipmentAvailability", exerciseData.equipmentAvailability as any);
      }
    } catch (error) {
      console.error("Error loading step 5 data:", error);
      Alert.alert("Error", "Failed to load exercise preferences");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ExercisePreferencesFormData) => {
    if (!userId) {
      Alert.alert("Error", "User not found");
      return;
    }

    setSaving(true);

    try {
      const success = await saveOnboardingStep5(userId, {
        experienceLevel: data.experienceLevel,
        preferredTrainingTypes: data.preferredTrainingTypes || [],
        equipmentAvailability: data.equipmentAvailability,
      });

      if (success) {
        Alert.alert("Success", "Exercise preferences updated successfully", [
          { text: "OK", onPress: () => router.push("/(tabs)/profile") },
        ]);
      } else {
        Alert.alert("Error", "Could not save information");
      }
    } catch (error) {
      console.error("Error saving onboarding step 5:", error);
      Alert.alert("Error", "An error occurred while saving information");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/(tabs)/profile");
  };

  const experienceLevelOptions = [
    { value: "beginner", label: experienceLevelLabels.beginner },
    { value: "intermediate", label: experienceLevelLabels.intermediate },
    { value: "advanced", label: experienceLevelLabels.advanced },
  ];

  const equipmentOptions = [
    { value: "none", label: equipmentAvailabilityLabels.none },
    { value: "home_equipment", label: equipmentAvailabilityLabels.home_equipment },
    { value: "full_gym", label: equipmentAvailabilityLabels.full_gym },
  ];

  return (
    <EditScreenLayout
      title="Exercise Preferences"
      description="Update how you like to train"
      loading={loading}
    >
      <View className="px-6">
        {/* Experience Level */}
        <Controller
          control={control}
          name="experienceLevel"
          render={({ field: { onChange, value } }) => (
            <RadioButtonGroup
              label="Experience Level"
              options={experienceLevelOptions}
              value={value}
              onChange={onChange}
              error={errors.experienceLevel?.message}
            />
          )}
        />

        {/* Preferred Training Types */}
        <Controller
          control={control}
          name="preferredTrainingTypes"
          render={({ field: { onChange, value } }) => (
            <MultiSelectChips
              label="Preferred Training Types"
              options={TRAINING_TYPES}
              value={value || []}
              onChange={onChange}
              error={errors.preferredTrainingTypes?.message}
            />
          )}
        />

        {/* Equipment Availability */}
        <Controller
          control={control}
          name="equipmentAvailability"
          render={({ field: { onChange, value } }) => (
            <RadioButtonGroup
              label="Equipment Availability"
              options={equipmentOptions}
              value={value}
              onChange={onChange}
              error={errors.equipmentAvailability?.message}
            />
          )}
        />

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
