import {
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { healthInfoSchema, HealthInfoFormData } from "@/utils/validation/onboardingSchemas";

// Components
import { OnboardingStepLayout } from "@/components/onboarding/OnboardingStepLayout";
import { ChipInput } from "@/components/ui/ChipInput";

// Services
import { saveOnboardingStep3, loadOnboardingStep3 } from "@/services/supabase/onboarding";

/**
 * Onboarding Step 3: Health Information
 * Collects medical conditions, medications, injuries, and allergies
 */
export default function OnboardingStep3Screen() {
  const router = useRouter();
  const { userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HealthInfoFormData>({
    resolver: zodResolver(healthInfoSchema),
    defaultValues: {
      medicalConditions: [],
      medications: [],
      injuries: [],
      allergies: [],
    },
  });

  // Load existing health data on mount
  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      if (!userId) {
        setLoading(false);
        return;
      }

      const healthData = await loadOnboardingStep3(userId);
      if (healthData) {
        setValue("medicalConditions", healthData.medicalConditions || []);
        setValue("medications", healthData.medications || []);
        setValue("injuries", healthData.injuries || []);
        setValue("allergies", healthData.allergies || []);
      }
    } catch (error) {
      console.error("Error loading step 3 data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: HealthInfoFormData) => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario");
      return;
    }

    setSaving(true);

    try {
      const success = await saveOnboardingStep3(userId, {
        medicalConditions: data.medicalConditions || [],
        medications: data.medications || [],
        injuries: data.injuries || [],
        allergies: data.allergies || [],
      });

      if (success) {
        // Navigate to step 4
        router.push("/(onboarding)/step-4");
      } else {
        Alert.alert("Error", "No se pudo guardar la información");
      }
    } catch (error) {
      console.error("Error saving onboarding step 3:", error);
      Alert.alert("Error", "Ocurrió un error al guardar la información");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingStepLayout
      currentStep={3}
      totalSteps={9}
      stepLabel="Información de Salud"
      title="Cuéntanos sobre tu salud"
      description="Esta información nos ayuda a adaptar tu plan de manera segura. Todos los campos son opcionales."
      onBack={() => router.back()}
      onNext={handleSubmit(onSubmit)}
      loading={loading}
      saving={saving}
    >
      {/* Content */}
      <View className="px-6">
        {/* Medical Conditions */}
        <Controller
          control={control}
          name="medicalConditions"
          render={({ field: { onChange, value } }) => (
            <ChipInput
              label="Condiciones Médicas"
              value={value || []}
              onChange={onChange}
              placeholder="ej. Diabetes, Hipertensión"
              error={errors.medicalConditions?.message}
            />
          )}
        />

        {/* Current Medications */}
        <Controller
          control={control}
          name="medications"
          render={({ field: { onChange, value } }) => (
            <ChipInput
              label="Medicamentos Actuales"
              value={value || []}
              onChange={onChange}
              placeholder="ej. Aspirina, Vitaminas"
              error={errors.medications?.message}
            />
          )}
        />

        {/* Previous Injuries */}
        <Controller
          control={control}
          name="injuries"
          render={({ field: { onChange, value } }) => (
            <ChipInput
              label="Lesiones Previas"
              value={value || []}
              onChange={onChange}
              placeholder="ej. Lesión de rodilla, Dolor de hombro"
              error={errors.injuries?.message}
            />
          )}
        />

        {/* Allergies */}
        <Controller
          control={control}
          name="allergies"
          render={({ field: { onChange, value } }) => (
            <ChipInput
              label="Alergias"
              value={value || []}
              onChange={onChange}
              placeholder="ej. Lactosa, Maní, Mariscos"
              error={errors.allergies?.message}
            />
          )}
        />
      </View>
    </OnboardingStepLayout>
  );
}
