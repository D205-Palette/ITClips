/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "aside-light": "#ebf2fa",
        "aside-dark": "#282c34",
        "message-content": "#a8a8a8",
      },
    },
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out',
        fadeInRight: "fadeInRight 1s ease-out",
        fadeInLeft: "fadeInLeft 1s ease-out",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  // darkMode: 'class', // 여기서 darkMode를 'class'로 설정합니다.
};
