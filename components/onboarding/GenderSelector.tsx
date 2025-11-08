import { View, Text, TouchableOpacity } from "react-native";
import { Gender, genderLabels } from "@/utils/validation/onboardingSchemas";

interface GenderSelectorProps {
  label: string;
  value: Gender | null;
  onChange: (gender: Gender) => void;
  error?: string;
}

const genderOptions: Gender[] = ["male", "female", "other", "prefer_not_to_say"];

export function GenderSelector({
  label,
  value,
  onChange,
  error,
}: GenderSelectorProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}

      <View className="flex-row flex-wrap gap-3">
        {genderOptions.map((gender) => {
          const isSelected = value === gender;
          const isMale = gender === "male";
          const isFemale = gender === "female";

          return (
            <TouchableOpacity
              key={gender}
              onPress={() => onChange(gender)}
              className={`flex-1 min-w-[45%] rounded-xl border-2 px-4 ${
                isSelected
                  ? "border-primary bg-primary/5 dark:border-secondary dark:bg-secondary/10"
                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
              }`}
              style={{ paddingTop: 12, paddingBottom: 12 }}
            >
              <Text
                className={`text-center text-base font-medium ${
                  isSelected
                    ? "text-primary dark:text-secondary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {genderLabels[gender]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <Text className="mt-2 text-sm text-error dark:text-red-400">
          {error}
        </Text>
      )}
    </View>
  );
}
