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
    <View className="px-4">
      {/* Description */}
      <Text className="mb-4 text-base leading-6 text-gray-700 dark:text-gray-300">
        {description}
      </Text>

      {/* Badges */}
      <View className="flex-row flex-wrap gap-3">
        {/* Primary Muscle Badge */}
        <View className="flex-row items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-900/30">
          <Ionicons name="fitness" size={18} color={iconColor} />
          <Text className="ml-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
            {primaryMuscle}
          </Text>
        </View>

        {/* Equipment Badge */}
        <View className="flex-row items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
          <Ionicons
            name={equipment.toLowerCase().includes("barbell") ||
                   equipment.toLowerCase().includes("dumbbell") ?
                   "barbell" : "hardware-chip"}
            size={18}
            color={iconColor}
          />
          <Text className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-400">
            {equipment}
          </Text>
        </View>
      </View>
    </View>
  );
}
