import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";

interface AspectRatioProps {
  ratio?: number; // default 16:9
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function AspectRatio({ ratio = 16 / 9, style, children }: AspectRatioProps) {
  return (
    <View style={[{ aspectRatio: ratio, width: "100%" }, style]}>
      {children}
    </View>
  );
}
