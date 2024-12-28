/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-out-down": "fade-out-down 0.5s ease-in",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-down": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(20px)" },
        },
      },
    },
    container: {
      padding:{
        md: "10rem",
      }
    },
  },
  plugins: [],
};