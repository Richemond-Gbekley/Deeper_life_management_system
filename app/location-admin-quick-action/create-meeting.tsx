// app/location-admin-quick-action/create-meeting.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreateMeeting() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("pending");
  const [link, setLink] = useState("");

  const handleCreateMeeting = () => {
    if (!title || !date || !time || !location) return;

    const newMeeting = {
      title,
      date,
      time,
      location,
      status,
      link: link || null,
    };

    console.log("✅ Meeting Created:", newMeeting);

    // 🚀 Later: Save meeting to backend & make it available in member dashboard
    router.back();
  };

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white ml-2 text-lg font-semibold">
          Create Meeting
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Title */}
        <Text className="text-blue-900 font-medium mb-2">Meeting Title</Text>
        <TextInput
          placeholder="Enter meeting title"
          value={title}
          onChangeText={setTitle}
          className="border border-blue-200 rounded-lg px-4 py-3 bg-white mb-4"
        />

        {/* Date */}
        <Text className="text-blue-900 font-medium mb-2">Date</Text>
        <TextInput
          placeholder="e.g. Dec 17, 2023"
          value={date}
          onChangeText={setDate}
          className="border border-blue-200 rounded-lg px-4 py-3 bg-white mb-4"
        />

        {/* Time */}
        <Text className="text-blue-900 font-medium mb-2">Time</Text>
        <TextInput
          placeholder="e.g. 8:00 AM"
          value={time}
          onChangeText={setTime}
          className="border border-blue-200 rounded-lg px-4 py-3 bg-white mb-4"
        />

        {/* Location */}
        <Text className="text-blue-900 font-medium mb-2">Location</Text>
        <TextInput
          placeholder="Enter meeting location"
          value={location}
          onChangeText={setLocation}
          className="border border-blue-200 rounded-lg px-4 py-3 bg-white mb-4"
        />

        {/* Status */}
        <Text className="text-blue-900 font-medium mb-2">Status</Text>
        <View className="flex-row gap-4 mb-4">
          <TouchableOpacity
            className={`px-4 py-2 rounded-lg ${
              status === "confirmed" ? "bg-green-600" : "bg-gray-200"
            }`}
            onPress={() => setStatus("confirmed")}
          >
            <Text
              className={`${
                status === "confirmed" ? "text-white" : "text-gray-800"
              }`}
            >
              Confirmed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-lg ${
              status === "pending" ? "bg-yellow-500" : "bg-gray-200"
            }`}
            onPress={() => setStatus("pending")}
          >
            <Text
              className={`${
                status === "pending" ? "text-white" : "text-gray-800"
              }`}
            >
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        {/* Link (Optional) */}
        <Text className="text-blue-900 font-medium mb-2">Meeting Link</Text>
        <TextInput
          placeholder="Paste Zoom/Google Meet link (optional)"
          value={link}
          onChangeText={setLink}
          className="border border-blue-200 rounded-lg px-4 py-3 bg-white mb-6"
        />

        {/* Create Meeting Button */}
        <TouchableOpacity
          onPress={handleCreateMeeting}
          disabled={!title || !date || !time || !location}
          className={`rounded-lg py-3 items-center ${
            title && date && time && location ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-semibold">Create Meeting</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
