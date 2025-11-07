import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform, Pressable, Image } from "react-native";
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
import { createUser } from "@/services/supabase/users";
import { useUserStore } from "@/store/userStore";

/**
 * Pantalla de registro con formulario completo y verificación de email
 */
export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState<SignupFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!isLoaded || isSubmitting) return;

    setIsSubmitting(true);
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

      // Paso 3: Guardar datos del formulario, email y mostrar modal de verificación
      setFormData(data);
      setUserEmail(data.email);
      setShowVerifyModal(true);
      setLoading(false);
      setIsSubmitting(false);
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string; longMessage?: string; code?: string }> };
      const errorCode = error.errors?.[0]?.code;
      const errorMessage = error.errors?.[0]?.message || error.errors?.[0]?.longMessage;

      // Manejar rate limiting de Clerk
      if (errorCode === 'form_identifier_exists' || errorMessage?.includes('already exists')) {
        setSignUpError("This email is already registered. Please sign in instead.");
      } else if (errorMessage?.includes('too many requests') || errorMessage?.includes('rate limit')) {
        setSignUpError("Too many sign-up attempts. Please wait a few minutes and try again.");
      } else {
        setSignUpError(errorMessage || "Error creating account. Please try again.");
      }

      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (!isLoaded || !formData) return;

    try {
      // Paso 1: Intentar verificar el código
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      // Si la verificación es exitosa
      if (result.status === "complete") {
        // Paso 2: Activar la sesión
        await setActive({ session: result.createdSessionId });

        // Paso 3: Guardar datos adicionales en Supabase
        try {
          const clerkUserId = result.createdUserId;

          if (clerkUserId) {
            // Crear usuario en Supabase con datos del formulario
            const { user, profile } = await createUser({
              clerk_user_id: clerkUserId,
              email: formData.email,
              phone: formData.phone,
              country: formData.country,
              country_code: formData.countryCode,
              first_name: "",
              last_name: "",
              termsAccepted: formData.termsAccepted,
            });

            // Actualizar store de Zustand con datos completos
            setUser({
              id: clerkUserId,
              email: formData.email,
              name: "",
              phone: formData.phone,
              country: formData.country,
              countryCode: formData.countryCode,
            });

            console.log("Usuario guardado en Supabase exitosamente");
          }
        } catch (supabaseError) {
          // Si falla el guardado en Supabase, solo logueamos el error
          // pero NO bloqueamos el flujo ya que Clerk es la fuente de verdad
          console.error("Error guardando en Supabase (no crítico):", supabaseError);
        }

        // Paso 4: Cerrar modal y redirigir
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
              <View className="mt-2 flex-row items-center">
                <Text className="text-base text-gray-600 dark:text-gray-400">
                  Join{" "}
                </Text>
                <Image
                  source={require("@/assets/images/JeltyIcon.png")}
                  style={{ width: 16, height: 16 }}
                  resizeMode="contain"
                />
                <Text className="text-base text-gray-600 dark:text-gray-400">
                  {" "}Jelty and start your fitness journey
                </Text>
              </View>
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
                    className={`rounded-xl border bg-white px-4 py-3 text-base leading-5 text-gray-900 dark:bg-gray-800 dark:text-white ${
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
                    style={{ paddingTop: 12, paddingBottom: 12 }}
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
                    className={`rounded-xl border bg-white px-4 py-3 text-base leading-5 text-gray-900 dark:bg-gray-800 dark:text-white ${
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
                    style={{ paddingTop: 12, paddingBottom: 12 }}
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
                    className={`rounded-xl border bg-white px-4 py-3 text-base leading-5 text-gray-900 dark:bg-gray-800 dark:text-white ${
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
                    style={{ paddingTop: 12, paddingBottom: 12 }}
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
                    className={`rounded-xl border bg-white px-4 py-3 text-base leading-5 text-gray-900 dark:bg-gray-800 dark:text-white ${
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
                    style={{ paddingTop: 12, paddingBottom: 12 }}
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
                  <View className="flex-row items-start">
                    <Pressable
                      onPress={() => onChange(!value)}
                      className="mr-3 h-5 w-5 items-center justify-center rounded border-2"
                      style={{
                        borderColor: value ? "#FF6B35" : "#d1d5db",
                        backgroundColor: value ? "#FF6B35" : "transparent",
                      }}
                    >
                      {value && (
                        <Text className="text-xs font-bold text-white">✓</Text>
                      )}
                    </Pressable>
                    <View className="flex-1">
                      <Text className="text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{" "}
                        <Text
                          onPress={() => router.push("/(auth)/terms-of-service")}
                          className="font-semibold text-secondary underline"
                        >
                          Terms of Service
                        </Text>{" "}
                        and{" "}
                        <Text
                          onPress={() => router.push("/(auth)/privacy-policy")}
                          className="font-semibold text-secondary underline"
                        >
                          Privacy Policy
                        </Text>
                      </Text>
                    </View>
                  </View>
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
              disabled={loading || isSubmitting}
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
