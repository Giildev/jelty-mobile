import { View, Text } from "react-native";
import { DailyProgress } from "@/types/progress";

interface ProgressSummaryCardProps {
  progress: DailyProgress;
}

export function ProgressSummaryCard({ progress }: ProgressSummaryCardProps) {
  const percentage = Math.min(
    (progress.caloriesConsumed / progress.caloriesTarget) * 100,
    100
  );

  return (
    <View className="mx-6 mb-4 mt-3 rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm">
      {/* Header with Calories */}
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-xs font-roboto-medium text-gray-600 dark:text-gray-400">
          Calories
        </Text>
        <Text className="text-sm font-roboto-bold text-gray-900 dark:text-white">
          {progress.caloriesConsumed} / {progress.caloriesTarget}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <View
          className="h-full rounded-full bg-accent-green"
          style={{ width: `${percentage}%` }}
        />
      </View>

      {/* Additional Stats */}
      <View className="mt-3 flex-row justify-around">
        <View className="items-center">
          <Text className="text-xs font-roboto-regular text-gray-500 dark:text-gray-500">
            Steps
          </Text>
          <Text className="mt-0.5 text-sm font-roboto-bold text-gray-900 dark:text-white">
            {progress.steps.toLocaleString()}
          </Text>
        </View>

        <View className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

        <View className="items-center">
          <Text className="text-xs font-roboto-regular text-gray-500 dark:text-gray-500">
            Weight
          </Text>
          <Text
            className={`mt-0.5 text-sm font-roboto-bold ${
              progress.weightChange < 0
                ? "text-green-600 dark:text-green-400"
                : progress.weightChange > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-900 dark:text-white"
            }`}
          >
            {progress.weightChange > 0 ? "+" : ""}
            {progress.weightChange.toFixed(1)} kg
          </Text>
        </View>
      </View>
    </View>
  );
}
