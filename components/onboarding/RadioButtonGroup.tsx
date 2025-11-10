import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioButtonGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  error?: string;
}

export function RadioButtonGroup({
  label,
  options,
  value,
  selectedValue,
  onChange,
  onValueChange,
  error,
}: RadioButtonGroupProps) {
  // Support both prop patterns
  const currentValue = value ?? selectedValue;
  const handleChange = onChange ?? onValueChange;

  return (
    <View className="mb-6">
      {/* Label */}
      {label && (
        <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
          {label}
        </Text>
      )}

      {/* Radio Options */}
      <View className="gap-3">
        {options.map((option) => {
          const isSelected = currentValue === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleChange?.(option.value)}
              className={`
                flex-row items-center rounded-xl border-2 px-4 py-4
                ${
                  isSelected
                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                }
              `}
              activeOpacity={0.7}
            >
              {/* Radio Circle */}
              <View
                className={`
                  mr-3 h-6 w-6 items-center justify-center rounded-full border-2
                  ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800"
                  }
                `}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>

              {/* Label */}
              <Text
                className={`
                  flex-1 text-base font-medium
                  ${
                    isSelected
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Error Message */}
      {error && (
        <Text className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </Text>
      )}
    </View>
  );
}
