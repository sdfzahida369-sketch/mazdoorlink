/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0A0A',
          card: '#141414',
          border: '#2A2A2A',
          muted: '#8E8E93',
          input: '#1C1C1E',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#AA820A',
          glow: 'rgba(212, 175, 55, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', '"Noto Sans Arabic"', 'Tahoma', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(10,10,10,0) 70%)',
        'card-gradient': 'linear-gradient(180deg, #181818 0%, #121212 100%)',
      },
      animation: {
        'stroke-draw': 'strokeDraw 2.5s ease-in-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s infinite alternate',
      },
      keyframes: {
        strokeDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
