import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TimeOfDaySelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const TIME_OPTIONS = [
  { value: "morning", label: "Morning", icon: "sunny-outline" as const },
  { value: "afternoon", label: "Afternoon", icon: "partly-sunny-outline" as const },
  { value: "evening", label: "Evening", icon: "moon-outline" as const },
  { value: "flexible", label: "Flexible", icon: "time-outline" as const },
];

export function TimeOfDaySelector({
  label,
  value,
  onChange,
  error,
}: TimeOfDaySelectorProps) {
  return (
    <View className="mb-6">
      {/* Label */}
      <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
        {label}
      </Text>

      {/* Time Options */}
      <View className="gap-3">
        {TIME_OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option.value)}
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
              {/* Icon Circle */}
              <View
                className={`
                  mr-3 h-10 w-10 items-center justify-center rounded-full
                  ${
                    isSelected
                      ? "bg-primary"
                      : "bg-gray-100 dark:bg-gray-700"
                  }
                `}
              >
                <Ionicons
                  name={option.icon}
                  size={20}
                  color={isSelected ? "white" : "#6B7280"}
                />
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

              {/* Checkmark */}
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#1F024B" />
              )}
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
