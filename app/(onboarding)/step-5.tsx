import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
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
      if (!userId) return;

      const exerciseData = await loadOnboardingStep5(userId);
      if (exerciseData) {
        setValue("experienceLevel", exerciseData.experienceLevel as any);
        setValue("preferredTrainingTypes", exerciseData.preferredTrainingTypes || []);
        setValue("equipmentAvailability", exerciseData.equipmentAvailability as any);
      }
    } catch (error) {
      console.error("Error loading step 5 data:", error);
    }
  };

  const onSubmit = async (data: ExercisePreferencesFormData) => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario");
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
        Alert.alert("Error", "No se pudo guardar la información");
      }
    } catch (error) {
      console.error("Error saving onboarding step 5:", error);
      Alert.alert("Error", "Ocurrió un error al guardar la información");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.back();
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
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-base-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Progress Indicator */}
        <View className="px-6 pt-2">
          <ProgressIndicator
            currentStep={5}
            totalSteps={9}
            stepLabel="Exercise Preferences"
          />
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-6 mt-6">
            <Text className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Exercise Preferences
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              Tell us how you like to train.
            </Text>
          </View>

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

          {/* Navigation Buttons */}
          <View className="mb-6 mt-4 flex-row gap-3">
            <View className="flex-1">
              <Button onPress={handleBack} variant="outline">
                Back
              </Button>
            </View>
            <View className="flex-[2]">
              <Button
                onPress={handleSubmit(onSubmit)}
                loading={saving}
                variant="brand-primary"
              >
                Next
              </Button>
            </View>
          </View>

          {/* Privacy Message */}
          <View className="mb-4 flex-row items-center justify-center gap-2">
            <Ionicons name="lock-closed" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Your data is encrypted and never shared
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
