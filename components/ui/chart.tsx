"use client";
import React, { createContext, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// Define light/dark theme colors
const THEMES = { light: {}, dark: {} } as const;

export type ChartConfig = {
  [key: string]: {
    label?: string;
    color?: string;
    icon?: React.ReactNode;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used inside <ChartContainer>");
  return ctx;
}

/**
 * ChartContainer
 * - Wraps all Victory charts
 * - Provides config via context
 */
export function ChartContainer({
  config,
  children,
  style,
}: {
  config: ChartConfig;
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <View style={[styles.container, style]}>{children}</View>
    </ChartContext.Provider>
  );
}

/**
 * ChartTooltipContent
 * - A custom tooltip wrapper for Victory
 */
export function ChartTooltipContent({
  x,
  y,
  datumKey,
}: {
  x?: string | number;
  y?: string | number;
  datumKey?: string;
}) {
  const { config } = useChart();
  const label = datumKey && config[datumKey]?.label;
  return (
    <View style={styles.tooltip}>
      {label && <Text style={styles.tooltipLabel}>{label}</Text>}
      <Text style={styles.tooltipValue}>{`${x || ""}: ${y}`}</Text>
    </View>
  );
}

/**
 * ChartLegendContent
 * - Custom Legend renderer
 */
export function ChartLegendContent() {
  const { config } = useChart();
  return (
    <View style={styles.legend}>
      {Object.entries(config).map(([key, item]) => (
        <View key={key} style={styles.legendItem}>
          <View
            style={[styles.colorBox, { backgroundColor: item.color || "gray" }]}
          />
          <Text style={styles.legendText}>{item.label || key}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  tooltipLabel: { fontWeight: "bold", fontSize: 12 },
  tooltipValue: { fontSize: 12 },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: { flexDirection: "row", alignItems: "center", marginRight: 12 },
  colorBox: { width: 12, height: 12, marginRight: 6, borderRadius: 2 },
  legendText: { fontSize: 12, color: "#333" },
});
