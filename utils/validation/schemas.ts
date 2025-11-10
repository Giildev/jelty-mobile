import { z } from "zod";

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Signup schema with complete validations
 */
export const signupSchema = z
  .object({
    email: z.string().email("Invalid email"),
    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Phone must be between 10 and 15 digits"),
    country: z.string().min(2, "Select your country"),
    countryCode: z.string().min(1, "Country code required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email"),
  avatar: z.string().url("Invalid URL").optional(),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

/**
 * Example: Post creation schema
 */
export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content cannot exceed 1000 characters"),
  tags: z.array(z.string()).optional(),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

/**
 * Forgot password schema
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password schema
 */
export const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .length(6, "Code must be 6 digits")
      .regex(/^[0-9]{6}$/, "Code must contain only numbers"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
