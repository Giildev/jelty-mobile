import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface DatePickerProps {
  label: string;
  value: string; // format: dd/mm/yyyy
  onChange: (date: string) => void;
  error?: string;
}

export function DatePicker({ label, value, onChange, error }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(() => {
    if (value) {
      const [day, month, year] = value.split("/").map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setTempDate(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      onChange(`${day}/${month}/${year}`);
    }
  };

  const handleConfirm = () => {
    setShowPicker(false);
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className={`flex-row items-center justify-between rounded-xl border px-4 ${
          error
            ? "border-error bg-error/5"
            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
        }`}
        style={{ paddingTop: 12, paddingBottom: 12 }}
      >
        <Text
          className={`text-base ${
            value
              ? "text-gray-900 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {value || "dd/mm/yyyy"}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={24}
          className="text-gray-400 dark:text-gray-500"
        />
      </TouchableOpacity>

      {error && (
        <Text className="mt-1 text-sm text-error dark:text-red-400">
          {error}
        </Text>
      )}

      {/* iOS Picker - Modal */}
      {Platform.OS === "ios" && showPicker && (
        <Modal
          transparent
          animationType="slide"
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="rounded-t-3xl bg-white pb-8 dark:bg-gray-900">
              {/* Header */}
              <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text className="text-base font-medium text-secondary">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  {label}
                </Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text className="text-base font-medium text-secondary">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Picker */}
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                textColor="#1C1C1C"
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Android Picker */}
      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
    </View>
  );
}
