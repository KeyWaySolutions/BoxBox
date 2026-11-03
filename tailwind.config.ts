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
        brand: {
          dark: "#0F172A",
          primaryDark: "#1D4ED8",
          primary: "#2563EB",
          accent: "#3B82F6",
          lightAccent: "#60A5FA",
          tint: "#EFF6FF",
          bg: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
