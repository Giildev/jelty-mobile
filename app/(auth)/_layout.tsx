import { Stack } from "expo-router";

/**
 * Layout para rutas de autenticación (deshabilitado temporalmente)
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
