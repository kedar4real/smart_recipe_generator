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
        forest: {
          50: '#edf6f1',
          100: '#cfe6da',
          200: '#a5d0bb',
          300: '#6daf96',
          400: '#418a73',
          500: '#2c6a57',
          600: '#215846',
          700: '#164131',
          800: '#0d2b21',
          900: '#071911',
        },
        brandAccent: {
          50: '#fff3ea',
          100: '#ffd9c2',
          200: '#ffb183',
          300: '#ff9159',
          400: '#f47337',
          500: '#e35724',
          600: '#c3441c',
          700: '#8c3014',
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
        card: '0 32px 60px rgba(7, 25, 17, 0.25)',
        subtle: '0 20px 40px rgba(6, 21, 17, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        marquee: 'marquee 18s linear infinite',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

