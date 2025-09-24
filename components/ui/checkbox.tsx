"use client";

import React, { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Check } from "lucide-react-native"; // RN version of lucide-react

type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: number;
};

export function Checkbox({
  checked: checkedProp,
  onChange,
  disabled = false,
  size = 20,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : internalChecked;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) {
      setInternalChecked(!checked);
    }
    onChange?.(!checked);
  };

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      style={[
        styles.checkbox,
        { width: size, height: size, borderRadius: 4 },
        checked && styles.checked,
        disabled && styles.disabled,
      ]}
    >
      {checked && <Check size={size * 0.7} color="white" strokeWidth={3} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderColor: "#6b7280", // gray-500
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#4f46e5", // indigo-600
    borderColor: "#4f46e5",
  },
  disabled: {
    opacity: 0.5,
  },
});
