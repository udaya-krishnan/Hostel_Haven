/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btncolor: '#3C3633',
        headercolor:'#E0CCBE',
        footercolor:'#747264',
        bgcolor:'#EEEDEB'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

    },
  },
  plugins: [],
}

