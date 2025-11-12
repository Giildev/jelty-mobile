/**
 * FrequencyToggle Component
 *
 * Segmented control for switching between Weekly and Monthly view modes
 */

import React from "react";
import { View, Text, Pressable } from "react-native";
import { GroceryViewMode } from "@/types/grocery";

interface FrequencyToggleProps {
  value: GroceryViewMode;
  onChange: (mode: GroceryViewMode) => void;
}

const VIEW_MODES: { value: GroceryViewMode; label: string }[] = [
  { value: "weekly", label: "By Week" },
  { value: "monthly", label: "By Month" },
];

export function FrequencyToggle({ value, onChange }: FrequencyToggleProps) {
  return (
    <View className="flex-row rounded-full bg-gray-100 p-1 dark:bg-gray-800">
      {VIEW_MODES.map((mode) => {
        const isActive = value === mode.value;
        return (
          <Pressable
            key={mode.value}
            onPress={() => onChange(mode.value)}
            className={`flex-1 rounded-full px-6 py-2.5`}
            style={{
              backgroundColor: isActive ? "#1F024B" : "transparent",
              shadowColor: isActive ? "#000" : "transparent",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: isActive ? 0.1 : 0,
              shadowRadius: isActive ? 3 : 0,
              elevation: isActive ? 2 : 0,
            }}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                isActive
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {mode.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
