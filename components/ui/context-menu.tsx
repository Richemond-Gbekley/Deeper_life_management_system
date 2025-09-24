import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type ContextMenuItem = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

interface ContextMenuProps {
  children: React.ReactNode; // the trigger (wrapped in Touchable)
  items: ContextMenuItem[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ children, items }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = (e: GestureResponderEvent) => {
    e.preventDefault?.();
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  return (
    <>
      <TouchableOpacity onLongPress={openMenu}>{children}</TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View style={styles.overlay}>
          <View style={styles.menu}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  item.destructive && { backgroundColor: "#fee2e2" },
                ]}
                onPress={() => {
                  closeMenu();
                  item.onPress();
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    item.destructive && { color: "#dc2626", fontWeight: "600" },
                  ]}
                >
                            {item.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </Modal>
                  </>
                );
              };
              
              const styles = StyleSheet.create({
                overlay: {
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  justifyContent: "center",
                  alignItems: "center",
                },
                menu: {
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 0,
                  minWidth: 180,
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                },
                menuItem: {
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                },
                menuText: {
                  fontSize: 16,
                  color: "#222",
                },
              });
