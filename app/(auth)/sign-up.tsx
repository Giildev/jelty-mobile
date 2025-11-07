import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/utils/validation/schemas";
import { Button } from "@/components/ui/Button";
import { CountryCodePicker } from "@/components/ui/CountryCodePicker";
import { VerifyEmailModal } from "@/components/auth/VerifyEmailModal";

/**
 * Pantalla de registro con formulario completo y verificación de email
 */
export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      phone: "",
      country: "",
      countryCode: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (!isLoaded) return;

    setLoading(true);
    setSignUpError(null);

    try {
      // Paso 1: Crear el usuario en Clerk
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Paso 2: Solicitar envío de código de verificación
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Paso 3: Guardar email y mostrar modal de verificación
      setUserEmail(data.email);
      setShowVerifyModal(true);
      setLoading(false);
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string }> };
      setSignUpError(error.errors?.[0]?.message || "Error al crear la cuenta");
      setLoading(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (!isLoaded) return;

    try {
      // Intentar verificar el código
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      // Si la verificación es exitosa, activar la sesión
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setShowVerifyModal(false);
        router.replace("/(tabs)");
      } else {
        // Si el status no es complete, lanzar error
        throw new Error("Verification incomplete");
      }
    } catch (err: unknown) {
      // Re-lanzar el error para que el modal lo maneje
      throw err;
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;

    try {
      // Reenviar código de verificación
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err: unknown) {
      throw err;
    }
  };

  const handleCloseModal = () => {
    setShowVerifyModal(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-base-white dark:bg-base-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 py-8">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                Create Account
              </Text>
              <Text className="mt-2 text-base text-gray-600 dark:text-gray-400">
                Join Jelty and start your fitness journey
              </Text>
            </View>

            {/* Error General */}
            {signUpError && (
              <View className="mb-4 rounded-xl border border-error bg-error/10 p-4">
                <Text className="font-medium text-error">{signUpError}</Text>
              </View>
            )}

            {/* Email */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`rounded-xl border bg-white p-4 text-base text-gray-900 dark:bg-gray-800 dark:text-white ${
                      errors.email
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                )}
              />
              {errors.email && (
                <Text className="mt-1 text-sm text-error">{errors.email.message}</Text>
              )}
            </View>

            {/* Country Picker */}
            <Controller
              control={control}
              name="country"
              render={({ field: { value } }) => (
                <CountryCodePicker
                  value={value}
                  onSelect={(code, dialCode, countryName) => {
                    setValue("country", countryName);
                    setValue("countryCode", dialCode);
                  }}
                  error={errors.country?.message}
                  label="Country"
                />
              )}
            />

            {/* Phone */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`rounded-xl border bg-white p-4 text-base text-gray-900 dark:bg-gray-800 dark:text-white ${
                      errors.phone
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    placeholder="1234567890"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                  />
                )}
              />
              {errors.phone && (
                <Text className="mt-1 text-sm text-error">{errors.phone.message}</Text>
              )}
            </View>

            {/* Password */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`rounded-xl border bg-white p-4 text-base text-gray-900 dark:bg-gray-800 dark:text-white ${
                      errors.password
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.password && (
                <Text className="mt-1 text-sm text-error">{errors.password.message}</Text>
              )}
            </View>

            {/* Confirm Password */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Retry Password
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`rounded-xl border bg-white p-4 text-base text-gray-900 dark:bg-gray-800 dark:text-white ${
                      errors.confirmPassword
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="mt-1 text-sm text-error">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            {/* Terms and Conditions Checkbox */}
            <View className="mb-6">
              <Controller
                control={control}
                name="termsAccepted"
                render={({ field: { onChange, value } }) => (
                  <Pressable
                    onPress={() => onChange(!value)}
                    className="flex-row items-start"
                  >
                    <View
                      className={`mr-3 h-5 w-5 items-center justify-center rounded border-2 ${
                        value
                          ? "border-primary bg-primary"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      {value && (
                        <Text className="text-xs font-bold text-white">✓</Text>
                      )}
                    </View>
                    <Text className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{" "}
                      <Text className="font-semibold underline">Terms of Service</Text>{" "}
                      and <Text className="font-semibold underline">Privacy Policy</Text>
                    </Text>
                  </Pressable>
                )}
              />
              {errors.termsAccepted && (
                <Text className="mt-1 text-sm text-error">
                  {errors.termsAccepted.message}
                </Text>
              )}
            </View>

            {/* Sign Up Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              variant="brand-primary"
              size="large"
              loading={loading}
              disabled={loading}
              className="mb-4 w-full"
            >
              Sign Up
            </Button>

            {/* Legal Text */}
            <Text className="mb-6 text-center text-xs text-gray-600 dark:text-gray-400">
              By continuing, you agree to our{" "}
              <Text className="underline">Terms of Service</Text> and{" "}
              <Text className="underline">Privacy Policy</Text>
            </Text>

            {/* Sign In Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
              </Text>
              <Link href="/(auth)/sign-in" asChild>
                <Pressable>
                  <Text className="font-semibold text-secondary">Sign In</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verify Email Modal */}
      <VerifyEmailModal
        visible={showVerifyModal}
        email={userEmail}
        onClose={handleCloseModal}
        onVerify={handleVerifyCode}
        onResendCode={handleResendCode}
      />
    </SafeAreaView>
  );
}
