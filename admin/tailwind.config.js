/** @type {import('tailwindcss').Config} */
const { blackA, mauve, violet } = require('@radix-ui/colors');

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
        'teal': '#0D9DA8',
        ...blackA,
        ...mauve,
        ...violet,
      },
      fontFamily: {
        'poppins-300': ["'Poppins 300'", "sans-serif"],
        'poppins-400': ["'Poppins 400'", "sans-serif"],
        'poppins-500': ["'Poppins 500'", "sans-serif"],
        'poppins-600': ["'Poppins 600'", "sans-serif"],
        'poppins-700': ["'Poppins 700'", "sans-serif"],
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

