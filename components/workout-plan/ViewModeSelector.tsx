import React from "react";
import { View, Text, Pressable, StyleSheet, useColorScheme } from "react-native";
import { WorkoutPlanViewMode } from "@/types/workout";

interface ViewModeSelectorProps {
  value: WorkoutPlanViewMode;
  onChange: (mode: WorkoutPlanViewMode) => void;
}

const VIEW_MODES: { mode: WorkoutPlanViewMode; label: string }[] = [
  { mode: "day", label: "Day" },
  { mode: "week", label: "Week" },
  { mode: "month", label: "Month" },
];

export function ViewModeSelector({ value, onChange }: ViewModeSelectorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {VIEW_MODES.map(({ mode, label }) => {
        const isSelected = value === mode;

        return (
          <Pressable
            key={mode}
            onPress={() => onChange(mode)}
            style={[
              styles.button,
              isSelected && styles.buttonSelected,
              isDark && isSelected && styles.buttonSelectedDark,
            ]}
          >
            <Text
              style={[
                styles.text,
                isSelected && styles.textSelected,
                isDark && !isSelected && styles.textDark,
                isDark && isSelected && styles.textSelectedDark,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    padding: 4,
  },
  containerDark: {
    backgroundColor: "#1f2937",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonSelected: {
    backgroundColor: "#1F024B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonSelectedDark: {
    backgroundColor: "#1F024B",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
  textDark: {
    color: "#9ca3af",
  },
  textSelected: {
    color: "#ffffff",
  },
  textSelectedDark: {
    color: "#ffffff",
  },
});
