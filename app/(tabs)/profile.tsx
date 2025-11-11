import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { GenerateNewPlanModal } from "@/components/profile/GenerateNewPlanModal";
import { useProfileData } from "@/hooks/useProfileData";
import { useUserStore } from "@/store/userStore";

/**
 * User profile screen
 * Displays user info and links to edit each onboarding step
 */
export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const clearCachedProfile = useUserStore((state) => state.clearCachedProfile);
  const [showGeneratePlanModal, setShowGeneratePlanModal] = useState(false);

  // Load basic profile data (first name, last name only)
  const { data, loading } = useProfileData(
    user?.id,
    user?.primaryEmailAddress?.emailAddress,
    user?.createdAt ? Number(user.createdAt) : null
  );

  // Format member since date
  const memberSince = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  const handleSignOut = async () => {
    try {
      // Clear Zustand store (user and cached profile)
      clearUser();
      clearCachedProfile();
      // Sign out from Clerk
      await signOut();
      // Navigate to sign-in
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
      Alert.alert("Error", "Could not sign out. Please try again.");
    }
  };

  const handleGenerateNewPlan = () => {
    // TODO: Implement plan regeneration logic
    // For now, just close the modal
    console.log("Generate new plan confirmed");
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {/* Profile Header with skeleton while loading */}
        <ProfileHeader
          firstName={data.firstName}
          lastName={data.lastName}
          email={data.email}
          memberSince={memberSince}
          loading={loading}
        />

        {/* Generate New Plan Button */}
        <Pressable
          onPress={() => setShowGeneratePlanModal(true)}
          className="bg-blue-500 dark:bg-blue-600 rounded-xl py-4 mb-6 active:opacity-80"
        >
          <Text className="text-center text-base font-semibold text-white">
            Generate New Plan
          </Text>
        </Pressable>

        {/* Onboarding Steps Section */}
        <View className="mb-4">
          <ProfileCard
            icon="person-outline"
            title="Personal Information"
            subtitle="Basic profile and measurements"
            href="/(profile-edit)/edit-step-1"
          />
          <ProfileCard
            icon="trophy-outline"
            title="Goals & Body Metrics"
            subtitle="Fitness goals and body measurements"
            href="/(profile-edit)/edit-step-2"
          />
          <ProfileCard
            icon="medical-outline"
            title="Health Information"
            subtitle="Medical conditions and medications"
            href="/(profile-edit)/edit-step-3"
          />
          <ProfileCard
            icon="restaurant-outline"
            title="Dietary Preferences"
            subtitle="Food restrictions and preferences"
            href="/(profile-edit)/edit-step-4"
          />
          <ProfileCard
            icon="barbell-outline"
            title="Exercise Preferences"
            subtitle="Training style and equipment"
            href="/(profile-edit)/edit-step-5"
          />
          <ProfileCard
            icon="calendar-outline"
            title="Availability & Schedule"
            subtitle="Training days and time"
            href="/(profile-edit)/edit-step-6"
          />
          <ProfileCard
            icon="pizza-outline"
            title="Cooking Preferences"
            subtitle="Cooking skill and meal prep"
            href="/(profile-edit)/edit-step-7"
          />
          <ProfileCard
            icon="notifications-outline"
            title="Notifications"
            subtitle="Reminder times and channels"
            href="/(profile-edit)/edit-step-8"
          />
        </View>

        {/* Settings Section */}
        <View className="mb-4">
          <ProfileCard
            icon="card-outline"
            title="Subscription & Billing"
            subtitle="Plan type, payment status"
            href="/(profile-edit)/subscription"
          />
          <ProfileCard
            icon="globe-outline"
            title="Language & Units"
            subtitle="Metric/Imperial toggle"
            href="/(profile-edit)/language-units"
          />
          <ProfileCard
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="FAQs or contact link"
            href="/(profile-edit)/help"
          />
          <ProfileCard
            icon="shield-outline"
            title="Data & Privacy"
            subtitle="Export / delete account"
            href="/(profile-edit)/data-privacy"
          />
        </View>

        {/* Sign Out */}
        <View className="mb-4">
          <ProfileCard
            icon="log-out-outline"
            title="Sign Out"
            subtitle="Sign out of your account"
            onPress={handleSignOut}
            variant="danger"
          />
        </View>

        {/* Version Info */}
        <Text className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
          App version 0.1.0 · Your data is securely stored
        </Text>
      </ScrollView>

      {/* Generate New Plan Modal */}
      <GenerateNewPlanModal
        visible={showGeneratePlanModal}
        onClose={() => setShowGeneratePlanModal(false)}
        onConfirm={handleGenerateNewPlan}
      />
    </View>
  );
}
