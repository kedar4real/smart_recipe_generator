/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8ec',
          100: '#ffeacc',
          200: '#ffdb9f',
          300: '#ffca73',
          400: '#ffb347',
          500: '#f7903c',
          600: '#e3742f',
          700: '#d05d2b',
          800: '#aa4727',
          900: '#7b2f1a',
        },
        secondary: {
          50: '#f8f4ef',
          100: '#efe5d7',
          200: '#e7d3b4',
          300: '#dcb989',
          400: '#c79a61',
          500: '#a87a42',
          600: '#855c2f',
          700: '#64421f',
          800: '#472c14',
          900: '#2d1a0b',
        },
        mint: {
          100: '#d0f3ec',
          300: '#a5e4d8',
          500: '#6fd7c4',
          700: '#3bb39d',
        },
        cocoa: {
          800: '#3b2c2c',
          900: '#241616',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Poppins', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        retro: '0 25px 50px -12px rgba(36, 22, 22, 0.4)',
        card: '0 20px 40px rgba(47, 30, 10, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}

