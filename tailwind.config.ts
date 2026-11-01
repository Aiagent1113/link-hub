import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#050507",
          900: "#09090D",
          800: "#111118",
        },
        neon: {
          cyan: "#00F0FF",
          violet: "#7000FF",
          emerald: "#10B981",
          telegram: "#229ED9",
          instagram: "#E1306C",
          linkedin: "#0A66C2",
          youtube: "#FF0000",
        },
      },
      animation: {
        "aura-rotate": "aura-rotate 12s linear infinite",
      },
      keyframes: {
        "aura-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        "glass-sm": "inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 4px 20px -2px rgba(0, 0, 0, 0.6)",
        "glass-lg": "inset 0 1px 0 0 rgba(255, 255, 255, 0.16), 0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        "cyan-glow": "0 0 35px -5px rgba(0, 240, 255, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
