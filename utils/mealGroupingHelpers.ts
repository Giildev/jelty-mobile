/**
 * Meal Grouping Helper Functions
 * Utilities to group and organize meals by date, week, month, etc.
 */

import type { ScheduledMeal, DailyMealPlan } from "@/types/nutrition";
import { sortMealsByTime } from "./mealTimeHelpers";

/**
 * Groups recipes/meals by their date
 * @param meals - Array of scheduled meals
 * @returns Record with date as key and meals array as value
 */
export function groupMealsByDate(
  meals: ScheduledMeal[]
): Record<string, ScheduledMeal[]> {
  return meals.reduce(
    (acc, meal) => {
      const date = meal.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(meal);
      return acc;
    },
    {} as Record<string, ScheduledMeal[]>
  );
}

/**
 * Groups meals by date and returns as DailyMealPlan array
 * Meals are sorted by time within each day
 * @param meals - Array of scheduled meals
 * @returns Array of DailyMealPlan objects, sorted by date
 */
export function groupMealsAsDailyPlans(
  meals: ScheduledMeal[]
): DailyMealPlan[] {
  const grouped = groupMealsByDate(meals);

  return Object.entries(grouped)
    .map(([date, dayMeals]) => ({
      date,
      meals: sortMealsByTime(dayMeals),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Filters meals for a specific date
 * @param meals - Array of scheduled meals
 * @param date - Date string in YYYY-MM-DD format
 * @returns Array of meals for that date, sorted by time
 */
export function getMealsForDate(
  meals: ScheduledMeal[],
  date: string
): ScheduledMeal[] {
  const filtered = meals.filter((meal) => meal.date === date);
  return sortMealsByTime(filtered);
}

/**
 * Filters meals for a date range
 * @param meals - Array of scheduled meals
 * @param startDate - Start date string in YYYY-MM-DD format
 * @param endDate - End date string in YYYY-MM-DD format
 * @returns Array of meals within the date range
 */
export function getMealsForDateRange(
  meals: ScheduledMeal[],
  startDate: string,
  endDate: string
): ScheduledMeal[] {
  return meals.filter(
    (meal) => meal.date >= startDate && meal.date <= endDate
  );
}

/**
 * Gets meals for the current week (Monday to Sunday)
 * @param meals - Array of scheduled meals
 * @param referenceDate - Optional reference date (defaults to today)
 * @returns Array of meals for the current week
 */
export function getMealsForCurrentWeek(
  meals: ScheduledMeal[],
  referenceDate: Date = new Date()
): ScheduledMeal[] {
  const monday = getMonday(referenceDate);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const startDate = formatDateToISO(monday);
  const endDate = formatDateToISO(sunday);

  return getMealsForDateRange(meals, startDate, endDate);
}

/**
 * Gets meals for the current month
 * @param meals - Array of scheduled meals
 * @param referenceDate - Optional reference date (defaults to today)
 * @returns Array of meals for the current month
 */
export function getMealsForCurrentMonth(
  meals: ScheduledMeal[],
  referenceDate: Date = new Date()
): ScheduledMeal[] {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDate = formatDateToISO(firstDay);
  const endDate = formatDateToISO(lastDay);

  return getMealsForDateRange(meals, startDate, endDate);
}

/**
 * Helper: Gets the Monday of the week for a given date
 */
function getMonday(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(date.setDate(diff));
}

/**
 * Helper: Formats a Date object to ISO date string (YYYY-MM-DD)
 */
function formatDateToISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Gets today's date in YYYY-MM-DD format
 * @returns Today's date string
 */
export function getTodayDateString(): string {
  return formatDateToISO(new Date());
}
