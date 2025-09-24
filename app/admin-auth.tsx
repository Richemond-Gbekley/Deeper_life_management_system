import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function AdminLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!name ||!password) return;

    // 🚀 Later: send login data to backend
    console.log("Login Data:", { name, password });

    router.push("./location-admin-dashboard");
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white ml-2 text-lg font-semibold">
          Deeper Life Bible Church
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Card */}
        <View className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm max-w-sm mx-auto w-full">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={32} color="#2563eb" />
            </View>
            <Text className="text-blue-900 text-xl font-bold">Admin Login</Text>
            <Text className="text-gray-600 text-sm mt-1 text-center">
              Enter your details to access your dashboard
            </Text>
          </View>

          {/* Full Name */}
          <View className="mb-4">
            <Text className="text-blue-900 font-medium mb-2">Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              className="border border-blue-200 rounded-lg px-4 py-3 bg-white"
            />
          </View>

      

          {/* Password */}
          <View className="mb-4">
            <Text className="text-blue-900 font-medium mb-2">Password</Text>
            <View className="flex-row items-center border border-blue-200 rounded-lg px-3 bg-white">
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                className="flex-1 py-3"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#2563eb"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            disabled={!name ||!password}
            onPress={handleLogin}
            className={`rounded-lg py-3 items-center ${
              name &&  password ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <Text className="text-white font-semibold">Login to Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => router.push("/forgot-password")}
          className="mt-3"
        >
          <Text className="text-blue-600 text-sm text-center">
            Forgot Password?
          </Text>
        </TouchableOpacity>

 
      </ScrollView>
    </View>
  );
}
