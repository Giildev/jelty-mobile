import { View, Text, Pressable, Switch } from "react-native";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUserStore } from "@/store/userStore";

/**
 * Pantalla de configuración
 */
export default function SettingsScreen() {
  const { colorScheme, setColorScheme, isDark } = useColorScheme();
  const { preferences, updatePreferences } = useUserStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    preferences.notifications
  );

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    updatePreferences({ notifications: value });
  };

  return (
    <View className="flex-1 bg-white p-6 dark:bg-gray-900">
      <Text className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Configuración
      </Text>

      {/* Sección de Apariencia */}
      <View className="mb-6">
        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Apariencia
        </Text>

        <View className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <Text className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Tema
          </Text>

          <View className="flex-row gap-2">
            <Pressable
              className={`flex-1 rounded-lg border p-3 ${
                colorScheme === "light"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}
              onPress={() => setColorScheme("light")}
            >
              <Text
                className={`text-center text-sm ${
                  colorScheme === "light"
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Claro
              </Text>
            </Pressable>

            <Pressable
              className={`flex-1 rounded-lg border p-3 ${
                colorScheme === "dark"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}
              onPress={() => setColorScheme("dark")}
            >
              <Text
                className={`text-center text-sm ${
                  colorScheme === "dark"
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Oscuro
              </Text>
            </Pressable>

            <Pressable
              className={`flex-1 rounded-lg border p-3 ${
                colorScheme === "system"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}
              onPress={() => setColorScheme("system")}
            >
              <Text
                className={`text-center text-sm ${
                  colorScheme === "system"
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Sistema
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Sección de Notificaciones */}
      <View className="mb-6">
        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Notificaciones
        </Text>

        <View className="flex-row items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900 dark:text-white">
              Notificaciones push
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Recibe notificaciones en tu dispositivo
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
            thumbColor={notificationsEnabled ? "#ffffff" : "#f3f4f6"}
          />
        </View>
      </View>

      {/* Información de la app */}
      <View className="mt-auto">
        <View className="items-center py-4">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Jelty v1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
}
