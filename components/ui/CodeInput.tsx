import { useRef, useState, useEffect } from "react";
import { View, TextInput, Text, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from "react-native";

interface CodeInputProps {
  value: string[];
  onChange: (code: string[]) => void;
  onComplete?: () => void;
  error?: string;
  length?: number;
}

/**
 * Code Input Component con auto-focus, auto-advance y paste support
 * Para códigos de verificación de 6 dígitos
 */
export function CodeInput({
  value,
  onChange,
  onComplete,
  error,
  length = 6,
}: CodeInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const isProcessingPaste = useRef(false);
  const hasSubmitted = useRef(false);
  const previousValueRef = useRef<string>("");

  // Auto-focus en el primer input al montar
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Resetear hasSubmitted cuando el código cambie a incompleto
  useEffect(() => {
    const currentValue = value.join("");
    const isComplete = value.every((digit) => digit !== "");
    const isEmpty = value.every((digit) => digit === "");

    // Si el código cambió y no está completo, resetear hasSubmitted
    if (!isComplete && currentValue !== previousValueRef.current) {
      hasSubmitted.current = false;
    }

    // Si el código se limpió completamente, enfocar el primer input
    if (isEmpty && previousValueRef.current !== "") {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }

    previousValueRef.current = currentValue;
  }, [value]);

  // Auto-submit cuando el código esté completo (solo una vez)
  useEffect(() => {
    const isComplete = value.every((digit) => digit !== "");

    if (isComplete && onComplete && !hasSubmitted.current) {
      hasSubmitted.current = true;

      // Pequeño delay para asegurar que el estado se actualice primero
      setTimeout(() => {
        onComplete();
      }, 150);
    }
  }, [value]);

  const handleChange = (text: string, index: number) => {
    // Solo permitir números
    const numericText = text.replace(/[^0-9]/g, "");

    if (numericText.length === 0) {
      // Si se borra, actualizar y quedarse en el mismo input
      const newValue = [...value];
      newValue[index] = "";
      onChange(newValue);
      return;
    }

    if (numericText.length === 1) {
      // Un solo dígito: actualizar y avanzar
      const newValue = [...value];
      newValue[index] = numericText;
      onChange(newValue);

      // Auto-advance al siguiente input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
    } else if (numericText.length > 1) {
      // Paste de múltiples dígitos - distribuir desde el inicio
      const digits = numericText.slice(0, length).split("");
      const newValue = Array(length).fill("");

      // Llenar desde el inicio
      digits.forEach((digit, i) => {
        if (i < length) {
          newValue[i] = digit;
        }
      });

      onChange(newValue);

      // Focus en el último input llenado
      const lastFilledIndex = Math.min(digits.length - 1, length - 1);
      setTimeout(() => {
        inputRefs.current[lastFilledIndex]?.focus();
        setFocusedIndex(lastFilledIndex);
      }, 50);

      // El auto-submit lo manejará el useEffect, no aquí
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Manejar backspace para ir al input anterior
    if (e.nativeEvent.key === "Backspace" && value[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <View className="mb-4">
      <View className="flex-row justify-center gap-3">
        {Array.from({ length }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className={`
              h-14 w-12 rounded-xl border-2 bg-white text-center text-2xl font-semibold
              dark:bg-gray-800
              ${
                error
                  ? "border-error"
                  : focusedIndex === index
                  ? "border-primary"
                  : "border-gray-300 dark:border-gray-700"
              }
            `}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              textAlignVertical: "center",
            }}
            value={value[index] || ""}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            keyboardType="number-pad"
            maxLength={6}
            selectTextOnFocus
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
          />
        ))}
      </View>
      {error && (
        <Text className="mt-2 text-center text-sm text-error">{error}</Text>
      )}
    </View>
  );
}
