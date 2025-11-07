import { View, Text } from "react-native";
import { router } from "expo-router";
import { useAuth, useUser, useClerk } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

/**
 * Pantalla principal / Home
 */
export default function HomeScreen() {
  const { user } = useUser();
  const clerk = useClerk();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    try {
      // Sign out from Clerk
      await clerk.signOut();

      // Navigate to sign-in screen
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        {/* Welcome Message */}
        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome!
          </Text>
          {user?.primaryEmailAddress && (
            <Text className="text-base text-gray-600 dark:text-gray-400">
              {user.primaryEmailAddress.emailAddress}
            </Text>
          )}
        </View>

        {/* Sign Out Button */}
        <Button
          onPress={handleSignOut}
          loading={loading}
          variant="danger"
          className="w-full max-w-sm"
        >
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
}
