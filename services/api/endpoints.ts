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

  // User
  user: {
    profile: "/user/profile",
    update: "/user/update",
    delete: "/user/delete",
  },

  // Ejemplos adicionales
  posts: {
    list: "/posts",
    create: "/posts",
    detail: (id: string) => `/posts/${id}`,
    update: (id: string) => `/posts/${id}`,
    delete: (id: string) => `/posts/${id}`,
  },

  // Chef/Recipes
  chef: {
    recipes: "/api/v1/agents/chef/recipes", // POST with userId
    recipeDetail: (recipeId: string) => `/api/v1/agents/chef/recipe/${recipeId}`, // GET
  },
} as const;
