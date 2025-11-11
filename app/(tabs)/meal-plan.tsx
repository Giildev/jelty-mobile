import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * Meal Plan Screen (Placeholder)
 * This is a temporary placeholder for the meal plan feature
 */
export default function MealPlanScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        {/* Icon */}
        <View className="mb-6">
          <FontAwesome name="cutlery" size={64} color="#1F024B" />
        </View>

        {/* Title */}
        <Text className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Meal Plan
        </Text>

        {/* Description */}
        <Text className="text-center text-base text-gray-600 dark:text-gray-400">
          Your personalized meal planning will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
}
