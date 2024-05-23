/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#79C7C6',
        // primary: '#20889C',
        secondary: '#176878',
        light: '#E7FBFF'
      }
    },
    fontFamily: {
      'poppins': ['Poppins']
    }
  },
  plugins: [],
}

