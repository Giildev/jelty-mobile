import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

/**
 * Data & Privacy Screen
 * Placeholder for data export and account deletion
 */
export default function DataPrivacyScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center px-6">
      <View className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 items-center justify-center mb-6">
        <Ionicons
          name="shield-outline"
          size={40}
          className="text-amber-600 dark:text-amber-400"
        />
      </View>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Data & Privacy
      </Text>
      <Text className="text-base text-gray-600 dark:text-gray-400 mb-8 text-center">
        Export your personal data, review privacy settings, or permanently delete your account.
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-500 mb-8 text-center">
        This feature is coming soon!
      </Text>
      <Button onPress={() => router.back()} variant="secondary">
        Go Back
      </Button>
    </View>
  );
}
