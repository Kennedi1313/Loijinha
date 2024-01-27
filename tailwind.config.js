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
        'dream-avenue': ['DreamAvenue'],
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Unlock'],
        'unlock': ['Unlock', 'Roboto']
      },
      backgroundImage: {
        'medalhas': "url('https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/60/f6b9b5ba-032a-4c66-97cb-2667cbdecefa.jpg')"
      }
    },
    
  },
  variants: {
    display:['group-hover']
  },
  plugins: [],
}
