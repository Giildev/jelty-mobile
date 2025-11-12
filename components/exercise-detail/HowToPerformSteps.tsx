import { View, Text } from "react-native";
import { HowToPerformStep } from "@/types/workout";

interface HowToPerformStepsProps {
  steps: HowToPerformStep[];
  tips?: string[];
}

interface StepItemProps {
  step: HowToPerformStep;
}

function StepItem({ step }: StepItemProps) {
  return (
    <View className="mb-4 flex-row">
      {/* Step Number Circle */}
      <View className="mr-4 h-8 w-8 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
        <Text className="text-sm font-bold text-white">{step.orderIndex}</Text>
      </View>

      {/* Step Instruction */}
      <Text className="flex-1 text-base leading-6 text-gray-700 dark:text-gray-300">
        {step.instruction}
      </Text>
    </View>
  );
}

export function HowToPerformSteps({ steps, tips }: HowToPerformStepsProps) {
  return (
    <View className="px-4">
      <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        How to Perform
      </Text>

      <View className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </View>

      {/* Tips Section */}
      {tips && tips.length > 0 && (
        <View className="mt-4">
          <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Pro Tips
          </Text>
          <View className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            {tips.map((tip, index) => (
              <View key={index} className="mb-2 flex-row last:mb-0">
                <Text className="mr-2 text-base text-yellow-700 dark:text-yellow-400">
                  •
                </Text>
                <Text className="flex-1 text-base leading-6 text-yellow-800 dark:text-yellow-300">
                  {tip}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
