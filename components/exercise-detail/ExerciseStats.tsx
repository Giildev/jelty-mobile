import { View, Text } from "react-native";
import { ExerciseInstructions } from "@/types/workout";

interface ExerciseStatsProps {
  instructions: ExerciseInstructions;
}

interface StatCardProps {
  value: number | string;
  label: string;
  unit?: string;
}

function StatCard({ value, label, unit = "" }: StatCardProps) {
  return (
    <View className="flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}
        {unit && <Text className="text-lg">{unit}</Text>}
      </Text>
      <Text className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </Text>
    </View>
  );
}

export function ExerciseStats({ instructions }: ExerciseStatsProps) {
  const { sets, repsMin, repsMax, rir, restTimeSeconds } = instructions;

  // Format reps display (e.g., "10-12" or just "10")
  const repsDisplay =
    repsMin === repsMax ? repsMin : `${repsMin}-${repsMax}`;

  // Format rest time (convert seconds to readable format)
  const formatRestTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) {
      return `${minutes}m`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  const restTimeDisplay = formatRestTime(restTimeSeconds);

  return (
    <View className="px-4">
      <Text className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Exercise Instructions
      </Text>

      {/* Grid: 2x2 layout */}
      <View className="gap-3">
        {/* First Row */}
        <View className="flex-row gap-3">
          <StatCard value={sets} label="Sets" />
          <StatCard value={repsDisplay} label="Reps" />
        </View>

        {/* Second Row */}
        <View className="flex-row gap-3">
          <StatCard value={rir} label="RIR" />
          <StatCard value={restTimeDisplay} label="Rest" />
        </View>
      </View>
    </View>
  );
}
