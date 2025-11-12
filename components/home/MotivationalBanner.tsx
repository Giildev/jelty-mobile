import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MotivationalBannerProps {
  message: string;
  loading?: boolean;
}

/**
 * MotivationalBanner Component
 * Displays a daily motivational message at the top of the home screen
 *
 * Features:
 * - Shows motivational message from database
 * - Attractive gradient-style banner
 * - Icon for visual appeal
 * - Dark mode support
 * - Loading state
 */
export function MotivationalBanner({ message, loading = false }: MotivationalBannerProps) {
  if (loading) {
    return (
      <View className="mx-4 mb-4 rounded-2xl bg-gray-100 p-4 dark:bg-gray-800">
        <View className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      </View>
    );
  }

  return (
    <View
      className="mx-4 mb-4 rounded-2xl bg-white p-4 dark:bg-gray-800"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center justify-center gap-3">
        {/* Icon */}
        <View className="rounded-full bg-secondary/20 p-2 dark:bg-secondary/30">
          <Ionicons name="sparkles" size={20} color="#147BFE" />
        </View>

        {/* Message Text */}
        <View className="flex-1">
          <Text className="text-center text-sm font-semibold leading-5 text-gray-800 dark:text-gray-100">
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
}
