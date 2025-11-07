import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";

/**
 * Pantalla de bienvenida
 */
export default function WelcomeScreen() {
  const handleSignUp = () => {
    // TODO: Navegar a sign-up cuando implementemos Clerk
    console.log("Sign Up pressed");
  };

  const handleSignIn = () => {
    // TODO: Navegar a sign-in cuando implementemos Clerk
    console.log("Sign In pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-base-white dark:bg-base-black">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
      >
        <View className="flex-1 justify-between px-6 py-12">
          {/* Top Section - Logo y Welcome Text */}
          <View className="items-center pt-8">
            <Image
              source={require("@/assets/images/JeltyLogo.png")}
              style={{ width: 150, height: 150 }}
              resizeMode="contain"
            />

            <Text className="text-2xl font-semibold text-center text-gray-900 dark:text-white mt-8 px-4">
              Welcome to your personalized health and fitness coach
            </Text>
          </View>

          {/* Middle Section - Spacer */}
          <View className="flex-1 min-h-[50px]" />

          {/* Bottom Section - Buttons y Footer */}
          <View>
            {/* Buttons */}
            <View className="gap-4 mb-8">
              <Button
                onPress={handleSignUp}
                variant="brand-primary"
                size="large"
                className="w-full"
              >
                Sign Up
              </Button>

              <Button
                onPress={handleSignIn}
                variant="brand-secondary"
                size="large"
                className="w-full"
              >
                Sign In
              </Button>
            </View>

            {/* Footer */}
            <View className="items-center space-y-2">
              <Text className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2 px-4">
                By continuing, you agree to our{" "}
                <Text className="underline">Terms of Service</Text> and{" "}
                <Text className="underline">Privacy Policy</Text>
              </Text>

              <Text className="text-xs text-gray-500 dark:text-gray-500">
                Version 1.0.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
