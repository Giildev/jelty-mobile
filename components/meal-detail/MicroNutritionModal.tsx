import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { Micros } from "@/types/nutrition";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useColorScheme } from "nativewind";

interface MicroNutritionModalProps {
  visible: boolean;
  onClose: () => void;
  micros?: Micros;
}

interface MicroItemProps {
  label: string;
  value?: number;
  unit: string;
}

function NutritionRow({ label, value, unit }: MicroItemProps) {
  if (value === undefined || value === 0) return null;
  
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-2xl bg-white/5 p-4 border border-gray-100 dark:bg-gray-800/50 dark:border-white/5 active:opacity-70 shadow-sm">
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

export function MicroNutritionModal({ visible, onClose, micros }: MicroNutritionModalProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "white" : "black";

  const microList = [
    { label: "Iron", value: micros?.iron_mg, unit: "mg" },
    { label: "Zinc", value: micros?.zinc_mg, unit: "mg" },
    { label: "Calcium", value: micros?.calcium_mg, unit: "mg" },
    { label: "Vitamin C", value: micros?.vitaminC_mg, unit: "mg" },
    { label: "Potassium", value: micros?.potassium_mg, unit: "mg" },
    { label: "Selenium", value: micros?.selenium_mcg, unit: "mcg" },
    { label: "Vitamin A", value: micros?.vitaminA_mcg, unit: "mcg" },
    { label: "Vitamin D", value: micros?.vitaminD_mcg, unit: "mcg" },
  ];

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
            <Text className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Micronutrients
            </Text>
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
            <Text className="mb-8 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Detailed micronutrient breakdown for a single serving. These values help you track your essential vitamins and minerals.
            </Text>

            <View className="mb-4">
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
                    No detailed micronutrient data available.
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
