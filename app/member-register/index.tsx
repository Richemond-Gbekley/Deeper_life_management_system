// app/member-register/index.tsx
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function PersonalInfo() {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    surname: "",
    date_of_birth: "",
    gender: "",
    contact: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleNext = () => {
    if (
      !formData.first_name ||
      !formData.surname ||
      !formData.date_of_birth ||
      !formData.gender ||
      !formData.contact ||
      !formData.password ||
      !formData.confirm_password
    ) {
      alert("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    router.push({
      pathname: "/member-register/hierarchy",
      params: formData,
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white ml-2 text-lg font-semibold">
          Member Registration - Step 1
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* First Name */}
        <Text className="text-blue-900 font-medium mb-1">First Name *</Text>
        <TextInput
          placeholder="Enter your first name"
          value={formData.first_name}
          onChangeText={(t) => setFormData({ ...formData, first_name: t })}
          className="border border-blue-200 rounded-lg px-4 py-3 mb-3 bg-gray-50"
        />

        {/* Surname */}
        <Text className="text-blue-900 font-medium mb-1">Surname *</Text>
        <TextInput
          placeholder="Enter your surname"
          value={formData.surname}
          onChangeText={(t) => setFormData({ ...formData, surname: t })}
          className="border border-blue-200 rounded-lg px-4 py-3 mb-3 bg-gray-50"
        />

        {/* Date of Birth */}
<Text className="text-blue-900 font-medium mb-1">Date of Birth *</Text>
<TouchableOpacity
  onPress={() => setShowDatePicker(true)}
  className="border border-blue-200 rounded-lg px-4 py-3 mb-3 bg-gray-50 flex-row justify-between items-center"
>
  <Text
    className={
      formData.date_of_birth ? "text-blue-900" : "text-gray-400"
    }
  >
    {formData.date_of_birth || "Select Date of Birth"}
  </Text>
  <Ionicons name="calendar-outline" size={20} color="#2563eb" />
</TouchableOpacity>

{showDatePicker && Platform.OS === "android" && (
  <DateTimePicker
    value={
      formData.date_of_birth
        ? new Date(formData.date_of_birth)
        : new Date()
    }
    mode="date"
    display="calendar"  // ✅ Force calendar modal on Android
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        const isoDate = selectedDate.toISOString().split("T")[0];
        setFormData({ ...formData, date_of_birth: isoDate });
      }
    }}
  />
)}

{/* iOS Inline Picker */}
{showDatePicker && Platform.OS === "ios" && (
  <View className="bg-gray-100 rounded-lg p-2 mb-3">
    <DateTimePicker
      value={
        formData.date_of_birth
          ? new Date(formData.date_of_birth)
          : new Date()
      }
      mode="date"
      display="spinner"
      onChange={(event, selectedDate) => {
        if (selectedDate) {
          const isoDate = selectedDate.toISOString().split("T")[0];
          setFormData({ ...formData, date_of_birth: isoDate });
        }
      }}
    />
    <TouchableOpacity
      onPress={() => setShowDatePicker(false)}
      className="bg-blue-600 rounded-lg py-2 mt-2 items-center"
    >
      <Text className="text-white font-medium">Done</Text>
    </TouchableOpacity>
  </View>
)}

        {/* Gender */}
        <Text className="text-blue-900 font-medium mb-1">Gender *</Text>
        <View className="flex-row space-x-3 mb-3">
          {["Male", "Female", "Other"].map((g) => (
            <TouchableOpacity
              key={g}
              onPress={() =>
                setFormData({ ...formData, gender: g.toLowerCase() })
              }
              className={`flex-1 border rounded-lg py-3 items-center ${
                formData.gender === g.toLowerCase()
                  ? "bg-blue-600 border-blue-600"
                  : "bg-gray-50 border-blue-200"
              }`}
            >
              <Text
                className={`${
                  formData.gender === g.toLowerCase()
                    ? "text-white"
                    : "text-blue-900"
                } font-medium`}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact */}
        <Text className="text-blue-900 font-medium mb-1">Contact *</Text>
        <TextInput
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={formData.contact}
          onChangeText={(t) => setFormData({ ...formData, contact: t })}
          className="border border-blue-200 rounded-lg px-4 py-3 mb-3 bg-gray-50"
        />

        {/* Email (Optional) */}
        <Text className="text-blue-900 font-medium mb-1">Email</Text>
        <TextInput
          placeholder="Enter your email (optional)"
          value={formData.email}
          onChangeText={(t) => setFormData({ ...formData, email: t })}
          keyboardType="email-address"
          className="border border-blue-200 rounded-lg px-4 py-3 mb-3 bg-gray-50"
        />

        {/* Password */}
        <Text className="text-blue-900 font-medium mb-1">Password *</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          value={formData.password}
          onChangeText={(t) => setFormData({ ...formData, password: t })}
          className="border border-blue-200 rounded-lg px-4 py-3 mb-3 bg-gray-50"
        />

        {/* Confirm Password */}
        <Text className="text-blue-900 font-medium mb-1">
          Confirm Password *
        </Text>
        <TextInput
          placeholder="Re-enter your password"
          secureTextEntry
          value={formData.confirm_password}
          onChangeText={(t) =>
            setFormData({ ...formData, confirm_password: t })
          }
          className="border border-blue-200 rounded-lg px-4 py-3 mb-6 bg-gray-50"
        />

        {/* Next Button */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-blue-600 rounded-lg py-3 items-center"
        >
          <Text className="text-white font-semibold">
            Next: Church Hierarchy
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
