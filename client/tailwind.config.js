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
                "badge-critical": "#8e1f0b",
                "badge-regular": "#00000099",
                "badge-warning": "#ffd6a4",
                "badge-success": "#b4fed2",
                regular: "white",
                warning: "#5e4200",
                critical: "#fed3d1",
                success: "#0c5132",
            },
            fontFamily: {
                primary: ["Arial", "sans-serif"],
                secondary: ["Times New Roman", "serif"],
                "nunito-800": ["Nunito ExtraBold", "sans-serif"],
                "nunito-400": ["Nunito", "sans-serif"],
                // 'nunito-900': ["Nunito Black", "sans-serif"],
            },
        },
        screens: {
            modern: "400px",
        },
    },
    plugins: [],
};

