import { z } from "zod";

/**
 * Onboarding Step 1: Personal Information Schema
 * Validates all fields required in the first step of onboarding
 */
export const personalInfoSchema = z.object({
  // Basic information
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),

  // Contact (pre-populated, validation for consistency)
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone must be between 10 and 15 digits"),

  // Birth date
  birth_date: z
    .string()
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Date must be in dd/mm/yyyy format"
    )
    .refine(
      (dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age >= 13 && age <= 120;
      },
      { message: "You must be at least 13 years old" }
    ),

  // Gender
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"], {
    errorMap: () => ({ message: "Select a gender option" }),
  }),

  // Physical information
  measurement_system: z.enum(["metric", "imperial"], {
    errorMap: () => ({ message: "Select a measurement system" }),
  }),
  height_cm: z
    .number()
    .min(100, "Height must be at least 100 cm")
    .max(250, "Height cannot exceed 250 cm"),
  weight_kg: z
    .number()
    .min(30, "Weight must be at least 30 kg")
    .max(300, "Weight cannot exceed 300 kg"),
  bodyfat_percentage: z
    .number()
    .min(3, "Body fat percentage must be at least 3%")
    .max(60, "Body fat percentage cannot exceed 60%")
    .optional()
    .nullable(),

  // Activity level
  activity_level: z.enum(
    [
      "sedentary",
      "lightly_active",
      "moderately_active",
      "very_active",
      "extra_active",
    ],
    {
      errorMap: () => ({ message: "Select your activity level" }),
    }
  ),

  // Location
  country: z.string().min(2, "Select your country"),
  country_code: z.string().min(1, "Country code required"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),
  zip_code: z
    .string()
    .min(3, "ZIP code must be at least 3 characters")
    .max(10, "ZIP code cannot exceed 10 characters"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

/**
 * Helper type for activity levels
 */
export type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderately_active"
  | "very_active"
  | "extra_active";

/**
 * Helper type for measurement systems
 */
export type MeasurementSystem = "metric" | "imperial";

/**
 * Helper type for gender options
 */
export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

/**
 * Activity level display names
 */
export const activityLevelLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  lightly_active: "Lightly active (light exercise 1-3 days/week)",
  moderately_active: "Moderately active (moderate exercise 3-5 days/week)",
  very_active: "Very active (intense exercise 6-7 days/week)",
  extra_active: "Extra active (very intense exercise, physical job)",
};

/**
 * Gender display names
 */
export const genderLabels: Record<Gender, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
  prefer_not_to_say: "Prefer not to say",
};

/**
 * Onboarding Step 2: Fitness Goals & Progress Tracking Schema
 * Validates all fields required in the second step of onboarding
 */
export const fitnessGoalSchema = z.object({
  // Primary fitness goal
  goal_type: z.enum(
    ["lose_fat", "build_muscle", "improve_health", "increase_performance", "maintain"],
    {
      errorMap: () => ({ message: "Select your primary goal" }),
    }
  ),

  // Timeframe to achieve the goal
  timeframe: z.enum(
    [
      "4_weeks",
      "8_weeks",
      "12_weeks",
      "16_weeks",
      "3_months",
      "6_months",
      "9_months",
      "12_months",
    ],
    {
      errorMap: () => ({ message: "Select timeframe to achieve your goal" }),
    }
  ),

  // Target weight (optional)
  target_weight_kg: z
    .number()
    .min(30, "Target weight must be at least 30 kg")
    .max(300, "Target weight cannot exceed 300 kg")
    .optional()
    .nullable(),

  // Target body fat percentage (optional)
  target_bodyfat_pct: z
    .number()
    .min(3, "Body fat percentage must be at least 3%")
    .max(60, "Body fat percentage cannot exceed 60%")
    .optional()
    .nullable(),

  // Current body measurements (all optional)
  chest_cm: z
    .number()
    .min(50, "Measurement must be at least 50 cm")
    .max(200, "Measurement cannot exceed 200 cm")
    .optional()
    .nullable(),
  waist_cm: z
    .number()
    .min(40, "Measurement must be at least 40 cm")
    .max(200, "Measurement cannot exceed 200 cm")
    .optional()
    .nullable(),
  hips_cm: z
    .number()
    .min(50, "Measurement must be at least 50 cm")
    .max(200, "Measurement cannot exceed 200 cm")
    .optional()
    .nullable(),
  biceps_cm: z
    .number()
    .min(15, "Measurement must be at least 15 cm")
    .max(80, "Measurement cannot exceed 80 cm")
    .optional()
    .nullable(),
  thighs_cm: z
    .number()
    .min(30, "Measurement must be at least 30 cm")
    .max(120, "Measurement cannot exceed 120 cm")
    .optional()
    .nullable(),
  neck_cm: z
    .number()
    .min(20, "Measurement must be at least 20 cm")
    .max(60, "Measurement cannot exceed 60 cm")
    .optional()
    .nullable(),
  shoulders_cm: z
    .number()
    .min(70, "Measurement must be at least 70 cm")
    .max(180, "Measurement cannot exceed 180 cm")
    .optional()
    .nullable(),
  forearms_cm: z
    .number()
    .min(15, "Measurement must be at least 15 cm")
    .max(60, "Measurement cannot exceed 60 cm")
    .optional()
    .nullable(),
  calves_cm: z
    .number()
    .min(20, "Measurement must be at least 20 cm")
    .max(80, "Measurement cannot exceed 80 cm")
    .optional()
    .nullable(),
});

