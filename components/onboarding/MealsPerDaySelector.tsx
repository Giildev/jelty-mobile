import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MealsPerDaySelectorProps {
  value: number | null;
  onChange: (value: number) => void;
  error?: string;
}

const MEALS_OPTIONS = [2, 3, 4, 5, 6];

export function MealsPerDaySelector({
  value,
  onChange,
  error,
}: MealsPerDaySelectorProps) {
  return (
    <View className="mb-6">
      {/* Label with Icon */}
      <View className="mb-3 flex-row items-center">
        <Ionicons name="time-outline" size={20} color="#1F024B" className="mr-2" />
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          Meals per Day
        </Text>
      </View>

      {/* Horizontal Button Bar */}
      <View className="flex-row gap-2">
        {MEALS_OPTIONS.map((meals) => {
          const isSelected = value === meals;

          return (
            <TouchableOpacity
              key={meals}
              onPress={() => onChange(meals)}
              className={`
                flex-1 items-center justify-center rounded-xl py-3.5
                ${
                  isSelected
                    ? "bg-primary"
                    : "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600"
                }
              `}
              activeOpacity={0.7}
            >
              <Text
                className={`
                  text-base font-semibold
                  ${isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"}
                `}
              >
                {meals}
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
