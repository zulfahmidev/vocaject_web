/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#20889C',
        secondary: '#176878',
        light: '#ECFAFD'
      }
    },
    fontFamily: {
      'poppins': ['Poppins']
    }
  },
  plugins: [],
}