import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MeasurementSystem } from "@/utils/validation/onboardingSchemas";

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  measurementSystem: MeasurementSystem;
  type: "height" | "weight" | "bodyfat";
  error?: string;
  optional?: boolean;
}

// Conversion utilities
const cmToFeet = (cm: number): { feet: number; inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
};

const feetToCm = (feet: number, inches: number): number => {
  return Math.round((feet * 12 + inches) * 2.54);
};

const kgToLbs = (kg: number): number => {
  return Math.round(kg * 2.20462);
};

const lbsToKg = (lbs: number): number => {
  return Math.round(lbs / 2.20462);
};

export function NumberInput({
  label,
  value,
  onChange,
  measurementSystem,
  type,
  error,
  optional = false,
}: NumberInputProps) {
  // Get units based on measurement system and type
  const getUnits = () => {
    if (type === "bodyfat") return "%";
    if (type === "height") {
      return measurementSystem === "metric" ? "cm" : "ft";
    }
    if (type === "weight") {
      return measurementSystem === "metric" ? "kg" : "lb";
    }
    return "";
  };

  const units = getUnits();
  const altUnits =
    type === "height"
      ? measurementSystem === "metric"
        ? "ft"
        : "cm"
      : type === "weight"
        ? measurementSystem === "metric"
          ? "lb"
          : "kg"
        : null;

  // Display value in alternative unit
  const getAltValue = () => {
    if (!value || type === "bodyfat") return null;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    if (type === "height") {
      if (measurementSystem === "metric") {
        const { feet, inches } = cmToFeet(numValue);
        return `${feet}'${inches}"`;
      } else {
        // Assuming value is in feet format
        return `${numValue} cm`;
      }
    }

    if (type === "weight") {
      if (measurementSystem === "metric") {
        return `${kgToLbs(numValue)} lb`;
      } else {
        return `${lbsToKg(numValue)} kg`;
      }
    }

    return null;
  };

  const altValue = getAltValue();

  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {optional && (
            <Text className="text-gray-400 dark:text-gray-500"> (Optional)</Text>
          )}
        </Text>
      )}

      <View className="flex-row items-center gap-2">
        <View className="flex-1">
          <TextInput
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            placeholder={`Enter ${type}`}
            placeholderTextColor="#9CA3AF"
            className={`rounded-xl border px-4 text-base leading-5 text-gray-900 dark:text-white ${
              error
                ? "border-error bg-error/5"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
            }`}
            style={{ paddingTop: 12, paddingBottom: 12, textAlignVertical: "center" }}
          />
        </View>

        {/* Unit indicator */}
        <View
          className="rounded-xl bg-primary px-3 py-2.5 dark:bg-secondary"
          style={{ width: 48 }}
        >
          <Text className="text-center text-sm font-semibold text-white">{units}</Text>
        </View>
      </View>

      {/* Alternative unit display */}
      {altValue && !error && (
        <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ≈ {altValue}
        </Text>
      )}

      {error && (
        <Text className="mt-1 text-sm text-error dark:text-red-400">
          {error}
        </Text>
      )}
    </View>
  );
}
