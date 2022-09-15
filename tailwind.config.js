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
      'xs': '550px',
    },
    extend: {
      colors: {
        'primary': '#0072F5',
      }
    },
  },
  plugins: [],
}