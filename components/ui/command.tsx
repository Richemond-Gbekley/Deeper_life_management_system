import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Search, X } from "lucide-react-native";

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string; // optional keyboard shortcut
  onPress: () => void;
  group?: string; // e.g. "Navigation", "Settings"
}

interface CommandDialogProps {
  visible: boolean;
  onClose: () => void;
  items: CommandItem[];
  title?: string;
  description?: string;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({
  visible,
  onClose,
  items,
  title = "Command Palette",
  description = "Search or select a command...",
}) => {
  const [query, setQuery] = useState("");

  // Filter commands
  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  // Group items by `group`
  const grouped = filtered.reduce((groups: Record<string, CommandItem[]>, item) => {
    const group = item.group || "General";
    if (!groups[group]) groups[group] = [];
    groups[group].push(item);
    return groups;
  }, {});

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1e3a8a" />
            </TouchableOpacity>
          </View>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}

          {/* Search Input */}
          <View style={styles.searchWrapper}>
            <Search size={18} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search commands..."
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
          </View>

          {/* Command List */}
          <FlatList
            data={Object.entries(grouped)}
            keyExtractor={([group]) => group}
            renderItem={({ item: [group, commands] }) => (
              <View style={styles.group}>
                <Text style={styles.groupTitle}>{group}</Text>
                {commands.map((cmd) => (
                  <TouchableOpacity
                    key={cmd.id}
                    style={styles.item}
                    onPress={() => {
                      cmd.onPress();
                      onClose();
                    }}
                  >
                    <Text style={styles.itemLabel}>{cmd.label}</Text>
                    {cmd.shortcut && (
                      <Text style={styles.shortcut}>{cmd.shortcut}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>No commands found</Text>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "90%",
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  description: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    color: "#111827",
  },
  group: {
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 4,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "#f9fafb",
    marginBottom: 4,
  },
  itemLabel: {
    fontSize: 14,
    color: "#111827",
  },
  shortcut: {
    fontSize: 12,
    color: "#6b7280",
  },
  empty: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 20,
  },
});
