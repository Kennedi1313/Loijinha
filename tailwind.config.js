/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'black-1000': '#121212'
      }
    },
  },
  variants: {
    display:['group-hover']
  },
  plugins: [],
}
