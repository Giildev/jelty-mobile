import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * User type definition
 */
export interface User {
  id: string; // Clerk user ID
  supabaseUserId?: string; // Supabase user_user.id (UUID) - cached for quick access
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  country?: string;
  countryCode?: string;
  // Onboarding fields
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  address?: string;
  zipCode?: string;
  heightCm?: number;
  weightKg?: number;
  bodyfatPercentage?: number;
  measurementSystem?: "metric" | "imperial";
  activityLevel?: string;
  onboardingCompleted?: boolean;
}

/**
 * Cached basic profile data for instant loading
 */
export interface CachedProfileData {
  firstName: string;
  lastName: string;
  email: string;
  memberSince: string | null;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  language: string;
}

/**
 * User store state and actions
 */
interface UserState {
  user: User | null;
  preferences: UserPreferences;
  cachedProfile: CachedProfileData | null;
  onboardingCompleted: boolean | null; // null = no verificado, true/false = verificado
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setCachedProfile: (profile: CachedProfileData) => void;
  clearCachedProfile: () => void;
  setOnboardingCompleted: (completed: boolean) => void;
}

/**
 * User store con persistencia
 */
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      preferences: {
        theme: "system",
        notifications: true,
        language: "es",
      },
      cachedProfile: null,
      onboardingCompleted: null, // null por defecto = no verificado aún
      setUser: user => set({ user }),
      updateUser: updates =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      clearUser: () => set({ user: null, onboardingCompleted: null }), // Clear onboarding on logout
      updatePreferences: prefs =>
        set({
          preferences: { ...get().preferences, ...prefs },
        }),
      setCachedProfile: profile => set({ cachedProfile: profile }),
      clearCachedProfile: () => set({ cachedProfile: null }),
      setOnboardingCompleted: completed => set({ onboardingCompleted: completed }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Persistir preferences, cachedProfile y onboardingCompleted
      partialize: state => ({
        preferences: state.preferences,
        cachedProfile: state.cachedProfile,
        onboardingCompleted: state.onboardingCompleted,
        // user no se persiste por seguridad (datos completos sensibles)
      }),
    }
  )
);
