/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      txthead: ["Inspiration", "cursive"],
      flower: ["Indie Flower", "cursive"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}