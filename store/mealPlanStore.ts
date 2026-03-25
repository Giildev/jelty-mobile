import { create } from "zustand";
import { TodayMealPlan, fetchTodayMealPlan, fetchWeeklyMealPlan, fetchMonthlyMealPlan } from "@/services/api/plans";
import { format, startOfWeek, startOfMonth } from "date-fns";

interface MealPlanState {
  dailyPlans: Record<string, TodayMealPlan>; // key: YYYY-MM-DD
  weeklyPlans: Record<string, TodayMealPlan[]>; // key: YYYY-WW (or start of week date)
  monthlyPlans: Record<string, TodayMealPlan[]>; // key: YYYY-MM
  loading: boolean;
  error: string | null;

  // Actions
  getDailyPlan: (userId: string, date: Date, forceFetch?: boolean) => Promise<TodayMealPlan | null>;
  getWeeklyPlan: (userId: string, date: Date, forceFetch?: boolean) => Promise<TodayMealPlan[]>;
  getMonthlyPlan: (userId: string, date: Date, forceFetch?: boolean) => Promise<TodayMealPlan[]>;
  clearCache: () => void;
}

export const useMealPlanStore = create<MealPlanState>((set, get) => ({
  dailyPlans: {},
  weeklyPlans: {},
  monthlyPlans: {},
  loading: false,
  error: null,

  getDailyPlan: async (userId, date, forceFetch = false) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const { dailyPlans } = get();

    if (!forceFetch && dailyPlans[dateKey]) {
      return dailyPlans[dateKey];
    }

    set({ loading: true, error: null });
    try {
      const plan = await fetchTodayMealPlan(userId, dateKey);
      set(state => ({
        dailyPlans: { ...state.dailyPlans, [dateKey]: plan },
        loading: false,
      }));
      return plan;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch daily plan", loading: false });
      return null;
    }
  },

  getWeeklyPlan: async (userId, date, forceFetch = false) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekKey = format(weekStart, "yyyy-MM-dd");
    const { weeklyPlans } = get();

    if (!forceFetch && weeklyPlans[weekKey]) {
      return weeklyPlans[weekKey];
    }

    set({ loading: true, error: null });
    try {
      const plans = await fetchWeeklyMealPlan(userId, format(date, "yyyy-MM-dd"));
      set(state => ({
        weeklyPlans: { ...state.weeklyPlans, [weekKey]: plans },
        loading: false,
      }));
      return plans;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch weekly plan", loading: false });
      return [];
    }
  },

  getMonthlyPlan: async (userId, date, forceFetch = false) => {
    const monthStart = startOfMonth(date);
    const monthKey = format(monthStart, "yyyy-MM");
    const { monthlyPlans } = get();

    if (!forceFetch && monthlyPlans[monthKey]) {
      return monthlyPlans[monthKey];
    }

    set({ loading: true, error: null });
    try {
      const plans = await fetchMonthlyMealPlan(userId, format(date, "yyyy-MM-dd"));
      set(state => ({
        monthlyPlans: { ...state.monthlyPlans, [monthKey]: plans },
        loading: false,
      }));
      return plans;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch monthly plan", loading: false });
      return [];
    }
  },

  clearCache: () => set({ dailyPlans: {}, weeklyPlans: {}, monthlyPlans: {} }),
}));
