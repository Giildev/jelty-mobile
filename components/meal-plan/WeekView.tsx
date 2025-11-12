import React, { useEffect, useRef } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isToday,
  differenceInDays,
} from "date-fns";
import { ScheduledMeal } from "@/types/nutrition";
import { MealMiniCard } from "./MealMiniCard";

interface WeekViewProps {
  meals: ScheduledMeal[];
  currentDate: Date;
}

export function WeekView({ meals, currentDate }: WeekViewProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  // Get the start of the week (Monday)
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  // Generate array of 7 days starting from Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Calculate day width to show 2.3 days
  const screenWidth = Dimensions.get("window").width;
  const horizontalPadding = 16; // px-4 = 16px
  const gapBetweenDays = 12; // gap-3 = 12px
  const availableWidth = screenWidth - horizontalPadding * 2;
  const dayWidth = (availableWidth - gapBetweenDays * 2.3) / 2.3;

  // Auto-scroll to today when component mounts or week changes
  useEffect(() => {
    const today = new Date();
    const todayIndex = weekDays.findIndex((day) => isToday(day));

    if (todayIndex !== -1 && scrollViewRef.current) {
      // Calculate scroll position to center today's column
      // For early days (Mon-Wed), scroll to start to keep them visible
      // For later days (Thu-Sun), scroll to show them centered/visible
      const scrollPosition = todayIndex * (dayWidth + gapBetweenDays);

      // Use a small delay to ensure ScrollView is rendered
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: scrollPosition,
          y: 0,
          animated: true,
        });
      }, 100);
    }
  }, [currentDate, weekDays, dayWidth, gapBetweenDays]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="px-4"
      decelerationRate="fast"
      snapToInterval={dayWidth + gapBetweenDays}
      snapToAlignment="start"
    >
      <View className="flex-row gap-3 py-4">
        {weekDays.map((day, index) => {
          const dateString = format(day, "yyyy-MM-dd");
          const dayMeals = meals
            .filter((meal) => meal.date === dateString)
            .sort((a, b) => a.time.localeCompare(b.time));

          const isCurrentDay = isToday(day);

          return (
            <View key={index} style={{ width: dayWidth }}>
              {/* Day Header */}
              <View
                className={`mb-3 items-center rounded-lg py-2 ${
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
