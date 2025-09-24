// app/admin-dashboard.tsx
import { ROLE_CONFIG } from "./role.config";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Card, CardContent } from "../components/ui/card";

export default function AdminDashboard() {
  const { role } = useLocalSearchParams<{ role: keyof typeof ROLE_CONFIG }>();
  const router = useRouter();

  const roleConfig = ROLE_CONFIG[role || "super-admin"]; // fallback

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center justify-between">
        <Text className="text-white text-lg font-semibold">
          {role ? `${role} Dashboard` : "Admin Dashboard"}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white">Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Stats */}
        <View>
          <Text className="text-blue-900 mb-2 text-lg font-bold">Overview</Text>
          {roleConfig.stats.map((stat, index) => (
            <Card key={index} className="border-blue-200 mb-3">
              <CardContent>
                <Text className="text-sm text-gray-600">{stat.label}</Text>
                {/* Replace with real values later */}
                <Text className="text-2xl text-blue-900 mt-1">--</Text>
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Actions */}
        <View className="mt-6">
          <Text className="text-blue-900 text-lg font-bold">Quick Actions</Text>
          {roleConfig.actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="border-blue-200 mb-3">
                <CardContent className="flex-row items-center gap-3">
                  <View
                    className={`w-12 h-12 ${action.color} rounded-full items-center justify-center`}
                  >
                    <Icon size={24} color="white" />
                  </View>
                  <Text className="text-blue-900">{action.label}</Text>
                </CardContent>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
