import { View, Text } from "react-native";
import { PreparationStep } from "@/types/nutrition";

interface PreparationStepsProps {
  steps: PreparationStep[];
}

interface StepItemProps {
  step: PreparationStep;
}

function StepItem({ step }: StepItemProps) {
  return (
    <View className="mb-4 flex-row">
      {/* Step Number Circle */}
      <View className="mr-4 h-8 w-8 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
        <Text className="text-sm font-bold text-white">{step.stepNumber}</Text>
      </View>

      {/* Step Instruction */}
      <Text className="flex-1 text-base leading-6 text-gray-700 dark:text-gray-300">
        {step.instruction}
      </Text>
    </View>
  );
}

export function PreparationSteps({ steps }: PreparationStepsProps) {
  return (
    <View className="px-4">
      <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Preparation
      </Text>

      <View className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </View>
    </View>
  );
}
