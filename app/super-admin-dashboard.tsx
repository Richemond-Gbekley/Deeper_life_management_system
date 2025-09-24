// app/super-admin-dashboard.tsx
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Users, Layers, UserPlus, BarChart3, Settings } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function SuperAdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);

  // Fetch stats + activities from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard/overview");
        const data = await res.json();
        setStats(data.stats); // [{label, value, change}, ...]
        setActivities(data.activities); // [{message, created_at}, ...]
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const actions = [
    { icon: Users, label: "Manage Roles", color: "bg-indigo-500", route: "/super-admin/manage-roles" },
    { icon: Layers, label: "Manage Categories", color: "bg-purple-500", route: "/super-admin/manage-categories" },
    { icon: UserPlus, label: "Create Admins", color: "bg-blue-500", route: "/super-admin/create-admins" },
    { icon: BarChart3, label: "View Global Reports", color: "bg-green-500", route: "/super-admin/reports" },
    { icon: Settings, label: "System Settings", color: "bg-gray-500", route: "/super-admin/settings" },
  ];

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-50">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-blue-900 mt-2">Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Super Admin Dashboard</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Stats */}
        <Text className="text-blue-900 mb-2 text-lg font-bold">Overview</Text>
        {stats.map((stat, index) => (
          <View key={index} className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm text-gray-600">{stat.label}</Text>
                <Text className="text-2xl text-blue-900 mt-1">{stat.value}</Text>
              </View>
              {stat.change ? <Text className="text-green-600 font-medium">{stat.change}</Text> : null}
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <Text className="text-blue-900 mt-6 mb-2 text-lg font-bold">Quick Actions</Text>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <TouchableOpacity
              key={index}
              className="bg-white border border-blue-200 rounded-xl p-4 mb-3 shadow-sm flex-row items-center"
                onPress={() => router.push(action.route as any)}
            >
              <View className={`w-12 h-12 ${action.color} rounded-full items-center justify-center mr-3`}>
                <Icon size={24} color="white" />
              </View>
              <Text className="text-blue-900 text-base">{action.label}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Recent Activities */}
        <Text className="text-blue-900 mt-6 mb-2 text-lg font-bold">Recent Activities</Text>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <View key={index} className="bg-white border border-blue-200 rounded-xl p-3 mb-2 shadow-sm">
              <Text className="text-gray-700">{activity.message}</Text>
              <Text className="text-xs text-gray-500 mt-1">{new Date(activity.created_at).toLocaleString()}</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-500">No recent activities</Text>
        )}
      </ScrollView>
    </View>
  );
}
