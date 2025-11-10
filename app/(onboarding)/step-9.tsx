import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

import { OnboardingStepLayout } from "@/components/onboarding/OnboardingStepLayout";
import {
  markOnboardingComplete,
  loadOnboardingStep2,
  loadOnboardingStep3,
  loadOnboardingStep4,
  loadOnboardingStep5,
  loadOnboardingStep6,
  loadOnboardingStep7,
  loadOnboardingStep8,
} from "@/services/supabase/onboarding";
import { getUserByClerkId } from "@/services/supabase/users";

interface SummarySection {
  title: string;
  stepNumber: number;
  items: { label: string; value: string }[];
}

export default function OnboardingStep9Screen() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<SummarySection[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Load all onboarding data
        const [step1Data, step2, step3, step4, step5, step6, step7, step8] = await Promise.all([
          getUserByClerkId(userId),
          loadOnboardingStep2(userId),
          loadOnboardingStep3(userId),
          loadOnboardingStep4(userId),
          loadOnboardingStep5(userId),
          loadOnboardingStep6(userId),
          loadOnboardingStep7(userId),
          loadOnboardingStep8(userId),
        ]);

        const summaryData: SummarySection[] = [];

        // Step 1: Personal Information
        if (step1Data) {
          const dbUser = step1Data.dbUser || step1Data.user;
          const profile = step1Data.profile;

          if (dbUser && profile) {
            const items: { label: string; value: string }[] = [];

            if (profile.first_name || profile.last_name) {
              items.push({
                label: "Name",
                value: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
              });
            }

            if (dbUser.email) {
              items.push({
                label: "Email",
                value: dbUser.email,
              });
            }

            if (profile.phone) {
              items.push({
                label: "Phone",
                value: profile.phone,
              });
            }

            if (profile.birth_date) {
              const birthDate = new Date(profile.birth_date);
              items.push({
                label: "Birth Date",
                value: birthDate.toLocaleDateString(),
              });
            }

            if (profile.gender) {
              const genderLabels: Record<string, string> = {
                male: "Male",
                female: "Female",
                other: "Other",
                prefer_not_to_say: "Prefer not to say",
              };
              items.push({
                label: "Gender",
                value: genderLabels[profile.gender] || profile.gender,
              });
            }

            if (profile.height_cm) {
              items.push({
                label: "Height",
                value: `${profile.height_cm} cm`,
              });
            }

            if (profile.weight_kg) {
              items.push({
                label: "Weight",
                value: `${profile.weight_kg} kg`,
              });
            }

            if (profile.bodyfat_percentage) {
              items.push({
                label: "Body Fat",
                value: `${profile.bodyfat_percentage}%`,
              });
            }

            if (profile.activity_level) {
              const activityLabels: Record<string, string> = {
                sedentary: "Sedentary",
                lightly_active: "Lightly Active",
                moderately_active: "Moderately Active",
                very_active: "Very Active",
                extra_active: "Extra Active",
              };
              items.push({
                label: "Activity Level",
                value: activityLabels[profile.activity_level] || profile.activity_level,
              });
            }

            if (items.length > 0) {
              summaryData.push({
                title: "Personal Information",
                stepNumber: 1,
                items,
              });
            }
          }
        }

        // Step 2: Fitness Goals
        if (step2?.goal) {
          const goalLabels: Record<string, string> = {
            lose_fat: "Lose Fat",
            gain_muscle: "Gain Muscle",
            maintain_weight: "Maintain Weight",
            body_recomp: "Body Recomposition",
          };

          const timeframeLabels: Record<string, string> = {
            "4_weeks": "4 weeks",
            "8_weeks": "8 weeks",
            "12_weeks": "12 weeks",
            "16_weeks": "16 weeks",
            "24_weeks": "24 weeks",
          };

          const items: { label: string; value: string }[] = [
            {
              label: "Goal Type",
              value: goalLabels[step2.goal.goal_type] || step2.goal.goal_type,
            },
          ];

          if (step2.goal.target_weight_kg) {
            items.push({
              label: "Target Weight",
              value: `${step2.goal.target_weight_kg} kg`,
            });
          }

          if (step2.goal.target_bodyfat_pct) {
            items.push({
              label: "Target Body Fat",
              value: `${step2.goal.target_bodyfat_pct}%`,
            });
          }

          if (step2.goal.timeframe) {
            items.push({
              label: "Timeframe",
              value: timeframeLabels[step2.goal.timeframe] || step2.goal.timeframe,
            });
          }

          summaryData.push({
            title: "Fitness Goals",
            stepNumber: 2,
            items,
          });
        }

        // Step 3: Health Information
        if (step3) {
          const items: { label: string; value: string }[] = [];

          if (step3.medicalConditions && step3.medicalConditions.length > 0) {
            items.push({
              label: "Medical Conditions",
              value: step3.medicalConditions.join(", "),
            });
          }

          if (step3.medications && step3.medications.length > 0) {
            items.push({
              label: "Medications",
              value: step3.medications.join(", "),
            });
          }

          if (step3.injuries && step3.injuries.length > 0) {
            items.push({
              label: "Injuries",
              value: step3.injuries.join(", "),
            });
          }

          if (step3.allergies && step3.allergies.length > 0) {
            items.push({
              label: "Allergies",
              value: step3.allergies.join(", "),
            });
          }

          if (items.length > 0) {
            summaryData.push({
              title: "Health Information",
              stepNumber: 3,
              items,
            });
          }
        }

        // Step 4: Dietary Preferences
        if (step4) {
          const items: { label: string; value: string }[] = [];

          if (step4.dietaryPatterns && step4.dietaryPatterns.length > 0) {
            items.push({
              label: "Dietary Patterns",
              value: step4.dietaryPatterns.join(", "),
            });
          }

          if (step4.cuisines && step4.cuisines.length > 0) {
            items.push({
              label: "Preferred Cuisines",
              value: step4.cuisines.join(", "),
            });
          }

          if (step4.mealsPerDay) {
            items.push({
              label: "Meals per Day",
              value: `${step4.mealsPerDay} meals`,
            });
          }

          if (step4.waterIntake) {
            items.push({
              label: "Daily Water Intake",
              value: `${step4.waterIntake}L`,
            });
          }

          if (items.length > 0) {
            summaryData.push({
              title: "Dietary Preferences",
              stepNumber: 4,
              items,
            });
          }
        }

        // Step 5: Exercise Preferences
        if (step5) {
          const experienceLevelLabels: Record<string, string> = {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
          };

          const equipmentLabels: Record<string, string> = {
            none: "No Equipment",
            home_equipment: "Home Equipment",
            full_gym: "Full Gym Access",
          };

          const items: { label: string; value: string }[] = [
            {
              label: "Experience Level",
              value: experienceLevelLabels[step5.experienceLevel] || step5.experienceLevel,
            },
            {
              label: "Equipment",
              value: equipmentLabels[step5.equipmentAvailability] || step5.equipmentAvailability,
            },
          ];

          if (step5.preferredTrainingTypes && step5.preferredTrainingTypes.length > 0) {
            items.push({
              label: "Training Types",
              value: step5.preferredTrainingTypes.join(", "),
            });
          }

          summaryData.push({
            title: "Exercise Preferences",
            stepNumber: 5,
            items,
          });
        }

        // Step 6: Availability
        if (step6) {
          const dayLabels: Record<string, string> = {
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday",
          };

          const timeOfDayLabels: Record<string, string> = {
            morning: "Morning",
            afternoon: "Afternoon",
            evening: "Evening",
            flexible: "Flexible",
          };

          const items: { label: string; value: string }[] = [
            {
              label: "Available Days",
              value: step6.daysAvailable.map((day) => dayLabels[day] || day).join(", "),
            },
            {
              label: "Session Duration",
              value: `${step6.timePerSession} minutes`,
            },
            {
              label: "Preferred Time",
              value: timeOfDayLabels[step6.preferredTimeOfDay] || step6.preferredTimeOfDay,
            },
          ];

          summaryData.push({
            title: "Availability & Schedule",
            stepNumber: 6,
            items,
          });
        }

        // Step 7: Cooking Preferences
        if (step7) {
          const skillLevelLabels: Record<string, string> = {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
            expert: "Expert",
          };

          const cookTimeLabels: Record<string, string> = {
            under_15: "Under 15 minutes",
            "15_30": "15-30 minutes",
            "30_45": "30-45 minutes",
            "45_60": "45-60 minutes",
            over_60: "Over 60 minutes",
          };

          const shoppingLabels: Record<string, string> = {
            weekly: "Weekly",
            bi_weekly: "Bi-weekly",
            monthly: "Monthly",
          };

          const items: { label: string; value: string }[] = [
            {
              label: "Cooking Skill",
              value: skillLevelLabels[step7.cookingSkillLevel] || step7.cookingSkillLevel,
            },
            {
              label: "Time to Cook",
              value: cookTimeLabels[step7.cookTimeRange] || step7.cookTimeRange,
            },
            {
              label: "Cooking For",
              value: `${step7.cookingForPeople} ${step7.cookingForPeople === 1 ? "person" : "people"}`,
            },
            {
              label: "Shopping Frequency",
              value: shoppingLabels[step7.shoppingFrequency] || step7.shoppingFrequency,
            },
          ];

          summaryData.push({
            title: "Cooking Preferences",
            stepNumber: 7,
            items,
          });
        }

        // Step 8: Notifications
        if (step8) {
          const items: { label: string; value: string }[] = [
            {
              label: "Meal Reminders",
              value: step8.mealsEnabled ? "Enabled" : "Disabled",
            },
            {
              label: "Workout Reminders",
              value: step8.workoutsEnabled ? "Enabled" : "Disabled",
            },
            {
              label: "Daily Motivation",
              value: step8.remindersEnabled ? "Enabled" : "Disabled",
            },
          ];

          if (step8.quietHoursStart && step8.quietHoursEnd) {
            items.push({
              label: "Quiet Hours",
              value: `${step8.quietHoursStart} - ${step8.quietHoursEnd}`,
            });
          }

          summaryData.push({
            title: "Notifications",
            stepNumber: 8,
            items,
          });
        }

        setSections(summaryData);
      } catch (error) {
        console.error("Error loading onboarding summary:", error);
        Alert.alert("Error", "Failed to load onboarding summary");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [userId]);

  const handleComplete = async () => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    console.log("[Step 9] Starting onboarding completion for user:", userId);
    setSaving(true);
    try {
      const success = await markOnboardingComplete(userId);

      console.log("[Step 9] markOnboardingComplete result:", success);

      if (success) {
        console.log("[Step 9] Navigating to /(tabs)");
        // Navigate to main app (tabs)
        router.replace("/(tabs)");
      } else {
        console.error("[Step 9] Failed to complete onboarding");
        Alert.alert("Error", "Failed to complete onboarding");
      }
    } catch (error) {
      console.error("[Step 9] Error completing onboarding:", error);
      Alert.alert("Error", "An error occurred while completing onboarding");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (stepNumber: number) => {
    router.push(`/(onboarding)/step-${stepNumber}` as any);
  };

  return (
    <OnboardingStepLayout
      currentStep={9}
      totalSteps={9}
      stepLabel="Review & Activate"
      title="Review Your Profile"
      description="Everything looks good? Let's get started!"
      onBack={() => router.back()}
      onNext={handleComplete}
      nextButtonText="Finish Setup"
      nextButtonColor="#0CDA51"
      loading={loading}
      saving={saving}
    >
      {/* Summary Sections */}
      <View className="px-6">
        {sections.map((section, index) => (
          <View
            key={`${section.title}-${index}`}
            className="mb-6 overflow-hidden rounded-xl border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
          >
            {/* Section Header */}
            <View className="flex-row items-center justify-between border-b-2 border-gray-300 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.title}
              </Text>
              <TouchableOpacity
                onPress={() => handleEdit(section.stepNumber)}
                className="flex-row items-center"
                activeOpacity={0.7}
              >
                <Text className="mr-1 text-sm font-medium text-primary">
                  Edit
                </Text>
                <Ionicons name="pencil" size={16} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            {/* Section Items */}
            <View className="px-4 py-3">
              {section.items.map((item, itemIndex) => (
                <View
                  key={`${item.label}-${itemIndex}`}
                  className={`${itemIndex !== section.items.length - 1 ? "mb-3" : ""}`}
                >
                  <Text className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {item.label}
                  </Text>
                  <Text className="text-base text-gray-900 dark:text-white">
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Empty State */}
        {sections.length === 0 && (
          <View className="items-center py-8">
            <Ionicons name="information-circle-outline" size={48} color="#9CA3AF" />
            <Text className="mt-4 text-center text-gray-600 dark:text-gray-400">
              No data to display. Please complete the previous steps.
            </Text>
          </View>
        )}

        {/* Success Message */}
        <View className="mt-6">
          <View className="rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/20">
            <Text className="text-center text-sm text-green-900 dark:text-green-100">
              🎉 You're all set! Ready to start your fitness journey?
            </Text>
          </View>
        </View>
      </View>
    </OnboardingStepLayout>
  );
}
