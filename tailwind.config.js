/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        '2.35': '2.35rem',
        '2': '2rem',
        '1.3': '1.3rem',
        '1.55': '1.55rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

