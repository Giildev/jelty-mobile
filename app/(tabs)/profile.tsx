import { View, Text, Pressable, Alert } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

/**
 * Pantalla de perfil de usuario
 */
export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <View className="flex-1 bg-white p-6 dark:bg-gray-900">
      <View className="items-center py-8">
        <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-blue-500">
          <Text className="text-3xl font-bold text-white">
            {user?.firstName?.charAt(0) || "U"}
          </Text>
        </View>

        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          {user?.fullName || "Usuario"}
        </Text>
        <Text className="mt-2 text-gray-600 dark:text-gray-400">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <View className="mt-8">
        <View className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Nombre
          </Text>
          <Text className="text-base text-gray-900 dark:text-white">
            {user?.firstName || "N/A"}
          </Text>
        </View>

        <View className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Apellido
          </Text>
          <Text className="text-base text-gray-900 dark:text-white">
            {user?.lastName || "N/A"}
          </Text>
        </View>

        <View className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Email
          </Text>
          <Text className="text-base text-gray-900 dark:text-white">
            {user?.primaryEmailAddress?.emailAddress || "N/A"}
          </Text>
        </View>
      </View>

      <View className="mt-auto">
        <Pressable
          className="rounded-lg bg-red-500 p-4 active:bg-red-600"
          onPress={handleSignOut}
        >
          <Text className="text-center text-base font-semibold text-white">
            Cerrar sesión
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
