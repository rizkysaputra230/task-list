/** @type {import('tailwindcss').Config} */
const colors = require('./src/Plugins/Tailwind/Colors');

module.exports = {
  content: [
    './src/Pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [],
};
