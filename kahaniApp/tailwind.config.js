/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#9333EA',
        background: '#F3F4F6',
        darkBackground: '#1F2937',
        modalBg: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

