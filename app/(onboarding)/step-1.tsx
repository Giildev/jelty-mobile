import {
  View,
  Text,
  Alert,
} from "react-native";
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

// Components
import { Input } from "@/components/ui/Input";
import { OnboardingStepLayout } from "@/components/onboarding/OnboardingStepLayout";
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

  const [loading, setLoading] = useState(true); // Start with true to show skeleton
  const [saving, setSaving] = useState(false);
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
    console.log("=== STEP 1: Starting loadUserData ===");
    console.log("Clerk userId:", userId);
    console.log("Clerk user email:", clerkUser?.primaryEmailAddress?.emailAddress);
    console.log("Zustand user:", user);

    try {
      let userData = null;
      let supabaseUserId = user?.supabaseUserId;

      console.log("Supabase userId from Zustand:", supabaseUserId);

      // Si no está en Zustand, intentar obtenerlo de AsyncStorage
      if (!supabaseUserId) {
        const storedId = await AsyncStorage.getItem("supabase_user_id");
        console.log("Supabase userId from AsyncStorage:", storedId);
        if (storedId) {
          supabaseUserId = storedId;
          updateUser({ supabaseUserId: storedId });
        }
      }

      // If we have supabase user ID, fetch from there
      if (supabaseUserId) {
        console.log("Fetching user by Supabase ID:", supabaseUserId);
        userData = await getUserBySupabaseId(supabaseUserId);
        console.log("getUserBySupabaseId result:", userData);
      }
      // Otherwise, fetch by Clerk ID
      else if (userId) {
        console.log("Fetching user by Clerk ID:", userId);
        userData = await getUserByClerkId(userId);
        console.log("getUserByClerkId result:", userData);
        const fetchedDbUser = userData?.dbUser || userData?.user;
        if (fetchedDbUser?.id) {
          console.log("Storing Supabase user ID:", fetchedDbUser.id);
          await AsyncStorage.setItem("supabase_user_id", fetchedDbUser.id);
          updateUser({ supabaseUserId: fetchedDbUser.id });
        }
      } else {
        console.log("❌ ERROR: No userId available (neither Clerk nor Supabase)");
      }

      // The API returns 'user' not 'dbUser', so we need to handle both cases
      const dbUser = userData?.dbUser || userData?.user;
      const profile = userData?.profile;

      if (!userData || !dbUser || !profile) {
        console.log("❌ No se encontró usuario en la base de datos");
        console.log("userData:", userData);
        console.log("dbUser:", dbUser);
        console.log("profile:", profile);
        return;
      }

      console.log("✅ User data loaded successfully from database");

      console.log("Starting to populate form fields...");
      console.log("dbUser email:", dbUser?.email);
      console.log("profile data:", {
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        phone: profile?.phone,
        birth_date: profile?.birth_date,
        height_cm: profile?.height_cm,
        weight_kg: profile?.weight_kg,
        country: profile?.country,
      });

      // Populate form with database values
      if (dbUser?.email) {
        console.log("Setting email:", dbUser.email);
        setValue("email", dbUser.email);
      }

      if (profile?.phone) {
        console.log("Setting phone:", profile.phone);
        setValue("phone", profile.phone);
      }

      if (profile?.first_name) {
        console.log("Setting first_name:", profile.first_name);
        setValue("first_name", profile.first_name);
      }

      if (profile?.last_name) {
        console.log("Setting last_name:", profile.last_name);
        setValue("last_name", profile.last_name);
      }

      if (profile?.birth_date) {
        const date = new Date(profile.birth_date);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        setValue("birth_date", `${day}/${month}/${year}`);
      }

      if (profile?.gender) {
        setValue("gender", profile.gender as Gender);
      }

      if (profile?.height_cm) {
        setValue("height_cm", profile.height_cm);
      }

      if (profile?.weight_kg) {
        setValue("weight_kg", profile.weight_kg);
      }

      if (profile?.bodyfat_percentage) {
        setValue("bodyfat_percentage", profile.bodyfat_percentage);
      }

      if (profile?.activity_level) {
        setValue("activity_level", profile.activity_level as ActivityLevel);
      }

      if (profile?.country) {
        setValue("country", profile.country);
      }

      if (profile?.country_code) {
        setValue("country_code", profile.country_code);
      }

      if (profile?.city) {
        setValue("city", profile.city);
      }

      if (profile?.address) {
        setValue("address", profile.address);
      }

      if (profile?.zip_code) {
        setValue("zip_code", profile.zip_code);
      }

      if (profile?.measurement_system) {
        setMeasurementSystem(profile.measurement_system as MeasurementSystem);
        setValue(
          "measurement_system",
          profile.measurement_system as MeasurementSystem
        );
      }

      console.log("✅ Todos los campos fueron populados correctamente");
      console.log("=== RESUMEN DE DATOS CARGADOS ===");
      console.log({
        email: dbUser?.email,
        phone: profile?.phone,
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        country: profile?.country,
        birth_date: profile?.birth_date,
        height_cm: profile?.height_cm,
        weight_kg: profile?.weight_kg,
        gender: profile?.gender,
        activity_level: profile?.activity_level,
        supabaseUserId: dbUser?.id,
      });
      console.log("=== FIN LOADUSERDATA ===");
    } catch (error) {
      console.error("❌ ERROR en loadUserData:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    } finally {
      // Always set loading to false after attempting to load data
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  const onSubmit = async (data: PersonalInfoFormData) => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el usuario");
      return;
    }

    setSaving(true);

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
        Alert.alert("Error", "Could not save information");
      }
    } catch (error) {
      console.error("Error saving onboarding step 1:", error);
      Alert.alert("Error", "An error occurred while saving information");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <OnboardingStepLayout
        currentStep={1}
        totalSteps={9}
        stepLabel="Personal Information"
        title="Personal Information"
        description="Let's start with your basic details. This information helps us personalize your fitness plan and track your progress effectively."
        onNext={handleSubmit(onSubmit)}
        loading={loading}
        saving={saving}
      >
        {/* Form Content */}
        <View className="space-y-4 px-6">
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
      </OnboardingStepLayout>

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
    </>
  );
}
