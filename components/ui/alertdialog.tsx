import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface AlertDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export function AlertDialog({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: AlertDialogProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="bg-red-600 px-4 py-2 rounded"
      >
        <Text className="text-white">Open Alert</Text>
      </TouchableOpacity>

      {/* Modal Dialog */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white w-80 rounded-lg p-6">
            <Text className="text-lg font-semibold mb-2 text-blue-900">{title}</Text>
            <Text className="text-gray-600 mb-4">{description}</Text>

            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                onPress={() => setVisible(false)}
                className="px-4 py-2 border rounded-lg border-gray-300"
              >
                <Text className="text-gray-700">{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  onConfirm();
                }}
                className="px-4 py-2 bg-red-600 rounded-lg"
              >
                <Text className="text-white">{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
