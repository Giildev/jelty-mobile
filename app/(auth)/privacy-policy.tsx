import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

/**
 * Privacy Policy Screen
 * Pantalla que muestra la política de privacidad y consentimiento
 */
export default function PrivacyPolicyScreen() {
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
            Consent & Privacy
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
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </View>

        {/* Data We Collect */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Data We Collect
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
            We collect the following types of information:
          </Text>
          <View className="ml-4">
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Personal identification information (Name, email address, phone
              number)
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Physical characteristics (Height, weight, body composition)
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Usage data and analytics
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Device information and identifiers
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • Location data (with your permission)
            </Text>
          </View>
        </View>

        {/* How We Use Your Data */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            How We Use Your Data
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
            We use the information we collect for the following purposes:
          </Text>
          <View className="ml-4">
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To provide and maintain our Service
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To personalize your workout and nutrition experience
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To notify you about changes to our Service
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To provide customer support
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To gather analysis or valuable information to improve our
              Service
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • To monitor the usage of our Service
            </Text>
          </View>
        </View>

        {/* Data Sharing */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Data Sharing and Disclosure
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            We do not sell your personal information to third parties. We may
            share your information only in the following circumstances: with
            your consent, for legal purposes, or with service providers who
            assist us in operating our platform.
          </Text>
        </View>

        {/* Your Rights */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Your Rights
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            You have certain rights regarding your personal information. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
            Your rights include:
          </Text>
          <View className="ml-4">
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • The right to access - You have the right to request copies of
              your personal data
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • The right to rectification - You have the right to request that
              we correct any information you believe is inaccurate
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • The right to erasure - You have the right to request that we
              erase your personal data
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • The right to restrict processing - You have the right to request
              that we restrict the processing of your personal data
            </Text>
            <Text className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
              • The right to data portability - You have the right to request
              that we transfer your data to another organization
            </Text>
          </View>
        </View>

        {/* Security */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Security
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            The security of your personal information is important to us. We use
            commercially acceptable means to protect your personal information,
            but remember that no method of transmission over the Internet, or
            method of electronic storage is 100% secure.
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            We implement industry-standard security measures including encryption,
            secure authentication, and regular security audits to protect your
            data.
          </Text>
        </View>

        {/* Data Retention */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Data Retention
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            We will retain your personal information only for as long as is
            necessary for the purposes set out in this Privacy Policy. We will
            retain and use your information to the extent necessary to comply
            with our legal obligations.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        {/* Children's Privacy */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Children's Privacy
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            Our Service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 13. If you are a parent or guardian and you are
            aware that your child has provided us with personal information,
            please contact us.
          </Text>
        </View>

        {/* Changes to Privacy Policy */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Changes to This Privacy Policy
          </Text>
          <Text className="mb-3 leading-6 text-gray-700 dark:text-gray-300">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </Text>
        </View>

        {/* Contact Us */}
        <View className="mb-8">
          <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Contact Us
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact
            us at privacy@jelty.com
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
