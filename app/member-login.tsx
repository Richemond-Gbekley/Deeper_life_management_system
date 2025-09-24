import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  Modal,
} from "react-native";

export default function MemberLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch locations from backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://172.20.10.5:5000/api/users/locations");
        const data = await res.json();
        if (data.locations) setLocations(data.locations);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        Alert.alert("Error", "Could not load locations. Check backend connection.");
      }
    };
    fetchLocations();
  }, []);

  const handleLogin = async () => {
    if (!name || !location || !password) return;

    try {
      const res = await fetch("http://192.168.1.100:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.message || "Unknown error");
        return;
      }

      console.log("Login successful:", data);
      router.push("./member-dashboard");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not login. Check backend connection.");
    }
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

          {/* Location */}
          <View className="mb-4">
            <Text className="text-blue-900 font-medium mb-2">Select Location</Text>
            <TouchableOpacity
              className="border border-blue-200 rounded-lg px-4 py-3 bg-white"
              onPress={() => setModalVisible(true)}
            >
              <Text className={location ? "text-blue-900" : "text-gray-400"}>
                {location || "Choose your location"}
              </Text>
            </TouchableOpacity>
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
            disabled={!name || !location || !password}
            onPress={handleLogin}
            className={`rounded-lg py-3 items-center ${
              name && location && password ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <Text className="text-white font-semibold">Login to Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => router.push("/forgot-password")} className="mt-3">
          <Text className="text-blue-600 text-sm text-center">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Member Register Card */}
        <View className="w-full bg-white border border-blue-200 rounded-xl mb-4 p-4 shadow-sm mt-4">
          <View className="flex-row items-center mb-3">
            <Ionicons name="person-add-outline" size={20} color="#1e3a8a" />
            <Text className="ml-2 text-blue-900 font-medium">New Member</Text>
          </View>
          <TouchableOpacity
            className="w-full bg-green-600 rounded-lg py-3 items-center"
            onPress={() => router.push("./member-register")}
          >
            <Text className="text-white font-semibold">Register as Member</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for selecting location */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center bg-black/50">
          <View className="bg-white mx-4 p-4 rounded-lg">
            <FlatList
              data={locations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setLocation(item);
                    setModalVisible(false);
                  }}
                  className="py-2 px-2 border-b border-gray-200"
                >
                  <Text className="text-blue-900">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
