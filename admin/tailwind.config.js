/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: '#F5F6F8',
        tertiary: "#6B6B6B",
        blk: '#2E2E2E',
        'teal': '#0D9DA8'
      },
      fontFamily: {
        'poppins-300': ["'Poppins 300'", "sans-serif"],
        'poppins-400': ["'Poppins 400'", "sans-serif"],
        'poppins-500': ["'Poppins 500'", "sans-serif"],
        'poppins-600': ["'Poppins 600'", "sans-serif"],
        'poppins-700': ["'Poppins 700'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

