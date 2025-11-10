import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  availabilitySchema,
  AvailabilityFormData,
  SESSION_DURATIONS,
} from "@/utils/validation/onboardingSchemas";

// Components
import { OnboardingStepLayout } from "@/components/onboarding/OnboardingStepLayout";
import { DaySelector } from "@/components/onboarding/DaySelector";
import { TimeOfDaySelector } from "@/components/onboarding/TimeOfDaySelector";

// Services
import { saveOnboardingStep6, loadOnboardingStep6 } from "@/services/supabase/onboarding";

/**
 * Onboarding Step 6: Availability & Schedule
 * Collects days available, time per session, preferred time of day, and additional notes
 */
export default function OnboardingStep6Screen() {
  const router = useRouter();
  const { userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      daysAvailable: [],
      timePerSession: 45,
      preferredTimeOfDay: "morning",
      additionalNotes: null,
    },
  });

  // Load existing availability data on mount
  useEffect(() => {
    loadAvailabilityData();
  }, []);

  const loadAvailabilityData = async () => {
    try {
      if (!userId) {
        setLoading(false);
        return;
      }

      const availabilityData = await loadOnboardingStep6(userId);
      if (availabilityData) {
        setValue("daysAvailable", availabilityData.daysAvailable || []);
        setValue("timePerSession", availabilityData.timePerSession || 45);
        setValue("preferredTimeOfDay", availabilityData.preferredTimeOfDay as any);
        setValue("additionalNotes", availabilityData.additionalNotes || null);
      }
    } catch (error) {
      console.error("Error loading step 6 data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AvailabilityFormData) => {
    if (!userId) {
      Alert.alert("Error", "User not found");
      return;
    }

    setSaving(true);

    try {
      const success = await saveOnboardingStep6(userId, {
        daysAvailable: data.daysAvailable,
        timePerSession: data.timePerSession,
        preferredTimeOfDay: data.preferredTimeOfDay,
        additionalNotes: data.additionalNotes || null,
      });

      if (success) {
        // Navigate to step 7
        router.push("/(onboarding)/step-7");
      } else {
        Alert.alert("Error", "Could not save information");
      }
    } catch (error) {
      console.error("Error saving onboarding step 6:", error);
      Alert.alert("Error", "An error occurred while saving information");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingStepLayout
      currentStep={6}
      totalSteps={9}
      stepLabel="Availability & Schedule"
      title="Availability & Schedule"
      description="Tell us when you're available to work out."
      onBack={() => router.back()}
      onNext={handleSubmit(onSubmit)}
      loading={loading}
      saving={saving}
    >
      {/* Content */}
      <View className="px-6">
        {/* Days Available */}
        <Controller
          control={control}
          name="daysAvailable"
          render={({ field: { onChange, value } }) => (
            <DaySelector
              label="Days Available"
              value={value}
              onChange={onChange}
              error={errors.daysAvailable?.message}
            />
          )}
        />

        {/* Time per Session */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Time per Session
          </Text>
          <Controller
            control={control}
            name="timePerSession"
            render={({ field: { onChange, value } }) => (
              <View className="flex-row gap-2">
                {SESSION_DURATIONS.map((duration) => {
                  const isSelected = value === duration;
                  return (
                    <TouchableOpacity
                      key={duration}
                      onPress={() => onChange(duration)}
                      className={`
                        flex-1 items-center justify-center rounded-xl border-2 py-3
                        ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        }
                      `}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`
                          text-sm font-semibold
                          ${isSelected ? "text-white" : "text-gray-900 dark:text-white"}
                        `}
                      >
                        {duration}
                      </Text>
                      <Text
                        className={`
                          mt-0.5 text-xs
                          ${isSelected ? "text-white/80" : "text-gray-600 dark:text-gray-400"}
                        `}
                      >
                        min
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />
          {errors.timePerSession && (
            <Text className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.timePerSession.message}
            </Text>
          )}
        </View>

        {/* Preferred Time of Day */}
        <Controller
          control={control}
          name="preferredTimeOfDay"
          render={({ field: { onChange, value } }) => (
            <TimeOfDaySelector
              label="Preferred Time of Day"
              value={value}
              onChange={onChange}
              error={errors.preferredTimeOfDay?.message}
            />
          )}
        />

        {/* Additional Notes */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Additional Notes (Optional)
          </Text>
          <Controller
            control={control}
            name="additionalNotes"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Any specific preferences or constraints..."
                placeholderTextColor="#9CA3AF"
                value={value || ""}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-base text-gray-900 dark:text-white"
                style={{ minHeight: 100 }}
              />
            )}
          />
          {errors.additionalNotes && (
            <Text className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.additionalNotes.message}
            </Text>
          )}
        </View>
      </View>
    </OnboardingStepLayout>
  );
}
