import { z } from "zod";

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Signup schema con validaciones completas
 */
export const signupSchema = z
  .object({
    email: z.string().email("Email inválido"),
    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, "El teléfono debe tener entre 10 y 15 dígitos"),
    country: z.string().min(2, "Selecciona tu país"),
    countryCode: z.string().min(1, "Código de país requerido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
      ),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  email: z.string().email("Email inválido"),
  avatar: z.string().url("URL inválida").optional(),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

/**
 * Example: Post creation schema
 */
export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(100, "El título no puede exceder 100 caracteres"),
  content: z
    .string()
    .min(1, "El contenido es requerido")
    .max(1000, "El contenido no puede exceder 1000 caracteres"),
  tags: z.array(z.string()).optional(),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

/**
 * Forgot password schema
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password schema
 */
export const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .length(6, "El código debe tener 6 dígitos")
      .regex(/^[0-9]{6}$/, "El código debe contener solo números"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
