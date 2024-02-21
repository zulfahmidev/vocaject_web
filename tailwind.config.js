/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#20889C',
        primary: '#79C7C6',
        light: '#E7FBFF'
      }
    },
    fontFamily: {
      'poppins': ['Poppins']
    }
  },
  plugins: [],
}