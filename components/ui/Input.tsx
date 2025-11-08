import { View, Text, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

/**
 * Componente Input reutilizable con label y error
 */
export function Input({
  label,
  error,
  className = "",
  ...textInputProps
}: InputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}
      <TextInput
        className={`
          rounded-xl border bg-white px-4 text-base leading-5 text-gray-900
          dark:bg-gray-800 dark:text-white
          ${
            error
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }
        `}
        style={{ paddingTop: 12, paddingBottom: 12, textAlignVertical: "center" }}
        placeholderTextColor="#9CA3AF"
        {...textInputProps}
      />
      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
}
