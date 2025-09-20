import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export type AdminRole =
  | "super-admin"
  | "zone-admin"
  | "region-admin"
  | "division-admin"
  | "group-admin"
  | "district-admin"
  | "location-admin";

interface AdminRoleSelectionProps {
  onSelectRole: (role: AdminRole) => void;
  onBack: () => void;
}

const adminRoles = [
  {
    role: "super-admin" as AdminRole,
    title: "Super Admin",
    description: "Manages all roles across the church",
    icon: "ribbon-outline",
    level: 1,
  },
  {
    role: "zone-admin" as AdminRole,
    title: "Zone Admin",
    description: "Manages multiple regions",
    icon: "globe-outline",
    level: 2,
  },
  {
    role: "region-admin" as AdminRole,
    title: "Region Admin",
    description: "Manages multiple divisions",
    icon: "map-outline",
    level: 3,
  },
  {
    role: "division-admin" as AdminRole,
    title: "Division Admin",
    description: "Manages multiple groups",
    icon: "business-outline",
    level: 4,
  },
  {
    role: "group-admin" as AdminRole,
    title: "Group Admin",
    description: "Manages multiple districts",
    icon: "people-outline",
    level: 5,
  },
  {
    role: "district-admin" as AdminRole,
    title: "District Admin",
    description: "Manages multiple locations",
    icon: "home-outline",
    level: 6,
  },
  {
    role: "location-admin" as AdminRole,
    title: "Location Admin",
    description: "Manages members and attendance at location level",
    icon: "location-outline",
    level: 7,
  },
];

export default function AdminRoleSelection({ onSelectRole, onBack }: AdminRoleSelectionProps) {
  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="p-2">
          <Ionicons name="chevron-back" size={22} color="white" />
        </TouchableOpacity>
        <View className="ml-3">
          <Text className="text-white font-semibold">Deeper Life Bible Church</Text>
          <Text className="text-blue-100 text-sm">Select Admin Role</Text>
        </View>
      </View>

      {/* Role Selection */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {adminRoles.map((roleItem) => (
          <TouchableOpacity
            key={roleItem.role}
            onPress={() => onSelectRole(roleItem.role)}
            className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm flex-row items-center"
          >
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name={roleItem.icon as any} size={20} color="#2563eb" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-blue-900 font-semibold">{roleItem.title}</Text>
                <View className="px-2 py-0.5 rounded-full bg-blue-100">
                  <Text className="text-xs text-blue-600">Level {roleItem.level}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-600 mt-1">{roleItem.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
