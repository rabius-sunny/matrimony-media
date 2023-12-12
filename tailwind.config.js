const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      primary: '#E3056C',
      secondary: '#00C0A3',
      danger: colors.red[500],
      black: colors.black,
      dark: '#d50063',
      slate: colors.slate,
      white: '#ffffff',
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
      indigo: colors.indigo,
      yellow: colors.yellow
    },
    extend: {}
  },
  plugins: [],
  darkMode: 'class'
}
