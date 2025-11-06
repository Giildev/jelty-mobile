import { View, Text, ScrollView } from "react-native";

/**
 * Pantalla principal / Home
 */
export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        {/* Header */}
        <View className="mb-10 items-center">
          <Text className="text-6xl font-bold text-blue-600 dark:text-blue-400">
            Jelty
          </Text>
        </View>

        {/* Tech Stack List */}
        <View>
          <TechItem icon="⚛️" title="React Native + Expo SDK 52" />
          <TechItem icon="📘" title="TypeScript" />
          <TechItem icon="🗺️" title="Expo Router v4" />
          <TechItem icon="🎨" title="NativeWind v4" />
          <TechItem icon="🔐" title="Clerk Authentication" />
          <TechItem icon="🐻" title="Zustand" />
          <TechItem icon="📋" title="React Hook Form" />
          <TechItem icon="✅" title="Zod" />
          <TechItem icon="🎭" title="React Native Reanimated" />
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Componente de item de tecnología
 */
function TechItem({ icon, title }: { icon: string; title: string }) {
  return (
    <View className="mb-4 flex-row items-center">
      <Text className="mr-4 text-3xl">{icon}</Text>
      <Text className="text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </Text>
    </View>
  );
}
