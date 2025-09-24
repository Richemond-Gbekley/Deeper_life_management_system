// app/member-register/membership.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function MembershipDetails() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Step 1 + Step 2 data

  const [details, setDetails] = useState({
    category: "",
    instrument: "",
    experience: "",
    active_member: "",
  });

  const handleSubmit = async () => {
    if (!details.category || !details.active_member) {
      alert("Please complete all required fields");
      return;
    }

    const payload = { ...params, ...details };

    try {
      const res = await fetch("http://YOUR_BACKEND_IP/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to register");
      await res.json();

      alert("✅ Registration submitted! Waiting for admin approval.");
      router.push("/"); // back to login
    } catch (err: any) {
      console.error(err);
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white ml-2 text-lg font-semibold">
          Member Registration - Step 3
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* Active Member */}
        <Text className="text-blue-900 font-medium mb-2">Active Member? *</Text>
        <View className="border border-blue-200 rounded-lg mb-8 bg-gray-50">
          <Picker
            selectedValue={details.active_member}
            onValueChange={(v: string) =>
              setDetails({ ...details, active_member: v })
            }
            style={{ color: "#1e3a8a" }}
               itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling

          >
            <Picker.Item label="Select Option" value="" color="#6b7280" />
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>
        </View>

        {/* Category */}
        <Text className="text-blue-900 font-medium mb-2">Category *</Text>
        <View className="border border-blue-200 rounded-lg mb-6 bg-gray-50">
          <Picker
            selectedValue={details.category}
            onValueChange={(v: string) => setDetails({ ...details, category: v })}
            style={{ color: "#1e3a8a" }}
                itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling

          >
            <Picker.Item label="Select Category" value="" color="#6b7280" />
            <Picker.Item label="Children" value="children" />
            <Picker.Item label="Youth" value="youth" />
            <Picker.Item label="Campus" value="campus" />
            <Picker.Item label="Adult" value="adult" />
          </Picker>
        </View>

        {/* Instrument */}
        <Text className="text-blue-900 font-medium mb-2">Instrument</Text>
        <TextInput
          placeholder="E.g., Guitar, Drums, None"
          value={details.instrument}
          onChangeText={(t) => setDetails({ ...details, instrument: t })}
          className="border border-blue-200 rounded-lg px-4 py-3 mb-6"
        />

        {/* Years of Experience */}
        <Text className="text-blue-900 font-medium mb-2">
          Years of Experience
        </Text>
        <TextInput
          placeholder="Enter number of years"
          keyboardType="numeric"
          value={details.experience}
          onChangeText={(t) => setDetails({ ...details, experience: t })}
          className="border border-blue-200 rounded-lg px-4 py-3 mb-6"
        />

        
        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-600 rounded-lg py-3 items-center"
        >
          <Text className="text-white font-semibold text-base">
            Submit Registration
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
