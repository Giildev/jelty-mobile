import React from "react";
import { View, Text, ScrollView } from "react-native";
import { format } from "date-fns";
import { ScheduledExercise } from "@/types/workout";
import { ExerciseMiniCard } from "./ExerciseMiniCard";

interface DayViewProps {
  exercises: ScheduledExercise[];
  currentDate: Date;
}

export function DayView({ exercises, currentDate }: DayViewProps) {
  // Filter exercises for the selected day and sort by time
  const dateString = format(currentDate, "yyyy-MM-dd");
  const dayExercises = exercises
    .filter((exercise) => exercise.date === dateString)
    .sort((a, b) => a.time.localeCompare(b.time));

  if (dayExercises.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-center text-gray-500 dark:text-gray-400">
          No exercises scheduled for this day
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 px-4"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="py-4"
    >
      {dayExercises.map((exercise, index) => {
        // Format time to display (e.g., "8:00 AM")
        const [hours, minutes] = exercise.time.split(":");
        const timeDate = new Date();
        timeDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        const formattedTime = format(timeDate, "h:mm a");

        return (
          <View key={exercise.id} className="mb-4">
            {/* Time Label */}
            <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {formattedTime}
            </Text>

            {/* Exercise Card */}
            <ExerciseMiniCard exercise={exercise} />
          </View>
        );
      })}
    </ScrollView>
  );
}
