import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Link } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";

/**
 * Pantalla de inicio de sesión
 */
export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ message: string }> };
      Alert.alert(
        "Error",
        error.errors?.[0]?.message || "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 dark:bg-gray-900">
      <View className="flex-1 justify-center">
        <Text className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Bienvenido a Jelty
        </Text>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="tu@email.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Contraseña
          </Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Pressable
          className="mb-4 rounded-lg bg-blue-500 p-4 active:bg-blue-600 disabled:opacity-50"
          onPress={onSignInPress}
          disabled={loading || !email || !password}
        >
          <Text className="text-center text-base font-semibold text-white">
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
          </Text>
          <Link href="/(auth)/sign-up" asChild>
            <Pressable>
              <Text className="font-semibold text-blue-500">Regístrate</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
