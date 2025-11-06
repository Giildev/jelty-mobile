import axios, { AxiosError } from "axios";

/**
 * Cliente de API configurado con axios
 * Base URL desde variables de entorno
 */
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor para agregar token de autenticación
 */
apiClient.interceptors.request.use(
  async config => {
    // El token se agregará dinámicamente en los hooks
    // que usen este cliente, ya que necesitamos acceso a useAuth de Clerk
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor para manejo centralizado de errores
 */
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Manejar sesión expirada
      console.log("Session expired, redirecting to login...");
      // Aquí podrías disparar un evento o usar un store para manejar el logout
    }

    if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
