/**
 * Grocery Screen
 *
 * Complete grocery list view with filtering, categorization, and item management
 */

import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useGroceryStore } from "@/store/groceryStore";
import { FrequencyToggle } from "@/components/grocery/FrequencyToggle";
import { StorageTypeFilter } from "@/components/grocery/StorageTypeFilter";
import { CategorySection } from "@/components/grocery/CategorySection";
import { AddCustomItemModal } from "@/components/grocery/AddCustomItemModal";
import { AddCustomItemFormData } from "@/types/grocery";
import {
  getFilteredAndGroupedItems,
  getTotalItemCount,
  getCheckedItemCount,
} from "@/utils/groceryHelpers";

export default function GroceryScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get state and actions from store
  const {
    items,
    viewMode,
    storageFilter,
    setViewMode,
    setStorageFilter,
    toggleItemCheck,
    updateItemQuantity,
    addCustomItem,
    removeItem,
  } = useGroceryStore();

  // Get filtered and grouped items
  const categorySections = useMemo(
    () => getFilteredAndGroupedItems(items, viewMode, storageFilter),
    [items, viewMode, storageFilter]
  );

  // Calculate statistics
  const totalItems = useMemo(() => getTotalItemCount(items), [items]);
  const checkedItems = useMemo(() => getCheckedItemCount(items), [items]);
  const remainingItems = totalItems - checkedItems;

  // Handle adding custom item
  const handleAddItem = (itemData: AddCustomItemFormData) => {
    addCustomItem(itemData);
  };

  // Check if there are any items to display
  const hasItems = categorySections.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <View className="bg-white px-4 py-3 dark:bg-gray-900">
        {/* Title and Stats */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Grocery List
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {remainingItems} of {totalItems} items
            </Text>
          </View>
        </View>

        {/* Frequency Toggle */}
        <View className="mb-4">
          <FrequencyToggle value={viewMode} onChange={setViewMode} />
        </View>

        {/* Storage Type Filter */}
        <View>
          <StorageTypeFilter
            value={storageFilter}
            onChange={setStorageFilter}
          />
        </View>
      </View>

      {/* Content */}
      {hasItems ? (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-24"
        >
          {categorySections.map((section) => (
            <CategorySection
              key={section.category}
              section={section}
              onToggleCheck={toggleItemCheck}
              onUpdateQuantity={updateItemQuantity}
              onRemove={removeItem}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons
            name="basket-outline"
            size={64}
            className="mb-4 text-gray-300 dark:text-gray-600"
          />
          <Text className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            No items found
          </Text>
          <Text className="text-center text-base text-gray-500 dark:text-gray-400">
            {viewMode === "weekly"
              ? "No weekly items in this category"
              : viewMode === "monthly"
              ? "No monthly items in this category"
              : "Try adjusting your filters"}
          </Text>
        </View>
      )}

      {/* Floating Add Button */}
      <View className="absolute bottom-6 right-6">
        <Pressable
          onPress={() => setIsModalVisible(true)}
          className="h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-lg dark:bg-blue-600"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="add" size={28} color="white" />
        </Pressable>
      </View>

      {/* Add Custom Item Modal */}
      <AddCustomItemModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddItem}
      />
    </SafeAreaView>
  );
}
