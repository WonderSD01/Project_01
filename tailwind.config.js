/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fire: {
          amber: '#FFC83D',
          orange: '#FF7A18',
          red: '#E11D2A',
          deep: '#A40E1B',
        },
        surface: {
          DEFAULT: '#0B0B0C',
          raised: '#161618',
          overlay: '#1F1F22',
        },
        cream: '#F6EFE8',
        muted: '#A29E9A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'fire-gradient':
          'linear-gradient(120deg, #FFC83D 0%, #FF7A18 38%, #E11D2A 72%, #A40E1B 100%)',
        'ember-gradient': 'linear-gradient(135deg, #FF7A18, #E11D2A)',
        'red-gradient':
          'linear-gradient(135deg, #FF4D2E, #E11D2A 55%, #A40E1B)',
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,122,24,0.18), transparent 70%)',
      },
      boxShadow: {
        fire: '0 8px 32px rgba(255, 122, 24, 0.35)',
        'fire-lg': '0 16px 48px rgba(225, 29, 42, 0.28)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
