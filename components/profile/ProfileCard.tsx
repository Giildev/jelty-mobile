import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ProfileCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  href?: string;
  onPress?: () => void;
  variant?: "default" | "danger";
}

export function ProfileCard({
  icon,
  title,
  subtitle,
  href,
  onPress,
  variant = "default",
}: ProfileCardProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      router.push(href as any);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl p-4 mb-3 active:opacity-80"
    >
      {/* Icon Container */}
      <View className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center mr-4">
        <Ionicons
          name={icon}
          size={24}
          className={
            variant === "danger"
              ? "text-red-500 dark:text-red-400"
              : "text-gray-700 dark:text-gray-300"
          }
        />
      </View>

      {/* Text Content */}
      <View className="flex-1">
        <Text
          className={`text-base font-semibold mb-0.5 ${
            variant === "danger"
              ? "text-red-600 dark:text-red-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {title}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </Text>
      </View>

      {/* Chevron */}
      <Ionicons
        name="chevron-forward"
        size={20}
        className="text-gray-400 dark:text-gray-500"
      />
    </Pressable>
  );
}
