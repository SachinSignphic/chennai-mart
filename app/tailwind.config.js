/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2F2E41",
                secondary: "#999999",
                teal: "#F2F5FD",
                badge: "#383749",
                "tint-black": "#100F18",
            },
            fontFamily: {
                primary: ["Arial", "sans-serif"],
                secondary: ["Times New Roman", "serif"],
                'nunito-800': ["Nunito ExtraBold", "sans-serif"],
                'nunito-400': ["Nunito", "sans-serif"],
                'nunito-900': ["Nunito Black", "sans-serif"],
            },
        },
        screens: {
            modern: "400px",
        },
    },
    plugins: [],
};

