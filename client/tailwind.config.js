/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#541CA8',
        primary_dark: '#46178C',
        primary_light: '#8435FB',
        background: '#FFFFF8',
        yellow: '#FEE500',
        green: '#B3E443'
      },
      spacing: {
        48: '12rem',
        52: '13rem',
        56: '14rem',
      },
      textShadow: {
        default: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        lg: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        // 추가 원하는 그림자 스타일을 여기에 정의할 수 있습니다.
      },
      fontFamily: {
        coding: ['"Nanum Gothic Coding"'],
        mono: ['monospace'],
        hanna: ['hanna'],
        Line:['LINESeedKR-Bd'],
        gmarket: ['GmarketSansMedium'],
      },
    },
  },
  plugins: [],
};
