import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        card: "var(--card)",
        border: "var(--border)",
        primary: "var(--primary)",
      },
    },
  },
plugins: [
  require("@tailwindcss/typography"),
],};

export default config;