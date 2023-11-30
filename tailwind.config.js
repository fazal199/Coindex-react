/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'laptop': {'max': '1104px'},

      'tablet': {'max': '992px'},
      
      'tablet-small': {'max': '830px'},

      'mobile-lg': {'max': '768px'},

      'mobile': {'max': '540px'},
    },
    extend: {
        colors : {
          'primary' : '#111827',
        }
    },
  },
  plugins: [],
}