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
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  PersonalInfoFormData,
  Gender,
  MeasurementSystem,
  ActivityLevel,
} from "@/utils/validation/onboardingSchemas";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { DatePicker } from "@/components/onboarding/DatePicker";
import { GenderSelector } from "@/components/onboarding/GenderSelector";
import { MeasurementToggle } from "@/components/onboarding/MeasurementToggle";
import { ActivityLevelDropdown } from "@/components/onboarding/ActivityLevelDropdown";
import { NumberInput } from "@/components/onboarding/NumberInput";
import { CountryPicker } from "react-native-country-codes-picker";

// Services
import { saveOnboardingStep1 } from "@/services/supabase/onboarding";
import { getUserByClerkId, getUserBySupabaseId } from "@/services/supabase/users";
import { useUserStore } from "@/store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/services/supabase/client";

/**
 * Onboarding Step 1: Personal Information
 * Collects user's basic and physical information
 */
export default function OnboardingStep1Screen() {
  const router = useRouter();
  const { userId } = useAuth();
  const { user: clerkUser } = useUser();
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const [loading, setLoading] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [measurementSystem, setMeasurementSystem] =
    useState<MeasurementSystem>("metric");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      birth_date: "",
      gender: "male" as Gender,
      measurement_system: "metric",
      height_cm: 175,
      weight_kg: 70,
      bodyfat_percentage: undefined,
      activity_level: "moderately_active" as ActivityLevel,
      country: "",
      country_code: "",
      city: "",
      address: "",
      zip_code: "",
    },
  });

  // Load user data from database on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      let userData = null;
      let supabaseUserId = user?.supabaseUserId;

      // Si no está en Zustand, intentar obtenerlo de AsyncStorage
      if (!supabaseUserId) {
        const storedId = await AsyncStorage.getItem("supabase_user_id");
        if (storedId) {
          console.log("UUID recuperado de AsyncStorage:", storedId);
          supabaseUserId = storedId;
          // Actualizar Zustand con el UUID recuperado
          updateUser({ supabaseUserId: storedId });
        }
      }

      // Intentar con el UUID de Supabase
      if (supabaseUserId) {
        console.log("Cargando datos con Supabase UUID:", supabaseUserId);
        userData = await getUserBySupabaseId(supabaseUserId);
      }

      // Fallback: usar Clerk ID si el UUID no funcionó
      if (!userData && userId) {
        console.log("Fallback: Cargando datos con Clerk ID:", userId);
        userData = await getUserByClerkId(userId);

        // Si encontramos el usuario, guardar el UUID en Zustand y AsyncStorage
        if (userData) {
          const newUuid = userData.user.id;
          updateUser({ supabaseUserId: newUuid });
          await AsyncStorage.setItem("supabase_user_id", newUuid);
        }
      }

      if (!userData) {
        console.error("No se encontró el usuario en Supabase");
        console.error("Intentos realizados:", {
          supabaseUUID: supabaseUserId,
          clerkId: userId,
        });
        return;
      }

      const { user: dbUser, profile } = userData;

      // Pre-poblar campos con datos existentes desde la base de datos
      setValue("email", dbUser.email);
      setValue("phone", profile.phone || "");
      setValue("country", profile.country || "");
      setValue("country_code", profile.country_code || "");
      setValue("first_name", profile.first_name || "");
      setValue("last_name", profile.last_name || "");
      setValue("city", profile.city || "");
      setValue("address", profile.address || "");
      setValue("zip_code", profile.zip_code || "");

      // Birth date - convert from ISO to dd/mm/yyyy format
      if (profile.birth_date) {
        const isoDate = new Date(profile.birth_date);
        const day = isoDate.getDate().toString().padStart(2, "0");
        const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
        const year = isoDate.getFullYear();
        setValue("birth_date", `${day}/${month}/${year}`);
      }

      // Gender
      if (profile.gender) {
        setValue("gender", profile.gender as Gender);
      }

      // Physical measurements
      if (profile.height_cm) {
        setValue("height_cm", profile.height_cm);
      }
      if (profile.weight_kg) {
        setValue("weight_kg", profile.weight_kg);
      }
      if (profile.bodyfat_percentage) {
        setValue("bodyfat_percentage", profile.bodyfat_percentage);
      }

      // Activity level
      if (profile.activity_level) {
        setValue("activity_level", profile.activity_level as ActivityLevel);
      }

      // Measurement system
      if (profile.measurement_system) {
        setMeasurementSystem(profile.measurement_system as MeasurementSystem);
        setValue(
          "measurement_system",
          profile.measurement_system as MeasurementSystem
        );
      }

      console.log("Datos cargados desde BD exitosamente:", {
        email: dbUser.email,
        phone: profile.phone,
        country: profile.country,
        birth_date: profile.birth_date,
        height_cm: profile.height_cm,
        weight_kg: profile.weight_kg,
        supabaseUserId: dbUser.id,
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const onSubmit = async (data: PersonalInfoFormData) => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario");
      return;
    }

    setLoading(true);

    try {
      // Convert date format from dd/mm/yyyy to ISO
      const [day, month, year] = data.birth_date.split("/");
      const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

      // Calculate age
      const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      // Save to database
      const success = await saveOnboardingStep1(userId, {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        birth_date: isoDate,
        gender: data.gender,
        height_cm: data.height_cm,
        weight_kg: data.weight_kg,
        bodyfat_percentage: data.bodyfat_percentage ?? undefined,
        measurement_system: data.measurement_system,
        activity_level: data.activity_level,
        country: data.country,
        country_code: data.country_code,
        city: data.city,
        address: data.address,
        zip_code: data.zip_code,
      });

      if (success) {
        // Update Zustand store
        updateUser({
          firstName: data.first_name,
          lastName: data.last_name,
          birthDate: isoDate,
          gender: data.gender,
          heightCm: data.height_cm,
          weightKg: data.weight_kg,
          bodyfatPercentage: data.bodyfat_percentage ?? undefined,
          measurementSystem: data.measurement_system,
          activityLevel: data.activity_level,
          city: data.city,
          address: data.address,
          zipCode: data.zip_code,
        });

        // Navigate to step 2
        router.push("/(onboarding)/step-2");
      } else {
        Alert.alert("Error", "No se pudo guardar la información");
      }
    } catch (error) {
      console.error("Error saving onboarding step 1:", error);
      Alert.alert("Error", "Ocurrió un error al guardar la información");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-base-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Progress Indicator - EN LA PARTE MÁS ALTA */}
        <View className="px-6 pt-2">
          <ProgressIndicator
            currentStep={1}
            totalSteps={9}
            stepLabel="Personal Information"
          />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pb-8"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* Title and Description */}
          <View className="mb-6">
            <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Personal Information
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              Let's start with your basic details. This information helps us
              personalize your fitness plan and track your progress effectively.
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* First Name */}
            <Controller
              control={control}
              name="first_name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="First Name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.first_name?.message}
                  placeholder="Enter your first name"
                />
              )}
            />

            {/* Last Name */}
            <Controller
              control={control}
              name="last_name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Last Name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.last_name?.message}
                  placeholder="Enter your last name"
                />
              )}
            />

            {/* Email (readonly) */}
            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <Input
                  label="Email"
                  value={value}
                  disabled={true}
                  placeholder="user@example.com"
                />
              )}
            />

            {/* Phone Number (readonly) */}
            <Controller
              control={control}
              name="phone"
              render={({ field: { value } }) => (
                <Input
                  label="Phone Number"
                  value={value}
                  disabled={true}
                  placeholder="+1 (555) 000-0000"
                />
              )}
            />

            {/* Birth Date */}
            <Controller
              control={control}
              name="birth_date"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="Birth Date"
                  value={value}
                  onChange={onChange}
                  error={errors.birth_date?.message}
                />
              )}
            />

            {/* Gender */}
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <GenderSelector
                  label="Gender"
                  value={value as Gender}
                  onChange={onChange}
                  error={errors.gender?.message}
                />
              )}
            />

            {/* Divider */}
            <View className="my-4">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Physical Information
              </Text>
            </View>

            {/* Measurement System */}
            <Controller
              control={control}
              name="measurement_system"
              render={({ field: { onChange, value } }) => (
                <MeasurementToggle
                  label="Measurement System"
                  value={value}
                  onChange={(system) => {
                    onChange(system);
                    setMeasurementSystem(system);
                  }}
                />
              )}
            />

            {/* Height */}
            <Controller
              control={control}
              name="height_cm"
              render={({ field: { onChange, value } }) => (
                <NumberInput
                  label="Height"
                  value={value?.toString() || ""}
                  onChange={(val) => onChange(parseFloat(val) || 0)}
                  measurementSystem={measurementSystem}
                  type="height"
                  error={errors.height_cm?.message}
                />
              )}
            />

            {/* Weight */}
            <Controller
              control={control}
              name="weight_kg"
              render={({ field: { onChange, value } }) => (
                <NumberInput
                  label="Weight"
                  value={value?.toString() || ""}
                  onChange={(val) => onChange(parseFloat(val) || 0)}
                  measurementSystem={measurementSystem}
                  type="weight"
                  error={errors.weight_kg?.message}
                />
              )}
            />

            {/* Body Fat % (Optional) */}
            <Controller
              control={control}
              name="bodyfat_percentage"
              render={({ field: { onChange, value } }) => (
                <NumberInput
                  label="Body Fat %"
                  value={value?.toString() || ""}
                  onChange={(val) => onChange(parseFloat(val) || undefined)}
                  measurementSystem={measurementSystem}
                  type="bodyfat"
                  error={errors.bodyfat_percentage?.message}
                  optional
                />
              )}
            />

            {/* Activity Level */}
            <Controller
              control={control}
              name="activity_level"
              render={({ field: { onChange, value } }) => (
                <ActivityLevelDropdown
                  label="Current Activity Level"
                  value={value as ActivityLevel}
                  onChange={onChange}
                  error={errors.activity_level?.message}
                />
              )}
            />

            {/* Divider */}
            <View className="my-4">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Location
              </Text>
            </View>

            {/* Country */}
            <Controller
              control={control}
              name="country"
              render={({ field: { value } }) => (
                <View>
                  <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Country
                  </Text>
                  <View className="rounded-xl border border-gray-300 bg-white px-4 py-3.5">
                    <Text className="text-base text-gray-500">
                      {value || "Select your country"}
                    </Text>
                  </View>
                  {errors.country && (
                    <Text className="mt-1 text-sm text-error">
                      {errors.country.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* City */}
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="City"
                  value={value}
                  onChangeText={onChange}
                  error={errors.city?.message}
                  placeholder="Enter your city"
                />
              )}
            />

            {/* Address */}
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Address"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.message}
                  placeholder="Street address"
                />
              )}
            />

            {/* ZIP Code */}
            <Controller
              control={control}
              name="zip_code"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="ZIP Code"
                  value={value}
                  onChangeText={onChange}
                  error={errors.zip_code?.message}
                  placeholder="12345"
                />
              )}
            />
          </View>

          {/* Next Button */}
          <View className="my-6">
            <Button
              onPress={handleSubmit(onSubmit)}
              variant="brand-primary"
              size="large"
              loading={loading}
              disabled={loading}
            >
              Siguiente
            </Button>
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

      {/* Country Picker Modal */}
      <CountryPicker
        show={showCountryPicker}
        pickerButtonOnPress={(item) => {
          setValue("country", item.name.en);
          setValue("country_code", item.dial_code);
          setShowCountryPicker(false);
        }}
        onBackdropPress={() => setShowCountryPicker(false)}
        style={{
          modal: {
            height: 500,
          },
        }}
      />
    </SafeAreaView>
  );
}
