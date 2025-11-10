import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface DaySelectorProps {
  label: string;
  value: string[];
  onChange: (days: string[]) => void;
  error?: string;
}

const DAYS = [
  { value: "monday", label: "Mon", fullLabel: "Lunes" },
  { value: "tuesday", label: "Tue", fullLabel: "Martes" },
  { value: "wednesday", label: "Wed", fullLabel: "Miércoles" },
  { value: "thursday", label: "Thu", fullLabel: "Jueves" },
  { value: "friday", label: "Fri", fullLabel: "Viernes" },
  { value: "saturday", label: "Sat", fullLabel: "Sábado" },
  { value: "sunday", label: "Sun", fullLabel: "Domingo" },
];

export function DaySelector({ label, value = [], onChange, error }: DaySelectorProps) {
  const toggleDay = (day: string) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  return (
    <View className="mb-6">
      {/* Label */}
      <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
        {label}
      </Text>

      {/* Days Grid - 2 rows: 4 days in first row, 3 days in second row */}
      <View className="gap-2">
        {/* First Row - Mon to Thu */}
        <View className="flex-row justify-center gap-2">
          {DAYS.slice(0, 4).map((day) => {
            const isSelected = value.includes(day.value);
            // Adjust font size for longer day names
            const fontSize = day.fullLabel.length > 7 ? 12 : 14;

            return (
              <TouchableOpacity
                key={day.value}
                onPress={() => toggleDay(day.value)}
                style={{ width: 85, height: 48 }}
                className={`
                  items-center justify-center rounded-xl border-2
                  ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  }
                `}
                activeOpacity={0.7}
              >
                <Text
                  style={{ fontSize }}
                  className={`
                    font-semibold text-center
                    ${isSelected ? "text-white" : "text-gray-900 dark:text-white"}
                  `}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {day.fullLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Second Row - Fri to Sun (slightly wider) */}
        <View className="flex-row justify-center gap-2">
          {DAYS.slice(4, 7).map((day) => {
            const isSelected = value.includes(day.value);
            // Adjust font size for longer day names
            const fontSize = day.fullLabel.length > 7 ? 12 : 14;

            return (
              <TouchableOpacity
                key={day.value}
                onPress={() => toggleDay(day.value)}
                style={{ width: 100, height: 48 }}
                className={`
                  items-center justify-center rounded-xl border-2
                  ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  }
                `}
                activeOpacity={0.7}
              >
                <Text
                  style={{ fontSize }}
                  className={`
                    font-semibold text-center
                    ${isSelected ? "text-white" : "text-gray-900 dark:text-white"}
                  `}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {day.fullLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
