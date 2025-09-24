import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MemberDashboardProps {
  memberName: string;
  division: string;
  onBack: () => void;
}

const upcomingMeetings = [
  {
    title: "Sunday Service",
    date: "Dec 17, 2023",
    time: "8:00 AM",
    location: "Main Auditorium",
    status: "confirmed",
  },
  {
    title: "Wednesday Bible Study",
    date: "Dec 20, 2023",
    time: "6:30 PM",
    location: "Fellowship Hall",
    status: "pending",
  },
  {
    title: "Youth Meeting",
    date: "Dec 22, 2023",
    time: "4:00 PM",
    location: "Youth Center",
    status: "confirmed",
  },
];

const attendanceHistory = [
  { date: "Dec 10", meeting: "Sunday Service", status: "present" },
  { date: "Dec 13", meeting: "Bible Study", status: "present" },
  { date: "Dec 6", meeting: "Prayer Meeting", status: "absent" },
  { date: "Dec 3", meeting: "Sunday Service", status: "present" },
];

const notifications = [
  { message: "Reminder: Sunday Service tomorrow at 8:00 AM", time: "1h ago", urgent: true },
  { message: "New Bible Study material available", time: "2d ago", urgent: false },
  { message: "Youth program registration open", time: "3d ago", urgent: false },
];
export default function MemberDashboard({ memberName, division, onBack }: MemberDashboardProps) {
  const router = useRouter();
  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="p-2">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="ml-3 flex-1">
          <Text className="text-white font-semibold">Deeper Life Bible Church</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="person-outline" size={14} color="#bfdbfe" />
            <Text className="text-blue-100 text-sm ml-1">{memberName}</Text>
            <View className="ml-2 px-2 py-1 rounded-full bg-blue-500">
              <Text className="text-white text-xs">{division}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="notifications-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Attendance Status */}
        <View className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 mb-6">
          <Text className="text-blue-900 font-semibold mb-3">Attendance Status</Text>
          <View className="flex-row justify-between text-center">
            <View>
              <Text className="text-2xl text-blue-900">87%</Text>
              <Text className="text-sm text-gray-600">This Month</Text>
            </View>
            <View>
              <Text className="text-2xl text-green-600">4</Text>
              <Text className="text-sm text-gray-600">Present</Text>
            </View>
            <View>
              <Text className="text-2xl text-red-500">1</Text>
              <Text className="text-sm text-gray-600">Absent</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Meetings */}
        <Text className="text-blue-900 font-semibold mb-2">Upcoming Meetings</Text>
        {upcomingMeetings.map((meeting, index) => (
          <View key={index} className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 mb-3">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-blue-900 font-semibold mb-1">{meeting.title}</Text>
                <View className="flex-row gap-4">
                  <Text className="text-sm text-gray-600">{meeting.date}</Text>
                  <Text className="text-sm text-gray-600">{meeting.time}</Text>
                </View>
                <Text className="text-sm text-gray-600 mt-1">{meeting.location}</Text>
              </View>
              <View
                className={`px-2 py-1 rounded-full ${
                  meeting.status === "confirmed" ? "bg-green-100" : "bg-yellow-100"
                }`}
              >
                <Text
                  className={`text-xs ${
                    meeting.status === "confirmed" ? "text-green-700" : "text-yellow-700"
                  }`}
                >
                  {meeting.status}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Recent Attendance */}
        <View className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 mb-6">
          <Text className="text-blue-900 font-semibold mb-3">Recent Attendance</Text>
          {attendanceHistory.map((record, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center p-2 bg-blue-50 rounded mb-2"
            >
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name={record.status === "present" ? "checkmark-circle" : "close-circle"}
                  size={20}
                  color={record.status === "present" ? "green" : "red"}
                />
                <View>
                  <Text className="text-sm text-gray-700">{record.meeting}</Text>
                  <Text className="text-xs text-gray-500">{record.date}</Text>
                </View>
              </View>
              <View
                className={`px-2 py-1 rounded-full ${
                  record.status === "present" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={`text-xs ${
                    record.status === "present" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {record.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Notifications */}
        <View className="bg-white border border-blue-200 rounded-xl shadow-sm p-4">
          <Text className="text-blue-900 font-semibold mb-3">Notifications</Text>
          {notifications.map((note, index) => (
            <View
              key={index}
              className={`p-3 rounded mb-2 ${
                note.urgent ? "bg-red-50 border-l-4 border-red-400" : "bg-blue-50"
              }`}
            >
              <Text className="text-sm text-gray-700">{note.message}</Text>
              <Text className="text-xs text-gray-500 mt-1">{note.time}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
<View className="mt-6">
  {/* View My Profile */}
  <TouchableOpacity
    className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 mb-3 flex-row items-center"
    onPress={() => router.push("./member-dashboard/my-profile")}
  >
    <Ionicons name="person-circle-outline" size={24} color="#1e3a8a" />
    <Text className="ml-3 text-blue-900 font-medium">View / Update My Profile</Text>
  </TouchableOpacity>

  {/* View Other Members */}
  <TouchableOpacity
    className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 mb-3 flex-row items-center"
    onPress={() => router.push("./member-dashboard/view-members")}
  >
    <Ionicons name="people-outline" size={24} color="#1e3a8a" />
    <Text className="ml-3 text-blue-900 font-medium">View Other Members</Text>
  </TouchableOpacity>

  {/* Settings */}
  <TouchableOpacity
    className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 flex-row items-center"
    onPress={() => router.push("./member-dashboard/settings")}
  >
    <Ionicons name="settings-outline" size={24} color="#1e3a8a" />
    <Text className="ml-3 text-blue-900 font-medium">Settings</Text>
  </TouchableOpacity>
</View>

      </ScrollView>
    </View>
  );
}
