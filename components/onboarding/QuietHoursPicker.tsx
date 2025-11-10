import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface QuietHoursPickerProps {
  label: string;
  startTime: string | null; // "22:00"
  endTime: string | null; // "07:00"
  onStartChange: (time: string) => void;
  onEndChange: (time: string) => void;
  enabled: boolean;
}

export function QuietHoursPicker({
  label,
  startTime,
  endTime,
  onStartChange,
  onEndChange,
  enabled,
}: QuietHoursPickerProps) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Convert time string to Date object
  const timeStringToDate = (timeStr: string | null): Date => {
    const now = new Date();
    if (!timeStr) return now;

    const [hours, minutes] = timeStr.split(":").map(Number);
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  // Convert Date object to time string
  const dateToTimeString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Format time for display
  const formatTime = (timeStr: string | null): string => {
    if (!timeStr) return "Select time";

    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleStartTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowStartPicker(false);
    }

    if (selectedDate) {
      onStartChange(dateToTimeString(selectedDate));
    }
  };

  const handleEndTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowEndPicker(false);
    }

    if (selectedDate) {
      onEndChange(dateToTimeString(selectedDate));
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <View className="mb-6">
      {/* Label */}
      <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
        {label}
      </Text>
      <Text className="mb-3 text-sm text-gray-600 dark:text-gray-400">
        Set times when you don't want to receive notifications
      </Text>

      {/* Time Selection Row */}
      <View className="flex-row gap-3">
        {/* Start Time */}
        <View className="flex-1">
          <Text className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            Start Time
          </Text>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            className="flex-row items-center justify-between rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={20} color="#6B7280" />
              <Text className="ml-2 text-base text-gray-900 dark:text-white">
                {formatTime(startTime)}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* End Time */}
        <View className="flex-1">
          <Text className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            End Time
          </Text>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            className="flex-row items-center justify-between rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={20} color="#6B7280" />
              <Text className="ml-2 text-base text-gray-900 dark:text-white">
                {formatTime(endTime)}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* iOS Time Pickers (Modal) */}
      {Platform.OS === "ios" && showStartPicker && (
        <Modal
          transparent
          animationType="slide"
          visible={showStartPicker}
          onRequestClose={() => setShowStartPicker(false)}
        >
          <TouchableOpacity
            className="flex-1 justify-end bg-black/50"
            activeOpacity={1}
            onPress={() => setShowStartPicker(false)}
          >
            <View className="bg-white dark:bg-gray-900">
              <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity onPress={() => setShowStartPicker(false)}>
                  <Text className="text-base text-primary">Done</Text>
                </TouchableOpacity>
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  Select Start Time
                </Text>
                <View style={{ width: 50 }} />
              </View>
              <DateTimePicker
                value={timeStringToDate(startTime)}
                mode="time"
                display="spinner"
                onChange={handleStartTimeChange}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {Platform.OS === "ios" && showEndPicker && (
        <Modal
          transparent
          animationType="slide"
          visible={showEndPicker}
          onRequestClose={() => setShowEndPicker(false)}
        >
          <TouchableOpacity
            className="flex-1 justify-end bg-black/50"
            activeOpacity={1}
            onPress={() => setShowEndPicker(false)}
          >
            <View className="bg-white dark:bg-gray-900">
              <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity onPress={() => setShowEndPicker(false)}>
                  <Text className="text-base text-primary">Done</Text>
                </TouchableOpacity>
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  Select End Time
                </Text>
                <View style={{ width: 50 }} />
              </View>
              <DateTimePicker
                value={timeStringToDate(endTime)}
                mode="time"
                display="spinner"
                onChange={handleEndTimeChange}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Android Time Pickers (Native Dialog) */}
      {Platform.OS === "android" && showStartPicker && (
        <DateTimePicker
          value={timeStringToDate(startTime)}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleStartTimeChange}
        />
      )}

      {Platform.OS === "android" && showEndPicker && (
        <DateTimePicker
          value={timeStringToDate(endTime)}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleEndTimeChange}
        />
      )}
    </View>
  );
}
