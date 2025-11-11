import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fitnessGoalSchema,
  FitnessGoalFormData,
  FitnessGoalType,
  GoalTimeframe,
} from "@/utils/validation/onboardingSchemas";

// Components
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EditScreenLayout } from "@/components/profile/EditScreenLayout";
import { FitnessGoalDropdown } from "@/components/onboarding/FitnessGoalDropdown";
import { TimeframeDropdown } from "@/components/onboarding/TimeframeDropdown";
import { NumberInput } from "@/components/onboarding/NumberInput";

// Services
import {
  saveOnboardingStep2,
  loadOnboardingStep2,
} from "@/services/supabase/onboarding";
import { getUserByClerkId } from "@/services/supabase/users";

/**
 * Edit Step 2: Fitness Goals & Progress Tracking
 * Allows editing of fitness goals and current body measurements from profile screen
 */
export default function EditStep2Screen() {
  const router = useRouter();
  const { userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [measurementSystem, setMeasurementSystem] = useState<"metric" | "imperial">("metric");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FitnessGoalFormData>({
    resolver: zodResolver(fitnessGoalSchema),
    defaultValues: {
      goal_type: "lose_fat" as FitnessGoalType,
      timeframe: "12_weeks" as GoalTimeframe,
      target_weight_kg: undefined,
      target_bodyfat_pct: undefined,
      chest_cm: undefined,
      waist_cm: undefined,
      hips_cm: undefined,
      biceps_cm: undefined,
      thighs_cm: undefined,
      neck_cm: undefined,
      shoulders_cm: undefined,
      forearms_cm: undefined,
      calves_cm: undefined,
    },
  });

  // Load user data and measurement system on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      if (!userId) {
        setLoading(false);
        return;
      }

      // Load user profile to get measurement system
      const userData = await getUserByClerkId(userId);
      if (userData?.profile) {
        const system = userData.profile.measurement_system || "metric";
        setMeasurementSystem(system as "metric" | "imperial");
      }

      // Load existing step 2 data if available
      const step2Data = await loadOnboardingStep2(userId);
      if (step2Data) {
        // Set goal fields
        if (step2Data.goal) {
          if (step2Data.goal.goal_type) {
            setValue("goal_type", step2Data.goal.goal_type as FitnessGoalType);
          }
          if (step2Data.goal.timeframe) {
            setValue("timeframe", step2Data.goal.timeframe as GoalTimeframe);
          }
          if (step2Data.goal.target_weight_kg) {
            setValue("target_weight_kg", step2Data.goal.target_weight_kg);
          }
          if (step2Data.goal.target_bodyfat_pct) {
            setValue("target_bodyfat_pct", step2Data.goal.target_bodyfat_pct);
          }
        }

        // Set body goal fields
        if (step2Data.bodyGoal) {
          if (step2Data.bodyGoal.chest_cm) setValue("chest_cm", step2Data.bodyGoal.chest_cm);
          if (step2Data.bodyGoal.waist_cm) setValue("waist_cm", step2Data.bodyGoal.waist_cm);
          if (step2Data.bodyGoal.hips_cm) setValue("hips_cm", step2Data.bodyGoal.hips_cm);
          if (step2Data.bodyGoal.biceps_cm) setValue("biceps_cm", step2Data.bodyGoal.biceps_cm);
          if (step2Data.bodyGoal.thighs_cm) setValue("thighs_cm", step2Data.bodyGoal.thighs_cm);
          if (step2Data.bodyGoal.neck_cm) setValue("neck_cm", step2Data.bodyGoal.neck_cm);
          if (step2Data.bodyGoal.shoulders_cm)
            setValue("shoulders_cm", step2Data.bodyGoal.shoulders_cm);
          if (step2Data.bodyGoal.forearms_cm)
            setValue("forearms_cm", step2Data.bodyGoal.forearms_cm);
          if (step2Data.bodyGoal.calves_cm) setValue("calves_cm", step2Data.bodyGoal.calves_cm);
        }
      }
    } catch (error) {
      console.error("Error loading step 2 data:", error);
      Alert.alert("Error", "Failed to load fitness goals data");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FitnessGoalFormData) => {
    if (!userId) {
      Alert.alert("Error", "User not found");
      return;
    }

    setSaving(true);

    try {
      // Prepare goal data
      const goalData = {
        goal_type: data.goal_type,
        timeframe: data.timeframe,
        target_weight_kg: data.target_weight_kg || undefined,
        target_bodyfat_pct: data.target_bodyfat_pct || undefined,
      };

      // Prepare body goal data (only include fields that have values)
      const bodyGoalData: any = {};
      if (data.chest_cm) bodyGoalData.chest_cm = data.chest_cm;
      if (data.waist_cm) bodyGoalData.waist_cm = data.waist_cm;
      if (data.hips_cm) bodyGoalData.hips_cm = data.hips_cm;
      if (data.biceps_cm) bodyGoalData.biceps_cm = data.biceps_cm;
      if (data.thighs_cm) bodyGoalData.thighs_cm = data.thighs_cm;
      if (data.neck_cm) bodyGoalData.neck_cm = data.neck_cm;
      if (data.shoulders_cm) bodyGoalData.shoulders_cm = data.shoulders_cm;
      if (data.forearms_cm) bodyGoalData.forearms_cm = data.forearms_cm;
      if (data.calves_cm) bodyGoalData.calves_cm = data.calves_cm;

      // Save to database
      const success = await saveOnboardingStep2(
        userId,
        goalData,
        Object.keys(bodyGoalData).length > 0 ? bodyGoalData : undefined
      );

      if (success) {
        Alert.alert("Success", "Fitness goals updated successfully", [
          { text: "OK", onPress: () => router.push("/(tabs)/profile") },
        ]);
      } else {
        Alert.alert("Error", "Could not save information");
      }
    } catch (error) {
      console.error("Error saving onboarding step 2:", error);
      Alert.alert("Error", "An error occurred while saving information");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/(tabs)/profile");
  };

  return (
    <EditScreenLayout
      title="Fitness Goals & Tracking"
      description="Update your fitness goals and body measurements"
      loading={loading}
    >
      <View className="px-6">
        {/* Fitness Goal */}
        <View className="mb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Fitness Goal
          </Text>
          <Controller
            control={control}
            name="goal_type"
            render={({ field: { onChange, value } }) => (
              <FitnessGoalDropdown
                label="Main Goal"
                value={value}
                onChange={onChange}
                error={errors.goal_type?.message}
              />
            )}
          />
        </View>

        {/* Timeframe */}
        <View className="mb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Timeframe
          </Text>
          <Controller
            control={control}
            name="timeframe"
            render={({ field: { onChange, value } }) => (
              <TimeframeDropdown
                label="How long?"
                value={value}
                onChange={onChange}
                error={errors.timeframe?.message}
              />
            )}
          />
        </View>

        {/* Weight Goal */}
        <View className="mb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Target Weight (Optional)
          </Text>
          <Controller
            control={control}
            name="target_weight_kg"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Target weight"
                value={value?.toString() ?? ""}
                onChange={(text) => onChange(text ? parseFloat(text) : null)}
                measurementSystem={measurementSystem}
                type="weight"
                error={errors.target_weight_kg?.message}
                optional
              />
            )}
          />
        </View>

        {/* Body Fat % Goal */}
        <View className="mb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Target Body Fat % (Optional)
          </Text>
          <Controller
            control={control}
            name="target_bodyfat_pct"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Target body fat percentage"
                value={value?.toString() ?? ""}
                onChange={(text) => onChange(text ? parseFloat(text) : null)}
                measurementSystem={measurementSystem}
                type="bodyfat"
                error={errors.target_bodyfat_pct?.message}
                optional
              />
            )}
          />
        </View>

        {/* Current Body Measurements */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Your Current Body Measurements
          </Text>
          <Text className="mb-4 text-sm text-gray-500 dark:text-gray-500">
            All measurements are optional. Complete the ones you want for more accurate tracking.
          </Text>

          {/* First row: Chest and Waist */}
          <View className="mb-4 flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="chest_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Chest"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 95 cm" : "e.g. 37 in"}
                    keyboardType="decimal-pad"
                    error={errors.chest_cm?.message}
                  />
                )}
              />
            </View>

            <View className="flex-1">
              <Controller
                control={control}
                name="waist_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Waist"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 80 cm" : "e.g. 31 in"}
                    keyboardType="decimal-pad"
                    error={errors.waist_cm?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Second row: Hips and Biceps */}
          <View className="mb-4 flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="hips_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Hips"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 95 cm" : "e.g. 37 in"}
                    keyboardType="decimal-pad"
                    error={errors.hips_cm?.message}
                  />
                )}
              />
            </View>

            <View className="flex-1">
              <Controller
                control={control}
                name="biceps_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Biceps"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 35 cm" : "e.g. 14 in"}
                    keyboardType="decimal-pad"
                    error={errors.biceps_cm?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Third row: Thighs and Neck */}
          <View className="mb-4 flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="thighs_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Thighs"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 55 cm" : "e.g. 22 in"}
                    keyboardType="decimal-pad"
                    error={errors.thighs_cm?.message}
                  />
                )}
              />
            </View>

            <View className="flex-1">
              <Controller
                control={control}
                name="neck_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Neck"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 38 cm" : "e.g. 15 in"}
                    keyboardType="decimal-pad"
                    error={errors.neck_cm?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Fourth row: Shoulders and Forearms */}
          <View className="mb-4 flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="shoulders_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Shoulders"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 110 cm" : "e.g. 43 in"}
                    keyboardType="decimal-pad"
                    error={errors.shoulders_cm?.message}
                  />
                )}
              />
            </View>

            <View className="flex-1">
              <Controller
                control={control}
                name="forearms_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Forearms"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 28 cm" : "e.g. 11 in"}
                    keyboardType="decimal-pad"
                    error={errors.forearms_cm?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Fifth row: Calves */}
          <View className="mb-4 flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="calves_cm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Calves"
                    value={value?.toString() ?? ""}
                    onChangeText={(text) => onChange(text ? parseFloat(text) : null)}
                    placeholder={measurementSystem === "metric" ? "e.g. 38 cm" : "e.g. 15 in"}
                    keyboardType="decimal-pad"
                    error={errors.calves_cm?.message}
                  />
                )}
              />
            </View>

            {/* Empty space for alignment */}
            <View className="flex-1" />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3 mb-8">
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
