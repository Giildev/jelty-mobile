import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { STAGE_LABELS } from "@/hooks/useOnboardingProgress";
import type { OnboardingProgressResponse } from "@/services/api/onboarding";

interface PipelineProgressProps {
  progress: OnboardingProgressResponse | null;
}

// The 4 stages shown in order to the user
const STAGES = [
  { key: "nutritionist", label: "Analyzing Profile" },
  { key: "chef", label: "Creating Meals" },
  { key: "coach", label: "Building Workout" },
  { key: "grocery_list", label: "Shopping List" },
] as const;

type StageKey = (typeof STAGES)[number]["key"];

function getStageStatus(
  stageKey: StageKey,
  currentStage: string,
  percent: number
): "completed" | "active" | "pending" {
  const currentIndex = STAGES.findIndex(s => s.key === currentStage);
  const thisIndex = STAGES.findIndex(s => s.key === stageKey);

  if (currentStage === "done") return "completed";
  if (thisIndex < currentIndex) return "completed";
  if (thisIndex === currentIndex) return "active";
  return "pending";
}

export function PipelineProgress({ progress }: PipelineProgressProps) {
  const percent = progress?.percent ?? 0;
  const currentStage = progress?.stage ?? "nutritionist";
  const currentLabel = STAGE_LABELS[currentStage] ?? "Preparing your plan...";

  return (
    <View className="flex-1 px-6 pt-10">
      {/* Featured Header */}
      <View className="mb-10 items-center">
        <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/20">
          <ActivityIndicator size="large" color="#00E6CA" />
        </View>
        <Text className="mb-2 text-center text-3xl font-roboto-bold text-white">
          Building Your Plan
        </Text>
        <Text className="text-center text-base font-roboto-regular text-white/60">
          Our AI experts are crafting your perfect regimen.{"\n"}This will be
          ready in just a moment.
        </Text>
      </View>

      {/* Progress Card */}
      <View className="mb-10 rounded-3xl bg-white/5 p-6 border border-white/10">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-roboto-medium text-white/80 uppercase tracking-widest">
            Overall Progress
          </Text>
          <Text className="text-lg font-roboto-bold text-[#00E6CA]">
            {percent}%
          </Text>
        </View>

        {/* Progress bar */}
        <View className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
          <View
            className="h-3 rounded-full bg-[#00E6CA]"
            style={{ width: `${percent}%` }}
          />
        </View>
      </View>

      {/* Stage indicators */}
      <View className="w-full gap-y-6 px-2">
        {STAGES.map((stage) => {
          const status = getStageStatus(stage.key, currentStage, percent);
          return (
            <View key={stage.key} className="flex-row items-center gap-x-4">
              {/* Status icon */}
              <View
                className={`h-10 w-10 items-center justify-center rounded-full ${
                  status === "completed"
                    ? "bg-[#00E6CA]"
                    : status === "active"
                    ? "bg-white/20 border-2 border-[#00E6CA]"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {status === "completed" ? (
                  <Text className="text-lg font-bold text-[#1F024B]">✓</Text>
                ) : status === "active" ? (
                  <ActivityIndicator size="small" color="#00E6CA" />
                ) : (
                  <View className="h-1.5 w-1.5 rounded-full bg-white/20" />
                )}
              </View>

              {/* Stage label */}
              <View className="flex-1">
                <Text
                  className={`text-lg ${
                    status === "completed"
                      ? "font-roboto-medium text-[#00E6CA]"
                      : status === "active"
                      ? "font-roboto-bold text-white"
                      : "font-roboto-regular text-white/30"
                  }`}
                >
                  {stage.label}
                </Text>
                {status === "active" && (
                  <Text className="text-xs text-[#00E6CA]/70 mt-0.5 font-roboto-medium">
                    In progress...
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {/* Current action label footer */}
      <View className="mt-auto mb-6 items-center">
        <View className="rounded-full bg-[#00E6CA]/10 px-4 py-2 border border-[#00E6CA]/20">
          <Text className="text-sm font-roboto-medium text-[#00E6CA]">
            {currentLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
