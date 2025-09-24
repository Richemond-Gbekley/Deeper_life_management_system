import React from "react";
import { Text, View, StyleProp, ViewStyle, TextStyle } from "react-native";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
}

export function Badge({ label, variant = "default", style }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, { container: ViewStyle; text: TextStyle }> = {
    default: {
      container: { backgroundColor: "#1e3a8a", borderColor: "transparent" }, // primary
      text: { color: "white" },
    },
    secondary: {
      container: { backgroundColor: "#e5e7eb", borderColor: "transparent" }, // gray-200
      text: { color: "#374151" }, // gray-700
    },
    destructive: {
      container: { backgroundColor: "#dc2626", borderColor: "transparent" }, // red-600
      text: { color: "white" },
    },
    outline: {
      container: { backgroundColor: "transparent", borderColor: "#1f2937", borderWidth: 1 }, // gray-800 border
      text: { color: "#1f2937" },
    },
  };

  return (
    <View
      style={[
        {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
          alignSelf: "flex-start",
        },
        variantStyles[variant].container,
        style?.container,
      ]}
    >
      <Text
        style={[
          { fontSize: 12, fontWeight: "500" },
          variantStyles[variant].text,
          style?.text,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}
