import { useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface GenerateNewPlanModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Modal to confirm generation of a new plan
 * Warns user that current plan will be deleted
 */
export function GenerateNewPlanModal({
  visible,
  onClose,
  onConfirm,
}: GenerateNewPlanModalProps) {
  // Animation values
  const translateY = useSharedValue(1000);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animate in
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      // Animate out
      translateY.value = withTiming(1000, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* Backdrop */}
      <Animated.View
        style={[backdropStyle]}
        className="flex-1 bg-black/50"
      >
        <Pressable className="flex-1" onPress={onClose} />
      </Animated.View>

      {/* Modal Content */}
      <Animated.View
        style={[modalStyle]}
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl p-6"
      >
        {/* Warning Icon */}
        <View className="items-center mb-4">
          <View className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 items-center justify-center mb-3">
            <Ionicons
              name="warning"
              size={32}
              className="text-amber-600 dark:text-amber-400"
            />
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Generate New Plan?
          </Text>
        </View>

        {/* Warning Message */}
        <View className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
          <Text className="text-base text-gray-700 dark:text-gray-300 text-center">
            Your current meal plan and workout plan will be{" "}
            <Text className="font-semibold text-amber-700 dark:text-amber-400">
              permanently deleted
            </Text>
            . A completely new plan will be generated based on your current
            preferences.
          </Text>
        </View>

        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          This action cannot be undone. Make sure you want to proceed before
          confirming.
        </Text>

        {/* Buttons */}
        <View className="flex-row gap-3">
          {/* Cancel Button */}
          <Pressable
            onPress={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-xl py-4 active:opacity-70"
          >
            <Text className="text-center text-base font-semibold text-gray-700 dark:text-gray-300">
              Cancel
            </Text>
          </Pressable>

          {/* Confirm Button */}
          <Pressable
            onPress={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-amber-600 dark:bg-amber-500 rounded-xl py-4 active:opacity-70"
          >
            <Text className="text-center text-base font-semibold text-white">
              Confirm
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
}
