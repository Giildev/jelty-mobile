import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";

export interface MealSlot {
  id: string;
  slotIndex: number;
  slotLabel: string;
  mealType:
    | "breakfast"
    | "lunch"
    | "dinner"
    | "morning_snack"
    | "afternoon_snack"
    | "snack";
  recipe: {
    id: string;
    name: string;
    description: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    cuisineType: string;
    difficultyLevel: "easy" | "medium" | "hard";
    tags: string[];
    nutritionPerServing: {
      energyKcal: number;
      proteinG: number;
      carbG: number;
      fatG: number;
      fiberG: number;
    };
    ingredients: Array<{
      ingredientName: string;
      quantity: number;
      unit: string;
      gramsEquivalent: number;
      iconEmoji?: string;
    }>;
    steps: Array<{
      orderIndex: number;
      instruction: string;
    }>;
  };
}

export interface TodayMealPlan {
  date: string;
  slots: MealSlot[];
}

export interface WorkoutSet {
  setIndex: number;
  repsMin: number | null;
  repsMax: number | null;
  duration: string | null;
  restSeconds: number;
  weight: number | null;
  notes: string | null;
}

export interface WorkoutExercise {
  orderIndex: number;
  exercise: {
    name: string;
    description: string;
    primaryMuscle: string;
    equipment: string;
    howToPerformSummary: string;
    tips: string[];
    steps: Array<{ orderIndex: number; instruction: string }>;
  };
  sets: WorkoutSet[];
}

export interface WorkoutBlock {
  blockType: "warm-up" | "main" | "stretch" | "cooldown";
  orderIndex: number;
  title: string;
  totalEstimatedMinutes: number;
  exercises: WorkoutExercise[];
}

export interface TodayWorkout {
  isRestDay: false;
  programName: string;
  dayIndex: number;
  difficultyLevel: string;
  focusAreas: string[];
  totalEstimatedMinutes: number;
  blocks: WorkoutBlock[];
}

export interface RestDay {
  isRestDay: true;
  message: string;
}

export type TodayWorkoutResponse = TodayWorkout | RestDay;

/**
 * Fetches today's meal plan with all slots, recipes, ingredients, and steps.
 */
export async function fetchTodayMealPlan(
  userId: string
): Promise<TodayMealPlan> {
  const response = await apiClient.get(API_ENDPOINTS.plans.mealPlanToday, {
    params: { userId },
  });

  // Map backend structure to frontend interface
  const backendData = response.data;
  const plan = backendData.data;

  if (!plan) {
    return { date: new Date().toISOString(), slots: [] };
  }

  return {
    date: plan.date,
    slots: (plan.slots || [])
      .map((slot: any) => {
        const recipeLink = slot.recipes?.[0];
        const recipe = recipeLink?.recipe;

        if (!recipe) return null;

        return {
          id: slot.id,
          slotIndex: slot.slotIndex,
          slotLabel: slot.slotLabel,
          mealType: slot.mealType,
          recipe: {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            prepTimeMinutes: parseInt(recipe.prepTimeMinutes) || 0,
            cookTimeMinutes: parseInt(recipe.cookTimeMinutes) || 0,
            cuisineType: recipe.cuisineType,
            difficultyLevel: recipe.difficultyLevel?.toLowerCase() || "medium",
            tags: recipe.tags || [],
            nutritionPerServing: {
              energyKcal: parseInt(recipe.energyKcalPerServing) || 0,
              proteinG: parseInt(recipe.proteinGPerServing) || 0,
              carbG: parseInt(recipe.carbGPerServing) || 0,
              fatG: parseInt(recipe.fatGPerServing) || 0,
              fiberG: parseInt(recipe.fiberGPerServing) || 0,
            },
            energyKcalPerServing: recipe.energyKcalPerServing,
            proteinGPerServing: recipe.proteinGPerServing,
            carbGPerServing: recipe.carbGPerServing,
            fatGPerServing: recipe.fatGPerServing,
            microsPerServing: recipe.microsPerServing,
            ingredients: (recipe.ingredients || []).map((ing: any) => ({
              ingredientName: ing.ingredient?.name || ing.ingredientName || "Ingredient",
              quantity: parseFloat(ing.quantity || ing.grams) || 0,
              unit: ing.unit || "g",
              gramsEquivalent: parseFloat(ing.grams || ing.gramsEquivalent) || 0,
              iconEmoji: ing.ingredient?.iconEmoji,
              ...ing
            })),
            steps: (recipe.steps || []).map((step: any) => ({
              orderIndex: step.orderIndex,
              instruction: step.instruction,
            })),
          },
        };
      })
      .filter((s: any) => s !== null),
  };
}

/**
 * Fetches today's workout. Returns isRestDay: true if today is a rest day.
 */
