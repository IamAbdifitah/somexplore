/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        somalia: {
          blue: '#00ADEF',
          green: '#1EA84C',
          white: '#FFFFFF',
          dark: '#050B14',
          accent: '#E6B325',
          soft: '#F8FAFC',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'somalia-mesh': 'radial-gradient(at 0% 0%, rgba(0, 173, 239, 0.15) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(30, 168, 76, 0.1) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(230, 179, 37, 0.1) 0, transparent 50%)',
      }
    },
  },
  plugins: [],
}
