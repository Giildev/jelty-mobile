/**
 * Workout and Exercise Types
 */

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rir: number; // Reps in Reserve
  imageUrl?: string; // Optional for future use
  muscleGroup?: string; // e.g., "Chest", "Shoulders", "Arms"
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
