/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'light-run': {
          '0%': { 
            boxShadow: '0 0 8px 2px #caa42c',
            borderColor: '#caa42c transparent transparent transparent'
          },
          '25%': {
            boxShadow: '0 0 8px 2px #caa42c',
            borderColor: 'transparent #caa42c transparent transparent'
          },
          '50%': {
            boxShadow: '0 0 8px 2px #caa42c',
            borderColor: 'transparent transparent #caa42c transparent'
          },
          '75%': {
            boxShadow: '0 0 8px 2px #caa42c',
            borderColor: 'transparent transparent transparent #caa42c'
          },
          '100%': {
            boxShadow: '0 0 8px 2px #caa42c',
            borderColor: '#caa42c transparent transparent transparent'
          }
        }
      },
      animation: {
        'light-run': 'light-run 2s linear infinite'
      }
    },
  },
  plugins: [],
}