import React from "react";
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const variantStyle = styles[variant === "default" ? "variantDefault" : variant];
  const sizeStyle = styles[size === "default" ? "sizeDefault" : size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, variantStyle, sizeStyle, style, disabled && styles.disabled]}
    >
      <Text style={[styles.textBase, textColors[variant], textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textBase: {
    fontSize: 14,
    fontWeight: "600",
  },

  // ✅ Variants
  variantDefault: { backgroundColor: "#1e3a8a" }, // deep blue
  destructive: { backgroundColor: "#dc2626" }, // red
  outline: {
    borderWidth: 1,
    borderColor: "#1e3a8a",
    backgroundColor: "transparent",
  },
  secondary: { backgroundColor: "#6b7280" }, // gray
  ghost: { backgroundColor: "transparent" },
  link: { backgroundColor: "transparent" },

  // ✅ Sizes
  sizeDefault: { paddingVertical: 10, paddingHorizontal: 16 },
  sm: { paddingVertical: 6, paddingHorizontal: 12 },
  lg: { paddingVertical: 14, paddingHorizontal: 20 },
  icon: { padding: 10, borderRadius: 50 },

  // Disabled
  disabled: {
    opacity: 0.5,
  },
});

// Text colors for different variants
const textColors: Record<Variant, TextStyle> = {
  default: { color: "#ffffff" },
  destructive: { color: "#ffffff" },
  outline: { color: "#1e3a8a" },
  secondary: { color: "#ffffff" },
  ghost: { color: "#1e3a8a" },
  link: { color: "#1e3a8a", textDecorationLine: "underline" },
};
