import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * Workout Screen (Placeholder)
 * This is a temporary placeholder for the workout feature
 */
export default function WorkoutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        {/* Icon */}
        <View className="mb-6">
          <FontAwesome name="heart" size={64} color="#1F024B" />
        </View>

        {/* Title */}
        <Text className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Workout
        </Text>

        {/* Description */}
        <Text className="text-center text-base text-gray-600 dark:text-gray-400">
          Your workout routines and exercises will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
}
