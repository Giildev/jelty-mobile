import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  FitnessGoalType,
  fitnessGoalLabels,
} from "@/utils/validation/onboardingSchemas";

interface FitnessGoalDropdownProps {
  label: string;
  value: FitnessGoalType | null;
  onChange: (goal: FitnessGoalType) => void;
  error?: string;
  placeholder?: string;
}

const fitnessGoals: FitnessGoalType[] = [
  "lose_fat",
  "build_muscle",
  "improve_health",
  "increase_performance",
  "maintain",
];

export function FitnessGoalDropdown({
  label,
  value,
  onChange,
  error,
  placeholder = "Selecciona tu objetivo principal",
}: FitnessGoalDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (goal: FitnessGoalType) => {
    onChange(goal);
    setIsOpen(false);
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center justify-between rounded-xl border px-4 ${
          error
            ? "border-error bg-error/5"
            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
        }`}
        style={{ paddingTop: 12, paddingBottom: 12 }}
      >
        <Text
          className={`flex-1 text-base ${
            value
              ? "text-gray-900 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
          numberOfLines={1}
        >
          {value ? fitnessGoalLabels[value] : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          className="ml-2 text-gray-400 dark:text-gray-500"
        />
      </TouchableOpacity>

      {error && (
        <Text className="mt-1 text-sm text-error dark:text-red-400">
          {error}
        </Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setIsOpen(false)}
        >
          <View className="flex-1 items-center justify-center px-6">
            <Pressable
              className="w-full max-w-md rounded-2xl bg-white p-2 dark:bg-gray-900"
              onPress={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <View className="mb-2 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                  {label}
                </Text>
              </View>

              {/* Options */}
              <ScrollView className="max-h-96">
                {fitnessGoals.map((goal) => {
                  const isSelected = value === goal;
                  return (
                    <TouchableOpacity
                      key={goal}
                      onPress={() => handleSelect(goal)}
                      className={`mx-2 mb-2 rounded-xl px-4 py-4 ${
                        isSelected
                          ? "bg-primary/10 dark:bg-secondary/10"
                          : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <View className="flex-row items-center justify-between">
                        <Text
                          className={`flex-1 text-base ${
                            isSelected
                              ? "font-semibold text-primary dark:text-secondary"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {fitnessGoalLabels[goal]}
                        </Text>
                        {isSelected && (
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            className="text-primary dark:text-secondary"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Close button */}
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="mx-2 mt-2 rounded-xl bg-gray-100 py-3 dark:bg-gray-800"
              >
                <Text className="text-center text-base font-medium text-gray-700 dark:text-gray-300">
                  Cerrar
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
