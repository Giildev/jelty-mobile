import {
  View,
  Text,
  Alert,
} from "react-native";
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
import { OnboardingStepLayout } from "@/components/onboarding/OnboardingStepLayout";
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

  const [loading, setLoading] = useState(true);
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
      if (!userId) {
        setLoading(false);
        return;
      }

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
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: DietaryPreferencesFormData) => {
    if (!userId) {
      Alert.alert("Error", "User not found");
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
        Alert.alert("Error", "Could not save information");
      }
    } catch (error) {
      console.error("Error saving onboarding step 4:", error);
      Alert.alert("Error", "An error occurred while saving information");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingStepLayout
      currentStep={4}
      totalSteps={9}
      stepLabel="Dietary Preferences"
      title="Dietary Preferences"
      description="Tell us about your dietary preferences and restrictions."
      onBack={() => router.back()}
      onNext={handleSubmit(onSubmit)}
      loading={loading}
      saving={saving}
    >
      {/* Content */}
      <View className="px-6">
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
      </View>
    </OnboardingStepLayout>
  );
}
