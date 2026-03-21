/**
 * Endpoints de la API
 * Centraliza todas las rutas de la API para fácil mantenimiento
 */

export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },

  // Onboarding
  onboarding: {
    completed: "/onboarding/completed",
    progress: (userId: string) => `/onboarding/progress/${userId}`,
  },

  // Plans
  plans: {
    mealPlanToday: "/meal-plan/today",
    workoutToday: "/workout/today",
    recipeDetail: (id: string) => `/meal-plan/recipe/${id}`,
    exerciseDetail: (id: string) => `/workout/exercise/${id}`,
  },
} as const;
