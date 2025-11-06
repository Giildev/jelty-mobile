# Jelty Project - Claude Code Configuration

## Stack Tecnológico

### Core
- **React Native** con **Expo** (SDK 52+)
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing v4)
- **Metro bundler** (React Native)

### Estilos
- **NativeWind v4** (Tailwind CSS para React Native)
- **React Native Reanimated** (animaciones)
- Dark mode support (light/dark/system)

### Estado y Datos
- **Zustand** (state management global)
- **AsyncStorage** (persistencia local)
- **React Hook Form** (manejo de formularios)
- **Zod** (validación de schemas)

### Autenticación
- **Clerk** (@clerk/clerk-expo)
- **expo-secure-store** (almacenamiento seguro de tokens)

### API y Networking
- **Axios** (HTTP client con interceptors)
- Base URL configurada via env variables

### Navegación
- **Expo Router** file-based routing
- Arquitectura: **Tabs + Stack**
- Grupos de rutas:
  - `(auth)`: Rutas públicas (sign-in, sign-up)
  - `(tabs)`: Rutas protegidas con tabs (home, profile, settings)

### Icons y Assets
- **@expo/vector-icons**

### Development Tools
- **ESLint** (TypeScript + Prettier integration)
- **Prettier** (code formatting)

## Convenciones de Código

### TypeScript
- Usar `strict: true` en tsconfig
- Definir types para todos los estados de Zustand
- Usar `z.infer<typeof schema>` para tipos desde Zod schemas
- Evitar `any`, usar `unknown` cuando no se conozca el tipo
- Path aliases: `@/*` para importaciones desde la raíz

### Componentes
- **Functional components** con hooks únicamente
- Usar React.memo para componentes que no cambian frecuentemente
- Implementar `useMemo` y `useCallback` donde sea necesario
- Nombrar componentes en PascalCase
- Un componente por archivo (excepto componentes pequeños relacionados)

### Estilos
- **NativeWind** en lugar de StyleSheet
- Formato: `className="bg-white dark:bg-gray-900"`
- Usar variantes dark: `dark:bg-gray-800`, `dark:text-white`
- Evitar estilos inline cuando sea posible
- Responsive con breakpoints de Tailwind

### Formularios
- Usar React Hook Form con zodResolver
- Definir schemas en `utils/validation/schemas.ts`
- Controller component para inputs controlados
- Mostrar errores de validación bajo cada campo

### Estado Global (Zustand)
- Stores modulares por dominio (auth, user, cart, etc.)
- Usar persist middleware con AsyncStorage para datos que necesitan persistir
- Definir tipos TypeScript para cada store
- Acciones como funciones dentro del store

### Manejo de Errores
- Try-catch en todas las llamadas async
- Mostrar mensajes de error user-friendly
- Logging en desarrollo, silent en producción
- Usar error boundaries para errores de React

