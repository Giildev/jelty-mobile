import { create } from "zustand";
import { TodayWorkoutResponse, fetchTodayWorkout, fetchWeeklyWorkouts, fetchMonthlyWorkouts } from "@/services/api/plans";
import { format, startOfWeek, startOfMonth } from "date-fns";

interface WorkoutState {
  dailyWorkouts: Record<string, TodayWorkoutResponse>; // key: YYYY-MM-DD
  weeklyWorkouts: Record<string, TodayWorkoutResponse[]>; // key: YYYY-MM-DD (start of week)
  monthlyWorkouts: Record<string, TodayWorkoutResponse[]>; // key: YYYY-MM
  loading: boolean;
  error: string | null;

  // Actions
  getDailyWorkout: (userId: string, date: Date, forceFetch?: boolean) => Promise<TodayWorkoutResponse | null>;
  getWeeklyWorkouts: (userId: string, date: Date, forceFetch?: boolean) => Promise<TodayWorkoutResponse[]>;
  getMonthlyWorkouts: (userId: string, date: Date, forceFetch?: boolean) => Promise<TodayWorkoutResponse[]>;
  clearCache: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  dailyWorkouts: {},
  weeklyWorkouts: {},
  monthlyWorkouts: {},
  loading: false,
  error: null,

  getDailyWorkout: async (userId, date, forceFetch = false) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const { dailyWorkouts } = get();

    if (!forceFetch && dailyWorkouts[dateKey]) {
      return dailyWorkouts[dateKey];
    }

    set({ loading: true, error: null });
    try {
      const workout = await fetchTodayWorkout(userId, dateKey);
      set(state => ({
        dailyWorkouts: { ...state.dailyWorkouts, [dateKey]: workout },
        loading: false,
      }));
      return workout;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch daily workout", loading: false });
      return null;
    }
  },

  getWeeklyWorkouts: async (userId, date, forceFetch = false) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekKey = format(weekStart, "yyyy-MM-dd");
    const { weeklyWorkouts } = get();

    if (!forceFetch && weeklyWorkouts[weekKey]) {
      return weeklyWorkouts[weekKey];
    }

    set({ loading: true, error: null });
    try {
      const workouts = await fetchWeeklyWorkouts(userId, format(date, "yyyy-MM-dd"));
      set(state => ({
        weeklyWorkouts: { ...state.weeklyWorkouts, [weekKey]: workouts },
        loading: false,
      }));
      return workouts;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch weekly workouts", loading: false });
      return [];
    }
  },

  getMonthlyWorkouts: async (userId, date, forceFetch = false) => {
    const monthStart = startOfMonth(date);
    const monthKey = format(monthStart, "yyyy-MM");
    const { monthlyWorkouts } = get();

    if (!forceFetch && monthlyWorkouts[monthKey]) {
      return monthlyWorkouts[monthKey];
    }

    set({ loading: true, error: null });
    try {
      const workouts = await fetchMonthlyWorkouts(userId, format(date, "yyyy-MM-dd"));
      set(state => ({
        monthlyWorkouts: { ...state.monthlyWorkouts, [monthKey]: workouts },
        loading: false,
      }));
      return workouts;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch monthly workouts", loading: false });
      return [];
    }
  },

  clearCache: () => set({ dailyWorkouts: {}, weeklyWorkouts: {}, monthlyWorkouts: {} }),
}));
