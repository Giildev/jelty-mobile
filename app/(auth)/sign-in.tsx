import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginSchema, LoginFormData } from "@/utils/validation/schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/**
 * Pantalla de inicio de sesión
 */
export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signOut, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("User is already signed in, redirecting to home");
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn]);

  const onSignInPress = async (data: LoginFormData) => {
    if (!isLoaded || !signIn) return;

    setLoading(true);
    setErrorMessage("");

    try {
      console.log("Attempting sign in with:", data.email);

      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      console.log("Sign in response:", completeSignIn.status);
      console.log("Session ID:", completeSignIn.createdSessionId);

      // Check if sign-in was successful
      if (completeSignIn.status === "complete" && completeSignIn.createdSessionId) {
        console.log("Sign in successful, setting active session");
        await setActive({ session: completeSignIn.createdSessionId });
        console.log("Session activated successfully");

        // Force navigation to home after successful sign-in
        console.log("Redirecting to home");
        router.replace("/(tabs)");
      } else if (completeSignIn.status === "needs_identifier") {
        setErrorMessage("Se requiere verificación adicional");
      } else if (completeSignIn.status === "needs_first_factor") {
        setErrorMessage("Se requiere autenticación de dos factores");
      } else {
        console.log("Unexpected status:", completeSignIn.status);
        setErrorMessage("Error al iniciar sesión. Por favor, intenta nuevamente.");
      }
    } catch (err: unknown) {
      console.log("Sign in error:", err);
      console.log("Error details:", JSON.stringify(err, null, 2));

      const error = err as {
        errors?: Array<{
          message: string;
          code: string;
          longMessage?: string;
        }>
      };

      // Show error message from Clerk
      const errorCode = error.errors?.[0]?.code;
      const errorMsg = error.errors?.[0]?.message;

      console.log("Error code:", errorCode);
      console.log("Error message:", errorMsg);

      if (errorCode === "session_exists") {
        // If session exists, sign out and ask user to try again
        try {
          await signOut();
          setErrorMessage("Se cerró la sesión anterior. Por favor, intenta nuevamente.");
        } catch {
          setErrorMessage("Ya existe una sesión activa. Por favor, recarga la app.");
        }
      } else if (errorMsg) {
        // Show the message from Clerk directly
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage("Error al iniciar sesión. Por favor, intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-6"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-md self-center">
            {/* Title */}
            <Text className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Sign In
            </Text>
            <Text className="mb-8 text-center text-base text-gray-600 dark:text-gray-400">
              Welcome back, log in to continue.
            </Text>

            {/* Error Message Area */}
            {errorMessage !== "" && (
              <View className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                <Text className="text-center text-sm text-red-600 dark:text-red-400">
                  {errorMessage}
                </Text>
              </View>
            )}

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              )}
            />

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
            />

            {/* Forgot Password Link */}
            <View className="mb-6 items-end">
              <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Forgot password?
                </Text>
              </Pressable>
            </View>

            {/* Sign In Button */}
            <Button
              onPress={handleSubmit(onSignInPress)}
              loading={loading}
              variant="brand-primary"
              className="mb-6"
            >
              Sign In
            </Button>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
              </Text>
              <Link href="/(auth)/sign-up" asChild>
                <Pressable>
                  <Text className="font-semibold text-blue-500">Sign Up</Text>
                </Pressable>
              </Link>
            </View>

            {/* Terms & Privacy Links */}
            <View className="mt-8 flex-row justify-center gap-2">
              <Link href="/(auth)/terms" asChild>
                <Pressable>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Terms
                  </Text>
                </Pressable>
              </Link>
              <Text className="text-sm text-gray-400">•</Text>
              <Link href="/(auth)/privacy" asChild>
                <Pressable>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Privacy
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
