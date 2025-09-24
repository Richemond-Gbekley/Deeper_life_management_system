import React from "react";
import { Image, Text, View, StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native";

interface AvatarProps {
  uri?: string; // image URL
  fallback?: string; // fallback text (e.g. initials)
  size?: number; // default: 40
  style?: {
    container?: StyleProp<ViewStyle>;
    image?: StyleProp<ImageStyle>;
    fallback?: StyleProp<TextStyle>;
  };
}

export function Avatar({ uri, fallback = "?", size = 40, style }: AvatarProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#e5e7eb", // gray-200 fallback bg
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        style?.container,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            { width: "100%", height: "100%" },
            style?.image,
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={[
            { fontSize: size / 2.5, color: "#1f2937", fontWeight: "600" },
            style?.fallback,
          ]}
        >
          {fallback}
        </Text>
      )}
    </View>
  );
}
