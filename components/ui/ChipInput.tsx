import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

interface ChipInputProps {
  value: string[];
  onChange: (values: string[]) => void;
  label: string;
  placeholder?: string;
  error?: string;
}

export function ChipInput({
  value = [],
  onChange,
  label,
  placeholder = "",
  error,
}: ChipInputProps) {
  const [inputValue, setInputValue] = useState("");

  // Add chip when pressing Enter or on submit
  const handleAddChip = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  // Remove chip by index
  const handleRemoveChip = (index: number) => {
    const newValues = value.filter((_, i) => i !== index);
    onChange(newValues);
  };

  // Handle when input loses focus (add automatically)
  const handleBlur = () => {
    handleAddChip();
  };

  // Handle keyboard submit (Enter)
  const handleSubmitEditing = () => {
    handleAddChip();
  };

  return (
    <View className="mb-4">
      {/* Label */}
      <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Text>

      {/* Chips Display */}
      {value.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          <View className="flex-row flex-wrap gap-2">
            {value.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center rounded-full bg-primary px-3 py-2"
              >
                <Text className="mr-2 text-sm font-medium text-white">{item}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveChip(index)}
                  className="h-5 w-5 items-center justify-center rounded-full bg-white/30"
                  accessibilityLabel={`Remove ${item}`}
                >
                  <Text className="text-xs font-bold text-white">×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Text Input */}
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        returnKeyType="done"
        blurOnSubmit={false}
        style={{ paddingTop: 12, paddingBottom: 12, textAlignVertical: "center" }}
        className={`
          rounded-xl border bg-white px-4 text-base leading-5 text-gray-900
          dark:text-white dark:bg-gray-800
          ${
            error
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }
        `}
      />

      {/* Error Message */}
      {error && (
        <Text className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</Text>
      )}

      {/* Helper Text */}
      <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Press Enter or tap outside the field to add
      </Text>
    </View>
  );
}
