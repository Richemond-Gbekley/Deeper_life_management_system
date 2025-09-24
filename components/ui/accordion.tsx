import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Enable layout animation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View className="mb-2 border border-gray-300 rounded-lg bg-white">
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row justify-between items-center px-4 py-3"
      >
        <Text className="text-blue-900 font-medium">{title}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color="#1e3a8a"
        />
      </TouchableOpacity>

      {open && <View className="px-4 pb-3">{children}</View>}
    </View>
  );
}
