import { useRouter, type Href } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Users,
  Calendar,
  UserPlus,
  BarChart3,
  Settings,
  Bell,
  CheckSquare,
} from "lucide-react-native";

export default function LocationAdminDashboard() {
  const router = useRouter();

  // Hardcoded stats (replace with API later)
  const stats = [
    { label: "Total Members", value: "156", change: "+12" },
    { label: "This Week Attendance", value: "89%", change: "+5%" },
    { label: "Upcoming Meetings", value: "3", change: "" },
  ];

  // Actions with routes
  const actions: {
    icon: any;
    label: string;
    color: string;
    route: Href;
  }[] = [
    {
      icon: UserPlus,
      label: "Add Members",
      color: "bg-blue-500",
    route: "/member-register" as Href, // ✅ link directly to your member-register folder
    },
    {
      icon: CheckSquare,
      label: "Mark Attendance",
      color: "bg-green-500",
      route: "/location-admin-quick-action/mark-attendance" as Href,
    },
    {
      icon: Calendar,
      label: "Create Meeting",
      color: "bg-purple-500",
      route: "/location-admin-quick-action/create-meeting" as Href,
    },
    {
      icon: BarChart3,
      label: "View Reports",
      color: "bg-green-500",
      route: "/location-admin-quick-action/view-reports" as Href,
    },
    {
      icon: Bell,
      label: "Notifications",
      color: "bg-yellow-500",
      route: "/location-admin-quick-action/notifications" as Href,
    },
    {
      icon: Settings,
      label: "Settings",
      color: "bg-gray-500",
      route: "/location-admin-quick-action/settings" as Href,
    },
  ];

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          Location Admin Dashboard
        </Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Stats Section */}
        <Text className="text-blue-900 mb-2 text-lg font-bold">Overview</Text>
        {stats.map((stat, index) => (
          <View
            key={index}
            className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm"
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm text-gray-600">{stat.label}</Text>
                <Text className="text-2xl text-blue-900 mt-1">{stat.value}</Text>
              </View>
              {stat.change ? (
                <Text className="text-green-600 font-medium">{stat.change}</Text>
              ) : null}
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <Text className="text-blue-900 mt-6 mb-2 text-lg font-bold">
          Quick Actions
        </Text>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <TouchableOpacity
              key={index}
              className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm flex-row items-center"
              onPress={() => router.push(action.route)}
            >
              <View
                className={`w-12 h-12 ${action.color} rounded-full items-center justify-center mr-3`}
              >
                <Icon size={24} color="white" />
              </View>
              <Text className="text-blue-900 text-base">{action.label}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Recent Activity */}
        <View className="bg-white border border-blue-200 rounded-xl p-4 mt-6 shadow-sm">
          <Text className="text-blue-900 text-lg font-bold mb-3">
            Recent Activity
          </Text>
          <View className="flex-row items-center mb-2">
            <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            <Text className="text-sm text-gray-700 flex-1">
              New member added to Lagos Central
            </Text>
            <Text className="text-xs text-gray-500">2h ago</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <View className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            <Text className="text-sm text-gray-700 flex-1">
              Weekly meeting created
            </Text>
            <Text className="text-xs text-gray-500">4h ago</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
            <Text className="text-sm text-gray-700 flex-1">
              Attendance report generated
            </Text>
            <Text className="text-xs text-gray-500">1d ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
