import type { Config } from "tailwindcss";

const primary = "#151515";
const primaryDark = "#000";
const secondary = "#FFDF64";
const textPrimary = "#CCC";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: primary,
        primaryDark: primaryDark,
        secondary: secondary,
        textPrimary: textPrimary,
      },
      borderColor: {
        primaryDark: primaryDark,
      },
      maxHeight: {
        "80vh": "80vh",
      },
      textColor: {
        primary: primary,
      },
      ringColor: {
        secondary: secondary,
      },
      maxWidth: {
        "1/3": "33.333333%",
        "1/4": "25%",
        "1/5": "20%",
      },
      plugins: [],
    },
    darkmode: "class",
  },
};

export default config;
