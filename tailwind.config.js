/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Unbounded", "sans-serif"],
      },
      colors: {
        "delta-container-bg": "hsl(240 10% 4%)",
        "delta-active": "hsl(240 10% 10%)",
        "delta-active-light": "hsl(240 10%, 15%);",
        "delta-accent": "hsl(265 50% 48%)",
        "delta-accent-dark": "hsl(265 50% 30%)",
      },
    },
  },
  plugins: [import("tailwind-scrollbar-hide")],
};
