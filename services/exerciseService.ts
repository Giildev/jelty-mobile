import { ExerciseDetail } from "@/types/workout";
import { fetchExerciseById } from "./api/plans";

/**
 * Get exercise detail by ID
 * @param exerciseId - The ID of the exercise to fetch
 * @returns Promise with exercise detail data
 */
export const getExerciseById = async (
  exerciseId: string
): Promise<ExerciseDetail> => {
  const data = await fetchExerciseById(exerciseId);

  if (!data) {
    throw new Error(`Exercise with ID ${exerciseId} not found`);
  }

  return data;
};

/**
 * Get multiple exercises by IDs
 */
export const getExercisesByIds = async (
  exerciseIds: string[]
): Promise<ExerciseDetail[]> => {
  const results = await Promise.all(
    exerciseIds.map(id => fetchExerciseById(id).catch(() => null))
  );
  return results.filter((e): e is ExerciseDetail => e !== null);
};

/**
 * Get all available exercises (Not supported by real API yet)
 */
export const getAllExercises = async (): Promise<ExerciseDetail[]> => {
  return [];
};

/**
 * Get exercises by category (Not supported by real API yet)
 */
export const getExercisesByCategory = async (
  category: "warm-up" | "main" | "stretch"
): Promise<ExerciseDetail[]> => {
  return [];
};

/**
 * Get exercises by muscle group (Not supported by real API yet)
 */
export const getExercisesByMuscleGroup = async (
  muscleGroup: string
): Promise<ExerciseDetail[]> => {
  return [];
};
