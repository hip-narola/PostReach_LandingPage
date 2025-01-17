/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
   "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
       'textdark' :'#292929',
        'textdark-100' :'#0D0D25',
        'textlight' :'#7C7C7C',
        'themeblue': '#004BDE',
        // 'second': '#47019d',
        // 'three': '#e00256',
        // 'black': '#212121',
        // 'white': '#ffffff',
        // 'gray': '#808080e2'
      },
      fontFamily: {
       "Figtree": ['Figtree', 'sans-serif']
      },
    },
  },
  plugins: [nextui()],
}

