import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ProgressIndicator } from "./ProgressIndicator";

interface OnboardingStepLayoutProps {
  // Step info
  currentStep: number;
  totalSteps: number;
  stepLabel: string;

  // Header
  title: string;
  description: string;

  // Content
  children: React.ReactNode;

  // Buttons
  onBack?: () => void; // undefined = no mostrar botón Back (paso 1)
  onNext: () => void;
  nextButtonText?: string; // default: "Next", paso 9: "Finalizar"
  nextButtonColor?: string; // Custom color for next button (e.g., "#0CDA51" for success)

  // Estados
  loading?: boolean;
  saving?: boolean;
}

export function OnboardingStepLayout({
  currentStep,
  totalSteps,
  stepLabel,
  title,
  description,
  children,
  onBack,
  onNext,
  nextButtonText = "Next",
  nextButtonColor,
  loading = false,
  saving = false,
}: OnboardingStepLayoutProps) {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  // Auth guard - Redirect to sign-in if no user
  useEffect(() => {
    if (isLoaded && !userId) {
      console.log("No authenticated user, redirecting to sign-in");
      router.replace("/(auth)/sign-in");
    }
  }, [isLoaded, userId, router]);

  // Don't render anything until auth is loaded
  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </SafeAreaView>
    );
  }

  // Don't render if no user (will redirect)
  if (!userId) {
    return null;
  }

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-white dark:bg-gray-900"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Progress Indicator - Outside ScrollView */}
        <View className="px-6 pt-2">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            label={stepLabel}
          />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="mb-6 px-6">
            <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              {description}
            </Text>
          </View>

          {/* Form Content or Skeleton Loader */}
          {loading ? (
            // Skeleton Loader
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

          {/* Action Buttons */}
          <View className="mt-8 px-6">
            {onBack ? (
              // Two buttons: Back + Next
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={onBack}
                  disabled={saving || loading}
                  className={`flex-1 items-center rounded-xl border-2 border-gray-300 bg-white py-4 dark:border-gray-600 dark:bg-gray-800 ${
                    saving || loading ? "opacity-50" : ""
                  }`}
                  activeOpacity={0.7}
                >
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    Back
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onNext}
                  disabled={saving || loading}
                  className={`flex-1 items-center rounded-xl py-4 ${
                    nextButtonColor ? "" : "bg-primary"
                  } ${saving || loading ? "opacity-50" : ""}`}
                  style={nextButtonColor ? { backgroundColor: nextButtonColor } : undefined}
                  activeOpacity={0.7}
                >
                  {saving ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-base font-semibold text-white">
                      {nextButtonText}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              // Single button: Next only (paso 1)
              <TouchableOpacity
                onPress={onNext}
                disabled={saving || loading}
                className={`items-center rounded-xl py-4 ${
                  nextButtonColor ? "" : "bg-primary"
                } ${saving || loading ? "opacity-50" : ""}`}
                style={nextButtonColor ? { backgroundColor: nextButtonColor } : undefined}
                activeOpacity={0.7}
              >
                {saving ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-base font-semibold text-white">
                    {nextButtonText}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

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
