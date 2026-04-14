/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sheet: {
          bg: '#12151C',
          surface: '#1C2130',
          elevated: '#252D40',
          border: '#30394F',
        },
        dnd: {
          red: '#C41E3A',
          crimson: '#8B1523',
          gold: '#B8942B',
          'gold-light': '#D4AF37',
          green: '#276749',
          purple: '#553c9a',
          steel: '#718096',
          bronze: '#cd7f32',
        },
        txt: {
          primary: '#E8EAF0',
          secondary: '#8294B0',
          muted: '#445168',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'Georgia', 'serif'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)',
        ki: '0 0 12px rgba(184,148,43,0.45)',
        hp: '0 0 12px rgba(196,30,58,0.4)',
        glow: '0 0 16px rgba(212,175,55,0.6)',
        ability: '0 2px 8px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
