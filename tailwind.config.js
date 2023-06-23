/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'gray-light':'#D5D5D5',
        'gray-blue':'#E6ECF0',
        'green-light':'#76CC8E'
      }
    },
  },
  plugins: [],
};
