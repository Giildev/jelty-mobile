import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface MuscleEquipmentInfoProps {
  primaryMuscle: string;
  equipment: string;
  description: string;
}

export function MuscleEquipmentInfo({
  primaryMuscle,
  equipment,
  description,
}: MuscleEquipmentInfoProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#60A5FA" : "#3B82F6";

  return (
    <View className="px-6">
      {/* Badges */}
      <View className="mb-6 flex-row flex-wrap gap-4">
        {/* Primary Muscle Badge */}
        <View className="flex-row items-center rounded-2xl border border-blue-100 bg-blue-50/50 px-5 py-3 dark:border-blue-900/30 dark:bg-blue-900/10">
          <Ionicons name="fitness-outline" size={20} color={iconColor} />
          <Text className="ml-2.5 text-sm font-bold tracking-tight text-blue-700 dark:text-blue-400">
            {primaryMuscle}
          </Text>
        </View>

        {/* Equipment Badge */}
        <View className="flex-row items-center rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-3 dark:border-gray-800 dark:bg-gray-800/20">
          <Ionicons
            name={equipment.toLowerCase().includes("barbell") ||
                   equipment.toLowerCase().includes("dumbbell") ?
                   "barbell-outline" : "hardware-chip-outline"}
            size={20}
            color={iconColor}
          />
          <Text className="ml-2.5 text-sm font-bold tracking-tight text-gray-700 dark:text-gray-400">
            {equipment}
          </Text>
        </View>
      </View>
    </View>
  );
}
