/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A855F7',
        magenta: '#FF0080',
        cyan: '#00FFFF',
        dark: '#0a0a0a',
        'dark-gray': '#1a1a1a',
        'mid-gray': '#2a2a2a',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #A855F7, 0 0 10px #A855F7' },
          '100%': { boxShadow: '0 0 10px #A855F7, 0 0 20px #A855F7, 0 0 30px #A855F7' },
        },
      },
    },
  },
  plugins: [],
}