### Nomenclatura
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase con prefijo use (`useAuth.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`User.ts`, `AuthState.ts`)
- **Constants**: UPPER_SNAKE_CASE en `constants/`

## Arquitectura

### Estructura de Carpetas

```
jelty/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Grupo: Rutas públicas
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/                   # Grupo: Rutas protegidas con tabs
│   │   ├── _layout.tsx           # Configuración de tabs
│   │   ├── index.tsx             # Tab: Home
│   │   ├── profile.tsx           # Tab: Perfil
│   │   └── settings.tsx          # Tab: Configuración
│   ├── _layout.tsx               # Root layout (providers)
│   └── +not-found.tsx
│
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes UI base
│   └── forms/                    # Componentes de formularios
│
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useColorScheme.ts
│   └── useApi.ts
│
├── store/                        # Zustand stores
│   ├── authStore.ts
│   ├── userStore.ts
│   └── index.ts
│
├── services/                     # Servicios y API clients
│   ├── api/
│   │   ├── client.ts             # Axios instance
│   │   ├── endpoints.ts
│   │   └── interceptors.ts
│   └── storage/
│       └── secureStorage.ts
│
├── types/                        # TypeScript definitions
│   ├── auth.ts
│   ├── user.ts
│   └── api.ts
│
├── utils/                        # Utilidades
│   ├── validation/
│   │   └── schemas.ts            # Zod schemas
│   └── helpers.ts
│
├── constants/                    # Constantes
│   ├── colors.ts
│   └── config.ts
│
└── assets/                       # Assets estáticos
    ├── images/
    └── fonts/
```

### Flujo de Autenticación

1. Usuario accede a la app
2. Root layout (_layout.tsx) envuelve con ClerkProvider
3. Layout de tabs verifica autenticación con `useAuth()`
4. Si no autenticado → Redirect a `/(auth)/sign-in`
5. Si autenticado → Muestra tabs protegidos
6. Token de Clerk se almacena en expo-secure-store via tokenCache

### Flujo de Datos

1. **API Calls**:
   - `useApi` hook → axios client → interceptors (add auth token)
   - Respuesta se almacena en estado local o Zustand

2. **Estado Local vs Global**:
   - Local: useState, useReducer para estado específico de componente
   - Global: Zustand para estado compartido (user, auth, cart)

3. **Persistencia**:
   - Zustand + persist middleware → AsyncStorage
   - Datos sensibles → expo-secure-store

## Guías de Desarrollo

### Crear Nuevo Componente UI

```typescript
// components/ui/Button.tsx
import { Pressable, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  onPress,
  children,
  variant = "primary",
  loading = false,
  disabled = false
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        rounded-lg px-6 py-3
        ${variant === "primary" ? "bg-blue-500" : "bg-gray-500"}
        ${(disabled || loading) ? "opacity-50" : "active:opacity-80"}
        dark:bg-blue-600
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-center font-semibold text-white">
          {children}
        </Text>
      )}
    </Pressable>
  );
}
```

### Crear Formulario con Validación

```typescript
// utils/validation/schemas.ts
import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

// components/forms/SignUpForm.tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "@/utils/validation/schemas";

export function SignUpForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    // Handle signup
  };

  return (
    // ... form implementation
  );
}
```

### Crear Zustand Store

```typescript
// store/userStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### Proteger Rutas

```typescript
// app/(tabs)/_layout.tsx
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null; // Loading screen
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs>
      {/* Tab configuration */}
    </Tabs>
  );
}
```

## Consideraciones Importantes

### Performance
- FlatList con `windowSize` optimizado para listas largas
- Implementar virtualization con FlashList si >1000 items
- useMemo para cálculos costosos
- useCallback para funciones pasadas como props
- React.memo para componentes puros
- Lazy loading de imágenes con expo-image

### Seguridad
- NUNCA commitear `.env` al repositorio
- Usar `expo-secure-store` para tokens y datos sensibles
- Validar siempre en backend, validación client-side es solo UX
- Sanitizar inputs antes de mostrar
- Implementar rate limiting en backend

### Dark Mode
- Usar hook `useColorScheme` de NativeWind
- Todas las pantallas deben soportar dark mode
- Formato: `className="bg-white dark:bg-gray-900"`
- Configurar `userInterfaceStyle: "automatic"` en app.json

### Expo Specifics
- Usar `expo-constants` para acceso a env vars
- Prefijo `EXPO_PUBLIC_` para variables expuestas al cliente
- npx expo install para dependencias nativas
- Usar Expo modules cuando sea posible sobre native modules

### Testing
- Jest para unit tests
- React Native Testing Library para component tests
- Mockar Clerk con `@clerk/testing`
- Mockar AsyncStorage en tests
- Coverage mínimo: 70%

## Variables de Entorno

```bash
# .env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
EXPO_PUBLIC_API_URL=https://api.ejemplo.com
```

## Comandos Comunes

```bash
# Desarrollo
npm start                 # Expo dev server
npm run android          # Android emulator
npm run ios              # iOS simulator

# Code Quality
npm run lint             # ESLint
npm run format           # Prettier

# Build
eas build --platform android
eas build --platform ios
```

## Recursos y Documentación

- Expo Docs: https://docs.expo.dev/
- Expo Router: https://docs.expo.dev/router/introduction/
- NativeWind: https://www.nativewind.dev/
- Clerk: https://clerk.com/docs/quickstarts/expo
- Zustand: https://docs.pmnd.rs/zustand/
- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/

## Notas Adicionales

- Este es un proyecto de app compleja con múltiples features
- Priorizar experiencia de usuario y performance
- Mantener código limpio y bien documentado
- Seguir principios SOLID y DRY
- Code reviews obligatorios antes de merge
