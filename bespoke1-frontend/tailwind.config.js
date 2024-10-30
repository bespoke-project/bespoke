// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signature: ['"Great Vibes"', "cursive"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark", "garden"],
    darkTheme: "dim",
  },
};