export type FitnessGoalFormData = z.infer<typeof fitnessGoalSchema>;

/**
 * Fitness goal types
 */
export type FitnessGoalType =
  | "lose_fat"
  | "build_muscle"
  | "improve_health"
  | "increase_performance"
  | "maintain";

/**
 * Timeframe options
 */
export type GoalTimeframe =
  | "4_weeks"
  | "8_weeks"
  | "12_weeks"
  | "16_weeks"
  | "3_months"
  | "6_months"
  | "9_months"
  | "12_months";

/**
 * Fitness goal display names
 */
export const fitnessGoalLabels: Record<FitnessGoalType, string> = {
  lose_fat: "Lose fat",
  build_muscle: "Build muscle",
  improve_health: "Improve health",
  increase_performance: "Increase performance",
  maintain: "Maintain",
};

/**
 * Timeframe display names
 */
export const timeframeLabels: Record<GoalTimeframe, string> = {
  "4_weeks": "4 weeks",
  "8_weeks": "8 weeks",
  "12_weeks": "12 weeks",
  "16_weeks": "16 weeks",
  "3_months": "3 months",
  "6_months": "6 months",
  "9_months": "9 months",
  "12_months": "12 months",
};

/**
 * Onboarding Step 3: Health Information Schema
 * Validates all fields required in the third step of onboarding
 */
export const healthInfoSchema = z.object({
  // Medical conditions (array of strings, optional)
  medicalConditions: z
    .array(z.string().min(1, "Condition cannot be empty"))
    .default([])
    .optional(),

  // Current medications (array of strings, optional)
  medications: z
    .array(z.string().min(1, "Medication cannot be empty"))
    .default([])
    .optional(),

  // Previous injuries (array of strings, optional)
  injuries: z
    .array(z.string().min(1, "Injury cannot be empty"))
    .default([])
    .optional(),

  // Allergies (array of strings, optional)
  allergies: z
    .array(z.string().min(1, "Allergy cannot be empty"))
    .default([])
    .optional(),
});

export type HealthInfoFormData = z.infer<typeof healthInfoSchema>;

/**
 * Onboarding Step 4: Dietary Preferences Schema
 * Validates all fields required in the fourth step of onboarding
 */
export const dietaryPreferencesSchema = z.object({
  // Dietary patterns (multi-select, optional)
  dietaryPatterns: z
    .array(z.string())
    .default([])
    .optional(),

  // Preferred cuisines (multi-select, optional)
  cuisines: z
    .array(z.string())
    .default([])
    .optional(),

  // Ingredients to avoid (array of strings, optional)
  ingredientsToAvoid: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .default([])
    .optional(),

  // Ingredients to include/favorite (array of strings, optional)
  ingredientsToInclude: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .default([])
    .optional(),

  // Meals per day (2-6, optional)
  mealsPerDay: z
    .number()
    .min(2, "You must select at least 2 meals per day")
    .max(6, "You cannot select more than 6 meals per day")
    .optional()
    .nullable(),

  // Daily water intake in liters (1-4+, optional)
  waterIntake: z
    .number()
    .min(1, "You must select at least 1L")
    .max(5, "You cannot select more than 5L")
    .optional()
    .nullable(),
});

export type DietaryPreferencesFormData = z.infer<typeof dietaryPreferencesSchema>;

/**
 * Available dietary patterns
 */
export const DIETARY_PATTERNS = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Carnivore",
  "Keto",
  "Paleo",
  "Mediterranean",
  "Flexitarian",
] as const;

/**
 * Available cuisine preferences
 */
export const CUISINE_TYPES = [
  "Italian",
  "Mexican",
  "Japanese",
  "Chinese",
  "Thai",
  "Indian",
  "French",
  "Mediterranean",
  "Korean",
  "American",
] as const;

/**
 * Onboarding Step 5: Exercise Preferences Schema
 * Validates all fields required in the fifth step of onboarding
 */
export const exercisePreferencesSchema = z.object({
  // Experience level (single select, required)
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"], {
    errorMap: () => ({ message: "Select your experience level" }),
  }),

  // Preferred training types (multi-select, optional)
  preferredTrainingTypes: z
    .array(z.string())
    .default([])
    .optional(),

  // Equipment availability (single select, required)
  equipmentAvailability: z.enum(["none", "home_equipment", "full_gym"], {
    errorMap: () => ({ message: "Select your equipment availability" }),
  }),
});

