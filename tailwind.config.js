/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

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
            sans: ["var(--font-sora)", ...fontFamily.sans],
            code: "var(--font-code)",
            grotesk: "var(--font-grotesk)",
            worksans: ['"Work Sans"', "sans-serif"],
         },
      },
   },
   plugins: [],
};
