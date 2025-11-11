import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface EditScreenLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  loading?: boolean;
}

/**
 * Layout for profile edit screens
 * Shows title, description, and handles skeleton loading
 */
export function EditScreenLayout({
  title,
  description,
  children,
  loading = false,
}: EditScreenLayoutProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-white dark:bg-gray-900"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="mb-6 px-6 pt-6">
            <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              {description}
            </Text>
          </View>

          {/* Content or Skeleton Loader */}
          {loading ? (
            // Skeleton Loader (same as onboarding)
            <View className="px-6">
              <View className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <View key={i} className="mb-4">
                    {/* Label skeleton */}
                    <View className="mb-2 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                    {/* Input skeleton */}
                    <View className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            children
          )}

          {/* Privacy Message */}
          <View className="mt-6 px-6">
            <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
              Your data is encrypted and secure
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
