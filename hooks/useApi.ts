import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import apiClient from "@/services/api/client";
import { useAuth } from "@clerk/clerk-expo";

/**
 * Hook personalizado para hacer llamadas a la API
 * Maneja loading, error states y agrega automáticamente el token de auth
 */
export function useApi<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  /**
   * Función genérica para hacer requests
   */
  const request = useCallback(
    async (
      method: "get" | "post" | "put" | "delete",
      url: string,
      payload?: unknown
    ) => {
      setLoading(true);
      setError(null);

      try {
        // Obtener token de Clerk
        const token = await getToken();

        // Configurar headers con token
        const config = {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        };

        // Hacer request
        const response =
          method === "get" || method === "delete"
            ? await apiClient[method](url, config)
            : await apiClient[method](url, payload, config);

        setData(response.data);
        return response.data;
      } catch (err) {
        const error = err as AxiosError;
        const errorMessage =
          (error.response?.data as { message?: string })?.message ||
          error.message ||
          "Error desconocido";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  /**
   * GET request
   */
  const get = useCallback(
    (url: string) => {
      return request("get", url);
    },
    [request]
  );

  /**
   * POST request
   */
  const post = useCallback(
    (url: string, data: unknown) => {
      return request("post", url, data);
    },
    [request]
  );

  /**
   * PUT request
   */
  const put = useCallback(
    (url: string, data: unknown) => {
      return request("put", url, data);
    },
    [request]
  );

  /**
   * DELETE request
   */
  const del = useCallback(
    (url: string) => {
      return request("delete", url);
    },
    [request]
  );

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: del,
  };
}
