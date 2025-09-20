/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#252525", // from oklch(0.145 0 0)
        primary: "#030213",
        secondary: "#f2f2f9", // converted from oklch
        muted: "#ececf0",
        accent: "#e9ebef",
        destructive: "#d4183d",
        border: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}