import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

/**
 * Terms of Service Screen
 * Pantalla que muestra los términos y condiciones del servicio
 */
export default function TermsOfServiceScreen() {
  return (
    <View className="flex-1 bg-base-white dark:bg-base-black">
      {/* Header */}
      <View className="border-b border-gray-200 bg-white px-6 pb-4 pt-12 dark:border-gray-800 dark:bg-gray-900">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="mr-4 h-10 w-10 items-center justify-center"
          >
            <Text className="text-2xl text-gray-600 dark:text-gray-400">←</Text>
          </Pressable>
          <Text className="flex-1 text-xl font-semibold text-gray-900 dark:text-white">
            Terms of Service
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-6">
        {/* Intro */}
        <View className="mb-8">
          <Text className="mb-4 text-base leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
        </View>

        {/* Acceptance of Terms */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            1. Acceptance of Terms
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </View>

        {/* Use License */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            2. Use License
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on Jelty's mobile application
            for personal, non-commercial transitory viewing only.
          </Text>
          <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
            This is the grant of a license, not a transfer of title, and under
            this license you may not:
          </Text>
          <View className="ml-4">
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Modify or copy the materials
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Use the materials for any commercial purpose
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Attempt to decompile or reverse engineer any software
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Remove any copyright or other proprietary notations
            </Text>
          </View>
        </View>

        {/* User Accounts */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            3. User Accounts
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </Text>
        </View>

        {/* Content Standards */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            4. Content Standards
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </Text>
        </View>

        {/* Prohibited Uses */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            5. Prohibited Uses
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            You may use the Service only for lawful purposes and in accordance
            with these Terms. You agree not to use the Service:
          </Text>
          <View className="ml-4">
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • In any way that violates any applicable national or
              international law or regulation
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To transmit, or procure the sending of, any advertising or
              promotional material
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To impersonate or attempt to impersonate the Company, a Company
              employee, another user
            </Text>
          </View>
        </View>

        {/* Termination */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            6. Termination
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            We may terminate or suspend your account and bar access to the
            Service immediately, without prior notice or liability, under our
            sole discretion, for any reason whatsoever and without limitation,
            including but not limited to a breach of the Terms.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        {/* Changes to Terms */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            7. Changes to Terms
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will provide
            at least 30 days notice prior to any new terms taking effect.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            What constitutes a material change will be determined at our sole
            discretion. By continuing to access or use our Service after any
            revisions become effective, you agree to be bound by the revised
            terms.
          </Text>
        </View>

        {/* Contact Us */}
        <View className="mb-8">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            8. Contact Us
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            If you have any questions about these Terms, please contact us at
            support@jelty.com
          </Text>
        </View>

        {/* Last Updated */}
        <View className="mb-8 items-center border-t border-gray-200 pt-6 dark:border-gray-800">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: January 7, 2025
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
