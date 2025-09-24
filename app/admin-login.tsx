import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Define roles
export type AdminRole =
  | "super-admin"
  | "zone-admin"
  | "region-admin"
  | "division-admin"
  | "group-admin"
  | "district-admin"
  | "location-admin";

const adminRoles: {
  role: AdminRole;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  level: number;
}[] = [
  {
    role: "super-admin",
    title: "Super Admin",
    description: "Manages all roles across the church",
    icon: "ribbon-outline",
    level: 1,
  },
  {
    role: "zone-admin",
    title: "Zone Admin",
    description: "Manages multiple regions",
    icon: "globe-outline",
    level: 2,
  },
  {
    role: "region-admin",
    title: "Region Admin",
    description: "Manages multiple divisions",
    icon: "map-outline",
    level: 3,
  },
  {
    role: "division-admin",
    title: "Division Admin",
    description: "Manages multiple groups",
    icon: "business-outline",
    level: 4,
  },
  {
    role: "group-admin",
    title: "Group Admin",
    description: "Manages multiple districts",
    icon: "people-outline",
    level: 5,
  },
  {
    role: "district-admin",
    title: "District Admin",
    description: "Manages multiple locations",
    icon: "home-outline",
    level: 6,
  },
  {
    role: "location-admin",
    title: "Location Admin",
    description: "Manages members and attendance at location level",
    icon: "pin-outline",
    level: 7,
  },
];

export default function AdminRoleSelection() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-lg"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="ml-3">
          <Text className="text-white font-semibold">
            Deeper Life Bible Church
          </Text>
          <Text className="text-blue-100 text-sm">Select Admin Role</Text>
        </View>
      </View>

      {/* Role Selection */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {adminRoles.map((role) => (
          <TouchableOpacity
            key={role.role}
            onPress={() => {
              console.log("Selected:", role.role);
               router.push("./admin-auth");
            }}
            className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm"
          >
            <View className="flex-row items-start">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name={role.icon} size={20} color="#2563eb" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="text-blue-900 font-medium mr-2">
                    {role.title}
                  </Text>
                  <Text className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Level {role.level}
                  </Text>
                </View>
                <Text className="text-sm text-gray-600">{role.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
