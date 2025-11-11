import React from "react";
import { ScrollView, useColorScheme, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { format } from "date-fns";
import { ScheduledMeal } from "@/types/nutrition";
import { CustomDayCell } from "./CustomDayCell";

interface MonthViewProps {
  meals: ScheduledMeal[];
  currentDate: Date;
  onDayPress?: (date: Date) => void;
}

export function MonthView({ meals, currentDate, onDayPress }: MonthViewProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Prepare marked dates (dates that have meals)
  const markedDates = meals.reduce(
    (acc, meal) => {
      if (!acc[meal.date]) {
        acc[meal.date] = { marked: true };
      }
      return acc;
    },
    {} as Record<string, any>
  );

  const handleDayPress = (day: DateData) => {
    if (onDayPress) {
      const selectedDate = new Date(day.timestamp);
      onDayPress(selectedDate);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Calendar
        key={format(currentDate, "yyyy-MM")}
        current={format(currentDate, "yyyy-MM-dd")}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        hideExtraDays={false}
        // Custom day component
        dayComponent={(props) => (
          <CustomDayCell
            date={props.date}
            state={props.state}
            marking={props.marking}
            meals={meals}
            onPress={handleDayPress}
          />
        )}
        // Hide the calendar's built-in header completely
        renderHeader={() => null}
        // Theme customization
        theme={{
          backgroundColor: isDark ? "#111827" : "#ffffff",
          calendarBackground: isDark ? "#111827" : "#ffffff",
          textSectionTitleColor: isDark ? "#9ca3af" : "#6b7280",
          selectedDayBackgroundColor: "#1F024B",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#1F024B",
          dayTextColor: isDark ? "#f9fafb" : "#111827",
          textDisabledColor: isDark ? "#4b5563" : "#d1d5db",
          monthTextColor: isDark ? "#f9fafb" : "#111827",
          textDayFontFamily: "Roboto-Regular",
          textMonthFontFamily: "Roboto-Bold",
          textDayHeaderFontFamily: "Roboto-Medium",
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
        // Style
        style={styles.calendar}
        // Header
        enableSwipeMonths={false}
        hideArrows={true}
        disableMonthChange={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  calendar: {
    borderRadius: 12,
    padding: 0,
  },
});
