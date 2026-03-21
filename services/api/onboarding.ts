import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface OnboardingPipelineResponse {
  jobId: string;
  status: "processing";
}

export interface OnboardingProgressResponse {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  stage: "nutritionist" | "chef" | "coach" | "grocery_list" | "done";
  percent: number;
  failedItems: Array<{ day: number; slot: number; error: string }>;
  mealPlanId: string | null;
  workoutProgramId: string | null;
  assessmentId: string | null;
}

/**
 * Triggers the AI pipeline on the backend.
 * Returns immediately with jobId — pipeline runs in background.
 */
export async function triggerOnboardingPipeline(
  userId: string
): Promise<OnboardingPipelineResponse> {
  const response = await apiClient.post(API_ENDPOINTS.onboarding.completed, {
    userId,
  });
  return response.data.data;
}

/**
 * Fetches current pipeline progress.
 * Call this every 10 seconds until status === 'completed'.
 */
export async function fetchOnboardingProgress(
  userId: string
): Promise<OnboardingProgressResponse> {
  const response = await apiClient.get(
    API_ENDPOINTS.onboarding.progress(userId)
  );
  return response.data.data;
}
