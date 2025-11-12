/**
 * Mock Data for Home Screen Development
 * This will be replaced with real API data in the future
 */

import { Meal, ScheduledMeal, WeeklyMealPlan, MealDetail } from "@/types/nutrition";
import {
  Exercise,
  ScheduledExercise,
  WeeklyWorkoutPlan,
  ExerciseDetail,
} from "@/types/workout";
import { DailyProgress, Streak } from "@/types/progress";
import { GroceryItem } from "@/types/grocery";

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
    name: "Bench Press",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    muscleGroup: "Chest",
  },
  {
    id: "2",
    name: "Military Press",
    sets: 3,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Shoulders",
  },
  {
    id: "3",
    name: "Tricep Extensions",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    muscleGroup: "Triceps",
  },
  {
    id: "4",
    name: "Bicep Curls",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
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
    description: "Warm oatmeal topped with fresh mixed berries and a drizzle of honey",
    calories: 320,
    macros: { carbs: 45, protein: 12, fat: 8 },
    date: "2025-11-10",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m1-2",
    name: "Greek Yogurt & Nuts",
    description: "Creamy Greek yogurt with almonds and walnuts",
    calories: 180,
    macros: { carbs: 12, protein: 15, fat: 8 },
    date: "2025-11-10",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m1-3",
    name: "Grilled Chicken Salad",
    description: "Fresh mixed greens with grilled chicken breast, cherry tomatoes, and balsamic dressing",
    calories: 450,
    macros: { carbs: 15, protein: 35, fat: 28 },
    date: "2025-11-10",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m1-4",
    name: "Apple with Almond Butter",
    description: "Sliced apple with natural almond butter",
    calories: 200,
    macros: { carbs: 25, protein: 5, fat: 12 },
    date: "2025-11-10",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m1-5",
    name: "Salmon with Quinoa",
    description: "Pan-seared salmon fillet served with fluffy quinoa and roasted vegetables",
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
    description: "Fluffy scrambled eggs with whole grain toast and avocado",
    calories: 380,
    macros: { carbs: 35, protein: 20, fat: 18 },
    date: "2025-11-11",
    time: "08:00",
    type: "breakfast",
  },
  {
    id: "m2-2",
    name: "Protein Smoothie",
    description: "Banana, spinach, protein powder, and almond milk blend",
    calories: 280,
    macros: { carbs: 30, protein: 25, fat: 8 },
    date: "2025-11-11",
    time: "10:30",
    type: "morning_snack",
  },
  {
    id: "m2-3",
    name: "Turkey & Avocado Wrap",
    description: "Whole wheat wrap with sliced turkey, avocado, lettuce, and tomato",
    calories: 480,
    macros: { carbs: 40, protein: 32, fat: 20 },
    date: "2025-11-11",
    time: "13:00",
    type: "lunch",
  },
  {
    id: "m2-4",
    name: "Hummus & Veggies",
    description: "Classic hummus with carrot sticks, cucumber, and bell peppers",
    calories: 180,
    macros: { carbs: 18, protein: 6, fat: 10 },
    date: "2025-11-11",
    time: "16:00",
    type: "afternoon_snack",
  },
  {
    id: "m2-5",
    name: "Steak with Sweet Potato",
    description: "Grilled ribeye steak with baked sweet potato and green beans",
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
    description: "High-protein pancakes with fresh blueberries and sugar-free syrup",
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

// Mock Scheduled Exercises for Workout Plan Calendar
export const MOCK_SCHEDULED_EXERCISES: ScheduledExercise[] = [
  // Sunday, Nov 10, 2025 - Upper Body Day
  {
    id: "e1-1",
    name: "Arm Circles",
    description: "Dynamic shoulder warm-up with controlled circular movements",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    date: "2025-11-10",
    time: "08:00",
    type: "warm-up",
  },
  {
    id: "e1-2",
    name: "Band Pull-Aparts",
    description: "Resistance band exercise to activate rear delts and upper back",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    date: "2025-11-10",
    time: "08:05",
    type: "warm-up",
  },
  {
    id: "e1-3",
    name: "Bench Press",
    description: "Compound chest exercise using barbell for upper body strength",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    muscleGroup: "Chest",
    date: "2025-11-10",
    time: "08:15",
    type: "main",
  },
  {
    id: "e1-4",
    name: "Incline Dumbbell Press",
    description: "Incline press targeting upper chest with dumbbells for full range of motion",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Chest",
    date: "2025-11-10",
    time: "08:35",
    type: "main",
  },
  {
    id: "e1-5",
    name: "Cable Flyes",
    description: "Isolation movement for chest with constant tension throughout the motion",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    muscleGroup: "Chest",
    date: "2025-11-10",
    time: "08:55",
    type: "main",
  },
  {
    id: "e1-6",
    name: "Overhead Press",
    description: "Standing barbell press for shoulder strength and stability",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 90,
    muscleGroup: "Shoulders",
    date: "2025-11-10",
    time: "09:10",
    type: "main",
  },
  {
    id: "e1-7",
    name: "Lateral Raises",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    muscleGroup: "Shoulders",
    date: "2025-11-10",
    time: "09:30",
    type: "main",
  },
  {
    id: "e1-8",
    name: "Tricep Dips",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    muscleGroup: "Triceps",
    date: "2025-11-10",
    time: "09:45",
    type: "main",
  },
  {
    id: "e1-9",
    name: "Chest Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-10",
    time: "10:00",
    type: "stretch",
  },
  {
    id: "e1-10",
    name: "Shoulder Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-10",
    time: "10:05",
    type: "stretch",
  },

  // Monday, Nov 11, 2025 - Lower Body Day
  {
    id: "e2-1",
    name: "Leg Swings",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    date: "2025-11-11",
    time: "08:00",
    type: "warm-up",
  },
  {
    id: "e2-2",
    name: "Hip Circles",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    date: "2025-11-11",
    time: "08:05",
    type: "warm-up",
  },
  {
    id: "e2-3",
    name: "Back Squats",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 180,
    muscleGroup: "Legs",
    date: "2025-11-11",
    time: "08:15",
    type: "main",
  },
  {
    id: "e2-4",
    name: "Romanian Deadlifts",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 120,
    muscleGroup: "Hamstrings",
    date: "2025-11-11",
    time: "08:40",
    type: "main",
  },
  {
    id: "e2-5",
    name: "Bulgarian Split Squats",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 90,
    muscleGroup: "Legs",
    date: "2025-11-11",
    time: "09:05",
    type: "main",
  },
  {
    id: "e2-6",
    name: "Leg Press",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 90,
    muscleGroup: "Legs",
    date: "2025-11-11",
    time: "09:25",
    type: "main",
  },
  {
    id: "e2-7",
    name: "Leg Curls",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    muscleGroup: "Hamstrings",
    date: "2025-11-11",
    time: "09:45",
    type: "main",
  },
  {
    id: "e2-8",
    name: "Calf Raises",
    sets: 4,
    reps: 20,
    rir: 1,
    restTime: 45,
    muscleGroup: "Calves",
    date: "2025-11-11",
    time: "10:00",
    type: "main",
  },
  {
    id: "e2-9",
    name: "Quad Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-11",
    time: "10:15",
    type: "stretch",
  },
  {
    id: "e2-10",
    name: "Hamstring Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-11",
    time: "10:20",
    type: "stretch",
  },

  // Tuesday, Nov 12, 2025 - Pull Day
  {
    id: "e3-1",
    name: "Scapular Pull-Ups",
    sets: 2,
    reps: 10,
    rir: 5,
    restTime: 30,
    date: "2025-11-12",
    time: "08:00",
    type: "warm-up",
  },
  {
    id: "e3-2",
    name: "Dead Hangs",
    sets: 2,
    reps: 1,
    rir: 5,
    restTime: 30,
    date: "2025-11-12",
    time: "08:05",
    type: "warm-up",
  },
  {
    id: "e3-3",
    name: "Deadlifts",
    sets: 4,
    reps: 6,
    rir: 2,
    restTime: 180,
    muscleGroup: "Back",
    date: "2025-11-12",
    time: "08:15",
    type: "main",
  },
  {
    id: "e3-4",
    name: "Pull-Ups",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    muscleGroup: "Back",
    date: "2025-11-12",
    time: "08:40",
    type: "main",
  },
  {
    id: "e3-5",
    name: "Barbell Rows",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Back",
    date: "2025-11-12",
    time: "09:00",
    type: "main",
  },
  {
    id: "e3-6",
    name: "Face Pulls",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    muscleGroup: "Back",
    date: "2025-11-12",
    time: "09:20",
    type: "main",
  },
  {
    id: "e3-7",
    name: "Bicep Curls",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    muscleGroup: "Biceps",
    date: "2025-11-12",
    time: "09:35",
    type: "main",
  },
  {
    id: "e3-8",
    name: "Hammer Curls",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    muscleGroup: "Biceps",
    date: "2025-11-12",
    time: "09:50",
    type: "main",
  },
  {
    id: "e3-9",
    name: "Back Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-12",
    time: "10:05",
    type: "stretch",
  },
  {
    id: "e3-10",
    name: "Bicep Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-12",
    time: "10:10",
    type: "stretch",
  },

  // Wednesday, Nov 13, 2025 - Upper Body Day
  {
    id: "e4-1",
    name: "Arm Circles",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    date: "2025-11-13",
    time: "08:00",
    type: "warm-up",
  },
  {
    id: "e4-2",
    name: "Band Pull-Aparts",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    date: "2025-11-13",
    time: "08:05",
    type: "warm-up",
  },
  {
    id: "e4-3",
    name: "Dumbbell Press",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Chest",
    date: "2025-11-13",
    time: "08:15",
    type: "main",
  },
  {
    id: "e4-4",
    name: "Cable Crossovers",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    muscleGroup: "Chest",
    date: "2025-11-13",
    time: "08:35",
    type: "main",
  },
  {
    id: "e4-5",
    name: "Arnold Press",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Shoulders",
    date: "2025-11-13",
    time: "08:50",
    type: "main",
  },
  {
    id: "e4-6",
    name: "Front Raises",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    muscleGroup: "Shoulders",
    date: "2025-11-13",
    time: "09:10",
    type: "main",
  },
  {
    id: "e4-7",
    name: "Skull Crushers",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    muscleGroup: "Triceps",
    date: "2025-11-13",
    time: "09:25",
    type: "main",
  },
  {
    id: "e4-8",
    name: "Cable Pushdowns",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    muscleGroup: "Triceps",
    date: "2025-11-13",
    time: "09:40",
    type: "main",
  },
  {
    id: "e4-9",
    name: "Chest Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-13",
    time: "09:55",
    type: "stretch",
  },
  {
    id: "e4-10",
    name: "Tricep Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-13",
    time: "10:00",
    type: "stretch",
  },

  // Thursday, Nov 14, 2025 - Lower Body Day
  {
    id: "e5-1",
    name: "Leg Swings",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    date: "2025-11-14",
    time: "08:00",
    type: "warm-up",
  },
  {
    id: "e5-2",
    name: "Bodyweight Squats",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    date: "2025-11-14",
    time: "08:05",
    type: "warm-up",
  },
  {
    id: "e5-3",
    name: "Front Squats",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 150,
    muscleGroup: "Legs",
    date: "2025-11-14",
    time: "08:15",
    type: "main",
  },
  {
    id: "e5-4",
    name: "Walking Lunges",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 90,
    muscleGroup: "Legs",
    date: "2025-11-14",
    time: "08:40",
    type: "main",
  },
  {
    id: "e5-5",
    name: "Leg Extensions",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    muscleGroup: "Quads",
    date: "2025-11-14",
    time: "09:00",
    type: "main",
  },
  {
    id: "e5-6",
    name: "Seated Leg Curls",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 60,
    muscleGroup: "Hamstrings",
    date: "2025-11-14",
    time: "09:15",
    type: "main",
  },
  {
    id: "e5-7",
    name: "Hip Thrusts",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 90,
    muscleGroup: "Glutes",
    date: "2025-11-14",
    time: "09:30",
    type: "main",
  },
  {
    id: "e5-8",
    name: "Standing Calf Raises",
    sets: 4,
    reps: 20,
    rir: 1,
    restTime: 45,
    muscleGroup: "Calves",
    date: "2025-11-14",
    time: "09:50",
    type: "main",
  },
  {
    id: "e5-9",
    name: "Hip Flexor Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-14",
    time: "10:05",
    type: "stretch",
  },
  {
    id: "e5-10",
    name: "Glute Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-14",
    time: "10:10",
    type: "stretch",
  },

  // Friday, Nov 15, 2025 - Full Body Day
  {
    id: "e6-1",
    name: "Jumping Jacks",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    date: "2025-11-15",
    time: "08:00",
    type: "warm-up",
  },
  {
    id: "e6-2",
    name: "High Knees",
    sets: 2,
    reps: 30,
    rir: 5,
    restTime: 30,
    date: "2025-11-15",
    time: "08:05",
    type: "warm-up",
  },
  {
    id: "e6-3",
    name: "Power Cleans",
    sets: 4,
    reps: 6,
    rir: 2,
    restTime: 150,
    muscleGroup: "Full Body",
    date: "2025-11-15",
    time: "08:15",
    type: "main",
  },
  {
    id: "e6-4",
    name: "Push Press",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    muscleGroup: "Shoulders",
    date: "2025-11-15",
    time: "08:40",
    type: "main",
  },
  {
    id: "e6-5",
    name: "T-Bar Rows",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Back",
    date: "2025-11-15",
    time: "09:00",
    type: "main",
  },
  {
    id: "e6-6",
    name: "Goblet Squats",
    sets: 3,
    reps: 15,
    rir: 2,
    restTime: 60,
    muscleGroup: "Legs",
    date: "2025-11-15",
    time: "09:20",
    type: "main",
  },
  {
    id: "e6-7",
    name: "Dumbbell Lunges",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    muscleGroup: "Legs",
    date: "2025-11-15",
    time: "09:35",
    type: "main",
  },
  {
    id: "e6-8",
    name: "Plank",
    sets: 3,
    reps: 1,
    rir: 1,
    restTime: 60,
    muscleGroup: "Core",
    date: "2025-11-15",
    time: "09:50",
    type: "main",
  },
  {
    id: "e6-9",
    name: "Full Body Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-15",
    time: "10:05",
    type: "stretch",
  },
  {
    id: "e6-10",
    name: "Deep Breathing",
    sets: 2,
    reps: 10,
    rir: 0,
    restTime: 30,
    date: "2025-11-15",
    time: "10:10",
    type: "stretch",
  },

  // Saturday, Nov 16, 2025 - Upper Body Day
  {
    id: "e7-1",
    name: "Resistance Band Rows",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    date: "2025-11-16",
    time: "08:00",
    type: "warm-up",
  },
  {
    id: "e7-2",
    name: "Push-Up Plus",
    sets: 2,
    reps: 10,
    rir: 5,
    restTime: 30,
    date: "2025-11-16",
    time: "08:05",
    type: "warm-up",
  },
  {
    id: "e7-3",
    name: "Incline Barbell Press",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    muscleGroup: "Chest",
    date: "2025-11-16",
    time: "08:15",
    type: "main",
  },
  {
    id: "e7-4",
    name: "Dumbbell Flyes",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    muscleGroup: "Chest",
    date: "2025-11-16",
    time: "08:35",
    type: "main",
  },
  {
    id: "e7-5",
    name: "Seated Dumbbell Press",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Shoulders",
    date: "2025-11-16",
    time: "08:50",
    type: "main",
  },
  {
    id: "e7-6",
    name: "Reverse Flyes",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    muscleGroup: "Shoulders",
    date: "2025-11-16",
    time: "09:10",
    type: "main",
  },
  {
    id: "e7-7",
    name: "Close-Grip Bench",
    sets: 3,
    reps: 10,
    rir: 2,
    restTime: 90,
    muscleGroup: "Triceps",
    date: "2025-11-16",
    time: "09:25",
    type: "main",
  },
  {
    id: "e7-8",
    name: "Overhead Extensions",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    muscleGroup: "Triceps",
    date: "2025-11-16",
    time: "09:40",
    type: "main",
  },
  {
    id: "e7-9",
    name: "Shoulder Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-16",
    time: "09:55",
    type: "stretch",
  },
  {
    id: "e7-10",
    name: "Tricep Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    date: "2025-11-16",
    time: "10:00",
    type: "stretch",
  },
];

// Mock Weekly Workout Plan
export const MOCK_WEEKLY_WORKOUT_PLAN: WeeklyWorkoutPlan = {
  weekStart: "2025-11-10", // Sunday
  exercises: MOCK_SCHEDULED_EXERCISES,
};

/**
 * Mock Grocery Items
 * Consolidated shopping list from all meals in the monthly plan
 * Includes variety of categories, purchase frequencies, and storage types
 */
export const MOCK_GROCERY_ITEMS: GroceryItem[] = [
  // VEGETABLES (mostly weekly, fresh)
  {
    id: "g1",
    ingredientId: "ing1",
    name: "Spinach",
    quantity: 200,
    unit: "g",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-3", "m2-3"],
  },
  {
    id: "g2",
    ingredientId: "ing2",
    name: "Tomatoes",
    quantity: 3,
    unit: "pieces",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: true,
    isCustom: false,
    mealSources: ["m1-3", "m4-3"],
  },
  {
    id: "g3",
    ingredientId: "ing3",
    name: "Bell peppers",
    quantity: 2,
    unit: "pieces",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-5", "m4-5"],
  },
  {
    id: "g4",
    ingredientId: "ing4",
    name: "Broccoli",
    quantity: 300,
    unit: "g",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m3-5"],
  },
  {
    id: "g5",
    ingredientId: "ing5",
    name: "Carrots",
    quantity: 500,
    unit: "g",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-4", "m5-4"],
  },
  {
    id: "g6",
    ingredientId: "ing6",
    name: "Lettuce",
    quantity: 1,
    unit: "pieces",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-3", "m5-3", "m6-5"],
  },
  {
    id: "g7",
    ingredientId: "ing7",
    name: "Avocado",
    quantity: 4,
    unit: "pieces",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-3", "m6-3"],
  },
  {
    id: "g8",
    ingredientId: "ing8",
    name: "Sweet Potato",
    quantity: 800,
    unit: "g",
    category: "vegetables",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-5"],
  },

  // PROTEINS (mix of weekly fresh and frozen)
  {
    id: "g9",
    ingredientId: "ing9",
    name: "Chicken breast",
    quantity: 500,
    unit: "g",
    category: "proteins",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-3", "m3-3", "m4-5", "m5-3", "m6-5"],
  },
  {
    id: "g10",
    ingredientId: "ing10",
    name: "Salmon fillet",
    quantity: 300,
    unit: "g",
    category: "proteins",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-5", "m5-5"],
  },
  {
    id: "g11",
    ingredientId: "ing11",
    name: "Eggs",
    quantity: 12,
    unit: "pieces",
    category: "proteins",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: true,
    isCustom: false,
    mealSources: ["m2-1", "m7-1"],
  },
  {
    id: "g12",
    ingredientId: "ing12",
    name: "Turkey breast",
    quantity: 300,
    unit: "g",
    category: "proteins",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-3", "m6-3"],
  },
  {
    id: "g13",
    ingredientId: "ing13",
    name: "Beef steak",
    quantity: 400,
    unit: "g",
    category: "proteins",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-5", "m7-5"],
  },
  {
    id: "g14",
    ingredientId: "ing14",
    name: "Cod fillet",
    quantity: 250,
    unit: "g",
    category: "proteins",
    purchaseFrequency: "weekly",
    storageType: "frozen",
    isChecked: false,
    isCustom: false,
    mealSources: ["m3-5"],
  },
  {
    id: "g15",
    ingredientId: "ing15",
    name: "Tuna",
    quantity: 200,
    unit: "g",
    category: "proteins",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m4-3"],
  },

  // GRAINS (mostly monthly, pantry)
  {
    id: "g16",
    ingredientId: "ing16",
    name: "Brown rice",
    quantity: 1,
    unit: "kg",
    category: "grains",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m3-3", "m7-3"],
  },
  {
    id: "g17",
    ingredientId: "ing17",
    name: "Quinoa",
    quantity: 500,
    unit: "g",
    category: "grains",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-5", "m5-5"],
  },
  {
    id: "g18",
    ingredientId: "ing18",
    name: "Oats",
    quantity: 1,
    unit: "kg",
    category: "grains",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-1", "m4-1"],
  },
  {
    id: "g19",
    ingredientId: "ing19",
    name: "Whole wheat bread",
    quantity: 1,
    unit: "pieces",
    category: "grains",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-1", "m7-1"],
  },
  {
    id: "g20",
    ingredientId: "ing20",
    name: "Whole wheat tortillas",
    quantity: 8,
    unit: "pieces",
    category: "grains",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-3", "m5-1", "m6-3", "m7-5"],
  },

  // DAIRY (weekly, fresh)
  {
    id: "g21",
    ingredientId: "ing21",
    name: "Greek yogurt",
    quantity: 500,
    unit: "g",
    category: "dairy",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-2", "m4-2", "m7-2"],
  },
  {
    id: "g22",
    ingredientId: "ing22",
    name: "Cottage cheese",
    quantity: 400,
    unit: "g",
    category: "dairy",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m3-2", "m6-2"],
  },
  {
    id: "g23",
    ingredientId: "ing23",
    name: "Milk",
    quantity: 2,
    unit: "l",
    category: "dairy",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-2", "m3-1", "m5-2"],
  },
  {
    id: "g24",
    ingredientId: "ing24",
    name: "Cheese",
    quantity: 200,
    unit: "g",
    category: "dairy",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m5-1", "m6-5"],
  },

  // FRUITS (weekly, fresh)
  {
    id: "g25",
    ingredientId: "ing25",
    name: "Berries",
    quantity: 300,
    unit: "g",
    category: "fruits",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-1", "m4-1"],
  },
  {
    id: "g26",
    ingredientId: "ing26",
    name: "Bananas",
    quantity: 6,
    unit: "pieces",
    category: "fruits",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-2", "m5-2"],
  },
  {
    id: "g27",
    ingredientId: "ing27",
    name: "Apples",
    quantity: 4,
    unit: "pieces",
    category: "fruits",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-4", "m4-4", "m7-4"],
  },
  {
    id: "g28",
    ingredientId: "ing28",
    name: "Mixed fruit",
    quantity: 400,
    unit: "g",
    category: "fruits",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m3-2", "m6-2"],
  },

  // OILS & CONDIMENTS (monthly, pantry)
  {
    id: "g29",
    ingredientId: "ing29",
    name: "Olive oil",
    quantity: 500,
    unit: "ml",
    category: "oils",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: [],
  },
  {
    id: "g30",
    ingredientId: "ing30",
    name: "Almond butter",
    quantity: 350,
    unit: "g",
    category: "condiments",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-4", "m4-4", "m7-4"],
  },
  {
    id: "g31",
    ingredientId: "ing31",
    name: "Hummus",
    quantity: 400,
    unit: "g",
    category: "condiments",
    purchaseFrequency: "weekly",
    storageType: "fresh",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-4", "m5-4"],
  },

  // SPICES & OTHERS (monthly, pantry)
  {
    id: "g32",
    ingredientId: "ing32",
    name: "Mixed nuts",
    quantity: 300,
    unit: "g",
    category: "other",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m1-2", "m4-2", "m7-2"],
  },
  {
    id: "g33",
    ingredientId: "ing33",
    name: "Protein powder",
    quantity: 1,
    unit: "kg",
    category: "other",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m2-2", "m5-2"],
  },
  {
    id: "g34",
    ingredientId: "ing34",
    name: "Protein bars",
    quantity: 10,
    unit: "pieces",
    category: "other",
    purchaseFrequency: "monthly",
    storageType: "pantry",
    isChecked: false,
    isCustom: false,
    mealSources: ["m3-4", "m6-4"],
  },
];

/**
 * Detailed Meal Information with Gallery, Ingredients, and Preparation Steps
 * Used for the meal detail modal screen
 */
export const MEAL_DETAILS_MOCK: MealDetail[] = [
  // Grilled Chicken Salad
  {
    id: "m1-3",
    name: "Grilled Chicken Salad",
    calories: 450,
    macros: { carbs: 15, protein: 35, fat: 28 },
    description: "Fresh mixed greens with seasoned grilled chicken breast and vegetables",
    type: "lunch",
    servings: 1,
    prepTime: 15,
    cookTime: 15,
    gallery: [
      {
        id: "img-m1-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      },
      {
        id: "img-m1-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      },
      {
        id: "vid-m1-3-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Chicken Breast", quantity: 150, unit: "g", icon: "🍗" },
      { id: "ing-2", name: "Mixed Greens", quantity: 100, unit: "g", icon: "🥬" },
      { id: "ing-3", name: "Cherry Tomatoes", quantity: 80, unit: "g", icon: "🍅" },
      { id: "ing-4", name: "Cucumber", quantity: 60, unit: "g", icon: "🥒" },
      { id: "ing-5", name: "Olive Oil", quantity: 1, unit: "tbsp", icon: "🫒" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Season chicken breast with salt, pepper, and herbs. Grill for 6-8 minutes per side until cooked through.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Wash and chop mixed greens, cherry tomatoes, and cucumber into bite-sized pieces.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Slice grilled chicken and arrange over salad. Drizzle with olive oil and serve immediately.",
      },
    ],
  },

  // Salmon with Quinoa
  {
    id: "m1-5",
    name: "Salmon with Quinoa",
    calories: 520,
    macros: { carbs: 35, protein: 40, fat: 22 },
    description: "Pan-seared salmon fillet served over fluffy quinoa with roasted vegetables",
    type: "dinner",
    servings: 1,
    prepTime: 10,
    cookTime: 25,
    gallery: [
      {
        id: "img-m1-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
      },
      {
        id: "img-m1-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800",
      },
      {
        id: "img-m1-5-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Salmon Fillet", quantity: 150, unit: "g", icon: "🐟" },
      { id: "ing-2", name: "Quinoa", quantity: 80, unit: "g", icon: "🌾" },
      { id: "ing-3", name: "Broccoli", quantity: 100, unit: "g", icon: "🥦" },
      { id: "ing-4", name: "Lemon", quantity: 1, unit: "pieces", icon: "🍋" },
      { id: "ing-5", name: "Olive Oil", quantity: 1, unit: "tbsp", icon: "🫒" },
      { id: "ing-6", name: "Garlic", quantity: 2, unit: "cloves", icon: "🧄" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Rinse quinoa and cook in 1.5 cups water for 15 minutes. Let sit covered for 5 minutes, then fluff with fork.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Season salmon with salt, pepper, and minced garlic. Heat olive oil in a pan over medium-high heat.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Sear salmon skin-side down for 4-5 minutes, then flip and cook for another 3-4 minutes until cooked through.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Steam broccoli for 5-6 minutes until tender. Plate quinoa, top with salmon and broccoli. Squeeze lemon over the top.",
      },
    ],
  },

  // Oatmeal with Berries
  {
    id: "m1-1",
    name: "Oatmeal with Berries",
    calories: 320,
    macros: { carbs: 45, protein: 12, fat: 8 },
    description: "Creamy oatmeal topped with fresh berries and a drizzle of honey",
    type: "breakfast",
    servings: 1,
    prepTime: 5,
    cookTime: 10,
    gallery: [
      {
        id: "img-m1-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800",
      },
      {
        id: "img-m1-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Rolled Oats", quantity: 60, unit: "g", icon: "🌾" },
      { id: "ing-2", name: "Milk", quantity: 250, unit: "ml", icon: "🥛" },
      { id: "ing-3", name: "Mixed Berries", quantity: 100, unit: "g", icon: "🫐" },
      { id: "ing-4", name: "Honey", quantity: 1, unit: "tbsp", icon: "🍯" },
      { id: "ing-5", name: "Cinnamon", quantity: 1, unit: "tsp", icon: "🌰" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Combine oats and milk in a pot. Bring to a simmer over medium heat, stirring occasionally.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Cook for 5-7 minutes until oats are tender and creamy. Stir in cinnamon.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Pour into bowl, top with fresh berries and drizzle with honey. Serve warm.",
      },
    ],
  },

  // Greek Yogurt & Nuts
  {
    id: "m1-2",
    name: "Greek Yogurt & Nuts",
    calories: 180,
    macros: { carbs: 12, protein: 15, fat: 8 },
    description: "Protein-rich Greek yogurt with crunchy mixed nuts and a touch of honey",
    type: "morning_snack",
    servings: 1,
    prepTime: 3,
    cookTime: 0,
    gallery: [
      {
        id: "img-m1-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Greek Yogurt", quantity: 150, unit: "g", icon: "🥛" },
      { id: "ing-2", name: "Mixed Nuts", quantity: 30, unit: "g", icon: "🥜" },
      { id: "ing-3", name: "Honey", quantity: 0.5, unit: "tbsp", icon: "🍯" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Spoon Greek yogurt into a bowl.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Top with mixed nuts and drizzle honey over the top. Serve immediately.",
      },
    ],
  },

  // Apple with Almond Butter
  {
    id: "m1-4",
    name: "Apple with Almond Butter",
    calories: 200,
    macros: { carbs: 25, protein: 5, fat: 12 },
    description: "Crisp apple slices paired with creamy almond butter",
    type: "afternoon_snack",
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    gallery: [
      {
        id: "img-m1-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Apple", quantity: 1, unit: "pieces", icon: "🍎" },
      { id: "ing-2", name: "Almond Butter", quantity: 2, unit: "tbsp", icon: "🥜" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Wash apple and slice into 8 wedges, removing the core.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Arrange apple slices on a plate and serve with almond butter for dipping.",
      },
    ],
  },

  // Scrambled Eggs & Toast
  {
    id: "m2-1",
    name: "Scrambled Eggs & Toast",
    calories: 380,
    macros: { carbs: 35, protein: 20, fat: 18 },
    description: "Fluffy scrambled eggs served with whole wheat toast",
    type: "breakfast",
    servings: 1,
    prepTime: 5,
    cookTime: 10,
    gallery: [
      {
        id: "img-m2-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
      },
      {
        id: "vid-m2-1-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Eggs", quantity: 3, unit: "pieces", icon: "🥚" },
      { id: "ing-2", name: "Whole Wheat Bread", quantity: 2, unit: "slices", icon: "🍞" },
      { id: "ing-3", name: "Butter", quantity: 1, unit: "tbsp", icon: "🧈" },
      { id: "ing-4", name: "Milk", quantity: 2, unit: "tbsp", icon: "🥛" },
      { id: "ing-5", name: "Cheese", quantity: 30, unit: "g", icon: "🧀" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Crack eggs into a bowl, add milk, salt, and pepper. Whisk until well combined.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Heat butter in a non-stick pan over medium heat. Pour in egg mixture.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Gently stir eggs as they cook. Add cheese when almost set. Cook until fluffy, about 3-4 minutes.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Toast bread slices until golden. Serve eggs with toast.",
      },
    ],
  },

  // Protein Smoothie
  {
    id: "m2-2",
    name: "Protein Smoothie",
    calories: 280,
    macros: { carbs: 30, protein: 25, fat: 8 },
    description: "Refreshing protein-packed smoothie with banana, berries, and protein powder",
    type: "morning_snack",
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    gallery: [
      {
        id: "img-m2-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800",
      },
      {
        id: "img-m2-2-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1638176066666-ffb2f013c297?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Banana", quantity: 1, unit: "pieces", icon: "🍌" },
      { id: "ing-2", name: "Mixed Berries", quantity: 100, unit: "g", icon: "🫐" },
      { id: "ing-3", name: "Protein Powder", quantity: 30, unit: "g", icon: "💪" },
      { id: "ing-4", name: "Milk", quantity: 250, unit: "ml", icon: "🥛" },
      { id: "ing-5", name: "Ice", quantity: 5, unit: "cubes", icon: "🧊" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Add all ingredients to a blender: banana, berries, protein powder, milk, and ice.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Blend on high speed for 60 seconds until smooth and creamy.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Pour into a glass and serve immediately.",
      },
    ],
  },

  // Turkey & Avocado Wrap
  {
    id: "m2-3",
    name: "Turkey & Avocado Wrap",
    calories: 480,
    macros: { carbs: 40, protein: 32, fat: 20 },
    description: "Whole wheat wrap filled with sliced turkey, creamy avocado, and fresh vegetables",
    type: "lunch",
    servings: 1,
    prepTime: 10,
    cookTime: 0,
    gallery: [
      {
        id: "img-m2-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
      },
      {
        id: "img-m2-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Turkey Breast", quantity: 100, unit: "g", icon: "🦃" },
      { id: "ing-2", name: "Avocado", quantity: 1, unit: "pieces", icon: "🥑" },
      { id: "ing-3", name: "Whole Wheat Tortilla", quantity: 1, unit: "pieces", icon: "🌯" },
      { id: "ing-4", name: "Lettuce", quantity: 30, unit: "g", icon: "🥬" },
      { id: "ing-5", name: "Tomato", quantity: 1, unit: "pieces", icon: "🍅" },
      { id: "ing-6", name: "Mustard", quantity: 1, unit: "tsp", icon: "🍯" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Lay tortilla flat. Spread mustard evenly across the center.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Layer turkey slices, sliced avocado, lettuce, and tomato on the tortilla.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Fold in the sides, then roll tightly from bottom to top. Slice in half diagonally and serve.",
      },
    ],
  },

  // Hummus & Veggies
  {
    id: "m2-4",
    name: "Hummus & Veggies",
    calories: 180,
    macros: { carbs: 18, protein: 6, fat: 10 },
    description: "Creamy hummus served with colorful fresh vegetable sticks",
    type: "afternoon_snack",
    servings: 1,
    prepTime: 8,
    cookTime: 0,
    gallery: [
      {
        id: "img-m2-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1611688863699-b41d6f1073ee?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Hummus", quantity: 80, unit: "g", icon: "🥙" },
      { id: "ing-2", name: "Carrots", quantity: 100, unit: "g", icon: "🥕" },
      { id: "ing-3", name: "Cucumber", quantity: 80, unit: "g", icon: "🥒" },
      { id: "ing-4", name: "Bell Pepper", quantity: 80, unit: "g", icon: "🫑" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Wash and cut carrots, cucumber, and bell pepper into sticks.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Arrange vegetables on a plate with hummus in the center for dipping. Serve fresh.",
      },
    ],
  },

  // Steak with Sweet Potato
  {
    id: "m2-5",
    name: "Steak with Sweet Potato",
    calories: 580,
    macros: { carbs: 45, protein: 42, fat: 24 },
    description: "Grilled beef steak with roasted sweet potato and sautéed vegetables",
    type: "dinner",
    servings: 1,
    prepTime: 15,
    cookTime: 30,
    gallery: [
      {
        id: "img-m2-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800",
      },
      {
        id: "img-m2-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=800",
      },
      {
        id: "vid-m2-5-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Beef Steak", quantity: 150, unit: "g", icon: "🥩" },
      { id: "ing-2", name: "Sweet Potato", quantity: 200, unit: "g", icon: "🍠" },
      { id: "ing-3", name: "Asparagus", quantity: 100, unit: "g", icon: "🌱" },
      { id: "ing-4", name: "Garlic", quantity: 3, unit: "cloves", icon: "🧄" },
      { id: "ing-5", name: "Butter", quantity: 2, unit: "tbsp", icon: "🧈" },
      { id: "ing-6", name: "Rosemary", quantity: 1, unit: "sprig", icon: "🌿" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Preheat oven to 200°C (400°F). Cut sweet potato into wedges, toss with oil, salt, and pepper. Roast for 25-30 minutes.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Season steak with salt, pepper, and minced garlic. Let rest at room temperature for 10 minutes.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Heat a cast iron skillet over high heat. Sear steak 3-4 minutes per side for medium-rare. Add butter and rosemary in final minute, basting steak.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Sauté asparagus in remaining butter for 5 minutes. Let steak rest 5 minutes before slicing. Serve together.",
      },
    ],
  },

  // Protein Pancakes
  {
    id: "m3-1",
    name: "Protein Pancakes",
    calories: 350,
    macros: { carbs: 42, protein: 28, fat: 10 },
    description: "Fluffy protein-packed pancakes topped with fresh berries and maple syrup",
    type: "breakfast",
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    gallery: [
      {
        id: "img-m3-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
      },
      {
        id: "img-m3-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Protein Powder", quantity: 40, unit: "g", icon: "💪" },
      { id: "ing-2", name: "Oat Flour", quantity: 60, unit: "g", icon: "🌾" },
      { id: "ing-3", name: "Eggs", quantity: 2, unit: "pieces", icon: "🥚" },
      { id: "ing-4", name: "Banana", quantity: 1, unit: "pieces", icon: "🍌" },
      { id: "ing-5", name: "Milk", quantity: 100, unit: "ml", icon: "🥛" },
      { id: "ing-6", name: "Berries", quantity: 80, unit: "g", icon: "🫐" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Mash banana in a bowl. Add eggs, milk, protein powder, and oat flour. Mix until smooth batter forms.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Heat a non-stick pan over medium heat. Pour 1/4 cup batter per pancake.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Cook 2-3 minutes until bubbles form, then flip. Cook another 2 minutes until golden.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Stack pancakes on a plate, top with fresh berries, and serve warm.",
      },
    ],
  },

  // Chicken Rice Bowl
  {
    id: "m3-3",
    name: "Chicken Rice Bowl",
    calories: 520,
    macros: { carbs: 55, protein: 38, fat: 16 },
    description: "Seasoned grilled chicken over brown rice with roasted vegetables",
    type: "lunch",
    servings: 1,
    prepTime: 15,
    cookTime: 30,
    gallery: [
      {
        id: "img-m3-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800",
      },
      {
        id: "img-m3-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800",
      },
      {
        id: "vid-m3-3-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Chicken Breast", quantity: 150, unit: "g", icon: "🍗" },
      { id: "ing-2", name: "Brown Rice", quantity: 100, unit: "g", icon: "🍚" },
      { id: "ing-3", name: "Broccoli", quantity: 100, unit: "g", icon: "🥦" },
      { id: "ing-4", name: "Carrots", quantity: 80, unit: "g", icon: "🥕" },
      { id: "ing-5", name: "Soy Sauce", quantity: 2, unit: "tbsp", icon: "🍶" },
      { id: "ing-6", name: "Sesame Oil", quantity: 1, unit: "tsp", icon: "🫒" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Cook brown rice according to package instructions. Fluff and set aside.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Season chicken with salt and pepper. Grill or pan-sear for 6-7 minutes per side until cooked through.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Roast broccoli and carrots at 200°C (400°F) for 15-20 minutes until tender.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Slice chicken. Assemble bowl with rice, vegetables, and chicken. Drizzle with soy sauce and sesame oil.",
      },
    ],
  },

  // Baked Cod with Vegetables
  {
    id: "m3-5",
    name: "Baked Cod with Vegetables",
    calories: 420,
    macros: { carbs: 25, protein: 45, fat: 12 },
    description: "Herb-crusted baked cod with a medley of roasted Mediterranean vegetables",
    type: "dinner",
    servings: 1,
    prepTime: 15,
    cookTime: 25,
    gallery: [
      {
        id: "img-m3-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
      },
      {
        id: "img-m3-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Cod Fillet", quantity: 180, unit: "g", icon: "🐟" },
      { id: "ing-2", name: "Zucchini", quantity: 100, unit: "g", icon: "🥒" },
      { id: "ing-3", name: "Bell Peppers", quantity: 100, unit: "g", icon: "🫑" },
      { id: "ing-4", name: "Cherry Tomatoes", quantity: 80, unit: "g", icon: "🍅" },
      { id: "ing-5", name: "Lemon", quantity: 1, unit: "pieces", icon: "🍋" },
      { id: "ing-6", name: "Olive Oil", quantity: 1.5, unit: "tbsp", icon: "🫒" },
      { id: "ing-7", name: "Thyme", quantity: 1, unit: "tsp", icon: "🌿" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Preheat oven to 200°C (400°F). Chop vegetables and toss with 1 tbsp olive oil, salt, and pepper.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Arrange vegetables on a baking sheet. Place cod fillet on top. Drizzle with remaining oil and season with thyme.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Bake for 20-25 minutes until cod flakes easily with a fork.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Squeeze fresh lemon juice over the top and serve immediately.",
      },
    ],
  },

  // Breakfast Burrito
  {
    id: "m5-1",
    name: "Breakfast Burrito",
    calories: 450,
    macros: { carbs: 48, protein: 25, fat: 18 },
    description: "Hearty burrito filled with scrambled eggs, black beans, cheese, and salsa",
    type: "breakfast",
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    gallery: [
      {
        id: "img-m5-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
      },
      {
        id: "img-m5-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1641959989593-cecb3e3dcdcf?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Large Tortilla", quantity: 1, unit: "pieces", icon: "🌯" },
      { id: "ing-2", name: "Eggs", quantity: 2, unit: "pieces", icon: "🥚" },
      { id: "ing-3", name: "Black Beans", quantity: 60, unit: "g", icon: "🫘" },
      { id: "ing-4", name: "Cheese", quantity: 40, unit: "g", icon: "🧀" },
      { id: "ing-5", name: "Salsa", quantity: 3, unit: "tbsp", icon: "🍅" },
      { id: "ing-6", name: "Avocado", quantity: 0.5, unit: "pieces", icon: "🥑" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Scramble eggs in a pan with a little butter until fluffy. Set aside.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Warm tortilla for 20 seconds on each side. Layer scrambled eggs, black beans, cheese, and avocado in the center.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Top with salsa. Fold in sides, then roll tightly from bottom to top.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Optional: Toast burrito seam-side down in pan for 2 minutes until golden. Slice in half and serve.",
      },
    ],
  },

  // Chicken Stir Fry
  {
    id: "m4-5",
    name: "Chicken Stir Fry",
    calories: 480,
    macros: { carbs: 38, protein: 42, fat: 18 },
    description: "Wok-tossed chicken with colorful vegetables in savory Asian sauce",
    type: "dinner",
    servings: 1,
    prepTime: 15,
    cookTime: 15,
    gallery: [
      {
        id: "img-m4-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1603073263788-64268e752bdb?w=800",
      },
      {
        id: "vid-m4-5-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://images.unsplash.com/photo-1603073263788-64268e752bdb?w=400",
      },
      {
        id: "img-m4-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Chicken Breast", quantity: 150, unit: "g", icon: "🍗" },
      { id: "ing-2", name: "Bell Peppers", quantity: 100, unit: "g", icon: "🫑" },
      { id: "ing-3", name: "Broccoli", quantity: 100, unit: "g", icon: "🥦" },
      { id: "ing-4", name: "Snap Peas", quantity: 80, unit: "g", icon: "🫛" },
      { id: "ing-5", name: "Soy Sauce", quantity: 2, unit: "tbsp", icon: "🍶" },
      { id: "ing-6", name: "Ginger", quantity: 1, unit: "tbsp", icon: "🫚" },
      { id: "ing-7", name: "Garlic", quantity: 3, unit: "cloves", icon: "🧄" },
      { id: "ing-8", name: "Sesame Oil", quantity: 1, unit: "tbsp", icon: "🫒" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Slice chicken into thin strips. Marinate with 1 tbsp soy sauce for 10 minutes.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Chop all vegetables into bite-sized pieces. Mince garlic and ginger.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Heat sesame oil in wok over high heat. Stir-fry chicken 5-6 minutes until cooked. Remove and set aside.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Add vegetables, garlic, and ginger to wok. Stir-fry 4-5 minutes. Return chicken, add remaining soy sauce. Toss and serve.",
      },
    ],
  },

  // Tuna Salad
  {
    id: "m4-3",
    name: "Tuna Salad",
    calories: 380,
    macros: { carbs: 12, protein: 35, fat: 20 },
    description: "Light and refreshing tuna salad with crisp vegetables and olive oil dressing",
    type: "lunch",
    servings: 1,
    prepTime: 10,
    cookTime: 0,
    gallery: [
      {
        id: "img-m4-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Canned Tuna", quantity: 120, unit: "g", icon: "🐟" },
      { id: "ing-2", name: "Mixed Greens", quantity: 100, unit: "g", icon: "🥬" },
      { id: "ing-3", name: "Cherry Tomatoes", quantity: 80, unit: "g", icon: "🍅" },
      { id: "ing-4", name: "Cucumber", quantity: 60, unit: "g", icon: "🥒" },
      { id: "ing-5", name: "Red Onion", quantity: 30, unit: "g", icon: "🧅" },
      { id: "ing-6", name: "Olive Oil", quantity: 2, unit: "tbsp", icon: "🫒" },
      { id: "ing-7", name: "Lemon Juice", quantity: 1, unit: "tbsp", icon: "🍋" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Drain tuna and place in a bowl. Wash and chop all vegetables.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Combine mixed greens, tomatoes, cucumber, and thinly sliced red onion in a large bowl.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Top with tuna. Whisk olive oil and lemon juice, drizzle over salad. Season with salt and pepper. Toss and serve.",
      },
    ],
  },

  // French Toast
  {
    id: "m6-1",
    name: "French Toast",
    calories: 420,
    macros: { carbs: 52, protein: 15, fat: 16 },
    description: "Classic cinnamon French toast with maple syrup and fresh berries",
    type: "breakfast",
    servings: 1,
    prepTime: 10,
    cookTime: 10,
    gallery: [
      {
        id: "img-m6-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800",
      },
      {
        id: "img-m6-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Bread", quantity: 3, unit: "slices", icon: "🍞" },
      { id: "ing-2", name: "Eggs", quantity: 2, unit: "pieces", icon: "🥚" },
      { id: "ing-3", name: "Milk", quantity: 60, unit: "ml", icon: "🥛" },
      { id: "ing-4", name: "Cinnamon", quantity: 1, unit: "tsp", icon: "🌰" },
      { id: "ing-5", name: "Butter", quantity: 1, unit: "tbsp", icon: "🧈" },
      { id: "ing-6", name: "Maple Syrup", quantity: 2, unit: "tbsp", icon: "🍯" },
      { id: "ing-7", name: "Berries", quantity: 80, unit: "g", icon: "🫐" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Whisk eggs, milk, and cinnamon in a shallow dish.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Dip each bread slice in egg mixture, coating both sides well.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Heat butter in a pan over medium heat. Cook bread 2-3 minutes per side until golden brown.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Stack on a plate, top with fresh berries and drizzle with maple syrup.",
      },
    ],
  },

  // Cottage Cheese & Fruit
  {
    id: "m3-2",
    name: "Cottage Cheese & Fruit",
    calories: 220,
    macros: { carbs: 28, protein: 18, fat: 4 },
    description: "Creamy cottage cheese paired with sweet fresh fruit",
    type: "morning_snack",
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    gallery: [
      {
        id: "img-m3-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571212515710-7b135fe18bbf?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Cottage Cheese", quantity: 150, unit: "g", icon: "🥛" },
      { id: "ing-2", name: "Mixed Fruit", quantity: 120, unit: "g", icon: "🍓" },
      { id: "ing-3", name: "Honey", quantity: 0.5, unit: "tbsp", icon: "🍯" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Spoon cottage cheese into a bowl.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Top with mixed fresh fruit and drizzle with honey. Serve chilled.",
      },
    ],
  },

  // Protein Bar
  {
    id: "m3-4",
    name: "Protein Bar",
    calories: 250,
    macros: { carbs: 30, protein: 20, fat: 8 },
    description: "Convenient high-protein bar for on-the-go nutrition",
    type: "afternoon_snack",
    servings: 1,
    prepTime: 1,
    cookTime: 0,
    gallery: [
      {
        id: "img-m3-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1622484211736-e0b7f7e38b65?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Protein Bar", quantity: 1, unit: "pieces", icon: "💪" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Unwrap protein bar and enjoy.",
      },
    ],
  },

  // Beef Tacos
  {
    id: "m7-5",
    name: "Beef Tacos",
    calories: 550,
    macros: { carbs: 42, protein: 35, fat: 26 },
    description: "Seasoned ground beef tacos with fresh toppings and soft tortillas",
    type: "dinner",
    servings: 1,
    prepTime: 15,
    cookTime: 20,
    gallery: [
      {
        id: "img-m7-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800",
      },
      {
        id: "img-m7-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
      },
      {
        id: "vid-m7-5-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Ground Beef", quantity: 120, unit: "g", icon: "🥩" },
      { id: "ing-2", name: "Soft Tortillas", quantity: 3, unit: "pieces", icon: "🌮" },
      { id: "ing-3", name: "Lettuce", quantity: 40, unit: "g", icon: "🥬" },
      { id: "ing-4", name: "Tomato", quantity: 1, unit: "pieces", icon: "🍅" },
      { id: "ing-5", name: "Cheese", quantity: 40, unit: "g", icon: "🧀" },
      { id: "ing-6", name: "Sour Cream", quantity: 2, unit: "tbsp", icon: "🥛" },
      { id: "ing-7", name: "Taco Seasoning", quantity: 1, unit: "tbsp", icon: "🌶️" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Brown ground beef in a pan over medium-high heat, breaking it up as it cooks.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Add taco seasoning and 1/4 cup water. Simmer 5 minutes until thickened.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Warm tortillas. Chop lettuce and tomato.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Assemble tacos with beef, lettuce, tomato, cheese, and sour cream. Serve immediately.",
      },
    ],
  },

  // Caesar Salad with Chicken
  {
    id: "m6-5",
    name: "Caesar Salad with Chicken",
    calories: 480,
    macros: { carbs: 20, protein: 38, fat: 28 },
    description: "Classic Caesar salad with grilled chicken, parmesan, and croutons",
    type: "dinner",
    servings: 1,
    prepTime: 15,
    cookTime: 15,
    gallery: [
      {
        id: "img-m6-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800",
      },
      {
        id: "img-m6-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Chicken Breast", quantity: 150, unit: "g", icon: "🍗" },
      { id: "ing-2", name: "Romaine Lettuce", quantity: 150, unit: "g", icon: "🥬" },
      { id: "ing-3", name: "Parmesan Cheese", quantity: 30, unit: "g", icon: "🧀" },
      { id: "ing-4", name: "Croutons", quantity: 40, unit: "g", icon: "🍞" },
      { id: "ing-5", name: "Caesar Dressing", quantity: 3, unit: "tbsp", icon: "🥗" },
      { id: "ing-6", name: "Lemon", quantity: 0.5, unit: "pieces", icon: "🍋" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Season and grill chicken breast 6-7 minutes per side until cooked through. Let rest 5 minutes, then slice.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Chop romaine lettuce into bite-sized pieces. Wash and dry thoroughly.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Toss lettuce with Caesar dressing until well coated. Add croutons and shaved parmesan.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Top with sliced chicken. Squeeze lemon over the top and serve immediately.",
      },
    ],
  },

  // Apple with Almond Butter (m4-4)
  {
    id: "m4-4",
    name: "Apple with Almond Butter",
    calories: 200,
    macros: { carbs: 25, protein: 5, fat: 12 },
    description: "Crisp apple slices with creamy natural almond butter",
    type: "afternoon_snack",
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    gallery: [
      {
        id: "img-m4-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800",
      },
      {
        id: "img-m4-4-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Apple", quantity: 1, unit: "pieces", icon: "🍎" },
      { id: "ing-2", name: "Almond Butter", quantity: 2, unit: "tbsp", icon: "🥜" },
      { id: "ing-3", name: "Cinnamon", quantity: 0.5, unit: "tsp", icon: "🌰" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Wash and core the apple. Slice into 8-10 wedges.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Arrange apple slices on a plate. Add almond butter to a small bowl.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Sprinkle cinnamon over almond butter. Dip apple slices and enjoy.",
      },
    ],
  },

  // Protein Smoothie (m5-2)
  {
    id: "m5-2",
    name: "Protein Smoothie",
    calories: 280,
    macros: { carbs: 30, protein: 25, fat: 8 },
    description: "Refreshing blend of banana, spinach, protein powder, and almond milk",
    type: "morning_snack",
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    gallery: [
      {
        id: "img-m5-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800",
      },
      {
        id: "img-m5-2-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Banana", quantity: 1, unit: "pieces", icon: "🍌" },
      { id: "ing-2", name: "Spinach", quantity: 40, unit: "g", icon: "🥬" },
      { id: "ing-3", name: "Protein Powder", quantity: 30, unit: "g", icon: "💪" },
      { id: "ing-4", name: "Almond Milk", quantity: 250, unit: "ml", icon: "🥛" },
      { id: "ing-5", name: "Ice Cubes", quantity: 4, unit: "pieces", icon: "🧊" },
      { id: "ing-6", name: "Honey", quantity: 1, unit: "tsp", icon: "🍯" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Add almond milk to blender first for smooth blending.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Add banana (broken into chunks), spinach, protein powder, and honey.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Add ice cubes and blend on high for 45-60 seconds until smooth and creamy.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Pour into glass and serve immediately for best taste and texture.",
      },
    ],
  },

  // Hummus & Veggies (m5-4)
  {
    id: "m5-4",
    name: "Hummus & Veggies",
    calories: 180,
    macros: { carbs: 18, protein: 6, fat: 10 },
    description: "Creamy hummus served with fresh crunchy vegetables",
    type: "afternoon_snack",
    servings: 1,
    prepTime: 8,
    cookTime: 0,
    gallery: [
      {
        id: "img-m5-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1560782668-5c8ba8df371a?w=800",
      },
      {
        id: "img-m5-4-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1603046891726-36bfd957bc32?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Hummus", quantity: 100, unit: "g", icon: "🫘" },
      { id: "ing-2", name: "Carrot Sticks", quantity: 60, unit: "g", icon: "🥕" },
      { id: "ing-3", name: "Cucumber", quantity: 50, unit: "g", icon: "🥒" },
      { id: "ing-4", name: "Bell Peppers", quantity: 50, unit: "g", icon: "🫑" },
      { id: "ing-5", name: "Cherry Tomatoes", quantity: 40, unit: "g", icon: "🍅" },
      { id: "ing-6", name: "Olive Oil", quantity: 0.5, unit: "tsp", icon: "🫒" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Wash all vegetables thoroughly. Pat dry with paper towels.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Cut carrots into sticks, slice cucumber and bell peppers into strips.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Arrange vegetables on a plate around hummus bowl. Drizzle olive oil over hummus.",
      },
    ],
  },

  // Cottage Cheese & Fruit (m6-2)
  {
    id: "m6-2",
    name: "Cottage Cheese & Fruit",
    calories: 220,
    macros: { carbs: 28, protein: 18, fat: 4 },
    description: "Protein-rich cottage cheese with fresh seasonal fruits",
    type: "morning_snack",
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    gallery: [
      {
        id: "img-m6-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571212515416-26941b3b93eb?w=800",
      },
      {
        id: "img-m6-2-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Cottage Cheese", quantity: 150, unit: "g", icon: "🧀" },
      { id: "ing-2", name: "Strawberries", quantity: 60, unit: "g", icon: "🍓" },
      { id: "ing-3", name: "Blueberries", quantity: 40, unit: "g", icon: "🫐" },
      { id: "ing-4", name: "Pineapple", quantity: 50, unit: "g", icon: "🍍" },
      { id: "ing-5", name: "Honey", quantity: 1, unit: "tsp", icon: "🍯" },
      { id: "ing-6", name: "Mint Leaves", quantity: 2, unit: "pieces", icon: "🌿" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Spoon cottage cheese into a serving bowl.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Wash and slice strawberries. Dice pineapple into small chunks.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Arrange fruits over cottage cheese. Drizzle with honey and garnish with mint leaves.",
      },
    ],
  },

  // Turkey & Avocado Wrap (m6-3)
  {
    id: "m6-3",
    name: "Turkey & Avocado Wrap",
    calories: 480,
    macros: { carbs: 40, protein: 32, fat: 20 },
    description: "Whole wheat wrap filled with turkey, creamy avocado, and fresh vegetables",
    type: "lunch",
    servings: 1,
    prepTime: 10,
    cookTime: 0,
    gallery: [
      {
        id: "img-m6-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
      },
      {
        id: "img-m6-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800",
      },
      {
        id: "vid-m6-3-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Whole Wheat Tortilla", quantity: 1, unit: "pieces", icon: "🌯" },
      { id: "ing-2", name: "Turkey Slices", quantity: 100, unit: "g", icon: "🦃" },
      { id: "ing-3", name: "Avocado", quantity: 80, unit: "g", icon: "🥑" },
      { id: "ing-4", name: "Lettuce", quantity: 30, unit: "g", icon: "🥬" },
      { id: "ing-5", name: "Tomato", quantity: 50, unit: "g", icon: "🍅" },
      { id: "ing-6", name: "Red Onion", quantity: 20, unit: "g", icon: "🧅" },
      { id: "ing-7", name: "Mustard", quantity: 1, unit: "tsp", icon: "🌭" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Lay tortilla flat. Spread thin layer of mustard in the center.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Layer turkey slices, mashed avocado, lettuce, sliced tomato, and red onion.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Fold sides in, then roll tightly from bottom to top.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Cut in half diagonally and serve immediately or wrap for later.",
      },
    ],
  },

  // Protein Bar (m6-4)
  {
    id: "m6-4",
    name: "Protein Bar",
    calories: 250,
    macros: { carbs: 30, protein: 20, fat: 8 },
    description: "Convenient protein bar packed with nutrients",
    type: "afternoon_snack",
    servings: 1,
    prepTime: 1,
    cookTime: 0,
    gallery: [
      {
        id: "img-m6-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1585309343166-68907984d4e7?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Protein Bar", quantity: 1, unit: "pieces", icon: "🍫" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Open wrapper and enjoy. Perfect for on-the-go nutrition.",
      },
    ],
  },

  // Scrambled Eggs & Toast (m7-1)
  {
    id: "m7-1",
    name: "Scrambled Eggs & Toast",
    calories: 380,
    macros: { carbs: 35, protein: 20, fat: 18 },
    description: "Fluffy scrambled eggs served with whole grain toast and avocado",
    type: "breakfast",
    servings: 1,
    prepTime: 5,
    cookTime: 10,
    gallery: [
      {
        id: "img-m7-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
      },
      {
        id: "img-m7-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Eggs", quantity: 3, unit: "pieces", icon: "🥚" },
      { id: "ing-2", name: "Whole Grain Bread", quantity: 2, unit: "slices", icon: "🍞" },
      { id: "ing-3", name: "Avocado", quantity: 60, unit: "g", icon: "🥑" },
      { id: "ing-4", name: "Butter", quantity: 1, unit: "tbsp", icon: "🧈" },
      { id: "ing-5", name: "Milk", quantity: 2, unit: "tbsp", icon: "🥛" },
      { id: "ing-6", name: "Salt & Pepper", quantity: 1, unit: "pinch", icon: "🧂" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Crack eggs into bowl, add milk, salt, and pepper. Whisk until well combined.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Toast bread slices to desired doneness. Mash avocado and spread on toast.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Melt butter in pan over medium heat. Pour in egg mixture.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Stir gently with spatula until eggs are just set but still creamy. Serve with avocado toast.",
      },
    ],
  },

  // Chicken Rice Bowl (m7-3)
  {
    id: "m7-3",
    name: "Chicken Rice Bowl",
    calories: 520,
    macros: { carbs: 55, protein: 38, fat: 16 },
    description: "Savory chicken over steamed rice with vegetables",
    type: "lunch",
    servings: 1,
    prepTime: 10,
    cookTime: 25,
    gallery: [
      {
        id: "img-m7-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
      },
      {
        id: "img-m7-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Chicken Breast", quantity: 150, unit: "g", icon: "🍗" },
      { id: "ing-2", name: "White Rice", quantity: 80, unit: "g", icon: "🍚" },
      { id: "ing-3", name: "Broccoli", quantity: 80, unit: "g", icon: "🥦" },
      { id: "ing-4", name: "Carrots", quantity: 50, unit: "g", icon: "🥕" },
      { id: "ing-5", name: "Soy Sauce", quantity: 2, unit: "tbsp", icon: "🥢" },
      { id: "ing-6", name: "Garlic", quantity: 2, unit: "cloves", icon: "🧄" },
      { id: "ing-7", name: "Sesame Oil", quantity: 1, unit: "tsp", icon: "🫒" },
      { id: "ing-8", name: "Green Onions", quantity: 2, unit: "stalks", icon: "🧅" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Cook rice according to package directions. Fluff with fork and set aside.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Cut chicken into bite-sized pieces. Season with salt and pepper.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Heat sesame oil in pan. Cook chicken with minced garlic for 6-8 minutes until golden.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Steam broccoli and carrots for 5 minutes. Add soy sauce to chicken.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        instruction: "Serve rice in bowl, top with chicken and vegetables. Garnish with green onions.",
      },
    ],
  },

  // Beef Tacos (m7-5)
  {
    id: "m7-5",
    name: "Beef Tacos",
    calories: 550,
    macros: { carbs: 42, protein: 35, fat: 26 },
    description: "Seasoned ground beef tacos with fresh toppings",
    type: "dinner",
    servings: 2,
    prepTime: 10,
    cookTime: 15,
    gallery: [
      {
        id: "img-m7-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
      },
      {
        id: "img-m7-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800",
      },
      {
        id: "img-m7-5-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Ground Beef", quantity: 150, unit: "g", icon: "🥩" },
      { id: "ing-2", name: "Taco Shells", quantity: 4, unit: "pieces", icon: "🌮" },
      { id: "ing-3", name: "Lettuce", quantity: 50, unit: "g", icon: "🥬" },
      { id: "ing-4", name: "Tomato", quantity: 60, unit: "g", icon: "🍅" },
      { id: "ing-5", name: "Cheddar Cheese", quantity: 40, unit: "g", icon: "🧀" },
      { id: "ing-6", name: "Sour Cream", quantity: 30, unit: "g", icon: "🥛" },
      { id: "ing-7", name: "Taco Seasoning", quantity: 1, unit: "tbsp", icon: "🌶️" },
      { id: "ing-8", name: "Onion", quantity: 30, unit: "g", icon: "🧅" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Brown ground beef in pan over medium-high heat. Drain excess fat.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Add taco seasoning and water as directed. Simmer for 5 minutes.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Warm taco shells in oven at 350F for 3-4 minutes.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Chop lettuce, dice tomatoes and onions. Shred cheese.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        instruction: "Fill shells with beef, then layer with lettuce, tomatoes, cheese, onions, and sour cream.",
      },
    ],
  },

  // Breakfast Burrito (m5-1)
  {
    id: "m5-1",
    name: "Breakfast Burrito",
    calories: 450,
    macros: { carbs: 48, protein: 25, fat: 18 },
    description: "Hearty breakfast burrito with eggs, cheese, and vegetables",
    type: "breakfast",
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    gallery: [
      {
        id: "img-m5-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
      },
      {
        id: "img-m5-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1580217593608-61931cefc821?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Large Tortilla", quantity: 1, unit: "pieces", icon: "🌯" },
      { id: "ing-2", name: "Eggs", quantity: 2, unit: "pieces", icon: "🥚" },
      { id: "ing-3", name: "Black Beans", quantity: 50, unit: "g", icon: "🫘" },
      { id: "ing-4", name: "Cheddar Cheese", quantity: 30, unit: "g", icon: "🧀" },
      { id: "ing-5", name: "Bell Peppers", quantity: 40, unit: "g", icon: "🫑" },
      { id: "ing-6", name: "Onion", quantity: 30, unit: "g", icon: "🧅" },
      { id: "ing-7", name: "Salsa", quantity: 2, unit: "tbsp", icon: "🌶️" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Dice peppers and onions. Scramble eggs in bowl with salt and pepper.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Cook vegetables in pan until soft. Add eggs and cook until just set.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Warm tortilla and beans. Layer beans, eggs, cheese, and salsa in center.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Fold sides in, roll tightly. Optional: grill seam-side down for crispy exterior.",
      },
    ],
  },

  // Tuna Salad (m4-3) - Already exists in MEAL_DETAILS_MOCK
  // Adding remaining missing meals:

  // Chicken Stir Fry (m4-5) - Already exists

  // Greek Yogurt & Nuts (m7-2) - duplicate of m4-2
  {
    id: "m7-2",
    name: "Greek Yogurt & Nuts",
    calories: 180,
    macros: { carbs: 12, protein: 15, fat: 8 },
    description: "Protein-rich Greek yogurt with crunchy mixed nuts and a touch of honey",
    type: "morning_snack",
    servings: 1,
    prepTime: 3,
    cookTime: 0,
    gallery: [
      {
        id: "img-m7-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Greek Yogurt", quantity: 150, unit: "g", icon: "🥛" },
      { id: "ing-2", name: "Mixed Nuts", quantity: 30, unit: "g", icon: "🥜" },
      { id: "ing-3", name: "Honey", quantity: 0.5, unit: "tbsp", icon: "🍯" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Spoon Greek yogurt into a bowl.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Top with mixed nuts and drizzle honey over the top. Serve immediately.",
      },
    ],
  },

  // Apple with Almond Butter (m7-4) - duplicate of m4-4
  {
    id: "m7-4",
    name: "Apple with Almond Butter",
    calories: 200,
    macros: { carbs: 25, protein: 5, fat: 12 },
    description: "Crisp apple slices with creamy natural almond butter",
    type: "afternoon_snack",
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    gallery: [
      {
        id: "img-m7-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800",
      },
      {
        id: "img-m7-4-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Apple", quantity: 1, unit: "pieces", icon: "🍎" },
      { id: "ing-2", name: "Almond Butter", quantity: 2, unit: "tbsp", icon: "🥜" },
      { id: "ing-3", name: "Cinnamon", quantity: 0.5, unit: "tsp", icon: "🌰" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Wash and core the apple. Slice into 8-10 wedges.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Arrange apple slices on a plate. Add almond butter to a small bowl.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Sprinkle cinnamon over almond butter. Dip apple slices and enjoy.",
      },
    ],
  },

  // Grilled Chicken Salad (m5-3) - duplicate of m1-3
  {
    id: "m5-3",
    name: "Grilled Chicken Salad",
    calories: 450,
    macros: { carbs: 15, protein: 35, fat: 28 },
    description: "Fresh mixed greens with seasoned grilled chicken breast and vegetables",
    type: "lunch",
    servings: 1,
    prepTime: 15,
    cookTime: 15,
    gallery: [
      {
        id: "img-m5-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      },
      {
        id: "img-m5-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      },
      {
        id: "vid-m5-3-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Chicken Breast", quantity: 150, unit: "g", icon: "🍗" },
      { id: "ing-2", name: "Mixed Greens", quantity: 100, unit: "g", icon: "🥬" },
      { id: "ing-3", name: "Cherry Tomatoes", quantity: 80, unit: "g", icon: "🍅" },
      { id: "ing-4", name: "Cucumber", quantity: 60, unit: "g", icon: "🥒" },
      { id: "ing-5", name: "Olive Oil", quantity: 1, unit: "tbsp", icon: "🫒" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Season chicken breast with salt, pepper, and herbs. Grill for 6-8 minutes per side until cooked through.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Wash and chop mixed greens, cherry tomatoes, and cucumber into bite-sized pieces.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Slice grilled chicken and arrange over salad. Drizzle with olive oil and serve immediately.",
      },
    ],
  },

  // Salmon with Quinoa (m5-5) - duplicate of m1-5
  {
    id: "m5-5",
    name: "Salmon with Quinoa",
    calories: 520,
    macros: { carbs: 35, protein: 40, fat: 22 },
    description: "Pan-seared salmon fillet served over fluffy quinoa with roasted vegetables",
    type: "dinner",
    servings: 1,
    prepTime: 10,
    cookTime: 25,
    gallery: [
      {
        id: "img-m5-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
      },
      {
        id: "img-m5-5-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800",
      },
      {
        id: "img-m5-5-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Salmon Fillet", quantity: 150, unit: "g", icon: "🐟" },
      { id: "ing-2", name: "Quinoa", quantity: 80, unit: "g", icon: "🌾" },
      { id: "ing-3", name: "Broccoli", quantity: 100, unit: "g", icon: "🥦" },
      { id: "ing-4", name: "Lemon", quantity: 1, unit: "pieces", icon: "🍋" },
      { id: "ing-5", name: "Olive Oil", quantity: 1, unit: "tbsp", icon: "🫒" },
      { id: "ing-6", name: "Garlic", quantity: 2, unit: "cloves", icon: "🧄" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Rinse quinoa and cook in 1.5 cups water for 15 minutes. Let sit covered for 5 minutes, then fluff with fork.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Season salmon with salt, pepper, and minced garlic. Heat olive oil in a pan over medium-high heat.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Sear salmon skin-side down for 4-5 minutes, then flip and cook for another 3-4 minutes until cooked through.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        instruction: "Steam broccoli for 5-6 minutes until tender. Plate quinoa, top with salmon and broccoli. Squeeze lemon over the top.",
      },
    ],
  },

  // Oatmeal with Berries (m4-1) - duplicate of m1-1
  {
    id: "m4-1",
    name: "Oatmeal with Berries",
    calories: 320,
    macros: { carbs: 45, protein: 12, fat: 8 },
    description: "Creamy oatmeal topped with fresh berries and a drizzle of honey",
    type: "breakfast",
    servings: 1,
    prepTime: 5,
    cookTime: 10,
    gallery: [
      {
        id: "img-m4-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800",
      },
      {
        id: "img-m4-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Rolled Oats", quantity: 60, unit: "g", icon: "🌾" },
      { id: "ing-2", name: "Milk", quantity: 250, unit: "ml", icon: "🥛" },
      { id: "ing-3", name: "Mixed Berries", quantity: 100, unit: "g", icon: "🫐" },
      { id: "ing-4", name: "Honey", quantity: 1, unit: "tbsp", icon: "🍯" },
      { id: "ing-5", name: "Cinnamon", quantity: 1, unit: "tsp", icon: "🌰" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Combine oats and milk in a pot. Bring to a simmer over medium heat, stirring occasionally.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Cook for 5-7 minutes until oats are tender and creamy. Stir in cinnamon.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        instruction: "Pour into bowl, top with fresh berries and drizzle with honey. Serve warm.",
      },
    ],
  },

  // Greek Yogurt & Nuts (m4-2) - duplicate of m1-2
  {
    id: "m4-2",
    name: "Greek Yogurt & Nuts",
    calories: 180,
    macros: { carbs: 12, protein: 15, fat: 8 },
    description: "Protein-rich Greek yogurt with crunchy mixed nuts and a touch of honey",
    type: "morning_snack",
    servings: 1,
    prepTime: 3,
    cookTime: 0,
    gallery: [
      {
        id: "img-m4-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
      },
    ],
    ingredients: [
      { id: "ing-1", name: "Greek Yogurt", quantity: 150, unit: "g", icon: "🥛" },
      { id: "ing-2", name: "Mixed Nuts", quantity: 30, unit: "g", icon: "🥜" },
      { id: "ing-3", name: "Honey", quantity: 0.5, unit: "tbsp", icon: "🍯" },
    ],
    preparationSteps: [
      {
        id: "step-1",
        stepNumber: 1,
        instruction: "Spoon Greek yogurt into a bowl.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        instruction: "Top with mixed nuts and drizzle honey over the top. Serve immediately.",
      },
    ],
  },
];

// Mock Exercise Details for Exercise Detail View
export const EXERCISE_DETAILS_MOCK: ExerciseDetail[] = [
  // Warm-up Exercises
  {
    id: "e1-1",
    name: "Arm Circles",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    description:
      "A dynamic warm-up exercise that mobilizes the shoulder joints and increases blood flow to the upper body. Perfect for preparing your shoulders for any upper body workout.",
    primaryMuscle: "Shoulders",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e1-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing arm circles exercise",
        sortIndex: 1,
      },
      {
        id: "media-e1-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "gallery",
        altText: "Arm circles starting position",
        sortIndex: 2,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 15,
      repsMax: 15,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e1-1-1",
        orderIndex: 1,
        instruction:
          "Stand with your feet shoulder-width apart and extend your arms straight out to the sides at shoulder height.",
      },
      {
        id: "step-e1-1-2",
        orderIndex: 2,
        instruction:
          "Begin making small circular motions with your arms, gradually increasing the size of the circles.",
      },
      {
        id: "step-e1-1-3",
        orderIndex: 3,
        instruction:
          "After 15 circles forward, reverse direction and perform 15 circles backward.",
      },
    ],
    tips: [
      "Keep your core engaged throughout the movement",
      "Start with small circles and gradually increase the diameter",
      "Maintain steady breathing - don't hold your breath",
    ],
  },
  {
    id: "e1-2",
    name: "Band Pull-Aparts",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    description:
      "An excellent warm-up and prehab exercise that activates the rear deltoids and upper back muscles. Helps improve posture and shoulder health.",
    primaryMuscle: "Rear Deltoids",
    equipment: "Resistance Band",
    category: "warm-up",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e1-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing band pull-aparts",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 20,
      repsMax: 20,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e1-2-1",
        orderIndex: 1,
        instruction:
          "Hold a resistance band in front of you at shoulder height with arms extended and hands about shoulder-width apart.",
      },
      {
        id: "step-e1-2-2",
        orderIndex: 2,
        instruction:
          "Pull the band apart by moving your hands outward, squeezing your shoulder blades together.",
      },
      {
        id: "step-e1-2-3",
        orderIndex: 3,
        instruction:
          "Control the return to starting position and repeat for the desired number of reps.",
      },
    ],
    tips: [
      "Focus on squeezing your shoulder blades together",
      "Keep your elbows slightly bent throughout",
      "Use a lighter band to focus on muscle activation",
    ],
  },

  // Main Exercises
  {
    id: "e1-3",
    name: "Bench Press",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    description:
      "The king of chest exercises. A compound movement that builds strength and size in the chest, shoulders, and triceps. Essential for upper body development.",
    primaryMuscle: "Chest",
    equipment: "Barbell, Bench",
    category: "main",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e1-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing bench press",
        sortIndex: 1,
      },
      {
        id: "media-e1-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&q=80",
        role: "gallery",
        altText: "Bench press starting position",
        sortIndex: 2,
      },
      {
        id: "media-e1-3-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
        role: "demonstration",
        altText: "Proper bench press form",
        sortIndex: 3,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 8,
      repsMax: 8,
      rir: 2,
      restTimeSeconds: 120,
    },
    howToPerformSteps: [
      {
        id: "step-e1-3-1",
        orderIndex: 1,
        instruction:
          "Lie flat on the bench with your feet firmly on the ground. Grip the barbell slightly wider than shoulder-width.",
      },
      {
        id: "step-e1-3-2",
        orderIndex: 2,
        instruction:
          "Unrack the bar and position it over your chest with arms fully extended.",
      },
      {
        id: "step-e1-3-3",
        orderIndex: 3,
        instruction:
          "Lower the bar in a controlled manner until it lightly touches your mid-chest, keeping your elbows at about 45 degrees.",
      },
      {
        id: "step-e1-3-4",
        orderIndex: 4,
        instruction:
          "Press the bar back up powerfully to the starting position, fully extending your arms.",
      },
    ],
    tips: [
      "Keep your shoulder blades retracted and depressed throughout",
      "Maintain a slight arch in your lower back",
      "Drive through your feet for leg drive and stability",
      "Always use a spotter when lifting heavy",
    ],
  },
  {
    id: "e1-4",
    name: "Incline Dumbbell Press",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    description:
      "Targets the upper portion of the chest with dumbbells allowing for greater range of motion. Excellent for building a well-rounded chest.",
    primaryMuscle: "Upper Chest",
    equipment: "Dumbbells, Incline Bench",
    category: "main",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e1-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        role: "primary",
        altText: "Person performing incline dumbbell press",
        sortIndex: 1,
      },
      {
        id: "media-e1-4-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        role: "gallery",
        altText: "Incline dumbbell press setup",
        sortIndex: 2,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e1-4-1",
        orderIndex: 1,
        instruction:
          "Set the bench to a 30-45 degree incline. Sit with your back flat against the bench holding dumbbells at shoulder height.",
      },
      {
        id: "step-e1-4-2",
        orderIndex: 2,
        instruction:
          "Press the dumbbells up and slightly together until your arms are fully extended above your upper chest.",
      },
      {
        id: "step-e1-4-3",
        orderIndex: 3,
        instruction:
          "Lower the dumbbells in a controlled manner back to shoulder height, feeling a stretch in your chest.",
      },
    ],
    tips: [
      "Don't set the incline too steep (over 45 degrees shifts focus to shoulders)",
      "Keep your wrists neutral and stable",
      "Control the negative portion of the movement",
    ],
  },
  {
    id: "e1-5",
    name: "Cable Flyes",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    description:
      "An isolation exercise that provides constant tension on the chest muscles throughout the entire range of motion. Perfect for chest development and muscle definition.",
    primaryMuscle: "Chest",
    equipment: "Cable Machine",
    category: "main",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e1-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&q=80",
        role: "primary",
        altText: "Person performing cable flyes",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e1-5-1",
        orderIndex: 1,
        instruction:
          "Set the pulleys to chest height. Stand in the center with one foot forward for stability, grasping a handle in each hand.",
      },
      {
        id: "step-e1-5-2",
        orderIndex: 2,
        instruction:
          "With a slight bend in your elbows, bring the handles together in front of your chest in a wide arc motion.",
      },
      {
        id: "step-e1-5-3",
        orderIndex: 3,
        instruction:
          "Squeeze your chest at the peak contraction, then slowly return to the starting position with control.",
      },
    ],
    tips: [
      "Maintain a slight bend in the elbows throughout the movement",
      "Focus on squeezing the chest rather than just moving weight",
      "Keep your core engaged to prevent swaying",
    ],
  },
  {
    id: "e1-6",
    name: "Overhead Press",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 90,
    description:
      "A fundamental compound movement for shoulder development. Builds strength in the shoulders, upper chest, and triceps while improving overall pressing power.",
    primaryMuscle: "Shoulders",
    equipment: "Barbell",
    category: "main",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e1-6-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
        role: "primary",
        altText: "Person performing overhead press",
        sortIndex: 1,
      },
      {
        id: "media-e1-6-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
        role: "gallery",
        altText: "Overhead press starting position",
        sortIndex: 2,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 8,
      repsMax: 8,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e1-6-1",
        orderIndex: 1,
        instruction:
          "Stand with feet shoulder-width apart. Hold the barbell at shoulder height with hands just wider than shoulders.",
      },
      {
        id: "step-e1-6-2",
        orderIndex: 2,
        instruction:
          "Press the bar overhead in a straight line, slightly moving your head back to avoid hitting your chin.",
      },
      {
        id: "step-e1-6-3",
        orderIndex: 3,
        instruction:
          "Lock out your arms fully at the top, then lower the bar back to shoulder height with control.",
      },
    ],
    tips: [
      "Keep your core tight to avoid excessive back arch",
      "Press the bar in a vertical path, not forward",
      "Breathe out as you press up, breathe in as you lower",
    ],
  },
  {
    id: "e1-7",
    name: "Lateral Raises",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    description:
      "An isolation exercise targeting the medial deltoids. Essential for building wider, more rounded shoulders and improving shoulder aesthetics.",
    primaryMuscle: "Medial Deltoids",
    equipment: "Dumbbells",
    category: "main",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e1-7-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1598266663439-2056815d3c81?w=800&q=80",
        role: "primary",
        altText: "Person performing lateral raises",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e1-7-1",
        orderIndex: 1,
        instruction:
          "Stand with feet hip-width apart, holding dumbbells at your sides with palms facing your body.",
      },
      {
        id: "step-e1-7-2",
        orderIndex: 2,
        instruction:
          "Raise the dumbbells out to the sides with a slight bend in your elbows until they reach shoulder height.",
      },
      {
        id: "step-e1-7-3",
        orderIndex: 3,
        instruction:
          "Lower the weights back down slowly to the starting position with control.",
      },
    ],
    tips: [
      "Don't swing or use momentum - use strict form",
      "Lead with your elbows, not your hands",
      "Keep a slight bend in your elbows throughout",
      "Avoid raising above shoulder height",
    ],
  },
  {
    id: "e1-8",
    name: "Tricep Dips",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    description:
      "A bodyweight exercise that targets the triceps, chest, and shoulders. Excellent for building upper body pushing strength and muscle mass.",
    primaryMuscle: "Triceps",
    equipment: "Dip Station or Parallel Bars",
    category: "main",
    muscleGroup: "Triceps",
    gallery: [
      {
        id: "media-e1-8-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1599058917727-a3021f1c779d?w=800&q=80",
        role: "primary",
        altText: "Person performing tricep dips",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e1-8-1",
        orderIndex: 1,
        instruction:
          "Grip the parallel bars and support your body weight with arms fully extended, legs slightly bent.",
      },
      {
        id: "step-e1-8-2",
        orderIndex: 2,
        instruction:
          "Lower your body by bending your elbows until your upper arms are roughly parallel to the ground.",
      },
      {
        id: "step-e1-8-3",
        orderIndex: 3,
        instruction:
          "Push back up to the starting position, fully extending your arms and squeezing your triceps.",
      },
    ],
    tips: [
      "Keep your body upright to focus on triceps (leaning forward shifts focus to chest)",
      "Don't lock out your elbows too hard at the top",
      "Control the descent - don't drop too fast",
    ],
  },

  // Stretch Exercise
  {
    id: "e1-9",
    name: "Chest Doorway Stretch",
    sets: 2,
    reps: 30,
    rir: 5,
    restTime: 30,
    description:
      "A static stretch that helps relieve tightness in the chest and front shoulders after a workout. Improves flexibility and aids in recovery.",
    primaryMuscle: "Chest",
    equipment: "Doorway",
    category: "stretch",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e1-9-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing chest doorway stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 30,
      repsMax: 30,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e1-9-1",
        orderIndex: 1,
        instruction:
          "Stand in a doorway with your forearm placed against the door frame at shoulder height, elbow bent at 90 degrees.",
      },
      {
        id: "step-e1-9-2",
        orderIndex: 2,
        instruction:
          "Step forward with the leg on the same side as your raised arm, gently leaning forward.",
      },
      {
        id: "step-e1-9-3",
        orderIndex: 3,
        instruction:
          "Hold the stretch for 30 seconds, feeling the stretch across your chest and front shoulder.",
      },
    ],
    tips: [
      "Breathe deeply and relax into the stretch",
      "Don't push too hard - stretch should be comfortable",
      "Perform on both sides",
    ],
  },
  {
    id: "e2-1",
    name: "Barbell Squat",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 180,
    description:
      "The king of leg exercises. A compound movement that targets the quadriceps, hamstrings, glutes, and core. Essential for building lower body strength and overall athleticism.",
    primaryMuscle: "Quadriceps",
    equipment: "Barbell, Squat Rack",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e2-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "primary",
        altText: "Person performing barbell squat",
        sortIndex: 1,
      },
      {
        id: "media-e2-1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&q=80",
        role: "gallery",
        altText: "Barbell squat bottom position",
        sortIndex: 2,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 180,
    },
    howToPerformSteps: [
      {
        id: "step-e2-1-1",
        orderIndex: 1,
        instruction:
          "Set your stance shoulder-width apart. Place the barbell on your upper back, gripping it firmly with hands just outside shoulders.",
      },
      {
        id: "step-e2-1-2",
        orderIndex: 2,
        instruction:
          "Keep your chest up and lower into a controlled squat. Break at the hips and knees simultaneously until thighs are parallel to the ground or lower.",
      },
      {
        id: "step-e2-1-3",
        orderIndex: 3,
        instruction:
          "Drive up through the heels and repeat. Keep your core braced throughout the movement.",
      },
    ],
    tips: [
      "Keep your knees tracking over your toes",
      "Maintain a neutral spine - don't round your back",
      "Drive through your heels, not your toes",
      "Take a deep breath and brace your core before each rep",
    ],
  },

  // Stretch Exercises
  {
    id: "e3-9",
    name: "Back Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A relaxing stretch that helps release tension in the lower and mid back. Perfect for cooling down after a workout or relieving back tightness.",
    primaryMuscle: "Back",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e3-9-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing back stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e3-9-1",
        orderIndex: 1,
        instruction:
          "Kneel on the floor and sit back on your heels. Extend your arms forward and lower your chest toward the ground.",
      },
      {
        id: "step-e3-9-2",
        orderIndex: 2,
        instruction:
          "Walk your hands forward as far as comfortable, feeling a gentle stretch through your back.",
      },
      {
        id: "step-e3-9-3",
        orderIndex: 3,
        instruction:
          "Hold the stretch for 30 seconds, breathing deeply and relaxing into the position.",
      },
    ],
    tips: [
      "Keep your hips on your heels throughout the stretch",
      "Breathe deeply and slowly to enhance relaxation",
      "Don't force the stretch - it should feel comfortable",
    ],
  },
  {
    id: "e3-10",
    name: "Bicep Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "An effective stretch for the biceps and forearms. Helps prevent tightness and improves flexibility in the arms after upper body workouts.",
    primaryMuscle: "Biceps",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Arms",
    gallery: [
      {
        id: "media-e3-10-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing bicep stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e3-10-1",
        orderIndex: 1,
        instruction:
          "Stand next to a wall or doorframe. Extend your arm out to the side at shoulder height with your palm facing forward.",
      },
      {
        id: "step-e3-10-2",
        orderIndex: 2,
        instruction:
          "Place your palm flat against the wall with your fingers pointing backward.",
      },
      {
        id: "step-e3-10-3",
        orderIndex: 3,
        instruction:
          "Slowly turn your body away from the wall until you feel a stretch in your bicep. Hold for 30 seconds.",
      },
    ],
    tips: [
      "Keep your arm straight but not locked",
      "Don't force the stretch - it should be gentle",
      "Perform on both arms",
      "Breathe naturally throughout the stretch",
    ],
  },
  {
    id: "e1-10",
    name: "Shoulder Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A relaxing stretch that targets the shoulder muscles and improves flexibility. Perfect for cooling down after an upper body workout.",
    primaryMuscle: "Shoulders",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e1-10-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing shoulder stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e1-10-1",
        orderIndex: 1,
        instruction:
          "Stand or sit with good posture. Bring your right arm across your chest at shoulder height.",
      },
      {
        id: "step-e1-10-2",
        orderIndex: 2,
        instruction:
          "Use your left hand to gently pull your right arm closer to your chest.",
      },
      {
        id: "step-e1-10-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds feeling a stretch in your shoulder. Repeat on the other side.",
      },
    ],
    tips: [
      "Keep your shoulders down and relaxed",
      "Don't rotate your torso",
      "Breathe deeply throughout the stretch",
    ],
  },
  {
    id: "e2-2",
    name: "Hip Circles",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    description:
      "A dynamic mobility exercise that warms up the hip joints and improves range of motion. Essential preparation for lower body training.",
    primaryMuscle: "Hips",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Hips",
    gallery: [
      {
        id: "media-e2-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "primary",
        altText: "Person performing hip circles",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 20,
      repsMax: 20,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e2-2-1",
        orderIndex: 1,
        instruction:
          "Stand with feet hip-width apart and hands on your hips.",
      },
      {
        id: "step-e2-2-2",
        orderIndex: 2,
        instruction:
          "Make large circular motions with your hips, as if drawing a circle with your pelvis.",
      },
      {
        id: "step-e2-2-3",
        orderIndex: 3,
        instruction:
          "Complete 10 circles in each direction, focusing on smooth controlled movements.",
      },
    ],
    tips: [
      "Keep your upper body relatively still",
      "Start with smaller circles and gradually increase size",
      "Maintain balance and control throughout",
    ],
  },
  {
    id: "e2-3",
    name: "Back Squats",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 180,
    description:
      "The king of leg exercises. A compound movement that builds massive strength in the legs, glutes, and core. Essential for lower body development and overall athletic performance.",
    primaryMuscle: "Quadriceps",
    equipment: "Barbell, Squat Rack",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e2-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "primary",
        altText: "Person performing back squats",
        sortIndex: 1,
      },
      {
        id: "media-e2-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80",
        role: "gallery",
        altText: "Back squat depth position",
        sortIndex: 2,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 8,
      repsMax: 8,
      rir: 2,
      restTimeSeconds: 180,
    },
    howToPerformSteps: [
      {
        id: "step-e2-3-1",
        orderIndex: 1,
        instruction:
          "Position the barbell across your upper traps. Unrack and step back with feet shoulder-width apart, toes slightly out.",
      },
      {
        id: "step-e2-3-2",
        orderIndex: 2,
        instruction:
          "Initiate the descent by breaking at the hips and knees simultaneously. Keep your chest up and core tight.",
      },
      {
        id: "step-e2-3-3",
        orderIndex: 3,
        instruction:
          "Descend until your thighs are at least parallel to the ground, maintaining a neutral spine.",
      },
      {
        id: "step-e2-3-4",
        orderIndex: 4,
        instruction:
          "Drive through your heels to stand back up, keeping your knees tracking over your toes.",
      },
    ],
    tips: [
      "Keep your knees in line with your toes throughout",
      "Maintain an upright torso angle",
      "Take a deep breath and brace your core before each rep",
      "Always use safety bars when lifting heavy",
    ],
  },
  {
    id: "e2-4",
    name: "Romanian Deadlifts",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 120,
    description:
      "A hip-hinge movement that specifically targets the hamstrings and glutes. Excellent for posterior chain development and improving hip mobility.",
    primaryMuscle: "Hamstrings",
    equipment: "Barbell",
    category: "main",
    muscleGroup: "Hamstrings",
    gallery: [
      {
        id: "media-e2-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing Romanian deadlifts",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 120,
    },
    howToPerformSteps: [
      {
        id: "step-e2-4-1",
        orderIndex: 1,
        instruction:
          "Stand with feet hip-width apart, holding a barbell at hip level with an overhand grip.",
      },
      {
        id: "step-e2-4-2",
        orderIndex: 2,
        instruction:
          "Keeping your legs nearly straight with a slight knee bend, hinge at the hips and lower the bar along your legs.",
      },
      {
        id: "step-e2-4-3",
        orderIndex: 3,
        instruction:
          "Lower until you feel a stretch in your hamstrings, typically when the bar reaches mid-shin. Drive your hips forward to return to standing.",
      },
    ],
    tips: [
      "Keep the bar close to your body throughout",
      "Maintain a neutral spine - don't round your back",
      "Push your hips back, not down",
      "Feel the stretch in your hamstrings, not your lower back",
    ],
  },
  {
    id: "e2-5",
    name: "Bulgarian Split Squats",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 90,
    description:
      "A unilateral leg exercise that builds strength, balance, and muscle in the quads and glutes. Helps correct muscle imbalances between legs.",
    primaryMuscle: "Quadriceps",
    equipment: "Dumbbells, Bench",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e2-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
        role: "primary",
        altText: "Person performing Bulgarian split squats",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e2-5-1",
        orderIndex: 1,
        instruction:
          "Stand facing away from a bench with a dumbbell in each hand. Place your rear foot on the bench behind you.",
      },
      {
        id: "step-e2-5-2",
        orderIndex: 2,
        instruction:
          "Lower your body by bending your front knee until your thigh is parallel to the ground.",
      },
      {
        id: "step-e2-5-3",
        orderIndex: 3,
        instruction:
          "Push through your front heel to return to the starting position. Complete all reps on one leg before switching.",
      },
    ],
    tips: [
      "Keep your torso upright throughout the movement",
      "Don't let your front knee cave inward",
      "Position your front foot far enough forward for proper depth",
    ],
  },
  {
    id: "e2-6",
    name: "Leg Press",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 90,
    description:
      "A machine-based compound exercise that allows heavy loading of the legs with reduced spinal load. Great for building quad and glute mass.",
    primaryMuscle: "Quadriceps",
    equipment: "Leg Press Machine",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e2-6-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        role: "primary",
        altText: "Person performing leg press",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e2-6-1",
        orderIndex: 1,
        instruction:
          "Sit in the leg press machine with your back flat against the pad. Place your feet shoulder-width apart on the platform.",
      },
      {
        id: "step-e2-6-2",
        orderIndex: 2,
        instruction:
          "Release the safety and lower the platform by bending your knees until they form a 90-degree angle.",
      },
      {
        id: "step-e2-6-3",
        orderIndex: 3,
        instruction:
          "Push through your heels to extend your legs, stopping just before locking out your knees.",
      },
    ],
    tips: [
      "Keep your lower back pressed against the pad",
      "Don't lock out your knees at the top",
      "Control the descent - don't let the weight crash down",
      "Ensure full range of motion without lower back lifting off",
    ],
  },
  {
    id: "e2-7",
    name: "Leg Curls",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    description:
      "An isolation exercise for the hamstrings performed on a machine. Essential for complete hamstring development and knee joint health.",
    primaryMuscle: "Hamstrings",
    equipment: "Leg Curl Machine",
    category: "main",
    muscleGroup: "Hamstrings",
    gallery: [
      {
        id: "media-e2-7-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing leg curls",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e2-7-1",
        orderIndex: 1,
        instruction:
          "Lie face down on the leg curl machine with the pad positioned just above your ankles.",
      },
      {
        id: "step-e2-7-2",
        orderIndex: 2,
        instruction:
          "Curl your legs up by contracting your hamstrings, bringing your heels toward your glutes.",
      },
      {
        id: "step-e2-7-3",
        orderIndex: 3,
        instruction:
          "Squeeze at the top of the movement, then lower the weight under control back to the starting position.",
      },
    ],
    tips: [
      "Keep your hips pressed down into the bench",
      "Don't lift your hips to help curl the weight",
      "Focus on the mind-muscle connection",
    ],
  },
  {
    id: "e2-8",
    name: "Calf Raises",
    sets: 4,
    reps: 20,
    rir: 1,
    restTime: 45,
    description:
      "An isolation exercise targeting the calf muscles. Builds size and strength in the gastrocnemius and soleus muscles for better lower leg development.",
    primaryMuscle: "Calves",
    equipment: "Calf Raise Machine or Smith Machine",
    category: "main",
    muscleGroup: "Calves",
    gallery: [
      {
        id: "media-e2-8-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
        role: "primary",
        altText: "Person performing calf raises",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 20,
      repsMax: 20,
      rir: 1,
      restTimeSeconds: 45,
    },
    howToPerformSteps: [
      {
        id: "step-e2-8-1",
        orderIndex: 1,
        instruction:
          "Position yourself on the calf raise machine with the balls of your feet on the platform and your heels hanging off.",
      },
      {
        id: "step-e2-8-2",
        orderIndex: 2,
        instruction:
          "Rise up onto your toes as high as possible, contracting your calf muscles at the top.",
      },
      {
        id: "step-e2-8-3",
        orderIndex: 3,
        instruction:
          "Lower your heels below the platform level for a full stretch, then repeat.",
      },
    ],
    tips: [
      "Pause at the top of each rep for maximum contraction",
      "Use full range of motion - go deep on the stretch",
      "Keep your knees slightly bent but stable",
    ],
  },
  {
    id: "e2-9",
    name: "Quad Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A standing stretch that targets the quadriceps muscles. Essential for maintaining flexibility and reducing muscle tightness after leg workouts.",
    primaryMuscle: "Quadriceps",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e2-9-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing quad stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e2-9-1",
        orderIndex: 1,
        instruction:
          "Stand on one leg and grab the ankle of your other leg behind you.",
      },
      {
        id: "step-e2-9-2",
        orderIndex: 2,
        instruction:
          "Gently pull your heel toward your glutes while keeping your knees together.",
      },
      {
        id: "step-e2-9-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds feeling a stretch in your quadriceps. Use a wall for balance if needed.",
      },
    ],
    tips: [
      "Keep your knees close together",
      "Stand tall - don't lean forward",
      "Perform on both legs",
    ],
  },
  {
    id: "e2-10",
    name: "Hamstring Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A seated or standing stretch that targets the hamstrings. Improves flexibility and helps prevent injury in the posterior chain muscles.",
    primaryMuscle: "Hamstrings",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Hamstrings",
    gallery: [
      {
        id: "media-e2-10-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing hamstring stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e2-10-1",
        orderIndex: 1,
        instruction:
          "Sit on the ground with one leg extended straight and the other bent with foot against your inner thigh.",
      },
      {
        id: "step-e2-10-2",
        orderIndex: 2,
        instruction:
          "Keeping your back straight, lean forward from your hips toward your extended leg.",
      },
      {
        id: "step-e2-10-3",
        orderIndex: 3,
        instruction:
          "Reach toward your toes until you feel a stretch in your hamstring. Hold for 30 seconds.",
      },
    ],
    tips: [
      "Don't round your back - hinge from the hips",
      "Keep the extended leg straight",
      "Breathe deeply and relax into the stretch",
      "Perform on both legs",
    ],
  },
  {
    id: "e3-1",
    name: "Scapular Pull-Ups",
    sets: 2,
    reps: 10,
    rir: 5,
    restTime: 30,
    description:
      "A preparatory exercise that activates and strengthens the muscles around the shoulder blades. Essential for proper pull-up form and shoulder health.",
    primaryMuscle: "Scapular Stabilizers",
    equipment: "Pull-Up Bar",
    category: "warm-up",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e3-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing scapular pull-ups",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 10,
      repsMax: 10,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e3-1-1",
        orderIndex: 1,
        instruction:
          "Hang from a pull-up bar with arms fully extended and hands slightly wider than shoulder-width.",
      },
      {
        id: "step-e3-1-2",
        orderIndex: 2,
        instruction:
          "Without bending your arms, pull your shoulder blades down and together, elevating your body slightly.",
      },
      {
        id: "step-e3-1-3",
        orderIndex: 3,
        instruction:
          "Hold the contracted position briefly, then release back to a full hang. Repeat.",
      },
    ],
    tips: [
      "Keep your arms straight throughout the movement",
      "Focus on initiating the movement from your shoulder blades",
      "This is a small movement - don't turn it into a full pull-up",
    ],
  },
  {
    id: "e3-2",
    name: "Dead Hangs",
    sets: 2,
    reps: 1,
    rir: 5,
    restTime: 30,
    description:
      "A simple but effective exercise for grip strength and shoulder decompression. Improves shoulder mobility and prepares the body for pulling movements.",
    primaryMuscle: "Forearms",
    equipment: "Pull-Up Bar",
    category: "warm-up",
    muscleGroup: "Forearms",
    gallery: [
      {
        id: "media-e3-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing dead hangs",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e3-2-1",
        orderIndex: 1,
        instruction:
          "Grab a pull-up bar with an overhand grip, hands shoulder-width apart.",
      },
      {
        id: "step-e3-2-2",
        orderIndex: 2,
        instruction:
          "Let your body hang completely relaxed with arms fully extended.",
      },
      {
        id: "step-e3-2-3",
        orderIndex: 3,
        instruction:
          "Hold this position for 20-30 seconds, focusing on relaxing your shoulders and maintaining your grip.",
      },
    ],
    tips: [
      "Let your shoulders rise up toward your ears naturally",
      "Breathe normally throughout the hang",
      "Build up duration gradually over time",
    ],
  },
  {
    id: "e3-3",
    name: "Deadlifts",
    sets: 4,
    reps: 6,
    rir: 2,
    restTime: 180,
    description:
      "One of the most effective full-body exercises. Builds tremendous strength in the posterior chain, including the back, glutes, and hamstrings. Essential for overall power development.",
    primaryMuscle: "Erector Spinae",
    equipment: "Barbell",
    category: "main",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e3-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing deadlifts",
        sortIndex: 1,
      },
      {
        id: "media-e3-3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
        role: "gallery",
        altText: "Deadlift starting position",
        sortIndex: 2,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 6,
      repsMax: 6,
      rir: 2,
      restTimeSeconds: 180,
    },
    howToPerformSteps: [
      {
        id: "step-e3-3-1",
        orderIndex: 1,
        instruction:
          "Stand with feet hip-width apart, barbell over mid-foot. Grip the bar just outside your legs.",
      },
      {
        id: "step-e3-3-2",
        orderIndex: 2,
        instruction:
          "Set your back in a neutral position, chest up, shoulders back. Take a deep breath and brace your core.",
      },
      {
        id: "step-e3-3-3",
        orderIndex: 3,
        instruction:
          "Drive through your heels and extend your hips and knees simultaneously, keeping the bar close to your body.",
      },
      {
        id: "step-e3-3-4",
        orderIndex: 4,
        instruction:
          "Stand tall at the top, then lower the bar back to the ground under control by reversing the movement.",
      },
    ],
    tips: [
      "Keep the bar close to your body throughout the lift",
      "Don't round your back - maintain neutral spine",
      "Push the floor away rather than pulling the bar up",
      "Start with lighter weight to perfect form",
    ],
  },
  {
    id: "e3-4",
    name: "Pull-Ups",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    description:
      "A fundamental bodyweight exercise for back development. Builds strength and size in the lats, biceps, and upper back. One of the best indicators of relative strength.",
    primaryMuscle: "Latissimus Dorsi",
    equipment: "Pull-Up Bar",
    category: "main",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e3-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing pull-ups",
        sortIndex: 1,
      },
      {
        id: "media-e3-4-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "gallery",
        altText: "Pull-up top position",
        sortIndex: 2,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 8,
      repsMax: 8,
      rir: 2,
      restTimeSeconds: 120,
    },
    howToPerformSteps: [
      {
        id: "step-e3-4-1",
        orderIndex: 1,
        instruction:
          "Hang from a pull-up bar with hands slightly wider than shoulder-width, using an overhand grip.",
      },
      {
        id: "step-e3-4-2",
        orderIndex: 2,
        instruction:
          "Pull yourself up by driving your elbows down and back, keeping your chest up.",
      },
      {
        id: "step-e3-4-3",
        orderIndex: 3,
        instruction:
          "Pull until your chin clears the bar, then lower yourself with control back to full arm extension.",
      },
    ],
    tips: [
      "Avoid swinging or using momentum",
      "Pull with your elbows, not your hands",
      "Full range of motion is key - dead hang to chin over bar",
      "Use bands or assisted machine if needed to build strength",
    ],
  },
  {
    id: "e3-5",
    name: "Barbell Rows",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    description:
      "A compound pulling exercise that builds thickness in the mid-back. Targets the lats, rhomboids, and rear delts while improving pulling strength.",
    primaryMuscle: "Latissimus Dorsi",
    equipment: "Barbell",
    category: "main",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e3-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing barbell rows",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e3-5-1",
        orderIndex: 1,
        instruction:
          "Stand with feet hip-width apart, hinge forward at the hips until your torso is about 45 degrees. Hold the barbell with an overhand grip.",
      },
      {
        id: "step-e3-5-2",
        orderIndex: 2,
        instruction:
          "Pull the bar up to your lower chest/upper abs by driving your elbows back. Keep your elbows close to your body.",
      },
      {
        id: "step-e3-5-3",
        orderIndex: 3,
        instruction:
          "Squeeze your shoulder blades together at the top, then lower the bar with control.",
      },
    ],
    tips: [
      "Maintain a neutral spine throughout - don't round your back",
      "Pull to your belly button, not your chest",
      "Keep your core braced to protect your lower back",
    ],
  },
  {
    id: "e3-6",
    name: "Face Pulls",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    description:
      "An essential exercise for rear deltoid and upper back development. Improves posture and shoulder health while balancing out pressing movements.",
    primaryMuscle: "Rear Deltoids",
    equipment: "Cable Machine with Rope Attachment",
    category: "main",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e3-6-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing face pulls",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e3-6-1",
        orderIndex: 1,
        instruction:
          "Set a cable pulley at upper chest height with a rope attachment. Grab the rope with both hands.",
      },
      {
        id: "step-e3-6-2",
        orderIndex: 2,
        instruction:
          "Step back to create tension. Pull the rope toward your face, separating your hands as you pull.",
      },
      {
        id: "step-e3-6-3",
        orderIndex: 3,
        instruction:
          "Focus on pulling your elbows back and squeezing your shoulder blades together. Slowly return to starting position.",
      },
    ],
    tips: [
      "Pull to eye level or slightly above",
      "External rotation at the end of the movement is key",
      "Keep your upper arms parallel to the ground",
    ],
  },
  {
    id: "e3-7",
    name: "Bicep Curls",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    description:
      "The classic bicep isolation exercise. Builds size and strength in the biceps while improving arm aesthetics and pulling power.",
    primaryMuscle: "Biceps",
    equipment: "Dumbbells or Barbell",
    category: "main",
    muscleGroup: "Biceps",
    gallery: [
      {
        id: "media-e3-7-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        role: "primary",
        altText: "Person performing bicep curls",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e3-7-1",
        orderIndex: 1,
        instruction:
          "Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing forward.",
      },
      {
        id: "step-e3-7-2",
        orderIndex: 2,
        instruction:
          "Curl the weights up by bending at the elbows, keeping your upper arms stationary.",
      },
      {
        id: "step-e3-7-3",
        orderIndex: 3,
        instruction:
          "Squeeze your biceps at the top of the movement, then lower the weights under control.",
      },
    ],
    tips: [
      "Don't swing the weights - use controlled motion",
      "Keep your elbows close to your torso",
      "Focus on the negative (lowering) portion",
    ],
  },
  {
    id: "e3-8",
    name: "Hammer Curls",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    description:
      "A bicep variation that also targets the brachialis and brachioradialis. Builds overall arm thickness and grip strength.",
    primaryMuscle: "Biceps",
    equipment: "Dumbbells",
    category: "main",
    muscleGroup: "Biceps",
    gallery: [
      {
        id: "media-e3-8-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        role: "primary",
        altText: "Person performing hammer curls",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e3-8-1",
        orderIndex: 1,
        instruction:
          "Stand holding dumbbells at your sides with palms facing each other (neutral grip).",
      },
      {
        id: "step-e3-8-2",
        orderIndex: 2,
        instruction:
          "Curl the dumbbells up while maintaining the neutral grip throughout the movement.",
      },
      {
        id: "step-e3-8-3",
        orderIndex: 3,
        instruction:
          "Squeeze at the top, then lower with control back to the starting position.",
      },
    ],
    tips: [
      "Keep the neutral grip throughout - don't rotate your wrists",
      "Avoid swinging or using momentum",
      "Can alternate arms or lift both simultaneously",
    ],
  },
  {
    id: "e4-1",
    name: "Arm Circles",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    description:
      "A dynamic warm-up exercise that mobilizes the shoulder joints and increases blood flow to the upper body. Perfect for preparing your shoulders for any upper body workout.",
    primaryMuscle: "Shoulders",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e4-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing arm circles exercise",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 15,
      repsMax: 15,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e4-1-1",
        orderIndex: 1,
        instruction:
          "Stand with your feet shoulder-width apart and extend your arms straight out to the sides at shoulder height.",
      },
      {
        id: "step-e4-1-2",
        orderIndex: 2,
        instruction:
          "Begin making small circular motions with your arms, gradually increasing the size of the circles.",
      },
      {
        id: "step-e4-1-3",
        orderIndex: 3,
        instruction:
          "After 15 circles forward, reverse direction and perform 15 circles backward.",
      },
    ],
    tips: [
      "Keep your core engaged throughout the movement",
      "Start with small circles and gradually increase the diameter",
      "Maintain steady breathing - don't hold your breath",
    ],
  },
  {
    id: "e4-2",
    name: "Band Pull-Aparts",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    description:
      "An excellent warm-up and prehab exercise that activates the rear deltoids and upper back muscles. Helps improve posture and shoulder health.",
    primaryMuscle: "Rear Deltoids",
    equipment: "Resistance Band",
    category: "warm-up",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e4-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing band pull-aparts",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 20,
      repsMax: 20,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e4-2-1",
        orderIndex: 1,
        instruction:
          "Hold a resistance band in front of you at shoulder height with arms extended and hands about shoulder-width apart.",
      },
      {
        id: "step-e4-2-2",
        orderIndex: 2,
        instruction:
          "Pull the band apart by moving your hands outward, squeezing your shoulder blades together.",
      },
      {
        id: "step-e4-2-3",
        orderIndex: 3,
        instruction:
          "Control the return to starting position and repeat for the desired number of reps.",
      },
    ],
    tips: [
      "Focus on squeezing your shoulder blades together",
      "Keep your elbows slightly bent throughout",
      "Use a lighter band to focus on muscle activation",
    ],
  },
  {
    id: "e4-3",
    name: "Dumbbell Press",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    description:
      "A versatile chest exercise that allows for greater range of motion compared to barbell pressing. Excellent for building chest mass and addressing muscle imbalances.",
    primaryMuscle: "Chest",
    equipment: "Dumbbells, Bench",
    category: "main",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e4-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        role: "primary",
        altText: "Person performing dumbbell press",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e4-3-1",
        orderIndex: 1,
        instruction:
          "Lie flat on a bench holding dumbbells at chest level with palms facing forward.",
      },
      {
        id: "step-e4-3-2",
        orderIndex: 2,
        instruction:
          "Press the dumbbells up until your arms are fully extended, bringing them slightly together at the top.",
      },
      {
        id: "step-e4-3-3",
        orderIndex: 3,
        instruction:
          "Lower the dumbbells with control until they're level with your chest, feeling a stretch.",
      },
    ],
    tips: [
      "Keep your feet firmly planted on the ground",
      "Don't bang the dumbbells together at the top",
      "Maintain tension in your chest throughout",
    ],
  },
  {
    id: "e4-4",
    name: "Cable Crossovers",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    description:
      "An isolation exercise that provides constant tension on the chest. Perfect for developing the inner chest and improving muscle definition.",
    primaryMuscle: "Chest",
    equipment: "Cable Machine",
    category: "main",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e4-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800&q=80",
        role: "primary",
        altText: "Person performing cable crossovers",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e4-4-1",
        orderIndex: 1,
        instruction:
          "Set the pulleys to shoulder height or higher. Stand in the center with one foot forward, grasping a handle in each hand.",
      },
      {
        id: "step-e4-4-2",
        orderIndex: 2,
        instruction:
          "With a slight bend in your elbows, bring the handles together in front of your body in a wide arc.",
      },
      {
        id: "step-e4-4-3",
        orderIndex: 3,
        instruction:
          "Squeeze your chest at the peak, then return to starting position with control.",
      },
    ],
    tips: [
      "Focus on the squeeze at the center",
      "Don't let the weight pull you forward",
      "Experiment with different pulley heights for varied stimulation",
    ],
  },
  {
    id: "e4-5",
    name: "Arnold Press",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    description:
      "A shoulder press variation popularized by Arnold Schwarzenegger. Targets all three deltoid heads while incorporating rotation for complete shoulder development.",
    primaryMuscle: "Shoulders",
    equipment: "Dumbbells",
    category: "main",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e4-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
        role: "primary",
        altText: "Person performing Arnold press",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e4-5-1",
        orderIndex: 1,
        instruction:
          "Sit on a bench with back support. Hold dumbbells at shoulder height with palms facing you.",
      },
      {
        id: "step-e4-5-2",
        orderIndex: 2,
        instruction:
          "As you press up, rotate your palms outward so they face forward at the top of the movement.",
      },
      {
        id: "step-e4-5-3",
        orderIndex: 3,
        instruction:
          "Reverse the motion as you lower, rotating palms back toward you.",
      },
    ],
    tips: [
      "Control the rotation - don't rush it",
      "Keep your core tight throughout",
      "Don't go too heavy - form is crucial",
    ],
  },
  {
    id: "e4-6",
    name: "Front Raises",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    description:
      "An isolation exercise targeting the anterior deltoids. Builds shoulder strength and improves the appearance of the front shoulder muscles.",
    primaryMuscle: "Anterior Deltoids",
    equipment: "Dumbbells or Barbell",
    category: "main",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e4-6-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
        role: "primary",
        altText: "Person performing front raises",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e4-6-1",
        orderIndex: 1,
        instruction:
          "Stand with feet shoulder-width apart, holding dumbbells in front of your thighs.",
      },
      {
        id: "step-e4-6-2",
        orderIndex: 2,
        instruction:
          "With a slight bend in your elbows, raise the dumbbells in front of you to shoulder height.",
      },
      {
        id: "step-e4-6-3",
        orderIndex: 3,
        instruction:
          "Pause at the top, then lower the weights back down with control.",
      },
    ],
    tips: [
      "Don't use momentum - keep it controlled",
      "Avoid leaning back as you lift",
      "Can alternate arms or lift both simultaneously",
    ],
  },
  {
    id: "e4-7",
    name: "Skull Crushers",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    description:
      "A tricep isolation exercise that targets all three heads of the triceps. Excellent for building arm size and pressing strength.",
    primaryMuscle: "Triceps",
    equipment: "EZ Bar or Dumbbells",
    category: "main",
    muscleGroup: "Triceps",
    gallery: [
      {
        id: "media-e4-7-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        role: "primary",
        altText: "Person performing skull crushers",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e4-7-1",
        orderIndex: 1,
        instruction:
          "Lie on a bench holding an EZ bar with arms extended above your chest.",
      },
      {
        id: "step-e4-7-2",
        orderIndex: 2,
        instruction:
          "Lower the bar toward your forehead by bending at the elbows, keeping your upper arms stationary.",
      },
      {
        id: "step-e4-7-3",
        orderIndex: 3,
        instruction:
          "Extend your arms back to the starting position, focusing on using your triceps.",
      },
    ],
    tips: [
      "Keep your elbows tucked in - don't let them flare out",
      "Control the descent to protect your elbows",
      "Can lower to forehead or behind head for variation",
    ],
  },
  {
    id: "e4-8",
    name: "Cable Pushdowns",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    description:
      "A popular tricep isolation exercise using a cable machine. Provides constant tension throughout the movement for effective tricep development.",
    primaryMuscle: "Triceps",
    equipment: "Cable Machine",
    category: "main",
    muscleGroup: "Triceps",
    gallery: [
      {
        id: "media-e4-8-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing cable pushdowns",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e4-8-1",
        orderIndex: 1,
        instruction:
          "Stand facing a cable machine with a rope or bar attachment set at upper chest height.",
      },
      {
        id: "step-e4-8-2",
        orderIndex: 2,
        instruction:
          "Keep your elbows tucked at your sides and push the attachment down until your arms are fully extended.",
      },
      {
        id: "step-e4-8-3",
        orderIndex: 3,
        instruction:
          "Squeeze your triceps at the bottom, then let the weight rise back up with control.",
      },
    ],
    tips: [
      "Keep your elbows stationary at your sides",
      "Don't lean forward - stay upright",
      "Focus on the contraction at the bottom",
    ],
  },
  {
    id: "e4-9",
    name: "Chest Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "An effective stretch for the chest muscles. Helps improve flexibility and reduce tightness after upper body pushing exercises.",
    primaryMuscle: "Chest",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e4-9-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing chest stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e4-9-1",
        orderIndex: 1,
        instruction:
          "Stand in a doorway and place your forearm against the door frame with your elbow at 90 degrees.",
      },
      {
        id: "step-e4-9-2",
        orderIndex: 2,
        instruction:
          "Step forward with the opposite leg and lean gently into the stretch.",
      },
      {
        id: "step-e4-9-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds feeling a stretch across your chest. Repeat on the other side.",
      },
    ],
    tips: [
      "Don't force the stretch",
      "Keep your shoulders down and relaxed",
      "Perform on both sides",
    ],
  },
  {
    id: "e4-10",
    name: "Tricep Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A simple overhead stretch for the triceps. Improves flexibility and reduces muscle tension in the back of the arms.",
    primaryMuscle: "Triceps",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Triceps",
    gallery: [
      {
        id: "media-e4-10-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing tricep stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e4-10-1",
        orderIndex: 1,
        instruction:
          "Raise one arm overhead and bend your elbow, reaching your hand down toward your upper back.",
      },
      {
        id: "step-e4-10-2",
        orderIndex: 2,
        instruction:
          "Use your other hand to gently push the bent elbow further back.",
      },
      {
        id: "step-e4-10-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds feeling a stretch in your tricep. Repeat on the other arm.",
      },
    ],
    tips: [
      "Keep your torso upright",
      "Don't force the stretch",
      "Perform on both arms",
    ],
  },
  {
    id: "e5-1",
    name: "Leg Swings",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    description:
      "A dynamic warm-up that mobilizes the hip joint and prepares the legs for training. Improves range of motion and activates the hip flexors and extensors.",
    primaryMuscle: "Hip Flexors",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Hips",
    gallery: [
      {
        id: "media-e5-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing leg swings",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 15,
      repsMax: 15,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e5-1-1",
        orderIndex: 1,
        instruction:
          "Stand next to a wall for support. Swing one leg forward and backward in a controlled motion.",
      },
      {
        id: "step-e5-1-2",
        orderIndex: 2,
        instruction:
          "Keep your torso stable and allow your leg to swing naturally through a comfortable range of motion.",
      },
      {
        id: "step-e5-1-3",
        orderIndex: 3,
        instruction:
          "Complete 15 swings on each leg, then perform side-to-side swings if desired.",
      },
    ],
    tips: [
      "Start with smaller swings and gradually increase range",
      "Don't force the movement",
      "Keep your standing leg slightly bent",
    ],
  },
  {
    id: "e5-2",
    name: "Bodyweight Squats",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    description:
      "A fundamental movement pattern that warms up the entire lower body. Prepares the muscles and joints for weighted squat variations.",
    primaryMuscle: "Quadriceps",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e5-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "primary",
        altText: "Person performing bodyweight squats",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 20,
      repsMax: 20,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e5-2-1",
        orderIndex: 1,
        instruction:
          "Stand with feet shoulder-width apart, toes slightly pointed out.",
      },
      {
        id: "step-e5-2-2",
        orderIndex: 2,
        instruction:
          "Lower your body by bending at the hips and knees, keeping your chest up.",
      },
      {
        id: "step-e5-2-3",
        orderIndex: 3,
        instruction:
          "Descend until thighs are parallel to the ground, then push back up to standing.",
      },
    ],
    tips: [
      "Keep your weight on your heels",
      "Maintain a neutral spine throughout",
      "Focus on movement quality over speed",
    ],
  },
  {
    id: "e5-3",
    name: "Front Squats",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 150,
    description:
      "A squat variation with the bar positioned in front. Places more emphasis on the quads and requires excellent core stability and mobility.",
    primaryMuscle: "Quadriceps",
    equipment: "Barbell, Squat Rack",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e5-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80",
        role: "primary",
        altText: "Person performing front squats",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 8,
      repsMax: 8,
      rir: 2,
      restTimeSeconds: 150,
    },
    howToPerformSteps: [
      {
        id: "step-e5-3-1",
        orderIndex: 1,
        instruction:
          "Position the barbell across your front deltoids with elbows high. Unrack and step back.",
      },
      {
        id: "step-e5-3-2",
        orderIndex: 2,
        instruction:
          "Squat down by breaking at the hips and knees, keeping your torso as upright as possible.",
      },
      {
        id: "step-e5-3-3",
        orderIndex: 3,
        instruction:
          "Drive through your heels to stand back up, maintaining elbow position throughout.",
      },
    ],
    tips: [
      "Keep your elbows as high as possible",
      "More upright torso than back squats",
      "May need wrist mobility work to perform comfortably",
    ],
  },
  {
    id: "e5-4",
    name: "Walking Lunges",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 90,
    description:
      "A unilateral leg exercise that builds strength, balance, and coordination. Excellent for developing the quads, glutes, and improving functional fitness.",
    primaryMuscle: "Quadriceps",
    equipment: "Dumbbells",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e5-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
        role: "primary",
        altText: "Person performing walking lunges",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e5-4-1",
        orderIndex: 1,
        instruction:
          "Hold dumbbells at your sides. Step forward with one leg into a lunge position.",
      },
      {
        id: "step-e5-4-2",
        orderIndex: 2,
        instruction:
          "Lower your back knee toward the ground until both knees are at 90 degrees.",
      },
      {
        id: "step-e5-4-3",
        orderIndex: 3,
        instruction:
          "Push through your front heel to bring your back leg forward into the next lunge. Continue alternating.",
      },
    ],
    tips: [
      "Keep your torso upright throughout",
      "Don't let your front knee pass your toes excessively",
      "Take controlled steps - quality over speed",
    ],
  },
  {
    id: "e5-5",
    name: "Leg Extensions",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    description:
      "An isolation exercise that specifically targets the quadriceps. Great for adding volume to leg training and improving quad development.",
    primaryMuscle: "Quadriceps",
    equipment: "Leg Extension Machine",
    category: "main",
    muscleGroup: "Quads",
    gallery: [
      {
        id: "media-e5-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        role: "primary",
        altText: "Person performing leg extensions",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e5-5-1",
        orderIndex: 1,
        instruction:
          "Sit in the leg extension machine with the pad positioned against your lower shins.",
      },
      {
        id: "step-e5-5-2",
        orderIndex: 2,
        instruction:
          "Extend your legs by contracting your quads until your legs are straight.",
      },
      {
        id: "step-e5-5-3",
        orderIndex: 3,
        instruction:
          "Squeeze at the top, then lower the weight back down with control.",
      },
    ],
    tips: [
      "Don't lock out aggressively at the top",
      "Control the descent - don't let weight crash down",
      "Focus on the quad contraction",
    ],
  },
  {
    id: "e5-6",
    name: "Seated Leg Curls",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 60,
    description:
      "An isolation exercise for the hamstrings performed in a seated position. Provides a different stimulus compared to lying leg curls.",
    primaryMuscle: "Hamstrings",
    equipment: "Seated Leg Curl Machine",
    category: "main",
    muscleGroup: "Hamstrings",
    gallery: [
      {
        id: "media-e5-6-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing seated leg curls",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e5-6-1",
        orderIndex: 1,
        instruction:
          "Sit in the machine with the pad positioned against your lower calves.",
      },
      {
        id: "step-e5-6-2",
        orderIndex: 2,
        instruction:
          "Curl your legs down by contracting your hamstrings as far as possible.",
      },
      {
        id: "step-e5-6-3",
        orderIndex: 3,
        instruction:
          "Squeeze at the bottom, then return to the starting position under control.",
      },
    ],
    tips: [
      "Keep your back pressed against the pad",
      "Point your toes up to maximize hamstring engagement",
      "Use full range of motion",
    ],
  },
  {
    id: "e5-7",
    name: "Hip Thrusts",
    sets: 4,
    reps: 12,
    rir: 2,
    restTime: 90,
    description:
      "One of the best exercises for glute development. Builds strength and size in the glutes while improving hip extension power.",
    primaryMuscle: "Glutes",
    equipment: "Barbell, Bench",
    category: "main",
    muscleGroup: "Glutes",
    gallery: [
      {
        id: "media-e5-7-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "primary",
        altText: "Person performing hip thrusts",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e5-7-1",
        orderIndex: 1,
        instruction:
          "Sit on the ground with your upper back against a bench. Position a barbell over your hips.",
      },
      {
        id: "step-e5-7-2",
        orderIndex: 2,
        instruction:
          "Drive through your heels to lift your hips up until your body forms a straight line from shoulders to knees.",
      },
      {
        id: "step-e5-7-3",
        orderIndex: 3,
        instruction:
          "Squeeze your glutes hard at the top, then lower back down with control.",
      },
    ],
    tips: [
      "Keep your chin tucked to maintain neutral neck position",
      "Push through your heels, not your toes",
      "Use a pad on the barbell for comfort",
      "Focus on glute contraction at the top",
    ],
  },
  {
    id: "e5-8",
    name: "Standing Calf Raises",
    sets: 4,
    reps: 20,
    rir: 1,
    restTime: 45,
    description:
      "A standing variation of calf raises that emphasizes the gastrocnemius muscle. Essential for complete calf development.",
    primaryMuscle: "Calves",
    equipment: "Calf Raise Machine or Smith Machine",
    category: "main",
    muscleGroup: "Calves",
    gallery: [
      {
        id: "media-e5-8-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
        role: "primary",
        altText: "Person performing standing calf raises",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 20,
      repsMax: 20,
      rir: 1,
      restTimeSeconds: 45,
    },
    howToPerformSteps: [
      {
        id: "step-e5-8-1",
        orderIndex: 1,
        instruction:
          "Stand with the balls of your feet on an elevated surface, heels hanging off.",
      },
      {
        id: "step-e5-8-2",
        orderIndex: 2,
        instruction:
          "Rise up onto your toes as high as possible, contracting your calves.",
      },
      {
        id: "step-e5-8-3",
        orderIndex: 3,
        instruction:
          "Hold the peak contraction, then lower your heels below the platform for a full stretch.",
      },
    ],
    tips: [
      "Use full range of motion",
      "Pause at both the top and bottom",
      "Keep your legs relatively straight",
    ],
  },
  {
    id: "e5-9",
    name: "Hip Flexor Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A kneeling stretch that targets the hip flexors. Important for counteracting tightness from sitting and lower body training.",
    primaryMuscle: "Hip Flexors",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Hips",
    gallery: [
      {
        id: "media-e5-9-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing hip flexor stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e5-9-1",
        orderIndex: 1,
        instruction:
          "Kneel on one knee with your other foot flat on the ground in front of you.",
      },
      {
        id: "step-e5-9-2",
        orderIndex: 2,
        instruction:
          "Push your hips forward while keeping your torso upright until you feel a stretch in the front of your hip.",
      },
      {
        id: "step-e5-9-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds, then switch legs. Use a pad under your knee for comfort.",
      },
    ],
    tips: [
      "Keep your torso upright - don't lean forward",
      "Squeeze the glute of the kneeling leg",
      "Perform on both sides",
    ],
  },
  {
    id: "e5-10",
    name: "Glute Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A seated or lying stretch that targets the glutes and piriformis. Helps maintain hip mobility and reduce lower body tightness.",
    primaryMuscle: "Glutes",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Glutes",
    gallery: [
      {
        id: "media-e5-10-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing glute stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e5-10-1",
        orderIndex: 1,
        instruction:
          "Lie on your back with both knees bent. Cross one ankle over the opposite knee.",
      },
      {
        id: "step-e5-10-2",
        orderIndex: 2,
        instruction:
          "Pull the uncrossed leg toward your chest until you feel a stretch in your glute.",
      },
      {
        id: "step-e5-10-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds, then switch to the other side.",
      },
    ],
    tips: [
      "Keep your head and upper back relaxed on the ground",
      "Don't force the stretch",
      "Perform on both sides",
    ],
  },
  {
    id: "e6-1",
    name: "Jumping Jacks",
    sets: 2,
    reps: 20,
    rir: 5,
    restTime: 30,
    description:
      "A classic cardio warm-up that elevates heart rate and warms up the entire body. Perfect for beginning any workout session.",
    primaryMuscle: "Full Body",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Full Body",
    gallery: [
      {
        id: "media-e6-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing jumping jacks",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 20,
      repsMax: 20,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e6-1-1",
        orderIndex: 1,
        instruction:
          "Stand with feet together and arms at your sides.",
      },
      {
        id: "step-e6-1-2",
        orderIndex: 2,
        instruction:
          "Jump while simultaneously spreading your legs and raising your arms overhead.",
      },
      {
        id: "step-e6-1-3",
        orderIndex: 3,
        instruction:
          "Jump back to starting position. Continue in a rhythmic, controlled manner.",
      },
    ],
    tips: [
      "Land softly on the balls of your feet",
      "Maintain a steady rhythm",
      "Keep your core engaged",
    ],
  },
  {
    id: "e6-2",
    name: "High Knees",
    sets: 2,
    reps: 30,
    rir: 5,
    restTime: 30,
    description:
      "A dynamic cardio exercise that elevates heart rate while activating the hip flexors and core. Great for warming up before intense training.",
    primaryMuscle: "Hip Flexors",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Full Body",
    gallery: [
      {
        id: "media-e6-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "primary",
        altText: "Person performing high knees",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 30,
      repsMax: 30,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e6-2-1",
        orderIndex: 1,
        instruction:
          "Stand with feet hip-width apart. Run in place while driving your knees up toward your chest.",
      },
      {
        id: "step-e6-2-2",
        orderIndex: 2,
        instruction:
          "Pump your arms in rhythm with your legs, opposite arm to opposite leg.",
      },
      {
        id: "step-e6-2-3",
        orderIndex: 3,
        instruction:
          "Maintain a quick pace, focusing on lifting your knees as high as comfortable.",
      },
    ],
    tips: [
      "Stay on the balls of your feet",
      "Keep your core tight",
      "Land softly to reduce impact",
    ],
  },
  {
    id: "e6-3",
    name: "Power Cleans",
    sets: 4,
    reps: 6,
    rir: 2,
    restTime: 150,
    description:
      "An explosive Olympic-style lift that develops full-body power. Targets the posterior chain, shoulders, and core while improving athletic performance.",
    primaryMuscle: "Full Body",
    equipment: "Barbell",
    category: "main",
    muscleGroup: "Full Body",
    gallery: [
      {
        id: "media-e6-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing power cleans",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 6,
      repsMax: 6,
      rir: 2,
      restTimeSeconds: 150,
    },
    howToPerformSteps: [
      {
        id: "step-e6-3-1",
        orderIndex: 1,
        instruction:
          "Start in a deadlift position with the barbell over mid-foot. Grip just outside your legs.",
      },
      {
        id: "step-e6-3-2",
        orderIndex: 2,
        instruction:
          "Explosively extend your hips and knees while shrugging your shoulders. As the bar rises, pull yourself under it.",
      },
      {
        id: "step-e6-3-3",
        orderIndex: 3,
        instruction:
          "Catch the bar on your front deltoids in a partial squat position with elbows high. Stand fully upright.",
      },
    ],
    tips: [
      "Focus on explosive hip extension",
      "Keep the bar close to your body",
      "This is a technical lift - consider coaching",
      "Start with lighter weight to master form",
    ],
  },
  {
    id: "e6-4",
    name: "Push Press",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    description:
      "A dynamic overhead pressing movement that uses leg drive to move heavier weights. Builds explosive pressing power and shoulder strength.",
    primaryMuscle: "Shoulders",
    equipment: "Barbell",
    category: "main",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e6-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
        role: "primary",
        altText: "Person performing push press",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 8,
      repsMax: 8,
      rir: 2,
      restTimeSeconds: 120,
    },
    howToPerformSteps: [
      {
        id: "step-e6-4-1",
        orderIndex: 1,
        instruction:
          "Start with the barbell at shoulder height. Stand with feet shoulder-width apart.",
      },
      {
        id: "step-e6-4-2",
        orderIndex: 2,
        instruction:
          "Dip slightly at the knees, then explosively drive up with your legs while pressing the bar overhead.",
      },
      {
        id: "step-e6-4-3",
        orderIndex: 3,
        instruction:
          "Lock out your arms at the top, then lower the bar back to shoulders with control.",
      },
    ],
    tips: [
      "The leg drive should be quick and powerful",
      "Don't lean back excessively",
      "Keep your core tight throughout",
    ],
  },
  {
    id: "e6-5",
    name: "T-Bar Rows",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    description:
      "A rowing variation that allows heavy loading while maintaining a stable position. Excellent for building back thickness and overall pulling strength.",
    primaryMuscle: "Latissimus Dorsi",
    equipment: "T-Bar Row Machine or Barbell",
    category: "main",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e6-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing T-bar rows",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e6-5-1",
        orderIndex: 1,
        instruction:
          "Stand over the T-bar with feet shoulder-width apart. Hinge at the hips and grasp the handles.",
      },
      {
        id: "step-e6-5-2",
        orderIndex: 2,
        instruction:
          "Pull the bar toward your chest, driving your elbows back and squeezing your shoulder blades.",
      },
      {
        id: "step-e6-5-3",
        orderIndex: 3,
        instruction:
          "Lower the weight under control without letting it touch the ground between reps.",
      },
    ],
    tips: [
      "Keep your chest up and back flat",
      "Don't round your lower back",
      "Pull to your lower chest",
    ],
  },
  {
    id: "e6-6",
    name: "Goblet Squats",
    sets: 3,
    reps: 15,
    rir: 2,
    restTime: 60,
    description:
      "A squat variation holding a weight at chest level. Great for teaching proper squat mechanics and building leg strength with less spinal load.",
    primaryMuscle: "Quadriceps",
    equipment: "Dumbbell or Kettlebell",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e6-6-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        role: "primary",
        altText: "Person performing goblet squats",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 2,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e6-6-1",
        orderIndex: 1,
        instruction:
          "Hold a dumbbell or kettlebell at chest height with both hands, close to your body.",
      },
      {
        id: "step-e6-6-2",
        orderIndex: 2,
        instruction:
          "Squat down by pushing your hips back and bending your knees, keeping your chest up.",
      },
      {
        id: "step-e6-6-3",
        orderIndex: 3,
        instruction:
          "Descend until your elbows touch your inner knees, then drive back up through your heels.",
      },
    ],
    tips: [
      "The weight helps you stay upright",
      "Use your elbows to push your knees out at the bottom",
      "Great for teaching squat depth",
    ],
  },
  {
    id: "e6-7",
    name: "Dumbbell Lunges",
    sets: 3,
    reps: 12,
    rir: 2,
    restTime: 60,
    description:
      "A unilateral leg exercise performed with dumbbells. Builds leg strength, balance, and addresses muscle imbalances between sides.",
    primaryMuscle: "Quadriceps",
    equipment: "Dumbbells",
    category: "main",
    muscleGroup: "Legs",
    gallery: [
      {
        id: "media-e6-7-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
        role: "primary",
        altText: "Person performing dumbbell lunges",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 2,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e6-7-1",
        orderIndex: 1,
        instruction:
          "Hold dumbbells at your sides. Step forward into a lunge position.",
      },
      {
        id: "step-e6-7-2",
        orderIndex: 2,
        instruction:
          "Lower your back knee toward the ground until both knees are at 90 degrees.",
      },
      {
        id: "step-e6-7-3",
        orderIndex: 3,
        instruction:
          "Push through your front heel to return to standing. Complete all reps on one leg before switching.",
      },
    ],
    tips: [
      "Keep your torso upright",
      "Don't let your front knee cave inward",
      "Can perform as alternating or static lunges",
    ],
  },
  {
    id: "e6-8",
    name: "Plank",
    sets: 3,
    reps: 1,
    rir: 1,
    restTime: 60,
    description:
      "A fundamental core stability exercise. Builds endurance in the abs, obliques, and lower back while improving overall core strength.",
    primaryMuscle: "Core",
    equipment: "None (Bodyweight)",
    category: "main",
    muscleGroup: "Core",
    gallery: [
      {
        id: "media-e6-8-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing plank",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 1,
      repsMax: 1,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e6-8-1",
        orderIndex: 1,
        instruction:
          "Start in a push-up position but rest on your forearms instead of your hands.",
      },
      {
        id: "step-e6-8-2",
        orderIndex: 2,
        instruction:
          "Keep your body in a straight line from head to heels, engaging your core.",
      },
      {
        id: "step-e6-8-3",
        orderIndex: 3,
        instruction:
          "Hold this position for 30-60 seconds, breathing normally throughout.",
      },
    ],
    tips: [
      "Don't let your hips sag or pike up",
      "Squeeze your glutes for stability",
      "Keep your neck neutral - look at the floor",
      "Build up duration gradually",
    ],
  },
  {
    id: "e6-9",
    name: "Full Body Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A comprehensive stretching routine that targets multiple muscle groups. Perfect for cooling down and improving overall flexibility.",
    primaryMuscle: "Full Body",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Full Body",
    gallery: [
      {
        id: "media-e6-9-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing full body stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e6-9-1",
        orderIndex: 1,
        instruction:
          "Stand and reach your arms overhead, stretching your entire body upward.",
      },
      {
        id: "step-e6-9-2",
        orderIndex: 2,
        instruction:
          "Fold forward at the hips to touch your toes, stretching your hamstrings and back.",
      },
      {
        id: "step-e6-9-3",
        orderIndex: 3,
        instruction:
          "Move through various stretches targeting arms, legs, and torso. Hold each position for 15-20 seconds.",
      },
    ],
    tips: [
      "Never force a stretch",
      "Breathe deeply throughout",
      "Focus on areas that feel particularly tight",
    ],
  },
  {
    id: "e6-10",
    name: "Deep Breathing",
    sets: 2,
    reps: 10,
    rir: 0,
    restTime: 30,
    description:
      "A breathing exercise that promotes relaxation and recovery. Helps lower heart rate and bring the body back to a resting state after training.",
    primaryMuscle: "Respiratory System",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Full Body",
    gallery: [
      {
        id: "media-e6-10-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        role: "primary",
        altText: "Person performing deep breathing",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 10,
      repsMax: 10,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e6-10-1",
        orderIndex: 1,
        instruction:
          "Sit or lie in a comfortable position. Place one hand on your chest and one on your belly.",
      },
      {
        id: "step-e6-10-2",
        orderIndex: 2,
        instruction:
          "Breathe in deeply through your nose for 4 counts, feeling your belly rise.",
      },
      {
        id: "step-e6-10-3",
        orderIndex: 3,
        instruction:
          "Exhale slowly through your mouth for 6 counts. Repeat for 10 breaths.",
      },
    ],
    tips: [
      "Focus on diaphragmatic breathing",
      "Close your eyes to enhance relaxation",
      "Make exhales longer than inhales",
    ],
  },
  {
    id: "e7-1",
    name: "Resistance Band Rows",
    sets: 2,
    reps: 15,
    rir: 5,
    restTime: 30,
    description:
      "A warm-up rowing movement using resistance bands. Activates the upper back and prepares the muscles for heavier pulling exercises.",
    primaryMuscle: "Upper Back",
    equipment: "Resistance Band",
    category: "warm-up",
    muscleGroup: "Back",
    gallery: [
      {
        id: "media-e7-1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        role: "primary",
        altText: "Person performing resistance band rows",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 15,
      repsMax: 15,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e7-1-1",
        orderIndex: 1,
        instruction:
          "Secure a resistance band at chest height. Hold the ends with arms extended forward.",
      },
      {
        id: "step-e7-1-2",
        orderIndex: 2,
        instruction:
          "Pull the band toward your chest, squeezing your shoulder blades together.",
      },
      {
        id: "step-e7-1-3",
        orderIndex: 3,
        instruction:
          "Return to starting position with control. Focus on muscle activation over resistance.",
      },
    ],
    tips: [
      "Keep your elbows close to your body",
      "Focus on squeezing shoulder blades together",
      "Use a lighter band for warm-up purposes",
    ],
  },
  {
    id: "e7-2",
    name: "Push-Up Plus",
    sets: 2,
    reps: 10,
    rir: 5,
    restTime: 30,
    description:
      "A push-up variation that includes scapular protraction. Activates the serratus anterior and prepares the shoulders for pressing movements.",
    primaryMuscle: "Serratus Anterior",
    equipment: "None (Bodyweight)",
    category: "warm-up",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e7-2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing push-up plus",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 10,
      repsMax: 10,
      rir: 5,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e7-2-1",
        orderIndex: 1,
        instruction:
          "Start in a push-up position with arms fully extended.",
      },
      {
        id: "step-e7-2-2",
        orderIndex: 2,
        instruction:
          "Push your upper back toward the ceiling by spreading your shoulder blades apart (protraction).",
      },
      {
        id: "step-e7-2-3",
        orderIndex: 3,
        instruction:
          "Return to neutral, then perform a regular push-up. Continue alternating.",
      },
    ],
    tips: [
      "The 'plus' is the extra push at the top",
      "Focus on scapular movement",
      "Can be done from knees if needed",
    ],
  },
  {
    id: "e7-3",
    name: "Incline Barbell Press",
    sets: 4,
    reps: 8,
    rir: 2,
    restTime: 120,
    description:
      "A barbell variation of the incline press that allows heavier loading. Excellent for developing upper chest strength and size.",
    primaryMuscle: "Upper Chest",
    equipment: "Barbell, Incline Bench",
    category: "main",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e7-3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing incline barbell press",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 8,
      repsMax: 8,
      rir: 2,
      restTimeSeconds: 120,
    },
    howToPerformSteps: [
      {
        id: "step-e7-3-1",
        orderIndex: 1,
        instruction:
          "Set bench to 30-45 degree incline. Lie back and grip the barbell slightly wider than shoulder-width.",
      },
      {
        id: "step-e7-3-2",
        orderIndex: 2,
        instruction:
          "Unrack the bar and lower it to your upper chest with control.",
      },
      {
        id: "step-e7-3-3",
        orderIndex: 3,
        instruction:
          "Press the bar back up to full arm extension, following a slight arc toward your eyes.",
      },
    ],
    tips: [
      "Keep your shoulder blades retracted",
      "Don't bounce the bar off your chest",
      "Use a spotter for heavy sets",
    ],
  },
  {
    id: "e7-4",
    name: "Dumbbell Flyes",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    description:
      "A classic isolation exercise for the chest performed with dumbbells. Provides a deep stretch and focuses on the pectorals with minimal tricep involvement.",
    primaryMuscle: "Chest",
    equipment: "Dumbbells, Bench",
    category: "main",
    muscleGroup: "Chest",
    gallery: [
      {
        id: "media-e7-4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        role: "primary",
        altText: "Person performing dumbbell flyes",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e7-4-1",
        orderIndex: 1,
        instruction:
          "Lie on a flat bench holding dumbbells above your chest with a slight bend in your elbows.",
      },
      {
        id: "step-e7-4-2",
        orderIndex: 2,
        instruction:
          "Lower the dumbbells out to the sides in a wide arc until you feel a stretch in your chest.",
      },
      {
        id: "step-e7-4-3",
        orderIndex: 3,
        instruction:
          "Bring the dumbbells back together above your chest using the same arc motion.",
      },
    ],
    tips: [
      "Maintain the elbow bend throughout - don't straighten arms",
      "Focus on the stretch, not heavy weight",
      "Imagine hugging a large tree",
    ],
  },
  {
    id: "e7-5",
    name: "Seated Dumbbell Press",
    sets: 4,
    reps: 10,
    rir: 2,
    restTime: 90,
    description:
      "A shoulder press performed while seated for stability. Builds strength in all three deltoid heads with less core demand than standing variations.",
    primaryMuscle: "Shoulders",
    equipment: "Dumbbells, Bench",
    category: "main",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e7-5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
        role: "primary",
        altText: "Person performing seated dumbbell press",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 4,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e7-5-1",
        orderIndex: 1,
        instruction:
          "Sit on a bench with back support. Hold dumbbells at shoulder height with palms facing forward.",
      },
      {
        id: "step-e7-5-2",
        orderIndex: 2,
        instruction:
          "Press the dumbbells overhead until your arms are fully extended.",
      },
      {
        id: "step-e7-5-3",
        orderIndex: 3,
        instruction:
          "Lower the weights back to shoulder height with control.",
      },
    ],
    tips: [
      "Keep your back against the pad",
      "Don't bang the dumbbells together at the top",
      "Control the descent",
    ],
  },
  {
    id: "e7-6",
    name: "Reverse Flyes",
    sets: 3,
    reps: 15,
    rir: 1,
    restTime: 60,
    description:
      "An isolation exercise targeting the rear deltoids and upper back. Essential for shoulder balance and improving posture.",
    primaryMuscle: "Rear Deltoids",
    equipment: "Dumbbells",
    category: "main",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e7-6-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
        role: "primary",
        altText: "Person performing reverse flyes",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 15,
      repsMax: 15,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e7-6-1",
        orderIndex: 1,
        instruction:
          "Hinge forward at the hips with a slight knee bend. Hold dumbbells hanging down with a slight elbow bend.",
      },
      {
        id: "step-e7-6-2",
        orderIndex: 2,
        instruction:
          "Raise the dumbbells out to the sides in a reverse flying motion, squeezing your shoulder blades.",
      },
      {
        id: "step-e7-6-3",
        orderIndex: 3,
        instruction:
          "Lower the weights back down with control.",
      },
    ],
    tips: [
      "Keep a slight bend in elbows throughout",
      "Don't use momentum",
      "Focus on rear delt contraction",
    ],
  },
  {
    id: "e7-7",
    name: "Close-Grip Bench",
    sets: 3,
    reps: 10,
    rir: 2,
    restTime: 90,
    description:
      "A bench press variation with a narrower grip that emphasizes the triceps. Also works the inner chest while building pressing strength.",
    primaryMuscle: "Triceps",
    equipment: "Barbell, Bench",
    category: "main",
    muscleGroup: "Triceps",
    gallery: [
      {
        id: "media-e7-7-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
        role: "primary",
        altText: "Person performing close-grip bench press",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 10,
      repsMax: 10,
      rir: 2,
      restTimeSeconds: 90,
    },
    howToPerformSteps: [
      {
        id: "step-e7-7-1",
        orderIndex: 1,
        instruction:
          "Lie on a bench and grip the barbell with hands about shoulder-width apart or slightly closer.",
      },
      {
        id: "step-e7-7-2",
        orderIndex: 2,
        instruction:
          "Lower the bar to your mid to lower chest, keeping your elbows closer to your body than regular bench press.",
      },
      {
        id: "step-e7-7-3",
        orderIndex: 3,
        instruction:
          "Press the bar back up, focusing on tricep engagement.",
      },
    ],
    tips: [
      "Don't grip too narrow - it can strain wrists",
      "Tuck your elbows more than regular bench press",
      "Control the descent",
    ],
  },
  {
    id: "e7-8",
    name: "Overhead Extensions",
    sets: 3,
    reps: 12,
    rir: 1,
    restTime: 60,
    description:
      "A tricep isolation exercise performed overhead. Effectively targets the long head of the triceps for complete arm development.",
    primaryMuscle: "Triceps",
    equipment: "Dumbbell or Cable",
    category: "main",
    muscleGroup: "Triceps",
    gallery: [
      {
        id: "media-e7-8-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        role: "primary",
        altText: "Person performing overhead extensions",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 3,
      repsMin: 12,
      repsMax: 12,
      rir: 1,
      restTimeSeconds: 60,
    },
    howToPerformSteps: [
      {
        id: "step-e7-8-1",
        orderIndex: 1,
        instruction:
          "Stand or sit holding a dumbbell overhead with both hands, arms extended.",
      },
      {
        id: "step-e7-8-2",
        orderIndex: 2,
        instruction:
          "Lower the weight behind your head by bending your elbows, keeping your upper arms stationary.",
      },
      {
        id: "step-e7-8-3",
        orderIndex: 3,
        instruction:
          "Extend your arms back to the starting position, focusing on tricep contraction.",
      },
    ],
    tips: [
      "Keep your elbows pointing forward",
      "Don't let elbows flare out to the sides",
      "Control the stretch - don't go too deep too quickly",
    ],
  },
  {
    id: "e7-9",
    name: "Shoulder Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A relaxing stretch that targets the shoulder muscles and improves flexibility. Perfect for cooling down after an upper body workout.",
    primaryMuscle: "Shoulders",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Shoulders",
    gallery: [
      {
        id: "media-e7-9-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        role: "primary",
        altText: "Person performing shoulder stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e7-9-1",
        orderIndex: 1,
        instruction:
          "Stand or sit with good posture. Bring your right arm across your chest at shoulder height.",
      },
      {
        id: "step-e7-9-2",
        orderIndex: 2,
        instruction:
          "Use your left hand to gently pull your right arm closer to your chest.",
      },
      {
        id: "step-e7-9-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds feeling a stretch in your shoulder. Repeat on the other side.",
      },
    ],
    tips: [
      "Keep your shoulders down and relaxed",
      "Don't rotate your torso",
      "Breathe deeply throughout the stretch",
    ],
  },
  {
    id: "e7-10",
    name: "Tricep Stretch",
    sets: 2,
    reps: 1,
    rir: 0,
    restTime: 30,
    description:
      "A simple overhead stretch for the triceps. Improves flexibility and reduces muscle tension in the back of the arms.",
    primaryMuscle: "Triceps",
    equipment: "None (Bodyweight)",
    category: "stretch",
    muscleGroup: "Triceps",
    gallery: [
      {
        id: "media-e7-10-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        role: "primary",
        altText: "Person performing tricep stretch",
        sortIndex: 1,
      },
    ],
    instructions: {
      sets: 2,
      repsMin: 1,
      repsMax: 1,
      rir: 0,
      restTimeSeconds: 30,
    },
    howToPerformSteps: [
      {
        id: "step-e7-10-1",
        orderIndex: 1,
        instruction:
          "Raise one arm overhead and bend your elbow, reaching your hand down toward your upper back.",
      },
      {
        id: "step-e7-10-2",
        orderIndex: 2,
        instruction:
          "Use your other hand to gently push the bent elbow further back.",
      },
      {
        id: "step-e7-10-3",
        orderIndex: 3,
        instruction:
          "Hold for 30 seconds feeling a stretch in your tricep. Repeat on the other arm.",
      },
    ],
    tips: [
      "Keep your torso upright",
      "Don't force the stretch",
      "Perform on both arms",
    ],
  },
];
