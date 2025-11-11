/**
 * Mock Data for Home Screen Development
 * This will be replaced with real API data in the future
 */

import { Meal } from "@/types/nutrition";
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
