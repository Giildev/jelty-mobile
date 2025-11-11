import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { isOnboardingComplete } from "@/services/supabase/onboarding";
import { useUserStore } from "@/store/userStore";

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
 *
 * OPTIMIZACIÓN: Cachea el estado de onboarding en Zustand para evitar
 * queries redundantes a Supabase en cada navegación.
 */
export default function TabLayout() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);

  // Leer estado de onboarding desde cache (Zustand)
  const cachedOnboardingCompleted = useUserStore(state => state.onboardingCompleted);
  const setOnboardingCompleted = useUserStore(state => state.setOnboardingCompleted);

  // Usar cache como estado local (fallback a false si es null)
  const [onboardingCompleted, setLocalOnboardingCompleted] = useState(
    cachedOnboardingCompleted ?? false
  );

  // Verificar si el usuario completó el onboarding (solo si cache es null)
  const checkOnboarding = useCallback(async () => {
    console.log("[TabLayout] checkOnboarding called - cached:", cachedOnboardingCompleted);

    if (!isLoaded) {
      console.log("[TabLayout] Auth not loaded yet, waiting...");
      return;
    }

    if (!isSignedIn || !userId) {
      console.log("[TabLayout] User not signed in, skipping onboarding check");
      setCheckingOnboarding(false);
      return;
    }

    // OPTIMIZACIÓN: Solo verificar si NO tenemos el valor cacheado
    if (cachedOnboardingCompleted !== null) {
      console.log("[TabLayout] Using cached onboarding status:", cachedOnboardingCompleted);
      setLocalOnboardingCompleted(cachedOnboardingCompleted);
      setCheckingOnboarding(false);
      return;
    }

    // Primera vez o cache invalidado - verificar con BD
    setCheckingOnboarding(true);
    try {
      console.log("[TabLayout] Fetching onboarding status from DB for userId:", userId);
      const completed = await isOnboardingComplete(userId);
      console.log("[TabLayout] Onboarding completed:", completed);

      // Guardar en cache Y estado local
      setOnboardingCompleted(completed);
      setLocalOnboardingCompleted(completed);
    } catch (error) {
      console.error("[TabLayout] Error checking onboarding:", error);
      // En caso de error, asumimos que NO ha completado onboarding
      setOnboardingCompleted(false);
      setLocalOnboardingCompleted(false);
    } finally {
      setCheckingOnboarding(false);
    }
  }, [isLoaded, isSignedIn, userId, cachedOnboardingCompleted, setOnboardingCompleted]);

  // Check onboarding on mount and when auth state changes
  useEffect(() => {
    console.log("[TabLayout] useEffect triggered - checking onboarding");
    checkOnboarding();
  }, [checkOnboarding]);

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
    return <Redirect href="/(onboarding)" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1F024B", // Primary Purple
        tabBarInactiveTintColor: "#9ca3af", // Gray-400
        headerShown: false, // Hide headers for all tabs
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
        name="meal-plan"
        options={{
          title: "Meal Plan",
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          title: "Grocery",
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      {/* Ocultar tabs antiguos */}
      <Tabs.Screen
        name="settings"
        options={{
          href: null, // Oculta el tab
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null, // Oculta el tab
        }}
      />
    </Tabs>
  );
}
