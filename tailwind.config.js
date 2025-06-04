/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Unbounded", "sans-serif"],
      },
      colors: {
        "delta-container-bg": "#09090B",
        "delta-active": "#15151D",
        "delta-accent": "#703DB6",
      },
    },
  },
  plugins: [import("tailwind-scrollbar-hide")],
};
