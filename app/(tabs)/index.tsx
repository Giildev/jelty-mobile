import { ScrollView, ActivityIndicator, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import { useUserData } from "@/hooks/useUserData";
import { useDailyMessage } from "@/hooks/useDailyMessage";
import { useUserRecipes } from "@/hooks/useUserRecipes";

// Home components
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { MotivationalBanner } from "@/components/home/MotivationalBanner";
import { MealsList } from "@/components/home/MealsList";
import { WorkoutsList } from "@/components/home/WorkoutsList";

// Utilities
import { getTodayDateString, getMealsForDate } from "@/utils/mealGroupingHelpers";

// Mock data (only for workouts for now)
import { MOCK_SCHEDULED_EXERCISES } from "@/constants/mockData";

/**
 * Home Screen
 * Displays personalized dashboard with daily meals, workouts, and progress
 *
 * OPTIMIZACIÓN: Usa useUserData con React Query para cachear datos del usuario
 * y evitar llamadas redundantes a la BD.
 */
export default function HomeScreen() {
  const { userId } = useAuth();

  // Fetch user data with React Query cache
  const { userData, loading: userLoading, error: userError } = useUserData(userId);

  // Fetch user recipes/meals with React Query cache
  const { recipes, isLoading: recipesLoading, error: recipesError } = useUserRecipes();

  // Get motivational message
  const { message, loading: messageLoading } = useDailyMessage();

  // Extract user name (with fallback)
  const userName = userData?.profile?.first_name || "User";

  // Get today's date and filter meals for today
  const today = getTodayDateString();
  const todayMeals = getMealsForDate(recipes, today);

  // Filter exercises for today (still using mock data)
  const todayExercises = MOCK_SCHEDULED_EXERCISES
    .filter((exercise) => exercise.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Handle errors
  if (recipesError) {
    console.error("[HomeScreen] Error fetching recipes:", recipesError);
  }

  if (userError) {
    console.error("[HomeScreen] Error fetching user data:", userError);
  }

  // Show loading state while user data or recipes are loading
  if (userLoading || recipesLoading) {
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
