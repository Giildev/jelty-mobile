import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useAuth } from "@clerk/clerk-expo";

/**
 * Hook para logout seguro
 *
 * CRÍTICO: Limpia AMBOS caches (Zustand + React Query) para prevenir
 * leak de datos entre usuarios en el mismo dispositivo.
 *
 * Problemas que resuelve:
 * - Datos de usuario quedan en memoria después de logout
 * - Si otro usuario inicia sesión, podría ver datos del usuario anterior
 * - Cache de React Query persiste entre sesiones
 *
 * Uso:
 * ```tsx
 * const logout = useLogout();
 *
 * <Button onPress={logout}>
 *   Sign Out
 * </Button>
 * ```
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useUserStore((state) => state.clearUser);
  const clearCachedProfile = useUserStore((state) => state.clearCachedProfile);
  const { signOut } = useAuth();

  return async () => {
    try {
      console.log("[useLogout] Starting logout process...");

      // 1. Clear Zustand store (user data, preferences, etc.)
      clearUser();
      clearCachedProfile();
      console.log("[useLogout] Zustand store cleared");

      // 2. Clear React Query cache (CRÍTICO para seguridad)
      // Esto elimina TODOS los datos cacheados incluyendo user data
      queryClient.clear();
      console.log("[useLogout] React Query cache cleared");

      // 3. Sign out from Clerk
      await signOut();
      console.log("[useLogout] Clerk sign out successful");
    } catch (error) {
      console.error("[useLogout] Error during logout:", error);
      // Aún si hay error, intentamos limpiar los caches por seguridad
      throw error;
    }
  };
}
