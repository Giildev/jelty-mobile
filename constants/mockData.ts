/**
 * Mock Data for Home Screen Development
 * This will be replaced with real API data in the future
 */

import { Meal, ScheduledMeal, WeeklyMealPlan } from "@/types/nutrition";
import { Exercise } from "@/types/workout";
import { DailyProgress, Streak } from "@/types/progress";

// Mock Meals
export const MOCK_MEALS: Meal[] = [
  {
    id: "1",
    name: "Breakfast",
    calories: 320,
    macros: {
      carbs: 45,
      protein: 12,
      fat: 8,
    },
  },
  {
    id: "2",
    name: "Morning Snack",
    calories: 95,
    macros: {
      carbs: 15,
      protein: 3,
      fat: 2,
    },
  },
  {
    id: "3",
    name: "Lunch",
    calories: 465,
    macros: {
      carbs: 52,
      protein: 28,
      fat: 15,
    },
  },
  {
    id: "4",
    name: "Afternoon Snack",
    calories: 140,
    macros: {
      carbs: 20,
      protein: 5,
      fat: 6,
    },
  },
  {
    id: "5",
    name: "Dinner",
    calories: 460,
    macros: {
      carbs: 38,
      protein: 32,
      fat: 18,
    },
  },
];

// Mock Exercises
export const MOCK_EXERCISES: Exercise[] = [
  {
    id: "1",
    name: "Press de Banca",
    sets: 4,
    reps: 8,
    rir: 2,
    muscleGroup: "Chest",
  },
  {
    id: "2",
    name: "Press Militar",
    sets: 3,
    reps: 10,
    rir: 2,
    muscleGroup: "Shoulders",
  },
  {
    id: "3",
    name: "Extensiones de Tríceps",
    sets: 3,
    reps: 12,
    rir: 1,
    muscleGroup: "Triceps",
  },
  {
    id: "4",
    name: "Curl de Bíceps",
    sets: 3,
    reps: 12,
    rir: 2,
    muscleGroup: "Biceps",
  },
];

// Mock Daily Progress
export const MOCK_PROGRESS: DailyProgress = {
  date: new Date().toISOString(),
  caloriesConsumed: 1480,
  caloriesTarget: 2100,
  steps: 8432,
  stepsTarget: 10000,
  weightChange: -0.2, // kg lost
  exercisesCompleted: 3,
  exercisesTotal: 4,
  completionPercentage: 85,
};

// Mock Streak
export const MOCK_STREAK: Streak = {
  currentStreak: 5,
  longestStreak: 12,
  lastActiveDate: new Date().toISOString(),
};

