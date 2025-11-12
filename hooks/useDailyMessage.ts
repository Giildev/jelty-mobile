import { useQuery } from "@tanstack/react-query";
import { getDailyMessage } from "@/services/supabase/dailyMessage";
import type { DbSystemDailyMessage } from "@/types/database";

/**
 * Hook personalizado para cargar el mensaje motivacional diario con React Query
 *
 * OPTIMIZACIÓN:
 * - Cachea el mensaje diario globalmente
 * - staleTime: 1 hora (el mensaje cambia solo una vez al día)
 * - Solo hace una petición a la BD por día
 * - Refresca automáticamente cuando cambia el día
 *
 * Uso:
 * ```tsx
 * const { message, loading, error } = useDailyMessage();
 * ```
 *
 * @returns message, loading, error
 */
export function useDailyMessage() {
  const {
    data: message,
    isLoading,
    error,
  } = useQuery({
    // Query key: ['dailyMessage', today's date] - cambia cada día
    queryKey: ["dailyMessage", new Date().toDateString()],

    // Query function: llamar getDailyMessage
    queryFn: async () => {
      console.log("[useDailyMessage] Fetching daily message");
      const data = await getDailyMessage();

      if (!data) {
        // Si no hay mensaje, retornar un mensaje por defecto
        return {
          id: "default",
          message_text: "Welcome to Jelty! Let's make today count.",
          day_of_month: new Date().getDate(),
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as DbSystemDailyMessage;
      }

      return data;
    },

    // Configuración de caché
    staleTime: 60 * 60 * 1000, // 1 hora (el mensaje no cambia frecuentemente)
    gcTime: 24 * 60 * 60 * 1000, // 24 horas

    // No refetch automático (el mensaje solo cambia una vez al día)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    message,
    loading: isLoading,
    error,
  };
}
