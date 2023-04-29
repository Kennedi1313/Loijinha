/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'black-1000': '#121212'
      },
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Unlock'],
        'unlock': ['Unlock', 'Roboto']
      }
    },
  },
  variants: {
    display:['group-hover']
  },
  plugins: [],
}
