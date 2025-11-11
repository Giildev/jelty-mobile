import { Stack } from "expo-router";

/**
 * Profile Edit Layout
 * Wraps all profile edit screens with a stack navigator
 * Allows users to navigate back and edit individual onboarding steps
 */
export default function ProfileEditLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
        presentation: "card",
      }}
    >
      <Stack.Screen
        name="edit-step-1"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-step-2"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-step-3"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-step-4"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-step-5"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-step-6"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-step-7"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-step-8"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="subscription"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="language-units"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="data-privacy"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
