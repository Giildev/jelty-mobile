# Sistema de Diseño Jelty

Sistema de diseño completo moderno, con efectos liquid glass, tipografía Roboto, y paleta de colores personalizada.

## 🎨 Uso Rápido

### En Componentes (con NativeWind)

```tsx
import { View, Text } from 'react-native';

export function MiComponente() {
  return (
    // Glass card con sombra y bordes redondeados
    <View className="glass-card-light dark:glass-card-dark p-6">
      {/* Tipografía con Roboto (por defecto) */}
      <Text className="text-2xl font-bold text-primary">
        Título Principal
      </Text>

      <Text className="text-base text-gray-700 dark:text-gray-300 mt-2">
        Texto de cuerpo con espaciado consistente
      </Text>

      {/* Botón con colores del sistema */}
      <View className="bg-accent-green rounded-xl p-4 mt-4 shadow-md">
        <Text className="text-white font-semibold text-center">
          Botón Acción
        </Text>
      </View>
    </View>
  );
}
```

### En StyleSheet (con tokens de JavaScript)

```tsx
import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '@/constants/tokens';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.glass.light,
    padding: spacing[6],
    borderRadius: radius.xl,
    ...shadows.glass,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.DEFAULT,
  },
});
```

## 📚 Referencia Rápida

### Colores

#### Tailwind Classes
```tsx
// Primary
className="bg-primary text-primary border-primary"
className="bg-primary-950"  // Más oscuro
className="bg-primary-50"   // Más claro

// Accent Lime
className="bg-accent-lime text-accent-lime border-accent-lime"

// Accent Green
className="bg-accent-green text-accent-green border-accent-green"

// Secondary
className="bg-secondary text-secondary border-secondary"

// Semantic
className="bg-success"  // Verde (#0CDA51)
className="bg-warning"  // Naranja (#FBB040)
className="bg-error"    // Rojo (#EF4444)
className="bg-info"     // Azul (#147BFE)

// Base
className="bg-base-black"  // #1C1C1C
className="bg-base-white"  // #FFFFFF
className="bg-gray-900"    // Gris oscuro
```

#### JavaScript
```tsx
import { colors } from '@/constants/tokens';

colors.primary.DEFAULT    // #1F024B
colors.accent.lime.DEFAULT  // #E0FF2C
colors.accent.green.DEFAULT // #0CDA51
colors.secondary.DEFAULT    // #147BFE
colors.semantic.success     // #0CDA51
colors.glass.light          // rgba(255, 255, 255, 0.7)
```

### Tipografía (Roboto)

```tsx
// Tamaños
className="text-xs"    // 12px
className="text-sm"    // 14px
className="text-base"  // 16px (por defecto)
className="text-lg"    // 18px
className="text-xl"    // 20px
className="text-2xl"   // 24px
className="text-3xl"   // 30px
className="text-4xl"   // 36px

// Pesos
className="font-normal"    // 400 (Roboto_400Regular)
className="font-medium"    // 500 (Roboto_500Medium)
className="font-semibold"  // 600
className="font-bold"      // 700 (Roboto_700Bold)
```

### Espaciado

```tsx
// Padding
className="p-1"   // 4px
className="p-2"   // 8px
className="p-3"   // 12px
className="p-4"   // 16px
className="p-6"   // 24px
className="p-8"   // 32px

// Margin
className="m-4 mt-6 mb-8"

// Gap (para flex/grid)
className="gap-2"  // 8px
className="gap-4"  // 16px
className="gap-6"  // 24px
```

### Border Radius

```tsx
className="rounded-sm"   // 4px
className="rounded"      // 8px (por defecto)
className="rounded-md"   // 12px
className="rounded-lg"   // 16px
className="rounded-xl"   // 20px
className="rounded-2xl"  // 24px
className="rounded-3xl"  // 32px
className="rounded-full" // 9999px
```

### Sombras

```tsx
// Sombras estándar
className="shadow-sm"
className="shadow-md"
className="shadow-lg"

// Sombras glass (custom)
className="shadow-glass"        // Sombra suave con tinte primary
className="shadow-glass-heavy"  // Sombra más pronunciada
```

