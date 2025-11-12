import { ScrollView, ActivityIndicator, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import { useUserData } from "@/hooks/useUserData";
import { useDailyMessage } from "@/hooks/useDailyMessage";

// Home components
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { MotivationalBanner } from "@/components/home/MotivationalBanner";
import { MealsList } from "@/components/home/MealsList";
import { WorkoutsList } from "@/components/home/WorkoutsList";

// Mock data
import { MOCK_SCHEDULED_MEALS, MOCK_SCHEDULED_EXERCISES } from "@/constants/mockData";

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

  // Obtener mensaje motivacional del día
  const { message, loading: messageLoading } = useDailyMessage();

  // Extraer nombre del usuario (con fallback)
  const userName = userData?.profile?.first_name || "User";

  // Filter meals and exercises for today
  const today = format(new Date(), "yyyy-MM-dd");
  const todayMeals = MOCK_SCHEDULED_MEALS
    .filter((meal) => meal.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  const todayExercises = MOCK_SCHEDULED_EXERCISES
    .filter((exercise) => exercise.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

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

        {/* Daily Motivational Banner */}
        <MotivationalBanner
          message={message?.message_text || ""}
          loading={messageLoading}
        />

        {/* Today's Meals */}
        <MealsList meals={todayMeals} />

        {/* Today's Workouts */}
        <WorkoutsList exercises={todayExercises} />
      </ScrollView>
    </SafeAreaView>
  );
}
