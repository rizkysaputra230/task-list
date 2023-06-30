/** @type {import('tailwindcss').Config} */
const colors = require("./src/Plugins/Tailwind/Colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [],
};
