import { create } from "zustand";
import { TodayMealPlan, TodayWorkoutResponse } from "@/services/api/plans";

interface DashboardState {
  todayMealPlan: TodayMealPlan | null;
  todayWorkout: TodayWorkoutResponse | null;
  setTodayMealPlan: (plan: TodayMealPlan | null) => void;
  setTodayWorkout: (workout: TodayWorkoutResponse | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  todayMealPlan: null,
  todayWorkout: null,
  setTodayMealPlan: (plan) => set({ todayMealPlan: plan }),
  setTodayWorkout: (workout) => set({ todayWorkout: workout }),
}));
