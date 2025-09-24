// app/member-register/hierarchy.tsx
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChurchHierarchy() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Step 1 data

  const [hierarchy, setHierarchy] = useState({
    zone: "",
    region: "",
    division: "",
    group: "",
    district: "",
    location: "",
  });

  const handleNext = () => {
    if (
      !hierarchy.zone ||
      !hierarchy.region ||
      !hierarchy.division ||
      !hierarchy.group ||
      !hierarchy.district ||
      !hierarchy.location
    ) {
      alert("Please complete all fields");
      return;
    }

    // Pass Step 1 + Step 2 data to Step 3
    router.push({
      pathname: "/member-register/membership",
      params: { ...params, ...hierarchy },
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
          Member Registration - Step 2
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Zone */}
        <Text className="text-blue-900 font-medium mb-1">Zone *</Text>
        <View className="border border-blue-200 rounded-lg mb-3 bg-gray-50">
          <Picker
            selectedValue={hierarchy.zone}
            onValueChange={(v: string) => setHierarchy({ ...hierarchy, zone: v })}
              style={{ color: "#1e3a8a" }} // 🔹 force visible text
                itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling



          >
            <Picker.Item label="Select Zone" value="" />
            <Picker.Item label="Zone A" value="zone-a" />
            <Picker.Item label="Zone B" value="zone-b" />
            <Picker.Item label="Zone C" value="zone-c" />
          </Picker>
        </View>

        {/* Region */}
        <Text className="text-blue-900 font-medium mb-1">Region *</Text>
        <View className="border border-blue-200 rounded-lg mb-3 bg-gray-50">
          <Picker
            selectedValue={hierarchy.region}
            onValueChange={(v: string) => setHierarchy({ ...hierarchy, region: v })}
              style={{ color: "#1e3a8a" }} // 🔹 force visible text 
                 itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling


          >
            <Picker.Item label="Select Region" value="" />
            <Picker.Item label="Region 1" value="region-1" />
            <Picker.Item label="Region 2" value="region-2" />
            <Picker.Item label="Region 3" value="region-3" />
          </Picker>
        </View>

        {/* Division */}
        <Text className="text-blue-900 font-medium mb-1">Division *</Text>
        <View className="border border-blue-200 rounded-lg mb-3 bg-gray-50">
          <Picker
            selectedValue={hierarchy.division}
            onValueChange={(v: string) => setHierarchy({ ...hierarchy, division: v })}
              style={{ color: "#1e3a8a" }} // 🔹 force visible text  
               itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling


          >
            <Picker.Item label="Select Division" value="" />
            <Picker.Item label="Division Alpha" value="division-alpha" />
            <Picker.Item label="Division Beta" value="division-beta" />
            <Picker.Item label="Division Gamma" value="division-gamma" />
          </Picker>
        </View>

        {/* Group */}
        <Text className="text-blue-900 font-medium mb-1">Group *</Text>
        <View className="border border-blue-200 rounded-lg mb-3 bg-gray-50">
          <Picker
            selectedValue={hierarchy.group}
            onValueChange={(v: string) => setHierarchy({ ...hierarchy, group: v })}
              style={{ color: "#1e3a8a" }} // 🔹 force visible text
                itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling


          >
            <Picker.Item label="Select Group" value="" />
            <Picker.Item label="Group 1" value="group-1" />
            <Picker.Item label="Group 2" value="group-2" />
          </Picker>
        </View>

        {/* District */}
        <Text className="text-blue-900 font-medium mb-1">District *</Text>
        <View className="border border-blue-200 rounded-lg mb-3 bg-gray-50">
          <Picker
            selectedValue={hierarchy.district}
            onValueChange={(v: string) => setHierarchy({ ...hierarchy, district: v })}
              style={{ color: "#1e3a8a" }} // 🔹 force visible text
                itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling


          >
            <Picker.Item label="Select District" value="" />
            <Picker.Item label="District A" value="district-a" />
            <Picker.Item label="District B" value="district-b" />
          </Picker>
        </View>

        {/* Location */}
        <Text className="text-blue-900 font-medium mb-1">Location *</Text>
        <View className="border border-blue-200 rounded-lg mb-6 bg-gray-50">
          <Picker
            selectedValue={hierarchy.location}
            onValueChange={(v: string) => setHierarchy({ ...hierarchy, location: v })}
              style={{ color: "#1e3a8a" }} // 🔹 force visible text
                itemStyle={{ color: "#1e3a8a", fontSize: 16 }} // iOS styling


          >
            <Picker.Item label="Select Location" value="" />
            <Picker.Item label="Location X" value="location-x" />
            <Picker.Item label="Location Y" value="location-y" />
          </Picker>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-blue-600 rounded-lg py-3 items-center"
        >
          <Text className="text-white font-semibold">
            Next: Membership Details
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
