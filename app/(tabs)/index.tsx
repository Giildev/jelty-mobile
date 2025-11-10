import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth, useUser, useClerk } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { getUserByClerkId } from "@/services/supabase/users";
import { Ionicons } from "@expo/vector-icons";

/**
 * Home Screen
 * Displays personalized welcome message and sign-out functionality
 */
export default function HomeScreen() {
  const { userId } = useAuth();
  const { user } = useUser();
  const clerk = useClerk();
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserByClerkId(userId);

        if (userData?.profile) {
          const { first_name, last_name } = userData.profile;

          if (first_name) {
            setUserName(first_name);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      // Sign out from Clerk
      await clerk.signOut();

      // Navigate to sign-in screen
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
      setSigningOut(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        {loading ? (
          <ActivityIndicator size="large" color="#1F024B" />
        ) : (
          <>
            {/* Welcome Message */}
            <View className="mb-8 items-center">
              <View className="mb-4">
                <Ionicons name="fitness" size={64} color="#1F024B" />
              </View>
              <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Welcome{userName ? `, ${userName}` : ""}!
              </Text>
              {user?.primaryEmailAddress && (
                <Text className="text-base text-gray-600 dark:text-gray-400">
                  {user.primaryEmailAddress.emailAddress}
                </Text>
              )}
            </View>

            {/* Success Message */}
            <View className="mb-6 w-full max-w-sm rounded-xl bg-[#0CDA51]/10 px-4 py-3">
              <Text className="text-center text-sm text-[#0CDA51]">
                Your profile is complete! Ready to start your fitness journey.
              </Text>
            </View>

            {/* Sign Out Button */}
            <Button
              onPress={handleSignOut}
              loading={signingOut}
              variant="danger"
              className="w-full max-w-sm"
            >
              Sign Out
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
