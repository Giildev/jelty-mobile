import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
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
      if (!userId) return;

      const availabilityData = await loadOnboardingStep6(userId);
      if (availabilityData) {
        setValue("daysAvailable", availabilityData.daysAvailable || []);
        setValue("timePerSession", availabilityData.timePerSession || 45);
        setValue("preferredTimeOfDay", availabilityData.preferredTimeOfDay as any);
        setValue("additionalNotes", availabilityData.additionalNotes || null);
      }
    } catch (error) {
      console.error("Error loading step 6 data:", error);
    }
  };

  const onSubmit = async (data: AvailabilityFormData) => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario");
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
        // Navigate to next step (or complete onboarding)
        Alert.alert(
          "¡Disponibilidad guardada!",
          "Tu disponibilidad ha sido guardada de forma segura. Próximamente continuaremos con el paso 7.",
          [
            {
              text: "OK",
            },
          ]
        );
      } else {
        Alert.alert("Error", "No se pudo guardar la información");
      }
    } catch (error) {
      console.error("Error saving onboarding step 6:", error);
      Alert.alert("Error", "Ocurrió un error al guardar la información");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-base-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Progress Indicator */}
        <View className="px-6 pt-2">
          <ProgressIndicator
            currentStep={6}
            totalSteps={9}
            stepLabel="Availability & Schedule"
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
              Availability & Schedule
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              Tell us when you're available to work out.
            </Text>
          </View>

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
