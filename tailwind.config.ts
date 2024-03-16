import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#151515",
        primaryDark: "#000",
        secondary: "#FFDF64",
        textPrimary: "#CCC",
      },
      maxHeight: {
        "80vh": "80vh",
      },
      plugins: [],
    },
    darkmode: "class",
  },
};

export default config;
