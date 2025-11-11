import { View, Text, Alert } from "react-native";
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
import { Button } from "@/components/ui/Button";
import { EditScreenLayout } from "@/components/profile/EditScreenLayout";
import { DatePicker } from "@/components/onboarding/DatePicker";
import { GenderSelector } from "@/components/onboarding/GenderSelector";
import { MeasurementToggle } from "@/components/onboarding/MeasurementToggle";
import { ActivityLevelDropdown } from "@/components/onboarding/ActivityLevelDropdown";
import { NumberInput } from "@/components/onboarding/NumberInput";

// Services
import { saveOnboardingStep1 } from "@/services/supabase/onboarding";
import { getUserByClerkId } from "@/services/supabase/users";
import { useUserStore } from "@/store/userStore";

/**
 * Edit Step 1: Personal Information
 * Allows editing of personal information from profile screen
 */
export default function EditStep1Screen() {
  const router = useRouter();
  const { userId } = useAuth();
  const { user: clerkUser } = useUser();
  const setCachedProfile = useUserStore((state) => state.setCachedProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      height_cm: undefined,
      weight_kg: undefined,
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
    if (!userId) return;

    try {
      setLoading(true);
      const userData = await getUserByClerkId(userId);

      if (userData && userData.profile) {
        const profile = userData.profile;

        // Set form values from loaded data
        setValue("first_name", profile.first_name || "");
        setValue("last_name", profile.last_name || "");
        setValue("email", clerkUser?.primaryEmailAddress?.emailAddress || "");
        setValue("phone", profile.phone || "");
        setValue("birth_date", profile.birth_date || "");
        setValue("gender", (profile.gender as Gender) || "male");
        setValue(
          "measurement_system",
          (profile.measurement_system as MeasurementSystem) || "metric"
        );
        const heightValue = profile.height_cm ? parseFloat(profile.height_cm) : undefined;
        const weightValue = profile.weight_kg ? parseFloat(profile.weight_kg) : undefined;
        const bodyfatValue = profile.bodyfat_percentage ? parseFloat(profile.bodyfat_percentage) : undefined;

        if (heightValue !== undefined && !isNaN(heightValue)) {
          setValue("height_cm", heightValue);
        }
        if (weightValue !== undefined && !isNaN(weightValue)) {
          setValue("weight_kg", weightValue);
        }
        if (bodyfatValue !== undefined && !isNaN(bodyfatValue)) {
          setValue("bodyfat_percentage", bodyfatValue);
        }
        setValue("activity_level", (profile.activity_level as ActivityLevel) || "moderately_active");
        setValue("country", profile.country || "");
        setValue("country_code", profile.country_code || "");
        setValue("city", profile.city || "");
        setValue("address", profile.address || "");
        setValue("zip_code", profile.zip_code || "");

        setMeasurementSystem(
          (profile.measurement_system as MeasurementSystem) || "metric"
        );
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PersonalInfoFormData) => {
    if (!userId) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    try {
      setSaving(true);

      // Save to database
      const success = await saveOnboardingStep1(userId, data);

      if (success) {
        // Update cache with new data
        setCachedProfile({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          memberSince: clerkUser?.createdAt
            ? new Date(clerkUser.createdAt).toISOString()
            : null,
        });

        Alert.alert("Success", "Personal information updated successfully", [
          { text: "OK", onPress: () => router.push("/(tabs)/profile") },
        ]);
      } else {
        Alert.alert("Error", "Failed to update personal information");
      }
    } catch (error) {
      console.error("Error saving step 1:", error);
      Alert.alert("Error", "An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/(tabs)/profile");
  };

  return (
    <EditScreenLayout
      title="Personal Information"
      description="Update your personal information"
      loading={loading}
    >
      <View className="px-6">
        {/* Basic Information */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Basic Information
          </Text>

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

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input
                label="Email"
                value={value}
                editable={false}
                placeholder="your@email.com"
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Phone (Optional)"
                value={value}
                onChangeText={onChange}
                error={errors.phone?.message}
                placeholder="+1234567890"
                keyboardType="phone-pad"
              />
            )}
          />
        </View>

        {/* Personal Details */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Personal Details
          </Text>

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

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <GenderSelector
                value={value}
                onChange={onChange}
                error={errors.gender?.message}
              />
            )}
          />
        </View>

        {/* Measurement System */}
        <View className="mb-6">
          <Controller
            control={control}
            name="measurement_system"
            render={({ field: { onChange, value } }) => (
              <MeasurementToggle
                value={value}
                onChange={(newValue) => {
                  onChange(newValue);
                  setMeasurementSystem(newValue);
                }}
              />
            )}
          />
        </View>

        {/* Physical Information */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Physical Information
          </Text>

          <Controller
            control={control}
            name="height_cm"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Height"
                value={value?.toString() ?? ""}
                onChange={(text) => onChange(text ? parseFloat(text) : undefined)}
                error={errors.height_cm?.message}
                measurementSystem={measurementSystem}
                type="height"
              />
            )}
          />

          <Controller
            control={control}
            name="weight_kg"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Weight"
                value={value?.toString() ?? ""}
                onChange={(text) => onChange(text ? parseFloat(text) : undefined)}
                error={errors.weight_kg?.message}
                measurementSystem={measurementSystem}
                type="weight"
              />
            )}
          />

          <Controller
            control={control}
            name="bodyfat_percentage"
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label="Body Fat Percentage"
                value={value?.toString() ?? ""}
                onChange={(text) => onChange(text ? parseFloat(text) : undefined)}
                error={errors.bodyfat_percentage?.message}
                measurementSystem={measurementSystem}
                type="bodyfat"
                optional
              />
            )}
          />

          <Controller
            control={control}
            name="activity_level"
            render={({ field: { onChange, value } }) => (
              <ActivityLevelDropdown
                label="Activity Level"
                value={value}
                onChange={onChange}
                error={errors.activity_level?.message}
              />
            )}
          />
        </View>

        {/* Location */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Location (Optional)
          </Text>

          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Country"
                value={value}
                onChangeText={onChange}
                error={errors.country?.message}
                placeholder="United States"
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <Input
                label="City"
                value={value}
                onChangeText={onChange}
                error={errors.city?.message}
                placeholder="New York"
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Address"
                value={value}
                onChangeText={onChange}
                error={errors.address?.message}
                placeholder="123 Main St"
              />
            )}
          />

          <Controller
            control={control}
            name="zip_code"
            render={({ field: { onChange, value } }) => (
              <Input
                label="ZIP Code"
                value={value}
                onChangeText={onChange}
                error={errors.zip_code?.message}
                placeholder="10001"
                keyboardType="numeric"
              />
            )}
          />
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
