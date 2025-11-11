/**
 * GroceryItem Component
 *
 * Displays a single grocery item with checkbox, name, and quantity
 * Supports checking/unchecking and editing quantity
 */

import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GroceryItem as GroceryItemType } from "@/types/grocery";
import { formatQuantity } from "@/utils/groceryHelpers";

interface GroceryItemProps {
  item: GroceryItemType;
  onToggleCheck: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

export function GroceryItem({
  item,
  onToggleCheck,
  onUpdateQuantity,
  onRemove,
}: GroceryItemProps) {
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(item.quantity.toString());

  const handleQuantityEdit = () => {
    setIsEditingQuantity(true);
  };

  const handleQuantitySave = () => {
    const newQuantity = parseFloat(editedQuantity);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      Alert.alert("Invalid Quantity", "Please enter a valid positive number");
      setEditedQuantity(item.quantity.toString());
      return;
    }
    onUpdateQuantity(item.id, newQuantity);
    setIsEditingQuantity(false);
  };

  const handleQuantityCancel = () => {
    setEditedQuantity(item.quantity.toString());
    setIsEditingQuantity(false);
  };

  const handleRemove = () => {
    if (onRemove && item.isCustom) {
      Alert.alert(
        "Remove Item",
        `Are you sure you want to remove "${item.name}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => onRemove(item.id),
          },
        ]
      );
    }
  };

  return (
    <Pressable
      onPress={() => onToggleCheck(item.id)}
      onLongPress={handleRemove}
      className="flex-row items-center justify-between border-b border-gray-200 bg-white py-3 dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Checkbox and Item Info */}
      <View className="flex-1 flex-row items-center">
        {/* Checkbox */}
        <View className="mr-3">
          {item.isChecked ? (
            <Ionicons name="checkbox" size={24} color="#147BFE" />
          ) : (
            <Ionicons
              name="square-outline"
              size={24}
              className="text-gray-400 dark:text-gray-500"
            />
          )}
        </View>

        {/* Item Name */}
        <Text
          className={`flex-1 text-base ${
            item.isChecked
              ? "text-gray-400 line-through dark:text-gray-500"
              : "text-gray-900 dark:text-white"
          }`}
          numberOfLines={2}
        >
          {item.name}
        </Text>
      </View>

      {/* Quantity */}
      <View className="ml-3 flex-row items-center">
        {isEditingQuantity ? (
          <View className="flex-row items-center">
            <TextInput
              value={editedQuantity}
              onChangeText={setEditedQuantity}
              keyboardType="numeric"
              autoFocus
              onBlur={handleQuantitySave}
              onSubmitEditing={handleQuantitySave}
              className="w-16 rounded-md border border-gray-300 bg-white px-2 py-1 text-right text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <Pressable onPress={handleQuantityCancel} className="ml-1 p-1">
              <Ionicons name="close" size={18} color="#EF4444" />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={handleQuantityEdit}>
            <Text
              className={`text-sm font-medium ${
                item.isChecked
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {formatQuantity(item.quantity, item.unit)}
            </Text>
          </Pressable>
        )}

        {/* Custom item indicator */}
        {item.isCustom && (
          <View className="ml-2">
            <Ionicons
              name="person-add"
              size={16}
              className="text-blue-500 dark:text-blue-400"
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}
