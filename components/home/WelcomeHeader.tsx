import { View, Text } from "react-native";

interface WelcomeHeaderProps {
  userName: string;
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  // Get current date and time for greeting
  const now = new Date();
  const hour = now.getHours();

  // Determine greeting based on time of day
  let greeting = "Good morning";
  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18) {
    greeting = "Good evening";
  }

  // Format date in Spanish style: "Wednesday, Nov 5"
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <View className="px-6 pb-1 pt-2">
      <Text className="text-2xl font-roboto-bold text-gray-900 dark:text-white">
        {greeting}, {userName}
      </Text>
      <Text className="mt-0.5 text-sm font-roboto-regular text-gray-600 dark:text-gray-400">
        {formattedDate}
      </Text>
    </View>
  );
}
