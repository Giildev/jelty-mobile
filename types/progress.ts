/**
 * Progress and Tracking Types
 */

export interface DailyProgress {
  date: string; // ISO date string
  caloriesConsumed: number;
  caloriesTarget: number;
  steps: number;
  stepsTarget?: number;
  weightChange: number; // kg (negative = loss, positive = gain)
  exercisesCompleted: number;
  exercisesTotal: number;
  completionPercentage: number; // 0-100
}

export interface Streak {
  currentStreak: number; // days
  longestStreak: number; // days
  lastActiveDate: string; // ISO date string
}

export interface DashboardData {
  progress: DailyProgress;
  streak: Streak;
}
