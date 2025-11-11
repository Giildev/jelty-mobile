import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

/**
 * Subscription & Billing Screen
 * Placeholder for subscription management
 */
export default function SubscriptionScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center px-6">
      <View className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mb-6">
        <Ionicons
          name="card-outline"
          size={40}
          className="text-blue-600 dark:text-blue-400"
        />
      </View>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Subscription & Billing
      </Text>
      <Text className="text-base text-gray-600 dark:text-gray-400 mb-8 text-center">
        Manage your subscription plan, view billing history, and update payment methods.
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
