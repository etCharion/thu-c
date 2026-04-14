/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Page and card surfaces – light theme (DnDB style)
        sheet: {
          bg: '#E8EBF2',       // light blue-gray page background
          surface: '#FFFFFF',   // white card surfaces
          elevated: '#F0F3F8',  // very light gray (card headers, inputs)
          border: '#C4C9D8',    // subtle border
        },
        dnd: {
          red: '#C41E3A',
          crimson: '#8B1523',
          navy: '#1A2237',      // dark navy – ability boxes, section headers
          'navy-mid': '#243049', // slightly lighter navy
          gold: '#B8942B',
          'gold-light': '#C9A227',
          green: '#276749',
          purple: '#553c9a',
          steel: '#718096',
          bronze: '#cd7f32',
        },
        txt: {
          primary: '#1C2033',   // near-black for main text
          secondary: '#3D4D6A', // dark blue-gray
          muted: '#7A8CAE',     // muted blue-gray
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'Georgia', 'serif'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)',
        ki: '0 0 10px rgba(184,148,43,0.5)',
        hp: '0 0 10px rgba(196,30,58,0.35)',
        glow: '0 0 16px rgba(201,162,39,0.5)',
        ability: '0 2px 6px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
