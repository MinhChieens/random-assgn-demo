/** @type {import('tailwindcss').Config} */

export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            darkblue: "#1F2B6C",
            skyblue: "#159EEC",
            lightblue: "#BFD2F8",
            white: "#FFFFFF",
            black: "#000000",
         },
         fontFamily: {
            worksans: ["Work Sans", "sans-serif"],
         },
      },
   },
   plugins: [],
};
