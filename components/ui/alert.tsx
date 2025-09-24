import React from "react";
import { View, Text } from "react-native";

type AlertVariant = "default" | "destructive";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
}

export function Alert({ variant = "default", title, description }: AlertProps) {
  const containerStyle =
    variant === "destructive"
      ? "border border-red-400 bg-red-50"
      : "border border-blue-200 bg-blue-50";

  const titleStyle =
    variant === "destructive" ? "text-red-700 font-semibold" : "text-blue-900 font-semibold";

  const descriptionStyle =
    variant === "destructive" ? "text-red-600" : "text-gray-700";

  return (
    <View className={`w-full rounded-lg px-4 py-3 mb-3 ${containerStyle}`}>
      {title && <Text className={`mb-1 ${titleStyle}`}>{title}</Text>}
      {description && <Text className={`text-sm ${descriptionStyle}`}>{description}</Text>}
    </View>
  );
}
