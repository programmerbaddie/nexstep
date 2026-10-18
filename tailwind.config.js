/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7EC8A5',
          light: '#B9E4C9',
          dark: '#58A983',
          hover: '#6DBB96',
          50: '#F2FAF6',
          100: '#E4F5ED',
          200: '#CBEBDC',
          300: '#B9E4C9',
          400: '#9CD7B7',
          500: '#7EC8A5',
          600: '#5BAE87',
          700: '#438D6C',
        },
        secondary: {
          DEFAULT: '#B9E4C9',
          soft: '#EAF7F0',
          dark: '#8ED2A6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F4FBF7',
          muted: '#EBF5EF',
        },
        appBg: '#F8FCF9',
        calm: {
          bg: '#F3F9F5',
          card: '#E8F5EE',
          accent: '#A3D9BE',
          text: '#2D5443',
        },
        accent: {
          coral: '#F6B19E',
          yellow: '#FCE79A',
          blue: '#A5D8F3',
          purple: '#D3C5F5',
          amber: '#FBD38D',
        }
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(126, 200, 165, 0.12)',
        'soft-lg': '0 10px 25px -3px rgba(126, 200, 165, 0.18)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
