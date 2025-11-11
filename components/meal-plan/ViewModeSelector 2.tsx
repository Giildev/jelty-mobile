import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MealPlanViewMode } from "@/types/nutrition";

interface ViewModeSelectorProps {
  value: MealPlanViewMode;
  onChange: (mode: MealPlanViewMode) => void;
}

const VIEW_MODES: { mode: MealPlanViewMode; label: string }[] = [
  { mode: "day", label: "Day" },
  { mode: "week", label: "Week" },
  { mode: "month", label: "Month" },
];

export function ViewModeSelector({ value, onChange }: ViewModeSelectorProps) {
  return (
    <View className="flex-row rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
      {VIEW_MODES.map(({ mode, label }) => {
        const isSelected = value === mode;
        const buttonClass = isSelected
          ? "flex-1 items-center justify-center rounded-lg py-2 bg-white shadow-sm dark:bg-gray-700"
          : "flex-1 items-center justify-center rounded-lg py-2";
        const textClass = isSelected
          ? "text-sm font-semibold text-primary dark:text-white"
          : "text-sm font-semibold text-gray-600 dark:text-gray-400";

        return (
          <TouchableOpacity
            key={mode}
            onPress={() => onChange(mode)}
            className={buttonClass}
            activeOpacity={0.7}
          >
            <Text className={textClass}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
