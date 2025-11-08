import { Stack } from "expo-router";

/**
 * Onboarding Layout
 * Wraps all onboarding screens with a simple stack navigator
 */
export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent swipe back to force wizard flow
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="step-1"
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <Stack.Screen
        name="step-2"
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <Stack.Screen
        name="step-3"
        options={{
          headerShown: false,
          title: "",
        }}
      />
    </Stack>
  );
}
