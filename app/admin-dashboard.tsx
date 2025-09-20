import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import type { AdminRole } from "./admin-role-selection";

const roleDisplayNames: Record<AdminRole, string> = {
  "super-admin": "Super Admin",
  "zone-admin": "Zone Admin",
  "region-admin": "Region Admin",
  "division-admin": "Division Admin",
  "group-admin": "Group Admin",
  "district-admin": "District Admin",
  "location-admin": "Location Admin",
};

const getAvailableActions = (role: AdminRole) => {
  const baseActions = [
    { icon: "bar-chart-outline" as const, label: "View Reports", color: "bg-green-500" },
    { icon: "notifications-outline" as const, label: "Notifications", color: "bg-yellow-500" },
    { icon: "settings-outline" as const, label: "Settings", color: "bg-gray-500" },
  ];

  if (role === "location-admin") {
    return [
      { icon: "person-add-outline" as const, label: "Add Members", color: "bg-blue-500" },
      { icon: "checkbox-outline" as const, label: "Mark Attendance", color: "bg-green-500" },
      { icon: "calendar-outline" as const, label: "Create Meeting", color: "bg-purple-500" },
      ...baseActions,
    ];
  }

  return [
    { icon: "people-outline" as const, label: "Manage Admins", color: "bg-blue-500" },
    { icon: "bar-chart-outline" as const, label: "View All Reports", color: "bg-green-500" },
    { icon: "settings-outline" as const, label: "System Settings", color: "bg-gray-500" },
  ];
};

const getStats = (role: AdminRole) => {
  if (role === "location-admin") {
    return [
      { label: "Total Members", value: "156", change: "+12" },
      { label: "This Week Attendance", value: "89%", change: "+5%" },
      { label: "Upcoming Meetings", value: "3", change: "" },
    ];
  }

  const multiplier =
    role === "super-admin" ? 1000 : role === "zone-admin" ? 500 : role === "region-admin" ? 200 : 100;

  return [
    { label: "Total Members", value: `${multiplier * 2}`, change: `+${multiplier / 10}` },
    { label: "Locations", value: `${Math.floor(multiplier / 50)}`, change: "+2" },
    { label: "Average Attendance", value: "87%", change: "+3%" },
  ];
};

export default function AdminDashboard({ role }: { role: AdminRole }) {
  const router = useRouter();
  const actions = getAvailableActions(role);
  const stats = getStats(role);

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="ml-3 flex-1">
          <Text className="text-white font-semibold">Deeper Life Bible Church</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-blue-100 text-sm">{roleDisplayNames[role]} Dashboard</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="notifications-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Stats */}
        <Text className="text-blue-900 mb-2 font-semibold">Overview</Text>
        {stats.map((stat, index) => (
          <View key={index} className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm text-gray-600">{stat.label}</Text>
                <Text className="text-2xl text-blue-900 mt-1">{stat.value}</Text>
              </View>
              {stat.change ? (
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-green-700 text-xs">{stat.change}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <Text className="text-blue-900 mt-4 mb-2 font-semibold">Quick Actions</Text>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm flex-row items-center"
            onPress={() => console.log("Pressed", action.label)}
          >
            <View className={`w-12 h-12 ${action.color} rounded-full items-center justify-center mr-3`}>
              <Ionicons name={action.icon} size={22} color="white" />
            </View>
            <Text className="text-blue-900">{action.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Recent Activity */}
        <View className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm mt-4">
          <Text className="text-blue-900 font-semibold mb-3">Recent Activity</Text>

          <View className="flex-row items-center gap-3 p-2 bg-blue-50 rounded mb-2">
            <View className="w-2 h-2 bg-green-500 rounded-full" />
            <Text className="text-sm text-gray-700 flex-1">New member added to Lagos Central</Text>
            <Text className="text-xs text-gray-500">2h ago</Text>
          </View>

          <View className="flex-row items-center gap-3 p-2 bg-blue-50 rounded mb-2">
            <View className="w-2 h-2 bg-blue-500 rounded-full" />
            <Text className="text-sm text-gray-700 flex-1">Weekly meeting created</Text>
            <Text className="text-xs text-gray-500">4h ago</Text>
          </View>

          <View className="flex-row items-center gap-3 p-2 bg-blue-50 rounded">
            <View className="w-2 h-2 bg-yellow-500 rounded-full" />
            <Text className="text-sm text-gray-700 flex-1">Attendance report generated</Text>
            <Text className="text-xs text-gray-500">1d ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
