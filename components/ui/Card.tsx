import { View, Text } from "react-native";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  variant?: "default" | "elevated" | "outlined";
  className?: string;
}

/**
 * Componente Card reutilizable
 */
export function Card({
  children,
  title,
  subtitle,
  variant = "default",
  className = "",
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "elevated":
        return "bg-white dark:bg-gray-800 shadow-lg";
      case "outlined":
        return "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700";
      case "default":
      default:
        return "bg-gray-50 dark:bg-gray-800";
    }
  };

  return (
    <View className={`rounded-lg p-4 ${getVariantStyles()} ${className}`}>
      {(title || subtitle) && (
        <View className="mb-3">
          {title && (
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}
