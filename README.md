# Jelty - React Native + Expo App

Mobile application built with React Native, Expo and a modern development stack.

## Technology Stack

### Core
- **React Native** with **Expo SDK 54**
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing v4)
- **Metro bundler**

### Styling
- **NativeWind v4** (Tailwind CSS for React Native)
- **React Native Reanimated** (animations)
- Dark mode support (light/dark/system)

### State and Data
- **Zustand** (global state management with persist)
- **AsyncStorage** (local persistence)
- **React Hook Form** + **Zod** (forms with validation)

### Authentication
- **Clerk** (@clerk/clerk-expo)
- **expo-secure-store** (secure storage)

### Networking
- **Axios** (HTTP client with interceptors)

### Icons
- **@expo/vector-icons**

### Development Tools
- **ESLint** + **Prettier**
- **SuperClaude Framework** (enhanced development assistant)

## Project Structure

```
jelty/
├── app/                      # Expo Router (file-based routing)
│   ├── (auth)/              # Public authentication routes
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/              # Protected routes with tabs
│   │   ├── index.tsx        # Home
│   │   ├── profile.tsx      # Profile
│   │   ├── settings.tsx     # Settings
│   │   └── _layout.tsx
│   └── _layout.tsx          # Root layout (ClerkProvider)
│
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── forms/               # Form components
│
├── hooks/                   # Custom hooks
│   ├── useColorScheme.ts
│   └── useApi.ts
│
├── store/                   # Zustand stores
│   └── userStore.ts
│
├── services/
│   ├── api/
│   │   ├── client.ts        # Axios instance
│   │   └── endpoints.ts
│   └── storage/
│       └── secureStorage.ts # Token cache for Clerk
│
├── types/                   # TypeScript definitions
│   └── api.ts
│
├── utils/
│   └── validation/
│       └── schemas.ts       # Zod schemas
│
└── constants/
    └── config.ts
```

## Initial Setup

### 1. Environment Variables

Create or edit the `.env` file and add your Clerk Publishable Key:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
EXPO_PUBLIC_API_URL=https://your-api.com
EXPO_PUBLIC_ENV=development
```

**Important:** To get your Clerk Publishable Key:
1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. In the dashboard, go to "API Keys"
4. Copy the "Publishable Key" to the `.env` file

### 2. Install Dependencies

Dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### 3. Start the Project

```bash
npm start
```

Or for specific platforms:

```bash
npm run android  # Android
npm run ios      # iOS (macOS only)
npm run web      # Web
```

## Main Features

### Authentication with Clerk
- ✅ Sign in / Sign up
- ✅ Route protection
- ✅ Secure sessions with expo-secure-store
- ✅ Logout

### Navigation
- ✅ File-based routing with Expo Router
- ✅ Tabs navigation (Home, Profile, Settings)
- ✅ Stack navigation within each tab
- ✅ Protected authenticated routes

### Styling
- ✅ NativeWind (Tailwind CSS)
- ✅ Complete dark mode (light/dark/system)
- ✅ Reusable UI components
- ✅ Responsive design

### State and Forms
- ✅ Zustand with persistence
- ✅ React Hook Form + Zod for validation
- ✅ API client configured with Axios
- ✅ Custom hooks for API calls

## Useful Commands

```bash
# Development
npm start                    # Start dev server
npm run android             # Open on Android
npm run ios                 # Open on iOS
npm run web                 # Open in browser

# Code Quality
npm run lint                # Run ESLint
npm run format              # Format with Prettier

# Build (requires EAS configuration)
npx eas build --platform android
npx eas build --platform ios
```

## Code Conventions

### TypeScript
- Use strict types (strict mode enabled)
- Define interfaces for all props
- Use `z.infer<typeof schema>` for types from Zod

### Components
- Functional components with hooks
- Use React.memo when necessary
- Name in PascalCase

### Styling
- Use NativeWind instead of StyleSheet
- Format: `className="bg-white dark:bg-gray-900"`
- Use dark variants for all components

### Forms
- React Hook Form with zodResolver
- Schemas in `utils/validation/schemas.ts`
- Show errors under each field

## Next Steps

1. **Configure Clerk**: Add your Publishable Key to the `.env` file
2. **Customize**: Modify colors in `tailwind.config.js`
3. **Add Features**: Use existing components and hooks
4. **Connect API**: Configure endpoints in `services/api/endpoints.ts`
5. **Testing**: Add tests with Jest and React Native Testing Library

## SuperClaude Framework

This project includes SuperClaude Framework for enhanced development assistance. Available commands include:

- `/agent` - Run specialized agents
- `/research` - Deep research with web search
- `/index-repo` - Index the repository (token optimization)

For more information: https://github.com/SuperClaude-Org/SuperClaude_Framework

## Resources

- [Expo Docs](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- [Clerk Expo](https://clerk.com/docs/quickstarts/expo)
- [Zustand](https://docs.pmnd.rs/zustand/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Support

For issues or questions, consult the official documentation for each technology or review the `.claude/CLAUDE.md` file for project-specific conventions.

---

**Happy coding! 🚀**
