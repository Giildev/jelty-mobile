import { View, Text } from "react-native";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepLabel,
}: ProgressIndicatorProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <View className="mb-6">
      {/* Step text */}
      <View className="mb-3">
        <Text className="text-base font-medium text-gray-700 dark:text-gray-300">
          Paso {currentStep}/{totalSteps}
        </Text>
      </View>

      {/* Progress bar */}
      <View className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <View
          className="h-full bg-primary dark:bg-secondary"
          style={{ width: `${percentage}%` }}
        />
      </View>

      {/* Step label */}
      {stepLabel && (
        <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {stepLabel}
        </Text>
      )}
    </View>
  );
}
