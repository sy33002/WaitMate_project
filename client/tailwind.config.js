/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#2F2772',
        background: '#FFFFF8',
        yellow : '#FEE500',
      },
      spacing: {
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
      }
    },
  },
  plugins: [],
};
