import React from "react";
import { View, Text, ScrollView } from "react-native";
import { format, parseISO } from "date-fns";
import { ScheduledMeal } from "@/types/nutrition";
import { MealMiniCard } from "./MealMiniCard";

interface DayViewProps {
  meals: ScheduledMeal[];
  currentDate: Date;
}

export function DayView({ meals, currentDate }: DayViewProps) {
  // Filter meals for the selected day and sort by time
  const dateString = format(currentDate, "yyyy-MM-dd");
  const dayMeals = meals
    .filter((meal) => meal.date === dateString)
    .sort((a, b) => a.time.localeCompare(b.time));

  if (dayMeals.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-center text-gray-500 dark:text-gray-400">
          No meals scheduled for this day
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
      {dayMeals.map((meal, index) => {
        // Format time to display (e.g., "8:00 AM")
        const [hours, minutes] = meal.time.split(":");
        const timeDate = new Date();
        timeDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        const formattedTime = format(timeDate, "h:mm a");

        return (
          <View key={meal.id} className="mb-4">
            {/* Time Label */}
            <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {formattedTime}
            </Text>

            {/* Meal Card */}
            <MealMiniCard meal={meal} />
          </View>
        );
      })}
    </ScrollView>
  );
}
