import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WaterIntakeDropdownProps {
  value: number | null;
  onChange: (value: number) => void;
  error?: string;
}

const WATER_OPTIONS = [
  { label: "1L", value: 1.0 },
  { label: "1.5L", value: 1.5 },
  { label: "2L", value: 2.0 },
  { label: "2.5L", value: 2.5 },
  { label: "3L", value: 3.0 },
  { label: "4L+", value: 4.0 },
];

export function WaterIntakeDropdown({
  value,
  onChange,
  error,
}: WaterIntakeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = WATER_OPTIONS.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : "Select water intake";

  const handleSelect = (newValue: number) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <View className="mb-6">
      {/* Label with Icon */}
      <View className="mb-3 flex-row items-center">
        <Ionicons name="water-outline" size={20} color="#1F024B" className="mr-2" />
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          Daily Water Intake
        </Text>
      </View>

      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className={`
          flex-row items-center justify-between rounded-xl border-2 bg-white px-4 py-3.5
          dark:bg-gray-800
          ${
            error
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }
        `}
        activeOpacity={0.7}
      >
        <Text
          className={`
            text-base
            ${
              value
                ? "text-gray-900 dark:text-white"
                : "text-gray-400 dark:text-gray-500"
            }
          `}
        >
          {displayText}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={value ? "#1F024B" : "#9CA3AF"}
        />
      </TouchableOpacity>

      {/* Error Message */}
      {error && (
        <Text className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </Text>
      )}

      {/* Modal Dropdown */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="flex-1 items-center justify-center px-6">
            <View className="w-full max-w-md rounded-2xl bg-white p-4 dark:bg-gray-800">
              <Text className="mb-4 text-center text-lg font-bold text-gray-900 dark:text-white">
                Select Daily Water Intake
              </Text>

              <ScrollView className="max-h-80">
                {WATER_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelect(option.value)}
                    className={`
                      mb-2 rounded-xl px-4 py-3
                      ${
                        value === option.value
                          ? "bg-primary"
                          : "bg-gray-100 dark:bg-gray-700"
                      }
                    `}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`
                        text-center text-base font-medium
                        ${
                          value === option.value
                            ? "text-white"
                            : "text-gray-900 dark:text-white"
                        }
                      `}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="mt-4 rounded-xl bg-gray-200 px-4 py-3 dark:bg-gray-700"
              >
                <Text className="text-center text-base font-semibold text-gray-900 dark:text-white">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
