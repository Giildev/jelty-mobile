import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Streak, DailyProgress } from "@/types/progress";

interface StreakCardProps {
  streak: Streak;
  progress: DailyProgress;
}

export function StreakCard({ streak, progress }: StreakCardProps) {
  return (
    <View className="mx-6 mb-6 rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        {/* Streak */}
        <View className="flex-row items-center">
          <FontAwesome
            name="fire"
            size={18}
            color="#F97316"
            style={{ marginRight: 8 }}
          />
          <Text className="text-sm font-roboto-bold text-gray-900 dark:text-white">
            {streak.currentStreak}-day streak
          </Text>
        </View>

        {/* Today's Progress */}
        <View className="items-end">
          <Text className="text-sm font-roboto-bold text-gray-900 dark:text-white">
            Today: {progress.completionPercentage}%
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <View
          className="h-full rounded-full bg-accent-green"
          style={{ width: `${progress.completionPercentage}%` }}
        />
      </View>
    </View>
  );
}
