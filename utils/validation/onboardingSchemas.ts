import { z } from "zod";

/**
 * Onboarding Step 1: Personal Information Schema
 * Validates all fields required in the first step of onboarding
 */
export const personalInfoSchema = z.object({
  // Basic information
  first_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  last_name: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres"),

  // Contact (pre-populated, validation for consistency)
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "El teléfono debe tener entre 10 y 15 dígitos"),

  // Birth date
  birth_date: z
    .string()
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "La fecha debe estar en formato dd/mm/yyyy"
    )
    .refine(
      (dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age >= 13 && age <= 120;
      },
      { message: "Debes tener al menos 13 años" }
    ),

  // Gender
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"], {
    errorMap: () => ({ message: "Selecciona una opción de género" }),
  }),

  // Physical information
  measurement_system: z.enum(["metric", "imperial"], {
    errorMap: () => ({ message: "Selecciona un sistema de medición" }),
  }),
  height_cm: z
    .number()
    .min(100, "La altura debe ser al menos 100 cm")
    .max(250, "La altura no puede exceder 250 cm"),
  weight_kg: z
    .number()
    .min(30, "El peso debe ser al menos 30 kg")
    .max(300, "El peso no puede exceder 300 kg"),
  bodyfat_percentage: z
    .number()
    .min(3, "El porcentaje de grasa corporal debe ser al menos 3%")
    .max(60, "El porcentaje de grasa corporal no puede exceder 60%")
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
      errorMap: () => ({ message: "Selecciona tu nivel de actividad" }),
    }
  ),

  // Location
  country: z.string().min(2, "Selecciona tu país"),
  country_code: z.string().min(1, "Código de país requerido"),
  city: z
    .string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder 100 caracteres"),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(200, "La dirección no puede exceder 200 caracteres"),
  zip_code: z
    .string()
    .min(3, "El código postal debe tener al menos 3 caracteres")
    .max(10, "El código postal no puede exceder 10 caracteres"),
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
 * Activity level display names in Spanish
 */
export const activityLevelLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentario (poco o ningún ejercicio)",
  lightly_active: "Ligeramente activo (ejercicio ligero 1-3 días/semana)",
  moderately_active: "Moderadamente activo (ejercicio moderado 3-5 días/semana)",
  very_active: "Muy activo (ejercicio intenso 6-7 días/semana)",
  extra_active: "Extra activo (ejercicio muy intenso, trabajo físico)",
};

/**
 * Gender display names in Spanish
 */
export const genderLabels: Record<Gender, string> = {
  male: "Masculino",
  female: "Femenino",
  other: "Otro",
  prefer_not_to_say: "Prefiero no decir",
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
      errorMap: () => ({ message: "Selecciona tu objetivo principal" }),
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
      errorMap: () => ({ message: "Selecciona el tiempo para lograr tu objetivo" }),
    }
  ),

  // Target weight (optional)
  target_weight_kg: z
    .number()
    .min(30, "El peso objetivo debe ser al menos 30 kg")
    .max(300, "El peso objetivo no puede exceder 300 kg")
    .optional()
    .nullable(),

  // Target body fat percentage (optional)
  target_bodyfat_pct: z
    .number()
    .min(3, "El porcentaje de grasa corporal debe ser al menos 3%")
    .max(60, "El porcentaje de grasa corporal no puede exceder 60%")
    .optional()
    .nullable(),

  // Current body measurements (all optional)
  chest_cm: z
    .number()
    .min(50, "La medida debe ser al menos 50 cm")
    .max(200, "La medida no puede exceder 200 cm")
    .optional()
    .nullable(),
  waist_cm: z
    .number()
    .min(40, "La medida debe ser al menos 40 cm")
    .max(200, "La medida no puede exceder 200 cm")
    .optional()
    .nullable(),
  hips_cm: z
    .number()
    .min(50, "La medida debe ser al menos 50 cm")
    .max(200, "La medida no puede exceder 200 cm")
    .optional()
    .nullable(),
  biceps_cm: z
    .number()
    .min(15, "La medida debe ser al menos 15 cm")
    .max(80, "La medida no puede exceder 80 cm")
    .optional()
    .nullable(),
  thighs_cm: z
    .number()
    .min(30, "La medida debe ser al menos 30 cm")
    .max(120, "La medida no puede exceder 120 cm")
    .optional()
    .nullable(),
  neck_cm: z
    .number()
    .min(20, "La medida debe ser al menos 20 cm")
    .max(60, "La medida no puede exceder 60 cm")
    .optional()
    .nullable(),
  shoulders_cm: z
    .number()
    .min(70, "La medida debe ser al menos 70 cm")
    .max(180, "La medida no puede exceder 180 cm")
    .optional()
    .nullable(),
  forearms_cm: z
    .number()
    .min(15, "La medida debe ser al menos 15 cm")
    .max(60, "La medida no puede exceder 60 cm")
    .optional()
    .nullable(),
  calves_cm: z
    .number()
    .min(20, "La medida debe ser al menos 20 cm")
    .max(80, "La medida no puede exceder 80 cm")
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
 * Fitness goal display names in Spanish
 */
export const fitnessGoalLabels: Record<FitnessGoalType, string> = {
  lose_fat: "Perder grasa",
  build_muscle: "Ganar músculo",
  improve_health: "Mejorar salud",
  increase_performance: "Aumentar rendimiento",
  maintain: "Mantener",
};

/**
 * Timeframe display names in Spanish
 */
export const timeframeLabels: Record<GoalTimeframe, string> = {
  "4_weeks": "4 semanas",
  "8_weeks": "8 semanas",
  "12_weeks": "12 semanas",
  "16_weeks": "16 semanas",
  "3_months": "3 meses",
  "6_months": "6 meses",
  "9_months": "9 meses",
  "12_months": "12 meses",
};
