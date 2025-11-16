import { ScrollView, ActivityIndicator, View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { format } from "date-fns";
import { useUserData } from "@/hooks/useUserData";
import { useDailyMessage } from "@/hooks/useDailyMessage";
import { useUserRecipes } from "@/hooks/useUserRecipes";
import { useMealPlanProgress } from "@/hooks/useMealPlanProgress";

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
  const router = useRouter();

  // Fetch user data with React Query cache
  const { userData, loading: userLoading, error: userError } = useUserData(userId);

  // Fetch user recipes/meals with React Query cache
  const { recipes, isLoading: recipesLoading, error: recipesError } = useUserRecipes();

  // Check meal plan progress
  const { isGenerating, percentage, hasProgress } = useMealPlanProgress();

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

        {/* Meal Plan Generation Status */}
        {isGenerating && (
          <View className="mx-6 mb-4">
            <View className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="font-roboto-bold text-base text-blue-900 dark:text-blue-100">
                  Generating Your Meal Plan
                </Text>
                <Text className="font-roboto-medium text-sm text-blue-700 dark:text-blue-300">
                  {percentage}%
                </Text>
              </View>

              {/* Progress Bar */}
              <View className="mb-3 h-2 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-800">
                <View
                  className="h-full rounded-full bg-blue-600 dark:bg-blue-400"
                  style={{ width: `${percentage}%` }}
                />
              </View>

              <Text className="font-roboto-regular text-sm text-blue-800 dark:text-blue-200">
                {recipes.length > 0
                  ? `${recipes.length} meals generated so far. Please wait while we create your complete 30-day meal plan. This may take several minutes.`
                  : "We're creating your personalized meal plan. This may take several minutes. Your meals will appear here once ready."
                }
              </Text>
            </View>
          </View>
        )}

        {/* No Recipes and No Generation - First Time User */}
        {!isGenerating && recipes.length === 0 && !hasProgress && (
          <View className="mx-6 mb-4">
            <View className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
              <Text className="font-roboto-bold mb-2 text-base text-purple-900 dark:text-purple-100">
                Welcome to Jelty!
              </Text>
              <Text className="font-roboto-regular mb-3 text-sm text-purple-800 dark:text-purple-200">
                You don't have a meal plan yet. Go to Profile Settings to generate your personalized monthly meal plan.
              </Text>
              <Text
                className="font-roboto-medium text-sm text-purple-600 dark:text-purple-400"
                onPress={() => router.push("/(tabs)/profile")}
              >
                → Go to Profile
              </Text>
            </View>
          </View>
        )}

        {/* Today's Meals */}
        {recipes.length > 0 && <MealsList meals={todayMeals} />}

        {/* Today's Workouts */}
        <WorkoutsList exercises={todayExercises} />
      </ScrollView>
    </SafeAreaView>
  );
}
