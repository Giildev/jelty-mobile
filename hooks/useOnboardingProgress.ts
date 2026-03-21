import { useEffect, useRef, useState, useCallback } from "react";
import {
  fetchOnboardingProgress,
  type OnboardingProgressResponse,
} from "@/services/api/onboarding";

interface UseOnboardingProgressOptions {
  userId: string | null;
  enabled: boolean; // only poll when true
  intervalMs?: number; // default 10000ms
  onCompleted?: (data: OnboardingProgressResponse) => void;
  onFailed?: (data: OnboardingProgressResponse) => void;
}

interface UseOnboardingProgressReturn {
  progress: OnboardingProgressResponse | null;
  isPolling: boolean;
  error: Error | null;
}

const STAGE_LABELS: Record<string, string> = {
  nutritionist: "Analyzing your profile...",
  chef: "Creating your meal plan...",
  coach: "Building your workout program...",
  grocery_list: "Preparing your shopping list...",
  done: "Your plan is ready!",
};

export function useOnboardingProgress({
  userId,
  enabled,
  intervalMs = 10_000,
  onCompleted,
  onFailed,
}: UseOnboardingProgressOptions): UseOnboardingProgressReturn {
  const [progress, setProgress] = useState<OnboardingProgressResponse | null>(
    null
  );
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;
  const onFailedRef = useRef(onFailed);
  onFailedRef.current = onFailed;

  const fetchProgress = useCallback(async () => {
    if (!userId) return;
    try {
      console.log(`[useOnboardingProgress] Fetching progress for userId: ${userId}`);
      const data = await fetchOnboardingProgress(userId);
      console.log(`[useOnboardingProgress] Progress data received:`, JSON.stringify(data));
      setProgress(data);
      setError(null);

      if (data.status === "completed" || data.stage === "done") {
        console.log(`[useOnboardingProgress] Progress complete! Stage: ${data.stage}, Status: ${data.status}`);
        // Stop polling
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsPolling(false);
        onCompletedRef.current?.(data);
      } else if (data.status === "failed") {
        const errorMsg = (data as any).errorMessage || "Unknown error";
        console.log(`[useOnboardingProgress] Progress failed! Error: ${errorMsg}`);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsPolling(false);
        onFailedRef.current?.(data);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.log(`[useOnboardingProgress] No progress found yet for ${userId}. Backend pipeline hasn't triggered. (404)`);
        // Do not stop polling, backend pipeline might trigger momentarily.
        return;
      }
      console.error(`[useOnboardingProgress] Error fetching progress for ${userId}:`, err.message);
      if (err.response) {
        console.error(`[useOnboardingProgress] Error response:`, err.response.data);
      }
      setError(
        err instanceof Error ? err : new Error("Failed to fetch progress")
      );
      // Do not stop polling on error — backend might be temporarily unavailable
    }
  }, [userId]);

  useEffect(() => {
    console.log(`[useOnboardingProgress] useEffect triggered. Enabled: ${enabled}, UserId: ${userId}`);
    if (!enabled || !userId) {
      console.log(`[useOnboardingProgress] Polling NOT enabled or userId missing`);
      return;
    }

    // Fetch immediately on mount
    console.log(`[useOnboardingProgress] Starting polling for userId: ${userId}`);
    setIsPolling(true);
    fetchProgress();

    // Then poll every intervalMs
    intervalRef.current = setInterval(() => {
      console.log(`[useOnboardingProgress] Polling interval hit for userId: ${userId}`);
      fetchProgress();
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        console.log(`[useOnboardingProgress] Clearing interval for userId: ${userId}`);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPolling(false);
    };
  }, [enabled, userId, intervalMs, fetchProgress]);

  return { progress, isPolling, error };
}

export { STAGE_LABELS };
