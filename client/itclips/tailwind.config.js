/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "aside-light": "#f8fafc",
        "aside-dark": "#282c34",
        "message-content": "a8a8a8",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
  },
  // darkMode: 'class', // 여기서 darkMode를 'class'로 설정합니다.
};
