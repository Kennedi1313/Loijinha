/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'black-1000': '#121212',
        'rose-1000': '#F4EBE7',
        'brown-1000': '#B48F57',
        'green-whatsapp': '#3cc13f'
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
