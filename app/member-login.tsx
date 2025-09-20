import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const divisions = [
  "Lagos Central",
  "Abuja North", 
  "Ibadan South",
  "Port Harcourt East",
  "Kano West",
  "Jos Central",
  "Kaduna North",
  "Enugu East"
];

export default function MemberLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");

  const handleLogin = () => {
    if (!name || !division) return;

    // 🚀 Later: send name + division to your SQL backend (API call)
    console.log("Login Data:", { name, division });

    // Navigate to dashboard (pass params if needed)
    router.push("/member-dashboard");
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2"
        >
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
            <Text className="text-blue-900 text-xl font-bold">Member Login</Text>
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

          {/* Division Select (basic) */}
          <View className="mb-4">
            <Text className="text-blue-900 font-medium mb-2">Select Division</Text>
            <TouchableOpacity
              className="border border-blue-200 rounded-lg px-4 py-3 bg-white"
              onPress={() => {
                // 🚀 In production, replace with a picker modal
                setDivision(divisions[0]); 
              }}
            >
              <Text className={division ? "text-blue-900" : "text-gray-400"}>
                {division || "Choose your division"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            disabled={!name || !division}
            onPress={handleLogin}
            className={`rounded-lg py-3 items-center ${
              name && division ? "bg-blue-600" : "bg-gray-300" 
            }`}
          >
            <Text className="text-white font-semibold">Login to Dashboard</Text>
          </TouchableOpacity>
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
      </ScrollView>
    </View>
  );
}
