/**
 * Workout and Exercise Types
 */

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  category: ExerciseType;
  primaryMuscle: string;
  equipment: string;
  numberOfSets: number;
  repsPerSet: number | string;
  weightMin: string;
  weightMax: string;
  rir: number;
  restSeconds: number;
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
  instructions: ExerciseInstructions;
  howToPerformSteps: HowToPerformStep[];
  tips?: string[];
  gallery: ExerciseMediaItem[];
}

/**
 * New API Response Structure
 */
export interface WorkoutBlockData {
  blockType: ExerciseType;
  title: string;
  totalEstimatedMinutes: number;
  exercises: Exercise[];
}

export interface WorkoutSummary {
  totalExercises: number;
  totalEstimatedMinutes: number;
  focusAreas: string[];
  difficultyLevel: string;
}

export interface TodayWorkoutData {
  warmUp: WorkoutBlockData;
  main: WorkoutBlockData;
  stretch: WorkoutBlockData;
  summary: WorkoutSummary;
}

export interface TodayWorkoutApiResponse {
  success: boolean;
  data: TodayWorkoutData;
}
