import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect, useFocusEffect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect, useCallback } from "react";
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
  const checkOnboarding = useCallback(async () => {
    console.log("[TabLayout] checkOnboarding called - isLoaded:", isLoaded, "isSignedIn:", isSignedIn, "userId:", userId);

    if (!isLoaded) {
      console.log("[TabLayout] Auth not loaded yet, waiting...");
      return;
    }

    if (!isSignedIn || !userId) {
      console.log("[TabLayout] User not signed in or userId missing, skipping onboarding check");
      setCheckingOnboarding(false);
      return;
    }

    setCheckingOnboarding(true);
    try {
      console.log("[TabLayout] Checking onboarding status for userId:", userId);
      console.log("[TabLayout] userId type:", typeof userId);
      const completed = await isOnboardingComplete(userId);
      console.log("[TabLayout] Onboarding completed:", completed);
      setOnboardingCompleted(completed);
    } catch (error) {
      console.error("[TabLayout] Error checking onboarding:", error);
      // En caso de error, asumimos que NO ha completado onboarding
      setOnboardingCompleted(false);
    } finally {
      setCheckingOnboarding(false);
    }
  }, [isLoaded, isSignedIn, userId]);

  // Check onboarding on mount and when auth state changes
  useEffect(() => {
    console.log("[TabLayout] useEffect triggered - checking onboarding");
    checkOnboarding();
  }, [isLoaded, isSignedIn, userId]);

  // Re-check onboarding status whenever this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      console.log("[TabLayout] useFocusEffect triggered - re-checking onboarding");
      // Only re-check if auth is loaded
      if (isLoaded && isSignedIn && userId) {
        checkOnboarding();
      }
    }, [isLoaded, isSignedIn, userId, checkOnboarding])
  );

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
