import { View, Text, TouchableOpacity } from "react-native";
import { MeasurementSystem } from "@/utils/validation/onboardingSchemas";

interface MeasurementToggleProps {
  label: string;
  value: MeasurementSystem;
  onChange: (system: MeasurementSystem) => void;
}

export function MeasurementToggle({
  label,
  value,
  onChange,
}: MeasurementToggleProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}

      <View className="flex-row rounded-xl border-2 border-gray-300 bg-gray-100 p-1 dark:border-gray-600 dark:bg-gray-800">
        <TouchableOpacity
          onPress={() => onChange("metric")}
          className={`flex-1 rounded-lg py-2.5 ${
            value === "metric"
              ? "bg-primary dark:bg-secondary"
              : "bg-transparent"
          }`}
        >
          <Text
            className={`text-center text-base font-medium ${
              value === "metric"
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Metric
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChange("imperial")}
          className={`flex-1 rounded-lg py-2.5 ${
            value === "imperial"
              ? "bg-primary dark:bg-secondary"
              : "bg-transparent"
          }`}
        >
          <Text
            className={`text-center text-base font-medium ${
              value === "imperial"
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Imperial
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
