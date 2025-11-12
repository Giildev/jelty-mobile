/**
 * Exercise Service
 *
 * Service for fetching exercise data. Currently uses mock data,
 * but can be extended to use real API calls in the future.
 */

import { ExerciseDetail } from "@/types/workout";
import { EXERCISE_DETAILS_MOCK } from "@/constants/mockData";

/**
 * Simulates API delay for realistic loading states
 */
const simulateDelay = (ms: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get exercise detail by ID
 * @param exerciseId - The ID of the exercise to fetch
 * @returns Promise with exercise detail data
 * @throws Error if exercise is not found
 */
export const getExerciseById = async (
  exerciseId: string
): Promise<ExerciseDetail> => {
  // Simulate network delay
  await simulateDelay(100);

  const exercise = EXERCISE_DETAILS_MOCK.find((e) => e.id === exerciseId);

  if (!exercise) {
    throw new Error(`Exercise with ID ${exerciseId} not found`);
  }

  return exercise;
};

/**
 * Get multiple exercises by IDs
 * @param exerciseIds - Array of exercise IDs to fetch
 * @returns Promise with array of exercise details
 */
export const getExercisesByIds = async (
  exerciseIds: string[]
): Promise<ExerciseDetail[]> => {
  // Simulate network delay
  await simulateDelay(150);

  const exercises = EXERCISE_DETAILS_MOCK.filter((e) =>
    exerciseIds.includes(e.id)
  );

  return exercises;
};

/**
 * Get all available exercises
 * @returns Promise with array of all exercise details
 */
export const getAllExercises = async (): Promise<ExerciseDetail[]> => {
  // Simulate network delay
  await simulateDelay(200);

  return EXERCISE_DETAILS_MOCK;
};

/**
 * Get exercises by category (warm-up, main, stretch)
 * @param category - The exercise category to filter by
 * @returns Promise with array of exercise details
 */
export const getExercisesByCategory = async (
  category: "warm-up" | "main" | "stretch"
): Promise<ExerciseDetail[]> => {
  // Simulate network delay
  await simulateDelay(150);

  const exercises = EXERCISE_DETAILS_MOCK.filter((e) => e.category === category);

  return exercises;
};

/**
 * Get exercises by muscle group
 * @param muscleGroup - The muscle group to filter by (e.g., "Chest", "Shoulders")
 * @returns Promise with array of exercise details
 */
export const getExercisesByMuscleGroup = async (
  muscleGroup: string
): Promise<ExerciseDetail[]> => {
  // Simulate network delay
  await simulateDelay(150);

  const exercises = EXERCISE_DETAILS_MOCK.filter(
    (e) => e.primaryMuscle.toLowerCase() === muscleGroup.toLowerCase()
  );

  return exercises;
};
