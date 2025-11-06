import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * User type definition
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
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
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
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
      setUser: user => set({ user }),
      updateUser: updates =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      clearUser: () => set({ user: null }),
      updatePreferences: prefs =>
        set({
          preferences: { ...get().preferences, ...prefs },
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Solo persistir ciertos campos si es necesario
      partialize: state => ({
        preferences: state.preferences,
        // user no se persiste por seguridad
      }),
    }
  )
);
