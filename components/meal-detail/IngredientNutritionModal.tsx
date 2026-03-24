import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { MealIngredient } from "@/types/nutrition";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useColorScheme } from "nativewind";

interface IngredientNutritionModalProps {
  visible: boolean;
  onClose: () => void;
  ingredient: MealIngredient | null;
}

interface MicroItemProps {
  label: string;
  value?: number;
  unit: string;
}

function NutritionRow({ label, value, unit }: MicroItemProps) {
  if (value === undefined || value === 0) return null;
  
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-2xl bg-white/5 p-4 border border-white/10 dark:bg-gray-800/50 dark:border-white/5">
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {label}
      </Text>
      <View className="flex-row items-baseline gap-1">
        <Text className="text-lg font-bold text-blue-500 dark:text-blue-400">
          {value.toFixed(1)}
        </Text>
        <Text className="text-xs font-semibold uppercase text-gray-500">
          {unit}
        </Text>
      </View>
    </View>
  );
}

export function IngredientNutritionModal({ visible, onClose, ingredient }: IngredientNutritionModalProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "white" : "black";

  if (!ingredient) return null;

  // Calculate total values based on grams
  const grams = ingredient.grams || 0;
  
  // Macros
  const macros = ingredient.macrosPerGram ? {
    calories: ingredient.macrosPerGram.energyKcal * grams,
    protein: ingredient.macrosPerGram.proteinG * grams,
    carbs: ingredient.macrosPerGram.carbG * grams,
    fat: ingredient.macrosPerGram.fatG * grams,
  } : null;

  // Micros
  const micros = ingredient.microsPerGram;
  const microList = micros ? [
    { label: "Iron", value: (micros.iron_mg || 0) * grams, unit: "mg" },
    { label: "Zinc", value: (micros.zinc_mg || 0) * grams, unit: "mg" },
    { label: "Calcium", value: (micros.calcium_mg || 0) * grams, unit: "mg" },
    { label: "Vitamin C", value: (micros.vitaminC_mg || 0) * grams, unit: "mg" },
    { label: "Potassium", value: (micros.potassium_mg || 0) * grams, unit: "mg" },
    { label: "Selenium", value: (micros.selenium_mcg || 0) * grams, unit: "mcg" },
    { label: "Vitamin A", value: (micros.vitaminA_mcg || 0) * grams, unit: "mcg" },
    { label: "Vitamin D", value: (micros.vitaminD_mcg || 0) * grams, unit: "mcg" },
  ] : [];

  const availableMicros = microList.filter(m => m.value && m.value > 0);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {/* Scrim */}
        <Pressable 
          className="absolute inset-0 bg-black/60" 
          onPress={onClose} 
        />
        
        <View 
          className="h-[85%] rounded-t-[40px] bg-white shadow-lg dark:bg-gray-900"
        >
          {/* Handle */}
          <View className="items-center py-4">
            <View className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
          </View>

          {/* Header */}
          <View className="mb-6 flex-row items-center justify-between px-6">
            <View className="flex-row items-center flex-1">
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                <Text className="text-2xl">{ingredient.icon || "🍽️"}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" numberOfLines={1}>
                  {ingredient.name}
                </Text>
                <Text className="text-sm font-medium text-gray-500">
                  {ingredient.quantity} {ingredient.unit} {grams > 0 && `(${grams.toFixed(0)}g)`}
                </Text>
              </View>
            </View>
            <Pressable 
              onPress={onClose}
              className="ml-4 rounded-full bg-gray-100 p-2 dark:bg-gray-800"
            >
              <Ionicons name="close" size={24} color={iconColor} />
            </Pressable>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 24 }}
          >
            {macros ? (
              <View className="mb-8">
                <Text className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Macros</Text>
                <View className="flex-row flex-wrap justify-between gap-y-4">
                  <View className="w-[48%] rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20">
                    <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">Calories</Text>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">{macros.calories.toFixed(0)}</Text>
                  </View>
                  <View className="w-[48%] rounded-2xl bg-green-50 p-4 dark:bg-green-900/20">
                    <Text className="text-sm font-medium text-green-600 dark:text-green-400">Protein</Text>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">{macros.protein.toFixed(1)}g</Text>
                  </View>
                  <View className="w-[48%] rounded-2xl bg-purple-50 p-4 dark:bg-purple-900/20">
                    <Text className="text-sm font-medium text-purple-600 dark:text-purple-400">Carbs</Text>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">{macros.carbs.toFixed(1)}g</Text>
                  </View>
                  <View className="w-[48%] rounded-2xl bg-orange-50 p-4 dark:bg-orange-900/20">
                    <Text className="text-sm font-medium text-orange-600 dark:text-orange-400">Fat</Text>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">{macros.fat.toFixed(1)}g</Text>
                  </View>
                </View>
              </View>
            ) : null}

            <View className="mb-4">
              <Text className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Micronutrients</Text>
              {availableMicros.length > 0 ? (
                availableMicros.map((item, index) => (
                  <NutritionRow 
                    key={index} 
                    label={item.label} 
                    value={item.value} 
                    unit={item.unit} 
                  />
                ))
              ) : (
                <View className="mt-4 items-center rounded-3xl bg-gray-50 py-8 dark:bg-gray-800/50">
                  <Ionicons name="nutrition-outline" size={32} color="#9CA3AF" />
                  <Text className="mt-3 text-center text-sm text-gray-500">
                    No detailed micronutrient data available for this ingredient.
                  </Text>
                </View>
              )}
            </View>
            
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
