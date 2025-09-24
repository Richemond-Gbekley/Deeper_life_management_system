import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight, MoreHorizontal } from "lucide-react-native";

interface BreadcrumbProps {
  items: { label: string; onPress?: () => void; isCurrent?: boolean }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          {item.onPress && !item.isCurrent ? (
            <TouchableOpacity onPress={item.onPress}>
              <Text style={styles.link}>{item.label}</Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={[styles.text, item.isCurrent && styles.current]}
              accessibilityRole={item.isCurrent ? "text" : "link"}
            >
              {item.label}
            </Text>
          )}
          {index < items.length - 1 && (
            <ChevronRight size={14} color="#6b7280" style={styles.separator} />
          )}
        </View>
      ))}
    </View>
  );
}

// Optional: Ellipsis if there are too many items
export function BreadcrumbEllipsis() {
  return (
    <View style={styles.ellipsis}>
      <MoreHorizontal size={16} color="#6b7280" />
      <Text style={{ fontSize: 0 }}>More</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    color: "#2563eb", // blue-600
    fontSize: 14,
  },
  text: {
    color: "#4b5563", // gray-600
    fontSize: 14,
  },
  current: {
    color: "#111827", // gray-900
    fontWeight: "600",
  },
  separator: {
    marginHorizontal: 4,
  },
  ellipsis: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
});
