/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "rs-gray-dark": "#15151D",
        "rs-green": "#296144",
        "rs-red-bull": "#161F2E",
        "rs-ferrari-bg": "#D61A1F",
      },
    },
  },
  plugins: [],
};
