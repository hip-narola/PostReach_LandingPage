import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        "Roboto": ['Roboto', 'sans-serif']
      }
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
    },
  },
  plugins: [],
};
export default config;
