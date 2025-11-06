/**
 * App configuration constants
 */

export const APP_CONFIG = {
  name: "Jelty",
  version: "1.0.0",
  apiUrl: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",
  env: process.env.EXPO_PUBLIC_ENV || "development",
} as const;

export const STORAGE_KEYS = {
  userPreferences: "user-preferences",
  theme: "app-theme",
  language: "app-language",
} as const;

export const API_TIMEOUT = 10000; // 10 seconds

export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const;
