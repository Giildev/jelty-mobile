/**
 * AddCustomItemModal Component
 *
 * Modal form for adding custom items to the grocery list
 * Uses React Hook Form with Zod validation
 */

import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";
import {
  AddCustomItemFormData,
  IngredientCategory,
  PurchaseFrequency,
  StorageType,
  MeasurementUnit,
} from "@/types/grocery";
import { Button } from "@/components/ui/Button";

// Zod schema for validation
const addItemSchema = z.object({
  name: z.string().min(1, "Item name is required").max(100, "Name too long"),
  quantity: z.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  category: z.string().min(1, "Category is required"),
  purchaseFrequency: z.enum(["weekly", "monthly"]),
  storageType: z.enum(["fresh", "frozen", "pantry"]),
});

interface AddCustomItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: AddCustomItemFormData) => void;
}

const CATEGORIES: { value: IngredientCategory; label: string }[] = [
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "proteins", label: "Proteins" },
  { value: "dairy", label: "Dairy" },
  { value: "grains", label: "Grains" },
  { value: "oils", label: "Oils & Fats" },
  { value: "condiments", label: "Condiments" },
  { value: "spices", label: "Spices" },
  { value: "beverages", label: "Beverages" },
  { value: "other", label: "Other" },
];

const COMMON_UNITS: MeasurementUnit[] = [
  "g",
  "kg",
  "ml",
  "l",
  "cups",
  "tbsp",
  "tsp",
  "pieces",
  "units",
];

export function AddCustomItemModal({
  visible,
  onClose,
  onAdd,
}: AddCustomItemModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCustomItemFormData>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      unit: "g",
      category: "other",
      purchaseFrequency: "weekly",
      storageType: "fresh",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: AddCustomItemFormData) => {
    onAdd(data);
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="max-h-[90%] rounded-t-3xl bg-white px-6 pb-8 pt-6 dark:bg-gray-900">
            {/* Header */}
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                Add new item
              </Text>
              <Pressable onPress={handleClose}>
                <Ionicons
                  name="close"
                  size={28}
                  className="text-gray-500 dark:text-gray-400"
                />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Item Name */}
              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Item Name
                </Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="e.g., Organic Tomatoes"
                      placeholderTextColor="#9CA3AF"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  )}
                />
                {errors.name && (
                  <Text className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </Text>
                )}
              </View>

              {/* Quantity and Unit */}
              <View className="mb-4 flex-row gap-3">
                <View className="flex-1">
                  <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Quantity
                  </Text>
                  <Controller
                    control={control}
                    name="quantity"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                        keyboardType="numeric"
                        placeholder="1"
                        placeholderTextColor="#9CA3AF"
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                    )}
                  />
                  {errors.quantity && (
                    <Text className="mt-1 text-sm text-red-500">
                      {errors.quantity.message}
                    </Text>
                  )}
                </View>

                <View className="flex-1">
                  <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Unit
                  </Text>
                  <Controller
                    control={control}
                    name="unit"
                    render={({ field: { onChange, value } }) => (
                      <View className="rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
                        <select
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          className="w-full rounded-lg px-4 py-3 text-base text-gray-900 dark:bg-gray-800 dark:text-white"
                        >
                          {COMMON_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </View>
                    )}
                  />
                </View>
              </View>

              {/* Category */}
              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </Text>
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <View className="rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
                      <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full rounded-lg px-4 py-3 text-base text-gray-900 dark:bg-gray-800 dark:text-white"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </View>
                  )}
                />
              </View>

              {/* Purchase Frequency */}
              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Purchase Frequency
                </Text>
                <Controller
                  control={control}
                  name="purchaseFrequency"
                  render={({ field: { onChange, value } }) => (
                    <View className="flex-row gap-2">
                      <Pressable
                        onPress={() => onChange("weekly")}
                        className={`flex-1 rounded-lg border px-4 py-3 ${
                          value === "weekly"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                        }`}
                      >
                        <Text
                          className={`text-center text-sm font-semibold ${
                            value === "weekly"
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          Weekly
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => onChange("monthly")}
                        className={`flex-1 rounded-lg border px-4 py-3 ${
                          value === "monthly"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                        }`}
                      >
                        <Text
                          className={`text-center text-sm font-semibold ${
                            value === "monthly"
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          Monthly
                        </Text>
                      </Pressable>
                    </View>
                  )}
                />
              </View>

              {/* Storage Type */}
              <View className="mb-6">
                <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Storage Type
                </Text>
                <Controller
                  control={control}
                  name="storageType"
                  render={({ field: { onChange, value } }) => (
                    <View className="flex-row gap-2">
                      {(["fresh", "frozen", "pantry"] as StorageType[]).map(
                        (type) => (
                          <Pressable
                            key={type}
                            onPress={() => onChange(type)}
                            className={`flex-1 rounded-lg border px-4 py-3 ${
                              value === type
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                            }`}
                          >
                            <Text
                              className={`text-center text-sm font-semibold capitalize ${
                                value === type
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {type}
                            </Text>
                          </Pressable>
                        )
                      )}
                    </View>
                  )}
                />
              </View>

              {/* Submit Button */}
              <Button onPress={handleSubmit(onSubmit)} variant="primary">
                Add Item
              </Button>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
