import { View, Text } from "react-native";
import { Macros } from "@/types/nutrition";

interface NutritionGridProps {
  calories: number;
  macros: Macros;
}

interface MacroCardProps {
  value: number | string;
  label: string;
  unit?: string;
}

function MacroCard({ value, label, unit = "g" }: MacroCardProps) {
  return (
    <View className="flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}
        {label !== "Calories" && <Text className="text-lg">{unit}</Text>}
      </Text>
      <Text className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </Text>
    </View>
  );
}

export function NutritionGrid({ calories, macros }: NutritionGridProps) {
  return (
    <View className="px-4">
      <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Nutrition Overview
      </Text>

      {/* Grid: 2x2 layout */}
      <View className="gap-3">
        {/* First Row */}
        <View className="flex-row gap-3">
          <MacroCard value={calories} label="Calories" unit="" />
          <MacroCard value={macros.protein} label="Protein" />
        </View>

        {/* Second Row */}
        <View className="flex-row gap-3">
          <MacroCard value={macros.carbs} label="Carbs" />
          <MacroCard value={macros.fat} label="Fats" />
        </View>
      </View>
    </View>
  );
}
