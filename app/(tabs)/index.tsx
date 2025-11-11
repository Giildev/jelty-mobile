import { ScrollView, ActivityIndicator, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserData } from "@/hooks/useUserData";

// Home components
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { MealsList } from "@/components/home/MealsList";
import { WorkoutsList } from "@/components/home/WorkoutsList";

// Mock data
import { MOCK_MEALS, MOCK_EXERCISES } from "@/constants/mockData";

/**
 * Home Screen
 * Displays personalized dashboard with daily meals, workouts, and progress
 *
 * OPTIMIZACIÓN: Usa useUserData con React Query para cachear datos del usuario
 * y evitar llamadas redundantes a la BD.
 */
export default function HomeScreen() {
  const { userId } = useAuth();

  // Usar hook con React Query para caché automático
  const { userData, loading, error } = useUserData(userId);

  // Extraer nombre del usuario (con fallback)
  const userName = userData?.profile?.first_name || "User";

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1F024B" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Welcome Header */}
        <WelcomeHeader userName={userName} />

        {/* Today's Meals */}
        <MealsList meals={MOCK_MEALS} />

        {/* Today's Workouts */}
        <WorkoutsList exercises={MOCK_EXERCISES} />
      </ScrollView>
    </SafeAreaView>
  );
}
