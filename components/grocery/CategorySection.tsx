/**
 * CategorySection Component
 *
 * Displays a category header and list of grocery items within that category
 */

import React from "react";
import { View, Text } from "react-native";
import { CategorySection as CategorySectionType } from "@/types/grocery";
import { GroceryItem } from "./GroceryItem";

interface CategorySectionProps {
  section: CategorySectionType;
  onToggleCheck: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

export function CategorySection({
  section,
  onToggleCheck,
  onUpdateQuantity,
  onRemove,
}: CategorySectionProps) {
  if (section.items.length === 0) {
    return null;
  }

  return (
    <View className="mb-4">
      {/* Category Header */}
      <View className="mb-2 px-4">
        <Text className="text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400">
          {section.label}
        </Text>
      </View>

      {/* Items List */}
      <View className="bg-white dark:bg-gray-900">
        {section.items.map((item, index) => (
          <View key={item.id} className="px-4">
            <GroceryItem
              item={item}
              onToggleCheck={onToggleCheck}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
