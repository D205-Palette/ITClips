/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "aside-layout": "#f8fafc",
      "message-content": "a8a8a8",
    }
  },
  plugins: [require('daisyui'),],
}

