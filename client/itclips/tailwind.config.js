/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {},
  },
  colors: {
    "aside-layout": "#f8fafc",
    "message-content": "a8a8a8",
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
  },
  // darkMode: 'class', // 여기서 darkMode를 'class'로 설정합니다.
};
