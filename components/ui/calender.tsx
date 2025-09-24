import React from "react";
import { Calendar as RNCalendar, DateData } from "react-native-calendars";
import { View } from "react-native";

interface CalendarProps {
  onSelectDate?: (date: string) => void;
  selectedDate?: string;
}

export function Calendar({ onSelectDate, selectedDate }: CalendarProps) {
  return (
    <View style={{ borderRadius: 8, overflow: "hidden" }}>
      <RNCalendar
        onDayPress={(day: DateData) => {
          onSelectDate?.(day.dateString);
        }}
        markedDates={
          selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#1e3a8a", // deep blue
                  selectedTextColor: "white",
                },
              }
            : {}
        }
        theme={{
          todayTextColor: "#2563eb",
          arrowColor: "#1e3a8a",
          textDayFontWeight: "500",
          textMonthFontWeight: "600",
          textDayHeaderFontWeight: "600",
          selectedDayBackgroundColor: "#1e3a8a",
          selectedDayTextColor: "white",
        }}
      />
    </View>
  );
}
