import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import { MealPlanViewMode, ScheduledMeal } from "@/types/nutrition";
import { ViewModeSelector } from "@/components/meal-plan/ViewModeSelector";
import { MonthNavigationHeader } from "@/components/meal-plan/MonthNavigationHeader";
import { DayView } from "@/components/meal-plan/DayView";
import { WeekView } from "@/components/meal-plan/WeekView";
import { MonthView } from "@/components/meal-plan/MonthView";
import { useMealPlanStore } from "@/store/mealPlanStore";
import { useUserStore } from "@/store/userStore";
import { TodayMealPlan } from "@/services/api/plans";

/**
 * Meal Plan Screen
 * Displays scheduled meals in day/week/month views
 */
export default function MealPlanScreen() {
  const [viewMode, setViewMode] = useState<MealPlanViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const { user } = useUserStore();
  const userId = user?.supabaseUserId;

  const {
    getDailyPlan,
    getWeeklyPlan,
    getMonthlyPlan,
    loading,
    error,
    dailyPlans,
    weeklyPlans,
    monthlyPlans,
  } = useMealPlanStore();

  // Fetch data when date, viewMode or userId changes
  useEffect(() => {
    if (!userId) return;

    if (viewMode === "day") {
      getDailyPlan(userId, currentDate);
    } else if (viewMode === "week") {
      getWeeklyPlan(userId, currentDate);
    } else if (viewMode === "month") {
      getMonthlyPlan(userId, currentDate);
    }
  }, [userId, currentDate, viewMode]);

  // Map API data to UI format (ScheduledMeal)
  const mapToScheduledMeals = (plans: TodayMealPlan[] | TodayMealPlan): ScheduledMeal[] => {
    const planArray = Array.isArray(plans) ? plans : [plans];
    const meals: ScheduledMeal[] = [];

    planArray.forEach((plan) => {
      if (!plan.slots) return;
      plan.slots.forEach((slot) => {
        meals.push({
          id: slot.id,
          name: slot.recipe.name,
          description: slot.recipe.description,
          calories: slot.recipe.nutritionPerServing.energyKcal,
          macros: {
            carbs: slot.recipe.nutritionPerServing.carbG,
            protein: slot.recipe.nutritionPerServing.proteinG,
            fat: slot.recipe.nutritionPerServing.fatG,
          },
          date: plan.date,
          // Extract time from slotLabel if it looks like HH:mm, otherwise fallback
          time: /^\d{2}:\d{2}$/.test(slot.slotLabel || "") ? slot.slotLabel! : "08:00",
          type: slot.mealType as any,
          ingredients: [], // Detail view fetches these
        });
      });
    });

    return meals;
  };

  const currentMeals = useMemo(() => {
    if (viewMode === "day") {
      const dateKey = currentDate.toISOString().split("T")[0];
      const plan = dailyPlans[dateKey];
      return plan ? mapToScheduledMeals(plan) : [];
    } else if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekKey = weekStart.toISOString().split("T")[0];
      const plans = weeklyPlans[weekKey];
      return plans ? mapToScheduledMeals(plans) : [];
    } else {
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
      const plans = monthlyPlans[monthKey];
      return plans ? mapToScheduledMeals(plans) : [];
    }
  }, [viewMode, currentDate, dailyPlans, weeklyPlans, monthlyPlans]);

  // Navigation handlers based on view mode
  const handlePrevious = () => {
    setCurrentDate((prev) => {
      if (viewMode === "day") return subDays(prev, 1);
      if (viewMode === "week") return subWeeks(prev, 1);
      return subMonths(prev, 1);
    });
  };

  const handleNext = () => {
    setCurrentDate((prev) => {
      if (viewMode === "day") return addDays(prev, 1);
      if (viewMode === "week") return addWeeks(prev, 1);
      return addMonths(prev, 1);
    });
  };

  const handleDayPress = (date: Date) => {
    setCurrentDate(date);
    setViewMode("day");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header */}
      <View className="px-4 py-3">
        {/* Title */}
        <Text className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Meal Plan
        </Text>

        {/* View Mode Selector */}
        <ViewModeSelector value={viewMode} onChange={setViewMode} />
      </View>

      {/* Date Navigation */}
      <View className="px-4 py-3">
        <MonthNavigationHeader
          currentDate={currentDate}
          onPreviousMonth={handlePrevious}
          onNextMonth={handleNext}
          viewMode={viewMode}
        />
      </View>

      {/* Content - Conditional based on view mode */}
      <View className="flex-1">
        {loading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#1F024B" />
          </View>
        )}

        {!loading && error && (
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-center text-red-500">{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <>
            {viewMode === "day" && (
              <DayView meals={currentMeals} currentDate={currentDate} />
            )}

            {viewMode === "week" && (
              <WeekView meals={currentMeals} currentDate={currentDate} />
            )}

            {viewMode === "month" && (
              <MonthView
                meals={currentMeals}
                currentDate={currentDate}
                onDayPress={handleDayPress}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
import { startOfWeek, startOfMonth } from "date-fns";