export async function fetchTodayWorkout(
  userId: string
): Promise<TodayWorkoutResponse> {
  const response = await apiClient.get(API_ENDPOINTS.plans.workoutToday, {
    params: { userId },
  });

  const backendData = response.data;
  const data = backendData.data;

  if (!data || backendData.isRestDay) {
    return {
      isRestDay: true,
      message: backendData.message || "No workout scheduled today. Enjoy your rest!",
    };
  }

  return {
    isRestDay: false,
    programName: data.programName || "Daily Workout",
    dayIndex: data.dayIndex || 1,
    difficultyLevel: data.difficultyLevel,
    focusAreas: data.focusAreas || [],
    totalEstimatedMinutes: parseInt(data.totalEstimatedMinutes) || 0,
    blocks: (data.blocks || []).map((block: any) => ({
      blockType: block.blockType,
      orderIndex: block.orderIndex,
      title: block.title,
      totalEstimatedMinutes: parseInt(block.totalEstimatedMinutes) || 0,
      exercises: (block.exercises || []).map((ex: any) => ({
        orderIndex: ex.orderIndex,
        exercise: {
          name: ex.exercise?.name,
          description: ex.exercise?.description,
          primaryMuscle: ex.exercise?.primaryMuscle,
          equipment: ex.exercise?.equipment,
          howToPerformSummary: ex.exercise?.howToPerformSummary,
          tips: ex.exercise?.tips || [],
          steps: (ex.exercise?.steps || []).map((s: any) => ({
            orderIndex: s.orderIndex,
            instruction: s.instruction,
          })),
        },
        sets: (ex.sets || []).map((set: any) => ({
          setIndex: set.setIndex,
          repsMin: set.repsMin,
          repsMax: set.repsMax,
          duration: set.duration,
          restSeconds: parseInt(set.restS) || 0,
          weight: set.weight,
          notes: set.notes,
        })),
      })),
    })),
  };
}

/**
 * Fetches a specific recipe by ID.
 */
export async function fetchRecipeById(recipeId: string): Promise<any> {
  const response = await apiClient.get(API_ENDPOINTS.plans.recipeDetail(recipeId));
  const recipe = response.data.data;

  if (!recipe) return null;

  // Map backend recipe to frontend MealDetail interface
  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description || "",
    calories: parseFloat(recipe.energyKcalPerServing) || 0,
    macros: {
      carbs: parseFloat(recipe.carbGPerServing) || 0,
      protein: parseFloat(recipe.proteinGPerServing) || 0,
      fat: parseFloat(recipe.fatGPerServing) || 0,
    },
    imageUrl: undefined, // Will be handled by fallback in UI
    type: (recipe.mealType?.toLowerCase() || "lunch") as any,
    gallery: [], 
    micros: recipe.microsPerServing,
    ingredients: (recipe.ingredients || []).map((ing: any) => {
      const baseIng = ing.ingredient || {};
      return {
        id: ing.id || Math.random().toString(),
        name: baseIng.name || ing.name || "Ingredient",
        quantity: parseFloat(ing.quantity || ing.grams) || 0,
        unit: ing.unit || "g",
        icon: baseIng.iconEmoji || "🍽️",
        grams: parseFloat(ing.grams) || 0,
        microsPerGram: baseIng.microsPerGram || {
          iron_mg: parseFloat(baseIng.ironMgPerGram) || 0,
          zinc_mg: parseFloat(baseIng.zincMgPerGram) || 0,
          calcium_mg: parseFloat(baseIng.calciumMgPerGram) || 0,
          vitaminC_mg: parseFloat(baseIng.vitaminCMgPerGram) || 0,
          potassium_mg: parseFloat(baseIng.potassiumMgPerGram) || 0,
          selenium_mcg: parseFloat(baseIng.seleniumMcgPerGram) || 0,
          vitaminA_mcg: parseFloat(baseIng.vitaminAMcgPerGram) || 0,
          vitaminD_mcg: parseFloat(baseIng.vitaminDMcgPerGram) || 0,
        },
        macrosPerGram: {
          energyKcal: parseFloat(baseIng.energyKcalPerGram) || 0,
          proteinG: parseFloat(baseIng.proteinGPerGram) || 0,
          carbG: parseFloat(baseIng.carbGPerGram) || 0,
          fatG: parseFloat(baseIng.fatGPerGram) || 0,
        }
      };
    }),
    preparationSteps: (recipe.steps || []).map((step: any) => ({
      id: step.id || Math.random().toString(),
      stepNumber: step.orderIndex,
      instruction: step.instruction,
    })),
    servings: parseFloat(recipe.servings) || 1,
    prepTime: parseInt(recipe.prepTimeMinutes) || 0,
    cookTime: parseInt(recipe.cookTimeMinutes) || 0,
  };
}

/**
 * Fetches a specific exercise by ID.
 */
export async function fetchExerciseById(exerciseId: string): Promise<any> {
  const response = await apiClient.get(API_ENDPOINTS.plans.exerciseDetail(exerciseId));
  const exercise = response.data.data;

  if (!exercise) return null;

  return {
    id: exercise.id,
    name: exercise.name,
    description: exercise.description || "",
    primaryMuscle: exercise.primaryMuscle || "Full Body",
    equipment: exercise.equipment || "Bodyweight",
    category: (exercise.category?.toLowerCase() || "main") as any,
    gallery: [],
    instructions: {
      sets: 0,
      repsMin: 0,
      repsMax: 0,
      rir: 0,
      restTimeSeconds: 0,
    },
    howToPerformSteps: (exercise.steps || []).map((s: any) => ({
      id: s.id || Math.random().toString(),
      orderIndex: s.orderIndex,
      instruction: s.instruction,
    })),
    tips: exercise.tipsJson || [],
    // Base Exercise fields (used by some components)
    sets: 0,
    reps: 0,
    rir: 0,
    restTime: 0,
  };
}
