import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/utils/validation/schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/**
 * Pantalla de recuperación de contraseña
 */
export default function ForgotPasswordScreen() {
  const { signIn, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSendResetCode = async (data: ForgotPasswordFormData) => {
    if (!isLoaded) return;

    setLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      // Create a sign-in attempt with password reset strategy
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      });

      // Success - navigate to reset password screen with email
      setStatusMessage("Código enviado a tu email");
      setIsError(false);

      // Navigate after a brief delay to show success message
      setTimeout(() => {
        router.push({
          pathname: "/(auth)/reset-password",
          params: { email: data.email },
        });
      }, 1000);
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string; code: string }> };

      setIsError(true);
      if (error.errors?.[0]?.code === "form_identifier_not_found") {
        setStatusMessage("No existe una cuenta con este email");
      } else {
        setStatusMessage(
          error.errors?.[0]?.message || "Error al enviar el código"
        );
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
              Forgot password
            </Text>
            <Text className="mb-8 text-center text-base text-gray-600 dark:text-gray-400">
              Enter your email and we'll send you instructions to reset your
              password.
            </Text>

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="example@email.com"
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

            {/* Send Reset Link Button */}
            <Button
              onPress={handleSubmit(onSendResetCode)}
              loading={loading}
              variant="brand-primary"
              className="mb-4"
            >
              Send reset link
            </Button>

            {/* Status / Feedback Message */}
            {statusMessage !== "" && (
              <View
                className={`mb-4 rounded-lg p-4 ${
                  isError
                    ? "bg-red-50 dark:bg-red-900/20"
                    : "bg-green-50 dark:bg-green-900/20"
                }`}
              >
                <Text
                  className={`text-center text-sm ${
                    isError
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {statusMessage}
                </Text>
              </View>
            )}

            {/* Back to Sign In Link */}
            <Link href="/(auth)/sign-in" asChild>
              <Pressable className="mt-6 flex-row items-center justify-center">
                <Ionicons
                  name="arrow-back"
                  size={20}
                  className="text-gray-600 dark:text-gray-400"
                />
                <Text className="ml-2 text-gray-600 dark:text-gray-400">
                  Back to Sign In
                </Text>
              </Pressable>
            </Link>

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
