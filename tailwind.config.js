/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FAF9F6',
        'pure-white': '#FFFFFF',
        'almost-black': '#1A1A1A',
        'medium-gray': '#6B6B6B',
        'light-gray': '#A8A8A8',
      },
      boxShadow: {
        'museum': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'museum-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
