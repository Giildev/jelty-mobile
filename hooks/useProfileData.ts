import { useState, useEffect, useCallback } from "react";
import { getUserByClerkId } from "@/services/supabase/users";
import { useUserStore } from "@/store/userStore";

export interface BasicProfileData {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string | null;
}

interface UseProfileDataReturn {
  data: BasicProfileData;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to load basic user profile data for Profile screen header
 * Uses cached data for instant loading (stale-while-revalidate pattern)
 *
 * @param clerkUserId - The Clerk user ID
 * @param clerkEmail - Email from Clerk (fallback)
 * @param clerkCreatedAt - Created date from Clerk (fallback)
 * @returns Basic profile data, loading state, error state, and refetch function
 *
 * @example
 * const { data, loading, error } = useProfileData(user.id, user.email, user.createdAt);
 */
export function useProfileData(
  clerkUserId: string | null | undefined,
  clerkEmail: string | null | undefined,
  clerkCreatedAt: number | null | undefined
): UseProfileDataReturn {
  const cachedProfile = useUserStore((state) => state.cachedProfile);
  const setCachedProfile = useUserStore((state) => state.setCachedProfile);

  // Initialize with cached data if available (instant)
  const [data, setData] = useState<BasicProfileData>(() => {
    if (cachedProfile) {
      return {
        firstName: cachedProfile.firstName,
        lastName: cachedProfile.lastName,
        email: cachedProfile.email,
        createdAt: cachedProfile.memberSince,
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: clerkEmail || "",
      createdAt: clerkCreatedAt ? new Date(clerkCreatedAt).toISOString() : null,
    };
  });

  // Only show loading if no cached data
  const [loading, setLoading] = useState(!cachedProfile);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    if (!clerkUserId) {
      setLoading(false);
      return;
    }

    try {
      // Don't show loading if we have cached data (background refresh)
      if (!cachedProfile) {
        setLoading(true);
      }
      setError(null);

      // Fetch fresh data from database
      const userResult = await getUserByClerkId(clerkUserId);

      const freshData: BasicProfileData = {
        firstName: userResult?.profile?.first_name || "",
        lastName: userResult?.profile?.last_name || "",
        email: clerkEmail || userResult?.user?.email || "",
        createdAt: clerkCreatedAt
          ? new Date(clerkCreatedAt).toISOString()
          : userResult?.user?.created_at || null,
      };

      // Update state with fresh data
      setData(freshData);

      // Update cache for next time
      setCachedProfile({
        firstName: freshData.firstName,
        lastName: freshData.lastName,
        email: freshData.email,
        memberSince: freshData.createdAt,
      });
    } catch (err) {
      console.error("Error loading basic profile data:", err);
      setError(err instanceof Error ? err : new Error("Failed to load profile data"));
    } finally {
      setLoading(false);
    }
  }, [clerkUserId, clerkEmail, clerkCreatedAt, cachedProfile, setCachedProfile]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refetch: loadData,
  };
}
