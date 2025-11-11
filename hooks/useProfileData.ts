import { useMemo } from "react";
import { useUserData } from "@/hooks/useUserData";
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
  refetch: () => void;
}

/**
 * Custom hook to load basic user profile data for Profile screen header
 *
 * OPTIMIZACIÓN:
 * - Usa useUserData (React Query) para caché automático
 * - Fix Issue #4: Removidas dependencias problemáticas que causaban re-renders infinitos
 * - Simplificado: useUserData maneja el caché, no necesitamos lógica manual
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
  const setCachedProfile = useUserStore((state) => state.setCachedProfile);

  // Usar useUserData para obtener datos con React Query (caché automático)
  const { userData, loading, error, refetch } = useUserData(clerkUserId);

  // Transform data to BasicProfileData format
  const data = useMemo<BasicProfileData>(() => {
    const profileData: BasicProfileData = {
      firstName: userData?.profile?.first_name || "",
      lastName: userData?.profile?.last_name || "",
      email: clerkEmail || userData?.user?.email || "",
      createdAt: clerkCreatedAt
        ? new Date(clerkCreatedAt).toISOString()
        : userData?.user?.created_at || null,
    };

    // Update Zustand cache for legacy compatibility (ProfileHeader, etc.)
    if (userData && profileData.firstName) {
      setCachedProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        memberSince: profileData.createdAt,
      });
    }

    return profileData;
  }, [userData, clerkEmail, clerkCreatedAt, setCachedProfile]);

  return {
    data,
    loading,
    error: error as Error | null,
    refetch,
  };
}
