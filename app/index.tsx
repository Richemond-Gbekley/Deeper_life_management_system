import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function LoginSelection() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-50 to-white px-6">
      {/* App Title */}
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center mb-4">
          <Ionicons name="people" size={28} color="white" />
        </View>
        <Text className="text-blue-900 text-center text-lg font-semibold">
          Deeper Life Bible Church{"\n"}Attendance System
        </Text>
      </View>

      {/* Member Login Card */}
      <View className="w-full bg-white border border-blue-200 rounded-xl mb-4 p-4 shadow-sm">
        <View className="flex-row items-center mb-3">
          <Ionicons name="person-outline" size={20} color="#1e3a8a" />
          <Text className="ml-2 text-blue-900 font-medium">Member Login</Text>
        </View>
        <TouchableOpacity
          className="w-full bg-blue-600 rounded-lg py-3 items-center"
          onPress={() => router.push("/member-login")}
        >
          <Text className="text-white font-semibold">Continue as Member</Text>
        </TouchableOpacity>
      </View>

      {/* Admin Login Card */}
      <View className="w-full bg-white border border-blue-200 rounded-xl p-4 shadow-sm">
        <View className="flex-row items-center mb-3">
          <MaterialIcons name="admin-panel-settings" size={20} color="#1e3a8a" />
          <Text className="ml-2 text-blue-900 font-medium">Admin Login</Text>
        </View>
        <TouchableOpacity
          className="w-full bg-blue-600 rounded-lg py-3 items-center"
          onPress={() => router.push("/admin-login")}
        >
          <Text className="text-white font-semibold">Continue as Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
