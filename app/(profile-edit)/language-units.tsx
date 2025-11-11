import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";

/**
 * Language & Units Screen
 * Placeholder for language and measurement system preferences
 */
export default function LanguageUnitsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center px-6">
      <View className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 items-center justify-center mb-6">
        <Ionicons
          name="globe-outline"
          size={40}
          className="text-purple-600 dark:text-purple-400"
        />
      </View>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Language & Units
      </Text>
      <Text className="text-base text-gray-600 dark:text-gray-400 mb-8 text-center">
        Change your language preferences and toggle between metric and imperial measurement systems.
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
