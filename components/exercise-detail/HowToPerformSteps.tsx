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
    <View className="px-6">
      <Text className="mb-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        How to Perform
      </Text>

      <View className="mb-8 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-premium-sm dark:border-gray-800 dark:bg-gray-800">
        {steps.map((step, index) => (
          <View key={step.id} className={`flex-row ${index === steps.length - 1 ? "" : "mb-6"}`}>
            {/* Step Number Circle */}
            <View className="mr-5 h-8 w-8 items-center justify-center rounded-full bg-blue-500 shadow-sm dark:bg-blue-600">
              <Text className="text-sm font-bold text-white">{step.orderIndex}</Text>
            </View>

            {/* Step Instruction */}
            <Text className="flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {step.instruction}
            </Text>
          </View>
        ))}
      </View>

      {/* Tips Section */}
      {tips && tips.length > 0 && (
        <View className="mb-4">
          <Text className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pro Tips
          </Text>
          <View className="rounded-3xl border border-blue-50 bg-blue-50/30 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
            {tips.map((tip, index) => (
              <View key={index} className="mb-3 flex-row last:mb-0">
                <Text className="mr-3 text-lg leading-relaxed text-blue-500/50">
                  •
                </Text>
                <Text className="flex-1 text-base leading-relaxed text-blue-900 dark:text-blue-300">
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
