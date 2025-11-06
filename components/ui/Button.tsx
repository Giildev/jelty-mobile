import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { ReactNode } from "react";

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Componente Button reutilizable con variantes y tamaños
 */
export function Button({
  onPress,
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 active:bg-blue-600";
      case "secondary":
        return "bg-gray-500 active:bg-gray-600 dark:bg-gray-700 dark:active:bg-gray-800";
      case "outline":
        return "bg-transparent border-2 border-blue-500 active:bg-blue-50 dark:active:bg-blue-900";
      case "danger":
        return "bg-red-500 active:bg-red-600";
      default:
        return "bg-blue-500 active:bg-blue-600";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "px-4 py-2";
      case "medium":
        return "px-6 py-3";
      case "large":
        return "px-8 py-4";
      default:
        return "px-6 py-3";
    }
  };

  const getTextStyles = () => {
    const baseStyles = "text-center font-semibold";
    const sizeStyles =
      size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base";
    const colorStyles =
      variant === "outline" ? "text-blue-500" : "text-white";
    return `${baseStyles} ${sizeStyles} ${colorStyles}`;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        rounded-lg
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled || loading ? "opacity-50" : ""}
        ${className}
      `}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator
            color={variant === "outline" ? "#3b82f6" : "#ffffff"}
            size="small"
          />
        ) : (
          <Text className={getTextStyles()}>{children}</Text>
        )}
      </View>
    </Pressable>
  );
}
