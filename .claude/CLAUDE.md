# Jelty Project - Claude Code Configuration

## Technology Stack

### Core
- **React Native** with **Expo** (SDK 52+)
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing v4)
- **Metro bundler** (React Native)

### Styling
- **NativeWind v4** (Tailwind CSS for React Native)
- **React Native Reanimated** (animations)
- Dark mode support (light/dark/system)

### State and Data
- **Zustand** (global state management)
- **AsyncStorage** (local persistence)
- **React Hook Form** (form handling)
- **Zod** (schema validation)

### Authentication
- **Clerk** (@clerk/clerk-expo)
- **expo-secure-store** (secure token storage)

### API and Networking
- **Axios** (HTTP client with interceptors)
- Base URL configured via env variables

### Navigation
- **Expo Router** file-based routing
- Architecture: **Tabs + Stack**
- Route groups:
  - `(auth)`: Public routes (sign-in, sign-up)
  - `(tabs)`: Protected routes with tabs (home, profile, settings)

### Icons and Assets
- **@expo/vector-icons**

### Development Tools
- **ESLint** (TypeScript + Prettier integration)
- **Prettier** (code formatting)

## Code Conventions

### TypeScript
- Use `strict: true` in tsconfig
- Define types for all Zustand states
- Use `z.infer<typeof schema>` for types from Zod schemas
- Avoid `any`, use `unknown` when type is unknown
- Path aliases: `@/*` for imports from root

### Components
- **Functional components** with hooks only
- Use React.memo for components that don't change frequently
- Implement `useMemo` and `useCallback` where necessary
- Name components in PascalCase
- One component per file (except small related components)

### Styling
- **NativeWind** instead of StyleSheet
- Format: `className="bg-white dark:bg-gray-900"`
- Use dark variants: `dark:bg-gray-800`, `dark:text-white`
- Avoid inline styles when possible
- Responsive with Tailwind breakpoints

### Forms
- Use React Hook Form with zodResolver
- Define schemas in `utils/validation/schemas.ts`
- Controller component for controlled inputs
- Show validation errors under each field

### Global State (Zustand)
- Modular stores by domain (auth, user, cart, etc.)
- Use persist middleware with AsyncStorage for data that needs to persist
- Define TypeScript types for each store
- Actions as functions within the store

### Error Handling
- Try-catch in all async calls
- Show user-friendly error messages
- Logging in development, silent in production
- Use error boundaries for React errors

### Naming
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with use prefix (`useAuth.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`User.ts`, `AuthState.ts`)
- **Constants**: UPPER_SNAKE_CASE in `constants/`

## Architecture

### Folder Structure

```
jelty/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Group: Public routes
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/                   # Group: Protected routes with tabs
│   │   ├── _layout.tsx           # Tabs configuration
│   │   ├── index.tsx             # Tab: Home
│   │   ├── profile.tsx           # Tab: Profile
│   │   └── settings.tsx          # Tab: Settings
│   ├── _layout.tsx               # Root layout (providers)
│   └── +not-found.tsx
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   └── forms/                    # Form components
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
├── services/                     # Services and API clients
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
├── utils/                        # Utilities
│   ├── validation/
│   │   └── schemas.ts            # Zod schemas
│   └── helpers.ts
│
├── constants/                    # Constants
│   ├── colors.ts
│   └── config.ts
│
└── assets/                       # Static assets
    ├── images/
    └── fonts/
```

### Authentication Flow

1. User accesses the app
2. Root layout (_layout.tsx) wraps with ClerkProvider
3. Tabs layout verifies authentication with `useAuth()`
4. If not authenticated → Redirect to `/(auth)/sign-in`
5. If authenticated → Show protected tabs
6. Clerk token stored in expo-secure-store via tokenCache

### Data Flow

1. **API Calls**:
   - `useApi` hook → axios client → interceptors (add auth token)
   - Response stored in local state or Zustand

2. **Local vs Global State**:
   - Local: useState, useReducer for component-specific state
   - Global: Zustand for shared state (user, auth, cart)

3. **Persistence**:
   - Zustand + persist middleware → AsyncStorage
   - Sensitive data → expo-secure-store

## Development Guidelines

### Create New UI Component

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

### Create Form with Validation

```typescript
// utils/validation/schemas.ts
import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
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

### Create Zustand Store

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

### Protect Routes

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

## Important Considerations

### Performance
- FlatList with optimized `windowSize` for long lists
- Implement virtualization with FlashList if >1000 items
- useMemo for expensive calculations
- useCallback for functions passed as props
- React.memo for pure components
- Lazy loading of images with expo-image

### Security
- NEVER commit `.env` to repository
- Use `expo-secure-store` for tokens and sensitive data
- Always validate on backend, client-side validation is only UX
- Sanitize inputs before displaying
- Implement rate limiting on backend

### Dark Mode
- Use `useColorScheme` hook from NativeWind
- All screens must support dark mode
- Format: `className="bg-white dark:bg-gray-900"`
- Configure `userInterfaceStyle: "automatic"` in app.json

### Expo Specifics
- Use `expo-constants` for access to env vars
- Prefix `EXPO_PUBLIC_` for client-exposed variables
- npx expo install for native dependencies
- Use Expo modules when possible over native modules

### Testing
- Jest for unit tests
- React Native Testing Library for component tests
- Mock Clerk with `@clerk/testing`
- Mock AsyncStorage in tests
- Minimum coverage: 70%

## Environment Variables

```bash
# .env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
EXPO_PUBLIC_API_URL=https://api.example.com
```

## Common Commands

```bash
# Development
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

## Resources and Documentation

- Expo Docs: https://docs.expo.dev/
- Expo Router: https://docs.expo.dev/router/introduction/
- NativeWind: https://www.nativewind.dev/
- Clerk: https://clerk.com/docs/quickstarts/expo
- Zustand: https://docs.pmnd.rs/zustand/
- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/

## Additional Notes

- This is a complex app project with multiple features
- Prioritize user experience and performance
- Maintain clean and well-documented code
- Follow SOLID and DRY principles
- Code reviews mandatory before merge
