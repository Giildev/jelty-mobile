import { useRef, useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";

interface CodeInputProps {
  value: string[];
  onChange: (code: string[]) => void;
  error?: string;
  length?: number;
}

/**
 * Code Input Component con auto-focus y auto-advance
 * Para códigos de verificación de 6 dígitos
 */
export function CodeInput({
  value,
  onChange,
  error,
  length = 6,
}: CodeInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Auto-focus en el primer input al montar
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

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
      // Si pega múltiples dígitos, distribuirlos
      const digits = numericText.slice(0, length).split("");
      const newValue = [...value];

      digits.forEach((digit, i) => {
        if (index + i < length) {
          newValue[index + i] = digit;
        }
      });

      onChange(newValue);

      // Focus en el último input llenado o el siguiente vacío
      const nextEmptyIndex = newValue.findIndex((v) => v === "");
      const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
      inputRefs.current[targetIndex]?.focus();
      setFocusedIndex(targetIndex);
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
            value={value[index] || ""}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            keyboardType="number-pad"
            maxLength={1}
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
