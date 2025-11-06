import * as SecureStore from "expo-secure-store";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";

/**
 * Token cache para Clerk usando expo-secure-store
 * Proporciona almacenamiento seguro para tokens de autenticación
 */
export const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      const token = await SecureStore.getItemAsync(key);
      return token;
    } catch (error) {
      console.error("Error getting token from secure store:", error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Error saving token to secure store:", error);
    }
  },
};
