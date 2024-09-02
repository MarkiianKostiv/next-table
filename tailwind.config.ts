import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: {
          app_Background: "#ffffff",
          border: "#a8a8a8",
          font_Main: "#060606",
        },
        dark: {
          app_Background: "#1d1e42",
          border: "#f3f3f5",
          font_Main: "#fdfdfe",
        },
      },
    },
  },
  plugins: [],
};
export default config;
