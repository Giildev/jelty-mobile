import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseInstructions } from "@/types/workout";

interface ExerciseStatsProps {
  instructions: ExerciseInstructions;
}

interface StatCardProps {
  value: number | string;
  label: string;
  unit?: string;
}

function StatCard({ value, label, icon }: { value: number | string; label: string; icon: string }) {
  return (
    <View className="flex-1 rounded-3xl border border-gray-100 bg-white p-5 shadow-premium-sm dark:border-gray-800 dark:bg-gray-800">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </Text>
        <Ionicons name={icon as any} size={16} color="#94A3B8" />
      </View>
      <Text className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {value}
      </Text>
    </View>
  );
}

export function ExerciseStats({ instructions }: ExerciseStatsProps) {
  const { sets, repsMin, repsMax, rir, restTimeSeconds } = instructions;

  // Format reps display (e.g., "10-12" or just "10")
  const repsDisplay =
    repsMin === repsMax ? repsMin : `${repsMin}-${repsMax}`;

  // Format rest time
  const formatRestTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds === 0 ? `${minutes}m` : `${minutes}m ${remainingSeconds}s`;
  };

  const restTimeDisplay = formatRestTime(restTimeSeconds);

  return (
    <View className="px-6">
      <Text className="mb-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Training Details
      </Text>

      <View className="gap-y-4">
        <View className="flex-row gap-4">
          <StatCard value={sets} label="Sets" icon="layers-outline" />
          <StatCard value={repsDisplay} label="Reps" icon="repeat-outline" />
        </View>

        <View className="flex-row gap-4">
          <StatCard value={rir} label="RIR" icon="pulse-outline" />
          <StatCard value={restTimeDisplay} label="Rest" icon="timer-outline" />
        </View>
      </View>
    </View>
  );
}