// Mock Scheduled Meals for Meal Plan Calendar
export const MOCK_SCHEDULED_MEALS: ScheduledMeal[] = [
  // Sunday, Nov 10, 2025
  {
    id: "m1-1",
    name: "Oatmeal with Berries",
    calories: 320,
    macros: { carbs: 45, protein: 12, fat: 8 },
    date: "2025-11-10",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m1-2",
    name: "Greek Yogurt & Nuts",
    calories: 180,
    macros: { carbs: 12, protein: 15, fat: 8 },
    date: "2025-11-10",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m1-3",
    name: "Grilled Chicken Salad",
    calories: 450,
    macros: { carbs: 15, protein: 35, fat: 28 },
    date: "2025-11-10",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m1-4",
    name: "Apple with Almond Butter",
    calories: 200,
    macros: { carbs: 25, protein: 5, fat: 12 },
    date: "2025-11-10",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m1-5",
    name: "Salmon with Quinoa",
    calories: 520,
    macros: { carbs: 35, protein: 40, fat: 22 },
    date: "2025-11-10",
    time: "19:00",
    type: "dinner",
  },

  // Monday, Nov 11, 2025
  {
    id: "m2-1",
    name: "Scrambled Eggs & Toast",
    calories: 380,
    macros: { carbs: 35, protein: 20, fat: 18 },
    date: "2025-11-11",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m2-2",
    name: "Protein Smoothie",
    calories: 280,
    macros: { carbs: 30, protein: 25, fat: 8 },
    date: "2025-11-11",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m2-3",
    name: "Turkey & Avocado Wrap",
    calories: 480,
    macros: { carbs: 40, protein: 32, fat: 20 },
    date: "2025-11-11",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m2-4",
    name: "Hummus & Veggies",
    calories: 180,
    macros: { carbs: 18, protein: 6, fat: 10 },
    date: "2025-11-11",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m2-5",
    name: "Steak with Sweet Potato",
    calories: 580,
    macros: { carbs: 45, protein: 42, fat: 24 },
    date: "2025-11-11",
    time: "19:00",
    type: "dinner",
  },

  // Tuesday, Nov 12, 2025
  {
    id: "m3-1",
    name: "Protein Pancakes",
    calories: 350,
    macros: { carbs: 42, protein: 28, fat: 10 },
    date: "2025-11-12",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m3-2",
    name: "Cottage Cheese & Fruit",
    calories: 220,
    macros: { carbs: 28, protein: 18, fat: 4 },
    date: "2025-11-12",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m3-3",
    name: "Chicken Rice Bowl",
    calories: 520,
    macros: { carbs: 55, protein: 38, fat: 16 },
    date: "2025-11-12",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m3-4",
    name: "Protein Bar",
    calories: 250,
    macros: { carbs: 30, protein: 20, fat: 8 },
    date: "2025-11-12",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m3-5",
    name: "Baked Cod with Vegetables",
    calories: 420,
    macros: { carbs: 25, protein: 45, fat: 12 },
    date: "2025-11-12",
    time: "19:00",
    type: "dinner",
  },

  // Wednesday, Nov 13, 2025
  {
    id: "m4-1",
    name: "Oatmeal with Berries",
    calories: 320,
    macros: { carbs: 45, protein: 12, fat: 8 },
    date: "2025-11-13",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m4-2",
    name: "Greek Yogurt & Nuts",
    calories: 180,
    macros: { carbs: 12, protein: 15, fat: 8 },
    date: "2025-11-13",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m4-3",
    name: "Tuna Salad",
    calories: 380,
    macros: { carbs: 12, protein: 35, fat: 20 },
    date: "2025-11-13",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m4-4",
    name: "Apple with Almond Butter",
    calories: 200,
    macros: { carbs: 25, protein: 5, fat: 12 },
    date: "2025-11-13",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m4-5",
    name: "Chicken Stir Fry",
    calories: 480,
    macros: { carbs: 38, protein: 42, fat: 18 },
    date: "2025-11-13",
    time: "19:00",
    type: "dinner",
  },

  // Thursday, Nov 14, 2025
  {
    id: "m5-1",
    name: "Breakfast Burrito",
    calories: 450,
    macros: { carbs: 48, protein: 25, fat: 18 },
    date: "2025-11-14",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m5-2",
    name: "Protein Smoothie",
    calories: 280,
    macros: { carbs: 30, protein: 25, fat: 8 },
    date: "2025-11-14",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m5-3",
    name: "Grilled Chicken Salad",
    calories: 450,
    macros: { carbs: 15, protein: 35, fat: 28 },
    date: "2025-11-14",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m5-4",
    name: "Hummus & Veggies",
    calories: 180,
    macros: { carbs: 18, protein: 6, fat: 10 },
    date: "2025-11-14",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m5-5",
    name: "Salmon with Quinoa",
    calories: 520,
    macros: { carbs: 35, protein: 40, fat: 22 },
    date: "2025-11-14",
    time: "19:00",
    type: "dinner",
  },

  // Friday, Nov 15, 2025
  {
    id: "m6-1",
    name: "French Toast",
    calories: 420,
    macros: { carbs: 52, protein: 15, fat: 16 },
    date: "2025-11-15",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m6-2",
    name: "Cottage Cheese & Fruit",
    calories: 220,
    macros: { carbs: 28, protein: 18, fat: 4 },
    date: "2025-11-15",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m6-3",
    name: "Turkey & Avocado Wrap",
    calories: 480,
    macros: { carbs: 40, protein: 32, fat: 20 },
    date: "2025-11-15",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m6-4",
    name: "Protein Bar",
    calories: 250,
    macros: { carbs: 30, protein: 20, fat: 8 },
    date: "2025-11-15",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m6-5",
    name: "Caesar Salad with Chicken",
    calories: 480,
    macros: { carbs: 20, protein: 38, fat: 28 },
    date: "2025-11-15",
    time: "19:00",
    type: "dinner",
  },

  // Saturday, Nov 16, 2025
  {
    id: "m7-1",
    name: "Scrambled Eggs & Toast",
    calories: 380,
    macros: { carbs: 35, protein: 20, fat: 18 },
    date: "2025-11-16",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m7-2",
    name: "Greek Yogurt & Nuts",
    calories: 180,
    macros: { carbs: 12, protein: 15, fat: 8 },
    date: "2025-11-16",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m7-3",
    name: "Chicken Rice Bowl",
    calories: 520,
    macros: { carbs: 55, protein: 38, fat: 16 },
    date: "2025-11-16",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m7-4",
    name: "Apple with Almond Butter",
    calories: 200,
    macros: { carbs: 25, protein: 5, fat: 12 },
    date: "2025-11-16",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m7-5",
    name: "Beef Tacos",
    calories: 550,
    macros: { carbs: 42, protein: 35, fat: 26 },
    date: "2025-11-16",
    time: "19:00",
    type: "dinner",
  },
];

// Mock Weekly Meal Plan
export const MOCK_WEEKLY_MEAL_PLAN: WeeklyMealPlan = {
  weekStart: "2025-11-10", // Sunday
  meals: MOCK_SCHEDULED_MEALS,
};
