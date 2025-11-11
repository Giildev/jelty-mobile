import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isToday,
} from "date-fns";
import { ScheduledMeal } from "@/types/nutrition";
import { MealMiniCard } from "./MealMiniCard";

interface WeekViewProps {
  meals: ScheduledMeal[];
  currentDate: Date;
}

export function WeekView({ meals, currentDate }: WeekViewProps) {
  // Get the start of the week (Monday)
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  // Generate array of 7 days starting from Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="px-2"
    >
      <View className="flex-row gap-2 py-4">
        {weekDays.map((day, index) => {
          const dateString = format(day, "yyyy-MM-dd");
          const dayMeals = meals
            .filter((meal) => meal.date === dateString)
            .sort((a, b) => a.time.localeCompare(b.time));

          const isCurrentDay = isToday(day);

          return (
            <View key={index} className="w-[130px]">
              {/* Day Header */}
              <View
                className={`mb-2 items-center rounded-lg py-2 ${
                  isCurrentDay
                    ? "bg-primary"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isCurrentDay
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {format(day, "EEE")}
                </Text>
                <Text
                  className={`text-lg font-bold ${
                    isCurrentDay
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {format(day, "d")}
                </Text>
              </View>

              {/* Meals for this day */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
              >
                {dayMeals.length === 0 ? (
                  <View className="items-center py-4">
                    <Text className="text-center text-xs text-gray-400 dark:text-gray-500">
                      No meals
                    </Text>
                  </View>
                ) : (
                  dayMeals.map((meal) => (
                    <MealMiniCard key={meal.id} meal={meal} />
                  ))
                )}
              </ScrollView>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
