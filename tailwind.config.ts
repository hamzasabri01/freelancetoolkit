import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0D0E14", soft: "#3B3D4A", muted: "#6B7280" },
        brand: { DEFAULT: "#2563EB", dark: "#1D4ED8", soft: "#EFF4FF" },
        surface: { DEFAULT: "#FFFFFF", soft: "#F7F8FA", muted: "#F0F1F5" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.07), 0 4px 12px rgba(0,0,0,.05)",
        lift: "0 10px 30px rgba(37,99,235,.10), 0 2px 8px rgba(0,0,0,.06)",
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(rgba(37,99,235,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.055) 1px,transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
