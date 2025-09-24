// roles.config.ts
import { 
  UserPlus, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell, 
  Users 
} from "lucide-react";

export const ROLE_CONFIG = {
  "super-admin": {
    title: "Super Admin",
    stats: [
      { label: "Total Members", key: "members" },
      { label: "Locations", key: "locations" },
      { label: "Average Attendance", key: "attendance" }
    ],
    actions: [
      { icon: Users, label: "Manage Admins", color: "bg-blue-500" },
      { icon: BarChart3, label: "View All Reports", color: "bg-green-500" },
      { icon: Settings, label: "System Settings", color: "bg-gray-500" },
    ]
  },

  "zone-admin": {
    title: "Zone Admin",
    stats: [
      { label: "Regions in Zone", key: "regions" },
      { label: "Total Members", key: "members" },
      { label: "Zone Attendance", key: "attendance" }
    ],
    actions: [
      { icon: Users, label: "Manage Regions", color: "bg-blue-500" },
      { icon: BarChart3, label: "Zone Reports", color: "bg-green-500" },
      { icon: Bell, label: "Notifications", color: "bg-yellow-500" },
    ]
  },

  "region-admin": {
    title: "Region Admin",
    stats: [
      { label: "Divisions in Region", key: "divisions" },
      { label: "Total Members", key: "members" },
      { label: "Region Attendance", key: "attendance" }
    ],
    actions: [
      { icon: Users, label: "Manage Divisions", color: "bg-blue-500" },
      { icon: BarChart3, label: "Region Reports", color: "bg-green-500" },
      { icon: Calendar, label: "Regional Events", color: "bg-purple-500" },
    ]
  },

  "division-admin": {
    title: "Division Admin",
    stats: [
      { label: "Groups in Division", key: "groups" },
      { label: "Total Members", key: "members" },
      { label: "Division Attendance", key: "attendance" }
    ],
    actions: [
      { icon: Users, label: "Manage Groups", color: "bg-blue-500" },
      { icon: CheckSquare, label: "Track Attendance", color: "bg-green-500" },
      { icon: Calendar, label: "Division Meetings", color: "bg-purple-500" },
    ]
  },

  "group-admin": {
    title: "Group Admin",
    stats: [
      { label: "Districts in Group", key: "districts" },
      { label: "Total Members", key: "members" },
      { label: "Group Attendance", key: "attendance" }
    ],
    actions: [
      { icon: Users, label: "Manage Districts", color: "bg-blue-500" },
      { icon: BarChart3, label: "Group Reports", color: "bg-green-500" },
      { icon: Bell, label: "Notifications", color: "bg-yellow-500" },
    ]
  },

  "district-admin": {
    title: "District Admin",
    stats: [
      { label: "Locations in District", key: "locations" },
      { label: "Total Members", key: "members" },
      { label: "District Attendance", key: "attendance" }
    ],
    actions: [
      { icon: Users, label: "Manage Locations", color: "bg-blue-500" },
      { icon: Calendar, label: "District Meetings", color: "bg-purple-500" },
      { icon: BarChart3, label: "District Reports", color: "bg-green-500" },
    ]
  },

  "location-admin": {
    title: "Location Admin",
    stats: [
      { label: "Total Members", key: "members" },
      { label: "This Week Attendance", key: "attendance" },
      { label: "Upcoming Meetings", key: "meetings" }
    ],
    actions: [
      { icon: UserPlus, label: "Add Members", color: "bg-blue-500" },
      { icon: CheckSquare, label: "Mark Attendance", color: "bg-green-500" },
      { icon: Calendar, label: "Create Meeting", color: "bg-purple-500" },
      { icon: BarChart3, label: "View Reports", color: "bg-green-500" },
      { icon: Bell, label: "Notifications", color: "bg-yellow-500" },
      { icon: Settings, label: "Settings", color: "bg-gray-500" }
    ]
  }
};
