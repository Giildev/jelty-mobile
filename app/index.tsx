import { View, Text, ScrollView } from "react-native";

/**
 * Pantalla principal / Home
 * Demo del Sistema de Diseño Jelty
 */
export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-base-white dark:bg-base-black">
      <View className="p-6 gap-6">
        {/* Header con tipografía Roboto */}
        <View className="mb-4 items-center">
          <Text className="text-5xl font-bold text-primary dark:text-primary-300">
            Jelty
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Sistema de Diseño Moderno
          </Text>
        </View>

        {/* Paleta de Colores */}
        <View className="glass-card-light dark:glass-card-dark p-6">
          <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Paleta de Colores
          </Text>

          <View className="gap-3">
            {/* Primary */}
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-primary rounded-xl shadow-md" />
              <View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white">
                  Primary
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400">
                  #1F024B
                </Text>
              </View>
            </View>

            {/* Accent Lime */}
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-accent-lime rounded-xl shadow-md" />
              <View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white">
                  Accent Lime
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400">
                  #E0FF2C
                </Text>
              </View>
            </View>

            {/* Accent Green */}
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-accent-green rounded-xl shadow-md" />
              <View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white">
                  Accent Green
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400">
                  #0CDA51
                </Text>
              </View>
            </View>

            {/* Secondary */}
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-secondary rounded-xl shadow-md" />
              <View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white">
                  Secondary
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400">
                  #147BFE
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tipografía Roboto */}
        <View className="glass-card-light dark:glass-card-dark p-6">
          <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Tipografía (Roboto)
          </Text>

          <View className="gap-3">
            <Text className="text-4xl font-bold text-gray-900 dark:text-white">
              Heading Bold
            </Text>
            <Text className="text-2xl font-semibold text-gray-900 dark:text-white">
              Title Semibold
            </Text>
            <Text className="text-lg font-medium text-gray-900 dark:text-white">
              Subtitle Medium
            </Text>
            <Text className="text-base font-normal text-gray-700 dark:text-gray-300">
              Body Regular - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Caption - Texto pequeño para detalles y metadata
            </Text>
          </View>
        </View>

        {/* Glass Morphism */}
        <View className="gap-4">
          <Text className="text-xl font-semibold text-gray-900 dark:text-white px-2">
            Efectos Glass (Liquid Glass)
          </Text>

          <View className="glass-light rounded-2xl border border-white/20 p-6 shadow-lg">
            <Text className="text-base font-medium text-gray-900">
              Glass Light
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              Superficie translúcida para light mode
            </Text>
          </View>

          <View className="glass-dark rounded-2xl border border-white/10 p-6 shadow-lg">
            <Text className="text-base font-medium text-white">
              Glass Dark
            </Text>
            <Text className="text-sm text-gray-300 mt-1">
              Superficie translúcida para dark mode
            </Text>
          </View>

          <View className="glass-primary rounded-2xl border border-primary/30 p-6 shadow-xl">
            <Text className="text-base font-medium text-white">
              Glass Primary
            </Text>
            <Text className="text-sm text-primary-100 mt-1">
              Superficie con tinte primary
            </Text>
          </View>
        </View>

        {/* Espaciado y Bordes */}
        <View className="glass-card-light dark:glass-card-dark p-6">
          <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Bordes Redondeados
          </Text>

          <View className="gap-3">
            <View className="bg-secondary/20 rounded-sm p-4">
              <Text className="text-sm text-gray-900 dark:text-white">rounded-sm (4px)</Text>
            </View>
            <View className="bg-secondary/20 rounded-md p-4">
              <Text className="text-sm text-gray-900 dark:text-white">rounded-md (12px)</Text>
            </View>
            <View className="bg-secondary/20 rounded-xl p-4">
              <Text className="text-sm text-gray-900 dark:text-white">rounded-xl (20px)</Text>
            </View>
            <View className="bg-secondary/20 rounded-2xl p-4">
              <Text className="text-sm text-gray-900 dark:text-white">rounded-2xl (24px)</Text>
            </View>
          </View>
        </View>

        {/* Semantic Colors */}
        <View className="glass-card-light dark:glass-card-dark p-6">
          <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Colores Semánticos
          </Text>

          <View className="gap-3">
            <View className="bg-success/10 border border-success rounded-xl p-4">
              <Text className="text-sm font-medium text-success">Success</Text>
            </View>
            <View className="bg-warning/10 border border-warning rounded-xl p-4">
              <Text className="text-sm font-medium text-warning">Warning</Text>
            </View>
            <View className="bg-error/10 border border-error rounded-xl p-4">
              <Text className="text-sm font-medium text-error">Error</Text>
            </View>
            <View className="bg-info/10 border border-info rounded-xl p-4">
              <Text className="text-sm font-medium text-info">Info</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center py-8">
          <Text className="text-xs text-gray-500 dark:text-gray-600">
            Sistema de Diseño Jelty v1.0
          </Text>
          <Text className="text-xs text-gray-400 dark:text-gray-700 mt-1">
            Diseño moderno y elegante
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