### Efectos Glass Morphism

```tsx
// Clases predefinidas
className="glass-light"         // Light mode, opacidad 70%
className="glass-light-heavy"   // Light mode, opacidad 90%
className="glass-dark"          // Dark mode, opacidad 70%
className="glass-dark-heavy"    // Dark mode, opacidad 90%
className="glass-primary"       // Tinte primary, opacidad 30%

// Combinaciones comunes
className="glass-card-light"      // Card completo con glass light
className="glass-card-dark"       // Card completo con glass dark
className="glass-card-primary"    // Card completo con glass primary

// Ejemplo completo
<View className="glass-light rounded-2xl border border-white/20 p-6 shadow-glass">
  <Text className="text-gray-900 font-semibold">Glass Card</Text>
</View>
```

## 🌓 Dark Mode

Todos los estilos soportan dark mode automáticamente con el prefijo `dark:`:

```tsx
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-white">
    Texto que se adapta al modo
  </Text>

  <View className="glass-card-light dark:glass-card-dark">
    Card que cambia según el tema
  </View>
</View>
```

## 📦 Jerarquía de Componentes Recomendada

### Texto
```tsx
// Headings
<Text className="text-4xl font-bold">Título Principal</Text>
<Text className="text-3xl font-bold">Título Secundario</Text>
<Text className="text-2xl font-semibold">Subtítulo</Text>

// Body
<Text className="text-base">Texto normal</Text>
<Text className="text-sm text-gray-600">Texto secundario</Text>
<Text className="text-xs text-gray-500">Caption</Text>
```

### Cards
```tsx
// Glass Card
<View className="glass-card-light dark:glass-card-dark p-6">
  <Text className="text-xl font-semibold mb-2">Título</Text>
  <Text className="text-base text-gray-700 dark:text-gray-300">
    Contenido
  </Text>
</View>

// Card Sólido
<View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
  <Text className="text-xl font-semibold">Título</Text>
</View>
```

### Botones
```tsx
// Primary Button
<View className="bg-primary rounded-xl px-6 py-3 shadow-md active:opacity-80">
  <Text className="text-white font-semibold text-center">
    Botón Principal
  </Text>
</View>

// Secondary Button
<View className="bg-secondary rounded-xl px-6 py-3 shadow-md">
  <Text className="text-white font-semibold text-center">
    Botón Secundario
  </Text>
</View>

// Outline Button
<View className="border-2 border-primary rounded-xl px-6 py-3">
  <Text className="text-primary font-semibold text-center">
    Botón Outline
  </Text>
</View>
```

## 🎯 Patrones Comunes

### Layout Container
```tsx
<View className="flex-1 bg-base-white dark:bg-base-black">
  <View className="p-6 gap-4">
    {/* Contenido */}
  </View>
</View>
```

### Form Input
```tsx
<View className="gap-2">
  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
    Label
  </Text>
  <View className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3">
    <TextInput
      placeholder="Ingresa texto..."
      placeholderTextColor={colors.base.gray[400]}
      className="text-base text-gray-900 dark:text-white"
    />
  </View>
</View>
```

### Alert/Banner
```tsx
// Success
<View className="bg-success/10 border border-success rounded-xl p-4">
  <Text className="text-success font-medium">Operación exitosa!</Text>
</View>

// Error
<View className="bg-error/10 border border-error rounded-xl p-4">
  <Text className="text-error font-medium">Ocurrió un error</Text>
</View>
```

## 🔧 Personalización

Para modificar el sistema de diseño, edita:

1. **`constants/tokens/index.ts`** - Tokens de JavaScript/TypeScript
2. **`tailwind.config.js`** - Configuración de Tailwind (colores, espaciado, etc.)
3. **`global.css`** - Estilos globales y clases personalizadas

Cualquier cambio en estos archivos se reflejará automáticamente en toda la app.

## 📱 Demo

Ve a la pantalla Home (app/(tabs)/index.tsx) para ver ejemplos visuales de todos los tokens del sistema de diseño en acción.

---

**Sistema de Diseño Jelty v1.0** • Diseño moderno y elegante
