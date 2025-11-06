# Jelty - React Native + Expo App

Aplicación móvil construida con React Native, Expo y un stack moderno de desarrollo.

## Stack Tecnológico

### Core
- **React Native** con **Expo SDK 54**
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing v4)
- **Metro bundler**

### Estilos
- **NativeWind v4** (Tailwind CSS para React Native)
- **React Native Reanimated** (animaciones)
- Dark mode support (light/dark/system)

### Estado y Datos
- **Zustand** (state management global con persist)
- **AsyncStorage** (persistencia local)
- **React Hook Form** + **Zod** (formularios con validación)

### Autenticación
- **Clerk** (@clerk/clerk-expo)
- **expo-secure-store** (almacenamiento seguro)

### Networking
- **Axios** (HTTP client con interceptors)

### Iconos
- **@expo/vector-icons**

### Development Tools
- **ESLint** + **Prettier**
- **SuperClaude Framework** (asistente de desarrollo mejorado)

## Estructura del Proyecto

```
jelty/
├── app/                      # Expo Router (file-based routing)
│   ├── (auth)/              # Rutas públicas de autenticación
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/              # Rutas protegidas con tabs
│   │   ├── index.tsx        # Home
│   │   ├── profile.tsx      # Perfil
│   │   ├── settings.tsx     # Configuración
│   │   └── _layout.tsx
│   └── _layout.tsx          # Root layout (ClerkProvider)
│
├── components/
│   ├── ui/                  # Componentes UI base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── forms/               # Componentes de formularios
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
│       └── secureStorage.ts # Token cache para Clerk
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

## Configuración Inicial

### 1. Variables de Entorno

Crea o edita el archivo `.env` y agrega tu Clerk Publishable Key:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
EXPO_PUBLIC_API_URL=https://tu-api.com
EXPO_PUBLIC_ENV=development
```

**Importante:** Para obtener tu Clerk Publishable Key:
1. Ve a [clerk.com](https://clerk.com) y crea una cuenta
2. Crea una nueva aplicación
3. En el dashboard, ve a "API Keys"
4. Copia la "Publishable Key" al archivo `.env`

### 2. Instalar Dependencias

Las dependencias ya están instaladas, pero si necesitas reinstalar:

```bash
npm install
```

### 3. Iniciar el Proyecto

```bash
npm start
```

O para plataformas específicas:

```bash
npm run android  # Android
npm run ios      # iOS (solo macOS)
npm run web      # Web
```

## Características Principales

### Autenticación con Clerk
- ✅ Sign in / Sign up
- ✅ Protección de rutas
- ✅ Sesiones seguras con expo-secure-store
- ✅ Logout

### Navegación
- ✅ File-based routing con Expo Router
- ✅ Tabs navigation (Home, Perfil, Configuración)
- ✅ Stack navigation dentro de cada tab
- ✅ Protección de rutas autenticadas

### Estilos
- ✅ NativeWind (Tailwind CSS)
- ✅ Dark mode completo (light/dark/system)
- ✅ Componentes UI reutilizables
- ✅ Responsive design

### Estado y Formularios
- ✅ Zustand con persistencia
- ✅ React Hook Form + Zod para validación
- ✅ API client configurado con Axios
- ✅ Custom hooks para API calls

## Comandos Útiles

```bash
# Desarrollo
npm start                    # Iniciar dev server
npm run android             # Abrir en Android
npm run ios                 # Abrir en iOS
npm run web                 # Abrir en navegador

# Code Quality
npm run lint                # Ejecutar ESLint
npm run format              # Formatear con Prettier

# Build (requiere configuración de EAS)
npx eas build --platform android
npx eas build --platform ios
```

## Convenciones de Código

### TypeScript
- Usar tipos estrictos (strict mode habilitado)
- Definir interfaces para todos los props
- Usar `z.infer<typeof schema>` para tipos desde Zod

### Componentes
- Functional components con hooks
- Usar React.memo cuando sea necesario
- Nombrar en PascalCase

### Estilos
- Usar NativeWind en lugar de StyleSheet
- Formato: `className="bg-white dark:bg-gray-900"`
- Usar variantes dark para todos los componentes

### Formularios
- React Hook Form con zodResolver
- Schemas en `utils/validation/schemas.ts`
- Mostrar errores bajo cada campo

## Próximos Pasos

1. **Configurar Clerk**: Agrega tu Publishable Key al archivo `.env`
2. **Personalizar**: Modifica colores en `tailwind.config.js`
3. **Agregar Features**: Usa los componentes y hooks existentes
4. **Conectar API**: Configura endpoints en `services/api/endpoints.ts`
5. **Testing**: Agrega tests con Jest y React Native Testing Library

## SuperClaude Framework

Este proyecto incluye SuperClaude Framework para asistencia de desarrollo mejorada. Los comandos disponibles incluyen:

- `/agent` - Ejecutar agentes especializados
- `/research` - Investigación profunda con búsqueda web
- `/index-repo` - Indexar el repositorio (optimización de tokens)

Para más información: https://github.com/SuperClaude-Org/SuperClaude_Framework

## Recursos

- [Expo Docs](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- [Clerk Expo](https://clerk.com/docs/quickstarts/expo)
- [Zustand](https://docs.pmnd.rs/zustand/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Soporte

Para problemas o preguntas, consulta la documentación oficial de cada tecnología o revisa el archivo `.claude/CLAUDE.md` para convenciones específicas del proyecto.

---

**¡Feliz desarrollo! 🚀**
