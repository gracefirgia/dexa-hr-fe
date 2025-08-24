/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#b02622",
          light: "#c94b46", // lighter tint
          dark: "#7e1b18",  // darker shade
        },
        secondary: {
          DEFAULT: "#f08b02",
          light: "#f5a533",
          dark: "#b86500",
        },
        neutral: {
          light: "#f9f9f9",
          dark: "#1c1c1c",
          text: {
            primary: "#222222",
            secondary: "#666666",
          },
          border: "#e0e0e0",
        },
        support: {
          success: "#2e7d32",
          warning: "#fbc02d",
          info: "#1976d2",
          error: "#d32f2f",
        },
      },
    },
  },
  plugins: [],
}