export type ExercisePreferencesFormData = z.infer<typeof exercisePreferencesSchema>;

/**
 * Experience levels
 */
export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

/**
 * Equipment availability types
 */
export type EquipmentAvailability = "none" | "home_equipment" | "full_gym";

/**
 * Experience level display names
 */
export const experienceLevelLabels: Record<ExperienceLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

/**
 * Equipment availability display names
 */
export const equipmentAvailabilityLabels: Record<EquipmentAvailability, string> = {
  none: "None",
  home_equipment: "Home Equipment",
  full_gym: "Full Gym",
};

/**
 * Available training types
 */
export const TRAINING_TYPES = [
  "Strength",
  "Cardio",
  "Hypertrophy",
  "Yoga",
  "Functional",
  "Mixed",
] as const;

/**
 * Onboarding Step 6: Availability & Schedule Schema
 * Validates all fields required in the sixth step of onboarding
 */
export const availabilitySchema = z.object({
  // Days available (multi-select, at least 1 required)
  daysAvailable: z
    .array(z.string())
    .min(1, "Select at least one day of the week")
    .default([]),

  // Time per session in minutes (required)
  timePerSession: z.number({
    errorMap: () => ({ message: "Select your session duration" }),
  }),

  // Preferred time of day (single select, required)
  preferredTimeOfDay: z.enum(["morning", "afternoon", "evening", "flexible"], {
    errorMap: () => ({ message: "Select your preferred time" }),
  }),

  // Additional notes (optional)
  additionalNotes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .nullable(),
});

export type AvailabilityFormData = z.infer<typeof availabilitySchema>;

/**
 * Time of day preferences
 */
export type TimeOfDay = "morning" | "afternoon" | "evening" | "flexible";

/**
 * Time of day display names
 */
export const timeOfDayLabels: Record<TimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  flexible: "Flexible",
};

/**
 * Session duration options in minutes
 */
export const SESSION_DURATIONS = [30, 45, 60, 75, 90] as const;

/**
 * Onboarding Step 7: Cooking Preferences Schema
 * Validates cooking habits and shopping routine
 */
export const cookingPreferencesSchema = z.object({
  // Cooking skill level (single select, required)
  cookingSkillLevel: z.enum(["beginner", "intermediate", "advanced", "expert"], {
    errorMap: () => ({ message: "Select your cooking skill level" }),
  }),

  // Time available to cook per meal (required)
  cookTimeRange: z.enum(["under_15", "15_30", "30_45", "45_60", "over_60"], {
    errorMap: () => ({ message: "Select time available to cook" }),
  }),

  // Number of people cooking for (required, 1-5)
  cookingForPeople: z
    .number()
    .min(1, "Must be at least 1 person")
    .max(5, "Cannot exceed 5 people"),

  // Shopping frequency (required)
  shoppingFrequency: z.enum(["weekly", "bi_weekly", "monthly"], {
    errorMap: () => ({ message: "Select your shopping frequency" }),
  }),
});

export type CookingPreferencesFormData = z.infer<typeof cookingPreferencesSchema>;

/**
 * Cooking skill levels
 */
export type CookingSkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

/**
 * Time range options for cooking
 */
export type CookTimeRange = "under_15" | "15_30" | "30_45" | "45_60" | "over_60";

/**
 * Shopping frequency options
 */
export type ShoppingFrequency = "weekly" | "bi_weekly" | "monthly";

/**
 * Cooking skill level display names
 */
export const cookingSkillLevelLabels: Record<CookingSkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

/**
 * Cook time range display names
 */
export const cookTimeRangeLabels: Record<CookTimeRange, string> = {
  under_15: "<15 min",
  "15_30": "15-30 min",
  "30_45": "30-45 min",
  "45_60": "45-60 min",
  over_60: "60+ min",
};

/**
 * Shopping frequency display names
 */
export const shoppingFrequencyLabels: Record<ShoppingFrequency, string> = {
  weekly: "Weekly",
  bi_weekly: "Bi-weekly",
  monthly: "Monthly",
};

/**
 * Onboarding Step 8: Notification Settings Schema
 * Validates notification preferences and quiet hours
 */
export const notificationSettingsSchema = z
  .object({
    // Notification toggles (all boolean, required)
    mealsEnabled: z.boolean(),
    workoutsEnabled: z.boolean(),
    remindersEnabled: z.boolean(),

    // Quiet hours (optional)
    quietHoursStart: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable(),
    quietHoursEnd: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).nullable(),
  })
  .refine(
    (data) => {
      // If either quiet hours field is set, both must be set
      if (data.quietHoursStart || data.quietHoursEnd) {
        return data.quietHoursStart !== null && data.quietHoursEnd !== null;
      }
      return true;
    },
    {
      message: "Both start and end times are required for quiet hours",
      path: ["quietHoursStart"],
    }
  );

export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>;
