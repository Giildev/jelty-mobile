import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { isOnboardingComplete } from "@/services/supabase/onboarding";

/**
 * Tab bar icon component
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

/**
 * Layout de tabs - Punto de entrada protegido de la app
 * Requiere autenticación para acceder
 */
export default function TabLayout() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  // Verificar si el usuario completó el onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      if (isLoaded && isSignedIn && userId) {
        try {
          const completed = await isOnboardingComplete(userId);
          setOnboardingCompleted(completed);
        } catch (error) {
          console.error("Error checking onboarding:", error);
          // En caso de error, asumimos que NO ha completado onboarding
          setOnboardingCompleted(false);
        } finally {
          setCheckingOnboarding(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setCheckingOnboarding(false);
      }
    };

    checkOnboarding();
  }, [isLoaded, isSignedIn, userId]);

  // Mostrar loading mientras se verifica el estado de autenticación y onboarding
  if (!isLoaded || checkingOnboarding) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Redirigir a sign-in si no está autenticado
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Redirigir al onboarding si no lo ha completado
  if (!onboardingCompleted) {
    return <Redirect href="/(onboarding)/step-1" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#9ca3af",
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e5e7eb",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
      {/* Ocultar la ruta "two" del tab existente */}
      <Tabs.Screen
        name="two"
        options={{
          href: null, // Oculta el tab
        }}
      />
    </Tabs>
  );
}
