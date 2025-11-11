/**
 * Workout and Exercise Types
 */

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rir: number; // Reps in Reserve
  restTime: number; // Rest time in seconds
  imageUrl?: string; // Optional for future use
  muscleGroup?: string; // e.g., "Chest", "Shoulders", "Arms"
}

export type ExerciseType = "warm-up" | "main" | "stretch";

/**
 * Scheduled Exercise - Extends Exercise with scheduling information
 */
export interface ScheduledExercise extends Exercise {
  date: string; // ISO date string "2025-11-10"
  time: string; // Time in HH:mm format "08:00", "13:00"
  type: ExerciseType; // Type of exercise (warm-up, main, stretch)
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration?: number; // minutes
  intensity?: "low" | "medium" | "high";
}

export interface DailyWorkoutPlan {
  date: string; // ISO date string
  workouts: Workout[];
}

/**
 * Weekly Workout Plan
 */
export interface WeeklyWorkoutPlan {
  weekStart: string; // ISO date string for Monday of the week
  exercises: ScheduledExercise[];
}

/**
 * View mode for workout plan calendar
 */
export type WorkoutPlanViewMode = "day" | "week" | "month";
