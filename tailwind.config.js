/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        somalia: {
          navy: '#071A2B',
          blue: '#087EA4',
          sand: '#F3E8D0',
          white: '#FFFFFF',
          darkText: '#10202B',
          gold: '#D8A84E',
          soft: '#F3E8D0',
          dark: '#071A2B',
          accent: '#D8A84E',
          green: '#1EA84C',
        }
      },
      backdropBlur: {
        xs: '2px',
        xl: '20px',
        '2xl': '40px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
        'gold-glow': 'radial-gradient(circle, rgba(216, 168, 78, 0.15) 0%, transparent 70%)',
        'ocean-glow': 'radial-gradient(circle, rgba(8, 126, 164, 0.25) 0%, transparent 70%)',
        'somalia-mesh': 'radial-gradient(at 0% 0%, rgba(8, 126, 164, 0.2) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(216, 168, 78, 0.15) 0, transparent 50%), radial-gradient(at 50% 100%, rgba(7, 26, 43, 0.9) 0, transparent 80%)',
      }
    },
  },
  plugins: [],
}
