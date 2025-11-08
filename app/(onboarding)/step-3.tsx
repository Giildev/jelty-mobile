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
import { healthInfoSchema, HealthInfoFormData } from "@/utils/validation/onboardingSchemas";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
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
      if (!userId) return;

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
        // Show success message and inform about future step 4
        Alert.alert(
          "¡Información guardada!",
          "Tu información de salud ha sido guardada de forma segura. Próximamente se redirigirá al paso 4.",
          [
            {
              text: "Continuar",
              onPress: () => router.replace("/(tabs)"),
            },
          ]
        );
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

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-base-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-gray-600 dark:text-gray-400">
            Cargando información...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-base-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Progress Indicator */}
        <View className="px-6 pt-2">
          <ProgressIndicator
            currentStep={3}
            totalSteps={9}
            stepLabel="Información de Salud"
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
              Cuéntanos sobre tu salud
            </Text>
            <Text className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Esta información nos ayuda a adaptar tu plan de manera segura.
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Todos los campos son opcionales.
            </Text>
          </View>

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

          {/* Navigation Buttons */}
          <View className="my-6">
            <View className="flex-row gap-3">
              <View className="flex-1">
                <TouchableOpacity
                  onPress={handleBack}
                  disabled={saving}
                  className="flex-row items-center justify-center rounded-xl border-2 border-primary bg-white py-3.5 dark:border-primary dark:bg-gray-900"
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color="#1F024B"
                    className="mr-2"
                  />
                  <Text className="text-base font-semibold text-primary">
                    Atrás
                  </Text>
                </TouchableOpacity>
              </View>

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

          {/* Privacy message */}
          <View className="mb-8 flex-row items-center justify-center gap-2">
            <Ionicons name="lock-closed" size={16} className="text-gray-500" />
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Your data is encrypted and never shared
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
