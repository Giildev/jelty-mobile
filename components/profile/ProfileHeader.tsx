import { Text, View } from "react-native";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  email: string;
  memberSince: string;
  loading?: boolean;
}

export function ProfileHeader({
  firstName,
  lastName,
  email,
  memberSince,
  loading = false,
}: ProfileHeaderProps) {
  // Get first letter for avatar
  const avatarLetter = firstName?.charAt(0).toUpperCase() || "?";
  const fullName = `${firstName} ${lastName}`.trim();

  if (loading) {
    return (
      <View className="items-center py-6 bg-white dark:bg-gray-800 rounded-xl mb-6">
        {/* Avatar Skeleton */}
        <View className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />

        {/* Title Skeleton */}
        <View className="h-7 w-48 rounded bg-gray-200 dark:bg-gray-700 mb-2" />

        {/* Email Skeleton */}
        <View className="h-5 w-56 rounded bg-gray-200 dark:bg-gray-700 mb-2" />

        {/* Member Since Skeleton */}
        <View className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
      </View>
    );
  }

  return (
    <View className="items-center py-6 bg-white dark:bg-gray-800 rounded-xl mb-6">
      {/* Avatar */}
      <View className="w-20 h-20 rounded-full bg-blue-500 dark:bg-blue-600 items-center justify-center mb-4">
        <Text className="text-3xl font-bold text-white">{avatarLetter}</Text>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        Profile & Settings
      </Text>

      {/* Full Name */}
      {fullName && (
        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">
          {fullName}
        </Text>
      )}

      {/* Email */}
      <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">
        {email}
      </Text>

      {/* Member Since */}
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        Member since {memberSince}
      </Text>
    </View>
  );
}
