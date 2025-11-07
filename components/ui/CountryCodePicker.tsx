import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";

interface CountryCodePickerProps {
  value: string;
  onSelect: (code: string, dialCode: string, country: string) => void;
  error?: string;
  label?: string;
}

/**
 * Country Code Picker con modal
 * Wrapper del react-native-country-codes-picker con diseño del sistema
 */
export function CountryCodePicker({
  value,
  onSelect,
  error,
  label = "Country",
}: CountryCodePickerProps) {
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: value || "Select your country",
    dial_code: "",
    code: value || "",
  });

  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}

      <Pressable
        onPress={() => setShow(true)}
        className={`
          flex-row items-center justify-between rounded-lg border bg-white p-4
          dark:bg-gray-800
          ${
            error
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }
        `}
      >
        <Text
          className={`${
            selectedCountry.code
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {selectedCountry.name}
          {selectedCountry.dial_code && ` (${selectedCountry.dial_code})`}
        </Text>
        <Text className="text-gray-400">▼</Text>
      </Pressable>

      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}

      <CountryPicker
        show={show}
        pickerButtonOnPress={(item) => {
          setSelectedCountry({
            name: item.name.en,
            dial_code: item.dial_code,
            code: item.code,
          });
          onSelect(item.code, item.dial_code, item.name.en);
          setShow(false);
        }}
        onBackdropPress={() => setShow(false)}
        lang="en"
        style={{
          modal: {
            height: 500,
            backgroundColor: "#FFFFFF",
          },
          textInput: {
            height: 50,
            borderRadius: 8,
            paddingLeft: 16,
            fontSize: 16,
          },
          dialCode: {
            fontSize: 16,
            color: "#6B7280",
          },
          countryName: {
            fontSize: 16,
            color: "#1F2937",
          },
        }}
      />
    </View>
  );
}
