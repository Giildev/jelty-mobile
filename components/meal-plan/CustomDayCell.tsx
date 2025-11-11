import React from "react";
import { View, Text, Pressable, StyleSheet, useColorScheme, Dimensions } from "react-native";
import { DateData } from "react-native-calendars";
import { ScheduledMeal } from "@/types/nutrition";

interface CustomDayCellProps {
  date?: DateData;
  state?: string;
  marking?: any;
  onPress?: (date: DateData) => void;
  meals: ScheduledMeal[];
}

const { height } = Dimensions.get("window");
// Calculate cell height: total available height / 6 rows (roughly)
// Subtract header space (~200px for title, selector, navigation)
const availableHeight = height - 280;
const CELL_HEIGHT = Math.floor(availableHeight / 6);

export function CustomDayCell({
  date,
  state,
  marking,
  onPress,
  meals,
}: CustomDayCellProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (!date) return null;

  const isDisabled = state === "disabled";
  const isToday = state === "today";

  // Filter meals for this specific date
  const dayMeals = meals
    .filter((meal) => meal.date === date.dateString)
    .sort((a, b) => a.time.localeCompare(b.time));

  const mealCount = dayMeals.length;

  return (
    <Pressable
      onPress={() => onPress && onPress(date)}
      disabled={isDisabled}
      style={[
        styles.cell,
        isDark && styles.cellDark,
      ]}
    >
      {/* Day Number */}
      <View
        style={[
          styles.dayNumber,
          isToday && styles.dayNumberToday,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            isDisabled && (isDark ? styles.dayTextDisabledDark : styles.dayTextDisabled),
            isToday && styles.dayTextToday,
            !isDisabled && !isToday && (isDark ? styles.dayTextDark : styles.dayTextLight),
          ]}
        >
          {date.day}
        </Text>
      </View>

      {/* Meal Indicators - Dots */}
      {mealCount > 0 && !isDisabled && (
        <View style={styles.dotsContainer}>
          {dayMeals.slice(0, 4).map((meal, index) => (
            <View
              key={meal.id}
              style={[
                styles.dot,
                { backgroundColor: getMealColor(meal.type) },
              ]}
            />
          ))}
          {mealCount > 4 && (
            <Text style={[styles.moreCount, isDark && styles.moreCountDark]}>
              +{mealCount - 4}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

// Helper function to get color for meal type
function getMealColor(mealType: string): string {
  const colors: Record<string, string> = {
    breakfast: "#f59e0b", // amber
    morning_snack: "#10b981", // emerald
    lunch: "#3b82f6", // blue
    afternoon_snack: "#8b5cf6", // violet
    dinner: "#ef4444", // red
    evening_snack: "#ec4899", // pink
  };
  return colors[mealType] || "#6b7280"; // gray as fallback
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    padding: 4,
    minHeight: CELL_HEIGHT,
    maxHeight: CELL_HEIGHT,
  },
  cellDark: {
    borderColor: "#374151",
  },
  dayNumber: {
    marginBottom: 4,
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  dayNumberToday: {
    backgroundColor: "#1F024B",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "600",
  },
  dayTextLight: {
    color: "#111827",
  },
  dayTextDark: {
    color: "#f9fafb",
  },
  dayTextDisabled: {
    color: "#d1d5db",
  },
  dayTextDisabledDark: {
    color: "#4b5563",
  },
  dayTextToday: {
    color: "#ffffff",
  },
  mealsContainer: {
    flex: 1,
  },
  dotsContainer: {
    flexDirection: "column",
    gap: 3,
    marginTop: 4,
    paddingHorizontal: 2,
    alignItems: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moreCount: {
    fontSize: 8,
    color: "#6b7280",
    fontWeight: "600",
    marginLeft: 2,
  },
  moreCountDark: {
    color: "#9ca3af",
  },
  moreText: {
    fontSize: 9,
    color: "#6b7280",
  },
  moreTextDark: {
    color: "#9ca3af",
  },
});
