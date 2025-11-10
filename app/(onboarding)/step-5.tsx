import {
  View,
  Alert,
} from "react-native";
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
import { OnboardingStepLayout } from "@/components/onboarding/OnboardingStepLayout";
import { MultiSelectChips } from "@/components/onboarding/MultiSelectChips";
import { RadioButtonGroup } from "@/components/onboarding/RadioButtonGroup";

// Services
import { saveOnboardingStep5, loadOnboardingStep5 } from "@/services/supabase/onboarding";

/**
 * Onboarding Step 5: Exercise Preferences
 * Collects experience level, training types, equipment availability, and injuries
 */
export default function OnboardingStep5Screen() {
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
        // Navigate to step 6
        router.push("/(onboarding)/step-6");
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
    <OnboardingStepLayout
      currentStep={5}
      totalSteps={9}
      stepLabel="Exercise Preferences"
      title="Exercise Preferences"
      description="Tell us how you like to train."
      onBack={() => router.back()}
      onNext={handleSubmit(onSubmit)}
      loading={loading}
      saving={saving}
    >
      {/* Content */}
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
      </View>
    </OnboardingStepLayout>
  );
}
