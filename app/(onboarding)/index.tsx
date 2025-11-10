import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByClerkId } from "@/services/supabase/users";
import { useUserStore } from "@/store/userStore";

/**
 * Onboarding Index - Loading screen
 * Waits for user to be created in Supabase before entering Step 1
 * This prevents race conditions where Step 1 loads before user exists in DB
 */
export default function OnboardingIndexScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const updateUser = useUserStore((state) => state.updateUser);
  const [status, setStatus] = useState<string>("Initializing...");

  useEffect(() => {
    initializeOnboarding();
  }, []);

  const initializeOnboarding = async () => {
    try {
      if (!userId) {
        setStatus("Waiting for authentication...");
        // Wait a bit and retry
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!userId) {
          console.error("No userId found, redirecting to sign-in");
          router.replace("/(auth)/sign-in");
          return;
        }
      }

      setStatus("Setting up your profile...");
      console.log("[OnboardingIndex] Clerk userId:", userId);

      // Check if we already have the Supabase user ID in AsyncStorage
      let supabaseUserId = await AsyncStorage.getItem("supabase_user_id");
      console.log("[OnboardingIndex] Supabase userId from AsyncStorage:", supabaseUserId);

      // If we have the ID in storage, this is a returning user - go directly to step 1
      if (supabaseUserId) {
        console.log("[OnboardingIndex] Returning user, going directly to Step 1");
        updateUser({ supabaseUserId });
        router.replace("/(onboarding)/step-1");
        return;
      }

      // New user: need to wait for DB creation
      setStatus("Creating your account...");
      console.log("[OnboardingIndex] New user, waiting for DB creation");

      // Retry logic: try up to 5 times with 1 second delay
      let retries = 5;
      let userData = null;

      while (retries > 0 && !userData) {
        console.log(`[OnboardingIndex] Attempt ${6 - retries}/5 to fetch user from DB`);
        userData = await getUserByClerkId(userId);

        if (userData) {
          supabaseUserId = userData.user.id;
          console.log("[OnboardingIndex] Found user in DB:", supabaseUserId);

          // Save to AsyncStorage for future use
          await AsyncStorage.setItem("supabase_user_id", supabaseUserId);

          // Update Zustand store
          updateUser({ supabaseUserId });
          break;
        }

        // If not found, wait and retry
        retries--;
        if (retries > 0) {
          console.log(`[OnboardingIndex] User not found yet, waiting 1s before retry...`);
          setStatus(`Preparing your profile... (${6 - retries}/5)`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // If still no user after all retries, show error
      if (!supabaseUserId) {
        console.error("[OnboardingIndex] Failed to get user after 5 retries");
        setStatus("Error: Could not load your profile. Please try signing in again.");
        await new Promise(resolve => setTimeout(resolve, 3000));
        router.replace("/(auth)/sign-in");
        return;
      }

      // Success! Navigate to Step 1
      setStatus("Ready! Loading onboarding...");
      console.log("[OnboardingIndex] ✅ Ready to start onboarding with userId:", supabaseUserId);

      // Small delay to show success message
      await new Promise(resolve => setTimeout(resolve, 500));

      router.replace("/(onboarding)/step-1");
    } catch (error) {
      console.error("[OnboardingIndex] Error initializing onboarding:", error);
      setStatus("Error loading profile. Please try again.");
      await new Promise(resolve => setTimeout(resolve, 3000));
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 px-6">
      <ActivityIndicator size="large" color="#FF6B35" />
      <Text className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
        {status}
      </Text>
      <Text className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        This will only take a moment
      </Text>
    </View>
  );
}
