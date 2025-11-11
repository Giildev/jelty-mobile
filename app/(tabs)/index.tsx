import { ScrollView, ActivityIndicator, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { getUserByClerkId } from "@/services/supabase/users";

// Home components
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { MealsList } from "@/components/home/MealsList";
import { WorkoutsList } from "@/components/home/WorkoutsList";

// Mock data
import { MOCK_MEALS, MOCK_EXERCISES } from "@/constants/mockData";

/**
 * Home Screen
 * Displays personalized dashboard with daily meals, workouts, and progress
 */
export default function HomeScreen() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserByClerkId(userId);

        if (userData?.profile?.first_name) {
          setUserName(userData.profile.first_name);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

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
