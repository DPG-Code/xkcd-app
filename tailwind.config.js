/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minWidth: {
      '72': '18rem',
      '128': '32rem'
    },
    screens: {
      'xs': '450px',
    },
    extend: {},
  },
  plugins: [],
}