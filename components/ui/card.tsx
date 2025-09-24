import React from "react";
import { View, Text, StyleSheet, ViewProps, TextProps } from "react-native";

type CardProps = ViewProps & { children: React.ReactNode };
type CardSectionProps = ViewProps & { children: React.ReactNode };
type CardTextProps = TextProps & { children: React.ReactNode };

export function Card({ style, children, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

export function CardHeader({ style, children, ...props }: CardSectionProps) {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
}

export function CardTitle({ style, children, ...props }: CardTextProps) {
  return (
    <Text style={[styles.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
}

export function CardDescription({ style, children, ...props }: CardTextProps) {
  return (
    <Text style={[styles.cardDescription, style]} {...props}>
      {children}
    </Text>
  );
}

export function CardAction({ style, children, ...props }: CardSectionProps) {
  return (
    <View style={[styles.cardAction, style]} {...props}>
      {children}
    </View>
  );
}

export function CardContent({ style, children, ...props }: CardSectionProps) {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({ style, children, ...props }: CardSectionProps) {
  return (
    <View style={[styles.cardFooter, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb", // Tailwind border-gray-200
    paddingVertical: 12,
    marginVertical: 8,
    overflow: "hidden",
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827", // gray-900
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280", // gray-500
    marginTop: 2,
  },
  cardAction: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  cardContent: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  cardFooter: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 8,
  },
});
