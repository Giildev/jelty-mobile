/**
 * Workout and Exercise Types
 */

export interface Exercise {
  id: string;
  name: string;
  description?: string; // Brief description of the exercise
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

/**
 * Media type for exercise gallery
 */
export type ExerciseMediaType = "image" | "video";

/**
 * Media role for exercise content
 */
export type ExerciseMediaRole = "primary" | "gallery" | "demonstration";

/**
 * Media item for exercise gallery
 */
export interface ExerciseMediaItem {
  id: string;
  type: ExerciseMediaType;
  url: string;
  role: ExerciseMediaRole;
  thumbnail?: string; // Optional thumbnail for videos
  posterPath?: string; // Optional poster for videos
  altText?: string; // Accessibility description
  caption?: string; // Optional caption
  sortIndex: number; // Order in gallery
}

/**
 * Exercise instructions summary (aggregated from workout_set)
 */
export interface ExerciseInstructions {
  sets: number; // Total number of sets
  repsMin: number; // Minimum reps
  repsMax: number; // Maximum reps
  rir: number; // Reps in Reserve
  restTimeSeconds: number; // Rest time between sets in seconds
}

/**
 * How to perform step
 */
export interface HowToPerformStep {
  id: string;
  orderIndex: number;
  instruction: string;
}

/**
 * Detailed exercise information for the detail view
 */
export interface ExerciseDetail extends Exercise {
  description: string; // Detailed description of the exercise
  primaryMuscle: string; // Primary muscle group targeted
  equipment: string; // Equipment needed
  category: ExerciseType; // warm-up, main, or stretch
  gallery: ExerciseMediaItem[]; // Images/videos of the exercise
  instructions: ExerciseInstructions; // Sets, reps, RIR, rest time summary
  howToPerformSteps: HowToPerformStep[]; // Step-by-step instructions
  tips?: string[]; // Optional form tips or safety notes
}
