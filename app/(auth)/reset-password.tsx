import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/utils/validation/schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/**
 * Pantalla de reseteo de contraseña con código de verificación
 */
export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onResetPassword = async (data: ResetPasswordFormData) => {
    if (!isLoaded || !signIn) return;

    setLoading(true);
    setStatusMessage("");
    setIsError(false);

    try {
      console.log("Starting password reset with code:", data.code);

      // Step 1: Attempt first factor with reset code and new password
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });

      console.log("Reset result:", result.status);

      // Step 2: If successful, set the session as active
      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        console.log("Password reset successful, redirecting...");

        // Show success message before redirecting
        setStatusMessage("Contraseña actualizada exitosamente");
        setIsError(false);

        // Redirect to home after a brief delay
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 1500);
      } else {
        setIsError(true);
        setStatusMessage("Error al completar el reset de contraseña");
      }
    } catch (err: unknown) {
      console.log("Reset password error:", err);
      const error = err as { errors?: Array<{ message: string; code: string }> };

      setIsError(true);
      if (error.errors?.[0]?.code === "form_code_incorrect") {
        setStatusMessage("Código de verificación incorrecto");
      } else if (error.errors?.[0]?.code === "form_password_pwned") {
        setStatusMessage(
          "Esta contraseña es muy común. Por favor, elige otra más segura."
        );
      } else if (error.errors?.[0]?.message) {
        setStatusMessage(error.errors[0].message);
      } else {
        setStatusMessage("Error al resetear la contraseña");
      }
    } finally {
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    if (!isLoaded || !canResend || !email) return;

    setResending(true);
    setStatusMessage("");
    setIsError(false);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setStatusMessage("Código reenviado exitosamente");
      setIsError(false);

      // Start cooldown timer (60 seconds)
      setCanResend(false);
      setResendTimer(60);

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string }> };
      setStatusMessage(
        error.errors?.[0]?.message || "Error al reenviar el código"
      );
      setIsError(true);
    } finally {
      setResending(false);
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
          contentContainerClassName="flex-grow px-6 py-4"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-md self-center">
            {/* Back Button */}
            <Pressable
              onPress={() => router.back()}
              className="mb-6 w-10 items-start active:opacity-60"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                className="text-gray-900 dark:text-white"
              />
            </Pressable>

            {/* Title */}
            <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Reset your password.
            </Text>
            <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">
              Enter the code we sent to your email, then create your new
              password.
            </Text>

            {/* Verification Code Input */}
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Verification code"
                  placeholder="Enter 6-digit code"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.code?.message}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoCapitalize="none"
                />
              )}
            />

            {/* Resend Code Link */}
            <View className="mb-6 items-end">
              <Pressable
                onPress={onResendCode}
                disabled={!canResend || resending}
                className="active:opacity-60"
              >
                <Text
                  className={`text-sm underline ${
                    !canResend || resending
                      ? "text-gray-400 dark:text-gray-600"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {resending
                    ? "Reenviando..."
                    : canResend
                      ? "Resend code"
                      : `Resend code (${resendTimer}s)`}
                </Text>
              </Pressable>
            </View>

            {/* Separator */}
            <View className="mb-6 h-px bg-gray-200 dark:bg-gray-700" />

            {/* New Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-4">
                  <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    New password
                  </Text>
                  <View className="relative">
                    <Input
                      placeholder="Enter new password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.password?.message}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      className="mb-0"
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 active:opacity-60"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        className="text-gray-500"
                      />
                    </Pressable>
                  </View>
                </View>
              )}
            />

            {/* Confirm New Password Input */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-2">
                  <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm new password
                  </Text>
                  <View className="relative">
                    <Input
                      placeholder="Confirm new password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.confirmPassword?.message}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      className="mb-0"
                    />
                    <Pressable
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-4 active:opacity-60"
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={24}
                        className="text-gray-500"
                      />
                    </Pressable>
                  </View>
                </View>
              )}
            />

            {/* Helper Text */}
            <Text className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Minimum 8 characters.
            </Text>

            {/* Save New Password Button */}
            <Button
              onPress={handleSubmit(onResetPassword)}
              loading={loading}
              variant="brand-primary"
              className="mb-4"
            >
              Save new password
            </Button>

            {/* Status Message Area */}
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

            {/* Terms & Privacy Footer */}
            <View className="mt-4 flex-row justify-center">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                By continuing, you agree to our{" "}
              </Text>
            </View>
            <View className="flex-row justify-center gap-2">
              <Pressable>
                <Text className="text-sm text-blue-500 underline">
                  Terms of Service
                </Text>
              </Pressable>
              <Text className="text-sm text-gray-500">and</Text>
              <Pressable>
                <Text className="text-sm text-blue-500 underline">
                  Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
