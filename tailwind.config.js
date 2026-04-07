/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sheet: {
          bg: '#1a1a2e',
          surface: '#16213e',
          elevated: '#0f3460',
          border: '#2d3561',
        },
        dnd: {
          red: '#c53030',
          gold: '#d69e2e',
          green: '#276749',
          purple: '#553c9a',
          steel: '#718096',
          bronze: '#cd7f32',
        },
        txt: {
          primary: '#f7fafc',
          secondary: '#a0aec0',
          muted: '#4a5568',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'Georgia', 'serif'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        ki: '0 0 12px rgba(214,158,46,0.4)',
        hp: '0 0 12px rgba(197,48,48,0.35)',
        glow: '0 0 16px rgba(214,158,46,0.6)',
      },
    },
  },
  plugins: [],
}
