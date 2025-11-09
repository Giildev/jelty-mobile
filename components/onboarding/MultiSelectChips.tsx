import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface MultiSelectChipsProps {
  label: string;
  options: readonly string[];
  value: string[];
  onChange: (values: string[]) => void;
  error?: string;
  icon?: React.ReactNode;
}

export function MultiSelectChips({
  label,
  options,
  value = [],
  onChange,
  error,
  icon,
}: MultiSelectChipsProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      // Deselect: remove from array
      onChange(value.filter((item) => item !== option));
    } else {
      // Select: add to array
      onChange([...value, option]);
    }
  };

  return (
    <View className="mb-6">
      {/* Label with Icon */}
      <View className="mb-3 flex-row items-center">
        {icon && <View className="mr-2">{icon}</View>}
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          {label}
        </Text>
      </View>

      {/* Chips Grid */}
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option);

          return (
            <TouchableOpacity
              key={option}
              onPress={() => toggleOption(option)}
              className={`
                rounded-full px-4 py-2.5 border
                ${
                  isSelected
                    ? "bg-primary/10 border-primary"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                }
              `}
              activeOpacity={0.7}
            >
              <Text
                className={`
                  text-sm font-medium
                  ${
                    isSelected
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {option}
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
