/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:"#5A5959",
        yellow:"#FFEAAE",
        red:"#D01C28",
        purple:"#5F00D9",
        "dark-yellow":"#FCCA3F",
        orange:"#F6820C",
      }
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}