import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { CodeInput } from "@/components/ui/CodeInput";
import { Button } from "@/components/ui/Button";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface VerifyEmailModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResendCode: () => Promise<void>;
}

/**
 * Modal de Verificación de Email
 * Muestra input de código de 6 dígitos con timer de resend
 */
export function VerifyEmailModal({
  visible,
  email,
  onClose,
  onVerify,
  onResendCode,
}: VerifyEmailModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  // Animación del modal
  const translateY = useSharedValue(1000);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animar entrada
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(1, { duration: 300 });
      // Resetear código y error al abrir
      setCode(["", "", "", "", "", ""]);
      setError("");
    } else {
      // Animar salida
      translateY.value = withTiming(1000, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  // Timer para resend code
  useEffect(() => {
    if (!visible) return;

    // Resetear timer al abrir modal o cuando cambie timerKey
    setResendTimer(30);
    setCanResend(false);

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, timerKey]);

  const modalBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleVerify = async () => {
    const codeString = code.join("");

    if (codeString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onVerify(codeString);
      // Si es exitoso, el parent component manejará la navegación
    } catch (err: any) {
      // Mostrar mensaje de error
      const errorMessage =
        err.errors?.[0]?.message ||
        err.errors?.[0]?.longMessage ||
        err.message ||
        "Invalid code. Please try again.";

      setError(errorMessage);

      // Limpiar el código para permitir nuevo intento (después de mostrar el error)
      setTimeout(() => {
        setCode(["", "", "", "", "", ""]);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || loading) return;

    setLoading(true);
    setError("");

    try {
      await onResendCode();
      // Reiniciar timer incrementando timerKey
      setTimerKey((prev) => prev + 1);
      setResendTimer(30);
      setCanResend(false);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode: string[]) => {
    setCode(newCode);
    setError(""); // Limpiar error al escribir
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Animated.View
        style={[modalBackdropStyle]}
        className="flex-1 bg-black/50"
      >
        <Pressable className="flex-1" onPress={onClose} />

        {/* Modal Content */}
        <Animated.View
          style={[modalContentStyle]}
          className="h-[80%] w-full rounded-t-3xl bg-base-white dark:bg-base-black"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center"
            >
              <Text className="text-2xl text-gray-600 dark:text-gray-400">
                ←
              </Text>
            </Pressable>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              Verify Email
            </Text>
            <View className="w-10" />
          </View>

          {/* Content */}
          <View className="flex-1 px-6 py-8">
            {/* Email Icon */}
            <View className="mb-6 items-center">
              <View className="h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Text className="text-4xl">✉️</Text>
              </View>
            </View>

            {/* Title & Description */}
            <View className="mb-8">
              <Text className="mb-3 text-center text-2xl font-bold text-gray-900 dark:text-white">
                Check your email
              </Text>
              <Text className="text-center text-base leading-6 text-gray-600 dark:text-gray-400">
                We've sent a verification code to your email address. Please
                enter the code below to verify your account.
              </Text>
            </View>

            {/* Email Display */}
            <Text className="mb-6 text-center text-base font-medium text-gray-700 dark:text-gray-300">
              {email}
            </Text>

            {/* Code Input */}
            <CodeInput
              value={code}
              onChange={handleCodeChange}
              onComplete={handleVerify}
              error={error}
              length={6}
            />

            {/* Verify Button */}
            <View className="mb-6">
              <Button
                onPress={handleVerify}
                variant="brand-primary"
                size="large"
                loading={loading}
                disabled={loading || code.join("").length !== 6}
                className="w-full"
              >
                Verify
              </Button>
            </View>

            {/* Resend Section */}
            <View className="items-center">
              <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the code?
              </Text>

              {canResend ? (
                <Pressable
                  onPress={handleResend}
                  disabled={loading}
                  className={loading ? "opacity-50" : ""}
                >
                  <Text className="font-semibold text-secondary">
                    {loading ? "Sending..." : "Resend code"}
                  </Text>
                </Pressable>
              ) : (
                <View>
                  <Text className="font-semibold text-gray-400 dark:text-gray-500">
                    Resend code
                  </Text>
                  <Text className="mt-1 text-center text-xs text-gray-400 dark:text-gray-500">
                    You can request a new code in {resendTimer}s
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
