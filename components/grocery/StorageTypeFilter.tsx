/**
 * StorageTypeFilter Component
 *
 * Filter chips for storage types (Fresh, Frozen, Pantry)
 */

import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StorageType } from "@/types/grocery";

interface StorageTypeFilterProps {
  value: StorageType | "all";
  onChange: (filter: StorageType | "all") => void;
}

const STORAGE_TYPES: { value: StorageType | "all"; label: string }[] = [
  { value: "fresh", label: "Fresh" },
  { value: "frozen", label: "Frozen" },
  { value: "pantry", label: "Pantry" },
];

export function StorageTypeFilter({
  value,
  onChange,
}: StorageTypeFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
      className="flex-row"
    >
      {STORAGE_TYPES.map((type) => {
        const isActive = value === type.value;
        return (
          <Pressable
            key={type.value}
            onPress={() => onChange(isActive ? "all" : type.value)}
            className={`rounded-full px-5 py-2.5 ${
              isActive
                ? "bg-gray-900 dark:bg-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                isActive
                  ? "text-white dark:text-gray-900"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {type.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
