import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
  dietaryPreferencesSchema,
  DietaryPreferencesFormData,
  DIETARY_PATTERNS,
  CUISINE_TYPES,
} from "@/utils/validation/onboardingSchemas";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { ChipInput } from "@/components/ui/ChipInput";
import { MultiSelectChips } from "@/components/onboarding/MultiSelectChips";
import { MealsPerDaySelector } from "@/components/onboarding/MealsPerDaySelector";
import { WaterIntakeDropdown } from "@/components/onboarding/WaterIntakeDropdown";

// Services
import { saveOnboardingStep4, loadOnboardingStep4 } from "@/services/supabase/onboarding";

/**
 * Onboarding Step 4: Dietary Preferences
 * Collects dietary patterns, cuisines, ingredients, meals per day, and water intake
 */
export default function OnboardingStep4Screen() {
  const router = useRouter();
  const { userId } = useAuth();

  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DietaryPreferencesFormData>({
    resolver: zodResolver(dietaryPreferencesSchema),
    defaultValues: {
      dietaryPatterns: [],
      cuisines: [],
      ingredientsToAvoid: [],
      ingredientsToInclude: [],
      mealsPerDay: null,
      waterIntake: null,
    },
  });

  // Load existing dietary data on mount
  useEffect(() => {
    loadDietaryData();
  }, []);

  const loadDietaryData = async () => {
    try {
      if (!userId) return;

      const dietaryData = await loadOnboardingStep4(userId);
      if (dietaryData) {
        setValue("dietaryPatterns", dietaryData.dietaryPatterns || []);
        setValue("cuisines", dietaryData.cuisines || []);
        setValue("ingredientsToAvoid", dietaryData.ingredientsToAvoid || []);
        setValue("ingredientsToInclude", dietaryData.ingredientsToInclude || []);
        setValue("mealsPerDay", dietaryData.mealsPerDay || null);
        setValue("waterIntake", dietaryData.waterIntake || null);
      }
    } catch (error) {
      console.error("Error loading step 4 data:", error);
    }
  };

  const onSubmit = async (data: DietaryPreferencesFormData) => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario");
      return;
    }

    setSaving(true);

    try {
      const success = await saveOnboardingStep4(userId, {
        dietaryPatterns: data.dietaryPatterns || [],
        cuisines: data.cuisines || [],
        ingredientsToAvoid: data.ingredientsToAvoid || [],
        ingredientsToInclude: data.ingredientsToInclude || [],
        mealsPerDay: data.mealsPerDay || null,
        waterIntake: data.waterIntake || null,
      });

      if (success) {
        // Navigate to step 5
        router.push("/(onboarding)/step-5");
      } else {
        Alert.alert("Error", "No se pudo guardar la información");
      }
    } catch (error) {
      console.error("Error saving onboarding step 4:", error);
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
            currentStep={4}
            totalSteps={9}
            stepLabel="Preferencias Alimentarias"
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
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Dietary Preferences
            </Text>
            <Text className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Tell us about your dietary preferences and restrictions.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            {/* Dietary Pattern */}
            <Controller
              control={control}
              name="dietaryPatterns"
              render={({ field: { onChange, value } }) => (
                <MultiSelectChips
                  label="Dietary Pattern"
                  options={DIETARY_PATTERNS}
                  value={value || []}
                  onChange={onChange}
                  error={errors.dietaryPatterns?.message}
                  icon={<Ionicons name="leaf-outline" size={20} color="#1F024B" />}
                />
              )}
            />

            {/* Preferred Cuisine */}
            <Controller
              control={control}
              name="cuisines"
              render={({ field: { onChange, value } }) => (
                <MultiSelectChips
                  label="Preferred Cuisine"
                  options={CUISINE_TYPES}
                  value={value || []}
                  onChange={onChange}
                  error={errors.cuisines?.message}
                  icon={<Ionicons name="restaurant-outline" size={20} color="#1F024B" />}
                />
              )}
            />

            {/* Ingredients to Avoid */}
            <Controller
              control={control}
              name="ingredientsToAvoid"
              render={({ field: { onChange, value } }) => (
                <ChipInput
                  label="Ingredients to Avoid"
                  placeholder="e.g., Nuts, Dairy"
                  value={value || []}
                  onChange={onChange}
                  error={errors.ingredientsToAvoid?.message}
                />
              )}
            />

            {/* Ingredients to Include */}
            <Controller
              control={control}
              name="ingredientsToInclude"
              render={({ field: { onChange, value } }) => (
                <ChipInput
                  label="Ingredients to Include"
                  placeholder="e.g., Quinoa, Avocado"
                  value={value || []}
                  onChange={onChange}
                  error={errors.ingredientsToInclude?.message}
                />
              )}
            />

            {/* Meals per Day */}
            <Controller
              control={control}
              name="mealsPerDay"
              render={({ field: { onChange, value } }) => (
                <MealsPerDaySelector
                  value={value || null}
                  onChange={onChange}
                  error={errors.mealsPerDay?.message}
                />
              )}
            />

            {/* Daily Water Intake */}
            <Controller
              control={control}
              name="waterIntake"
              render={({ field: { onChange, value } }) => (
                <WaterIntakeDropdown
                  value={value || null}
                  onChange={onChange}
                  error={errors.waterIntake?.message}
                />
              )}
            />
          </View>

          {/* Navigation Buttons */}
          <View className="my-6">
            <View className="flex-row gap-3">
              {/* Back Button */}
              <View className="flex-1">
                <TouchableOpacity
                  onPress={handleBack}
                  disabled={saving}
                  className="flex-row items-center justify-center rounded-xl border-2 border-primary bg-white py-3.5 dark:border-primary dark:bg-gray-900"
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color="#1F024B"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="text-base font-semibold text-primary">Atrás</Text>
                </TouchableOpacity>
              </View>

              {/* Next Button */}
              <View className="flex-[2]">
                <Button
                  onPress={handleSubmit(onSubmit)}
                  variant="brand-primary"
                  size="large"
                  loading={saving}
                  disabled={saving}
                >
                  Siguiente
                </Button>
              </View>
            </View>
          </View>

          {/* Privacy Message */}
          <View className="mb-8 flex-row items-center justify-center gap-2">
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
