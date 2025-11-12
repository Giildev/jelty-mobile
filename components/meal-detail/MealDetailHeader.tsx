import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface MealDetailHeaderProps {
  title: string;
}

export function MealDetailHeader({ title }: MealDetailHeaderProps) {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "white" : "black";

  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-900">
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        className="mr-4 h-10 w-10 items-center justify-center active:opacity-70"
      >
        <Ionicons name="arrow-back" size={24} color={iconColor} />
      </Pressable>

      {/* Title - Centered */}
      <Text
        className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-white"
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Info Icon (Placeholder for symmetry) */}
      <View className="h-10 w-10" />
    </View>
  );
}
