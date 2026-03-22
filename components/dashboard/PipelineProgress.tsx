import React from "react";
import { View, Text, ActivityIndicator, Animated } from "react-native";
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

  // Animation for the progress bar
  const animatedPercent = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(animatedPercent, {
      toValue: percent,
      duration: 1500, // Slightly longer for smoother feel
      useNativeDriver: false,
    }).start();
  }, [percent]);

  // Pulse animation for the active stage
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const widthInterpolation = animatedPercent.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="flex-1 px-6 pt-10">
      {/* Featured Header */}
      <View className="mb-10 items-center">
        <View className="mb-6 h-28 w-28 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-2xl">
          <View className="absolute h-24 w-24 rounded-full bg-[#E0FF2C]/10 blur-xl" />
          <ActivityIndicator size="large" color="#E0FF2C" />
        </View>
        <Text className="mb-2 text-center text-4xl font-roboto-bold text-white tracking-tight">
          Jelty AI
        </Text>
        <Text className="text-center text-lg font-roboto-regular text-white/50 px-4">
          Crafting your bespoke health journey. Quality takes a moment.
        </Text>
      </View>

      {/* Progress Card - Liquid Glass Style */}
      <View className="mb-10 rounded-[40px] bg-white/5 p-8 border border-white/10 shadow-glass overflow-hidden">
        <View className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-[#E0FF2C]/5 blur-3xl" />
        
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-xs font-roboto-bold text-white/40 uppercase tracking-[3px] mb-1">
              Engine Status
            </Text>
            <Text className="text-xl font-roboto-bold text-white">
              Processing...
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-3xl font-roboto-bold text-[#E0FF2C]">
              {percent}%
            </Text>
          </View>
        </View>

        {/* Improved Progress bar */}
        <View className="h-4 w-full rounded-full bg-white/10 overflow-hidden border border-white/5">
          <Animated.View
            className="h-full rounded-full bg-[#E0FF2C]"
            style={{ 
              width: widthInterpolation,
              shadowColor: "#E0FF2C",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 10,
            }}
          />
        </View>
      </View>

      {/* Stage indicators - More visual hierarchy */}
      <View className="w-full gap-y-8 px-2">
        {STAGES.map((stage, idx) => {
          const status = getStageStatus(stage.key, currentStage, percent);
          const isActive = status === "active";
          
          return (
            <View key={stage.key} className="flex-row items-center">
              {/* Connector Line */}
              {idx < STAGES.length - 1 && (
                <View 
                  className={`absolute left-5 top-10 w-[2px] h-10 ${
                    status === "completed" ? "bg-[#0CDA51]" : "bg-white/10"
                  }`} 
                />
              )}

              {/* Status icon */}
              <View
                className={`h-10 w-10 items-center justify-center rounded-full z-10 ${
                  status === "completed"
                    ? "bg-[#0CDA51]"
                    : status === "active"
                    ? "bg-white/10 border-2 border-[#E0FF2C]"
                    : "bg-white/5 border border-white/5"
                }`}
              >
                {status === "completed" ? (
                  <Text className="text-lg font-bold text-[#1F024B]">✓</Text>
                ) : status === "active" ? (
                  <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <View className="h-3 w-3 rounded-full bg-[#E0FF2C]" />
                  </Animated.View>
                ) : (
                  <View className="h-2 w-2 rounded-full bg-white/20" />
                )}
              </View>

              {/* Stage label */}
              <View className="flex-1 ml-6">
                <Text
                  className={`text-xl ${
                    status === "completed"
                      ? "font-roboto-medium text-[#0CDA51]"
                      : status === "active"
                      ? "font-roboto-bold text-white text-2xl"
                      : "font-roboto-regular text-white/20"
                  }`}
                >
                  {stage.label}
                </Text>
                {status === "active" && (
                  <Text className="text-sm text-[#E0FF2C]/80 mt-1 font-roboto-medium">
                    AI Agent is working on this...
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {/* Current action label footer */}
      <View className="mt-auto mb-10 items-center">
        <View className="rounded-2xl bg-white/5 px-6 py-4 border border-white/10 flex-row items-center">
          <ActivityIndicator size="small" color="#E0FF2C" className="mr-3" />
          <Text className="text-sm font-roboto-medium text-white/80">
            {currentLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
